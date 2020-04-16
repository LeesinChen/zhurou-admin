import React, {useState} from 'react'
import styles from './index.less'

import Card from './components/Card'
import Chart from '@/components/Chart'

import icon1 from '@/assets/icon/qushi.png'
import icon2 from '@/assets/icon/changyongmoban.png'
import icon3 from '@/assets/icon/lingquhongbao.png'
import icon4 from '@/assets/icon/bangdan.png'

const Dashboard = () => {

  const cards = [
    {
      icon: icon1,
      name: '今日销量',
      number: '8997.38元'
    },
    {
      icon: icon2,
      name: '今日订单',
      number: '767单'
    },
    {
      icon: icon3,
      name: '订单总额',
      number: '8997.38元'
    },
    {
      icon: icon4,
      name: '今日最佳',
      number: '一级五花'
    }
  ]

  const option = {
    title: {
      text: '商品销售占比'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 10,
      bottom: 10,
      data: ['一级五花', '一级筒骨', '猪蹄', '瘦肉', '小排']
    },
    series: [
      {
        name: '销量占比',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '30',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          {value: 335, name: '一级五花'},
          {value: 310, name: '一级筒骨'},
          {value: 234, name: '猪蹄'},
          {value: 135, name: '瘦肉'},
          {value: 1548, name: '小排'}
        ]
      }
    ]
  }

  const option1 = {
    title: {
      text: '订单成交趋势'
    },
    xAxis: {
      type: 'category',
      data: ['8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true
    }]
  };


  return (
    <div className="global-container">
      <div className={styles.cardWrapper}>
        {cards.map((d, i) => {
          return <Card key={i} item={d} />
        })}
      </div>
      <div className={styles.chartsWrapper}>
        <div className={styles.chartItem}>
          <Chart
            option={option}
          />
        </div>
        <div className={styles.chartItem}>
          <Chart
            option={option1}
          />
        </div>
      </div>
      <div className={styles.chartsWrapper}>
        <div className={styles.chartItem}>
          <Chart
            option={option}
          />
        </div>
        <div className={styles.chartItem}>
          <Chart
            option={option}
          />
        </div>
      </div>
    </div>
  )
}


export default Dashboard
