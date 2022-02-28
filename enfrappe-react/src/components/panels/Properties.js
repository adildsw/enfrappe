import ActivityProperties from '../ui-component-properties/ActivityProperties';
import './Properties.css';

const Properties = (props) => {
    const { selected } = props;

    return (
        selected === 'None' ?
            <div id='properties-no-component'>
                <h1>Properties</h1>
                <p>No component is selected.</p>
            </div>
            : <div>
                <h1 className={'panel-heading'}>Properties</h1>
                <h2 className={'panel-subheading'}>{selected}</h2>
                { selected === 'Activity' && <ActivityProperties /> }
            </div>
    );

}

export default Properties;