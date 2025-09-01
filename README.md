# Yash Khivasara - Dual Portfolio

This is a dual-portfolio application featuring both a **Terminal Portfolio** and an **AI-Native GUI Portfolio**.

## 🚀 Features

### Terminal Portfolio (`/terminal`)
- Interactive terminal-style interface
- Multiple themes (Dark, Light, Blue-matrix, Espresso, Green-goblin, Ubuntu)
- Keyboard shortcuts (Ctrl+i, Up Arrow, Ctrl+l)
- Command history navigation
- Theme persistence across sessions
- `gui` command to switch to GUI portfolio

### AI-Native GUI Portfolio (`/`)
- World's first AI-native portfolio interface
- Real-time chat with AI assistant
- Modern, responsive design
- Built with Next.js, TypeScript, Tailwind CSS
- AI-powered responses about skills, projects, and experience

## 🛠️ Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- OpenAI API key (for AI chat functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
src/
├── app/
│   ├── api/chat/          # AI chat API
│   ├── terminal/          # Terminal portfolio page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # GUI portfolio page
├── components/
│   ├── chat/              # AI chat components
│   ├── ui/                # Reusable UI components
│   └── Terminal.tsx       # Terminal component
├── features/
│   └── terminal/          # Terminal state management
├── lib/
│   ├── commands.ts        # Terminal commands
│   ├── themes.ts          # Theme definitions
│   ├── utils.ts           # Utility functions
│   └── providers.tsx      # Redux providers
```

## 🎨 Themes

The terminal portfolio supports multiple themes:
- **Dark** - Purple/blue accents with light gray text
- **Light** - Clean white background
- **Blue-matrix** - Matrix-style blue theme
- **Espresso** - Coffee-inspired dark theme
- **Green-goblin** - Default green terminal theme
- **Ubuntu** - Ubuntu-inspired theme

## 🤖 AI Chat Features

The GUI portfolio includes an AI assistant that can answer questions about:
- Technical skills and technologies
- Work experience and timeline
- Projects and portfolio
- Contact information
- General questions about development

## 🎯 Usage

### Terminal Portfolio
- Visit `/terminal` for the terminal interface
- Type `help` to see available commands
- Use `themes` to change the terminal theme
- Type `gui` to switch to the GUI portfolio

### GUI Portfolio
- Visit `/` for the AI-native interface
- Start a conversation with the AI assistant
- Ask questions about skills, projects, experience
- Get instant, personalized responses

## 🔧 Technologies Used

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **State Management**: Redux Toolkit
- **AI**: OpenAI API, Vercel AI SDK
- **UI Components**: Shadcn/ui
- **Animations**: Framer Motion

## 📝 License

MIT License - feel free to use this code for your own portfolio!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ by Yash Khivasara**
