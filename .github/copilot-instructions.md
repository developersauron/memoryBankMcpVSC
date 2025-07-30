# Memory Bank MCP Development Guide

## Architecture Overview

This is a **Model Context Protocol (MCP) server**, not a traditional web application. The entire architecture revolves around exposing tools and resources to LLM clients through the MCP protocol.

### Core Components

- **MCP Server** (`src/mcp/memoryBankMcp.ts`): Main server that exposes 5 tools via MCP protocol
- **Document Management** (`src/utils/fileManager.ts`): Handles Memory Bank filesystem operations
- **AI Integration** (`src/utils/gemini.ts`): Gemini API integration for content generation
- **Template System** (`src/templates/`): Markdown templates for structured documents

### VS Code Integration

This project is optimized for VS Code development with:
- TypeScript IntelliSense for MCP tool definitions
- Integrated terminal for running MCP server
- Built-in Git integration for document versioning
- Extension support for enhanced Markdown editing

### Document Architecture

Memory Bank uses a **6-document system** with strict hierarchical relationships:

1. `projectbrief.md` → Foundation document
2. `productContext.md` → User-focused requirements
3. `systemPatterns.md` → Architecture decisions
4. `techContext.md` → Technology implementation
5. `activeContext.md` → Current work tracking
6. `progress.md` → Historical record

Each document follows patterns defined in `.byterules` template.

## Development Patterns

### MCP Tool Implementation

All tools follow this pattern in `memoryBankMcp.ts`:

```typescript
server.tool(
  "tool_name",
  {
    parameter: z.string().describe("description"),
  },
  async ({ parameter }) => {
    try {
      // Tool logic here
      return { content: [{ type: "text", text: "success message" }] };
    } catch (error) {
      return {
        content: [{ type: "text", text: `❌ Error: ${error.message}` }],
        isError: true,
      };
    }
  }
);
```

### File Path Management

**Critical**: Always use absolute paths. The server manages a global `MEMORY_BANK_DIR` variable:

- Set during `initialize_memory_bank` tool execution
- Used by all subsequent operations
- Must be validated before any file operations

### Error Handling Strategy

1. **Tool Level**: Return structured error responses with `isError: true`
2. **Utility Level**: Throw detailed errors that tools can catch and format
3. **User Messages**: Always use English for consistency (note: some legacy Turkish exists)

### AI Content Generation

Uses Gemini API through `generateContent()` function:

- Always handle API key validation
- Implement fallbacks for missing dependencies
- Use structured prompts for consistent output

## Key Workflows

### Project Setup

```bash
npm install
npm run build
npm run start  # Starts MCP server on stdio
```

### Adding New MCP Tools

1. Add tool definition in `memoryBankMcp.ts`
2. Use Zod for parameter validation
3. Implement error handling pattern
4. Test with VS Code's integrated terminal or GitHub Copilot Chat
5. Use VS Code's TypeScript IntelliSense to verify tool schemas

### VS Code Development Workflow

1. Open project in VS Code with TypeScript extension
2. Use `Ctrl+Shift+P` → "TypeScript: Restart TS Server" after schema changes
3. Leverage VS Code's integrated terminal for npm commands
4. Use GitHub Copilot Chat to generate tool documentation
5. Utilize VS Code's built-in Git integration for version control

### Document Template Updates

1. Modify templates in `src/templates/`
2. Update `.byterules` if structure changes
3. Regenerate documents using `update_document` tool with `regenerate: true`

### VS Code Tasks and Debugging

Use VS Code's built-in task system:
- `Ctrl+Shift+P` → "Tasks: Run Task" → Select from available tasks
- **build**: Compile TypeScript to dist/
- **dev**: Run in development mode with ts-node
- **start**: Build and run the MCP server
- **F5**: Start debugging with breakpoints

## Integration Points

### External Dependencies

- **@modelcontextprotocol/sdk**: Core MCP server functionality
- **@google/generative-ai**: AI content generation
- **fs-extra**: Enhanced file system operations
- **zod**: Runtime type validation

### Environment Variables

- `GEMINI_API_KEY`: Required for AI features
- `VSCODE_WORKSPACE_FOLDER`: Auto-detected workspace path

### File System Layout

```
memory-bank/           # Created by initialize_memory_bank
├── copilot-instructions.md   # Document orchestration instructions.md
├── projectbrief.md   # Foundation document
├── productContext.md
├── systemPatterns.md
├── techContext.md
├── activeContext.md
└── progress.md
```

## Testing & Debugging

### VS Code Development Testing

Use VS Code's integrated tools for development:

1. **Integrated Terminal**: Run `npm run dev` directly in VS Code
2. **TypeScript Debugging**: Set breakpoints in `.ts` files
3. **GitHub Copilot Chat**: Ask questions about MCP tool implementation
4. **Output Panel**: Monitor console.log statements from MCP server
5. **Problems Panel**: View TypeScript compilation errors

### MCP Client Testing

For production testing, use external MCP clients:

1. Configure `mcp.json` with server path
2. Test each tool individually
3. Verify document generation and updates

### Common Issues

- **"Memory Bank not initialized"**: Run `initialize_memory_bank` first
- **Path errors**: Ensure all paths are absolute
- **API errors**: Verify `GEMINI_API_KEY` is set correctly

### Development Commands

- `npm run dev`: Development mode with ts-node
- `npm run build`: Compile TypeScript to dist/
- `npm run start`: Run compiled server

### VS Code Specific Commands

- `Ctrl+Shift+P` → "TypeScript: Restart TS Server": Refresh IntelliSense
- `Ctrl+`` `: Open integrated terminal
- `Ctrl+Shift+E`: Open Explorer panel
- `Ctrl+Shift+G`: Open Source Control panel
- `F5`: Start debugging (if launch.json configured)

## Code Style Notes

- Use ESM imports (`import`/`export`) throughout
- Prefer async/await over promises
- Always validate inputs with Zod schemas
- Include detailed console.log statements for debugging MCP interactions
- Use English for all user-facing messages and comments

### VS Code Extensions for Enhanced Development

- **TypeScript Importer**: Auto-import management
- **Error Lens**: Inline error display
- **GitLens**: Enhanced Git capabilities
- **Markdown All in One**: Better markdown editing
- **Thunder Client**: API testing within VS Code

## Critical Files to Understand

- `src/mcp/memoryBankMcp.ts`: Main MCP server logic and tool definitions
- `src/utils/fileManager.ts`: Document management and .byterules parsing
- `src/templates/.byterules`: Document structure and workflow rules
- `package.json`: ESM configuration and MCP-specific dependencies

---
*Memory Bank MCP - VS Code Edition*
*GitHub: https://github.com/developersauron/memoryBankMcpVSC*
