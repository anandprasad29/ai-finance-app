# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI-powered personal finance assistant that answers questions about current finances by connecting Claude to existing data sources via MCP servers. This is a **configuration-only project** with no custom code - all functionality is provided through MCP server integrations.

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

### Data Sources

1. **Copilot Money** (https://app.copilot.money/)
   - All accounts connected
   - All transactions categorized
   - Accessed via `copilot-money-mcp` server (reads local macOS app cache)
   - 28 read-only tools available
   - 100% local, no network requests

2. **Google Sheet - Cashflow Tab**
   - Income projections based on RSU pricing
   - Budget categories with percentages (Fixed Costs, Wants, Savings)
   - Bonus money allocation rules
   - Accessed via `google_workspace_mcp` server

### Budget Model

- **Conservative income**: Baseline used for all percentage calculations
- **Budget categories**: Defined as percentages of conservative income
  - Fixed Costs (% of conservative income)
  - Wants (% of conservative income)
  - Savings (% of conservative income)
- **Bonus money rules** (income above conservative threshold):
  - 70% goes to investments
  - Remainder split between savings and fun money

## Key Queries to Answer

The system is designed to answer these four primary questions:

1. **Budget status**: "How are we doing on our budgets right now?"
   - Pull transactions from Copilot, categorize by budget type
   - Compare against percentages from Cashflow sheet

2. **Fun money tracking**: "How much Fun Money do I have left? What about my wife?"
   - Track personal discretionary spending from Copilot
   - Compare against monthly fun money allocation

3. **Current savings**: "How much is our current savings?"
   - Sum savings account balances from Copilot
   - Reference savings goals from sheet

4. **Vacation budget**: "How much can we afford to spend on vacations this year?"
   - Calculate remaining Wants budget
   - Factor in already-planned expenses

## MCP Server Configuration

MCP servers should be configured in `~/.claude.json` under the project-specific configuration at `projects["/Users/anandprasad/PetProjects/ai-finance-app"].mcpServers`.

### Copilot Money MCP

```json
"copilot-money": {
  "command": "copilot-money-mcp"
}
```

**Prerequisites**:
- Copilot Money macOS App Store version installed
- App synced with account data
- Database at `~/Library/Containers/money.copilot.production/Data/Library/Application Support/Firestore`

**Installation**: `npm install -g copilot-money-mcp`

**Repository**: https://github.com/ignaciohermosillacornejo/copilot-money-mcp

### Google Workspace MCP

```json
"google-workspace": {
  "command": "uvx",
  "args": ["workspace-mcp", "--tool-tier", "core"],
  "env": {
    "GOOGLE_OAUTH_CLIENT_ID": "your-client-id.apps.googleusercontent.com",
    "GOOGLE_OAUTH_CLIENT_SECRET": "your-client-secret",
    "OAUTHLIB_INSECURE_TRANSPORT": "1"
  }
}
```

**Prerequisites**:
- Google Cloud Project created
- Google Sheets API and Google Drive API enabled
- OAuth credentials created (Desktop app type)
- OAuth consent screen configured with test user

**Repository**: https://github.com/taylorwilsdon/google_workspace_mcp

**Note**: Do NOT use Google's official MCP (gemini-cli-extensions/workspace) as it only works with Gemini CLI, not Claude.

## Project Files

- `SESSION_CONTEXT.md`: Project goals, user setup, and research findings
- `IMPLEMENTATION_PLAN.md`: Complete step-by-step setup guide with troubleshooting
- `CLAUDE.md`: This file - guidance for Claude Code instances

## Troubleshooting

### Copilot Money MCP Issues
- Verify macOS App Store version (not direct download)
- Ensure app is synced (open app, check data loads)
- Check database path exists

### Google Workspace MCP Issues
- Verify APIs are enabled in Google Cloud Console
- Check OAuth consent screen has correct test user
- Ensure credentials match in config
- First authorization requires browser interaction

### MCP Server Not Available
- Check `~/.claude.json` project-specific configuration
- Restart Claude Code after config changes
- For Copilot Money: ensure `copilot-money-mcp` is globally installed
- For Google Workspace: ensure `uvx` is available

## Usage Guidelines

When answering finance queries:
1. Always cross-reference Copilot transaction data with Google Sheets budget rules
2. Calculate budget percentages based on conservative income from Sheets
3. Track fun money separately for user and wife
4. For bonus money, apply the 70/30 investment/other split rule
5. Category mappings from Copilot to budget categories should follow user's Cashflow sheet structure
