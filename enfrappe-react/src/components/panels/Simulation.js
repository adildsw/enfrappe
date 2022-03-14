import ActivityLive from "../ui-components/ui-live-components/ActivityLive";

const Simulation = (props) => {
    const { appManager, currentActivity, componentManager, liveData, updateLiveData, setCurrentActivity } = props;

    return (
        <div id='activity-area'>
            <ActivityLive appManager={appManager} currentActivity={currentActivity} setCurrentActivity={setCurrentActivity} componentManager={componentManager} liveData={liveData} updateLiveData={updateLiveData} />
        </div>
    );
}

export default Simulation;