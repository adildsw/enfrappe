import { useState, useEffect } from 'react';
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

const ChartLive = (props) => {
    const { componentManager, appManager, componentId } = props;
    const chartData = componentManager.getComponent(componentId);

    const [xData, setXData] = useState([]);
    const [yData, setYData] = useState([]);

    const options = {
        responsive: true,
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

    const data = {
        labels: xData,
        datasets: [
            {
                data: yData,
                borderColor: chartData['line-color'],
            }
        ],
    };

    useEffect(() => {  
        const generateApiData = () => {
            var apiData = {};
            Object.keys(chartData['api-custom-params']).forEach(param => {
                apiData[param] = chartData['api-custom-params'][param];
            });
            return apiData;
        }
    
        const generateApiUrl = () => {
            var apiUrl = appManager.appData['server-address'];
            if (!apiUrl.startsWith('http://') && ! apiUrl.startsWith('https://'))
                apiUrl = 'http://' + apiUrl;
            if (apiUrl.endsWith(':'))
                apiUrl = apiUrl.slice(0, -1);
            apiUrl += ':' + appManager.appData['server-port'];
            if (apiUrl.endsWith('/'))
                apiUrl = apiUrl.substring(0, apiUrl.length - 1);
            apiUrl += chartData['api-url'];
    
            if (chartData['api-call-type'] === 'GET') {
                const apiData = generateApiData();
                apiUrl += '?' + Object.keys(apiData).map(key => key + '=' + apiData[key]).join('&');
            }
            return apiUrl;
        }
    
        const generateApiRequestInit = () => {
            console.log(parseInt(chartData['refresh-interval']) > 0 ? parseInt(chartData['refresh-interval']) * 1000 : 10000);
            var requestInit = {
                method: chartData['api-call-type'],
                timeout: parseInt(chartData['refresh-interval']) > 0 ? parseInt(chartData['refresh-interval']) * 1000 : 10000,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            if (chartData['api-call-type'] === 'POST')
                requestInit.body = JSON.stringify(generateApiData());
            return requestInit;
        }
    
        const apiUrl = generateApiUrl();
        const apiRequestInit = generateApiRequestInit();

        const fetchData = () => {
            fetch(apiUrl, apiRequestInit)
                .then(response => {
                    if (response.ok) {
                        response.json().then(data => {
                            if (data.hasOwnProperty('x') && data.hasOwnProperty('y')) {
                                setXData(data['x']);
                                setYData(data['y']);
                            }
                            else {
                                alert('Error: Invalid server response...');
                            }
                        });
                    }
                    else {
                        var statusText = response.statusText.toLowerCase();
                        statusText = statusText.charAt(0).toUpperCase() + statusText.slice(1);
                        alert('ERROR: ' + statusText);
                    }
                })
                .catch(error => {
                    alert('ERROR: Something went wrong, please check console for details...');
                    console.log(error);
                });
        }

        fetchData();

    }, [appManager.appData, chartData]);

    return (
        <div>
            <Line id={chartData.id} className={'enfrappe-ui-chartlive'}  options={options} data={data} style={{background: chartData['background']}} />
        </div>
    );
}

export default ChartLive;