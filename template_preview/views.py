from application import app
from templates import render_template_string
from flask import render_template
from flask import make_response
from flask import request


@app.route('/')
def index():
    resp = make_response(render_template("index.html"))
    # resp.set_cookie('username', 'the username')
    return resp


@app.route('/render/', methods=['POST'])
def render():
    data = request.get_json()

    template = data.get("template", "")
    context = data.get("context", {})

    resp = make_response(render_template_string(template, context))
    return resp
