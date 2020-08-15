import React, { Component } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

export class Chart extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/time/add_data').then((response) => {
      console.log(response.data);
    });
    axios.get('http://localhost:5000/time/get_data').then((response) => {
      console.log('Response:', response.data);
      this.setState({
        data: response.data.map((deadCount) => deadCount.deadCount),
      });
    });
    axios.delete('http://localhost:5000/time/delete').then((response) => {
      console.log(response);
    });
  }

  componentDidUpdate() {
    const w = 1175;
    const h = 400;

    const accessToRef = d3
      .select(this.myRef.current)
      .append('text')
      .append('svg')
      .attr('width', w)
      .attr('height', h)
      .style('background-color', '#cccccc')
      .style('padding', 10)
      .style('margin-left', 50)
      .style('margin-top', 25)
      .text('Something');

    accessToRef
      .selectAll('rect')
      .data(this.state.data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 60)
      .attr('y', (d, i) => h - 10 * d)
      .attr('width', 50)
      .attr('height', (d, i) => d * 10)
      .attr('fill', 'darkblue');

    setInterval(() => {
      window.location.reload();
    }, 1000);
  }

  render() {
    console.log('Data:', this.state.data);
    return <div ref={this.myRef}></div>;
  }
}

export default Chart;
