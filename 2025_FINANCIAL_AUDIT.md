# 2025 Financial Spreadsheet Audit & Analysis

**Audit Date:** January 31, 2026
**Data Sources:**
- Income 2025 & Cashflow 2025 Google Sheets
- Anand's 2025 W2 (Meta Platforms, Inc.)
- Anchita's 2025 W2 (Alameda Health System)
- Transactions.csv (2,641 transactions from 2025)

---

## Executive Summary

### Key Findings
1. **Tax Rate Assumption is Close**: The sheet uses 47%, actual combined withholding was 48.5%
2. **RSU Income Exceeded Projections**: Actual RSU income ~$75K higher than projected
3. **Base Salary Mismatch**: Minor differences between projected and actual base compensation
4. **Fun Money Tracking is Accurate**: Both Anand and Anchita's spending matches sheet exactly
5. **Investment Goals Exceeded**: $358K tracked investments + fixed 401k/Roth contributions

### Overall Assessment
The financial model is **well-structured and reasonably accurate**. The conservative income approach (50% stock valuation) provides appropriate buffer. Tax assumptions are slightly optimistic but within acceptable range.

---

## Part 1: Income 2025 Tab Analysis

### Anand's Income - Sheet vs W2 Comparison

| Item | Sheet Projection | W2 Actual | Variance |
|------|------------------|-----------|----------|
| **Base Salary (Annual)** | $275,689.00 | See note¹ | — |
| **401k Contribution** | $23,500.00 | $23,500.00 | ✅ Match |
| **Dependent Care FSA** | $2,500.00 | $2,499.90 | ✅ Match |
| **RSU Income** | $1,330,594.52 | $1,405,444.98 | +$74,850.46 |
| **Total W2 Wages (Box 1)** | ~$1,606,000² | $1,774,112.62 | +$168,000 |

¹ W2 Box 1 includes all taxable compensation; base salary cannot be directly extracted
² Estimated from sheet: Base ($275,689) + Bonus ($55,138) + RSU ($1,330,595) - 401k ($23,500) - FSA ($4,000)

#### RSU Analysis
The sheet projected 2,011 shares vesting across 4 quarters. W2 shows $1,405,444.98 in RSU income:
- **Projected RSU**: $1,330,594.52 (at projected prices)
- **Actual RSU**: $1,405,444.98
- **Difference**: +$74,850.46 (+5.6%)

This variance likely reflects:
- Higher stock prices at actual vest dates than projected
- Stock price used for projection: $591.24 (Dec 30, 2024 close)
- Actual vest prices may have been higher throughout 2025

#### Tax Withholding Analysis - Anand

| Tax Type | Amount Withheld |
|----------|-----------------|
| Federal Income Tax | $630,895.99 |
| CA State Income Tax | $196,648.81 |
| Social Security | $10,918.20 |
| Medicare | $40,223.80 |
| CA VDI | $3,000.00 |
| PFL | $9,365.57 |
| **Total Withheld** | **$891,052.37** |

**Effective Withholding Rate**: $891,052.37 ÷ $1,774,112.62 = **50.2%**

---

### Anchita's Income - Sheet vs W2 Comparison

| Item | Sheet Projection | W2 Actual | Variance |
|------|------------------|-----------|----------|
| **Base Salary (Annual)** | $286,286.00 | — | — |
| **W2 Box 1 Wages** | — | $229,162.97 | — |
| **Medicare Wages (Box 5)** | — | $266,709.24 | — |
| **401k Contribution** | $23,500.00 | $23,500.00 | ✅ Match |
| **Dependent Care FSA** | $2,500.00 | $2,500.16 | ✅ Match |
| **Pre-tax Pension** | — | $14,046.27 | Not in sheet |

#### Understanding Anchita's W2
- **Box 1 (Taxable Wages)**: $229,162.97
- **Box 5 (Medicare Wages)**: $266,709.24
- **Difference**: $37,546.27 (pre-tax deductions: 401k + pension + other)

The sheet shows $286,286 base salary, but Box 5 (Medicare wages) shows $266,709.24, suggesting:
- Either the base salary is slightly lower than projected
- Or there are ~$19,577 in additional pre-tax deductions not fully captured

**Box 14 - Other Compensation:**
- Pension: $14,046.27
- PRETAX DED: $840.06
- CA SDI: $3,200.51

#### Tax Withholding Analysis - Anchita

| Tax Type | Amount Withheld |
|----------|-----------------|
| Federal Income Tax | $46,533.31 |
| CA State Income Tax | $15,156.05 |
| Social Security | $10,918.20 |
| Medicare | $4,467.67 |
| CA SDI | $3,200.51 |
| **Total Withheld** | **$80,275.74** |

