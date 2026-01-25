# AI Finance Assistant - Session Context

## Goal
Build an AI-powered personal finance assistant that can answer questions about current finances.

## User's Current Setup

### 1. Copilot Money (https://app.copilot.money/)
- All accounts connected
- All transactions categorized
- Web accessible

### 2. Google Sheet - Cashflow Tab
- **Income projections**: Expected income for the year (based on current RSU pricing)
- **Budget categories with percentages**:
  - Fixed Costs (% of conservative income)
  - Wants (% of conservative income)
  - Savings (% of conservative income)

### 3. Conservative Income Model
- Uses "conservative income" as basis for all percentage calculations
- **Bonus money rules** (income above conservative threshold):
  - 70% goes to investments
  - Some amount to savings
  - Some amount to fun money

## Questions the System Should Answer
1. How are we doing on our budgets right now?
2. How much Fun Money do I have left? What about my Wife?
3. How much is our current savings?
4. How much can we afford to spend on vacations this year?

## User Requirements
- Wife should be able to use it easily (non-technical)
- Okay to start developer-oriented and evolve to be easier

## Research Complete

### Copilot Money
- **MCP Server exists**: [copilot-money-mcp](https://github.com/ignaciohermosillacornejo/copilot-money-mcp)
- 28 read-only tools, 100% local (reads macOS app cache)
- Also has CSV export via Settings

### Google Sheets
- Google's official MCP is Gemini-only
- **For Claude**: [google_workspace_mcp](https://github.com/taylorwilsdon/google_workspace_mcp)
- Requires OAuth setup via Google Cloud Console

## Chosen Architecture
**Claude Code CLI + Two MCP Servers** (no custom code needed)

## Implementation Issues & Resolutions

### Copilot Money MCP Transaction Amount Bugs (Jan 2026)

**Date Discovered**: Jan 19-20, 2026

**Issue**: The npm-published version (v1.1.0, released Jan 13, 2026) had 4 critical bugs causing incorrect financial data:

1. **PR #83** (Jan 16): 64-bit varint decoding bug - corrupts large negative amounts
   - Example: -$149 transaction shown as -$5
   - Root cause: JavaScript bitwise operators limited to 32-bit signed integers
   - Fix: Use BigInt for 64-bit Protocol Buffer varint decoding

2. **PR #85** (Jan 16): Inverted sign convention - 93% of spending miscategorized as "Uncategorized"
   - Root cause: Code had inverted positive/negative checks
   - Copilot uses: positive = expenses, negative = income
   - Fix: Corrected comparison operators

3. **PR #92** (Jan 18): Date filtering bug - category totals 2-4x inflated
   - Root cause: `get_categories` returned ALL-TIME data instead of filtering by period
   - Fix: Added date filtering parameters to category aggregation

4. **PR #84** (Jan 16): Category exclusion filtering not working
   - Root cause: Only checked transaction-level flag, not category-level
   - Fix: Check both transaction and category exclusion flags

**Impact**: Made budget calculations and spending analysis completely unreliable.

**Resolution**: Installed from GitHub main branch (has all fixes) until v1.2.0 is published to npm.

**Installation method**:
```bash
# Clone and build from source
cd /tmp
git clone https://github.com/ignaciohermosillacornejo/copilot-money-mcp.git
cd copilot-money-mcp
npm install
~/.bun/bin/bun build src/cli.ts --outdir dist --target node --format esm
chmod +x dist/cli.js
npm install -g .
```

**Status**: ✅ Fixed - All 4 bugs resolved, installed version has all fixes (Jan 20, 2026)

**Future**: Migrate to official npm release when v1.2.0+ is published.

## Completed Analysis (Jan 23, 2026)

### 2025 Spending Analysis - COMPLETE
Full analysis saved to `2025_SPENDING_ANALYSIS.md`

**Key Findings:**
- Total 2025 Spending: $413,892
- Credit Card Spending: $210,913
- Current Rewards: $5,899/year (2.80%)
- Optimal Rewards: $7,338/year (3.48%)
- **Rewards Left on Table: $1,439/year**

**Main Optimization**: Put flights on Amex Platinum instead of Sapphire Reserve (~$1,132/year gain)

### Card Quick Reference
```
Flights ................. Amex Platinum (5x)
Hotels (FHR) ............ Amex Platinum (5x + perks)
Hotels (other) .......... Sapphire Reserve (3x)
Dining .................. Sapphire Reserve (3x)
Travel/Uber ............. Sapphire Reserve (3x)
Gas ..................... Costco Visa (4%)
Amazon .................. Prime Visa (5%)
Costco .................. Costco Visa (2%)
Drugstores .............. Freedom Unlimited (3%)
Everything else ......... Freedom Unlimited (1.5%)
```

## Current Status

### Google Workspace MCP - OAuth Configured
- OAuth credentials added to `~/.claude.json`
- Restart Claude Code to load new credentials
- First use will prompt for browser authorization

## Next Steps

### After Restart:
1. Share your Cashflow Google Sheet URL
2. I'll read the sheet to understand your budget model
3. Cross-reference Copilot spending with Sheet budgets
4. Answer the 4 key questions:
   - How are we doing on budgets?
   - Fun money remaining (you & wife)?
   - Current savings?
   - Vacation budget available?

## Files Reference
- `2025_SPENDING_ANALYSIS.md` - Complete spending analysis & CC optimization
- `CLAUDE.md` - Project guidance for Claude Code
- `IMPLEMENTATION_PLAN.md` - Setup instructions
- `SESSION_CONTEXT.md` - This file
