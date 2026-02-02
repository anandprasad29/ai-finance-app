/**
 * Format Financial Tracking Sheets
 *
 * Instructions:
 * 1. Open your Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Delete any existing code and paste this entire script
 * 4. Click Save (disk icon)
 * 5. Click Run > formatAllSheets
 * 6. Authorize when prompted (first time only)
 */

function formatAllSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  formatDashboard(ss);
  formatMonthlyTracker(ss);
  formatBonusLog(ss);
  formatCategoryMapping(ss);
  formatCashflow2026(ss);

  SpreadsheetApp.flush();
  Logger.log('All sheets formatted successfully!');
}

// Color palette
const COLORS = {
  darkBlue: '#1a73e8',
  lightBlue: '#e8f0fe',
  darkGray: '#5f6368',
  lightGray: '#f1f3f4',
  mediumGray: '#dadce0',
  white: '#ffffff',
  red: '#d93025',
  lightRed: '#fce8e6',
  green: '#1e8e3e',
  lightGreen: '#e6f4ea',
  yellow: '#fbbc04',
  lightYellow: '#fef7e0',
  purple: '#9334e6',
  lightPurple: '#f3e8fd',
  orange: '#fa903e',
  lightOrange: '#feefe3'
};

function formatDashboard(ss) {
  const sheet = ss.getSheetByName('Dashboard');
  if (!sheet) return;

  // Set column widths
  sheet.setColumnWidth(1, 180);
  sheet.setColumnWidths(2, 4, 120);

  // Title row
  const titleRange = sheet.getRange('A1:E1');
  titleRange.merge()
    .setFontSize(18)
    .setFontWeight('bold')
    .setFontColor(COLORS.darkBlue)
    .setVerticalAlignment('middle');
  sheet.setRowHeight(1, 40);

  // Last Updated row
  sheet.getRange('A2:E2').merge()
    .setFontStyle('italic')
    .setFontColor(COLORS.darkGray);

  // CURRENT MONTH STATUS section
  sheet.getRange('A4:E4').merge()
    .setBackground(COLORS.darkBlue)
    .setFontColor(COLORS.white)
    .setFontWeight('bold')
    .setFontSize(11);

  // Headers row
  sheet.getRange('A5:E5')
    .setBackground(COLORS.lightGray)
    .setFontWeight('bold')
    .setBorder(true, true, true, true, false, false, COLORS.mediumGray, SpreadsheetApp.BorderStyle.SOLID);

  // Data rows with alternating colors
  sheet.getRange('A6:E6').setBackground(COLORS.white);
  sheet.getRange('A7:E7').setBackground(COLORS.lightBlue);
  sheet.getRange('A8:E8').setBackground(COLORS.white);
  sheet.getRange('A9:E9').setBackground(COLORS.lightRed); // Travel over budget
  sheet.getRange('A10:E10')
    .setBackground(COLORS.lightGray)
    .setFontWeight('bold');

  // FUN MONEY section
  sheet.getRange('A12:D12').merge()
    .setBackground(COLORS.purple)
    .setFontColor(COLORS.white)
    .setFontWeight('bold');

  sheet.getRange('A13:D13')
    .setBackground(COLORS.lightGray)
    .setFontWeight('bold');

  sheet.getRange('A14:D15').setBackground(COLORS.lightPurple);

  // TRAVEL BUDGET section
  sheet.getRange('A17:D17').merge()
    .setBackground(COLORS.orange)
    .setFontColor(COLORS.white)
    .setFontWeight('bold');

  sheet.getRange('A18:D18')
    .setBackground(COLORS.lightGray)
    .setFontWeight('bold');

  sheet.getRange('A19:D19').setBackground(COLORS.lightOrange);

  // YTD SUMMARY section
  sheet.getRange('A21:F21').merge()
    .setBackground(COLORS.darkGray)
    .setFontColor(COLORS.white)
    .setFontWeight('bold');

  sheet.getRange('A22:F22')
    .setBackground(COLORS.lightGray)
    .setFontWeight('bold');

  // Alternating rows for YTD
  for (let i = 23; i <= 27; i++) {
    sheet.getRange(`A${i}:F${i}`).setBackground(i % 2 === 1 ? COLORS.white : COLORS.lightBlue);
  }
  sheet.getRange('A27:F27').setFontWeight('bold'); // Total row

  // Freeze header area
  sheet.setFrozenRows(5);
}

