from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelineData(BaseModel):
    nodes: List[dict]
    edges: List[dict]


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


def is_dag(nodes, edges):

    graph = {node['id']: [] for node in nodes}

    for edge in edges:
        source = edge['source']
        target = edge['target']

        graph[source].append(target)

    visited = set()
    visiting = set()

    def has_cycle(node):

        if node in visiting:
            return True

        if node in visited:
            return False

        visiting.add(node)

        for neighbor in graph[node]:
            if has_cycle(neighbor):
                return True

        visiting.remove(node)
        visited.add(node)

        return False

    for node in graph:
        if has_cycle(node):
            return False

    return True


@app.post('/pipelines/parse')
def parse_pipeline(data: PipelineData):

    num_nodes = len(data.nodes)

    num_edges = len(data.edges)

    dag_status = is_dag(data.nodes, data.edges)

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': dag_status,
    }