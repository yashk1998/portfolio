import { Command } from '@/features/terminal/terminalSlice';
import { getThemeNames } from './themes';

export interface CommandHandler {
  execute: (args: string[]) => Promise<string>;
  description: string;
}

export const availableCommands = [
  'help', 'about', 'skills', 'projects', 'experience', 
  'contact', 'resume', 'blog', 'socials', 'themes', 
  'ai-chat', 'clear', 'whoami'
];

export const commandHandlers: Record<string, CommandHandler> = {
  help: {
    execute: async () => {
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
• themes    - Change terminal theme
• ai-chat   - AI assistant
• clear     - Clear terminal
• help      - Show this help
• whoami    - Show current user

Type any command to get started!
      `.trim();
    },
    description: 'Show available commands',
  },
  
  about: {
    execute: async () => {
      return `
Hello! I'm Yash Khivasara, a passionate full-stack builder who loves creating innovative solutions.
I specialize in modern web technologies and enjoy building interactive experiences.
This terminal portfolio showcases my skills, projects, and journey in tech.

I believe in clean code, user experience, and continuous learning.
      `.trim();
    },
    description: 'Personal introduction',
  },
  
  skills: {
    execute: async () => {
      return `
Technical Skills:
• Frontend: React, Next.js, TypeScript, Tailwind CSS, Vue.js
• Backend: Node.js, Python, Java, APIs, Microservices
• Database: PostgreSQL, MongoDB, Redis, Supabase
• DevOps: Docker, AWS, Azure, CI/CD, Kubernetes
• Tools: Git, VS Code, Figma, Postman
• Cloud: AWS, Azure, Google Cloud Platform
      `.trim();
    },
    description: 'Technical skills and technologies',
  },
  
  projects: {
    execute: async () => {
      return `
Featured Projects:
• Terminal Portfolio (Current) - Interactive terminal-style portfolio
• E-commerce Platform - Full-stack React + Node.js application
• AI Chat Application - Real-time chat with OpenAI integration
• Task Management System - Vue.js + Firebase project
• Weather Dashboard - React + OpenWeather API

More projects available at: github.com/yashkhivasara
      `.trim();
    },
    description: 'Showcase of projects',
  },
  
  experience: {
    execute: async () => {
      return `
Work Experience:
• Senior Full Stack Developer (2023-Present) - Tech Company
• Full Stack Developer (2021-2023) - Startup Inc.
• Junior Developer (2019-2021) - Digital Agency

Education:
• Bachelor's in Computer Science
• Certifications: AWS, Azure, Google Cloud
      `.trim();
    },
    description: 'Work history and timeline',
  },
  
  contact: {
    execute: async () => {
      return `
Get in Touch:
• Email: yash.khivasara@gmail.com
• GitHub: github.com/yashk1998
• LinkedIn: linkedin.com/in/yashkhivasara
• Twitter: @k2_yash

Feel free to reach out for collaborations or opportunities!
      `.trim();
    },
    description: 'Get in touch',
  },
  
  resume: {
    execute: async () => {
      return `
Resume Download:
📄 Download PDF: /api/resume
📄 View Online: /resume

Your resume is ready for download!
      `.trim();
    },
    description: 'Download resume',
  },
  
  blog: {
    execute: async () => {
      return `
Blog Posts:
• Coming Soon - Blog integration with Ghost CMS
• More posts will be available here

Visit: yashkhivasara.ghost.org for full articles
      `.trim();
    },
    description: 'View blog posts',
  },
  
  socials: {
    execute: async () => {
      return 'SOCIALS_MENU'; // Special command to show socials menu
    },
    description: 'Social media links',
  },
  
  themes: {
    execute: async () => {
      return 'THEMES_MENU'; // Special command to show themes menu
    },
    description: 'Change terminal theme',
  },
  
  'ai-chat': {
    execute: async (args) => {
      if (!args.length) {
        return `Usage: ai-chat <your question>\nExample: ai-chat "Tell me about your experience with React"`;
      }
      
      const question = args.join(' ');
      return `AI Assistant: I'm here to help! Your question: "${question}"\n\nResponse: This feature is coming soon with Azure OpenAI integration.`;
    },
    description: 'AI assistant',
  },
  
  clear: {
    execute: async () => {
      return 'CLEAR'; // Special command to clear terminal
    },
    description: 'Clear terminal',
  },

  whoami: {
    execute: async () => {
      // Check if we're in a browser environment
      if (typeof window !== 'undefined') {
        // In browser, we can't get the actual IP, so we'll return visitor
        // In a real implementation, you'd need server-side logic to get the actual IP
        return 'visitor';
      }
      
      // For server-side or when IP detection is available
      return 'visitor';
    },
    description: 'Show current user',
  },
};

export const executeCommand = async (input: string): Promise<Command> => {
  const trimmedInput = input.trim();
  const [command, ...args] = trimmedInput.split(' ');
  
  const handler = commandHandlers[command.toLowerCase()];
  
  if (!handler) {
    return {
      id: Date.now().toString(),
      input: trimmedInput,
      output: `Command not found: ${command}\nType 'help' to see available commands.`,
      timestamp: Date.now(),
    };
  }
  
  try {
    const output = await handler.execute(args);
    return {
      id: Date.now().toString(),
      input: trimmedInput,
      output,
      timestamp: Date.now(),
    };
  } catch (error) {
    return {
      id: Date.now().toString(),
      input: trimmedInput,
      output: `Error executing command: ${error}`,
      timestamp: Date.now(),
    };
  }
}; 