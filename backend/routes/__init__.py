# backend/app/routes/__init__.py
from .summary import summary_bp
from .news import news_bp
from .search import search_bp
def register_routes(app):
    app.register_blueprint(summary_bp)
    app.register_blueprint(news_bp)
    app.register_blueprint(search_bp)
