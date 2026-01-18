{
    'name': 'Junk Pricing',
    'version': '19.0.1.0.0',
    'category': 'Website',
    'summary': 'Junk Removal Pricing Lookup Tool',
    'description': """
        Public-facing junk removal pricing lookup tool.
        - Zip code validation
        - Item pricing display
        - Mobile-responsive UI
    """,
    'author': 'Local Guys Junk Removal',
    'website': 'https://sagebrush.zero.sbs',
    'depends': ['website', 'base'],
    'data': [
        'security/ir.model.access.csv',
        'views/pricing_views.xml',
        'views/templates.xml',
        'data/website_menu.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'junk_pricing/static/src/css/pricing.css',
            'junk_pricing/static/src/js/pricing.js',
        ],
    },
    'installable': True,
    'application': True,
    'license': 'LGPL-3',
}