**Effective Withholding Rate**: $80,275.74 ÷ $229,162.97 = **35.0%**

---

### Combined Household Tax Analysis

| Metric | Sheet Assumption | W2 Actual |
|--------|------------------|-----------|
| **Tax Rate Used** | 47% | — |
| **Combined W2 Wages** | — | $2,003,275.59 |
| **Combined Withholding** | — | $971,328.11 |
| **Effective Rate** | — | **48.5%** |

**Finding**: The 47% assumption is **1.5 percentage points lower** than actual withholding. This means:
- Net income projections may be **~$30,000 too optimistic** ($2M × 1.5%)
- Consider updating to 48-49% for more conservative projections

---

### Anchita's Stock Section

The sheet shows two stock schedules:

**2024 Stocks (vesting in 2024):**
| Quarter | Shares | Value |
|---------|--------|-------|
| Feb | 842 | $35,571.66 |
| May | 1,107 | $46,786.06 |
| Aug | 1,107 | $46,786.06 |
| Nov | 1,107 | $46,786.06 |
| **Total** | **4,163** | **$175,929.84** |

**2025 Stocks:**
| Quarter | Shares | Value |
|---------|--------|-------|
| Feb | 1,107 | $46,786.06 |
| May | — | $0.00 |
| Aug | — | $0.00 |
| Nov | — | $0.00 |
| **Total** | **1,107** | **$46,786.06** |

**Note**: The "Per month" row shows **#REF!** error - needs formula fix.

---

## Part 2: Cashflow 2025 Tab Analysis

### Budget Model Overview

**Base Income for Budgeting:**
- Net Cash: $285,131.91/year ($23,760.99/month)
- Net Annual Conservative Income: $600,212.58/year ($50,017.71/month)

### Budget Allocation Analysis

| Category | Monthly Target | % of Income | Goal % | Status |
|----------|----------------|-------------|--------|--------|
| Fixed Costs + Needs | $25,008.86 | 50% | 50% | ✅ On target |
| Wants | $10,003.54 | 20% | 20% | ✅ On target |
| Investments | $10,003.54 | 20% | 20% | ✅ On target |
| Savings | $5,001.77 | 10% | 10% | ✅ On target |

**Monthly Average (Actual):**
| Category | Actual Monthly | Actual % | vs Goal |
|----------|----------------|----------|---------|
| Fixed Costs + Needs | $21,177.50 | 42.34% | -7.66% ✅ Under |
| Wants | $12,281.62 | 24.55% | +4.55% ⚠️ Over |
| Investments | $10,003.54 | 20.00% | ✅ On target |
| Savings | $6,555.05 | 13.11% | +3.11% ✅ Over |

**Observation**: Wants spending is 24.55% vs 20% goal - exceeding budget by $2,278/month.

---

### Bonus Money Allocation

The sheet tracks bonus income (income above conservative baseline) with this allocation:
- **75%** → Investments
- **20%** → Savings
- **5%** → Fun Money

| Source | Total Bonus | Investments (75%) | Savings (20%) | Fun Money (5%) |
|--------|-------------|-------------------|---------------|----------------|
| Feb Stock | $109,937.77 | $82,453.33 | $21,987.55 | $5,496.89 |
| Mar Cash Bonus | $32,355.59 | $24,266.69 | $6,471.12 | $1,617.78 |
| May Stock | $85,149.95 | $63,862.47 | $17,029.99 | $4,257.50 |
| Aug Stock | $120,302.75 | $90,227.06 | $24,060.55 | $6,015.14 |
| Nov Stock | $74,743.96 | $56,057.97 | $14,948.79 | $3,737.20 |
| **Total** | **$422,490.02** | **$316,867.51** | **$84,498.00** | **$21,124.50** |

---

### Fun Money Tracking - VALIDATED ✅

| Person | 2024 Leftover | 2025 Allocation | Total Available | 2025 Spent | Balance |
|--------|---------------|-----------------|-----------------|------------|---------|
| Anand | $5,504.26 | $10,562.25 | $16,066.51 | $1,596.43 | $14,470.08 |
| Anchita | $5,429.26 | $10,562.25 | $15,991.51 | $9,556.86 | $6,434.65 |

#### Cross-Reference with Transactions.csv