function formatMonthlyTracker(ss) {
  const sheet = ss.getSheetByName('Monthly Tracker');
  if (!sheet) return;

  // Set column widths
  sheet.setColumnWidth(1, 120);
  sheet.setColumnWidths(2, 10, 100);

  // Title
  sheet.getRange('A1:K1').merge()
    .setFontSize(16)
    .setFontWeight('bold')
    .setFontColor(COLORS.darkBlue);
  sheet.setRowHeight(1, 35);

  // Headers row
  sheet.getRange('A3:K3')
    .setBackground(COLORS.darkBlue)
    .setFontColor(COLORS.white)
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setBorder(true, true, true, true, true, true, COLORS.white, SpreadsheetApp.BorderStyle.SOLID);

  // Budget Target row
  sheet.getRange('A4:K4')
    .setBackground(COLORS.lightYellow)
    .setFontWeight('bold')
    .setFontStyle('italic');

  // Note row
  sheet.getRange('A5:K5').merge()
    .setFontSize(9)
    .setFontStyle('italic')
    .setFontColor(COLORS.darkGray)
    .setBackground(COLORS.lightGray);

  // Month rows with alternating colors
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'];

  for (let i = 0; i < 12; i++) {
    const rowNum = 6 + i;
    const range = sheet.getRange(`A${rowNum}:K${rowNum}`);
    range.setBackground(i % 2 === 0 ? COLORS.white : COLORS.lightBlue);

    // Bold the month name
    sheet.getRange(`A${rowNum}`).setFontWeight('bold');
  }

  // YTD Total row
  sheet.getRange('A18:K18')
    .setBackground(COLORS.lightGray)
    .setFontWeight('bold')
    .setBorder(true, false, false, false, false, false, COLORS.darkGray, SpreadsheetApp.BorderStyle.SOLID_MEDIUM);

  // Center align numeric columns
  sheet.getRange('B3:K18').setHorizontalAlignment('center');

  // Freeze headers
  sheet.setFrozenRows(5);
  sheet.setFrozenColumns(1);
}

function formatBonusLog(ss) {
  const sheet = ss.getSheetByName('Bonus Log');
  if (!sheet) return;

  // Set column widths
  sheet.setColumnWidth(1, 100);
  sheet.setColumnWidth(2, 180);
  sheet.setColumnWidths(3, 6, 130);
  sheet.setColumnWidth(9, 150);

  // Title
  sheet.getRange('A1:I1').merge()
    .setFontSize(16)
    .setFontWeight('bold')
    .setFontColor(COLORS.darkBlue);
  sheet.setRowHeight(1, 35);

  // Headers row
  sheet.getRange('A3:I3')
    .setBackground(COLORS.darkBlue)
    .setFontColor(COLORS.white)
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setWrap(true);
  sheet.setRowHeight(3, 40);

  // Data rows
  for (let i = 5; i <= 9; i++) {
    const range = sheet.getRange(`A${i}:I${i}`);
    range.setBackground((i - 5) % 2 === 0 ? COLORS.white : COLORS.lightBlue);

    // Style "Pending" notes
    const noteCell = sheet.getRange(`I${i}`);
    noteCell.setFontStyle('italic').setFontColor(COLORS.darkGray);
  }

  // Totals row
  sheet.getRange('A11:I11')
    .setBackground(COLORS.lightYellow)
    .setFontWeight('bold')
    .setBorder(true, false, true, false, false, false, COLORS.darkGray, SpreadsheetApp.BorderStyle.SOLID_MEDIUM);

  sheet.getRange('B11')
    .setFontSize(11)
    .setFontColor(COLORS.darkBlue);

  // Center align amounts
  sheet.getRange('C3:H11').setHorizontalAlignment('center');

  // Freeze header
  sheet.setFrozenRows(3);
}

