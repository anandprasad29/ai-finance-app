# AI Finance Assistant - Comprehensive Implementation Plan

## Project Goal
Build an AI-powered personal finance assistant that answers questions about current finances by connecting Claude to your existing data sources.

---

## Your Data Sources

### 1. Copilot Money (https://app.copilot.money/)
- All accounts connected
- All transactions categorized
- Web accessible + macOS app

### 2. Google Sheet - Cashflow Tab
- Income projections (based on current RSU pricing)
- Budget categories with percentages of conservative income:
  - Fixed Costs
  - Wants
  - Savings
- Bonus money rules (income above conservative threshold):
  - 70% to investments
  - Some to savings
  - Some to fun money

---

## Research Findings

### Copilot Money Data Access

**MCP Server Available**: [copilot-money-mcp](https://github.com/ignaciohermosillacornejo/copilot-money-mcp)

| Feature | Details |
|---------|---------|
| Tools | 28 read-only finance query tools |
| Data Access | Reads local LevelDB/Firestore cache |
| Privacy | 100% local - no network requests, no telemetry |
| Requirement | macOS App Store version with synced data |

**Available Tools Include:**
- Transactions (search, filter, export to CSV/JSON)
- Spending analysis by category/merchant
- Budget retrieval and analytics
- Goal tracking and progress
- Investment portfolio and performance
- Recurring transaction detection
- Account balances and activity

**Alternative**: Manual CSV export via Copilot Settings > Export
- Fields: Date, Name, Amount, Status, Category, Account, Notes, Recurrings

### Google Sheets Data Access

**Important**: Google's official Workspace MCP ([gemini-cli-extensions/workspace](https://github.com/gemini-cli-extensions/workspace)) only works with Gemini CLI, NOT Claude.

**For Claude, use**: [google_workspace_mcp](https://github.com/taylorwilsdon/google_workspace_mcp)

| Feature | Details |
|---------|---------|
| Maintainer | Community (taylorwilsdon) |
| Claude Compatible | Yes - designed for Claude Desktop/CLI |
| Sheets Features | Read/write cells, create spreadsheets |
| Other Features | Gmail, Calendar, Docs, Drive, Forms, Tasks |
| Auth | OAuth 2.0 via Google Cloud Console |

---

## Recommended Architecture

```
┌─────────────────────────────────────────────────────┐
│               Claude Code (CLI)                      │
│            Terminal / VS Code / Cursor               │
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

**Why This Approach:**
- No custom code needed - configuration only
- Both MCP servers are mature, tested, open source
- 100% local Copilot data (privacy preserved)
- Real-time access to both data sources
- Can later add Claude Desktop for wife's non-technical usage

---

## Implementation Steps

### Phase 1: Install Copilot Money MCP

**Prerequisites:**
- Copilot Money macOS App Store version installed
- App synced with your account data

**Steps:**

1. Install the MCP server globally:
```bash
npm install -g copilot-money-mcp
```

2. Add to Claude Code config. Create/edit `~/.claude.json`:
```json
{
  "mcpServers": {
    "copilot-money": {
      "command": "copilot-money-mcp"
    }
  }
}
```

3. Restart Claude Code

4. Test with:
```
"Show me my transactions from this month"
"What are my top spending categories?"
"Show my budget status"
```

### Phase 2: Set Up Google Workspace MCP

**Step 2.1: Create Google Cloud Project**

1. Go to https://console.cloud.google.com/
2. Create a new project (e.g., "Finance Assistant")
3. Note your project ID

**Step 2.2: Enable Required APIs**

1. Go to APIs & Services > Library
2. Search and enable:
   - Google Sheets API
   - Google Drive API

**Step 2.3: Create OAuth Credentials**

1. Go to APIs & Services > Credentials
2. Click "Create Credentials" > "OAuth client ID"
3. If prompted, configure OAuth consent screen:
   - User Type: External (or Internal if using Workspace)
   - App name: "Finance Assistant"
   - Add your email as test user
4. Application type: "Desktop app"
5. Download the JSON or note the Client ID and Client Secret

**Step 2.4: Configure MCP Server**

Add to `~/.claude.json`:
```json
{
  "mcpServers": {
    "copilot-money": {
      "command": "copilot-money-mcp"
    },
    "google-workspace": {
      "command": "uvx",
      "args": ["workspace-mcp", "--tool-tier", "core"],
      "env": {
        "GOOGLE_OAUTH_CLIENT_ID": "your-client-id.apps.googleusercontent.com",
        "GOOGLE_OAUTH_CLIENT_SECRET": "your-client-secret",
        "OAUTHLIB_INSECURE_TRANSPORT": "1"
      }
    }
  }
}
```

**Step 2.5: Authorize**

1. Restart Claude Code
2. First use will prompt OAuth flow in browser
3. Authorize access to your Google account

4. Test with:
```
"List my Google Sheets"
"Read my Cashflow spreadsheet"
```

### Phase 3: Create CLAUDE.md with Finance Rules

Create a `CLAUDE.md` file in your project directory with your specific finance rules:

```markdown
# Finance Assistant Context

## Budget Model
- Conservative income threshold: $X/month
- Fixed Costs: X% of conservative income
- Wants: X% of conservative income
- Savings: X% of conservative income

## Bonus Money Rules (income above conservative threshold)
- 70% to investments
- X% to savings
- X% to fun money

## Fun Money Tracking
- My fun money budget: $X/month
- Wife's fun money budget: $X/month

## Category Mappings
Map Copilot categories to budget categories:
- "Groceries" -> Fixed Costs
- "Restaurants" -> Wants
- "Entertainment" -> Wants
- [add your mappings]

## Key Questions to Answer
1. Budget status: Compare actual spending vs budget percentages
2. Fun money remaining: Track personal discretionary spending
3. Savings status: Sum savings accounts + recent contributions
4. Vacation budget: Calculate from remaining Wants allocation
```

### Phase 4: Test Key Queries

Verify the system can answer your four target questions:

1. **"How are we doing on our budgets right now?"**
   - Should pull transactions from Copilot, categorize by budget type
   - Compare against percentages from Cashflow sheet

2. **"How much Fun Money do I have left? What about my wife?"**
   - Should track personal discretionary spending from Copilot
   - Compare against monthly fun money allocation

3. **"How much is our current savings?"**
   - Should sum savings account balances from Copilot
   - May reference savings goals from sheet

4. **"How much can we afford to spend on vacations this year?"**
   - Should calculate remaining Wants budget
   - Factor in already-planned expenses

---

## Future Enhancements

### For Wife's Usage (Non-Technical)
Options to explore later:
- **Claude Desktop**: Has GUI, same MCP support
- **Web wrapper**: Build simple chat interface
- **Shortcuts/Aliases**: Create simple terminal aliases

---

## Troubleshooting

### Copilot Money MCP Issues
- Ensure macOS App Store version (not direct download)
- Verify app is synced (open app, check data loads)
- Check database path: `~/Library/Containers/money.copilot.production/Data/Library/Application Support/Firestore`

### Google Workspace MCP Issues
- Ensure APIs are enabled in Cloud Console
- Check OAuth consent screen has your email as test user
- Verify credentials are correct in config
- First auth requires browser interaction

---

## Source Links

| Resource | URL |
|----------|-----|
| Copilot Money MCP | https://github.com/ignaciohermosillacornejo/copilot-money-mcp |
| Copilot Export Docs | https://help.copilot.money/en/articles/5944414-exporting-your-transaction-data |
| Google Workspace MCP (Claude) | https://github.com/taylorwilsdon/google_workspace_mcp |
| Google MCP Overview | https://github.com/google/mcp |
| Google Official MCP (Gemini only) | https://github.com/gemini-cli-extensions/workspace |

---

## Quick Start Checklist

- [ ] Copilot Money macOS App Store version installed and synced
- [ ] `npm install -g copilot-money-mcp` completed
- [ ] Google Cloud Project created with Sheets/Drive APIs enabled
- [ ] OAuth credentials created (Desktop app type)
- [ ] `~/.claude.json` configured with both MCP servers
- [ ] Claude Code restarted
- [ ] Google OAuth flow completed
- [ ] Test queries working for both data sources
- [ ] CLAUDE.md created with your specific finance rules
- [ ] All 4 target questions answerable
