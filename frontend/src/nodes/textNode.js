import { useState, useMemo, useRef, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import TextareaAutosize from 'react-textarea-autosize';
import { useStore } from '../store';
import { FileText } from 'lucide-react';

export const TextNode = ({ id, data }) => {

  const [currText, setCurrText] = useState(
    data?.text || '{{input}}'
  );
  const { edges, setEdges } = useStore();


  /*
    Extract variables
  */

  const variables = useMemo(() => {

    const regex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;

    const matches = [...currText.matchAll(regex)];

    return matches.map(match => match[1]);

  }, [currText]);

  /*
    Dynamic handles
  */

  const variableHandles = variables.map((variable, index) => ({
    type: 'target',
    position: Position.Left,
    id: `${id}-${variable}`,
    style: {
      top: `${((index + 1) * 100) / (variables.length + 1)}%`,
    },
  }));

  const handles = [
    ...variableHandles,
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-output`,
    },
  ];

  useEffect(() => {

    const validHandleIds = variables.map(
      variable => `${id}-${variable}`
    );

    const filteredEdges = edges.filter(edge => {

      /*
        Keep:
        - edges not targeting this node
        OR
        - edges targeting still-valid handles
      */

      if (edge.target !== id) {
        return true;
      }

      return validHandleIds.includes(edge.targetHandle);

    });

    if (filteredEdges.length !== edges.length) {
      setEdges(filteredEdges);
    }

  }, [variables, edges, id, setEdges]);


  return (
    <BaseNode
      title="Text"
      handles={handles}
      icon={FileText}
      iconBg="bg-purple-100"
      iconColor="text-purple-600"
    >

      <div className="flex flex-col gap-2">

        <label
          className="
      text-sm
      font-medium
      text-slate-500
    "
        >
          Text
        </label>



      </div>

      <TextareaAutosize

        value={currText}
        onChange={(e) => setCurrText(e.target.value)}
        minRows={4}
        style={{
          padding: '10px',
          borderRadius: '8px',
          border: '1px solid #d1d5db',
          outline: 'none',
          fontSize: '14px',
          width: '100%',
          boxSizing: 'border-box',
          resize: 'none',
          overflow: 'hidden',
        }}
      />

    </BaseNode>
  );
};