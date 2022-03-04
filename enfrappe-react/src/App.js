import { useState } from 'react';

import { Grid } from 'semantic-ui-react';

import useActivityManager from './utils/useActivityManager';
import useAppManager from './utils/useAppManager';

import Toolbar from './components/panels/Toolbar';
import Properties from './components/panels/Properties';
import Prototype from './components/panels/Prototype';
import AppDetails from './components/panels/AppDetails';

import './App.css';
import useConstructor from './utils/useConstructor';

const DEFAULT_ACTIVITY_NAME = 'Main Activity';

const App = () => {

    const appManager = useAppManager();
    const activityManager = useActivityManager();
    const [currentActivity, setCurrentActivity] = useState(DEFAULT_ACTIVITY_NAME);
    const [selectedComponent, setSelectedComponent] = useState({'id': 'None', 'type': 'None'});

    useConstructor(() => {
        activityManager.addActivity(DEFAULT_ACTIVITY_NAME);
    });

    const manageSelection = (selectedId, selectedClassNames) => {
        console.log(selectedId);
        if (selectedClassNames.includes('enfrappe-ui-')) {
            var comp = selectedClassNames.split(' ').filter((val) => (val.includes('enfrappe-ui-')))[0].split('-')[2];
            if (comp === 'activity' || comp === 'activitycontent' || comp === 'activitydndspace')
                setSelectedComponent({'id': selectedId, 'type': 'Activity'});
            else if (comp === 'section' || comp === 'sectionheader' || comp === 'sectioncontent' || comp === 'sectiondndspace')
                setSelectedComponent({'id': selectedId, 'type': 'Section'});
            else
                setSelectedComponent({'id': 'None', 'type': 'None'});
            // comp = comp.charAt(0).toUpperCase() + comp.substr(1).toLowerCase();
            // setSelectedComponent({'id': selectedId, 'type': comp});
        }
        else {
            setSelectedComponent({'id': 'None', 'type': 'None'});
        }
    }

    return (
        <Grid celled='internally' id='app-grid' className={'fullscreen-div'}>
            <Grid.Row id='app-grid-row'>
                <Grid.Column width={3} id='panel-toolbar' className={'fullscreen-div'}>
                    <Toolbar selectedComponent={selectedComponent} />
                </Grid.Column>
                <Grid.Column width={3} id='panel-properties' className={'fullscreen-div'}>
                    <Properties 
                        selectedComponent={selectedComponent} 
                        activityManager={activityManager} 
                        currentActivity={currentActivity}
                        setCurrentActivity={setCurrentActivity} 
                        setSelectedComponent={setSelectedComponent} 
                    />
                </Grid.Column>
                <Grid.Column width={6} className={'fullscreen-div'} id='panel-prototype' onClick={(e) => { manageSelection(e.target.id, e.target.className) }}>
                    <Prototype 
                        activityManager={activityManager} 
                        currentActivity={currentActivity} 
                        setCurrentActivity={setCurrentActivity} 
                        selectedComponent={selectedComponent} 
                        setSelectedComponent={setSelectedComponent} 
                    />
                </Grid.Column>
                <Grid.Column width={4} id='panel-appdetails' className={'fullscreen-div'}>
                    <AppDetails appManager={appManager} activityManager={activityManager}/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default App;