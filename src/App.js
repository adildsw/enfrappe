import { useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';

import useComponentManager from './utils/useComponentManager';
import useAppManager from './utils/useAppManager';
import useLiveDataManager from './utils/useLiveDataManager';

import UIItemTypes from './utils/UIItemTypes';

import Toolbar from './components/panels/Toolbar';
import Properties from './components/panels/Properties';
import Prototype from './components/panels/Prototype';
import AppDetails from './components/panels/AppDetails';
import Simulation from './components/panels/Simulation';

import './App.css';

import { DEFAULT_ACTIVITY_ID } from './utils/DefaultComponentData';

/**
 * Bug List
 * - Text elements become blurry upon hover when all the components are added to a section
 * - Adding elements to a loaded app breaks the app [Workaround: start and stop simulation after loading]
 * - Unsaved changes not checking properly [Workaround: notify user of unsaved changes regardless of whether there are unsaved changes]
 * - renaming parameter names retain changes
*/

const App = () => {
    const appManager = useAppManager();
    const componentManager = useComponentManager();
    const liveDataManager = useLiveDataManager(componentManager);
    const [currentActivity, setCurrentActivity] = useState(DEFAULT_ACTIVITY_ID);
    const [selectedComponent, setSelectedComponent] = useState({'id': 'None', 'type': UIItemTypes.NONE});
    const [simulationState, setSimulationState] = useState(false);

    useEffect(() => {
        window.onbeforeunload = confirmExit;
        function confirmExit() {
          return "show warning";
        }
    }, [])

    const manageSelection = (selectedId, selectedClassNames) => {
        if (selectedClassNames.includes(UIItemTypes.UIID) && !simulationState) {
            if (selectedClassNames.includes(UIItemTypes.ACTIVITY))
                setSelectedComponent({'id': selectedId, 'type': UIItemTypes.ACTIVITY});
            else if (selectedClassNames.includes(UIItemTypes.SECTION))
                setSelectedComponent({'id': selectedId, 'type': UIItemTypes.SECTION});
            else if (selectedClassNames.includes(UIItemTypes.BUTTON))
                setSelectedComponent({'id': selectedId, 'type': UIItemTypes.BUTTON});
            else if (selectedClassNames.includes(UIItemTypes.TEXT))
                setSelectedComponent({'id': selectedId, 'type': UIItemTypes.TEXT});
            else if (selectedClassNames.includes(UIItemTypes.INPUT))
                setSelectedComponent({'id': selectedId, 'type': UIItemTypes.INPUT});
            else if (selectedClassNames.includes(UIItemTypes.CHECKBOX))
                setSelectedComponent({'id': selectedId, 'type': UIItemTypes.CHECKBOX});
            else if (selectedClassNames.includes(UIItemTypes.RADIO))
                setSelectedComponent({'id': selectedId, 'type': UIItemTypes.RADIO});
            else if (selectedClassNames.includes(UIItemTypes.DROPDOWN))
                setSelectedComponent({'id': selectedId, 'type': UIItemTypes.DROPDOWN});
            else if (selectedClassNames.includes(UIItemTypes.DATAVIEWER))
                setSelectedComponent({'id': selectedId, 'type': UIItemTypes.DATAVIEWER});
            else
                setSelectedComponent({'id': 'None', 'type': UIItemTypes.NONE});
        }
        else 
            setSelectedComponent({'id': 'None', 'type': UIItemTypes.NONE});
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
                    {simulationState ? 
                        <Simulation 
                            appManager={appManager} 
                            componentManager={componentManager}
                            currentActivity={currentActivity} 
                            setCurrentActivity={setCurrentActivity} 
                            liveData={liveDataManager.liveData}
                            updateLiveData={liveDataManager.updateLiveData}
                        /> : 
                        <Prototype 
                            componentManager={componentManager}
                            currentActivity={currentActivity} 
                            setCurrentActivity={setCurrentActivity} 
                            selectedComponent={selectedComponent} 
                            setSelectedComponent={setSelectedComponent} 
                        />
                    }
                </Grid.Column>
                <Grid.Column width={4} id='panel-appdetails' className={'fullscreen-div'}>
                    <AppDetails 
                        appManager={appManager} 
                        componentManager={componentManager} 
                        simulationState={simulationState} 
                        setSimulationState={setSimulationState}
                        setCurrentActivity={setCurrentActivity}
                        setSelectedComponent={setSelectedComponent}
                        resetLiveData={liveDataManager.resetLiveData}
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default App;