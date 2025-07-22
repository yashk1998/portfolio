'use client';

export function TerminalHeader() {
  return (
    <div className="terminal-header">
      <div className="header-content">
        <div className="left-section">
          <pre className="ascii-art">
{`
██╗   ██╗ █████╗ ███████╗██╗  ██╗    ██╗  ██╗██╗  ██╗██╗██╗   ██╗ █████╗ ███████╗ █████╗ ██████╗  █████╗ 
╚██╗ ██╔╝██╔══██╗██╔════╝██║  ██║    ██║ ██╔╝██║  ██║██║██║   ██║██╔══██╗██╔════╝██╔══██╗██╔══██╗██╔══██╗
 ╚████╔╝ ███████║███████╗███████║    █████╔╝ ███████║██║██║   ██║███████║███████╗███████║██████╔╝███████║
  ╚██╔╝  ██╔══██║╚════██║██╔══██║    ██╔═██╗ ██╔══██║██║╚██╗ ██╔╝██╔══██║╚════██║██╔══██║██╔══██╗██╔══██║
   ██║   ██║  ██║███████║██║  ██║    ██║  ██╗██║  ██║██║ ╚████╔╝ ██║  ██║███████║██║  ██║██║  ██║██║  ██║
   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝    ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝  ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝
`}
          </pre>
          <div className="welcome-message">
            <h3>Welcome to my terminal portfolio. (Version 1.0.0)</h3>
            <p>This project's source code can be seen in this project's <span className="link-text">GitHub repo</span>.</p>
            <p>For a list of available commands, type <span className="help-text">help</span>.</p>
          </div>
        </div>
        <div className="right-section">
          <pre className="decorative-art">
          </pre>
        </div>
      </div>
    </div>
  );
}