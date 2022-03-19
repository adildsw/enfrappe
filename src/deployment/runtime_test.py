
import os
import time
from flask import Flask, request, jsonify
from flask.json import dumps
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "*"}})

# |--------------------------------------------------------------------------
# | Utility Functions
# |--------------------------------------------------------------------------

last_timestamp = 0

def time_in_millis():
    return round(time.time() * 1000)

def get_last_timestamp():
    global last_timestamp
    return last_timestamp

def update_last_timestamp():
    global last_timestamp
    last_timestamp = time_in_millis()

def update_last_timestamp_from_data():
    global last_timestamp
    for rootdir, dirs, files in os.walk('./data/'):
        for file in files:
            timestamp = file.split('_')[0]
            if float(timestamp) > last_timestamp:
                last_timestamp = float(timestamp)
    return last_timestamp

def get_all_files_after_timestamp(timestamp):
    all_files = {}
    for rootdir, dirs, files in os.walk('./data/'):
        for file in files:
            if float(file.split('_')[0]) > timestamp:
                file_dir = rootdir + '/' + file
                file_key = file_dir.replace('./data/', '')
                all_files[file_key] = open(file_dir, 'r').read()
    return all_files

def delete_data_folder():
    for rootdir, dirs, files in os.walk('./data/'):
        for file in files:
            os.remove(rootdir + '/' + file)
    os.rmdir('./data/')

# |--------------------------------------------------------------------------
# | Utility API Routes
# |--------------------------------------------------------------------------

@app.route('/enfrappe_static_update_data', methods=['POST'])
def get_updated_data():
    timestamp = int(request.get_json()['timestamp'])
    if timestamp >= get_last_timestamp():
        print(get_last_timestamp())
        print(timestamp)
        return jsonify({})
    else:
        return jsonify(get_all_files_after_timestamp(timestamp))

@app.route('/enfrappe_static_delete_data', methods=['POST'])
def delete_data():
    delete_data_folder()
    return jsonify({})


@app.route('/enfrappe_static_function_api_mapping', methods=['POST'])
def get_function_api_mapping():
    return jsonify({"func_0":"/c","func_1":"/zz","func_2":"/12"})
    
# |--------------------------------------------------------------------------
# | Data API Routes
# |--------------------------------------------------------------------------
    
@app.route('/c', methods=['POST'])
def func_0():
    # Creating directory for API route
    if not os.path.exists('data'):
        os.makedirs('data')
    if not os.path.exists('data/func_0'):
        os.makedirs('data/func_0')

    # Updating last timestamp to the time of receiving request
    update_last_timestamp()

    # Writing request data to JSON file
    with open('data/func_0/' + str(get_last_timestamp()) + '_' + '-'.join(request.remote_addr.split('.')) + '.json', 'w') as f:
        if request.method == 'GET':
            f.write(dumps(request.args.to_dict()))
        else:
            f.write(dumps(request.get_json()))

    # Business logic goes here
    # ...

    # Returning response
    return 'OK'

@app.route('/zz', methods=['GET'])
def func_1():
    # Creating directory for API route
    if not os.path.exists('data'):
        os.makedirs('data')
    if not os.path.exists('data/func_1'):
        os.makedirs('data/func_1')

    # Updating last timestamp to the time of receiving request
    update_last_timestamp()

    # Writing request data to JSON file
    with open('data/func_1/' + str(get_last_timestamp()) + '_' + '-'.join(request.remote_addr.split('.')) + '.json', 'w') as f:
        if request.method == 'GET':
            f.write(dumps(request.args.to_dict()))
        else:
            f.write(dumps(request.get_json()))

    # Business logic goes here
    # ...

    # Returning response
    return 'OK'

@app.route('/12', methods=['GET'])
def func_2():
    # Creating directory for API route
    if not os.path.exists('data'):
        os.makedirs('data')
    if not os.path.exists('data/func_2'):
        os.makedirs('data/func_2')

    # Updating last timestamp to the time of receiving request
    update_last_timestamp()

    # Writing request data to JSON file
    with open('data/func_2/' + str(get_last_timestamp()) + '_' + '-'.join(request.remote_addr.split('.')) + '.json', 'w') as f:
        if request.method == 'GET':
            f.write(dumps(request.args.to_dict()))
        else:
            f.write(dumps(request.get_json()))

    # Business logic goes here
    # ...

    # Returning response
    return 'OK'

if __name__ == '__main__':
    update_last_timestamp_from_data()
    app.run(host='127.0.0.1', port=1803)
