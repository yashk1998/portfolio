'use client';

import { Command } from '@/features/terminal/terminalSlice';

interface TerminalOutputProps {
  commands: Command[];
}

export function TerminalOutput({ commands }: TerminalOutputProps) {
  return (
    <div className="terminal-output">
      {commands.map((command) => (
        <div key={command.id} className="command-block">
          <div className="command-input-line">
            <span className="terminal-prompt">terminal@yashkhivasara.dev:~$</span>
            <span className="command-text">{command.input}</span>
          </div>
          {command.output && (
            <div className="command-output">
              <pre className="output-text">{command.output}</pre>
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 