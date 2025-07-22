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
  theme: 'classic' | 'modern' | 'cyberpunk';
  isTyping: boolean;
  showCursor: boolean;
}

const initialState: TerminalState = {
  commands: [],
  commandHistory: [],
  historyIndex: 0,
  currentInput: '',
  theme: 'classic',
  isTyping: false,
  showCursor: true,
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
    setTheme: (state, action: PayloadAction<TerminalState['theme']>) => {
      state.theme = action.payload;
    },
    setIsTyping: (state, action: PayloadAction<boolean>) => {
      state.isTyping = action.payload;
    },
    setShowCursor: (state, action: PayloadAction<boolean>) => {
      state.showCursor = action.payload;
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
} = terminalSlice.actions;

export default terminalSlice.reducer; 