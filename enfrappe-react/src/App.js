import { useState } from 'react';

import { Grid } from 'semantic-ui-react';

import useActivityManager from './utils/useActivityManager';

import Toolbar from './components/panels/Toolbar';
import Properties from './components/panels/Properties';
import Prototype from './components/panels/Prototype';
import AppDetails from './components/panels/AppDetails';

import './App.css';
import useConstructor from './utils/useConstructor';

const DEFAULT_ACTIVITY_NAME = 'Main Activity';

const App = () => {

    const activityManager = useActivityManager();
    const [currentActivity, setCurrentActivity] = useState(DEFAULT_ACTIVITY_NAME);

    useConstructor(() => {
        activityManager.addActivity(DEFAULT_ACTIVITY_NAME);
    });

    const [currentSelected, setSelected] = useState('None');

    const manageSelection = (classNames) => {
        if (classNames.includes('enfrappe-ui-')) {
            var comp = classNames.split(' ').filter((val) => (val.includes('enfrappe-ui-')))[0].split('-')[2];
            comp = comp.charAt(0).toUpperCase() + comp.substr(1).toLowerCase();
            setSelected(comp);
        }
        else {
            setSelected('None');
        }
    }

    return (
        <Grid celled='internally' id='app-grid'>
            <Grid.Row>
                <Grid.Column width={3} id='panel-toolbar'>
                    <Toolbar selected={currentSelected} />
                </Grid.Column>
                <Grid.Column width={3} id='panel-properties'>
                    <Properties selectedComponent={currentSelected} activityManager={activityManager} currentActivity={currentActivity} />
                </Grid.Column>
                <Grid.Column width={6} id='panel-prototype' onClick={(e) => { manageSelection(e.target.className) }}>
                    <Prototype activityManager={activityManager} currentActivity={currentActivity} setCurrentActivity={setCurrentActivity} selected={currentSelected} />
                </Grid.Column>
                <Grid.Column width={4} id='panel-appdetails'>
                    <AppDetails />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default App;