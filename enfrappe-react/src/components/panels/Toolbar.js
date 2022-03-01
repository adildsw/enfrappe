import { Divider } from 'semantic-ui-react';

import './Toolbar.css';

const Toolbar = (props) => {

    const { selectedComponent } = props;

    return (
        selectedComponent.type === 'None' ?
            <div id='toolbar-no-component'>
                <h1>Toolbar</h1>
                <p>No component is selected.</p>
            </div>
            : <div className={'scrollable-div'}>
                <div>
                    <h1 className={'panel-heading'}>Toolbar</h1>
                    <h3 className={'panel-subheading'}>Components for {selectedComponent.type}</h3>
                </div>
                <Divider />
                <div className={'scrollable-section'}></div>
            </div>
    );
}

export default Toolbar;