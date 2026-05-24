import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Sun } from 'lucide-react';

export const WeatherNode = ({ id }) => {

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-city`,
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-weather`,
    },
  ];

  return (
    <BaseNode
      title="Weather"
      handles={handles}
      icon={Sun}
      iconBg="bg-amber-100"
      iconColor="text-amber-600"
    >

      <div className="
    text-sm
    text-slate-500
    leading-relaxed
  ">
        Fetch weather data from city input.
      </div>

    </BaseNode>
  );
};