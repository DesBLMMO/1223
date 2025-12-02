import React, { useState } from 'react';

// Chart 1: Donut Chart (SVG)
export const DonutChart = ({ data, size = 160 }) => {
  const total = data.reduce((a, b) => a + b.value, 0);
  let currentAngle = 0;
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 40 40" className="transform -rotate-90">
        {data.map((item, i) => {
          const percentage = (item.value / total) * 100;
          const dashArray = `${percentage} ${100 - percentage}`;
          currentAngle += percentage;
          return (
            <circle
              key={i} cx="20" cy="20" r="15.91549430918954" fill="transparent" stroke={item.color}
              strokeWidth="5" strokeDasharray={dashArray} strokeDashoffset={-currentAngle + percentage}
              className="transition-all duration-500 hover:stroke-[6]"
            />
          );
        })}
      </svg>
      <div className="absolute text-center">
        <span className="text-xl font-bold text-[#232f3e]">{data[1]?.value}%</span>
        <p className="text-[10px] text-gray-500">Returns</p>
      </div>
    </div>
  );
};

// Chart 2: Double Bar Chart (Revenue)
export const RevenueBarChart = ({ onlineData, offlineData, labels, height = 250 }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  if (!onlineData || !offlineData) return null;
  const rawMax = Math.max(...onlineData, ...offlineData);
  const max = Math.ceil(rawMax / 5000) * 5000 || 100;
  
  return (
    <div className="w-full relative select-none" style={{ height: `${height}px` }}>
      <div className="ml-0 h-full relative">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
          {onlineData.map((onlineVal, i) => {
            const offlineVal = offlineData[i];
            const onlineH = (onlineVal / max) * 100;
            const offlineH = (offlineVal / max) * 100;
            const groupWidth = 100 / onlineData.length;
            const barWidth = groupWidth * 0.25; 
            const xCenter = i * groupWidth + (groupWidth / 2);
            return (
              <g key={i} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)}>
                <rect x={xCenter - barWidth - 0.5} y={100 - onlineH} width={barWidth} height={onlineH} fill="#0095FF" rx="1" ry="1" className="opacity-90 hover:opacity-100" />
                <rect x={xCenter + 0.5} y={100 - offlineH} width={barWidth} height={offlineH} fill="#00E096" rx="1" ry="1" className="opacity-90 hover:opacity-100" />
              </g>
            );
          })}
        </svg>
        <div className="flex justify-between items-center mt-2 px-2 h-6">
          {labels.map((l, i) => <span key={i} className="text-[10px] text-gray-400 flex-1 text-center">{l}</span>)}
        </div>
      </div>
    </div>
  );
};

// Chart 3: Line Chart
export const VisitorLineChart = ({ data, height = 250 }) => {
  const max = Math.max(...data.loyal, ...data.new) * 1.1;
  const getPoints = (arr) => arr.map((val, i) => `${(i / (arr.length - 1)) * 100},${100 - (val / max) * 100}`).join(' ');
  return (
    <div className="w-full h-full relative" style={{ height: `${height}px` }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
        <polyline points={getPoints(data.loyal)} fill="none" stroke="#884DFF" strokeWidth="1.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <polyline points={getPoints(data.new)} fill="none" stroke="#FF4560" strokeWidth="1.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
};