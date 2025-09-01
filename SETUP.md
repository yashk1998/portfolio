# 🚀 Portfolio Setup Guide

## 📋 Environment Variables Setup

### Step 1: Create Environment File
Create a `.env.local` file in the root directory:

```bash
# Copy the example file
cp env.example .env.local
```

### Step 2: Configure Azure OpenAI (Optional)
If you want to use the AI chat feature, get your Azure OpenAI credentials:

1. **Go to Azure Portal**: https://portal.azure.com
2. **Find your OpenAI service** or create one
3. **Get your credentials**:
   - Endpoint URL
   - API Key
   - Deployment name

4. **Update `.env.local`**:
```env
AZURE_OPENAI_ENDPOINT="https://your-resource.openai.azure.com/"
AZURE_OPENAI_KEY="your-azure-api-key-here"
AZURE_OPENAI_DEPLOYMENT_NAME="your-model-deployment-name"
AZURE_API_VERSION="2024-02-01"
```

### Step 3: Install Dependencies
```bash
npm install
```

### Step 4: Run Development Server
```bash
npm run dev
```

## 🌐 Access Your Portfolio

- **Main Portfolio**: http://localhost:3000
- **Terminal Portfolio**: http://localhost:3000/terminal

## 🔧 Troubleshooting

### Slow Build Times
- The build is optimized for faster compilation
- Removed unnecessary dependencies
- Uses minimal UI components

### Environment Variables Not Working
- Make sure `.env.local` is in the root directory
- Restart the development server after adding variables
- Check that variable names match exactly

### Azure OpenAI Issues
- Verify your Azure OpenAI service is active
- Check that your deployment name is correct
- Ensure your API key has proper permissions

## 📁 Project Structure

```
src/
├── app/
│   ├── api/chat/          # AI chat API
│   ├── terminal/          # Terminal portfolio page
│   └── page.tsx           # Main portfolio page
├── components/
│   ├── chat/              # AI chat components
│   ├── ui/                # UI components
│   └── Terminal.tsx       # Terminal component
└── features/
    └── terminal/          # Terminal state management
```

## 🎯 Features

### Terminal Portfolio (`/terminal`)
- Interactive terminal interface
- Multiple themes
- Keyboard shortcuts
- Command history

### Main Portfolio (`/`)
- Simple landing page
- Links to terminal portfolio
- Ready for AI chat integration

### AI Chat (When configured)
- Real-time chat with Azure OpenAI
- Profile-focused responses
- Token-saving restrictions 