import { startServer } from './mcp/memoryBankMcp.js';

// Main function
async function main() {
  console.log('Starting Memory Bank MCP application...');
  
  try {
    // Start MCP server
    await startServer();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

// Start the application
main().catch(error => {
  console.error('Critical error:', error);
  process.exit(1);
}); 