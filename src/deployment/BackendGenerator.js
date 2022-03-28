// Returns the header for the flask backend
const backendHeader = `
import os
import time
from flask import Flask, request, jsonify
from flask.json import dumps
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "*"}})
`;

// Returns the utility functions for the flask backend
const backendUtilityFunctions = `
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

def reset_last_timestamp():
    global last_timestamp
    last_timestamp = 0

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
                file_key = file_key.replace('.json', '')
                all_files[file_key] = open(file_dir, 'r').read()
    return all_files

def delete_data_folder():
    reset_last_timestamp()
    if os.path.exists('./data'):
        shutil.rmtree('./data')

# |--------------------------------------------------------------------------
# | Utility API Routes
# |--------------------------------------------------------------------------

@app.route('/enfrappe_static_get_last_timestamp', methods=['POST'])
def get_last_timestamp_api_route():
    return jsonify({'timestamp': get_last_timestamp()})

@app.route('/enfrappe_static_update_data', methods=['POST'])
def get_updated_data():
    timestamp = int(request.get_json()['timestamp'])
    if timestamp >= get_last_timestamp():
        return jsonify({})
    else:
        return jsonify(get_all_files_after_timestamp(timestamp))

@app.route('/enfrappe_static_delete_data', methods=['POST'])
def delete_data():
    delete_data_folder()
    return jsonify({})
`;

const backendAppDetailApiRoutes = (appId, appVer, appName, serverIp, serverPort, apiUrlList, apiMethodList) => {
    const functionApiMapping = {};
    apiUrlList.forEach(api => {
        var functionName = 'func_' + apiUrlList.indexOf(api);
        functionApiMapping[functionName] = api;
    });

    var appDetailRoutes = `
@app.route('/enfrappe_static_function_api_mapping', methods=['POST'])
def get_function_api_mapping():
    return jsonify(${JSON.stringify(functionApiMapping)}) 
    `;

    appDetailRoutes += `
@app.route('/enfrappe_static_app_detail', methods=['POST'])
def get_app_detail():
    return jsonify({
        'app_id': '${appId}',
        'app_version': '${appVer}',
        'app_name': '${appName}',
        'server_ip': '${serverIp}',
        'server_port': '${serverPort}'
    }) 
    `;

    return appDetailRoutes;
}

// Returns all the API routes for the flask backend
const backendApiRoutes = (apiUrlList, apiMethodList) => {
    var apiRoutes = `
# |--------------------------------------------------------------------------
# | Data API Routes
# |--------------------------------------------------------------------------
    `;

    apiUrlList.forEach(api => {
        var apiMethod = apiMethodList[apiUrlList.indexOf(api)];
        var functionName = 'func_' + apiUrlList.indexOf(api);
        apiRoutes += generateApiRoute(api, apiMethod, functionName);
    });
    return apiRoutes;
}

// Generates API route for the flask backend
const generateApiRoute = (api, apiMethod, functionName) => (
`
@app.route('${api}', methods=[${apiMethod}])
def ${functionName}():
    # Creating directory for API route
    if not os.path.exists('data'):
        os.makedirs('data')
    if not os.path.exists('data/${functionName}'):
        os.makedirs('data/${functionName}')

    # Updating last timestamp to the time of receiving request
    update_last_timestamp()

    # Writing request data to JSON file
    with open('data/${functionName}/' + str(get_last_timestamp()) + '_' + '-'.join(request.remote_addr.split('.')) + '.json', 'w') as f:
        if request.method == 'GET':
            f.write(dumps(request.args.to_dict()))
        else:
            if len(request.form.to_dict().keys()) != 0:
                f.write(dumps(request.form.to_dict()))
            else:
                f.write(dumps(request.get_json()))

    # Business logic goes here
    # ...

    # Returning response
    return 'OK'
`);

const backendServerLauncher = (serverIp, serverPort) => (
`
if __name__ == '__main__':
    update_last_timestamp_from_data()
    app.run(host='${serverIp}', port=${serverPort})
`);

const generateFlaskBackend = (appId, appVer, appName, serverIp, serverPort, apiUrlList, apiMethodList) => {
    var backendCode = backendHeader;
    backendCode += backendUtilityFunctions;
    backendCode += backendAppDetailApiRoutes(appId, appVer, appName, serverIp, serverPort, apiUrlList, apiMethodList);
    backendCode += backendApiRoutes(apiUrlList, apiMethodList);
    backendCode += backendServerLauncher(serverIp, serverPort);
    return backendCode;
}

export default generateFlaskBackend;