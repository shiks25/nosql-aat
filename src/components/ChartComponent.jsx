import React, { Component } from 'react'
import UserService from '../services/UserService'
import { Chart as ChartJS } from 'chart.js/auto'
import {Bar, Doughnut} from 'react-chartjs-2'

class ChartComponent extends Component {
    constructor(props) {
        super(props)
        this.state  = {
            chartData : {},
            pieData : {}
        }
    }

    componentDidMount(){

        UserService.graphOne('Bar').then((res) => {
            this.setState({chartData : res.data});
        });

        UserService.graphOne('Pie').then((res) =>{
            this.setState({pieData : res.data});

        });
        
    }

    render() {
        const labels1 = Object.keys( this.state.chartData)
        const values1 = Object.values(this.state.chartData)
        const barData = {
            labels: labels1,
            datasets: [
                {
                    label: 'Avg Calorie Content',
                    backgroundColor: ['rgba(75,192,192,1)'],
                    borderColor: ['rgba(0,0,0,1)'],
                    borderWidth: 2,
                    data: values1
                }
            ]
        }
        const labels2 = Object.keys(this.state.pieData)
        const values2 = Object.values(this.state.pieData)
        const pieChart = {
            labels : labels2,
            datasets: [
                {
                    label: 'Caffeine Content',
                    backgroundColor: [
                        '#B21F00',
                        '#C9DE00',
                        '#2FDE00',
                        '#00A6B4',
                        '#6800B4',
                        '#FFC0CB'
                      ],
                      hoverBackgroundColor: [
                      '#501800',
                      '#4B5000',
                      '#175000',
                      '#003350',
                      '#35014F',
                      '#742a40'
                      ],
                      data : values2
                }
            ]
        }
        return (
                <div>
                    <br></br>
                <Bar
                 data={barData}
                    options={{
                        plugins:{
                            title:{
                                display:true,
                                text:'Average Calorie Content in drinks',
                                fontSize:20
                            },
                                legend:{
                                display:true,
                                position:'top'
                            }
                        }
                    }}
                />
                <br></br>
                <Doughnut
                    data={pieChart}
                    width={50}
                    height={60}
                    options={{
                        plugins:{
                            title:{
                                display:true,
                                text:'Max Caffeine content per drink',
                                fontSize:20
                            },
                                legend:{
                                display:true,
                                position:'right'
                            }
                        }
                }}
                />
                </div>
            );
        }
    }
    
    export default ChartComponent