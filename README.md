# AI Finance Assistant

AI-powered personal finance assistant that answers questions about your finances by connecting Claude Code to your existing data sources via MCP servers.

## Overview

This is a **configuration-only project** that uses Claude Code CLI with two MCP servers:

- **Copilot Money MCP**: Access transaction data, budgets, and spending analytics
- **Google Workspace MCP**: Access budget rules and income projections from Google Sheets

No custom code required - all functionality comes from MCP server integrations.

## What It Can Answer

1. How are we doing on our budgets right now?
2. How much Fun Money do I have left? What about my wife?
3. How much is our current savings?
4. How much can we afford to spend on vacations this year?

## Setup

See [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) for complete step-by-step setup instructions.

### Quick Start

1. Install MCP servers:
   ```bash
   npm install -g copilot-money-mcp
   ```

2. Configure `~/.claude.json` with MCP servers (see IMPLEMENTATION_PLAN.md)

3. Set up Google Cloud OAuth credentials for Google Sheets access

4. Start asking questions with Claude Code!

## Documentation

- [CLAUDE.md](./CLAUDE.md) - Technical guidance for Claude Code instances
- [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) - Complete setup guide
- [SESSION_CONTEXT.md](./SESSION_CONTEXT.md) - Project goals and research

## Architecture

```
┌─────────────────────────────────────────────────────┐
│               Claude Code (CLI)                      │
└─────────────────┬───────────────────┬───────────────┘
                  │                   │
    ┌─────────────▼──────┐   ┌───────▼────────────────┐
    │  Copilot Money MCP │   │  Google Workspace MCP  │
    │                    │   │                        │
    │  - Transactions    │   │  - Cashflow Sheet      │
    │  - Budgets         │   │  - Income projections  │
    │  - Spending        │   │  - Budget percentages  │
    │  - Categories      │   │  - Bonus rules         │
    └────────────────────┘   └────────────────────────┘
```

## Requirements

- macOS (for Copilot Money app)
- Claude Code CLI
- Node.js (for copilot-money-mcp)
- Python with uvx (for google-workspace-mcp)
- Google Cloud account (for Sheets API access)

## License

MIT
