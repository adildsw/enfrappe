import { useDrag } from "react-dnd";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import UIItemTypes from "../../../utils/UIItemTypes";

import '../Chart.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const ChartStatic = () => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: UIItemTypes.CHART,
        item: { 'type': UIItemTypes.CHART },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }));

    const options = {
        responsive: true,
        events: [],
        animation: {
            duration: 0
        },
        plugins: {
            legend: {
                display: false,
                position: 'top',
            },
            title: {
                display: false,
                text: 'Chart Title',
            }
        },
        scales: {
            y: {
                ticks: {
                    display: false,
                }
            },
            x: {
                ticks: {
                    display: false,
                }
            }
        }
    };

    const x = ['', '', '', '', '', '', '', '', '', '', '', ''];
    const y = [58, 61, 53, 48, 56, 55, 40, 35, 45, 53, 55, 60];

    const data = {
        labels: x,
        datasets: [
            {
                data: y,
                borderColor: 'rgb(34, 34, 34)',
            }
        ],
    };

    return (
        <div>
            <h3>Chart</h3>
            <div ref={drag} className={'draggable-enfrappe-ui'}>
                <Line options={options} data={data} className={'enfrappe-ui-chart enfrappe-ui-chartstatic'} style={{ 'background': '#FFFFFF', 'opacity': isDragging ? '0.4' : '1' }} />
            </div>

        </div>
    );
}

export default ChartStatic;