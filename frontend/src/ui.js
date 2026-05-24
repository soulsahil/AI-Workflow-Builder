// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { WeatherNode } from './nodes/weatherNode';
import { MathNode } from './nodes/mathNode';
import { EmailNode } from './nodes/emailNode';
import { TimerNode } from './nodes/timerNode';
import { DatabaseNode } from './nodes/databaseNode';
import { SubmitButton } from './submit';
import { AnalysisModal } from './components/AnalysisModal';
import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  weather: WeatherNode,
  math: MathNode,
  email: EmailNode,
  timer: TimerNode,
  database: DatabaseNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  }

  const [analysisOpen, setAnalysisOpen] = useState(false);

  const [analysisData, setAnalysisData] = useState({
    num_nodes: 0,
    num_edges: 0,
    is_dag: false,
  });

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;

        // check if the dropped element is valid
        if (typeof type === 'undefined' || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <>
      <div
        className="
    fixed
    top-0
    left-0
    w-full
    h-24
    bg-transparent
    z-40
    flex
    items-center
    justify-between
    px-8
  "
      >


        <div className="flex items-center gap-8">

          <div className="flex items-center gap-3">

            <div
              className="
          w-12
          h-12
          rounded-2xl
          bg-gradient-to-br
          from-violet-500
          to-indigo-500
          flex
          items-center
          justify-center
          text-white
          text-2xl
          font-bold
        "
            >
              VS
            </div>

            <div>

              <div className="text-3xl font-bold text-slate-900">
                VectorShift
              </div>

            </div>

          </div>

          <div className="ml-12">

            <div className="text-2xl font-bold text-slate-900">
              Pipeline Builder
            </div>

            <div className="text-slate-500 mt-1">
              Design, connect and run your AI pipelines
            </div>

          </div>

        </div>

        <div className="flex items-center gap-4">

          {/* <button
            className="
        px-6
        py-3
        rounded-2xl
        border
        border-violet-300
        text-violet-600
        font-medium
        hover:bg-violet-50
        transition-all
      "
          >
            Save Pipeline
          </button> */}

          <div
            className="
        w-12
        h-12
        rounded-full
        bg-violet-600
        text-white
        flex
        items-center
        justify-center
        font-semibold
      "
          >
            VS
          </div>

        </div>

      </div>
      <div ref={reactFlowWrapper} className="pt-58" style={{ width: '100wv', height: '100vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          isValidConnection={(connection) => {
            return connection.source !== connection.target;
          }}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType='smoothstep'
          deleteKeyCode={['Backspace', 'Delete']}
          defaultEdgeOptions={{
            type: 'smoothstep',

            animated: true,

            style: {
              stroke: '#7c3aed',
              strokeWidth: 3,
            },
          }}
        >
          <Background color="#aaa" gap={gridSize} />
          <div className="absolute left-6 bottom-10 z-50 scale-110">
            <Controls
              className="
      rounded-2xl
      overflow-hidden
      shadow-xl
      border
      border-white/40
      bg-white/70
      backdrop-blur-xl
    "
            />
          </div>
          <MiniMap
            pannable
            zoomable

            className="
    !bg-white/90
    !border
    !border-slate-200
    !rounded-[32px]
    !shadow-2xl
    backdrop-blur-md
    overflow-hidden
    !w-[220px]
    !h-[160px]
    !p-4
  "

            maskColor="rgba(255,255,255,0.72)"

            nodeBorderRadius={10}

            nodeStrokeWidth={2}

            nodeColor={(node) => {

              switch (node.type) {

                case 'llm':
                  return '#bbf7d0';

                case 'math':
                  return '#bae6fd';

                case 'email':
                  return '#fecdd3';

                case 'timer':
                  return '#fed7aa';

                case 'weather':
                  return '#fde68a';

                case 'database':
                  return '#c4b5fd';

                case 'output':
                  return '#bfdbfe';

                default:
                  return '#ddd6fe';
              }
            }}

            nodeStrokeColor={(node) => {

              switch (node.type) {

                case 'llm':
                  return '#4ade80';

                case 'math':
                  return '#06b6d4';

                case 'email':
                  return '#f43f5e';

                case 'timer':
                  return '#f97316';

                case 'weather':
                  return '#f59e0b';

                case 'database':
                  return '#8b5cf6';

                case 'output':
                  return '#3b82f6';

                default:
                  return '#8b5cf6';
              }
            }}
          />
        </ReactFlow>
      </div>
      <SubmitButton
        setAnalysisData={setAnalysisData}
        setAnalysisOpen={setAnalysisOpen}
      />
      <AnalysisModal
        isOpen={analysisOpen}
        onClose={() => setAnalysisOpen(false)}
        analysis={analysisData}
      />
    </>
  )
}
