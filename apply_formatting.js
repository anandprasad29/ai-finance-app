/**
 * Apply Formatting to Google Sheets via API
 *
 * Uses service account credentials to apply visual formatting
 * to financial tracking tabs in the spreadsheet.
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Configuration
const CREDENTIALS_PATH = '/Users/anandprasad/Desktop/claude-code-sheet-485404-7d4e2c0abbfe.json';
const SPREADSHEET_ID = '18m9C9krRq1Bf39BVaXg4BngPk5V70hUEBfo2OHwcp1Q';

// Color palette (RGB values 0-1)
const COLORS = {
  darkBlue: { red: 0.102, green: 0.451, blue: 0.910 },      // #1a73e8
  lightBlue: { red: 0.910, green: 0.941, blue: 0.996 },     // #e8f0fe
  darkGray: { red: 0.373, green: 0.388, blue: 0.404 },      // #5f6368
  lightGray: { red: 0.945, green: 0.953, blue: 0.957 },     // #f1f3f4
  mediumGray: { red: 0.855, green: 0.867, blue: 0.875 },    // #dadce0
  white: { red: 1, green: 1, blue: 1 },                      // #ffffff
  red: { red: 0.851, green: 0.188, blue: 0.145 },           // #d93025
  lightRed: { red: 0.988, green: 0.910, blue: 0.902 },      // #fce8e6
  green: { red: 0.118, green: 0.557, blue: 0.243 },         // #1e8e3e
  lightGreen: { red: 0.902, green: 0.957, blue: 0.918 },    // #e6f4ea
  yellow: { red: 0.984, green: 0.737, blue: 0.016 },        // #fbbc04
  lightYellow: { red: 0.996, green: 0.969, blue: 0.878 },   // #fef7e0
  purple: { red: 0.576, green: 0.204, blue: 0.902 },        // #9334e6
  lightPurple: { red: 0.953, green: 0.910, blue: 0.992 },   // #f3e8fd
  orange: { red: 0.980, green: 0.565, blue: 0.243 },        // #fa903e
  lightOrange: { red: 0.996, green: 0.937, blue: 0.890 },   // #feefe3
  // Category mapping specific colors
  fixedBlue: { red: 0.082, green: 0.396, blue: 0.753 },     // #1565c0
  fixedBlueBg: { red: 0.890, green: 0.949, blue: 0.992 },   // #e3f2fd
  needsGreen: { red: 0.180, green: 0.490, blue: 0.196 },    // #2e7d32
  needsGreenBg: { red: 0.910, green: 0.961, blue: 0.914 },  // #e8f5e9
  wantsOrange: { red: 0.961, green: 0.486, blue: 0 },       // #f57c00
  wantsOrangeBg: { red: 1, green: 0.953, blue: 0.878 },     // #fff3e0
  travelPurple: { red: 0.482, green: 0.122, blue: 0.635 },  // #7b1fa2
  travelPurpleBg: { red: 0.953, green: 0.898, blue: 0.961 },// #f3e5f5
  funRed: { red: 0.776, green: 0.157, blue: 0.157 },        // #c62828
  funRedBg: { red: 1, green: 0.922, blue: 0.933 },          // #ffebee
  pinkBg: { red: 0.988, green: 0.894, blue: 0.925 },        // #fce4ec
};

// Sheet names to format
const SHEETS_TO_FORMAT = ['Dashboard', 'Monthly Tracker', 'Bonus Log', 'Category Mapping', 'Cashflow 2026'];

async function main() {
  try {
    // Load credentials
    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));

    // Create auth client
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Get spreadsheet metadata to find sheet IDs
    console.log('Fetching spreadsheet metadata...');
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
    });

    // Build map of sheet name to sheet ID
    const sheetMap = {};
    for (const sheet of spreadsheet.data.sheets) {
      sheetMap[sheet.properties.title] = sheet.properties.sheetId;
    }

    console.log('Found sheets:', Object.keys(sheetMap).filter(s => SHEETS_TO_FORMAT.includes(s)));

    // Build all formatting requests
    const requests = [];

    // Format each sheet
    if (sheetMap['Dashboard'] !== undefined) {
      console.log('Building Dashboard formatting...');
      requests.push(...buildDashboardFormatting(sheetMap['Dashboard']));
    }

    if (sheetMap['Monthly Tracker'] !== undefined) {
      console.log('Building Monthly Tracker formatting...');
      requests.push(...buildMonthlyTrackerFormatting(sheetMap['Monthly Tracker']));
    }

    if (sheetMap['Bonus Log'] !== undefined) {
      console.log('Building Bonus Log formatting...');
      requests.push(...buildBonusLogFormatting(sheetMap['Bonus Log']));
    }

    if (sheetMap['Category Mapping'] !== undefined) {
      console.log('Building Category Mapping formatting...');
      requests.push(...buildCategoryMappingFormatting(sheetMap['Category Mapping']));
    }

    if (sheetMap['Cashflow 2026'] !== undefined) {
      console.log('Building Cashflow 2026 formatting...');
      requests.push(...buildCashflow2026Formatting(sheetMap['Cashflow 2026']));
    }

    // Execute batch update
    if (requests.length > 0) {
      console.log(`Executing ${requests.length} formatting requests...`);
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: { requests },
      });
      console.log('Formatting applied successfully!');
    } else {
      console.log('No sheets found to format.');
    }

  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Details:', JSON.stringify(error.response.data, null, 2));
    }
    process.exit(1);
  }
}

// Helper to create a cell format request
function formatCells(sheetId, startRow, endRow, startCol, endCol, format) {
  return {
    repeatCell: {
      range: {
        sheetId,
        startRowIndex: startRow,
        endRowIndex: endRow,
        startColumnIndex: startCol,
        endColumnIndex: endCol,
      },
      cell: { userEnteredFormat: format },
      fields: `userEnteredFormat(${Object.keys(format).join(',')})`,
    },
  };
}

// Helper to merge cells
function mergeCells(sheetId, startRow, endRow, startCol, endCol) {
  return {
    mergeCells: {
      range: {
        sheetId,
        startRowIndex: startRow,
        endRowIndex: endRow,
        startColumnIndex: startCol,
        endColumnIndex: endCol,
      },
      mergeType: 'MERGE_ALL',
    },
  };
}

// Helper to set column width
function setColumnWidth(sheetId, startCol, endCol, width) {
  return {
    updateDimensionProperties: {
      range: {
        sheetId,
        dimension: 'COLUMNS',
        startIndex: startCol,
        endIndex: endCol,
      },
      properties: { pixelSize: width },
      fields: 'pixelSize',
    },
  };
}

// Helper to set row height
function setRowHeight(sheetId, startRow, endRow, height) {
  return {
    updateDimensionProperties: {
      range: {
        sheetId,
        dimension: 'ROWS',
        startIndex: startRow,
        endIndex: endRow,
      },
      properties: { pixelSize: height },
      fields: 'pixelSize',
    },
  };
}

// Helper to freeze rows/columns
function freezeRows(sheetId, numRows) {
  return {
    updateSheetProperties: {
      properties: {
        sheetId,
        gridProperties: { frozenRowCount: numRows },
      },
      fields: 'gridProperties.frozenRowCount',
    },
  };
}

function freezeColumns(sheetId, numCols) {
  return {
    updateSheetProperties: {
      properties: {
        sheetId,
        gridProperties: { frozenColumnCount: numCols },
      },
      fields: 'gridProperties.frozenColumnCount',
    },
  };
}

// Dashboard formatting
function buildDashboardFormatting(sheetId) {
  const requests = [];

  // Column widths
  requests.push(setColumnWidth(sheetId, 0, 1, 180));
  requests.push(setColumnWidth(sheetId, 1, 5, 120));

  // Row 1 - Title (bold, 18pt, dark blue text)
  requests.push(setRowHeight(sheetId, 0, 1, 40));
  requests.push(mergeCells(sheetId, 0, 1, 0, 5));
  requests.push(formatCells(sheetId, 0, 1, 0, 5, {
    textFormat: { bold: true, fontSize: 18, foregroundColor: COLORS.darkBlue },
    verticalAlignment: 'MIDDLE',
  }));

  // Row 2 - Last Updated (italic, gray)
  requests.push(mergeCells(sheetId, 1, 2, 0, 5));
  requests.push(formatCells(sheetId, 1, 2, 0, 5, {
    textFormat: { italic: true, foregroundColor: COLORS.darkGray },
  }));

  // Row 4 - CURRENT MONTH STATUS header (dark blue bg, white text)
  requests.push(mergeCells(sheetId, 3, 4, 0, 5));
  requests.push(formatCells(sheetId, 3, 4, 0, 5, {
    backgroundColor: COLORS.darkBlue,
    textFormat: { bold: true, fontSize: 11, foregroundColor: COLORS.white },
  }));

  // Row 5 - Column headers (light gray bg, bold)
  requests.push(formatCells(sheetId, 4, 5, 0, 5, {
    backgroundColor: COLORS.lightGray,
    textFormat: { bold: true },
  }));

  // Rows 6-10 - Data rows with alternating colors
  requests.push(formatCells(sheetId, 5, 6, 0, 5, { backgroundColor: COLORS.white }));
  requests.push(formatCells(sheetId, 6, 7, 0, 5, { backgroundColor: COLORS.lightBlue }));
  requests.push(formatCells(sheetId, 7, 8, 0, 5, { backgroundColor: COLORS.white }));
  requests.push(formatCells(sheetId, 8, 9, 0, 5, { backgroundColor: COLORS.lightRed }));  // Travel over budget
  requests.push(formatCells(sheetId, 9, 10, 0, 5, {
    backgroundColor: COLORS.lightGray,
    textFormat: { bold: true },
  }));

  // Row 12 - FUN MONEY section header (purple bg, white text)
  requests.push(mergeCells(sheetId, 11, 12, 0, 4));
  requests.push(formatCells(sheetId, 11, 12, 0, 4, {
    backgroundColor: COLORS.purple,
    textFormat: { bold: true, foregroundColor: COLORS.white },
  }));

  // Row 13 - Fun money headers
  requests.push(formatCells(sheetId, 12, 13, 0, 4, {
    backgroundColor: COLORS.lightGray,
    textFormat: { bold: true },
  }));

  // Rows 14-15 - Fun money data
  requests.push(formatCells(sheetId, 13, 15, 0, 4, { backgroundColor: COLORS.lightPurple }));

  // Row 17 - TRAVEL BUDGET section header (orange bg, white text)
  requests.push(mergeCells(sheetId, 16, 17, 0, 4));
  requests.push(formatCells(sheetId, 16, 17, 0, 4, {
    backgroundColor: COLORS.orange,
    textFormat: { bold: true, foregroundColor: COLORS.white },
  }));

  // Row 18 - Travel headers
  requests.push(formatCells(sheetId, 17, 18, 0, 4, {
    backgroundColor: COLORS.lightGray,
    textFormat: { bold: true },
  }));

  // Row 19 - Travel data
  requests.push(formatCells(sheetId, 18, 19, 0, 4, { backgroundColor: COLORS.lightOrange }));

  // Row 21 - YTD SUMMARY section header (dark gray bg, white text)
  requests.push(mergeCells(sheetId, 20, 21, 0, 6));
  requests.push(formatCells(sheetId, 20, 21, 0, 6, {
    backgroundColor: COLORS.darkGray,
    textFormat: { bold: true, foregroundColor: COLORS.white },
  }));

  // Row 22 - YTD headers
  requests.push(formatCells(sheetId, 21, 22, 0, 6, {
    backgroundColor: COLORS.lightGray,
    textFormat: { bold: true },
  }));

  // Rows 23-27 - YTD data with alternating colors
  for (let i = 22; i < 27; i++) {
    requests.push(formatCells(sheetId, i, i + 1, 0, 6, {
      backgroundColor: i % 2 === 0 ? COLORS.white : COLORS.lightBlue,
    }));
  }
  requests.push(formatCells(sheetId, 26, 27, 0, 6, { textFormat: { bold: true } }));  // Total row

  // Freeze header area
  requests.push(freezeRows(sheetId, 5));

  return requests;
}

// Monthly Tracker formatting
function buildMonthlyTrackerFormatting(sheetId) {
  const requests = [];

  // Column widths
  requests.push(setColumnWidth(sheetId, 0, 1, 120));
  requests.push(setColumnWidth(sheetId, 1, 11, 100));

  // Row 1 - Title
  requests.push(setRowHeight(sheetId, 0, 1, 35));
  requests.push(mergeCells(sheetId, 0, 1, 0, 11));
  requests.push(formatCells(sheetId, 0, 1, 0, 11, {
    textFormat: { bold: true, fontSize: 16, foregroundColor: COLORS.darkBlue },
  }));

  // Row 3 - Headers (dark blue bg, white text, center)
  requests.push(formatCells(sheetId, 2, 3, 0, 11, {
    backgroundColor: COLORS.darkBlue,
    textFormat: { bold: true, foregroundColor: COLORS.white },
    horizontalAlignment: 'CENTER',
  }));

  // Row 4 - Budget Target (light yellow bg, bold italic)
  requests.push(formatCells(sheetId, 3, 4, 0, 11, {
    backgroundColor: COLORS.lightYellow,
    textFormat: { bold: true, italic: true },
  }));

  // Row 5 - Note (9pt, italic, gray, light gray bg)
  requests.push(mergeCells(sheetId, 4, 5, 0, 11));
  requests.push(formatCells(sheetId, 4, 5, 0, 11, {
    backgroundColor: COLORS.lightGray,
    textFormat: { fontSize: 9, italic: true, foregroundColor: COLORS.darkGray },
  }));

  // Rows 6-17 - Month rows with alternating colors
  for (let i = 0; i < 12; i++) {
    const rowNum = 5 + i;
    requests.push(formatCells(sheetId, rowNum, rowNum + 1, 0, 11, {
      backgroundColor: i % 2 === 0 ? COLORS.white : COLORS.lightBlue,
    }));
    // Bold month names
    requests.push(formatCells(sheetId, rowNum, rowNum + 1, 0, 1, {
      textFormat: { bold: true },
    }));
  }

  // Row 18 - YTD Total (light gray bg, bold, top border)
  requests.push(formatCells(sheetId, 17, 18, 0, 11, {
    backgroundColor: COLORS.lightGray,
    textFormat: { bold: true },
  }));

  // Center align numeric columns
  requests.push(formatCells(sheetId, 2, 18, 1, 11, {
    horizontalAlignment: 'CENTER',
  }));

  // Freeze headers (only rows, not columns due to merged title cell)
  requests.push(freezeRows(sheetId, 5));

  return requests;
}

// Bonus Log formatting
function buildBonusLogFormatting(sheetId) {
  const requests = [];

  // Column widths
  requests.push(setColumnWidth(sheetId, 0, 1, 100));
  requests.push(setColumnWidth(sheetId, 1, 2, 180));
  requests.push(setColumnWidth(sheetId, 2, 8, 130));
  requests.push(setColumnWidth(sheetId, 8, 9, 150));

  // Row 1 - Title
  requests.push(setRowHeight(sheetId, 0, 1, 35));
  requests.push(mergeCells(sheetId, 0, 1, 0, 9));
  requests.push(formatCells(sheetId, 0, 1, 0, 9, {
    textFormat: { bold: true, fontSize: 16, foregroundColor: COLORS.darkBlue },
  }));

  // Row 3 - Headers (dark blue bg, white text, center, wrap)
  requests.push(setRowHeight(sheetId, 2, 3, 40));
  requests.push(formatCells(sheetId, 2, 3, 0, 9, {
    backgroundColor: COLORS.darkBlue,
    textFormat: { bold: true, foregroundColor: COLORS.white },
    horizontalAlignment: 'CENTER',
    wrapStrategy: 'WRAP',
  }));

  // Rows 5-9 - Data rows with alternating colors
  for (let i = 4; i < 9; i++) {
    requests.push(formatCells(sheetId, i, i + 1, 0, 9, {
      backgroundColor: (i - 4) % 2 === 0 ? COLORS.white : COLORS.lightBlue,
    }));
    // Style "Pending" notes column
    requests.push(formatCells(sheetId, i, i + 1, 8, 9, {
      textFormat: { italic: true, foregroundColor: COLORS.darkGray },
    }));
  }

  // Row 11 - Totals (light yellow bg, bold)
  requests.push(formatCells(sheetId, 10, 11, 0, 9, {
    backgroundColor: COLORS.lightYellow,
    textFormat: { bold: true },
  }));
  requests.push(formatCells(sheetId, 10, 11, 1, 2, {
    textFormat: { bold: true, fontSize: 11, foregroundColor: COLORS.darkBlue },
  }));

  // Center align amounts
  requests.push(formatCells(sheetId, 2, 11, 2, 8, {
    horizontalAlignment: 'CENTER',
  }));

  // Freeze header
  requests.push(freezeRows(sheetId, 3));

  return requests;
}

// Category Mapping formatting
function buildCategoryMappingFormatting(sheetId) {
  const requests = [];

  // Column widths
  requests.push(setColumnWidth(sheetId, 0, 1, 180));
  requests.push(setColumnWidth(sheetId, 1, 2, 120));
  requests.push(setColumnWidth(sheetId, 2, 3, 120));
  requests.push(setColumnWidth(sheetId, 3, 4, 250));

  // Row 1 - Headers (dark blue bg, white text, bold)
  requests.push(formatCells(sheetId, 0, 1, 0, 4, {
    backgroundColor: COLORS.darkBlue,
    textFormat: { bold: true, foregroundColor: COLORS.white },
  }));

  // FIXED COSTS section header (row 3)
  requests.push(formatCells(sheetId, 2, 3, 0, 4, {
    backgroundColor: COLORS.fixedBlue,
    textFormat: { bold: true, foregroundColor: COLORS.white },
  }));

  // Fixed Costs items (rows 4-9)
  requests.push(formatCells(sheetId, 3, 9, 0, 4, { backgroundColor: COLORS.fixedBlueBg }));

  // NEEDS section header (row 12)
  requests.push(formatCells(sheetId, 11, 12, 0, 4, {
    backgroundColor: COLORS.needsGreen,
    textFormat: { bold: true, foregroundColor: COLORS.white },
  }));

  // Needs items (rows 13-19)
  requests.push(formatCells(sheetId, 12, 19, 0, 4, { backgroundColor: COLORS.needsGreenBg }));

  // WANTS section header (row 21)
  requests.push(formatCells(sheetId, 20, 21, 0, 4, {
    backgroundColor: COLORS.wantsOrange,
    textFormat: { bold: true, foregroundColor: COLORS.white },
  }));

  // Wants items (rows 22-29)
  requests.push(formatCells(sheetId, 21, 29, 0, 4, { backgroundColor: COLORS.wantsOrangeBg }));

  // TRAVEL section header (row 31)
  requests.push(formatCells(sheetId, 30, 31, 0, 4, {
    backgroundColor: COLORS.travelPurple,
    textFormat: { bold: true, foregroundColor: COLORS.white },
  }));

  // Travel item (row 32)
  requests.push(formatCells(sheetId, 31, 32, 0, 4, { backgroundColor: COLORS.travelPurpleBg }));

  // FUN MONEY section header (row 34)
  requests.push(formatCells(sheetId, 33, 34, 0, 4, {
    backgroundColor: COLORS.funRed,
    textFormat: { bold: true, foregroundColor: COLORS.white },
  }));

  // Fun Money items (rows 35-36)
  requests.push(formatCells(sheetId, 34, 36, 0, 4, { backgroundColor: COLORS.funRedBg }));

  // Freeze header
  requests.push(freezeRows(sheetId, 1));

  return requests;
}

// Cashflow 2026 formatting
function buildCashflow2026Formatting(sheetId) {
  const requests = [];

  // Row 1 - Headers (light gray bg, bold)
  requests.push(formatCells(sheetId, 0, 1, 0, 5, {
    backgroundColor: COLORS.lightGray,
    textFormat: { bold: true },
  }));

  // Rows 2-3 - Income rows (light green bg)
  requests.push(formatCells(sheetId, 1, 2, 0, 3, { backgroundColor: COLORS.lightGreen }));
  requests.push(formatCells(sheetId, 2, 3, 0, 3, {
    backgroundColor: COLORS.lightGreen,
    textFormat: { bold: true },
  }));

  // Row 4 - Conservative income (bold, 12pt)
  requests.push(formatCells(sheetId, 3, 4, 0, 2, {
    textFormat: { bold: true, fontSize: 12 },
  }));

  // Row 6 - Budget section header (dark blue bg, white text, bold)
  requests.push(formatCells(sheetId, 5, 6, 0, 5, {
    backgroundColor: COLORS.darkBlue,
    textFormat: { bold: true, foregroundColor: COLORS.white },
  }));

  // Budget rows with color coding (rows 7-10)
  requests.push(formatCells(sheetId, 6, 7, 0, 5, { backgroundColor: COLORS.fixedBlueBg }));   // Fixed+Needs
  requests.push(formatCells(sheetId, 7, 8, 0, 5, { backgroundColor: COLORS.wantsOrangeBg })); // Wants
  requests.push(formatCells(sheetId, 8, 9, 0, 5, { backgroundColor: COLORS.needsGreenBg }));  // Investments
  requests.push(formatCells(sheetId, 9, 10, 0, 5, { backgroundColor: COLORS.pinkBg }));       // Savings

  // Goal Amount column bold (D7:D10)
  requests.push(formatCells(sheetId, 6, 10, 3, 4, { textFormat: { bold: true } }));

  // Row 13 - Bonus Income section header (dark gray bg, white text, bold)
  requests.push(formatCells(sheetId, 12, 13, 0, 6, {
    backgroundColor: COLORS.darkGray,
    textFormat: { bold: true, foregroundColor: COLORS.white },
  }));

  // Row 15 - Bonus allocation headers (light gray bg, bold)
  requests.push(formatCells(sheetId, 14, 15, 0, 8, {
    backgroundColor: COLORS.lightGray,
    textFormat: { bold: true },
  }));

  // Rows 16-19 - Bonus allocation data with alternating colors
  for (let i = 15; i < 19; i++) {
    requests.push(formatCells(sheetId, i, i + 1, 0, 8, {
      backgroundColor: i % 2 === 1 ? COLORS.white : COLORS.lightBlue,
    }));
  }

  // Row 20 - Fun Money section header (purple bg, white text, bold)
  requests.push(formatCells(sheetId, 19, 20, 0, 6, {
    backgroundColor: COLORS.purple,
    textFormat: { bold: true, foregroundColor: COLORS.white },
  }));

  // Rows 21-22 - Fun Money data (light purple bg)
  requests.push(formatCells(sheetId, 20, 22, 0, 6, { backgroundColor: COLORS.lightPurple }));

  return requests;
}

// Run the script
main();
