import React, {
  Component
} from 'react'
import styled from 'styled-components';
import _ from 'lodash'

import { parse, get } from './utils'
import mockedData from './mock/mock.json'

const FONT = '10px Roboto'

const MARGIN_LEFT = 50;
const MARGIN_RIGHT = 15;
const MARGIN_TOP = 20;
const MARGIN_BOTTOM = 30;

const AtmosphericPressureComponent = styled.div`
  canvas {
    background-color: #fff;
  }
`


class AtmosphericPressure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  fetchData() {
    const parsedForecast = parse.forecast(mockedData)
    this.setState({
      data: parsedForecast
    })
  }

  updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d')
    ctx.font = FONT;
    ctx.fillStyle = "#4C5062";

    this.drawDateAxis(ctx);
    this.drawPressureAxis(ctx);
    this.drawMigraine(ctx);
    this.drawGraph(ctx)
  }

  drawDateAxis(ctx) {
    const parsedDates = parse.date(this.state.data);
    const canvas = this.refs.canvas;
    const canvasWidth = canvas.width;
    const bottomPadding = canvas.height - 10;

    const axisStart = MARGIN_LEFT;
    const axisEnd = canvasWidth - MARGIN_RIGHT;

    const listOfDates = _.uniq(get.niceDateFormat(parsedDates)) // TODO: refactor
    const daysBetween = listOfDates.length;
    const padding = (axisEnd - axisStart) / daysBetween

    const dateCoordinates = this.getDateCoordinates(parsedDates)

    let x = axisStart;
    listOfDates.forEach((date) => {
      // console.log(x, date, dateCoordinates.find(entry => entry.date === date)) // TODO: refactor to ue dateCoordinates
      ctx.fillText(date, x, bottomPadding);
      x += padding;
    })
  }

  drawPressureAxis(ctx) {
    const parsedPressures = _.uniq(parse.pressure(this.state.data)).sort()
    const canvas = this.refs.canvas;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const leftPadding = 15;
    const rightPadding = canvasWidth - MARGIN_RIGHT;
    const canvasBottom = canvasHeight - MARGIN_BOTTOM;
    const canvasTop = MARGIN_TOP;

    const rangeOfPressure = get.range(parsedPressures)
    const pressureDifference = rangeOfPressure.max - rangeOfPressure.min;

    const step = pressureDifference <= 10 ? 1 : 2;
    const numberOfSteps = pressureDifference / step;
    const padding = (canvasBottom - canvasTop) / numberOfSteps;

    const pressureCoordinates = this.getPressureCoordinates(rangeOfPressure.min, rangeOfPressure.max)

    for (let i = rangeOfPressure.min; i <= rangeOfPressure.max; i += step) {
      const coord = pressureCoordinates.find(el => el.pressure == i).coordY
      this.drawHorizontalLine(ctx, [leftPadding, coord], [rightPadding, coord])
      ctx.fillText(`${i}`, leftPadding, coord - 4);
    }
  }

  drawHorizontalLine(ctx, from, to) {
    const [fromX, fromY] = from;
    const [toX, toY] = to;
    ctx.strokeStyle = "#bdd";
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
  }

  drawDot(ctx, x, y) {
    ctx.fillStyle = "#4C5062";
    ctx.fillRect(x,y,3,3);
  }

  drawGraph(ctx) {
    const data = this.state.data;
    const parsedPressures = _.uniq(parse.pressure(data)).sort()
    const parsedDates = parse.date(this.state.data);
    const rangeOfPressure = get.range(parsedPressures)

    const pressureCoordinates = this.getPressureCoordinates(rangeOfPressure.min, rangeOfPressure.max);
    const dateCoordinates = this.getDateCoordinates(parsedDates)

    data.forEach(entry => {
      console.log(entry)
      const coordX = dateCoordinates.find(date => date.date.toString() == new Date(entry.date).toString()).coordX;
      const coordY = pressureCoordinates.find(pressure => pressure.pressure == Math.floor(entry.pressure)).coordY;
      this.drawDot(ctx, coordX, coordY)
      console.log(coordX, coordY)
    })
    console.log(data)
  }

  drawMigraine(ctx) {
    const canvas = this.refs.canvas;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const axisStart = canvasHeight - MARGIN_BOTTOM;
    const axisEnd = MARGIN_TOP;

    const blockHeight =  canvasHeight - 60
    const gradient = ctx.createLinearGradient(0, 0, 0, 300)
    gradient.addColorStop(0, 'rgba(250, 250, 250, 0)');
    gradient.addColorStop(1, '#fde');
    ctx.fillStyle = gradient;
    ctx.fillRect(50, 30, 50, blockHeight)
  }

  getPressureCoordinates(min, max) {
    const canvas = this.refs.canvas;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const yBottom = canvasHeight - 30;
    const yTop = 30

    min = Math.floor(min)
    max = Math.floor(max)

    const padding = Math.floor((yBottom - yTop) / (max - min))
    const pressureCoordinates = []

    for (let i = min, y = yBottom; i <= max; i += 1, y -= padding) {
      pressureCoordinates.push({pressure: i, coordY: y})
    }
    return pressureCoordinates
  }

  getDateCoordinates(datesList) {
    const canvas = this.refs.canvas;
    const canvasWidth = canvas.width;
    const xStart = MARGIN_LEFT;
    const xEnd = canvasWidth - MARGIN_RIGHT;

    const padding = (xEnd - xStart) / datesList.length;
    let x = xStart;
    return datesList.map(date => {
      const record = { date, coordX: x };
      x += padding;
      return record;
    })
  }

  render() {
    return (
      <AtmosphericPressureComponent width={300} height={300}>
        <canvas ref='canvas' width = {300} height = {400}/>
      </AtmosphericPressureComponent>
    )
  }
}

export default AtmosphericPressure;
