"use client";

import React, { PureComponent } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface TasksChartProps {
  data: any
}

export default class TasksChart extends PureComponent<TasksChartProps> {
  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={this.props.data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Radar name="tasks" dataKey="total_tasks" stroke="#71717a" fill="#059669" fillOpacity={0.9} />
        </RadarChart>
      </ResponsiveContainer>
    );
  }
}
