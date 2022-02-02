from flask import render_template

def render_toolbar(data):
    selected = data.get('selected', '')
    if selected:
        selected_class = data.get('class', '')
        return render_template("components/" + selected_class + ".html")
    return selected

def render_properties(data):
    selected = data.get('selected', '')
    if selected:
        selected_class = data.get('class', '')
        return render_template("components/" + selected_class + "-properties.html")
    return selected