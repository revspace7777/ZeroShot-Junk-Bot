from odoo import models, fields, api


class JunkPricingItem(models.Model):
    _name = 'junk.pricing.item'
    _description = 'Junk Removal Pricing Item'
    _rec_name = 'item_name'

    zip_code = fields.Char(string='Zip Code', required=True, index=True)
    item_id = fields.Char(string='Item ID', required=True)
    item_name = fields.Char(string='Item Name', required=True)
    price = fields.Float(string='Total Price', digits=(10, 2))
    price_regular = fields.Float(string='Base Price', digits=(10, 2))
    price_curb = fields.Text(string='Full Pricing JSON')
    state = fields.Char(string='State', default='GA')
    
    _sql_constraints = [
        ('zip_item_unique', 'UNIQUE(zip_code, item_id)', 
         'Each zip code + item combination must be unique!')
    ]

    @api.model
    def get_items_for_zip(self, zip_code, search=None):
        """API method to get all items for a zip code"""
        domain = [('zip_code', '=', zip_code)]
        if search:
            domain.append(('item_name', 'ilike', search))
        
        items = self.search(domain, order='item_name asc')
        return [{
            'item_id': item.item_id,
            'item_name': item.item_name,
            'base_price': item.price_regular,
            'total_price': item.price,
        } for item in items]

    @api.model
    def validate_zip(self, zip_code):
        """Check if a zip code exists in the database"""
        count = self.search_count([('zip_code', '=', zip_code)])
        return {'valid': count > 0, 'zip_code': zip_code}
