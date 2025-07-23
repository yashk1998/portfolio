export interface Theme {
  name: string;
  backgroundColor: string;
  textColor: string;
  promptColor: string;
  cursorColor: string;
  selectionColor: string;
  asciiArtColor: string;
  welcomeTextColor: string;
  linkColor: string;
  highlightColor: string;
  errorColor: string;
  successColor: string;
  warningColor: string;
  infoColor: string;
  borderColor?: string;
  shadowColor?: string;
}

export const themes: Record<string, Theme> = {
  'dark': {
    name: 'Dark Theme',
    backgroundColor: '#0a0a0a',
    textColor: '#e0e0e0',
    promptColor: '#8b5cf6',
    cursorColor: '#8b5cf6',
    selectionColor: '#8b5cf6',
    asciiArtColor: '#8b5cf6',
    welcomeTextColor: '#e0e0e0',
    linkColor: '#60a5fa',
    highlightColor: '#fbbf24',
    errorColor: '#ef4444',
    successColor: '#10b981',
    warningColor: '#f59e0b',
    infoColor: '#3b82f6',
  },
  'light': {
    name: 'Light Theme',
    backgroundColor: '#ffffff',
    textColor: '#000000',
    promptColor: '#0066cc',
    cursorColor: '#000000',
    selectionColor: '#0066cc',
    asciiArtColor: '#0066cc',
    welcomeTextColor: '#000000',
    linkColor: '#0066cc',
    highlightColor: '#cc6600',
    errorColor: '#cc0000',
    successColor: '#006600',
    warningColor: '#cc6600',
    infoColor: '#0066cc',
  },
  'blue-matrix': {
    name: 'Blue Matrix',
    backgroundColor: '#001122',
    textColor: '#00ffff',
    promptColor: '#00ffff',
    cursorColor: '#00ffff',
    selectionColor: '#0088ff',
    asciiArtColor: '#00ffff',
    welcomeTextColor: '#00ffff',
    linkColor: '#0088ff',
    highlightColor: '#ffff00',
    errorColor: '#ff4444',
    successColor: '#44ff44',
    warningColor: '#ffaa44',
    infoColor: '#4488ff',
  },
  'espresso': {
    name: 'Espresso',
    backgroundColor: '#2d1b1b',
    textColor: '#d4c4a7',
    promptColor: '#d4c4a7',
    cursorColor: '#d4c4a7',
    selectionColor: '#8b4513',
    asciiArtColor: '#d4c4a7',
    welcomeTextColor: '#d4c4a7',
    linkColor: '#8b4513',
    highlightColor: '#ffd700',
    errorColor: '#ff6b6b',
    successColor: '#51cf66',
    warningColor: '#ffd43b',
    infoColor: '#74c0fc',
  },
  'green-goblin': {
    name: 'Green Goblin',
    backgroundColor: '#0a0a0a',
    textColor: '#00ff41',
    promptColor: '#00ff41',
    cursorColor: '#00ff41',
    selectionColor: '#00ff41',
    asciiArtColor: '#00ff41',
    welcomeTextColor: '#00ff41',
    linkColor: '#00aaff',
    highlightColor: '#ffff00',
    errorColor: '#ff0040',
    successColor: '#00ff41',
    warningColor: '#ffaa00',
    infoColor: '#00aaff',
  },
  'ubuntu': {
    name: 'Ubuntu',
    backgroundColor: '#2d0922',
    textColor: '#ffffff',
    promptColor: '#e95420',
    cursorColor: '#ffffff',
    selectionColor: '#e95420',
    asciiArtColor: '#e95420',
    welcomeTextColor: '#ffffff',
    linkColor: '#e95420',
    highlightColor: '#fbb040',
    errorColor: '#e95420',
    successColor: '#38b2ac',
    warningColor: '#fbb040',
    infoColor: '#3182ce',
  },
};

export const getCurrentTheme = (themeName: string): Theme => {
  return themes[themeName] || themes['dark'];
};

export const getThemeNames = (): string[] => {
  return Object.keys(themes);
}; 