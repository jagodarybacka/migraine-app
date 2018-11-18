import React, {
  Component
} from 'react'
import styled from 'styled-components';
import _ from 'lodash'

import { parse, get } from './utils'
import mockedData from './mock/mock.json'

const FONT = '12px Roboto'

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

    this.drawDateAxis(ctx)
  }

  drawDateAxis(ctx) {
    const parsedDates = parse.date(this.state.data);
    const canvas = this.refs.canvas;
    const canvasWidth = canvas.width;
    const bottomPadding = canvas.height - 15;

    const axisStart = 10;
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

  render() {
    return (
      <AtmosphericPressureComponent width={300} height={300}>
        <canvas ref='canvas' width = {300} height = {400}/>
      </AtmosphericPressureComponent>
    )
  }
}

export default AtmosphericPressure;
