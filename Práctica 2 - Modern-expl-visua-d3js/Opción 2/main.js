const diCaprioBirthYear = 1974;
const age = function (year) { return year - diCaprioBirthYear }
const today = new Date().getFullYear()
const ageToday = age(today)

const width = 700
const height = 500
const margin = {
  top: 10,
  right: 10,
  bottom: 40,
  left: 40,
}
const elementPadding = 0.05

const svg = d3.select('#chart').append('svg').attr('width', width).attr('height', height)
const elementGroup = svg.append('g').attr('class', 'elementGroup').attr('transform', `translate(${margin.left}, ${margin.top})`)
const elementGroup2 = svg.append('g').attr('class', 'elementGroup2').attr('transform', `translate(${margin.left}, ${margin.top})`)

const axisGroup = svg.append('g').attr('class', 'axisGroup')
const xAxisGroup = axisGroup.append('g').attr('class', 'xAxisGroup').attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
const yAxisGroup = axisGroup.append('g').attr('class', 'yAxisGroup').attr('transform', `translate(${margin.left}, ${margin.top})`)

const x = d3.scaleBand().range([0, width - margin.left - margin.right]).padding(elementPadding)
const y = d3.scaleLinear().range([height - margin.top - margin.bottom, 0])

const xAxis = d3.axisBottom().scale(x)
const yAxis = d3.axisLeft().scale(y)

d3.csv("data.csv").then(data => {
  data.map(d => {
    d.year = +d.year
    d.age = +d.age
  })

  x.domain(data.map(d => d.year))
  y.domain([15, age(d3.max(data.map(d => d.year)))])
  yAxis.ticks(d3.max(data.map(d => d.age)))
  xAxisGroup.call(xAxis)
  yAxisGroup.call(yAxis)

  const elements = elementGroup.selectAll('rect').data(data)

  elements
    .enter()
    .append('rect')
    .attr('class', d => `${d.name.split(' ').join('-').toLowerCase()} bar`)
    .attr('x', d => x(d.year))
    .attr('width', x.bandwidth())
    .attr('y', d => y(d.age))
    .attr('height', d => height - margin.top - margin.bottom - y(d.age))
    .on("mouseover", show)
    .on("mouseout", hide)

  
  const elements2 = elementGroup2.datum(data)
    .append("path")
    .attr("id", "line")
    .attr("d", d3.line()
      .x(d => x(d.year))
      .y(d => y(age(d.year))))

  customizeAxis()
})

function show(d, i, a) {
  updateInfo(d)
  a.forEach(e => {
    if (e.classList.contains(`${d.name.split(' ').join('-').toLowerCase()}`)) {
      e.classList.add('clear-opacity')
    }
  })
  document.getElementsByClassName('ex-gf-info')[0].classList.add('show')
}

function hide(d, i, a) {
  a.forEach(e => {
    e.classList.remove('clear-opacity')
  })
  document.getElementsByClassName('ex-gf-info')[0].classList.remove('show')
}

function updateInfo(data) {
  document.getElementById('name').textContent = data.name
  document.getElementById('age').textContent = data.age
  document.getElementById('ageDiff').textContent = age(data.year) - data.age
}

function customizeAxis() {
  axisGroup.selectAll(".tick text")
    .attr("font-family","fantasy")
    .attr("font-size","12")
}