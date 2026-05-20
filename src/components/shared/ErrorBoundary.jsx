import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("VPE SYSTEM CRASH:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', color: '#ff4444', background: '#020203', height: '100vh', fontFamily: 'monospace' }}>
          <h2>SYSTEM CRASH DETECTED</h2>
          <pre>{this.state.error?.toString()}</pre>
          <button onClick={() => window.location.reload()} style={{ background: '#00bac4', border: 'none', padding: '10px' }}>REBOOT</button>
        </div>
      );
    }
    return this.props.children;
  }
}
