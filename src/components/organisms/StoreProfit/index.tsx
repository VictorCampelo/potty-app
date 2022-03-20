import React from 'react'

import {
  XAxis,
  Tooltip,
  LineChart,
  Line,
  YAxis,
  ReferenceLine,
  ResponsiveContainer
} from 'recharts'

import formatToBrl from '@/utils/formatToBrl'

interface Props {
  months: { name: string; value: number }[]
}

const CustomTooltip = ({ active, payload }: any) => {
  if (!active && !payload?.length) return null

  return (
    <div
      style={{
        background: 'rgba(216, 217, 221, 0.51)',
        padding: '0px 10px'
      }}
    >
      <p>{formatToBrl(payload[0].value)}</p>
    </div>
  )
}

const StoreProfit = ({ months }: Props) => {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <LineChart data={months}>
        <XAxis dataKey='name' />

        <YAxis width={10} style={{ display: 'none' }} />

        {months.map((month) => (
          <ReferenceLine
            key={month.name}
            x={month.name.slice(0, 3)}
            strokeDasharray='10'
            stroke='#D8D9DD'
          />
        ))}

        <Tooltip content={<CustomTooltip active payload />} />

        <Line
          dataKey='value'
          type='linear'
          stroke='#01AC8A'
          strokeWidth={2}
          dot={{
            r: 5,
            fill: '#6598D9',
            stroke: 'transparent',
            strokeWidth: 0
          }}
          activeDot={{
            r: 7,
            fill: '#6598D9',
            stroke: '#fff',
            strokeWidth: 2
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default StoreProfit
