import './DataViewer.css';

const DataViewer = (props) => {
    const { selectedComponent, componentManager, componentId } = props;
    const dataViewerData = componentManager.getComponent(componentId);

    console.log(dataViewerData);

    const style = {
        'color': dataViewerData['text-color'],
        'fontWeight': dataViewerData['bold'] ? 'bold' : 'normal',
        'fontStyle': dataViewerData['italic'] ? 'italic' : 'normal',
        'textDecoration': dataViewerData['underline'] ? 'underline' : 'none',
        'textAlign': dataViewerData['align'],
        'fontSize': dataViewerData['size'] === 'large' ? '1.8em' : (dataViewerData['size'] === 'medium' ? '1.4em' : '1em'),
        'marginBottom': dataViewerData['tight'] ? '-10px' : '0px'
    }

    return (
        <div>
            <div id={dataViewerData.id} className={'enfrappe-ui-dataviewer' + (selectedComponent.id === dataViewerData.id ? ' selected-component' : '')} style={style}>
                <p id={dataViewerData.id} className={'enfrappe-ui-dataviewervalue'}>
                    {dataViewerData['text']}
                </p>
            </div>
        </div>
    );
}

export default DataViewer;