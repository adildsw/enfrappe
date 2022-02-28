import './Toolbar.css';

const Toolbar = (props) => {

    const { selected } = props;

    return (
        selected === 'None' ?
            <div id='toolbar-no-component'>
                <h1>Toolbar</h1>
                <p>No component is selected.</p>
            </div>
            : <div>
                <h1 className={'panel-heading'}>Toolbar</h1>
                <h2 className={'panel-subheading'}>Components for {selected}</h2>
            </div>
    );
}

export default Toolbar;