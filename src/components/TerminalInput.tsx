'use client';

import { useRef, useEffect } from 'react';

interface TerminalInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  isProcessing: boolean;
  showCursor: boolean;
}

export function TerminalInput({ value, onChange, onSubmit, isProcessing, showCursor }: TerminalInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input when component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isProcessing) {
      e.preventDefault();
      onSubmit(value);
      onChange('');
    }
  };

  return (
    <div className="terminal-input-container">
      <span className="terminal-prompt">terminal@yashkhivasara.dev:~$</span>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="terminal-input"
        disabled={isProcessing}
        autoComplete="off"
        spellCheck={false}
        style={{ 
          backgroundColor: 'transparent',
          border: 'none',
          outline: 'none',
          color: '#00ff00',
          fontFamily: 'IBM Plex Mono, monospace'
        }}
      />
      {showCursor && !isProcessing && (
        <span className="terminal-cursor">█</span>
      )}
    </div>
  );
} 