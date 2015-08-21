from jinja2 import DictLoader, Environment


def render_template_string(template_src, context):
    template_name = 'index.html'

    loader = DictLoader({template_name: template_src})
    env = Environment(loader=loader)

    template = env.get_template(template_name)

    return template.render(**context)
