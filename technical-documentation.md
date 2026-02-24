# Kathmandu Metropolitan City Smart City Dashboard - Technical Documentation

**Version:** 1.0  
**Date:** February 23, 2026  
**Project:** KMC Smart City Dashboard  
**Technology Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Architecture](#project-architecture)
4. [Component Architecture](#component-architecture)
5. [Data Management](#data-management)
6. [API Integrations](#api-integrations)
7. [State Management](#state-management)
8. [Authentication & Security](#authentication--security)
9. [Performance Optimization](#performance-optimization)
10. [Smart City Standards Integration](#smart-city-standards-integration)
11. [Development Setup](#development-setup)
12. [Deployment](#deployment)
13. [Testing Strategy](#testing-strategy)
14. [Code Style & Conventions](#code-style--conventions)
15. [Troubleshooting](#troubleshooting)

## Project Overview

The Kathmandu Metropolitan City (KMC) Smart City Dashboard is a comprehensive web application that provides real-time monitoring and analysis of various city departments and their alignment with international smart city standards.

### Key Features

- **16 Department Dashboards:** Health, Education, Environment, Disaster Management, and more
- **Smart City Standards:** Integration with SDG, ISO 37120, and SCI 2025 standards
- **Real-time Data:** Live air quality monitoring and program tracking
- **Interactive Visualizations:** Charts, graphs, and thematic overviews
- **Responsive Design:** Mobile-first approach with Tailwind CSS
- **Accessibility:** WCAG-compliant components and semantic HTML

### Project Goals

1. Provide transparent access to city department data and performance metrics
2. Enable data-driven decision making for city administrators
3. Demonstrate KMC's commitment to international smart city standards
4. Improve citizen engagement through open data access

## Technology Stack

### Core Technologies

- **Next.js 15.0.3:** React framework with App Router and server-side rendering
- **React 19.0.0:** UI library with hooks and concurrent features
- **TypeScript 5.7.4:** Type-safe JavaScript development
- **Tailwind CSS 3.4.1:** Utility-first CSS framework

### Development Tools

- **ESLint 9.18.0:** Code linting and style enforcement
- **Prettier 3.4.2:** Code formatting
- **Husky 9.1.7:** Git hooks for code quality
- **TypeScript Compiler:** Type checking and compilation

### Styling & UI

- **Tailwind CSS:** Primary styling framework
- **Lucide React 0.460.0:** Icon library
- **Class Variance Authority (CVA):** Component variant management
- **Tailwind Merge:** CSS class merging utilities

### Data & State Management

- **React Hooks:** useState, useEffect, useMemo, useCallback
- **File-based Data:** JSON/CSV data storage with utility functions
- **External APIs:** OpenAQ for real-time air quality data

## Project Architecture

### Directory Structure

```
c:/Users/User/Downloads/final/
├── app/                    # Next.js App Router pages
│   ├── departments/        # Department-specific pages
│   │   ├── health/         # Health Department dashboard
│   │   ├── education/      # Education Department dashboard
│   │   ├── environment/    # Environment Department dashboard
│   │   └── ...            # Other departments
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout component
│   └── page.tsx           # Home page
├── components/             # Reusable components
│   ├── home/              # Home page components
│   ├── ui/                # UI component library
│   ├── education/         # Education-specific components
│   ├── disaster/          # Disaster management components
│   └── ...               # Other department components
├── lib/                   # Business logic and utilities
│   ├── education-data.ts  # Education department data
│   ├── kmc-data.ts        # Health department data
│   ├── environment-data.ts # Environment data
│   ├── budget-utils.ts    # Budget calculation utilities
│   └── utils.ts           # General utility functions
├── public/                # Static assets
└── styles/               # Additional style files
```

### Architecture Patterns

1. **Component-Based Architecture:** Modular, reusable components
2. **File-Based Routing:** Next.js App Router for automatic routing
3. **Data-First Design:** Static data with API integrations
4. **Type Safety:** Comprehensive TypeScript interfaces
5. **Responsive Design:** Mobile-first with progressive enhancement

## Component Architecture

### Component Hierarchy

```
Root Layout
├── Header (Global)
├── Navigation (Global)
├── Main Content Area
│   ├── Department Pages
│   │   ├── Header Component
│   │   ├── Thematic Overview
│   │   ├── Linkage Scale
│   │   ├── Program Table
│   │   ├── Project Phase
│   │   ├── Statistics Cards
│   │   └── Charts
│   └── Dashboard Components
└── Footer (Global)
```

### Key Component Categories

#### 1. Layout Components
- **Root Layout (`app/layout.tsx`):** Theme provider, global styles
- **Department Layouts:** Consistent structure across all departments
- **Responsive Grid Systems:** Flexible layouts for all screen sizes

#### 2. UI Components (`components/ui/`)
- **Chart Components:** Reusable chart wrappers with consistent styling
- **Form Components:** Inputs, buttons, selects with validation
- **Navigation Components:** Breadcrumbs, tabs, pagination
- **Data Display:** Cards, tables, badges, progress indicators

#### 3. Department-Specific Components
- **Header Components:** Department info, statistics, quick actions
- **Thematic Overview:** Program distribution by thematic areas
- **Linkage Scale:** Standard alignment visualization
- **Program Tables:** Filterable, searchable program listings
- **Project Phase Tracking:** Visual progress indicators

#### 4. Data Visualization Components
- **Charts:** Bar charts, pie charts, line charts using recharts
- **Maps:** Geographic data visualization
- **KPI Cards:** Key performance indicator displays
- **Progress Indicators:** Project completion tracking

### Component Design Principles

1. **Reusability:** Components designed for multiple use cases
2. **Accessibility:** Semantic HTML, ARIA labels, keyboard navigation
3. **Performance:** Lazy loading, memoization, efficient rendering
4. **Type Safety:** Full TypeScript support with strict typing
5. **Styling Consistency:** Tailwind CSS with design system tokens

## Data Management

### Data Sources

#### 1. Static Data Files (`lib/`)
- **Department Data:** Program information, budgets, standards mapping
- **Configuration:** Department metadata, colors, icons
- **Utilities:** Data transformation and calculation functions

#### 2. External APIs
- **OpenAQ API:** Real-time air quality data for Environment dashboard
- **Government APIs:** Integration with various municipal data sources
- **Third-party Services:** Weather, traffic, and other city data

### Data Structure

#### Standardized Department Interface
```typescript
interface DepartmentProgram {
  id: string
  department: string
  sector: string
  subSector: string
  mainProgram: string
  programName: string
  budget: number
  budgetCode: string
  sdg: {
    direct: string
    indirect: string
  }
  iso37120: {
    direct: string
    indirect: string
  }
  sci2025: {
    direct: string
    indirect: string
  }
  thematicArea: string
  linkageScores: {
    sdgScore: number
    isoScore: number
    sciScore: number
    linkageType: "research" | "discussion" | "concurrence" | "declaration"
  }
  projectPhase: {
    phase: "inception" | "approval" | "tender" | "award" | "completion"
    progress: number
  }
}
```

### Data Processing

#### 1. Data Loading
- **Static Imports:** JSON files imported directly in components
- **API Fetching:** Real-time data from external services
- **Caching:** Strategic caching for performance optimization

#### 2. Data Transformation
- **Aggregation:** Budget totals, program counts, average scores
- **Filtering:** Department-specific, thematic area, program type
- **Sorting:** By budget, date, alphabetical, custom criteria
- **Search:** Full-text search across program descriptions

#### 3. Data Validation
- **TypeScript Interfaces:** Compile-time type checking
- **Runtime Validation:** Data integrity checks
- **Error Handling:** Graceful degradation for missing data

### Data Flow

1. **Data Import:** Static JSON files loaded at build time
2. **Data Processing:** Utility functions transform raw data
3. **Component Consumption:** Components receive processed data
4. **User Interaction:** Filters and searches update displayed data
5. **Real-time Updates:** API data refreshes periodically

## API Integrations

### OpenAQ API Integration

#### Purpose
Real-time air quality monitoring for the Environment Department dashboard.

#### Implementation
```typescript
// Example API integration pattern
const fetchAirQualityData = async () => {
  const response = await fetch('https://api.openaq.org/v2/latest')
  const data = await response.json()
  return data.results
}
```

#### Features
- **Real-time Data:** Live air quality measurements
- **Multiple Pollutants:** PM2.5, PM10, NO2, O3, CO, SO2
- **Geographic Coverage:** Multiple monitoring stations across Kathmandu
- **Historical Data:** Access to historical air quality trends

### Future API Integrations

#### Planned Integrations
1. **Traffic Management:** Real-time traffic data and congestion monitoring
2. **Waste Management:** Waste collection schedules and facility status
3. **Public Transportation:** Bus schedules, route information, occupancy
4. **Emergency Services:** Response times, resource allocation
5. **Utilities:** Water pressure, electricity usage, gas distribution

#### Integration Strategy
- **API Gateway:** Centralized API management
- **Error Handling:** Robust error handling and fallbacks
- **Caching:** Strategic caching to reduce API calls
- **Rate Limiting:** Respect API rate limits and quotas

## State Management

### Current State Management

#### React Hooks
- **useState:** Local component state management
- **useEffect:** Side effects and data fetching
- **useMemo:** Expensive calculations and data transformations
- **useCallback:** Function memoization for performance

#### Context API (Where Needed)
- **Theme Context:** Dark/light mode switching
- **User Preferences:** Dashboard customization options
- **Global State:** Shared application state

### State Management Patterns

#### 1. Local State
Components manage their own state for:
- Form inputs and user interactions
- Local filtering and sorting
- Modal and dialog states
- Loading and error states

#### 2. Shared State
Context or prop drilling for:
- User authentication status
- Global theme preferences
- Application-wide configuration
- Cross-component communication

#### 3. Data State
- **Static Data:** Imported directly from JSON files
- **API Data:** Fetched and cached as needed
- **Computed Data:** Derived from existing data using useMemo

### State Management Best Practices

1. **Minimal State:** Only store what's necessary
2. **Predictable Updates:** Clear state update patterns
3. **Performance Optimization:** Memoization and selective re-rendering
4. **Error Boundaries:** Graceful error handling
5. **Type Safety:** Full TypeScript integration

## Authentication & Security

### Current Authentication Status

**No Authentication Required:** The dashboard is currently a public-facing application with no authentication requirements.

### Security Considerations

#### 1. Data Security
- **Static Data:** No sensitive data in client-side files
- **API Keys:** Secure storage of external API credentials
- **Data Validation:** Input validation and sanitization

#### 2. Client-Side Security
- **CSP Headers:** Content Security Policy implementation
- **XSS Prevention:** Proper escaping and sanitization
- **CSRF Protection:** Built-in Next.js CSRF protection

#### 3. API Security
- **HTTPS:** All external API calls use HTTPS
- **API Key Management:** Secure storage and rotation
- **Rate Limiting:** Respect for external API limits

### Future Authentication Plans

#### Potential Authentication Methods
1. **OAuth 2.0:** Integration with government identity providers
2. **JWT Tokens:** For authenticated users with different access levels
3. **Role-Based Access:** Different permissions for different user types
4. **SSO Integration:** Single sign-on with existing government systems

#### Security Enhancements
- **Audit Logging:** Track user actions and data access
- **Data Encryption:** Sensitive data encryption at rest and in transit
- **Regular Security Audits:** Periodic security assessments

## Performance Optimization

### Current Performance Strategies

#### 1. Image Optimization
- **Next.js Image Component:** Automatic image optimization
- **Lazy Loading:** Images load only when visible
- **Responsive Images:** Different sizes for different screen resolutions
- **WebP Format:** Modern image format for better compression

#### 2. Code Splitting
- **Component-Based Splitting:** Each component loads independently
- **Route-Based Splitting:** Pages load only necessary code
- **Dynamic Imports:** Lazy loading of heavy components

#### 3. Bundle Optimization
- **Tree Shaking:** Unused code automatically removed
- **Minification:** Automatic code minification in production
- **Compression:** Gzip compression for faster downloads

#### 4. Caching Strategies
- **Static Assets:** Long-term caching for unchanged files
- **API Data:** Strategic caching of external API responses
- **Computed Data:** Memoization of expensive calculations

### Performance Monitoring

#### Metrics Tracked
- **Page Load Time:** Time to first meaningful paint
- **Bundle Size:** Total JavaScript and CSS size
- **API Response Time:** External service response times
- **User Experience:** Core Web Vitals (LCP, FID, CLS)

#### Optimization Tools
- **Next.js Analytics:** Built-in performance monitoring
- **Lighthouse:** Regular performance audits
- **Bundle Analyzer:** Visualization of bundle composition

### Performance Best Practices

1. **Image Optimization:** Compress and optimize all images
2. **Code Splitting:** Split code into smaller chunks
3. **Lazy Loading:** Load components only when needed
4. **Caching:** Implement strategic caching
5. **Minification:** Minimize all assets
6. **CDN Usage:** Serve static assets from CDN

## Smart City Standards Integration

### SDG (Sustainable Development Goals) Integration

#### Implementation
- **Direct Mapping:** Programs directly aligned with specific SDG targets
- **Indirect Mapping:** Programs that support broader SDG objectives
- **Scoring System:** Quantitative scoring of SDG alignment
- **Visualization:** Clear indicators of SDG contribution

#### Key SDG Alignments
- **SDG 3:** Good Health and Well-being (Health Department)
- **SDG 4:** Quality Education (Education Department)
- **SDG 11:** Sustainable Cities and Communities (Urban Planning)
- **SDG 13:** Climate Action (Environment Department)

### ISO 37120 Integration

#### Standard Compliance
- **Indicator Mapping:** Programs mapped to specific ISO indicators
- **Performance Metrics:** ISO-compliant performance measurement
- **Reporting Standards:** ISO-aligned reporting formats
- **Quality Assurance:** ISO-standard quality controls

#### Key ISO 37120 Areas
- **Governance:** Administrative efficiency and transparency
- **Finance:** Budget management and financial reporting
- **Infrastructure:** Urban infrastructure development
- **Environment:** Environmental protection and sustainability

### SCI 2025 (Smart City Index) Integration

#### Smart City Framework
- **Pillar Mapping:** Programs aligned with SCI pillars
- **Component Alignment:** Specific component alignment
- **Indicator Tracking:** SCI indicator progress monitoring
- **Benchmarking:** Comparison with other smart cities

#### SCI 2025 Pillars
- **Pillar 1:** Smart People (Education, Innovation)
- **Pillar 2:** Smart Governance (Administration, Services)
- **Pillar 3:** Smart Infrastructure (Technology, Environment)
- **Pillar 4:** Smart Economy (Business, Employment)

### Linkage Scoring System

#### Scoring Methodology
```typescript
interface LinkageScores {
  sdgScore: number      // 0-5 scale for SDG alignment
  isoScore: number      // 0-5 scale for ISO alignment
  sciScore: number      // 0-5 scale for SCI alignment
  linkageType: "research" | "discussion" | "concurrence" | "declaration"
}
```

#### Scoring Criteria
- **Research:** Evidence-based alignment with standards
- **Discussion:** Stakeholder consultation and agreement
- **Concurrence:** Multi-stakeholder consensus
- **Declaration:** Official policy alignment

## Development Setup

### Prerequisites

- **Node.js:** Version 18.17.0 or higher
- **npm:** Version 9.6.7 or higher
- **Git:** Version control system

### Installation

1. **Clone Repository:**
   ```bash
   git clone <repository-url>
   cd final
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   ```bash
   cp .env.example .env.local
   # Configure environment variables as needed
   ```

4. **Start Development Server:**
   ```bash
   npm run dev
   ```

### Development Workflow

#### Code Quality
- **ESLint:** Run `npm run lint` for code quality checks
- **Prettier:** Run `npm run format` for code formatting
- **TypeScript:** Run `npm run type-check` for type validation

#### Git Workflow
- **Feature Branches:** Create branches for new features
- **Commit Messages:** Use conventional commit format
- **Pull Requests:** Code review before merging
- **Husky Hooks:** Pre-commit hooks enforce code quality

### Development Tools

#### IDE Configuration
- **VS Code:** Recommended with TypeScript and ESLint extensions
- **Prettier:** Automatic code formatting on save
- **ESLint:** Real-time linting and error detection

#### Debugging
- **React DevTools:** Browser extension for React debugging
- **Next.js DevTools:** Built-in development tools
- **Console Logging:** Strategic logging for debugging

## Deployment

### Build Process

1. **Production Build:**
   ```bash
   npm run build
   ```

2. **Start Production Server:**
   ```bash
   npm start
   ```

3. **Build Analysis:**
   ```bash
   npm run analyze
   ```

### Deployment Options

#### Vercel (Recommended)
- **Automatic Deployment:** Git push triggers deployment
- **Environment Variables:** Configure in Vercel dashboard
- **Custom Domain:** Easy domain configuration
- **SSL Certificates:** Automatic HTTPS

#### Other Platforms
- **Netlify:** Alternative deployment platform
- **AWS:** Amazon Web Services deployment
- **Docker:** Containerized deployment option

### Environment Configuration

#### Required Environment Variables
```env
# API Keys
OPENAQ_API_KEY=your_openaq_api_key

# Application Settings
NEXT_PUBLIC_APP_NAME="KMC Smart City Dashboard"
NEXT_PUBLIC_API_BASE_URL="https://api.example.com"
```

#### Production Considerations
- **Environment Variables:** Secure storage of sensitive data
- **Caching:** Configure appropriate cache headers
- **CDN:** Use CDN for static asset delivery
- **Monitoring:** Set up application monitoring

## Testing Strategy

### Current Testing Approach

#### Manual Testing
- **Component Testing:** Manual testing of individual components
- **Integration Testing:** Manual testing of component interactions
- **User Testing:** Manual user experience testing
- **Cross-browser Testing:** Manual testing across different browsers

### Future Testing Plans

#### Unit Testing
- **Jest:** JavaScript testing framework
- **React Testing Library:** Component testing utilities
- **Test Coverage:** Aim for 80%+ test coverage

#### Integration Testing
- **Cypress:** End-to-end testing framework
- **API Testing:** Test external API integrations
- **User Flow Testing:** Test complete user journeys

#### Performance Testing
- **Lighthouse CI:** Automated performance testing
- **Load Testing:** Test application under load
- **Accessibility Testing:** Automated accessibility checks

### Testing Best Practices

1. **Test Early:** Write tests during development
2. **Test Often:** Run tests frequently during development
3. **Test Real Scenarios:** Test with realistic data and user flows
4. **Automate:** Automate testing in CI/CD pipeline

## Code Style & Conventions

### TypeScript Conventions

#### Interface Naming
```typescript
// Use PascalCase for interfaces
interface DepartmentProgram {
  id: string
  name: string
}

// Use camelCase for variables and functions
const departmentProgram: DepartmentProgram = { ... }
```

#### Type Safety
- **Strict Mode:** Enable strict TypeScript mode
- **No Any:** Avoid using `any` type
- **Union Types:** Use union types for limited options
- **Optional Properties:** Use `?` for optional properties

### Component Naming

#### File Naming
- **PascalCase:** Component files use PascalCase
- **.tsx Extension:** React components use .tsx
- **Index Files:** Use index.tsx for directory exports

#### Component Structure
```typescript
// Component file structure
interface ComponentProps {
  // Props interface
}

export default function ComponentName({ prop1, prop2 }: ComponentProps) {
  // Component implementation
}
```

### CSS-in-JS with Tailwind

#### Class Organization
- **Logical Order:** Layout, styling, responsive, states
- **Consistent Spacing:** Use consistent spacing classes
- **Semantic Classes:** Use semantic class names

#### Responsive Design
- **Mobile First:** Start with mobile styles
- **Progressive Enhancement:** Add styles for larger screens
- **Breakpoint Consistency:** Use consistent breakpoints

### Git Conventions

#### Commit Messages
```
feat: add new department dashboard
fix: resolve budget calculation bug
docs: update component documentation
style: format code with prettier
refactor: simplify data processing logic
test: add unit tests for utility functions
chore: update dependencies
```

#### Branch Naming
- **Feature Branches:** `feature/department-dashboard`
- **Bug Fixes:** `fix/budget-calculation`
- **Hotfixes:** `hotfix/security-patch`

## Troubleshooting

### Common Issues

#### Build Errors
**Problem:** TypeScript compilation errors
**Solution:** Run `npm run type-check` and fix type issues

**Problem:** Missing dependencies
**Solution:** Run `npm install` and check package.json

#### Runtime Errors
**Problem:** Component rendering issues
**Solution:** Check component props and data structure

**Problem:** API integration failures
**Solution:** Verify API keys and network connectivity

#### Performance Issues
**Problem:** Slow page loading
**Solution:** Check image optimization and code splitting

**Problem:** High bundle size
**Solution:** Analyze bundle with `npm run analyze`

### Debugging Tools

#### Browser Developer Tools
- **Network Tab:** Monitor API calls and asset loading
- **Console Tab:** Check for JavaScript errors
- **Performance Tab:** Analyze rendering performance
- **Application Tab:** Inspect local storage and cookies

#### Next.js DevTools
- **Error Overlay:** Real-time error display
- **Hot Reload:** Automatic page refresh on changes
- **Build Information:** Build time and bundle size info

### Getting Help

#### Documentation
- **Next.js Documentation:** https://nextjs.org/docs
- **React Documentation:** https://react.dev/docs
- **Tailwind CSS Documentation:** https://tailwindcss.com/docs

#### Community Support
- **GitHub Issues:** Report bugs and feature requests
- **Stack Overflow:** Search for common problems
- **Discord/Slack:** Developer community channels

## Conclusion

This technical documentation provides a comprehensive overview of the Kathmandu Metropolitan City Smart City Dashboard. The application demonstrates modern web development practices with a focus on performance, accessibility, and maintainability.

The modular architecture, comprehensive data management, and integration with international smart city standards make this a robust foundation for future development and expansion.

For questions or clarifications about any aspect of this documentation, please refer to the development team or consult the relevant technology documentation.