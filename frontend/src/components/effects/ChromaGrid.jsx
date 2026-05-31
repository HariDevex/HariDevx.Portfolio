export default function ChromaGrid() {
  return (
    <div className="chroma-grid" aria-hidden="true">
      <div className="chroma-spot chroma-spot--cyan" style={{ left: '20%', top: '15%', width: 320, height: 320 }} />
      <div className="chroma-spot chroma-spot--amber" style={{ left: '72%', top: '12%', width: 260, height: 260 }} />
      <div className="chroma-spot chroma-spot--violet" style={{ left: '48%', top: '55%', width: 300, height: 300 }} />
      <div className="chroma-spot chroma-spot--cyan" style={{ left: '12%', top: '72%', width: 200, height: 200 }} />
      <div className="chroma-spot chroma-spot--amber" style={{ left: '82%', top: '68%', width: 240, height: 240 }} />
      <div className="chroma-spot chroma-spot--violet" style={{ left: '35%', top: '88%', width: 220, height: 220 }} />
    </div>
  );
}
