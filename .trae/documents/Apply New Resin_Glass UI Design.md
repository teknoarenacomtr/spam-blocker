I will update the application with the new "Resin/Glass" design provided.

### 1. Update CSS Styles (`CelluloseTheme.css`)
- Replace the existing styles with the new "Resin" theme CSS.
- Add the required Google Fonts imports (Inter, JetBrains Mono).
- Define the new CSS variables (`--resin-white`, `--deep-red`, etc.).
- Add the new background effects (`.resin-blob`, `.glass-orb`).

### 2. Update React Component (`App.tsx`)
- **Refactor `LandingPage`**:
  - Replace the current JSX structure with the new HTML layout.
  - Implement the new navigation bar with glass effect.
  - Update the Hero section and Search container.
  - Redesign the Report Form to match the new "Card" style.
  - Update the "Recent Complaints" feed to use the new card design.
- **Bind Functionality**:
  - Re-attach `handleSearch` to the new search input and button.
  - Re-attach `handleReport` to the new form inputs.
  - Map the `recentReports` data to the new complaint card layout.
  - Ensure all input states (`searchQuery`, `reportPhone`, `reportCategory`, etc.) are correctly linked.

### 3. Verification
- Verify the new design looks correct and matches the provided HTML.
- Ensure all interactive elements (Search, Report, Feed) function as expected.
- Push the changes to GitHub.