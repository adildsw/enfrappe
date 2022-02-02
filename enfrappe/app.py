from urllib import request
from flask import Flask, request, render_template

from renderer import render_toolbar, render_properties

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("index.html")
    
@app.route('/toolbar_panel', methods=['POST'])
def toolbar_panel():
    toolbar = render_toolbar(request.form)
    return render_template("panels/toolbar.html", toolbar=toolbar)

@app.route('/properties_panel', methods=['POST'])
def properties_panel():
    properties = render_properties(request.form)
    return render_template("panels/properties.html", properties=properties)

@app.route('/prototype_panel', methods=['POST'])
def prototype_panel():
    return render_template("panels/prototype.html")

@app.route('/main_panel', methods=['POST'])
def main_panel():
    return render_template("panels/main.html")

if __name__ == "__main__":
    app.run(debug=True)