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

## Next Steps
See `IMPLEMENTATION_PLAN.md` for complete step-by-step guide
