import { Handle } from 'reactflow';

export const BaseNode = ({
  title,
  children,
  handles = [],
  width = 360,
  icon: Icon,
  iconBg = 'bg-violet-100',
  iconColor = 'text-violet-600',
}) => {

  return (
    <div
      className="
        bg-white
        border
        border-slate-200
        rounded-2xl
        shadow-sm
        hover:shadow-lg
        transition-all
        duration-200
        p-4
        flex
        flex-col
        gap-4
      "
      style={{
        width,
      }}
    >

      {handles.map((handle, index) => (
        <Handle
          key={index}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={{
            width: 14,
            height: 14,
            background: '#6366f1',
            border: '3px solid white',
            boxShadow: '0 0 0 4px #cbd5e1',
            ...handle.style,
          }}
        />
      ))}

      <div
        className="
    flex
    items-center
    justify-between
    border-b
    border-slate-100
    pb-3
  "
      >

        <div className="flex items-center gap-3">

          <div
            className={`
        w-10
        h-10
        rounded-xl
        flex
        items-center
        justify-center
        ${iconBg}
      `}
          >

            {
              Icon && (
                <Icon
                  size={18}
                  className={iconColor}
                />
              )
            }

          </div>

          <div
            className="
        text-lg
        font-semibold
        text-slate-800
      "
          >
            {title}
          </div>

        </div>



      </div>

      <div
        className="
          flex
          flex-col
          gap-3
          text-sm
          text-slate-600
        "
      >
        {children}
      </div>

    </div>
  );
};