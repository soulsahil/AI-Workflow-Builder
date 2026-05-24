import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Mail } from 'lucide-react';

export const EmailNode = ({ id }) => {

  const [email, setEmail] = useState('');

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-message`,
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-status`,
    },
  ];

  return (
    <BaseNode
      title="Email"
      handles={handles}
      icon={Mail}
      iconBg="bg-rose-100"
      iconColor="text-rose-600"
    >

      <label
        className="
        text-sm
        font-medium
        text-slate-500
      "
      >
        Recipient
      </label>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="
        w-full
        rounded-xl
        border
        border-slate-200
        bg-white
        px-4
        py-3
        text-sm
        text-slate-700
        outline-none
        focus:border-violet-400
        focus:ring-2
        focus:ring-violet-100
        transition-all
      "
      />


    </BaseNode>
  );
};