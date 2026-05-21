import React from "react";
export class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  render() {
    if (!this.state.hasError) return this.props.children;
    const dump = () => navigator.clipboard.writeText(this.state.error?.stack || this.state.error?.toString());
    return (
      <div className="crash-screen" style={{ padding: "40px", color: "#ff4444", background: "#050505", height: "100vh", fontFamily: "Orbitron, monospace" }}>
        <h2 style={{ letterSpacing: "5px" }}>SYSTEM CRASH DETECTED</h2>
        <pre style={{ background: "#111", padding: "20px", border: "1px solid #333", color: "#888", fontSize: "0.8rem", overflow: "auto" }}>
          {this.state.error?.stack || this.state.error?.toString()}
        </pre>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => window.location.reload()} style={{ background: "#ff4444", color: "#000", border: "none", padding: "10px 20px", cursor: "pointer", fontWeight: "bold" }}>REBOOT</button>
          <button onClick={dump} style={{ background: "transparent", border: "1px solid #ff4444", color: "#ff4444", padding: "10px 20px", cursor: "pointer" }}>COPY CORE DUMP</button>
        </div>
      </div>
    );
  }
}
