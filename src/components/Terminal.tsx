'use client';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import {
  setCurrentInput,
  addCommand,
  clearCommands,
  setShowThemeSelector,
  setShowSocials,
  setSelectedThemeIndex,
  setSelectedSocialIndex,
  setTheme,
  navigateHistoryUp,
  navigateHistoryDown,
} from '@/features/terminal/terminalSlice';
import { executeCommand } from '@/lib/commands';
import { getCurrentTheme, getThemeNames } from '@/lib/themes';

const availableCommands = [
  'help', 'about', 'skills', 'projects', 'experience', 
  'contact', 'resume', 'blog', 'socials', 'themes', 
  'ai-chat', 'clear'
];

export function Terminal() {
  const dispatch = useDispatch();
  const {
    commands,
    currentInput,
    theme,
    showThemeSelector,
    selectedThemeIndex,
    showSocials,
    selectedSocialIndex,
  } = useSelector((state: RootState) => state.terminal);

  const inputRef = useRef<HTMLInputElement>(null);
  const currentTheme = getCurrentTheme(theme);

  useEffect(() => {
    if (inputRef.current && !showThemeSelector && !showSocials) {
      inputRef.current.focus();
    }
  }, [showThemeSelector, showSocials]);

  const handleClick = () => {
    if (inputRef.current && !showThemeSelector && !showSocials) {
      inputRef.current.focus();
    }
  };

  const socials = [
    { name: 'GitHub', url: 'https://github.com/yashk1998', icon: '🐙' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/yashkhivasara', icon: '💼' },
    { name: 'Twitter', url: 'https://x.com/k2_yash', icon: '🐦' },
    { name: 'Instagram', url: 'https://www.instagram.com/yash_k2/', icon: '📷' }
  ];

  const handleGlobalKeyDown = (e: KeyboardEvent) => {
    // Theme selector navigation
    if (showThemeSelector) {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          const themeNames = getThemeNames();
          dispatch(setSelectedThemeIndex((selectedThemeIndex + 1) % themeNames.length));
          break;
        case 'ArrowUp':
          e.preventDefault();
          const themes = getThemeNames();
          dispatch(setSelectedThemeIndex((selectedThemeIndex - 1 + themes.length) % themes.length));
          break;
        case 'Enter':
          e.preventDefault();
          const availableThemes = getThemeNames();
          const selectedTheme = availableThemes[selectedThemeIndex];
          dispatch(setTheme(selectedTheme));
          dispatch(setShowThemeSelector(false));
          break;
        case 'Escape':
          e.preventDefault();
          dispatch(setShowThemeSelector(false));
          break;
      }
      return;
    }

    // Socials navigation
    if (showSocials) {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          dispatch(setSelectedSocialIndex((selectedSocialIndex + 1) % 4));
          break;
        case 'ArrowUp':
          e.preventDefault();
          dispatch(setSelectedSocialIndex((selectedSocialIndex - 1 + 4) % 4));
          break;
        case 'Enter':
          e.preventDefault();
          window.open(socials[selectedSocialIndex].url, '_blank');
          dispatch(setShowSocials(false));
          break;
        case 'Escape':
          e.preventDefault();
          dispatch(setShowSocials(false));
          break;
      }
      return;
    }

    // Don't handle shortcuts when typing in input
    if (e.target instanceof HTMLInputElement) {
      return;
    }

    // Ctrl + l: Clear terminal
    if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      dispatch(clearCommands());
      dispatch(setShowThemeSelector(false));
      dispatch(setShowSocials(false));
    }

    // Ctrl + k: Clear current line
    if (e.ctrlKey && e.key === 'k') {
      e.preventDefault();
      dispatch(setCurrentInput(''));
    }

    // Tab or Ctrl + i: Autocomplete
    if (e.key === 'Tab' || (e.ctrlKey && e.key === 'i')) {
      e.preventDefault();
      const input = currentInput.trim().toLowerCase();
      if (input) {
        const matchingCommand = availableCommands.find(cmd => 
          cmd.startsWith(input)
        );
        if (matchingCommand) {
          dispatch(setCurrentInput(matchingCommand));
        }
      }
    }

    // General navigation (only when not in menus)
    if (!showThemeSelector && !showSocials) {
      // Up Arrow: Navigate history up
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        dispatch(navigateHistoryUp());
      }

      // Down Arrow: Navigate history down
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        dispatch(navigateHistoryDown());
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [showThemeSelector, selectedThemeIndex, showSocials, selectedSocialIndex, currentInput]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const command = currentInput.trim();
      if (command) {
        const result = executeCommand(command);
        result.then((cmd) => {
          if (cmd.output === 'CLEAR') {
            dispatch(clearCommands());
            dispatch(setShowThemeSelector(false));
            dispatch(setShowSocials(false));
          } else if (cmd.output === 'THEMES_MENU') {
            // Don't add the command to history, just show the menu
            dispatch(setShowThemeSelector(true));
            dispatch(setSelectedThemeIndex(0));
          } else if (cmd.output === 'SOCIALS_MENU') {
            // Don't add the command to history, just show the menu
            dispatch(setShowSocials(true));
            dispatch(setSelectedSocialIndex(0));
          } else {
            dispatch(addCommand(cmd));
          }
        });
        dispatch(setCurrentInput(''));
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCurrentInput(e.target.value));
  };

  return (
    <div 
      className="terminal-container" 
      style={{ 
        backgroundColor: currentTheme.backgroundColor, 
        color: currentTheme.textColor, 
        fontFamily: 'IBM Plex Mono, monospace',
        minHeight: '100vh',
        padding: '16px',
        overflowX: 'hidden',
        wordWrap: 'break-word',
        whiteSpace: 'pre-wrap'
      }}
      onClick={handleClick}
      tabIndex={0}
    >
      <div className="terminal-header">
        <pre className="ascii-art" style={{ 
          color: currentTheme.asciiArtColor, 
          fontSize: '14px', 
          lineHeight: '1.2', 
          fontFamily: 'IBM Plex Mono, monospace', 
          textAlign: 'center', 
          overflowX: 'hidden', 
          wordWrap: 'break-word', 
          whiteSpace: 'pre-wrap' 
        }}>
{`
██╗   ██╗ █████╗ ███████╗██╗  ██╗    ██╗  ██╗██╗  ██╗██╗██╗   ██╗ █████╗ ███████╗ █████╗ ██████╗  █████╗
╚██╗ ██╔╝██╔══██╗██╔════╝██║  ██║    ██║ ██╔╝██║  ██║██║██║   ██║██╔══██╗██╔════╝██╔══██╗██╔══██╗██╔══██╗
 ╚████╔╝ ███████║███████╗███████║    █████╔╝ ███████║██║██║   ██║███████║███████╗███████║██████╔╝███████║
  ╚██╔╝  ██╔══██║╚════██║██╔══██║    ██╔═██╗ ██╔══██║██║╚██╗ ██╔╝██╔══██║╚════██║██╔══██║██╔══██╗██╔══██║
   ██║   ██║  ██║███████║██║  ██║    ██║  ██╗██║  ██║██║ ╚████╔╝ ██║  ██║███████║██║  ██║██║  ██║██║  ██║
   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝    ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝  ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝
`}
        </pre>
        
        <pre className="ascii-art" style={{ 
          color: currentTheme.asciiArtColor, 
          fontSize: '8px', 
          lineHeight: '1.0', 
          fontFamily: 'IBM Plex Mono, monospace', 
          textAlign: 'center', 
          marginTop: '16px', 
          overflowX: 'hidden', 
          wordWrap: 'break-word', 
          whiteSpace: 'pre-wrap' 
        }}>
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
        
        <div className="welcome-message" style={{ color: currentTheme.welcomeTextColor, marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Welcome to my terminal portfolio.</h3>
          <p style={{ fontSize: '14px', marginBottom: '4px' }}>This project's source code can be seen in this project's <span style={{ color: currentTheme.linkColor, textDecoration: 'underline' }}>GitHub repo</span>.</p>
          <p style={{ fontSize: '14px', marginBottom: '4px' }}>For a list of available commands, type <span style={{ color: currentTheme.highlightColor, fontWeight: '600' }}>help</span>.</p>
        </div>
      </div>
      
      <div className="terminal-output-container" style={{ overflowX: 'hidden', wordWrap: 'break-word' }}>
        {commands.map((cmd, index) => (
          <div key={index} style={{ marginBottom: '16px', overflowX: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '8px', flexWrap: 'wrap', overflowX: 'hidden' }}>
              <span style={{ color: currentTheme.promptColor, marginRight: '8px', fontWeight: '600', flexShrink: '0' }}>terminal@yashkhivasara.dev:~$</span>
              <span style={{ color: currentTheme.textColor, fontSize: '14px', wordBreak: 'break-all' }}>{cmd.input}</span>
            </div>
            {cmd.output && (
              <div style={{ marginLeft: '16px', marginBottom: '16px', overflowX: 'hidden' }}>
                <pre style={{ 
                  color: currentTheme.textColor, 
                  whiteSpace: 'pre-wrap', 
                  fontFamily: 'IBM Plex Mono, monospace', 
                  fontSize: '14px', 
                  lineHeight: '1.4', 
                  wordWrap: 'break-word', 
                  overflowX: 'hidden', 
                  wordBreak: 'break-all' 
                }}>{cmd.output}</pre>
              </div>
            )}
          </div>
        ))}
        
        {showSocials && (
          <div style={{ marginLeft: '16px', marginBottom: '16px', overflowX: 'hidden' }}>
            <div style={{ color: currentTheme.textColor, fontSize: '14px', marginBottom: '12px' }}>
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
                    backgroundColor: selectedSocialIndex === index ? currentTheme.selectionColor : 'transparent',
                    color: selectedSocialIndex === index ? currentTheme.backgroundColor : currentTheme.textColor,
                    borderRadius: '4px',
                    cursor: 'pointer',
                    flexWrap: 'wrap'
                  }}
                >
                  <span style={{ marginRight: '8px', fontSize: '16px' }}>{social.icon}</span>
                  <span style={{ fontSize: '14px', wordBreak: 'break-all' }}>{social.name}</span>
                  {selectedSocialIndex === index && (
                    <span style={{ marginLeft: '8px', fontSize: '12px' }}>← Press Enter to open</span>
                  )}
                </div>
              ))}
            </div>
            <div style={{ color: currentTheme.textColor, fontSize: '12px', marginTop: '8px', fontStyle: 'italic' }}>
              Use ↑↓ arrows to navigate, Enter to open, Esc to exit
            </div>
          </div>
        )}

        {showThemeSelector && (
          <div style={{ marginLeft: '16px', marginBottom: '16px', overflowX: 'hidden' }}>
            <div style={{ color: currentTheme.textColor, fontSize: '14px', marginBottom: '12px' }}>
              <strong>Available Themes:</strong>
            </div>
            <div style={{ marginLeft: '16px', overflowX: 'hidden' }}>
              {getThemeNames().map((themeName, index) => (
                <div 
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '8px',
                    padding: '4px 8px',
                    backgroundColor: selectedThemeIndex === index ? currentTheme.selectionColor : 'transparent',
                    color: selectedThemeIndex === index ? currentTheme.backgroundColor : currentTheme.textColor,
                    borderRadius: '4px',
                    cursor: 'pointer',
                    flexWrap: 'wrap'
                  }}
                >
                  <span style={{ fontSize: '14px', wordBreak: 'break-all' }}>{themeName}</span>
                  {selectedThemeIndex === index && (
                    <span style={{ marginLeft: '8px', fontSize: '12px' }}>← Press Enter to select</span>
                  )}
                </div>
              ))}
            </div>
            <div style={{ color: currentTheme.textColor, fontSize: '12px', marginTop: '8px', fontStyle: 'italic' }}>
              Use ↑↓ arrows to navigate, Enter to select, Esc to exit
            </div>
          </div>
        )}
        
        {!showThemeSelector && !showSocials && (
          <div className="terminal-input-container" style={{ display: 'flex', alignItems: 'center', position: 'relative', overflowX: 'hidden', flexWrap: 'wrap' }}>
            <span className="terminal-prompt" style={{ color: currentTheme.promptColor, fontWeight: '600', flexShrink: '0' }}>terminal@yashkhivasara.dev:~$</span>
            <span style={{ color: currentTheme.textColor, fontSize: '14px', wordBreak: 'break-all' }}>{currentInput}</span>
            <span className="terminal-cursor" style={{ color: currentTheme.cursorColor, animation: 'blink 1s infinite' }}>█</span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={handleInputChange}
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
        )}
      </div>
      
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        /* Hide scrollbars for all browsers */
        .terminal-container {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* Internet Explorer 10+ */
        }
        
        .terminal-container::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
        
        .terminal-output-container {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* Internet Explorer 10+ */
        }
        
        .terminal-output-container::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
        
        /* Hide scrollbars on any child elements that might scroll */
        .terminal-container * {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* Internet Explorer 10+ */
        }
        
        .terminal-container *::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
      `}</style>
    </div>
  );
}