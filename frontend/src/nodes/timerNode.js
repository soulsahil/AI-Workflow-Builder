import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { TimerReset } from 'lucide-react';
import { ChevronDown } from 'lucide-react';

export const TimerNode = ({ id }) => {

  const [duration, setDuration] = useState('⏱️ 10 sec');
  const [isOpen, setIsOpen] = useState(false);

  const handles = [
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-done`,
    },
  ];

  return (
    <BaseNode
      title="Timer"
      handles={handles}
      icon={TimerReset}
      iconBg="bg-orange-100"
      iconColor="text-orange-600"
    >

      <div className="flex flex-col gap-2">

        <label
          className="
      text-sm
      font-medium
      text-slate-500
    "
        >
          Duration
        </label>

        <div className="relative w-full">

          <button
            type="button"
            onClick={() =>
              setIsOpen((prev) => !prev)
            }
            className="
      inline-flex
      w-full
      items-center
      justify-between
      rounded-[22px]
      border
      border-slate-200
      bg-white
      px-4
      py-3
      text-sm
      font-medium
      text-slate-700
      shadow-sm
      transition-all
      hover:border-orange-300
      focus:outline-none
      focus:ring-4
      focus:ring-orange-100
    "
          >

            <span>
              {duration}
            </span>

            <ChevronDown
              size={18}
              className={`
        text-slate-400
        transition-transform
        ${isOpen
                  ? 'rotate-180'
                  : ''
                }
      `}
            />

          </button>

          {isOpen && (

            <div
              className="
        absolute
        left-0
        top-full
        z-[9999]
        mt-2
        w-full
        rounded-[22px]
        border
        border-slate-200
        bg-white
        p-2
        shadow-2xl
      "
            >

              {[
                '⏱️ 10 sec',
                '⏳ 30 sec',
                '🕐 1 min',
              ].map((item) => (

                <button
                  key={item}
                  onClick={() => {
                    setDuration(item);
                    setIsOpen(false);
                  }}
                  className="
            w-full
            rounded-xl
            px-4
            py-3
            text-left
            text-sm
            font-medium
            text-slate-700
            transition-all
            hover:bg-orange-50
          "
                >

                  {item}

                </button>

              ))}

            </div>

          )}

        </div>

      </div>

    </BaseNode>
  );
};