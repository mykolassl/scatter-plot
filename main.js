const canvas = document.querySelector('#scatter');
const ctx = canvas.getContext('2d');
const form = document.querySelector('form')
const inputN = document.querySelector('#inputN');
const inputK = document.querySelector('#inputK');

let chart, x0, x;

const getRandomNum = max => Math.floor(Math.random() * max) + 1;
const renderPlot = (n, k) => {
    const data = {
        datasets: [{
            label: 'Duomenys',
            data: [],
            backgroundColor: 'rgb(255, 99, 132)'
        }],
    };

    const options = {
        scales: {
            x: {
              position: 'bottom'
            },
            y: {
              position: 'left'
            }
        },
    }
    
    for(let i = 1; i <= n; i++) {
        data.datasets[0].data.push({ x: i, y: getRandomNum(k) });
    }
    
    chart = new Chart(ctx, { type: 'scatter', data, options });
};
const displayIntervalValues = () => {
    const table = document.querySelector('table');
    const xValueRow = document.createElement('tr');
    const yValueRow = document.createElement('tr');

    table.innerHTML = '';
    
    for(let i = x0; i <= x; i++) {
        const tHeader = document.createElement('th');
        const tData = document.createElement('td');

        tHeader.textContent = i;
        tData.textContent = chart.data.datasets[0].data[i].y;

        xValueRow.appendChild(tHeader);
        yValueRow.appendChild(tData);
    }

    table.append(xValueRow, yValueRow)
};

canvas.addEventListener('mousedown', (e) => {
    if(!chart) return;

    let canvasPos = Chart.helpers.getRelativePosition(e, chart);
    x0 = Math.ceil(chart.scales.x.getValueForPixel(canvasPos.x));
});

canvas.addEventListener('mouseup', (e) => {
    if(!chart) return;

    let canvasPos = Chart.helpers.getRelativePosition(e, chart);
    x = Math.floor(chart.scales.x.getValueForPixel(canvasPos.x));

    displayIntervalValues();
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    let n = Number(inputN.value);
    let k = Number(inputK.value);

    if(!n || !k) return;

    if(chart) chart.destroy();

    renderPlot(n, k);
});