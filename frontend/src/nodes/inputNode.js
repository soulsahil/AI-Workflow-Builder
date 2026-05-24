import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Download } from 'lucide-react';
import { ChevronDown } from 'lucide-react';

export const InputNode = ({ id, data }) => {

  const [currName, setCurrName] = useState(
    data?.inputName || id.replace('customInput-', 'input_')
  );

  const [inputType, setInputType] = useState(
    data?.inputType || 'Text'
  );

  const [isTypeOpen, setIsTypeOpen] = useState(false);

  const handles = [
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-value`,
    },
  ];

  return (
    <BaseNode
      title="Input"
      handles={handles}
      icon={Download}
      iconBg="bg-violet-100"
      iconColor="text-violet-600"
    >

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >

        <div className="flex flex-col gap-2">

          <label
            className="
      text-sm
      font-medium
      text-slate-500
    "
          >
            Name
          </label>

          <input
            type="text"
            value={currName}
            onChange={(e) => setCurrName(e.target.value)}
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

        </div>

        <div className="flex flex-col gap-2">

          <label
            className="
      text-sm
      font-medium
      text-slate-500
    "
          >
            Type
          </label>

          <div className="relative w-full">

            <button
              type="button"
              onClick={() =>
                setIsTypeOpen((prev) => !prev)
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
                {inputType}
              </span>

              <ChevronDown
                size={18}
                className={`
        text-slate-400
        transition-transform
        ${isTypeOpen
                    ? 'rotate-180'
                    : ''
                  }
      `}
              />

            </button>

            {isTypeOpen && (

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
                  'Text',
                  'File',
                ].map((item) => (

                  <button
                    key={item}
                    onClick={() => {
                      setInputType(item);
                      setIsTypeOpen(false);
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

      </div>

    </BaseNode>
  );
};