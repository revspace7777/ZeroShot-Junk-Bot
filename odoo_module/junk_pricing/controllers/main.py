import json
from odoo import http
from odoo.http import request


class JunkPricingController(http.Controller):
    
    @http.route('/junk/validate-zip/<string:zip_code>', type='json', auth='public', methods=['GET', 'POST'], csrf=False)
    def validate_zip(self, zip_code):
        """API: Validate if a zip code is serviceable"""
        result = request.env['junk.pricing.item'].sudo().validate_zip(zip_code)
        return result

    @http.route('/junk/items/<string:zip_code>', type='json', auth='public', methods=['GET', 'POST'], csrf=False)
    def get_items(self, zip_code, search=None):
        """API: Get all pricing items for a zip code"""
        items = request.env['junk.pricing.item'].sudo().get_items_for_zip(zip_code, search)
        return items

    @http.route('/junk/pricing', type='http', auth='public', website=True)
    def pricing_page(self, **kwargs):
        """Public pricing lookup page"""
        return request.render('junk_pricing.pricing_page', {
            'zip_code': kwargs.get('zip', ''),
        })

    @http.route('/junk/search', type='http', auth='public', website=True, methods=['POST'])
    def search_pricing(self, zip_code=None, **kwargs):
        """Handle form submission and show results"""
        items = []
        valid = False
        
        if zip_code:
            validation = request.env['junk.pricing.item'].sudo().validate_zip(zip_code)
            valid = validation.get('valid', False)
            
            if valid:
                items = request.env['junk.pricing.item'].sudo().get_items_for_zip(zip_code)
        
        return request.render('junk_pricing.pricing_results', {
            'zip_code': zip_code,
            'valid': valid,
            'items': items,
        })

    @http.route('/junkbot', type='http', auth='public', website=True)
    def junkbot_app(self, **kwargs):
        """Serve the React Micro-Frontend for Junkbot"""
        return request.render('junk_pricing.react_widget_page')
