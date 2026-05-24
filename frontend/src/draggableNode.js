// draggableNode.js
import {
  Download,
  Brain,
  FileOutput,
  FileText,
  Sun,
  Calculator,
  Mail,
  TimerReset,
  Database,
} from 'lucide-react';

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  const icons = {
    Input: Download,
    LLM: Brain,
    Output: FileOutput,
    Text: FileText,
    Weather: Sun,
    Math: Calculator,
    Email: Mail,
    Timer: TimerReset,
    Database: Database,
  };

  const iconColors = {
    Input: {
      bg: 'bg-violet-100',
      text: 'text-violet-600',
    },

    LLM: {
      bg: 'bg-green-100',
      text: 'text-green-600',
    },

    Output: {
      bg: 'bg-blue-100',
      text: 'text-blue-600',
    },

    Text: {
      bg: 'bg-purple-100',
      text: 'text-purple-600',
    },

    Weather: {
      bg: 'bg-amber-100',
      text: 'text-amber-600',
    },

    Math: {
      bg: 'bg-cyan-100',
      text: 'text-cyan-600',
    },

    Email: {
      bg: 'bg-rose-100',
      text: 'text-rose-600',
    },

    Timer: {
      bg: 'bg-orange-100',
      text: 'text-orange-600',
    },

    Database: {
      bg: 'bg-indigo-100',
      text: 'text-indigo-600',
    },
  };

  const Icon = icons[label];
  const colors = iconColors[label];
  return (
    <div
      className="
    px-4
    py-2
    rounded-xl
    bg-white/70
backdrop-blur-xl
border-white/40
shadow-[0_8px_30px_rgb(0,0,0,0.06)]
    border
    
    hover:bg-indigo-50
    hover:border-indigo-300
    hover:shadow-md
    transition-all
    cursor-grab
    text-sm
    font-medium
    text-slate-700
    flex
    items-center
    justify-center
    min-w-[100px]
    h-[60px]
  "
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
    >
      <div className="flex items-center gap-3">

        <div
          className={`
      w-10
      h-10
      rounded-xl
      ${colors.bg}
      flex
      items-center
      justify-center
      ${colors.bg}
    `}
        >
          <Icon
            size={18}
            className={colors.text}
          />
        </div>

        <span className="font-medium text-slate-700">
          {label}
        </span>

      </div>
    </div>
  );
};
