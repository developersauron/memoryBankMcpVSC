# Memory Bank MCP - VS Code Edition

<div align="center">
  <img src="https://github.com/developersauron/memoryBankMcpVSC/blob/main/assets/icon.png" height="128" alt="Memory Bank MCP VS Code">
  <h1>Memory Bank MCP - VS Code Edition</h1>
  <p>
    <b>VS Code optimized structured project knowledge management for LLMs via Model Context Protocol (MCP)</b>
  </p>
</div>

<a href="https://glama.ai/mcp/servers/@developersauron/memoryBankMcpVSC">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@developersauron/memoryBankMcpVSC/badge" alt="Memory Bank MCP VS Code server" />
</a>

---

![VS Code](https://img.shields.io/badge/VS%20Code-Optimized-blue?logo=visualstudiocode)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue?logo=typescript)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Ready-green?logo=github)
![MCP](https://img.shields.io/badge/MCP-Compatible-orange)

---

> **Note:** This is not a traditional Node.js application. Memory Bank MCP is an **MCP server**—a component in the [Model Context Protocol](https://modelcontextprotocol.io/introduction) ecosystem. It exposes project knowledge to LLM-powered agents and tools using a standardized protocol, enabling seamless integration with AI clients (e.g., Claude Desktop, IDEs, or custom LLM agents).

---

## What is Model Context Protocol (MCP)?

MCP is an open protocol that standardizes how applications provide context to LLMs. Think of MCP like a USB-C port for AI: it provides a universal way to connect AI models to data sources and tools, both locally and remotely. MCP enables:

- **Plug-and-play integrations** between LLMs, data, and tools
- **Switching between LLM providers** with minimal friction
- **Secure, modular architecture** for building AI workflows

Learn more: [MCP Introduction](https://modelcontextprotocol.io/introduction)

## About Memory Bank MCP - VS Code Edition

Memory Bank MCP - VS Code Edition is an **MCP server** specifically optimized for Visual Studio Code development workflows. It helps teams create, manage, and access structured project documentation with seamless VS Code integration. The server generates and maintains interconnected Markdown documents capturing all aspects of project knowledge, from high-level goals to technical details and daily progress.

### VS Code Specific Features

- **Native VS Code Integration**: Optimized for VS Code development environment
- **TypeScript Debugging**: Full breakpoint support with source maps
- **Integrated Terminal Support**: Run MCP server directly in VS Code terminal
- **GitHub Copilot Integration**: Enhanced AI-assisted development
- **Task Runner Integration**: Pre-configured VS Code tasks for common operations
- **IntelliSense Support**: Auto-completion for MCP tool schemas

## Features

- **AI-Generated Documentation**: Uses Gemini API to generate and update project documentation
- **Structured Knowledge System**: Maintains six core document types in a hierarchical structure
- **MCP Server**: Implements the Model Context Protocol for integration with LLM agents and tools
- **Customizable Storage**: Choose where your Memory Bank directory is created
- **Document Templates**: Pre-defined templates for project brief, product context, system patterns, etc.
- **AI-Assisted Updates**: Update documents manually or regenerate them with AI
- **Advanced Querying**: Search across all documents with context-aware relevance ranking

## Installation

```bash
# Clone the repository
git clone https://github.com/developersauron/memoryBankMcpVSC.git
cd memoryBankMcpVSC

# Install dependencies
npm install

# (Optional) Create .env file with your Gemini API key
echo "GEMINI_API_KEY=your_api_key_here" > .env
```

## Usage

> **Note:** Memory Bank MCP is intended to be run as an MCP server, not as a standalone app. You typically launch it as part of an MCP workflow, and connect to it from an MCP-compatible client (such as Claude Desktop or your own LLM agent).

### VS Code Development

For VS Code development, use the integrated tools:

```bash
# Open in VS Code with workspace file
code memoryBankMcpVSC.code-workspace

# Or open directory directly
code .

# Use VS Code tasks (Ctrl+Shift+P → "Tasks: Run Task")
# - build: Compile TypeScript
# - dev: Development mode with ts-node
# - start: Build and run MCP server
# - type-check: TypeScript validation
# - clean: Clean build artifacts

# Or use terminal
npm run dev
```

**VS Code Features:**
- **Workspace Configuration**: Pre-configured settings, tasks, and launch configs
- **TypeScript Debugging**: Full breakpoint support with F5
- **Integrated Terminal**: Run MCP server directly in VS Code
- **GitHub Copilot Integration**: AI-assisted development with chat
- **Auto-import and IntelliSense**: Smart code completion for MCP schemas
- **Task Runner**: Build, dev, and debug tasks integrated
- **Extension Recommendations**: Curated list of helpful VS Code extensions

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm run build
npm run start
```

### MCP Integration

To connect Memory Bank MCP to your MCP client, add the following to your `mcp.json` configuration:

```json
{
  "memoryBankVSC": {
    "command": "node",
    "args": ["/path/to/memoryBankMcpVSC/dist/index.js"],
    "env": {
      "GEMINI_API_KEY": "your_gemini_api_key_here"
    }
  }
}
```

Replace `/path/to/memoryBankMcpVSC/dist/index.js` with the absolute path to your built file, and add your Gemini API key if needed.

---

## MCP Tools Exposed by Memory Bank

Memory Bank MCP provides the following tools via the Model Context Protocol:

### `initialize_memory_bank`

Creates a new Memory Bank structure with all document templates.

**Parameters:**
- `goal` (string): Project goal description (min 10 characters)
- `geminiApiKey` (string, optional): Gemini API key for document generation
- `location` (string, optional): Absolute path where memory-bank folder will be created

**Example:**
```javascript
await callTool({
  name: "initialize_memory_bank",
  arguments: {
    goal: "Building a self-documenting AI-powered software development assistant",
    location: "/Users/username/Documents/projects/ai-assistant"
  }
});
```

### `update_document`

Updates a specific document in the Memory Bank.

**Parameters:**
- `documentType` (enum): One of: `projectbrief`, `productContext`, `systemPatterns`, `techContext`, `activeContext`, `progress`
- `content` (string, optional): New content for the document
- `regenerate` (boolean, default: false): Whether to regenerate the document using AI

**Example:**
```javascript
await callTool({
  name: "update_document",
  arguments: {
    documentType: "projectbrief",
    content: "# Project Brief\n\n## Purpose\nTo develop an advanced and user-friendly AI..."
  }
});
```

### `query_memory_bank`

Searches across all documents with context-aware relevance ranking.

**Parameters:**
- `query` (string): Search query (min 5 characters)

**Example:**
```javascript
await callTool({
  name: "query_memory_bank",
  arguments: {
    query: "system architecture components"
  }
});
```

### `create_vscode_instructions`

Creates VS Code specific development guidelines and GitHub Copilot instructions.

**Parameters:**
- `projectPurpose` (string): Detailed project purpose description (min 10 characters)
- `location` (string): Absolute path where .github/copilot-instructions.md will be created

**Example:**
```javascript
await callTool({
  name: "create_vscode_instructions",
  arguments: {
    projectPurpose: "Building a VS Code optimized AI-powered development assistant",
    location: "/Users/username/Documents/projects/ai-assistant"
  }
});
```

### `export_memory_bank`

Exports all Memory Bank documents.

**Parameters:**
- `format` (enum, default: "folder"): Export format, either "json" or "folder"
- `outputPath` (string, optional): Custom output path for the export

**Example:**
```javascript
await callTool({
  name: "export_memory_bank",
  arguments: {
    format: "json",
    outputPath: "/Users/username/Documents/exports"
  }
});
```

## Document Types

Memory Bank organizes project knowledge into six core document types:

1. **Project Brief** (`projectbrief.md`): Core document defining project objectives, scope, and vision
2. **Product Context** (`productContext.md`): Documents product functionality from a user perspective
3. **System Patterns** (`systemPatterns.md`): Establishes system architecture and component relationships
4. **Tech Context** (`techContext.md`): Specifies technology stack and implementation details
5. **Active Context** (`activeContext.md`): Tracks current tasks, open issues, and development focus
6. **Progress** (`progress.md`): Documents completed work, milestones, and project history

## License

MIT