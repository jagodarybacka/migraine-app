import React, {
  Component
} from 'react'
import { parseForcast } from './utils'
import mockedData from './mock/mock.json'

class AtmosphericPressure extends Component {
  constructor(props) {
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this.fecthData();
    this.updateCanvas();
  }

  fetchData() {
    this.setState({
      data: mockedData
    })
  }

  updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d')
  }

  render() {
    return ( <canvas ref='canvas' width = {300} height = {300}/>)
  }
}
