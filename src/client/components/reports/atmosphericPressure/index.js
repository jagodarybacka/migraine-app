import React, {
  Component
} from 'react'
import styled from 'styled-components';
import _ from 'lodash'
import CustomPeriod from '../../CustomPeriod'
import customImg from '../../../assets/custom-options.png'

import { parse, get } from './utils'
import axios from 'axios';
import {languageText} from '../../../languages/MultiLanguage.js'

const FONT = '10px Roboto'

const MARGIN_LEFT = 50;
const MARGIN_RIGHT = 15;

const COLORS = {
  'No Pain': '#AADD6D',
  'Mild': '#A7C651',
  'Moderate': '#EAB933',
  'Intense': '#ED8836',
  'Maximum': '#EF6F5A',
}

const AtmosphericPressureComponent = styled.div`
  margin: 0 5%;
  background-color: #fff;
  padding: 0;
  padding-top: 3em;
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  canvas {
    background-color: #fff;
  }
  .summary__period {
    text-align: center;
    margin: 0;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    top: 1em;
    font-size: 1em;
    opacity: 0.6;
  }
`

export const CustomIcon = styled.img`
  width: 32px;
  height: auto;
  position: absolute;
  top: 1em;
  right: 1em;
  z-index: 100;
`
export const CustomPeriodComponent = styled.div`
  position: absolute;
  background: #fff;
  width: 100%;
  height: 100%;
  text-align: center;
  top: 0;
  .custom__cancel {
    position: absolute;
    top: 0.5em;
    right: 0.5em;
  }
  .custom__header {
    margin: 1em 0 0;
  }
`


