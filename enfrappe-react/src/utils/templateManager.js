const templateManager = () => {
    const empty = {
        "app-data": {
            "app-id": "com.me.frappeapp",
            "app-name": "My Awesome Frappe App",
            "app-version": "1.0.0",
            "single-use": false,
            "location-linked": false,
            "notify-user": false,
            "server-address": "127.0.0.1",
            "server-port": "1803"
        },
        "activity-data": {
            "data": {
                "id1": {
                    "name": "Main Activity",
                    "background": "#ffffff",
                    "data": {}
                }
            }
        }
    };
    
    return { 
        empty 
    };
}

export default templateManager;