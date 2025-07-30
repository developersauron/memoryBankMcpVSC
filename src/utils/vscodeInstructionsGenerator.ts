/**
 * Utility functions for generating VS Code Copilot instructions
 *
 * Note: This module dynamically imports the gemini.js module when necessary
 * to generate AI-powered content for VS Code development guidelines.
 */

/**
 * Generates VS Code copilot instructions content based on project purpose
 * @param purpose Project purpose description
 * @returns Generated copilot instructions content
 */
export async function generateCopilotInstructions(purpose: string): Promise<string> {
  // Format current date in English locale
  const currentDate = new Date().toLocaleDateString("en-US");

  // Project type detection based on user's purpose
  const projectType = detectProjectType(purpose);

  // Generate content with AI
  try {
    console.log("Attempting to generate VS Code copilot instructions with AI...");
    const mainInstructionsContent = await generateMainInstructionsWithAI(
      purpose,
      currentDate,
      projectType
    );
    console.log("Successfully generated copilot instructions with AI");
    return mainInstructionsContent;
  } catch (error) {
    console.error("Error generating copilot instructions with AI:", error);
    
    // Log error details for debugging
    if (error instanceof Error) {
      console.error("Error details:", error.message);
      if (error.stack) {
        console.error("Error stack:", error.stack);
      }
      
      // Provide descriptive error message to user
      throw new Error(`Failed to generate content with AI: ${error.message}`);
    }
    
    // General error case
    throw new Error("Failed to generate content with AI. Please try again later.");
  }
}

/**
 * Detects project type based on user's purpose
 */
function detectProjectType(purpose: string): string {
  const purposeLower = purpose.toLowerCase();

  if (
    purposeLower.includes("frontend") ||
    purposeLower.includes("web") ||
    purposeLower.includes("site") ||
    purposeLower.includes("ui")
  ) {
    return "frontend";
  }

  if (
    purposeLower.includes("backend") ||
    purposeLower.includes("api") ||
    purposeLower.includes("service")
  ) {
    return "backend";
  }

  if (
    purposeLower.includes("mobile") ||
    purposeLower.includes("android") ||
    purposeLower.includes("ios")
  ) {
    return "mobile";
  }

  if (
    purposeLower.includes("fullstack") ||
    purposeLower.includes("full-stack")
  ) {
    return "fullstack";
  }

  if (
    purposeLower.includes("data") ||
    purposeLower.includes("analytics") ||
    purposeLower.includes("ml") ||
    purposeLower.includes("ai")
  ) {
    return "data";
  }

  if (
    purposeLower.includes("devops") ||
    purposeLower.includes("infrastructure") ||
    purposeLower.includes("cloud")
  ) {
    return "devops";
  }

  return "general";
}

/**
 * Generates the main VS Code copilot instructions content using Gemini API
 */
async function generateMainInstructionsWithAI(
  purpose: string,
  currentDate: string,
  projectType: string
): Promise<string> {
  const frontmatter = `# ${purpose} - VS Code Development Guide

Generated on: ${currentDate}
Project Type: ${projectType}

---`;

  try {
    console.log("Dynamically importing gemini.js module...");
    const { generateContent } = await import("./gemini.js");
    console.log("Successfully imported gemini.js module");

    const prompt = `
As a VS Code development expert, you are creating comprehensive development guidelines for the ${purpose} project.

PROJECT DETAILS:
- PURPOSE: ${purpose}
- TYPE: ${projectType}
- DATE: ${currentDate}
- TARGET IDE: Visual Studio Code

FORMAT REQUIREMENTS:
1. Start with a clear and concise main title
2. Use hierarchical markdown headings (## for main sections, ### for subsections)
3. Use numbered lists for step-by-step instructions
4. Use bullet points for important notes and guidelines
5. Include language-specific code blocks for all examples
6. Provide VS Code-specific tips and shortcuts
7. Use bold and italic formatting to emphasize important points
8. Include VS Code extension recommendations

CONTENT REQUIREMENTS:
1. VS CODE SETUP:
   - Required extensions for ${projectType} development
   - Workspace settings configuration
   - Debug configuration setup
   - Task runner configuration
   - Launch.json setup for debugging

2. PROJECT OVERVIEW:
   - Detailed project purpose and objectives
   - Technical goals and success criteria
   - Recommended technology stack with version numbers
   - Architectural patterns and design decisions

3. CODE STRUCTURE AND ORGANIZATION:
   - Detailed file/folder structure for ${projectType} projects
   - Comprehensive naming conventions with examples
   - Module organization and dependency management
   - State management patterns (if applicable)

4. VS CODE WORKFLOW:
   - Essential keyboard shortcuts for ${projectType}
   - IntelliSense configuration
   - Code formatting and linting setup
   - Git integration best practices
   - Terminal usage within VS Code

5. DEBUGGING AND TESTING:
   - Breakpoint strategies
   - Debug console usage
   - Test runner integration
   - Performance profiling
   - Error tracking and logging

6. DEVELOPMENT STANDARDS:
   - Language-specific best practices
   - Error handling strategies
   - Performance optimization techniques
   - Security implementation guidelines
   - Code review checklist

7. GITHUB COPILOT INTEGRATION:
   - Best practices for using GitHub Copilot
   - Prompt engineering techniques
   - Code suggestion acceptance guidelines
   - AI-assisted debugging workflows

8. VS CODE EXTENSIONS ECOSYSTEM:
   - Essential extensions for ${projectType}
   - Extension configuration
   - Custom snippets creation
   - Workspace-specific settings

9. PRODUCTIVITY FEATURES:
   - Multi-cursor editing techniques
   - Find and replace strategies
   - Code refactoring tools
   - Integrated terminal usage

10. COLLABORATION FEATURES:
    - Live Share setup and usage
    - Remote development workflows
    - Version control integration
    - Code review processes in VS Code

Include specific, practical examples that directly apply to ${projectType} development in VS Code.
Each guideline should be actionable and specific to VS Code environment.
Focus on maximizing productivity with VS Code's built-in features and extensions.
End with VS Code-specific tips and GitHub Copilot best practices.
`;

    console.log("Sending request to Gemini API...");
    const aiGeneratedContent = await generateContent(prompt);
    console.log("Successfully received response from Gemini API");

    return `${frontmatter}

${aiGeneratedContent}

---
*Generated with AI assistance for VS Code development*
*Memory Bank MCP - @tuncer-byte*`;
  } catch (error) {
    console.error("Error generating VS Code instructions with AI:", error);

    // More descriptive error messages
    if (error instanceof Error) {
      if (error.message.includes("GEMINI_API_KEY")) {
        throw new Error(
          "Gemini API key not found. Please define GEMINI_API_KEY in your .env file."
        );
      } else if (
        error.message.includes("network") ||
        error.message.includes("fetch")
      ) {
        throw new Error(
          "Could not connect to Gemini API. Please check your internet connection."
        );
      }
    }

    // Re-throw original error
    throw error;
  }
}
