import { useEffect, useState } from 'react';

import './Activity.css';

const Activity = (props) => {

    // Storing activity container dimension states
    const [{containerHeight, containerWidth}, setContainerDim] = useState({containerHeight: 0, containerWidth: 0});

    // Function for resizing activity container dimensions based on panel size
    const resizeContainer = () => {
        const spaceHeight = window.innerHeight;
        const spaceWidth = window.innerWidth * 6 / 16;
        if (spaceHeight/spaceWidth > 16/9)
            setContainerDim({containerHeight: 0.75 * spaceWidth * 16/9, containerWidth: 0.75 * spaceWidth});
        else
            setContainerDim({containerHeight: 0.75 * spaceHeight, containerWidth: 0.75 * spaceHeight * 9/16});
    };

    // Initializing activity container and setting up resize listener
    useEffect(() => {
        resizeContainer();
        window.addEventListener('resize', () => { resizeContainer(); });
    }, []);

    return (
        <div className={'enfrappe-ui-activity'} id='activity-container' style={{height: containerHeight, width: containerWidth}}>
        </div>
    );

}

export default Activity;