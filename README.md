# Memory Bank MCP

<div align="center">
  <img src="https://github.com/tuncer-byte/byte/blob/main/media/icons/icon-white.png" height="128">
  <h1>Memory Bank MCP</h1>
  <p>
    <b>Structured project knowledge management for LLMs via Model Context Protocol (MCP)</b>
  </p>
</div>

---

> **Note:** This is not a traditional Node.js application. Memory Bank MCP is an **MCP server**—a component in the [Model Context Protocol](https://modelcontextprotocol.io/introduction) ecosystem. It exposes project knowledge to LLM-powered agents and tools using a standardized protocol, enabling seamless integration with AI clients (e.g., Claude Desktop, IDEs, or custom LLM agents).

---

## What is Model Context Protocol (MCP)?

MCP is an open protocol that standardizes how applications provide context to LLMs. Think of MCP like a USB-C port for AI: it provides a universal way to connect AI models to data sources and tools, both locally and remotely. MCP enables:

- **Plug-and-play integrations** between LLMs, data, and tools
- **Switching between LLM providers** with minimal friction
- **Secure, modular architecture** for building AI workflows

Learn more: [MCP Introduction](https://modelcontextprotocol.io/introduction)

## About Memory Bank MCP

Memory Bank MCP is an **MCP server** that helps teams create, manage, and access structured project documentation. It generates and maintains interconnected Markdown documents capturing all aspects of project knowledge, from high-level goals to technical details and daily progress. It is designed to be accessed by MCP-compatible clients and LLM agents.

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
git clone https://github.com/yourusername/memory-bank-mcp.git
cd memory-bank-mcp

# Install dependencies
npm install

# (Optional) Create .env file with your Gemini API key
echo "GEMINI_API_KEY=your_api_key_here" > .env
```

## Usage

> **Note:** Memory Bank MCP is intended to be run as an MCP server, not as a standalone app. You typically launch it as part of an MCP workflow, and connect to it from an MCP-compatible client (such as Claude Desktop or your own LLM agent).

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
  "memoryBank": {
    "command": "node",
    "args": ["/path/to/memory-bank-mcp/dist/index.js"],
    "env": {
      "GEMINI_API_KEY": "your_gemini_api_key_here"
    }
  }
}
```

Replace `/path/to/memory-bank-mcp/dist/index.js` with the absolute path to your built file, and add your Gemini API key if needed.

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