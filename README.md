# Loan Calculator - Frauda

A loan calculator application built with React, TypeScript, and Tailwind CSS.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/       # React components
│   ├── LoanForm.tsx      # Form for loan input
│   └── LoanResult.tsx    # Display loan results
├── hooks/            # Custom React hooks
│   ├── useIndustries.ts      # Fetch industries
│   └── useLoanCalculation.ts # Calculate loan
├── services/         # API service layer
│   └── api.ts            # API client functions
├── types/            # TypeScript type definitions
│   └── loan.ts           # Loan-related types
├── App.tsx           # Main app component
├── main.tsx          # Entry point
└── index.css         # Global styles (Tailwind)
```

## Development Notes

### What I spent time on:
- I focused on implementing all the bullet points listed in the assignment, which I interpreted as the "must haves"

### What I chose not to do:
- Maybe I did not follow the design to the nitty gritty bone
- App.tsx has some potential improvements: Loading state for industries, constants for static text, better usage of semantic HTML (`<main>`, `<section>`), Accessibility (ARIA labels and roles).
It can also be much slimmer and broken up into several smaller pieces, such as: Reusable error component, separate AppHeader component, 
- In the LoanForm component some potential improvements would be to have Suggested loan amount hint, that users would get when typing in their monthly revenue. Same could be reused when the user gets a loan rejected, they could be given a hint to feasible amount. 
- In LoanResult component the currency formatter could have been extracted into its own formatter util. 
### AI Usage:
- I used Cursor as that is my go to tool when using AI. I used it mainly as a scaffolding device, to quicker generate the backbone of the app. I start first with getting things to work according to the spec, and then I use AI to extract and separate things. To more quickly organise the app basically. Also in quicker reading some parts of the API.  
