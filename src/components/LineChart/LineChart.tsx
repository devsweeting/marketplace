import React from 'react';
import { LineChart as Chart, Line, XAxis, ResponsiveContainer } from 'recharts';
const data = [
  { name: 'Dec 19', uv: 400, pv: 2400, amt: 2400 },
  { name: 'JAN 02', uv: 500, pv: 2400, amt: 2400 },
  { name: 'JAN 15', uv: 600, pv: 2400, amt: 2400 },
  { name: 'JAN 13', uv: 400, pv: 2400, amt: 2400 },
  { name: 'FEB 27', uv: 200, pv: 2400, amt: 2400 },
  { name: 'MAR 13', uv: 300, pv: 2400, amt: 2400 },
];

export const LineChart = () => {
  return (
    <ResponsiveContainer width="100%" height={361}>
      <Chart style={{ border: '1px solid red' }} data={data}>
        <Line type="monotone" dataKey="uv" stroke="red" style={{}} />
        <XAxis dataKey="name" axisLine={false} />
      </Chart>
    </ResponsiveContainer>
  );
};
