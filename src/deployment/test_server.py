from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "*"}})

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

if __name__ == '__main__':
    app.run(debug=True, port='1803')