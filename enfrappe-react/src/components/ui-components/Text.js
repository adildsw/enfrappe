import './Text.css';

const Text = (props) => {
    const { selectedComponent, componentManager, componentId } = props;
    const textData = componentManager.getComponent(componentId);

    const style = {
        'color': textData['text-color'],
        'fontWeight': textData['bold'] ? 'bold' : 'normal',
        'fontStyle': textData['italic'] ? 'italic' : 'normal'
    }

    return (
        <div>
            <div id={textData.id} className={'enfrappe-ui-text' + (selectedComponent.id === textData.id ? ' selected-component' : '')} style={style}>
                <p id={textData.id} className={'enfrappe-ui-textvalue'}>
                    {textData['text']}
                </p>
            </div>
        </div>
    );
}

export default Text;