import React from 'react'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts'

const Barchart = ({data}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{top: 50}}>
            <CartesianGrid />
            <XAxis dataKey='date' />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey='count' fill='#2cb1bc' barSize={10} />
        </BarChart>
        {/* <LineChart data={data} margin={{top: 50}}>
            <CartesianGrid />
            <XAxis dataKey='date' />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line dataKey='count' fill='#2cb1bc' stroke='#8884d8' />
        </LineChart> */}
    </ResponsiveContainer>
  )
}

export default Barchart