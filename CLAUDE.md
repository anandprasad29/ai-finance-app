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

2. **Transactions.csv** (exported from Copilot Money)
   - Complete transaction history export
   - Use as primary source for historical analysis (MCP cache may be incomplete)
   - Columns: date, name, amount, status, category, parent category, excluded, tags, type, account, account mask, note, recurring
   - Located in project root: `Transactions.csv`

3. **Google Sheet - Cashflow Tab**
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
- [Bun](https://bun.sh) runtime for building (install with: `curl -fsSL https://bun.sh/install | bash`)

**Installation**: Install from GitHub main branch (has critical bug fixes):

```bash
# Clone and build from GitHub
cd /tmp
git clone https://github.com/ignaciohermosillacornejo/copilot-money-mcp.git
cd copilot-money-mcp
npm install
~/.bun/bin/bun build src/cli.ts --outdir dist --target node --format esm
chmod +x dist/cli.js

# Install globally
npm install -g .
```

**Important**: Do NOT use `npm install -g copilot-money-mcp` (gets v1.1.0 which has critical bugs). Install from GitHub main until v1.2.0+ is officially released.

**Version requirement**: Must have fixes from PR #83, #84, #85, #92 (post-Jan 18, 2026)

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
- `Transactions.csv`: Complete transaction export from Copilot Money (primary data source for analysis)
- `2025_SPENDING_ANALYSIS.md`: Annual spending analysis and credit card optimization report

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

## Copilot Money MCP Usage

### Key Tools

| Tool | Purpose |
|------|---------|
| `get_transactions` | Query transactions with filters (period, category, merchant, amount, etc.) |
| `get_accounts` | List all accounts with balances |
| `get_categories` | Get spending by category for a period |
| `get_recurring_transactions` | Identify subscriptions and recurring charges |
| `get_budgets` | Retrieve user-defined budget limits |
| `get_goals` | Get savings/investment goals |
| `refresh_database` | Reload cache if data seems stale |

### Important Parameters

When querying transactions:
- **Always set `exclude_excluded: false`** to include all transactions (even those marked excluded in Copilot)
- Use `period` shortcuts: `this_month`, `last_month`, `last_30_days`, `last_90_days`, `ytd`, `this_year`, `last_year`
- Or use `start_date`/`end_date` in YYYY-MM-DD format

### Data Source Priority

1. **For historical/annual analysis**: Use `Transactions.csv` as primary source (complete data)
2. **For current/recent queries**: Use MCP tools (real-time but may have sync gaps)
3. **Cross-validate**: When accuracy matters, compare MCP results against CSV export
