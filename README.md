<img src='https://github.com/adildsw/enfrappe/blob/main/src/assets/logo.svg'>

__enFrappé__ is a mobile user interface builder capable of designing and deploying _ultra lightweight_ and _functional_ user interfaces through QR codes. User interfaces created using enFrappé can be deployed on the mobile device by simply scanning the QR code, without the need of any network connection.

## Getting Started
The following set of instructions will help you get enFrappé up and running on your computer.

### Prerequisites
In order to build and run this application on your device, make sure you meet the following prerequisites:
##### 1. Install [Node.js](https://nodejs.org/en/)
##### 2. Install Python 3.6+ ([Anaconda](https://www.anaconda.com/download/) distribution recommended)

### Building enFrappé
Once all the prerequisites are met, follow these instructions to build and execute enFrappé on your device:

#### 1. Clone enFrappé repository to your local system. 
Open the <i>Terminal</i> window and type the following command:
```
git clone https://github.com/adildsw/enfrappe
```
#### 2. Navigate to the directory containing enFrappé
```
cd enFrappe
```
#### 3. Install Node.js dependencies
```
npm install
```
#### 4. Install Python dependencies
```
pip install -r pdf_server/requirements.txt
```
#### 5. Starting server
Once all the dependencies are installed, you need to start both the enFrappé server, and the PDF generator server in two different terminals by typing the following commands:
```
python pdf_server/pdf_server.py
```
```
npm start
```
#### 6. Running ### Building enFrappé
Once the server is hosted successfully, enFrappé should load automatically in your default browser.
<img src='https://github.com/adildsw/enfrappe/blob/main/src/assets/screenshot_main.png'>

### Launching enFrappé Apps on Mobile
You can launch enFrappé apps on an Android device using [Frappé](https://github.com/adildsw/frappe).
