import React from 'react'
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
const data = [
    { name: 'Mon', new: 5, success: 2 },
    { name: 'Tue', new: 8, success: 4 },
    { name: 'Wed', new: 6, success: 5 },
    { name: 'Thu', new: 9, success: 6 },
    { name: 'Fri', new: 7, success: 5 },
];

const Newscustomerchart = () => {
    return (
        <>
            <div className="chart-wrapper">
                <ResponsiveContainer>
                    <BarChart data={data} barGap={5}>
                        <defs>
                            <pattern id="linePattern" patternUnits="userSpaceOnUse" width="6" height="6">
                                <path d="M0,0 L6,6" stroke="#000000" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis ticks={[0, 5, 10]} />
                        <Tooltip />
                        <Bar dataKey="success" fill="url(#linePattern)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="new" fill="#000000" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default Newscustomerchart