class AtmosphericPressure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      daysPast: 8,
      daysFuture: 1,
      data: [],
      timePeriod: {
        from: new Date(),
        to: new Date()
      },
      migraines: [],
      customPeriodVisible: false,
      customPeriodApplied: false
    }
    this.handleCustomPeriod = this.handleCustomPeriod.bind(this);
  }

  componentDidMount() {
    const now = new Date();
    const { daysPast, daysFuture } = this.state;
    const from = new Date(now.getFullYear(),now.getMonth(),now.getDate()-daysPast);
    const to = new Date(now.getFullYear(),now.getMonth(),now.getDate()+daysFuture);
    this.setState((prevState) => ({
      ...prevState,
      timePeriod: {from: from, to: to}
    }), () => {
      this.fetchData();
      this.fetchMigraines();
    })
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  fetchData() {
    const url = "/api/forecast/" + this.state.timePeriod.from + '-' + this.state.timePeriod.to;
    axios.get(url)
    .then((res) => {
      if(res.status === 204) {
        alert(languageText.atmosphericPressure.noPressureData);
      }
      if(res.data) {
        const parsedForecast = parse.forecast(res.data, this.state.timePeriod.from, this.state.timePeriod.to);
        console.log(parsedForecast)
        this.setState({
          data: parsedForecast
        })
      }
    })
    .catch((err) => console.log(err));
  }

  fetchMigraines() {
    const url = "/api/reports/pressure/" + this.state.timePeriod.from + '-' + this.state.timePeriod.to;
    axios.get(url)
    .then((res) => {
      if(res.status === 204){
        console.log(languageText.atmosphericPressure.noData);
      }
      if(res.data) {
        this.setState({
          migraines: res.data
        })
      }
    })
    .catch((err) => console.log(err));
  }

  updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.font = FONT;
    ctx.fillStyle = "#4C5062";

    this.drawDateAxis(ctx);
    this.drawPressureAxis(ctx);
    this.drawMigraines(ctx);
    ctx.fillStyle = "#4C5062";

    this.drawGraph(ctx)
  }

  drawDateAxis(ctx) {
    const parsedDates = parse.date(this.state.data);
    const canvas = this.refs.canvas;
    const canvasWidth = canvas.width;
    const bottomPadding = canvas.height - 10;

    const axisStart = MARGIN_LEFT;
    const axisEnd = canvasWidth - MARGIN_RIGHT;

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

    const leftPadding = 15;
    const rightPadding = canvasWidth - MARGIN_RIGHT;

    const rangeOfPressure = get.range(parsedPressures)
    const pressureDifference = rangeOfPressure.max - rangeOfPressure.min;

    const step = pressureDifference <= 10 ? 1 : 2;

    const pressureCoordinates = this.getPressureCoordinates(rangeOfPressure.min, rangeOfPressure.max)

    for (let i = rangeOfPressure.min; i <= rangeOfPressure.max; i += step) {
      const coord = pressureCoordinates.find(el => el.pressure === i).coordY
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
      if (!entry.omit) {
        const coordX = dateCoordinates.find(date => date.date.toString() === new Date(entry.date).toString()).coordX;
        const coordY = pressureCoordinates.find(pressure => pressure.pressure === Math.floor(entry.pressure)).coordY;
        this.drawDot(ctx, coordX, coordY)
      }
    })
  }

  drawMigraines(ctx) {
    // Setup variables
    const canvas = this.refs.canvas;
    const canvasHeight = canvas.height;
    const blockHeight =  canvasHeight - 60;

    const parsedDates = parse.date(this.state.data);
    const dateCoordinates = this.getDateCoordinates(parsedDates)

    const migraines = this.state.migraines;

    // DRAW!
    const migrainesToDraw = migraines.map((migraine) => {
      // Remove minutes
      const start = new Date(parse.fixHour(migraine.start_date.slice(0, -11)))
      const end = new Date(parse.fixHour(migraine.end_date.slice(0, -11)))

      let start_coord = dateCoordinates.find((el) => el.date.toString() === start.toString())
      let end_coord = dateCoordinates.find((el) => el.date.toString() === end.toString())

      if (start_coord && end_coord) {
        return {
          migraine,
          start_coord,
          end_coord
        }
      }
      return undefined;
    }).filter(migraine => !!migraine)

    migrainesToDraw.forEach(draw => {
      const duration = draw.end_coord.coordX - draw.start_coord.coordX || 5;
      const color = COLORS[draw.migraine.pain] || '#9e9e9e'
      const gradient = ctx.createLinearGradient(0, 0, 0, 300)
      gradient.addColorStop(0, 'rgba(250, 250, 250, 0)');
      gradient.addColorStop(1, color);
      ctx.fillStyle = gradient;
      ctx.fillRect(draw.start_coord.coordX, 30, duration, blockHeight)
    })
  }

  getPressureCoordinates(min, max) {
    const canvas = this.refs.canvas;
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

  handleCustomPeriod({from, to, cancel}) {
    if (cancel) {
      this.setState({
        customPeriodVisible: false
      })
      return;
    }
    this.setState((prevState) => ({
      ...prevState,
      customPeriodVisible: false,
      customPeriodApplied: true,
      timePeriod: {from: from, to: to}
    }), () => {
      this.fetchData();
      this.fetchMigraines();
    })
  }

  render() {

    const customPeriod = this.state.customPeriodVisible ? (
      <CustomPeriod onConfirmFn={this.handleCustomPeriod.bind(this)}/>
    ) : '';

    const periodRange = (
      <p className="summary__period">
        {localStorage.getItem('lang') === 'eng'
          ? this.state.timePeriod.from.toDateString()
          : this.state.timePeriod.from.toLocaleDateString() }
        <br />
        {localStorage.getItem('lang') === 'eng'
          ? this.state.timePeriod.to.toDateString()
          : this.state.timePeriod.to.toLocaleDateString() }
      </p>
    )

    const Icon = this.state.customPeriodVisible
      ? ""
      : ( <CustomIcon src={customImg} onClick={() => this.setState({customPeriodVisible: true})}/> )

    return (
      <AtmosphericPressureComponent width={300} height={300}>
        { Icon }
        { periodRange }
        <canvas ref='canvas' width = {300} height = {350}/>
        { customPeriod }
      </AtmosphericPressureComponent>
    )
  }
}

export default AtmosphericPressure;
