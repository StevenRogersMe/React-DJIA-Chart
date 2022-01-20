import React, { Component, useEffect, useState } from 'react'
import ReactHighcharts from 'react-highcharts/ReactHighstock.src'
import moment from 'moment'
import Background from '../../assets/img/background.svg';

import {getHistoryByDay, getCurrentValue, getHistoryByMinutes} from './StockChartData';

export default function Chart ({priceData}){
  
    const options = {style: 'currency', currency: 'USD'};
    const numberFormat = new Intl.NumberFormat('en-US', options);
    const configPrice = {
      xAxis: {
          type: 'datetime',
          labels:{
              formatter: function() {
                  return moment(new Date(this.value)).format('h:mm A');
              },
              style:{
                  color: 'white',
              }
          },
      },
      yAxis: [{
          offset: 15,
          gridLineColor: 'transparent',
          labels: {
            formatter: function () {
                return numberFormat.format(this.value) 
            },
            style: {
              color: "white", 
              position: "absolute"
            },
            align: 'left'
          },
          lineColor: 'white',
          lineWidth: 1
      }],
      tooltip: {
        shared: true,
        backgroundColor: '#4A4A4A',
        borderColor: '#4A4A4A',
        borderRadius: 3,
        style:{
          fontSize:14,
        },
        formatter: function () {
          return numberFormat.format(this.y, 0) +  '</b><br/>' + moment(this.x).format('MMMM Do YYYY, h:mm')
        }
      },
      plotOptions: {
        series: {
            color: "#BA0069",
        },
        area: {
            marker: {
                radius: 2
            },
            lineWidth: 2,
            threshold: null
        }
      },
      chart: {
        styleMode: true,
        backgroundColor:"#24242E",
        height: 600,
        style:{
            color:'white'
        },
        plotBackgroundImage: `${Background}`,
      },  
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      rangeSelector: {
        buttons: [{
          type: 'day',
          count: 1,
          text: '1D',
        },{
          type: 'day',
          count: 5,
          text: '5D'
        },{
          type: 'all',
          text: 'All'
        }],
        selected: 0,
      },
      series: [{
        name: 'Price',
        type: 'area',
  
        data: priceData,
        
        marker:{
            enable: true,
            fillColor: '#159500',
            lineColor: '#159500'
        },
        fillColor:{
            linearGradient: [0, 0, 0, 300],
            stops: [
                [0, 'rgba(141, 48, 95, 0.67)'],
                [1, 'rgba(141, 48, 95, 0)']
            ]
        }
      }],
      responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                chart: {
                    height: 300
                },
                subtitle: {
                    text: null
                },
                navigator: {
                    enabled: false
                }
            }
        }]
      },
    };
    return (
      <div>
         <ReactHighcharts config = {configPrice}></ReactHighcharts>
      </div>
    )
}
