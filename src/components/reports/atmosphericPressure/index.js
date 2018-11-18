import React, {
  Component
} from 'react'
import styled from 'styled-components';
import _ from 'lodash'

import { parse, get } from './utils'
import mockedData from './mock/mock.json'

const FONT = '10px Roboto'

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
  }

  drawDateAxis(ctx) {
    const parsedDates = parse.date(this.state.data);
    const canvas = this.refs.canvas;
    const canvasWidth = canvas.width;
    const bottomPadding = canvas.height - 15;

    const axisStart = 40;
    const axisEnd = canvasWidth;

    const listOfDates = _.uniq(get.niceDateFormat(parsedDates))
    const daysBetween = listOfDates.length;
    const padding = (axisEnd - axisStart) / daysBetween

    let x = axisStart;
    listOfDates.forEach((date) => {
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
    const rightPadding = canvasWidth - 15;
    const axisStart = canvasHeight - 30;
    const axisEnd = 30;

    const rangeOfPressure = get.range(parsedPressures)
    const pressureDifference = rangeOfPressure.max - rangeOfPressure.min;

    const step = pressureDifference <= 10 ? 1 : 3;
    const numberOfSteps = pressureDifference / step;
    const padding = (axisStart - axisEnd) / numberOfSteps;

    for (let i = rangeOfPressure.min, y = axisStart; i <= rangeOfPressure.max; i += step, y -= padding) {
      this.drawHorizontalLine(ctx, [leftPadding, y], [rightPadding, y])
      ctx.fillText(`${i}`, leftPadding, y - 3);
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

  render() {
    return (
      <AtmosphericPressureComponent width={300} height={300}>
        <canvas ref='canvas' width = {300} height = {500}/>
      </AtmosphericPressureComponent>
    )
  }
}

export default AtmosphericPressure;
