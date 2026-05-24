import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Database } from 'lucide-react';

export const DatabaseNode = ({ id }) => {

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-query`,
      style: {
        top: '35%',
      },
    },
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-filters`,
      style: {
        top: '70%',
      },
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-results`,
    },
  ];

  return (
    <BaseNode
      title="Database"
      handles={handles}
      icon={Database}
      iconBg="bg-indigo-100"
      iconColor="text-indigo-600"
    >

      <div
        className="
    text-sm
    text-slate-500
    leading-relaxed
  ">
        Executes database queries.
      </div>

    </BaseNode>
  );
};