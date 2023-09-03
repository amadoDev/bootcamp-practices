const width = 600
const height = 400
const margin = {
  top: 10,
  right: 10,
  bottom: 40,
  left: 40,
}
const elementPadding = 0.3
const gradiantColors = ['tomato', 'crimson']

const svg = d3.select('#chart').append('svg').attr('width', width).attr('height', height)
const elementGroup = svg.append('g').attr('class', 'elementGroup').attr('transform', `translate(${margin.left}, ${margin.top})`)

const axisGroup = svg.append('g').attr('class', 'axisGroup')
const xAxisGroup = axisGroup.append('g').attr('class', 'xAxisGroup').attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
const yAxisGroup = axisGroup.append('g').attr('class', 'yAxisGroup').attr('transform', `translate(${margin.left}, ${margin.top})`)

const x = d3.scaleBand().range([0, width - margin.left - margin.right]).padding(elementPadding)
const y = d3.scaleLinear().range([height - margin.top - margin.bottom, 0])

const xAxis = d3.axisBottom().scale(x)
const yAxis = d3.axisLeft().scale(y)

const defs = svg.append('defs')
const bgGradient = defs
  .append('linearGradient')
  .attr('id', 'bg-gradient')
  .attr('gradientTransform', 'rotate(90)');
bgGradient
  .append('stop')
  .attr('stop-color', gradiantColors[0])
  .attr('offset', '0%');
bgGradient
  .append('stop')
  .attr('stop-color', gradiantColors[1])
  .attr('offset', '100%');

let dataYears
let dataWinners

d3.csv("WorldCup.csv").then(data => {
  data.map(d => {
    d.Year = +d.Year
  })
  
  dataYears = data

  filterDataByYear(d3.max(data.map(d => d.Year)))

  x.domain(dataWinners.map(d => d.Winner))
  y.domain([0, d3.max(dataWinners.map(d => d.Wins))])
  yAxis.ticks(d3.max(dataWinners.map(d => d.Wins)))
  xAxisGroup.call(xAxis)
  yAxisGroup.call(yAxis)

  customizeAxis()
  update(dataWinners)
  slider()
})

function update(data) {
  const elements = elementGroup.selectAll('rect').data(data)
  elements
    .enter()
    .append('rect')
    .style("fill", "url(#bg-gradient)")
    .attr('class', d => `${d.Winner} bar`)
    .attr('x', d => x(d.Winner))
    .attr('width', x.bandwidth())
    .attr('y', d => y(d.Wins))
    .attr('height', d => height - margin.top - margin.bottom - y(d.Wins))

  elements
    .attr('x', d => x(d.Winner))
    .attr('width', x.bandwidth())
    .transition()
    .duration(300)
    .attr('y', d => y(d.Wins))
    .attr('height', d => height - margin.top - margin.bottom - y(d.Wins))
  
  elements.exit().remove()
}

function filterDataByYear(year) {
  dataWinners = []
  dataYears.forEach(e => {
    const winnerIndex = dataWinners.findIndex(n => n.Winner === e.Winner)
    if(winnerIndex === -1) {
      dataWinners.push({
        Wins: e.Year <= year ? 1 : 0,
        Winner: e.Winner,
      })
    } else {
      if (e.Year <= year) {
        dataWinners[winnerIndex].Wins++
      }
    }
  })
}

function customizeAxis() {
  axisGroup.selectAll(".tick text")
    .attr("font-family","fantasy")
    .attr("font-size","12")
}

function slider() {
  // esta función genera un slider:
  const years = dataYears.map(d => d.Year)
  var sliderTime = d3
    .sliderBottom()
    .min(d3.min(years))  // rango años
    .max(d3.max(years))
    .step(4)  // cada cuánto aumenta el slider (4 años)
    .width(580)  // ancho de nuestro slider en px
    .ticks(years.length)
    .default(years[years.length - 1])  // punto inicio del marcador
    .on('onchange', val => {
      // hay que filtrar los datos según el valor que marquemos en el slider y luego actualizar la gráfica con update
      filterDataByYear(val)
      d3.select('p#value-time').text(val)
      update(dataWinners)
    });

  // contenedor del slider
  var gTime = d3
    .select('div#slider-time')  // div donde lo insertamos
    .append('svg')
    .attr('width', 640)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)')

  gTime.call(sliderTime);  // invocamos el slider en el contenedor

  d3.select('p#value-time').text(sliderTime.value());  // actualiza el año que se representa
}