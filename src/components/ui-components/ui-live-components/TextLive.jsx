import '../Text.css';

const TextLive = (props) => {
    const { componentManager, componentId } = props;
    const textData = componentManager.getComponent(componentId);

    const style = {
        'color': textData['text-color'],
        'fontWeight': textData['bold'] ? 'bold' : 'normal',
        'fontStyle': textData['italic'] ? 'italic' : 'normal',
        'textDecoration': textData['underline'] ? 'underline' : 'none',
        'textAlign': textData['align'],
        'fontSize': textData['size'] === 'large' ? '1.8em' : (textData['size'] === 'medium' ? '1.4em' : '1em'),
        'marginBottom': textData['tight'] ? '-10px' : '0px'
    }

    return (
        <div>
            <div id={textData.id} className={'enfrappe-ui-textlive'} style={style}>
                <p id={textData.id}>
                    {textData['text']}
                </p>
            </div>
        </div>
    );
}

export default TextLive;