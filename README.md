![image](assets/readme-photo.png)
 
# World's first AI portfolio 🤖✨  

**Static portfolios are dead.**  
So I built [toukoum.fr](https://toukoum.fr).

Instead of making you scroll endlessly, my portfolio adapts to *you*.  
Ask a question — my AI avatar replies instantly.

## 👇 What can you ask?

- 🧠 **Tech recruiter?** Ask about my stack & results  
- 💻 **Dev?** Dive into my code & mindset  
- 🧑‍🤝‍🧑 **Friend or family?** See what I’ve been working on  

---

This is not a portfolio.  
It’s a **conversation tailored to your curiosity**.

➡️ **Try it now:** [https://toukoum.fr](https://toukoum.fr)  
*What will you ask?*

## 🚀 How to run

Want to run this project locally? Here's what you need:

### Prerequisites
- **Node.js** (v18 or higher)
- **pnpm** package manager
- **Azure OpenAI credentials** (for AI chat functionality)
- **GitHub token** (for GitHub integration features)

### Setup
1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment variables**
   Create a `.env` file in the root directory:
   ```env
   # Azure OpenAI Configuration
   AZURE_RESOURCE_NAME=yash-m3j02ah5-eastus2
   AZURE_API_KEY=your_azure_openai_api_key
   AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4o
   AZURE_OPENAI_API_VERSION=2025-01-01-preview
   
   # GitHub Integration
   GITHUB_TOKEN=your_github_token_here
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Getting your **credentials**
- **Azure OpenAI**: 
  - Create an Azure OpenAI resource in the [Azure Portal](https://portal.azure.com)
  - Get your resource name, API key, and deployment name from the Azure OpenAI service
  - Create a model deployment (e.g., GPT-4o-mini) and note the deployment name
- **GitHub Token**: Generate one at [github.com/settings/tokens](https://github.com/settings/personal-access-tokens) with repo access



#### 🔖 Tags

`#AIPortfolio` `#InnovationInTech` `#DigitalResume` `#JobSearch` `#TechInnovation` `#WebDevelopment` `#FutureTech`
