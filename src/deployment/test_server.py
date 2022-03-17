from flask import Flask, request
from flask_cors import CORS

from serial import Serial

app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "*"}})

# serial = Serial(port='COM3', baudrate=9600)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        print(request.get_json())
    elif request.method == 'GET':
        print(request.args.to_dict())
    return 'Hello!'

@app.route('/age_checker', methods=['GET'])
def index1():
    print(request.args)
    if request.args.get('age') is not None:
        try:
            if int(request.args.get('age')) >= 18:
                return 'You are old enough to vote!'
            else:
                return 'You are not old enough to vote!'
        except:
            return '', '499 invalid "age" value'
    else:
        return '', '499 "age" value is not provided'

@app.route('/change', methods=['GET'])
def index2():
    return '', '299 kidsmenu1'


if __name__ == '__main__':
    app.run(debug=True, port='1803')