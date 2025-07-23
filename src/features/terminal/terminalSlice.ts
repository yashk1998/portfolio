import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Command {
  id: string;
  input: string;
  output: string;
  timestamp: number;
}

export interface TerminalState {
  commands: Command[];
  commandHistory: string[];
  historyIndex: number;
  currentInput: string;
  theme: string;
  isTyping: boolean;
  showCursor: boolean;
  showThemeSelector: boolean;
  selectedThemeIndex: number;
  showSocials: boolean;
  selectedSocialIndex: number;
}

// Get theme from localStorage or default to green-goblin
const getInitialTheme = (): string => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('terminal-theme');
    return savedTheme || 'green-goblin';
  }
  return 'green-goblin';
};

const initialState: TerminalState = {
  commands: [],
  commandHistory: [],
  historyIndex: 0,
  currentInput: '',
  theme: getInitialTheme(),
  isTyping: false,
  showCursor: true,
  showThemeSelector: false,
  selectedThemeIndex: 0,
  showSocials: false,
  selectedSocialIndex: 0,
};

const terminalSlice = createSlice({
  name: 'terminal',
  initialState,
  reducers: {
    setCurrentInput: (state, action: PayloadAction<string>) => {
      state.currentInput = action.payload;
    },
    addCommand: (state, action: PayloadAction<Command>) => {
      state.commands.push(action.payload);
      if (action.payload.input.trim()) {
        state.commandHistory.push(action.payload.input);
        state.historyIndex = state.commandHistory.length;
      }
    },
    clearCommands: (state) => {
      state.commands = [];
    },
    setHistoryIndex: (state, action: PayloadAction<number>) => {
      state.historyIndex = action.payload;
    },
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
      // Save theme to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('terminal-theme', action.payload);
      }
    },
    setIsTyping: (state, action: PayloadAction<boolean>) => {
      state.isTyping = action.payload;
    },
    setShowCursor: (state, action: PayloadAction<boolean>) => {
      state.showCursor = action.payload;
    },
    setShowThemeSelector: (state, action: PayloadAction<boolean>) => {
      state.showThemeSelector = action.payload;
      if (action.payload) {
        state.selectedThemeIndex = 0;
      }
    },
    setSelectedThemeIndex: (state, action: PayloadAction<number>) => {
      state.selectedThemeIndex = action.payload;
    },
    setShowSocials: (state, action: PayloadAction<boolean>) => {
      state.showSocials = action.payload;
      if (action.payload) {
        state.selectedSocialIndex = 0;
      }
    },
    setSelectedSocialIndex: (state, action: PayloadAction<number>) => {
      state.selectedSocialIndex = action.payload;
    },
    navigateHistoryUp: (state) => {
      if (state.historyIndex > 0) {
        state.historyIndex--;
        state.currentInput = state.commandHistory[state.historyIndex];
      }
    },
    navigateHistoryDown: (state) => {
      if (state.historyIndex < state.commandHistory.length) {
        state.historyIndex++;
        if (state.historyIndex === state.commandHistory.length) {
          state.currentInput = '';
        } else {
          state.currentInput = state.commandHistory[state.historyIndex];
        }
      }
    },
  },
});

export const {
  setCurrentInput,
  addCommand,
  clearCommands,
  setHistoryIndex,
  setTheme,
  setIsTyping,
  setShowCursor,
  setShowThemeSelector,
  setSelectedThemeIndex,
  setShowSocials,
  setSelectedSocialIndex,
  navigateHistoryUp,
  navigateHistoryDown,
} = terminalSlice.actions;

export default terminalSlice.reducer; 