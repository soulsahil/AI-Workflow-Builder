// toolbar.js

import { DraggableNode } from './draggableNode';


export const PipelineToolbar = () => {


    return (
        <div
            className="
    fixed
    top-28
    left-1/2
    -translate-x-1/2
    z-50
    bg-white
    border
    border-slate-200
    shadow-lg
    rounded-2xl
    px-4
    py-3
    flex
    items-center
    gap-3
    w-fit
  "
        >
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='weather' label='Weather' />
                <DraggableNode type='math' label='Math' />
                <DraggableNode type='email' label='Email' />
                <DraggableNode type='timer' label='Timer' />
                <DraggableNode type='database' label='Database' />
            </div>
        </div>

    );
};
