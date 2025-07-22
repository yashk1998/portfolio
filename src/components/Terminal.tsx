'use client';
import { useEffect, useRef, useState } from 'react';

export function Terminal() {
  const [input, setInput] = useState('');
  const [commands, setCommands] = useState<Array<{input: string, output: string}>>([]);
  const [showSocials, setShowSocials] = useState(false);
  const [selectedSocial, setSelectedSocial] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const socials = [
    { name: 'GitHub', url: 'https://github.com/yashk1998', icon: '🐙' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/yashkhivasara', icon: '💼' },
    { name: 'Twitter', url: 'https://x.com/k2_yash', icon: '🐦' },
    { name: 'Instagram', url: 'https://www.instagram.com/yash_k2/', icon: '📷' }
  ];

  const handleSocialsKeyDown = (e: React.KeyboardEvent) => {
    if (showSocials) {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedSocial((prev) => (prev + 1) % socials.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedSocial((prev) => (prev - 1 + socials.length) % socials.length);
          break;
        case 'Enter':
          e.preventDefault();
          window.open(socials[selectedSocial].url, '_blank');
          setShowSocials(false);
          break;
        case 'Escape':
          e.preventDefault();
          setShowSocials(false);
          break;
      }
    }
  };

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
• socials   - Social media links
• theme     - Change terminal theme
• ai-chat   - AI assistant
• clear     - Clear terminal
• help      - Show this help

Type any command to get started!
        `.trim();
      
      case 'about':
        return `
Hello! I'm Yash Khivasara, a passionate full-stack builder who loves creating innovative solutions.
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
• Email: yash.khivasara@gmail.com
• GitHub: github.com/yashk1998
• LinkedIn: linkedin.com/in/yashkhivasara
• Twitter: @k2_yash

Feel free to reach out for collaborations or opportunities!
        `.trim();
      
      case 'socials':
        setShowSocials(true);
        setSelectedSocial(0);
        return 'SOCIALS_MENU';
      
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
          setShowSocials(false);
        } else if (output === 'SOCIALS_MENU') {
          setCommands([...commands, { input: command, output: '' }]);
        } else {
          setCommands([...commands, { input: command, output }]);
        }
        setInput('');
      }
    }
  };

  return (
    <div 
      className="terminal-container" 
      style={{ 
        backgroundColor: '#000000', 
        color: '#00ff00', 
        fontFamily: 'IBM Plex Mono, monospace',
        minHeight: '100vh',
        padding: '16px',
        overflowX: 'hidden',
        wordWrap: 'break-word',
        whiteSpace: 'pre-wrap'
      }}
      onKeyDown={handleSocialsKeyDown}
      onClick={handleClick}
      tabIndex={0}
    >
      <div className="terminal-header">
        <pre className="ascii-art" style={{ color: '#00ff00', fontSize: '14px', lineHeight: '1.2', fontFamily: 'IBM Plex Mono, monospace', textAlign: 'center', overflowX: 'hidden', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
{`
██╗   ██╗ █████╗ ███████╗██╗  ██╗    ██╗  ██╗██╗  ██╗██╗██╗   ██╗ █████╗ ███████╗ █████╗ ██████╗  █████╗
╚██╗ ██╔╝██╔══██╗██╔════╝██║  ██║    ██║ ██╔╝██║  ██║██║██║   ██║██╔══██╗██╔════╝██╔══██╗██╔══██╗██╔══██╗
 ╚████╔╝ ███████║███████╗███████║    █████╔╝ ███████║██║██║   ██║███████║███████╗███████║██████╔╝███████║
  ╚██╔╝  ██╔══██║╚════██║██╔══██║    ██╔═██╗ ██╔══██║██║╚██╗ ██╔╝██╔══██║╚════██║██╔══██║██╔══██╗██╔══██║
   ██║   ██║  ██║███████║██║  ██║    ██║  ██╗██║  ██║██║ ╚████╔╝ ██║  ██║███████║██║  ██║██║  ██║██║  ██║
   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝    ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝  ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝
`}
        </pre>
        
        <pre className="ascii-art" style={{ color: '#00ff00', fontSize: '8px', lineHeight: '1.0', fontFamily: 'IBM Plex Mono, monospace', textAlign: 'center', marginTop: '16px', overflowX: 'hidden', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
{`
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                         .:--==---==-:                                              
                                     .------=+=++++++=====-.                                        
                                   .-==-=+======++****#*****+=                                      
                                  --=-=++++++*++++**++++++**#***                                    
                                .::====+++*+**+****++***++++***#+                                   
                               .==+++++=+++***#######+++++**##*==-                                  
                               =+*###*+++++**#*####**++***#%%%##+-.                                 
                               +*%%%%#++***++###**+****#########*=:                                 
                              =*#%%%###**++=..:+++*#*+***##*++***+-                                 
                              ##%#=+**##*=-.   ..:=--=***+---=+***+                                 
                              #%#=:-*--=+-           --.....:=++*#+.                                
                             .##*=:..                 .     .::=###:                                
                             .##+:    :-++++=:.  ..:-+##*++=.   =##:                                
                              #*-   -===+*##*+-:..-=*###++==-    +*:                                
                              #*.   :-++**++**+:  :+*+:#*+-+=:   .+.                                
                              :+   .-=-:-=--==-    :-====--::.    :                                 
                            --:-       .:..  .           .        -:=                               
                            ...-                                 .: :                               
                              .:.         :            =.        ::                                 
                               ::       .-=:.::....-=--=+-..    .-.                                 
                               :-.  ...-==-=+#@%##%%%*===+-::.. :-                                  
                                -:::::-*##*+*+*+===++++***+-::..==                                  
 ..                          ...-=-==:-#%%%*          +###*-:=-:+                                   
...                           ..-++++-:=*+=::.        :-+*+--=-==                                   
..                           ....=**+=::==:::::.   ... .:==-=+*#.                                   
..                          .....=*##+---::::-=+*+++=-:..-=++*#*           .                        
                          .....-*@%#%#++-.    :==++=:..  -**#%%@@#=      =##+:                      
                          ....=%@@@@%%%#*=::..:--::::-::=*%%%#%%%@%*-   -#%##*.                     
                             =%@%%@@=*@@%%#*+++++====+++#%%+:*@%%#**+=.+#%%#*#+.                    
                            -*%##%@@--=*%%%%%#%%%%#%%#%%@#=:.*@%%*=--+=-=%*%%#*-                    
                           =++#**%@%-:--=+*#%@@@@@@@@@@*-:::.*@@#+==-:=--.@@%%%%:                   
                     =*#%. ++**++%#=--:---==++++****+=-:::::.=%@#+=---:=-::%@@@%=                   
                    -%%#-. :+++=+*=-:--------======--::::::...--*=----::--. :#%#-                   
                          .=-====+-:::::::----------:::::...  ..+=----:..++=%@@%*.                  
                        :+=+=-===+-....::::::----:::::.....     ==:::-::=*--::::-.                  
                      .-+#*+===--=     ..::..:::..........      --::.:::+=-..                       
      .        .    ..:-+*#*=====-:      ....   .     ..        ==-:::-++.:.:..                     
    .:       ..     :..-+=+**=-----                            -+=-:--++=-:--:..                    
    ::.     .::.   .. .+-::=+*+----=                          :*+---=++=-=:.-=::--.                 
   .:::    :--.    .. :+:..*+-=**+--+                         *#+=-=*+*=-=- .-:.:-                  
 .+*+==: :--:     ..  ==..:=*======+#*:                      =###+**+*+=:==. .:..-:     .  .        
 =*-::..:::.      .  :=:..-:++--+%@%%%#*-                   **##%++=**+-:--:.   .:-.  . ....        
.+*:-.....           -:...:.-=-..-****#%%#=                ***+=-===+==-.--..   ..:.  .. .:....--.. 
:*=.....            .:   .. .:-.  :==-=+***:    :        -==++**+=-==--:.::  ...  ...  .  .-:.:--...
-+:..          ......:-::::::::.   :-:----=+#*= ::---  -+##*#*-:-:---.:. ..  .    .        .--:--. .
-+:.  .::.  ......:--=====    .    .-:::---+*#=       .*++==-.:-.:. :.::.   .::.             :---.  
-+::::::::::.......:---:..  . -..   .:.:::-=*#+       *===:..:-.:. :-:.-:..:=+=-:.      . .. .:--:. 
=*=--:::-:          ......:--:::.    :.::::-+#**=:-. -==-:........ ::..::.::::..........::--:.:--:: 
=*=:.  . .  ..    .          ::-.   ..::..::+#*=-:=  =-:::....  :...     .  .:....::-------------:..
=*+........         ...   ...:::......:::.::+++.     --:--::::...::.....  ...       ....::::-=-=-::.
-=+..                      : :::   ..::::::-**.      -:---::::::::....::-:::..............::.:-=-::.
--                      . .::..:.   ...::::-##       -:.:. . .:.. .:....-=         .....:::::-+=-::-
=.        ..            ..-:::::.  ...::.::=*+   --.:--:-:..-:....:::...-=..               .-+*=-=+=
-  ...   .   ::...........=-:.:-.   ..:-:::=*+      ::-:-::-.   :--:::::=-.:.:....  .        :+=++==
.   .::::.  :-.:-=*#%%#**+=-:.:-:  ...:-..:=++  ::  ::::-::... .--::::::==:..:::::..  ..:.....=+*===
=-::....::--:-**+++++===---::::-: ....::..:=++  :=  ::::-......:=--::::--++**=-..:---:::::::::-*+==+
+******++===+*+=-----=--:-:::::-: ..:::..::+*+  :=  :-::-.....::=---:::=:=--=+*#*-::-=. :--:::-+==+*
=*%#*+**###*++===-::::--:-:-::-=:. .::-.::-##-  :   :--:-....::------::=:--===--=*#=-==::==-::-+=++*
=*%%*++**#*+==--:--::::-:---:-=-:...::-::-=++       ---:=-.::::-=--==::-:--::-----=**--=-::::-=++++#
=*#@#+++***+=-:------::::----==-....:--:-=*#+       :--:-:::.::==---=-:::::::::----=+*++****%#++++*+
=+#%@*+++**+=--:...:-----=-==---....:::.:=#@:       ::---:::::--=--=-:-:::---:::------====+*#*++**+-
=+*%@%++***+=---::...::::-==----....::.::=##         :::-:::::-==-===-=--:----::::-----===+#*****+**
=+*#@%*++++*+=-::::::::-:-+=---:...::-:::=*.         :::---:.:-==-=+=:-::----==---:---====*#*****#*=
==+#%%*+++**+---:..:-----=+----:....:-.:.-+          :::-:..:-===--=+-:::::------------==+***#**#*+=
==+#%%*++**#+----::::::::-=----:....:-.::-+.        ..:::::::--==-===-:::-::-:::-----===+*****#%*+==
+=+#%%*++****=-::---::-:-==----:...:--.:.-+-        ..::-::::-==---++-::---:--::--=-=+=+*%##%@%*==++
+++#@@#*****===--:::----++=----:..::::.::=+=        :.::-::::-=+--=++=-=-::------===--=+#%@@@#++++++
`}
        </pre>
        
        <div className="welcome-message" style={{ color: '#00ff00', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Welcome to my terminal portfolio.</h3>
          <p style={{ fontSize: '14px', marginBottom: '4px' }}>This project's source code can be seen in this project's <span style={{ color: '#0066ff', textDecoration: 'underline' }}>GitHub repo</span>.</p>
          <p style={{ fontSize: '14px', marginBottom: '4px' }}>For a list of available commands, type <span style={{ color: '#ffff00', fontWeight: '600' }}>help</span>.</p>
        </div>
      </div>
      
      <div className="terminal-output-container" style={{ overflowX: 'hidden', wordWrap: 'break-word' }}>
        {commands.map((cmd, index) => (
          <div key={index} style={{ marginBottom: '16px', overflowX: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '8px', flexWrap: 'wrap', overflowX: 'hidden' }}>
              <span style={{ color: '#00ff00', marginRight: '8px', fontWeight: '600', flexShrink: '0' }}>terminal@yashkhivasara.dev:~$</span>
              <span style={{ color: '#00ff00', fontSize: '14px', wordBreak: 'break-all' }}>{cmd.input}</span>
            </div>
            {cmd.output && (
              <div style={{ marginLeft: '16px', marginBottom: '16px', overflowX: 'hidden' }}>
                <pre style={{ color: '#00ff00', whiteSpace: 'pre-wrap', fontFamily: 'IBM Plex Mono, monospace', fontSize: '14px', lineHeight: '1.4', wordWrap: 'break-word', overflowX: 'hidden', wordBreak: 'break-all' }}>{cmd.output}</pre>
              </div>
            )}
          </div>
        ))}
        
        {showSocials && (
          <div style={{ marginLeft: '16px', marginBottom: '16px', overflowX: 'hidden' }}>
            <div style={{ color: '#00ff00', fontSize: '14px', marginBottom: '12px' }}>
              <strong>Social Media Links:</strong>
            </div>
            <div style={{ marginLeft: '16px', overflowX: 'hidden' }}>
              {socials.map((social, index) => (
                <div 
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '8px',
                    padding: '4px 8px',
                    backgroundColor: selectedSocial === index ? '#00ff00' : 'transparent',
                    color: selectedSocial === index ? '#000000' : '#00ff00',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    flexWrap: 'wrap'
                  }}
                >
                  <span style={{ marginRight: '8px', fontSize: '16px' }}>{social.icon}</span>
                  <span style={{ fontSize: '14px', wordBreak: 'break-all' }}>{social.name}</span>
                  {selectedSocial === index && (
                    <span style={{ marginLeft: '8px', fontSize: '12px' }}>← Press Enter to open</span>
                  )}
                </div>
              ))}
            </div>
            <div style={{ color: '#00ff00', fontSize: '12px', marginTop: '8px', fontStyle: 'italic' }}>
              Use ↑↓ arrows to navigate, Enter to open, Esc to exit
            </div>
          </div>
        )}
        
        <div className="terminal-input-container" style={{ display: 'flex', alignItems: 'center', position: 'relative', overflowX: 'hidden', flexWrap: 'wrap' }}>
          <span className="terminal-prompt" style={{ color: '#00ff00', fontWeight: '600', flexShrink: '0' }}>terminal@yashkhivasara.dev:~$</span>
          <span style={{ color: '#00ff00', fontSize: '14px', wordBreak: 'break-all' }}>{input}</span>
          <span className="terminal-cursor" style={{ color: '#00ff00', animation: 'blink 1s infinite' }}>█</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onClick={handleClick}
            style={{ 
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'transparent',
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '14px',
              position: 'absolute',
              left: '0',
              top: '0',
              width: '100%',
              height: '100%',
              caretColor: 'transparent',
              zIndex: '1'
            }}
            autoComplete="off"
            spellCheck={false}
          />
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