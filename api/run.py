import os

from play import app
from waitress import serve

if __name__ == "__main__":
    port = os.getenv("PLAY_PORT", default=5000)
    serve(app, host="0.0.0.0", port=port)