**Anand's 2025 Fun Money Transactions:**
| Date | Description | Amount |
|------|-------------|--------|
| 2025-06-23 | Hermes Of Paris, Inc | $1,096.43 |
| 2025-04-06 | Epifeast Inc. (posha) | $500.00 |
| **Total** | | **$1,596.43** |

✅ **MATCHES sheet exactly**

**Anchita's 2025 Fun Money Transactions:**
| Date | Description | Amount |
|------|-------------|--------|
| 2025-12-19 | Zipair F5pqc (Japan 26) | $1,179.41 |
| 2025-10-24 | Chanel.com | $215.96 |
| 2025-08-01 | DSW Inc | $718.43 |
| 2025-06-11 | Target | $736.45 |
| 2025-06-09 | Nordstrom Direct | $529.52 |
| 2025-06-06 | Nordstrom Direct | $672.77 |
| 2025-05-05 | Prada Livermore | $2,072.70 |
| 2025-04-06 | Epifeast Inc. (posha) | $1,105.88 |
| 2025-04-06 | Costco | $2,325.74 |
| **Total** | | **$9,556.86** |

✅ **MATCHES sheet exactly**

---

### Savings & Investments Summary

| Category | 2025 Amount | Balance/Notes |
|----------|-------------|---------------|
| **Savings Total** | $287,406.25 | Balance: $39,702.92 |
| **Investments Total** | $436,910.03 | — |

#### Major 2025 Savings Expenses
| Item | Amount |
|------|--------|
| Bathroom Remodel | $144,541.87 |
| Rivian | $103,161.46 |
| **Total** | **$247,703.33** |

#### Fixed Annual Investments
| Investment | Amount |
|------------|--------|
| Mega Backdoor Roth IRA | $34,500.00 |
| Backdoor Roth IRA | $14,000.00 |
| 529 Plan | $30,000.00 |
| **Total** | **$78,500.00** |

---

### Monthly Expense Budget Analysis

| Category | Budget | Notes |
|----------|--------|-------|
| Home | $7,948.33 | Fixed: $7,848.33 + one extra mortgage payment |
| Food & Dining | $1,800.00 | |
| Shopping | $1,600.00 | |
| Travel | $833.33 | |
| Auto & Transport | **#REF!** | ⚠️ Formula error |
| Bills & Utilities | $450.00 | |
| Health & Fitness | $250.00 | |
| Personal Care | $100.00 | |
| Business Services | $400.00 | |
| Pets | $50.00 | |
| Education | $0.00 | (Shows $116.67 in another column) |
| Kids | $3,000.00 | Fixed: $2,142.00 |
| Misc | $350.00 | |
| **Total** | **#REF!** | ⚠️ Formula error |
| **Annual Total** | **#REF!** | ⚠️ Formula error |

---

## Part 3: Data Discrepancies & Notes

### Car Payment Clarification

The recurring "Xfer To CVTDTXFR" transfer ($850.94/month) is the **Tesla Model X loan payment**, not related to the Rivian purchase (which was a one-time savings expense of $103,161.46).

### Data Discrepancies

| Issue | Sheet Value | Actual Value | Impact |
|-------|-------------|--------------|--------|
| Tax rate assumption | 47% | 48.5% | ~$30K/year optimism |
| RSU projection vs actual | $1.33M | $1.41M | $75K variance (favorable) |
| Anchita base salary | $286,286 | ~$267K (Medicare wages) | ~$19K unclear |

---

## Part 4: Improvement Recommendations

### Immediate Actions (Fix Now)

1. **Fix #REF! Errors**
   - Identify the missing cell reference (likely an Auto & Transport value)
   - Repair all 5 affected formulas
   - Test that totals calculate correctly

2. **Update Tax Rate**
   - Consider increasing from 47% to 48-49%
   - This provides more conservative projections
   - Or keep 47% but add a "tax variance buffer" line item

### Short-Term Improvements

3. **Stock Price Tracking**
   - Add a cell to manually update reference stock price
   - Currently using $591.24 (Dec 30, 2024)
   - Consider quarterly updates to improve projections

4. **Add W2 Validation Section**
   - Create a yearly comparison section
   - Input W2 actuals at year-end
   - Auto-calculate variances for continuous improvement

### For 2026 Planning

5. **Structural Improvements**
   - Add a "Projected vs Actual" comparison section
   - Include quarterly review checkpoints
   - Consider adding a "Variance Analysis" tab

6. **Stock Grant Updates**
   - Anchita's 2025 stocks show only Feb vest ($46,786)
   - Confirm if this is correct or if May/Aug/Nov grants are missing
   - New grant estimate shows 857 shares - add vesting schedule

