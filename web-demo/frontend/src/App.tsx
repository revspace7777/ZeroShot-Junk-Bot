import { useState, useEffect } from 'react';
import axios from 'axios';
import { MapPin, ShoppingCart, Info, ArrowLeft, Sun, Moon, Send, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE = import.meta.env.VITE_API_BASE || '/api';

interface Location {
  zip_code: string;
  city: string;
  state: string;
}

interface Item {
  itemType: { id: string; name: string };
  pickupUnitPrice: number;
  quantity: number;
  pickupSubtotal: number;
}

interface ClarificationOption {
  id: string;
  name: string;
  pickupPrice: number;
}

interface UnresolvedItem {
  id: string;
  name: string;
  quantity: number;
  needsClarification: boolean;
  reason: string;
  options?: ClarificationOption[];
}

interface QuoteResponse {
  total: number;
  basePrice: number;
  itemSubtotal: number;
  minimumPriceApplied: boolean;
  outOfServiceArea: boolean;
  items: Item[];
  unresolvedItems: UnresolvedItem[];
  error?: string;
}

const Tooltip = ({ text, children }: { text: string; children: React.ReactNode }) => (
  <div className="tooltip-container">
    {children}
    <div className="tooltip-text">{text}</div>
  </div>
);

export default function App() {
  const [zip, setZip] = useState('');
  const [location, setLocation] = useState<Location | null>(null);
  const [isValidated, setIsValidated] = useState(false);
  const [inputText, setInputText] = useState('');
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleReset = () => {
    setIsValidated(false);
    setZip('');
    setLocation(null);
    setQuote(null);
    setInputText('');
  };

  const handleZipSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (zip.length !== 5) return;
    setLoading(true);
    try {
      const resp = await axios.get(`${API_BASE}/validate-zip/${zip}`);
      if (resp.data.valid) {
        const locResp = await axios.get(`${API_BASE}/location/${zip}`);
        setLocation(locResp.data);
        setIsValidated(true);
      } else {
        alert(resp.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to validate zip code.");
    } finally {
      setLoading(false);
    }
  };

  const submitQuote = async (textToSubmit: string = inputText) => {
    if (!textToSubmit.trim()) return;
    setLoading(true);
    try {
      const resp = await axios.post(`${API_BASE}/quote`, {
        text: textToSubmit,
        zipCode: zip
      });
      setQuote(resp.data);
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.error || "Error generating quote.");
    } finally {
      setLoading(false);
    }
  };

  const handleDisambiguationSelection = (ambiguousName: string, selectedOptionName: string) => {
    // Replace the ambiguous term in the original input text with the selected precise catalog term
    const regex = new RegExp(`\\b${ambiguousName}\\b`, 'gi');
    let newText = inputText;
    if (regex.test(inputText)) {
      newText = inputText.replace(regex, selectedOptionName);
    } else {
      // Fallback if regex matching fails: just append it and remove the old term loosely
      newText = inputText + ` (specifically: ${selectedOptionName})`;
    }
    setInputText(newText);
    submitQuote(newText);
  };

  return (
    <div className="container">
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="neon-text">
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
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', alignItems: 'center' }}>
              <button
                onClick={handleReset}
                className="glass"
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 15px', color: 'var(--text-muted)', cursor: 'pointer', border: '1px solid var(--border-color)' }}
              >
                <ArrowLeft size={16} /> <span style={{ fontSize: '0.85rem' }}>Change Zip</span>
              </button>
              <div style={{ flex: 1 }}>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Tell us what you need removed... (e.g. 'an old couch and a fridge')"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && submitQuote()}
                    style={{ width: '100%', paddingRight: '120px', fontSize: '1.1rem', padding: '15px 20px' }}
                  />
                  <button
                    onClick={() => submitQuote()}
                    disabled={loading || !inputText.trim()}
                    className="glow-btn"
                    style={{ position: 'absolute', right: '5px', top: '5px', bottom: '5px', padding: '0 20px', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <Send size={16} /> {loading ? '...' : 'Quote'}
                  </button>
                </div>
              </div>
            </div>

            {quote?.outOfServiceArea && (
              <div className="glass" style={{ padding: '2rem', textAlign: 'center', border: '1px solid #ff4444' }}>
                <AlertTriangle size={48} color="#ff4444" style={{ marginBottom: '1rem' }} />
                <h3>Out of Service Area</h3>
                <p>We're sorry, but zip code {zip} is currently outside our service area.</p>
              </div>
            )}

            {quote && quote.unresolvedItems && quote.unresolvedItems.length > 0 && !quote.outOfServiceArea && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px', color: '#ffaa00' }}>
                  <AlertTriangle size={20} /> Clarification Needed
                </h3>
                {quote.unresolvedItems.map((item, idx) => (
                  <div key={idx} className="glass" style={{ padding: '1.5rem', marginBottom: '1rem', borderLeft: '4px solid #ffaa00' }}>
                    <p style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
                      We're not entirely sure what you meant by <strong style={{ color: 'white' }}>"{item.name}"</strong>.
                    </p>
                    {item.needsClarification && item.options && item.options.length > 0 ? (
                      <div>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Did you mean one of these?</p>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                          {item.options.filter(o => o !== null).map((opt) => (
                            <button
                              key={opt.id}
                              onClick={() => handleDisambiguationSelection(item.name, opt.name)}
                              style={{
                                padding: '10px 15px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                gap: '4px'
                              }}
                            >
                              <span style={{ fontWeight: 600, color: 'white' }}>{opt.name}</span>
                              <span style={{ fontSize: '0.8rem', color: 'var(--primary-glow)' }}>+${opt.pickupPrice}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p style={{ color: 'var(--text-muted)' }}>Item not recognized in catalog.</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <aside>
            <div className="glass" style={{ padding: '1.5rem', position: 'sticky', top: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                <ShoppingCart size={24} className="neon-text" />
                <h3 style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>Order Summary</h3>
              </div>

              <div style={{ minHeight: '150px', marginBottom: '1.5rem' }}>
                <AnimatePresence>
                  {!quote || quote.items.length === 0 ? (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '2rem' }}
                    >
                      {quote && quote.outOfServiceArea ? 'Cannot generate quote.' : 'Type your items to get a quote'}
                    </motion.p>
                  ) : (
                    quote.items.map((item, idx) => (
                      <motion.div
                         key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.9rem' }}
                      >
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '180px' }}>
                          {item.quantity > 1 ? `${item.quantity}x ` : ''}{item.itemType.name}
                        </span>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <span style={{ fontWeight: 600 }}>${item.pickupSubtotal.toFixed(2)}</span>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                {quote && !quote.outOfServiceArea && quote.items.length > 0 && (
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                    <div className="price-row">
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        Base Pick-up Fee
                        <Tooltip text="Covers truck dispatch, professional labor for your first item, and local transportation.">
                          <Info size={14} style={{ opacity: 0.5 }} />
                        </Tooltip>
                      </span>
                      <span>${quote.basePrice.toFixed(2)}</span>
                    </div>
                    <div className="price-row">
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        Itemized Handling
                        <Tooltip text="Additional fees required for the specific size, weight, and recycling requirements of each item added to your order.">
                          <Info size={14} style={{ opacity: 0.5 }} />
                        </Tooltip>
                      </span>
                      <span>+${quote.itemSubtotal.toFixed(2)}</span>
                    </div>
                    {quote.minimumPriceApplied && (
                      <div className="price-row">
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ffaa00' }}>
                          Minimum Price Adjustment
                        </span>
                        <span style={{ color: '#ffaa00' }}>+${(quote.total - (quote.basePrice + quote.itemSubtotal)).toFixed(2)}</span>
                      </div>
                    )}
                    <div className="price-row total">
                      <span>Total Price</span>
                      <span className="neon-text">${quote.total.toFixed(2)}</span>
                    </div>
                  </div>
                )}

                <p className="disclaimer" style={{ marginBottom: '1rem' }}>
                  * All prices are guaranteed based on the items selected. Taxes and local disposal surcharges are included.
                </p>

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
    </div>
  );
}
