# EliteGCI - Real Estate Commission Planning Tool

## Overview

EliteGCI is a comprehensive web-based tool designed for real estate agents to calculate commission income, track historical data, plan taxes, and export reports. The application helps agents understand their take-home pay after various fees and splits, visualize trends, and manage their financial planning.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript
- Single-page application (SPA) using Wouter for client-side routing
- Component-based architecture with shadcn/ui component library
- Vite as the build tool and development server

**State Management**:
- React hooks for local component state
- TanStack Query (React Query) for server state management and API data caching
- No global state management library needed due to simple data flow

**Styling Approach**:
- Tailwind CSS for utility-first styling
- Custom design system following Material Design principles adapted for real estate tools
- Card-based UI organization for distinct calculation modules
- Inter font family for typography
- CSS custom properties for theming (light mode only)

**Key UI Patterns**:
- Form inputs for transaction details and financial parameters
- Real-time calculation results displayed in cards
- Quick-fill presets for common transaction scenarios
- Interactive sliders for tax estimation
- Responsive grid layouts (desktop: multi-column, mobile: single-column stack)

### Backend Architecture

**Server Framework**: Express.js with TypeScript
- RESTful API design
- Middleware-based request/response handling
- Development mode with Vite integration for HMR
- Production mode serves static built assets

**API Structure**:
- `/api/gci-entries` - POST endpoint to create new GCI entries (requires leadSource)
- `/api/gci-entries` - GET endpoint to retrieve all GCI entries
- `/api/gci-entries/:id` - PUT endpoint to update existing entries (leadSource optional)
- `/api/gci-entries/:id` - DELETE endpoint to delete entries
- `/api/send-report` - POST endpoint to send email reports (requires email service integration)

**Data Layer**:
- PostgreSQL database via Replit (persistent storage)
- Interface-based design (`IStorage`) with `DatabaseStorage` implementation
- UUID-based entity identification using crypto.randomUUID()

**Database Schema** (PostgreSQL via Drizzle ORM):
- `gci_entries` table: All transaction details with exact decimal precision
  - Monetary fields use `numeric(18,2)` for exact decimal precision (no floating-point rounding)
  - Fields: id, salePrice, commissionRate, yourSplit, coordinatorFee, brokerageFee, referralFee, totalCommission, yourTakeHome, taxRate, taxAmount, leadSource, createdAt
  - Lead sources: SOI, FSBO, Expired, Open House, Farming, Sign Calls, Ad Calls, Internal Referral, Referral, Direct Mail, Social Media, Agent Referral, Zillow, Homelight, OpCity, Realtor.com, Other
  - **Lead source is required for new entries** but optional when editing existing entries (to support legacy data)
- Schema validation using Zod and drizzle-zod integration
  - `insertGCIEntrySchema` - For creating new entries (leadSource required)
  - `updateGCIEntrySchema` - For updating existing entries (leadSource optional)
- Database migrations managed via drizzle-kit

**Design Decision**: The application uses PostgreSQL for data persistence across server restarts and republishing. All monetary values use `numeric(18,2)` to avoid floating-point precision issues.

### External Dependencies

**UI Component Library**:
- Radix UI primitives for accessible, unstyled components
- shadcn/ui as the component system built on Radix UI
- Lucide React for icons

**Data Validation**:
- Zod for runtime type validation and schema definition
- React Hook Form with @hookform/resolvers for form validation

**Date Handling**:
- date-fns for date formatting and manipulation

**Database (Active)**:
- Drizzle ORM for type-safe database operations
- @neondatabase/serverless for PostgreSQL connection
- drizzle-kit for schema migrations
- Connection configured via DATABASE_URL environment variable
- PostgreSQL database provided by Replit

**Development Tools**:
- Replit-specific plugins for development environment integration
- TypeScript for static type checking
- ESBuild for server-side bundling

**Design Rationale**:
The architecture prioritizes developer experience and type safety while maintaining data persistence. The separation between storage interface and implementation allows easy migration between storage backends. The use of modern React patterns (hooks, Query) and TypeScript ensures maintainability and reduces runtime errors.

## Application Features

### Pages
1. **Calculator** (`/`) - Commission calculations with save functionality
2. **GCI Trends** (`/trends`) - Historical data visualization with month filtering
3. **Taxes** (`/taxes`) - Tax calculations using 2026 IRS federal tax brackets
4. **Reports** (`/reports`) - Export reports via CSV download

### Key Features
- Real-time commission calculations with breakdown of all fees and splits
- **Lead source tracking for each transaction (REQUIRED for new entries)**
  - 17 lead source options to categorize deal origins
  - Visual indicator (red asterisk) shows field is required
  - Save button disabled until lead source is selected
  - Optional when editing existing entries (supports legacy data)
- **Lead source analytics** - Visual breakdown showing percentage and count of deals from each source
- Save transactions to PostgreSQL database for historical tracking
- Month-by-month filtering in GCI Trends page (applies to lead source analytics too)
- Automatic tax calculation using 2026 IRS brackets (Single, Married Filing Jointly, Head of Household)
- Manual tax adjustment slider
- CSV export with comprehensive transaction details including lead source

### Report Summary Display
The Reports page shows:
- **Total Gross Income** - Sum of all pre-tax commission income
- **Total Net Income** - Sum of all after-tax income
- Total Deals, Average Commission, Total Taxes Paid, Average Sale Price, Effective Tax Rate

## Recent Changes

### November 2025
- **Made lead source REQUIRED for new entries** (November 18, 2025)
  - Save button on Calculator page is disabled until lead source is selected
  - Visual indicator (red asterisk) shows field is required
  - Backend validation enforces lead source for new entries via `insertGCIEntrySchema`
  - Lead source remains optional when editing existing entries via `updateGCIEntrySchema`
  - Prevents "Not Specified" entries in lead source analytics going forward
- **Added lead source tracking and analytics** - Users can now track where each deal came from and see performance metrics
  - Lead source dropdown on Calculator page with 17 options (SOI, FSBO, Expired, Open House, Farming, Sign Calls, Ad Calls, Internal Referral, Referral, Direct Mail, Social Media, Agent Referral, Zillow, Homelight, OpCity, Realtor.com, Other)
  - Lead source displayed in GCI Trends entry cards
  - Lead source editable in GCI Trends edit dialog
  - **Lead Source Analytics card** on GCI Trends page showing percentage and count of deals from each source
  - Analytics respect month filter - see distribution for all time or specific months
  - Lead source included in CSV export on Reports page
  - Centralized LEAD_SOURCES constant in shared/schema.ts for consistency
- **Removed email report functionality** from Reports page - now CSV download only
- Added Replit Auth integration for user authentication
- Implemented per-user data isolation in database
- Added commission breakdown auto-reset after saving entries
- Updated report summary labels to "Total Gross Income" and "Total Net Income" for clarity
- Migrated from in-memory storage to PostgreSQL database
- Changed all monetary columns to `numeric(18,2)` for exact decimal precision
- Updated tax brackets to 2026 IRS federal rates
- Added comprehensive Reports page with CSV download functionality