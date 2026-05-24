import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Calculator } from 'lucide-react';
import { ChevronDown } from 'lucide-react';

export const MathNode = ({ id }) => {

  const [operation, setOperation] = useState('Add');
  const [isOperationOpen, setIsOperationOpen] = useState(false);

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-a`,
      style: {
        top: '35%',
      },
    },
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-b`,
      style: {
        top: '70%',
      },
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-result`,
    },
  ];

  return (
    <BaseNode
      title="Math"
      handles={handles}
      icon={Calculator}
      iconBg="bg-cyan-100"
      iconColor="text-cyan-600"
    >

      <div className="flex flex-col gap-2">

        <label
          className="
      text-sm
      font-medium
      text-slate-500
    "
        >
          Operation
        </label>

        <div className="relative w-full">

          <button
            type="button"
            onClick={() =>
              setIsOperationOpen((prev) => !prev)
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
      text-[15px]
      font-medium
      text-slate-700
      shadow-sm
      outline-none
      transition-all
      hover:border-violet-300
      focus:ring-4
      focus:ring-violet-100
    "
          >

            <span>
              {operation}
            </span>

            <ChevronDown
              size={18}
              className={`
        text-slate-400
        transition-transform
        ${isOperationOpen
                  ? 'rotate-180'
                  : ''
                }
      `}
            />

          </button>

          {isOperationOpen && (

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
                '➕ Add',
                '➖ Subtract',
                '✖️ Multiply',
                '➗ Divide',
              ].map((item) => (

                <button
                  key={item}
                  onClick={() => {

                    setOperation(
                      item.replace(
                        /^[^\w]+/,
                        ''
                      ).trim()
                    );

                    setIsOperationOpen(false);

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
            hover:bg-violet-50
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