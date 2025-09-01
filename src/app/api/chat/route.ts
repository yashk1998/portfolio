import { NextRequest, NextResponse } from 'next/server';

// Portfolio data for AI responses
const portfolioData = {
  about: "I'm Yash Khivasara, a passionate full-stack developer specializing in modern web technologies and interactive experiences.",
  skills: [
    "Frontend: React, Next.js, TypeScript, Tailwind CSS, Vue.js",
    "Backend: Node.js, Python, Java, APIs, Microservices", 
    "Database: PostgreSQL, MongoDB, Redis, Supabase",
    "DevOps: Docker, AWS, Azure, CI/CD, Kubernetes",
    "Cloud: AWS, Azure, Google Cloud Platform"
  ],
  projects: [
    "Terminal Portfolio - Interactive terminal-style portfolio",
    "E-commerce Platform - Full-stack React + Node.js application",
    "AI Chat Application - Real-time chat with OpenAI integration",
    "Task Management System - Vue.js + Firebase project",
    "Weather Dashboard - React + OpenWeather API"
  ],
  experience: [
    "Senior Full Stack Developer (2023-Present) - Tech Company",
    "Full Stack Developer (2021-2023) - Startup Inc.", 
    "Junior Developer (2019-2021) - Digital Agency"
  ],
  contact: {
    email: "yash.khivasara@gmail.com",
    github: "github.com/yashk1998",
    linkedin: "linkedin.com/in/yashkhivasara",
    twitter: "@k2_yash"
  }
};

// Simple AI-like responses based on query
function generateResponse(query: string): string {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('project')) {
    return `Here are my featured projects:\n\n${portfolioData.projects.map(p => `• ${p}`).join('\n')}\n\nMore details available at: github.com/yashkhivasara`;
  }
  
  if (lowerQuery.includes('skill') || lowerQuery.includes('tech')) {
    return `My technical skills include:\n\n${portfolioData.skills.map(s => `• ${s}`).join('\n')}\n\nI'm always learning new technologies and best practices!`;
  }
  
  if (lowerQuery.includes('experience') || lowerQuery.includes('work')) {
    return `My work experience:\n\n${portfolioData.experience.map(e => `• ${e}`).join('\n')}\n\nI've worked across various industries and team sizes, from startups to enterprise.`;
  }
  
  if (lowerQuery.includes('contact') || lowerQuery.includes('reach')) {
    return `You can reach me through:\n\n• Email: ${portfolioData.contact.email}\n• GitHub: ${portfolioData.contact.github}\n• LinkedIn: ${portfolioData.contact.linkedin}\n• Twitter: ${portfolioData.contact.twitter}\n\nFeel free to reach out for collaborations or opportunities!`;
  }
  
  if (lowerQuery.includes('about') || lowerQuery.includes('who')) {
    return portfolioData.about + '\n\nI believe in clean code, user experience, and continuous learning. This portfolio showcases my journey in tech!';
  }
  
  // Default response
  return `Thanks for your question: "${query}"\n\nI'm Yash's AI assistant! I can help you learn about:\n• Projects and technical work\n• Skills and technologies\n• Work experience and background\n• Contact information\n\nTry asking about specific topics like "tell me about your projects" or "what are your skills"?`;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    
    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }
    
    const response = generateResponse(query);
    
    return NextResponse.json({
      message: response,
      timestamp: new Date().toISOString(),
      query: query
    });
    
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, query } = body;
    
    const userQuery = message || query;
    
    if (!userQuery) {
      return NextResponse.json(
        { error: 'Message or query is required' },
        { status: 400 }
      );
    }
    
    const response = generateResponse(userQuery);
    
    return NextResponse.json({
      message: response,
      timestamp: new Date().toISOString(),
      query: userQuery
    });
    
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
