from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from pdf_generator import create_pdf

app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "*"}})

IP = '127.0.0.1'
PORT = '3001'

@app.route('/')
def index():
    return "PDF Generator Server Running"

@app.route('/generate_pdf', methods=['POST'])
def generate_pdf():
    data = request.get_json()
    imgs = []
    for img in range(data['count']):
        imgs.append(data['img_' + str(img + 1)])
    app_name = data['app_name']
    app_id = data['app_id']

    create_pdf(imgs, app_name)
    return send_file('output.pdf', mimetype='application/pdf', as_attachment=True, attachment_filename='{}_qrcode.pdf'.format(app_id))

@app.route('/generate_and_print_pdf', methods=['POST'])
def generate_and_print_pdf():
    data = request.get_json()
    imgs = []
    for img in range(data['count']):
        imgs.append(data['img_' + str(img + 1)])
    app_name = data['app_name']
    app_id = data['app_id']

    create_pdf(imgs, app_name)
    return send_file('output.pdf', mimetype='application/pdf')

if __name__ == '__main__':
    app.run(host=IP, port=PORT, debug=True)