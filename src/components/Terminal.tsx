'use client';
import { useEffect, useRef, useState } from 'react';

export function Terminal() {
  const [input, setInput] = useState('');
  const [commands, setCommands] = useState<Array<{input: string, output: string}>>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    switch (trimmedCmd) {
      case 'help':
        return `
Available commands:
• about     - Personal introduction
• skills    - Technical skills and technologies
• projects  - Showcase of projects
• experience - Work history and timeline
• contact   - Get in touch
• resume    - Download resume
• blog      - View blog posts
• theme     - Change terminal theme
• ai-chat   - AI assistant
• clear     - Clear terminal
• help      - Show this help

Type any command to get started!
        `.trim();
      
      case 'about':
        return `
Hello! I'm Yash Khivasara, a passionate developer who loves creating innovative solutions.
I specialize in modern web technologies and enjoy building interactive experiences.
This terminal portfolio showcases my skills, projects, and journey in tech.

I believe in clean code, user experience, and continuous learning.
        `.trim();
      
      case 'skills':
        return `
Technical Skills:
• Frontend: React, Next.js, TypeScript, Tailwind CSS, Vue.js
• Backend: Node.js, Python, Java, APIs, Microservices
• Database: PostgreSQL, MongoDB, Redis, Supabase
• DevOps: Docker, AWS, Azure, CI/CD, Kubernetes
• Tools: Git, VS Code, Figma, Postman
• Cloud: AWS, Azure, Google Cloud Platform
        `.trim();
      
      case 'projects':
        return `
Featured Projects:
• Terminal Portfolio (Current) - Interactive terminal-style portfolio
• E-commerce Platform - Full-stack React + Node.js application
• AI Chat Application - Real-time chat with OpenAI integration
• Task Management System - Vue.js + Firebase project
• Weather Dashboard - React + OpenWeather API

More projects available at: github.com/yashkhivasara
        `.trim();
      
      case 'experience':
        return `
Work Experience:
• Senior Full Stack Developer (2023-Present) - Tech Company
• Full Stack Developer (2021-2023) - Startup Inc.
• Junior Developer (2019-2021) - Digital Agency

Education:
• Bachelor's in Computer Science
• Certifications: AWS, Azure, Google Cloud
        `.trim();
      
      case 'contact':
        return `
Get in Touch:
• Email: yash.khivasara@example.com
• GitHub: github.com/yashkhivasara
• LinkedIn: linkedin.com/in/yashkhivasara
• Twitter: @yashkhivasara

Feel free to reach out for collaborations or opportunities!
        `.trim();
      
      case 'clear':
        return 'CLEAR';
      
      default:
        return `Command not found: ${trimmedCmd}\nType 'help' to see available commands.`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const command = input.trim();
      if (command) {
        const output = executeCommand(command);
        if (output === 'CLEAR') {
          setCommands([]);
        } else {
          setCommands([...commands, { input: command, output }]);
        }
        setInput('');
      }
    }
  };

  return (
    <div className="terminal-container" style={{ backgroundColor: '#000000', color: '#00ff00', fontFamily: 'IBM Plex Mono, monospace' }}>
      <div className="terminal-header">
        <pre className="ascii-art" style={{ color: '#00ff00', fontSize: '14px', lineHeight: '1.2', fontFamily: 'IBM Plex Mono, monospace', textAlign: 'center' }}>
{`
██╗   ██╗ █████╗ ███████╗██╗  ██╗    ██╗  ██╗██╗  ██╗██╗██╗   ██╗ █████╗ ███████╗ █████╗ ██████╗  █████╗ 
╚██╗ ██╔╝██╔══██╗██╔════╝██║  ██║    ██║ ██╔╝██║  ██║██║██║   ██║██╔══██╗██╔════╝██╔══██╗██╔══██╗██╔══██╗
 ╚████╔╝ ███████║███████╗███████║    █████╔╝ ███████║██║██║   ██║███████║███████╗███████║██████╔╝███████║
  ╚██╔╝  ██╔══██║╚════██║██╔══██║    ██╔═██╗ ██╔══██║██║╚██╗ ██╔╝██╔══██║╚════██║██╔══██║██╔══██╗██╔══██║
   ██║   ██║  ██║███████║██║  ██║    ██║  ██╗██║  ██║██║ ╚████╔╝ ██║  ██║███████║██║  ██║██║  ██║██║  ██║
   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝    ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝  ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝
`}
        </pre>
        <div className="welcome-message" style={{ color: '#00ff00', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Welcome to my terminal portfolio.</h3>
          <p style={{ fontSize: '14px', marginBottom: '4px' }}>This project's source code can be seen in this project's <span style={{ color: '#0066ff', textDecoration: 'underline' }}>GitHub repo</span>.</p>
          <p style={{ fontSize: '14px', marginBottom: '4px' }}>For a list of available commands, type <span style={{ color: '#ffff00', fontWeight: '600' }}>help</span>.</p>
        </div>
      </div>
      
      <div className="terminal-output-container">
        {commands.map((cmd, index) => (
          <div key={index} style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ color: '#00ff00', marginRight: '8px', fontWeight: '600' }}>terminal@yashkhivasara.dev:~$</span>
              <span style={{ color: '#00ff00', fontSize: '14px' }}>{cmd.input}</span>
            </div>
            {cmd.output && (
              <div style={{ marginLeft: '16px', marginBottom: '16px' }}>
                <pre style={{ color: '#00ff00', whiteSpace: 'pre-wrap', fontFamily: 'IBM Plex Mono, monospace', fontSize: '14px', lineHeight: '1.4' }}>{cmd.output}</pre>
              </div>
            )}
          </div>
        ))}
        
        <div className="terminal-input-container" style={{ display: 'flex', alignItems: 'center' }}>
          <span className="terminal-prompt" style={{ color: '#00ff00', marginRight: '8px', fontWeight: '600' }}>terminal@yashkhivasara.dev:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{ 
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#00ff00',
              fontFamily: 'IBM Plex Mono, monospace',
              flex: '1',
              caretColor: 'transparent',
              fontSize: '14px'
            }}
            autoComplete="off"
            spellCheck={false}
          />
          <span className="terminal-cursor" style={{ color: '#00ff00', marginLeft: '4px', animation: 'blink 1s infinite' }}>█</span>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}