function formatCategoryMapping(ss) {
  const sheet = ss.getSheetByName('Category Mapping');
  if (!sheet) return;

  // Set column widths
  sheet.setColumnWidth(1, 180);
  sheet.setColumnWidth(2, 120);
  sheet.setColumnWidth(3, 120);
  sheet.setColumnWidth(4, 250);

  // Headers row
  sheet.getRange('A1:D1')
    .setBackground(COLORS.darkBlue)
    .setFontColor(COLORS.white)
    .setFontWeight('bold');

  // FIXED COSTS section header
  sheet.getRange('A3:D3')
    .setBackground('#1565c0')  // Dark blue
    .setFontColor(COLORS.white)
    .setFontWeight('bold');

  // Fixed Costs items
  for (let i = 4; i <= 9; i++) {
    sheet.getRange(`A${i}:D${i}`).setBackground('#e3f2fd');  // Light blue
  }

  // NEEDS section header
  sheet.getRange('A12:D12')
    .setBackground('#2e7d32')  // Dark green
    .setFontColor(COLORS.white)
    .setFontWeight('bold');

  // Needs items
  for (let i = 13; i <= 19; i++) {
    sheet.getRange(`A${i}:D${i}`).setBackground('#e8f5e9');  // Light green
  }

  // WANTS section header
  sheet.getRange('A21:D21')
    .setBackground('#f57c00')  // Orange
    .setFontColor(COLORS.white)
    .setFontWeight('bold');

  // Wants items
  for (let i = 22; i <= 29; i++) {
    sheet.getRange(`A${i}:D${i}`).setBackground('#fff3e0');  // Light orange
  }

  // TRAVEL section header
  sheet.getRange('A31:D31')
    .setBackground('#7b1fa2')  // Purple
    .setFontColor(COLORS.white)
    .setFontWeight('bold');

  // Travel item
  sheet.getRange('A32:D32').setBackground('#f3e5f5');  // Light purple

  // FUN MONEY section header
  sheet.getRange('A34:D34')
    .setBackground('#c62828')  // Red
    .setFontColor(COLORS.white)
    .setFontWeight('bold');

  // Fun Money items
  sheet.getRange('A35:D36').setBackground('#ffebee');  // Light red

  // Freeze header
  sheet.setFrozenRows(1);
}

function formatCashflow2026(ss) {
  const sheet = ss.getSheetByName('Cashflow 2026');
  if (!sheet) return;

  // Income section headers
  sheet.getRange('A1:E1')
    .setBackground(COLORS.lightGray)
    .setFontWeight('bold');

  // Net cash and income rows
  sheet.getRange('A2:C2').setBackground(COLORS.lightGreen);
  sheet.getRange('A3:C3')
    .setBackground(COLORS.lightGreen)
    .setFontWeight('bold');
  sheet.getRange('A4:B4').setFontWeight('bold').setFontSize(12);

  // Budget section header
  sheet.getRange('A6:E6')
    .setBackground(COLORS.darkBlue)
    .setFontColor(COLORS.white)
    .setFontWeight('bold');

  // Budget rows with color coding
  sheet.getRange('A7:E7').setBackground('#e3f2fd');   // Fixed+Needs - blue
  sheet.getRange('A8:E8').setBackground('#fff3e0');   // Wants - orange
  sheet.getRange('A9:E9').setBackground('#e8f5e9');   // Investments - green
  sheet.getRange('A10:E10').setBackground('#fce4ec'); // Savings - pink

  // Goal Amount column bold
  sheet.getRange('D7:D10').setFontWeight('bold');

  // Bonus Income section
  sheet.getRange('A13:F13')
    .setBackground(COLORS.darkGray)
    .setFontColor(COLORS.white)
    .setFontWeight('bold');

  // Bonus allocation rows
  sheet.getRange('A15:H15')
    .setBackground(COLORS.lightGray)
    .setFontWeight('bold');

  for (let i = 16; i <= 19; i++) {
    sheet.getRange(`A${i}:H${i}`).setBackground(i % 2 === 0 ? COLORS.white : COLORS.lightBlue);
  }

  // Fun Money section
  sheet.getRange('A20:F20')
    .setBackground(COLORS.purple)
    .setFontColor(COLORS.white)
    .setFontWeight('bold');

  sheet.getRange('A21:F22').setBackground(COLORS.lightPurple);
}

// Run individual sheet formatting (for testing)
function formatDashboardOnly() {
  formatDashboard(SpreadsheetApp.getActiveSpreadsheet());
}

function formatMonthlyTrackerOnly() {
  formatMonthlyTracker(SpreadsheetApp.getActiveSpreadsheet());
}

function formatBonusLogOnly() {
  formatBonusLog(SpreadsheetApp.getActiveSpreadsheet());
}

function formatCategoryMappingOnly() {
  formatCategoryMapping(SpreadsheetApp.getActiveSpreadsheet());
}
