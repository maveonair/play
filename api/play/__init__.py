from flask import Flask
from flask_cors import CORS

from play.views.zones import zones_blueprint

app = Flask(__name__, static_url_path='', static_folder='../static')
app.config.from_object(__name__)
app.register_blueprint(zones_blueprint, url_prefix='/api')

CORS(app)


@app.route('/')
def root():
    return app.send_static_file('index.html')

