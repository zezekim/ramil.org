type Props = { nodes: string[] };

export default function ArchitectureDiagram({ nodes }: Props) {
  return <div className="architecture" role="img" aria-label={`System flow: ${nodes.join(", then ")}`}>
    <span className="diagram-label">System flow</span>
    <div className="diagram-nodes">{nodes.map((node, index) => <span className="diagram-node" key={node}>{node}{index < nodes.length - 1 && <i aria-hidden="true">→</i>}</span>)}</div>
  </div>;
}
