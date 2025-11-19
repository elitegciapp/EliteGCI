# GCI Calculator Design Guidelines

## Design Approach
**System-Based Approach**: Material Design principles adapted for professional real estate tools
- Focus on clarity, hierarchy, and efficient data entry/display
- Card-based organization for distinct calculation modules
- Clear visual feedback for all interactive elements

## Typography Hierarchy

**Primary Headings** (Page Title, Section Headers)
- Font: Inter or DM Sans
- Weight: 700 (Bold)
- Size: Desktop 2xl-3xl, Mobile xl-2xl

**Secondary Headings** (Card Titles, Result Labels)
- Weight: 600 (Semibold)  
- Size: Desktop lg-xl, Mobile base-lg

**Body Text** (Form Labels, Descriptions)
- Weight: 500 (Medium)
- Size: Desktop sm-base, Mobile sm

**Data Display** (Calculation Results, Numbers)
- Weight: 700 (Bold) for large values, 600 for labels
- Size: Desktop 3xl-4xl for primary results, xl-2xl for secondary
- Tabular figures preferred for number alignment

## Layout System

**Spacing Primitives**: Use Tailwind units 2, 4, 6, 8, 12, 16
- Component padding: p-6 to p-8
- Section gaps: gap-6 to gap-8
- Form field spacing: space-y-4
- Card margins: m-4 to m-6

**Container Structure**
- Max width: max-w-7xl
- Two-column desktop layout for main calculator + secondary panels
- Single column mobile (stack vertically)

**Grid System**
- Quick Fill buttons: 2x2 grid on desktop, 2x2 on mobile
- Market Analysis: 4-column grid on desktop, 2-column on tablet, 1-column on mobile
- Form fields: Single column within cards for clarity

## Component Library

### Input Fields
- All inputs use consistent height (h-12)
- Clear labels above each field
- Prefix indicators for currency ($) and percentage (%)
- Number inputs with appropriate step values
- Subtle borders with focus states

### Cards/Panels
- Rounded corners (rounded-lg to rounded-xl)
- Elevation: Subtle shadow (shadow-md)
- Padding: p-6 to p-8
- Distinct sections for Transaction Details, Commission Breakdown, Income Goals, Market Analysis

### Buttons

**Quick Fill Presets**
- Pill-shaped buttons (rounded-full)
- Medium size (px-6 py-3)
- Display both price and commission rate
- 2x2 grid layout with gap-3

**Primary Actions**
- Standard rounded (rounded-lg)
- Medium-large size (px-8 py-3)
- Clear Call-to-action text

**Secondary Actions** (Clear All)
- Outlined style
- Same sizing as primary
- Positioned at top-right of form section

### Data Display Components

**Result Cards**
- Large, prominent number display
- Label beneath in smaller text
- Icon or prefix indicator where relevant
- Organized in grid (2-3 columns desktop, 1-2 mobile)

**Breakdown Lists**
- Line items with label-value pairs
- Right-aligned values
- Subtle dividers between items
- Progressive disclosure for detailed breakdowns

**Tax Slider**
- Range input (0-50%)
- Current value display above slider
- Visual feedback of percentage
- Calculated tax amount displayed prominently

### Market Analysis Table
- Monthly deal scenarios (1-4 deals/month)
- Projected annual income for each
- Clean table structure with headers
- Responsive cards on mobile

## Interaction Patterns

**Form Auto-calculation**
- Real-time updates as user types
- Debounced calculations (300ms)
- Smooth transitions for result changes

**Quick Fill Behavior**
- Single click populates Sale Price and Commission Rate
- Visual feedback on selection
- Does not override user-entered split/fees

**Clear Functionality**
- Resets Transaction Details only
- Maintains Income Goal settings
- Confirmation not required (low risk)

## Accessibility
- All inputs have visible labels (no placeholder-only)
- Sufficient contrast for all text
- Focus indicators on all interactive elements
- Keyboard navigation fully supported
- ARIA labels for calculated results
- Error states with descriptive messages

## Responsive Behavior

**Desktop (lg+)**
- Two-column layout: Calculator left, Analysis/Goals right
- Quick Fill buttons in 2x2 grid
- Commission breakdown in 3-column grid
- Market analysis table format

**Tablet (md)**
- Single column with wider cards
- Quick Fill maintains 2x2 grid
- Commission breakdown 2-column grid
- Stacked sections with clear hierarchy

**Mobile (base)**
- Full-width single column
- Quick Fill buttons 2x2, smaller text
- Commission breakdown single column
- Market analysis converts to cards
- Sticky Calculate/Clear buttons at bottom

## Key Visual Principles
- **Clarity over decoration**: Minimal visual noise
- **Scannable hierarchy**: Clear result emphasis
- **Professional tone**: Business tool aesthetic
- **Data confidence**: Bold numbers, clear labels
- **Efficient workflow**: Minimal clicks to results