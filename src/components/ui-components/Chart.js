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

import './Chart.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const Chart = (props) => {
    const { selectedComponent, componentManager, componentId } = props;
    const chartData = componentManager.getComponent(componentId);

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
                display: chartData['title'].length > 0,
                text: chartData['title'],
                color: chartData['text-color'],
            }
        },
        scales: {
            y: {
                ticks: {
                    display: true,
                    color: chartData['text-color'],
                },
                title : {
                    display: chartData['y-label'].length > 0,
                    text: chartData['y-label'],
                    color: chartData['text-color'],
                },
                grid : {
                    color: chartData['text-color'] + '20',
                }
            },
            x: {
                ticks: {
                    display: true,
                    color: chartData['text-color'],
                },
                title : {
                    display: chartData['x-label'].length > 0,
                    text: chartData['x-label'],
                    color: chartData['text-color'],
                },
                grid : {
                    color: chartData['text-color'] + '20',
                }
            }
        }
    };

    const x = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const y = [58, 61, 53, 48, 56, 55, 40, 35, 45, 53];

    const data = {
        labels: x,
        datasets: [
          {
            data: y,
            borderColor: chartData['line-color'],
          }
        ],
      };

    return (
        <div>
            <Line id={chartData.id} className={'enfrappe-ui-chart' + (selectedComponent.id === chartData.id ? ' selected-component' : '')}  options={options} data={data} style={{background: chartData['background']}} />
        </div>
    );
}

export default Chart;