"""Create an application instance."""
from flask import make_response
from quad.app import create_app
from quad.settings import Settings
from quad.utils.nocache import set_no_cache_headers

CONFIG = Settings

app = create_app(CONFIG)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    if "dist/" in path:
        return app.send_static_file(path)

    body = app.send_static_file('dist/index.html' if app.config["IS_PRODUCTION"] else 'templates/index.dev.html')
    res = set_no_cache_headers(make_response(body))

    return res


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=CONFIG.DEBUG)
