import React from 'react';
import ReactEcharts from 'echarts-for-react';


const Charts = props => {

  const {
    option
  } = props

  return (
    <ReactEcharts
      option={option}
      style={{height: '100%', width: '100%'}}
    />
  )
}

export default Charts
