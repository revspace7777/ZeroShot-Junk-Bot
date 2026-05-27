from odoo import http

class JunkPricingController(http.Controller):
    @http.route('/junkbot', type='http', auth='public', website=True)
    def junkbot_page(self, **kwargs):
        return http.request.render('junk_pricing.react_widget_page', {})
