from flask import Flask
app = Flask(
    __name__,
    # static_path="./"
    # static_url_path="/static/",
    # static_folder="static",
)

import views  # NOQA
