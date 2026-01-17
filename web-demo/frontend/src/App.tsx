import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Search, MapPin, ShoppingCart, Trash2, ArrowUpDown, CheckCircle2, Sun, Moon, Info, ArrowLeft, X, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE = import.meta.env.VITE_API_BASE || '/api';

interface Location {
  zip_code: string;
  city: string;
  state: string;
}

interface Item {
  item_id: string;
  item_name: string;
  base_price: number;
  total_price: number;
  addition: number;
  multiplier: number;
}

const Tooltip = ({ text, children }: { text: string, children: React.ReactNode }) => (
  <div className="tooltip-container">
    {children}
    <div className="tooltip-text">{text}</div>
  </div>
);

const CheckoutModal = ({ isOpen, onClose, total, cart, baseFee }: { isOpen: boolean, onClose: () => void, total: number, cart: Item[], baseFee: number }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-content"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close" onClick={onClose}><X size={24} /></button>

          <div className="summary-section">
            <h3 className="summary-header">Area Service Fees</h3>
            <div className="summary-row">
              <span>This includes transportation and service loading costs.</span>
              <span style={{ fontWeight: 600 }}>${baseFee.toFixed(2)}</span>
            </div>
          </div>

          <div className="summary-section">
            <h3 className="summary-header">Items for Removal</h3>
            {cart.map(item => (
              <div key={item.item_id} className="summary-row">
                <span>{item.item_name}</span>
                <div style={{ display: 'flex', gap: '2rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>1x ${item.addition.toFixed(2)}</span>
                  <span style={{ fontWeight: 600, minWidth: '60px', textAlign: 'right' }}>${item.addition.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="summary-section">
            <h3 className="summary-header">Order Price Summary</h3>
            <div className="summary-row">
              <span>Order subtotal</span>
              <span style={{ fontWeight: 600 }}>${total.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Estimated tax to be collected</span>
              <span>$0.00</span>
            </div>
          </div>

          <div className="guaranteed-box">
            <div className="guaranteed-title">Guaranteed Price*</div>
            <div className="guaranteed-price">${total.toFixed(2)}</div>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              There's a minimum price for any order. That's why your total price is greater than your base price.
            </p>
          </div>

          <div className="modal-footer-text">
            *Your Guaranteed Price is based on the items and site details you've selected.<br />
            *Subject to state and local taxes where applicable. Taxes calculated upon entry of your address.<br />
            *Your Order Qualifies for <strong>The Local Guys Service Day Guarantee</strong> based on details you've currently selected.
          </div>

          <button className="glow-btn" style={{ width: '100%', padding: '1.2rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <CreditCard size={20} /> Complete Secure Booking
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default function App() {
  const [zip, setZip] = useState('');
  const [location, setLocation] = useState<Location | null>(null);
  const [isValidated, setIsValidated] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [cart, setCart] = useState<Item[]>([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'item_name' | 'base_price' | 'total_price'>('item_name');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [showCheckout, setShowCheckout] = useState(false);

  // Sync theme to root element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleReset = () => {
    setIsValidated(false);
    setZip('');
    setLocation(null);
    setCart([]);
    setItems([]);
  };

  // Validate Zip Code
  const handleZipSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (zip.length !== 5) return;
    setLoading(true);
    try {
      const resp = await axios.get(`${API_BASE}/validate-zip/${zip}`);
      if (resp.data.valid) {
        // Fetch location details
        const locResp = await axios.get(`${API_BASE}/location/${zip}`);
        setLocation(locResp.data);
        setIsValidated(true);
        fetchItems();
      } else {
        alert(resp.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to connect to backend. Please ensure the FastAPI server is running.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch Items from Database
  const fetchItems = async () => {
    if (!zip) return;
    setLoading(true);
    try {
      const resp = await axios.get(`${API_BASE}/items/${zip}`, {
        params: { search, sort_by: sortBy, order }
      });
      setItems(resp.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isValidated) {
      fetchItems();
    }
  }, [search, sortBy, order, isValidated]);

  const toggleCart = (item: Item) => {
    const exists = cart.find(i => i.item_id === item.item_id);
    if (exists) {
      setCart(cart.filter(i => i.item_id !== item.item_id));
    } else {
      setCart([...cart, item]);
    }
  };

  const baseFee = useMemo(() => cart.length > 0 ? cart[0].base_price : 0, [cart]);
  const totalAddons = useMemo(() => cart.reduce((acc, curr) => acc + curr.addition, 0), [cart]);

  const totalPrice = useMemo(() => {
    if (cart.length === 0) return 0;
    return baseFee + totalAddons;
  }, [baseFee, totalAddons]);

  return (
    <div className="container">
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="neon-text"
        >
          Local Guys Junk Removal
        </motion.h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>
          Get an Official Junk Removal Price <span style={{ fontWeight: 800, color: 'white' }}>NOW!</span>
        </p>
      </header>

      {!isValidated ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass"
          style={{ maxWidth: '500px', margin: '0 auto', padding: '3rem', textAlign: 'center' }}
        >
          <MapPin size={48} className="neon-text" style={{ marginBottom: '1.5rem' }} />
          <h2 style={{ marginBottom: '1rem' }}>Where are we picking up?</h2>
          <form onSubmit={handleZipSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="text"
              placeholder="Enter Zip Code (e.g. 30081)"
              value={zip}
              onChange={(e) => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
              style={{ fontSize: '1.1rem', textAlign: 'center' }}
            />
            <button className="glow-btn" disabled={zip.length !== 5 || loading}>
              {loading ? 'Verifying...' : 'Get Pricing'}
            </button>
          </form>
        </motion.div>
      ) : (
        <div className="layout-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
          <div>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: '0.5rem', flex: 1 }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={20} />
                  <input
                    type="text"
                    placeholder="Search items to remove..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ width: '100%', paddingLeft: '40px' }}
                  />
                </div>
                <button
                  onClick={handleReset}
                  className="glass"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0 15px', color: 'var(--text-muted)', cursor: 'pointer', border: '1px solid var(--border-color)' }}
                >
                  <ArrowLeft size={16} /> <span style={{ fontSize: '0.85rem' }}>Change Zip</span>
                </button>
              </div>
              <div
                className="glass"
                style={{ display: 'flex', alignItems: 'center', padding: '0 12px', cursor: 'pointer', gap: '8px' }}
                onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
              >
                <ArrowUpDown size={18} />
                <span style={{ fontSize: '0.9rem' }}>{order.toUpperCase()}</span>
              </div>
              <select
                className="glass"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                style={{ backgroundColor: '#1a1a1a', color: 'white', padding: '0 12px', borderRadius: '8px' }}
              >
                <option value="item_name">Sort by Name</option>
                <option value="base_price">Sort by Base Price</option>
                <option value="total_price">Sort by Total Price</option>
              </select>
            </div>

            <div className="item-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', maxHeight: '600px', overflowY: 'auto', paddingRight: '1rem' }}>
              {items.map(item => (
                <div
                  key={item.item_id}
                  className={`item-card ${cart.find(i => i.item_id === item.item_id) ? 'selected' : ''}`}
                  onClick={() => toggleCart(item)}
                >
                  <h4 style={{ marginBottom: '8px' }}>{item.item_name}</h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ color: 'var(--primary-glow)', fontWeight: 700 }}>+${item.addition.toFixed(2)}</span>
                      {item.multiplier > 1 && (
                        <span className="multiplier-tag" style={{ marginLeft: 0, marginTop: '4px' }}>x{item.multiplier.toFixed(2)} applied</span>
                      )}
                    </div>
                    {cart.find(i => i.item_id === item.item_id) && <CheckCircle2 size={16} color="var(--primary-glow)" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside>
            <div className="glass" style={{ padding: '1.5rem', position: 'sticky', top: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                <ShoppingCart size={24} className="neon-text" />
                <h3 style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>Order Summary</h3>
              </div>

              <div style={{ minHeight: '150px', marginBottom: '1.5rem' }}>
                <AnimatePresence>
                  {cart.length === 0 ? (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '2rem' }}
                    >
                      No items selected
                    </motion.p>
                  ) : (
                    cart.map(item => (
                      <motion.div
                        key={item.item_id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.9rem' }}
                      >
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '180px' }}>{item.item_name}</span>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <span style={{ fontWeight: 600 }}>${item.addition.toFixed(2)}</span>
                          <Trash2 size={14} className="text-muted" style={{ cursor: 'pointer' }} onClick={(e) => {
                            e.stopPropagation();
                            toggleCart(item);
                          }} />
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                {cart.length > 0 && (
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                    <div className="price-row">
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        Base Pick-up Fee
                        <Tooltip text="Covers truck dispatch, professional labor for your first item, and local transportation.">
                          <Info size={14} style={{ opacity: 0.5 }} />
                        </Tooltip>
                      </span>
                      <span>${baseFee.toFixed(2)}</span>
                    </div>
                    <div className="price-row">
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        Itemized Handling & Recycling
                        <Tooltip text="Additional fees required for the specific size, weight, and recycling requirements of each item added to your order.">
                          <Info size={14} style={{ opacity: 0.5 }} />
                        </Tooltip>
                      </span>
                      <span>+${totalAddons.toFixed(2)}</span>
                    </div>
                    <div className="price-row total">
                      <span>Total Price</span>
                      <span className="neon-text">${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                )}

                <p className="disclaimer" style={{ marginBottom: '1rem' }}>
                  * All prices are guaranteed based on the items selected. Taxes and local disposal surcharges are included.
                </p>

                <button className="glow-btn" style={{ width: '100%' }} disabled={cart.length === 0} onClick={() => setShowCheckout(true)}>
                  {cart.length === 0 ? 'Select Items to Start' : 'Secure Checkout'}
                </button>

                <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                  {location && (
                    <div className="location-badge" style={{ justifyContent: 'center' }}>
                      <MapPin size={14} />
                      <span>{location.city}, {location.state} {location.zip_code}</span>
                    </div>
                  )}
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Guaranteed Price • Official Local Guys Estimate
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}

      <footer className="main-footer">
        <div className="footer-links">
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
        </div>
        <p>© {new Date().getFullYear()} Local Guys Junk Removal. All rights reserved.</p>
      </footer>

      {/* Sticky Mobile Summary Bar */}
      {cart.length > 0 && (
        <div className="sticky-mobile-summary" style={{ display: 'none' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{cart.length} item{cart.length > 1 ? 's' : ''}</span>
            <span style={{ fontWeight: 800, color: 'var(--primary-glow)', fontSize: '1.2rem' }}>${totalPrice.toFixed(2)}</span>
          </div>
          <button className="glow-btn" style={{ padding: '10px 20px', fontSize: '0.8rem' }} onClick={() => setShowCheckout(true)}>
            Checkout
          </button>
        </div>
      )}

      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        total={totalPrice}
        cart={cart}
        baseFee={baseFee}
      />
    </div>
  );
}
