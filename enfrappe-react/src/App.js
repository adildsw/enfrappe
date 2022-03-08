import { useState } from 'react';
import { Grid } from 'semantic-ui-react';

import useComponentManager from './utils/useComponentManager';
import useAppManager from './utils/useAppManager';
import UIItemTypes from './utils/UIItemTypes';

import Toolbar from './components/panels/Toolbar';
import Properties from './components/panels/Properties';
import Prototype from './components/panels/Prototype';
import AppDetails from './components/panels/AppDetails';

import './App.css';

import { DEFAULT_ACTIVITY_ID } from './utils/DefaultComponentData';

const App = () => {

    const appManager = useAppManager();
    const componentManager = useComponentManager();
    const [currentActivity, setCurrentActivity] = useState(DEFAULT_ACTIVITY_ID);
    const [selectedComponent, setSelectedComponent] = useState({'id': 'None', 'type': UIItemTypes.NONE});

    const manageSelection = (selectedId, selectedClassNames) => {
        if (selectedClassNames.includes(UIItemTypes.UIID)) {
            if (selectedClassNames.includes(UIItemTypes.ACTIVITY))
                setSelectedComponent({'id': selectedId, 'type': UIItemTypes.ACTIVITY});
            else if (selectedClassNames.includes(UIItemTypes.SECTION))
                setSelectedComponent({'id': selectedId, 'type': UIItemTypes.SECTION});
            else
                setSelectedComponent({'id': 'None', 'type': UIItemTypes.NONE});
        }
        else {
            setSelectedComponent({'id': 'None', 'type': UIItemTypes.NONE});
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
                        componentManager={componentManager} 
                        currentActivity={currentActivity}
                        setCurrentActivity={setCurrentActivity} 
                        selectedComponent={selectedComponent} 
                        setSelectedComponent={setSelectedComponent} 
                    />
                </Grid.Column>
                <Grid.Column width={6} className={'fullscreen-div'} id='panel-prototype' onClick={(e) => { manageSelection(e.target.id, e.target.className) }}>
                    <Prototype 
                        componentManager={componentManager}
                        currentActivity={currentActivity} 
                        setCurrentActivity={setCurrentActivity} 
                        selectedComponent={selectedComponent} 
                        setSelectedComponent={setSelectedComponent} 
                    />
                </Grid.Column>
                <Grid.Column width={4} id='panel-appdetails' className={'fullscreen-div'}>
                    <AppDetails appManager={appManager} componentManager={componentManager}/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default App;