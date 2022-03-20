import React from 'react'

import { BarChart, Bar, Cell, XAxis, ResponsiveContainer } from 'recharts'

interface Props {
  monday: number
  tuesday: number
  wednesday: number
  thursday: number
  friday: number
  saturday: number
  sunday: number
  today: number
}

const StoreAccess = ({
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
  sunday,
  today
}: Props) => {
  const dataChart = [
    {
      name: 'Seg',
      value: monday,
      id: 1,
      color: '#01AC8A'
    },
    {
      name: 'Ter',
      value: tuesday,
      id: 2,
      color: '#6598D9'
    },
    {
      name: 'Qua',
      value: wednesday,
      id: 3,
      color: '#01AC8A'
    },
    {
      name: 'Qui',
      value: thursday,
      id: 4,
      color: '#6598D9'
    },
    {
      name: 'Sex',
      value: friday,
      id: 5,
      color: '#01AC8A'
    },
    {
      name: 'Sáb',
      value: saturday,
      id: 6,
      color: '#6598D9'
    },
    {
      name: 'Dom',
      value: sunday,
      id: 7,
      color: '#01AC8A'
    },
    {
      name: 'Hoje',
      value: today,
      id: 8,
      color: '#3C8EFC'
    }
  ]

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart data={dataChart} barSize={60} barGap='10px'>
        <XAxis
          dataKey='name'
          tickLine={false}
          axisLine={false}
          tickMargin={10}
        />
        <Bar
          dataKey='value'
          radius={5}
          label={{ position: 'top', fill: '#363F4E' }}
        >
          {dataChart.map((data) => (
            <Cell fill={data.color} key={data.id + '--'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default StoreAccess
