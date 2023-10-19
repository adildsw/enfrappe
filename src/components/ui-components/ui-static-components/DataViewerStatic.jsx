import { useDrag } from "react-dnd";
import { Loader } from "semantic-ui-react";

import UIItemTypes from "../../../utils/UIItemTypes";

import '../DataViewer.css';

const DataViewerStatic = () => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: UIItemTypes.DATAVIEWER,
        item: { 'type': UIItemTypes.DATAVIEWER },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }));

    return (
        <div>
            <h3>Data Viewer</h3>
            <div ref={drag} className={'enfrappe-ui-dataviewer enfrappe-ui-dataviewerstatic draggable-enfrappe-ui'} style={{'opacity': isDragging ? '0.4' : '1'}}>
                <Loader active inline='centered' >Loading server data...</Loader>
            </div>
        </div>
    );
}

export default DataViewerStatic;