7. **Fun Money Automation**
   - Consider linking Fun Money balance to Copilot Money export
   - Would require structured category naming

---

## Part 5: 2026 Preparation Checklist

### Income 2026 Tab Setup
- [ ] Update Anand's base salary (if changed)
- [ ] Update Anchita's base salary (if changed)
- [ ] Input 2026 RSU vesting schedule (shares per quarter)
- [ ] Update stock price reference
- [ ] Review 401k limits for 2026 ($23,500 → check if increased)
- [ ] Update FSA/Dependent Care limits if changed
- [ ] Carry forward any new grants

### Cashflow 2026 Tab Setup
- [ ] Roll forward Fun Money balances:
  - Anand: $14,470.08
  - Anchita: $6,434.65
- [ ] Update any changed budget categories
- [ ] Fix all #REF! errors before copying structure
- [ ] Update Dental Expenses if licensing years changed
- [ ] Review fixed monthly costs (mortgage, childcare, etc.)

### Tax Planning
- [ ] Consider 49% tax rate for more conservative estimates
- [ ] Review estimated tax payments strategy given high withholding
- [ ] Plan for any capital gains from stock sales

---

## Part 6: Investment Validation

### 2025 Investment Summary (from Transactions.csv)

| Source | Amount | Notes |
|--------|--------|-------|
| Vanguard Buy Investment | $283,000 | 5 transfers throughout year |
| 529 ScholarShare | $75,000 | 25 × $1,000 + 1 × $50,000 |
| **TOTAL Tracked** | **$358,000** | |

*Note: The $100,979 "Brokerage Transfer" was a Schwab→Fidelity checking transfer, not a new investment contribution.*

### Other Investments (Fixed Amounts, Not in Transactions)

| Investment | Annual Amount |
|------------|---------------|
| 401k (both) | $47,000 |
| Roth IRA contributions | Variable |
| Mega Backdoor Roth | $34,500 |

### Vanguard Transfer Details

| Date | Amount | Account |
|------|--------|---------|
| 2025-03-04 | $78,000 | Investor Checking |
| 2025-06-24 | $110,000 | Multiple accounts |
| 2025-08-21 | $70,000 | Investor Checking |
| 2025-12-08 | $25,000 | Cash Management |
| **Total** | **$283,000** | |

### 529 Plan Contributions

| Metric | Amount |
|--------|--------|
| Sheet target | $30,000/year |
| Actual 2025 | $75,000 |
| Breakdown | $50K lump sum + 25 × $1K monthly |
| Variance | **+$45,000** (intentional - maximizing contributions) |

### Investment Goal Assessment

✅ **Exceeded annual investment targets** - The $358K in tracked discretionary investments plus fixed contributions (401k, Roth) significantly exceeds the sheet's investment allocation goals.

---

## Appendix: W2 Data Reference

### Anand's 2025 W2 (Meta Platforms, Inc.)
| Box | Description | Amount |
|-----|-------------|--------|
| 1 | Wages, tips, other comp | $1,774,112.62 |
| 2 | Federal tax withheld | $630,895.99 |
| 3 | Social security wages | $176,100.00 |
| 4 | Social security tax | $10,918.20 |
| 5 | Medicare wages | $1,788,247.05 |
| 6 | Medicare tax | $40,223.80 |
| 10 | Dependent care benefits | $2,499.90 |
| 12a | Code C (GTL) | $869.93 |
| 12b | Code D (401k) | $23,500.00 |
| 12c | Code DD (Health) | $38,186.64 |
| 14 | RSU | $1,405,444.98 |
| 14 | CA VDI | $3,000.00 |
| 14 | PFL | $9,365.57 |
| 16 | State wages | $1,764,747.05 |
| 17 | State income tax | $196,648.81 |

### Anchita's 2025 W2 (Alameda Health System)
| Box | Description | Amount |
|-----|-------------|--------|
| 1 | Wages, tips, other comp | $229,162.97 |
| 2 | Federal tax withheld | $46,533.31 |
| 3 | Social security wages | $176,100.00 |
| 4 | Social security tax | $10,918.20 |
| 5 | Medicare wages | $266,709.24 |
| 6 | Medicare tax | $4,467.67 |
| 10 | Dependent care benefits | $2,500.16 |
| 12a | Code E (401k) | $23,500.00 |
| 14 | Pension | $14,046.27 |
| 14 | PRETAX DED | $840.06 |
| 14 | CA SDI | $3,200.51 |
| 16 | State wages | $229,162.97 |
| 17 | State income tax | $15,156.05 |

---

*Report generated: January 31, 2026*
