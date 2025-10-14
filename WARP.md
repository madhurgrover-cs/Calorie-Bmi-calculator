# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a **Calorie & BMI Counter** - a responsive, single-page web application for health metric tracking. It's built with vanilla HTML, CSS, and JavaScript with a modern dark theme and includes comprehensive calorie and BMI calculations.

### Key Features
- **Dual Calculator System**: Separate calorie and BMI calculators with real-time results
- **Data Visualization**: Interactive pie charts using Chart.js for calorie breakdown
- **Local Storage**: Persistent calculation history (up to 10 recent results each)
- **Responsive Design**: Mobile-first approach with card-based layout
- **Dark Theme**: Professional dark UI with custom CSS properties

## Development Commands

### Running the Application
```bash
# Simply open the HTML file in a browser - no build process required
start index.html                    # Windows
open index.html                     # macOS  
xdg-open index.html                 # Linux
```

### Development Server (Optional)
```bash
# For better development experience with live reload
npx live-server .                   # Using live-server
python -m http.server 8000          # Using Python's built-in server
php -S localhost:8000               # Using PHP's built-in server
```

### Testing
```bash
# Open in different browsers for cross-browser testing
start msedge index.html             # Edge
start chrome index.html             # Chrome
start firefox index.html            # Firefox
```

## Code Architecture

### Application Structure
The application follows a **modular vanilla JavaScript architecture** with clear separation of concerns:

```
Components:
├── UI Layer (index.html)           # Semantic HTML structure
├── Styling Layer (style.css)       # CSS custom properties + responsive design
├── Logic Layer (script.js)         # Application state and business logic
└── External Dependencies          # Chart.js via CDN
```

### Key Architectural Patterns

#### **1. Module Pattern with Global Exports**
- Core functions are scoped within the module but selectively exposed to `window` object
- Event-driven architecture using DOM events and custom event listeners
- Separation between DOM manipulation and business logic

#### **2. State Management**
```javascript path=null start=null
// Global state stored in localStorage with structured keys
const STORAGE_KEYS = {
    CALORIE_HISTORY: 'calorieHistory',
    BMI_HISTORY: 'bmiHistory'
};
```

#### **3. Calculator System Architecture**
Each calculator follows the same pattern:
- **Input Validation** → **Calculation Logic** → **Result Display** → **History Storage**
- Separate reset functions maintain clean state
- Unit conversion handled at calculation time

#### **4. Chart Management**
```javascript path=null start=null
// Chart.js integration with cleanup management
let calorieChart = null;  // Global reference for cleanup
// Destroy existing chart before creating new one
if (calorieChart) { calorieChart.destroy(); }
```

### Data Flow

#### **Calorie Calculator Flow**
1. User inputs macronutrients (carbs, protein, fats)
2. `calculateCalories()` validates inputs and applies standard conversion rates
3. Results calculated and percentages computed
4. DOM updated with results and `Chart.js` pie chart created
5. Result object saved to localStorage with timestamp
6. History view refreshed automatically

#### **BMI Calculator Flow**  
1. User inputs weight/height with unit selection
2. `calculateBMI()` converts units to metric system
3. BMI calculated using standard formula: `weight(kg) / (height(m))²`
4. Category determined and color-coded result displayed
5. Result saved to localStorage and history updated

### Styling Architecture

#### **CSS Custom Properties System**
```css path=null start=null
:root {
    --bg-primary: #0f0f23;      /* Base background */
    --accent-blue: #00d4ff;     /* Primary accent */
    --accent-green: #00ff88;    /* Success/normal states */
    --gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

#### **Responsive Design Strategy**
- **CSS Grid**: Used for calculator input groups and result displays
- **Flexbox**: Used for card headers and inline elements  
- **Mobile-first**: Base styles for mobile, media queries for larger screens
- **Breakpoints**: 768px (tablet), 480px (mobile)

### Component Interaction Patterns

#### **Event Handling**
- `setupEventListeners()` centralizes all event binding
- **Enter key support** on inputs for better UX
- **Unit change handlers** update placeholders dynamically

#### **Notification System**
- Toast-style notifications with auto-dismiss
- Different types: success, error, warning, info
- CSS animations for slide-in/slide-out effects

#### **History Management**
- Combined display of both calculator types sorted by timestamp
- Automatic cleanup to maintain maximum 10 entries per calculator
- Safe JSON parsing with fallback to empty arrays

### Performance Considerations

#### **Chart.js Management**
- **Memory leak prevention**: Always destroy existing charts before creating new ones
- **Conditional rendering**: Only create charts when data exists
- **Optimized data**: Filter out zero values from chart data

#### **localStorage Usage**
- **Error handling**: Try-catch blocks around all localStorage operations
- **Data limits**: Automatic history trimming to prevent storage bloat
- **Fallback handling**: Graceful degradation when localStorage unavailable

### Browser Compatibility
- **Modern JavaScript**: ES6+ features used (const/let, template literals, arrow functions)
- **CSS Grid/Flexbox**: Modern layout methods with fallbacks
- **Chart.js**: Loaded via CDN for broad compatibility
- **Target browsers**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+

### Development Patterns

#### **Function Organization**
- **Calculator functions**: Input → Validation → Calculation → Display → Storage
- **Utility functions**: Unit conversion, date formatting, DOM manipulation
- **Storage functions**: Save/load with error handling and fallbacks

#### **Error Handling Strategy**
- **Input validation**: Type checking and range validation
- **User feedback**: Notification system for all error states
- **Graceful degradation**: App works even if JavaScript fails partially

#### **Testing Approach**
- **Manual testing**: Cross-browser and device testing
- **Edge cases**: Test with zero values, negative numbers, extreme values
- **Storage testing**: Test localStorage quota and browser variations

### Customization Points

#### **Theme Modifications**
All colors defined in CSS custom properties - easy to create new themes by updating the `:root` values.

#### **Calculator Extensions**
To add new calculators, follow the established pattern:
1. Add HTML structure in calculator-card format
2. Create calculation function with validation
3. Add reset function and storage functions
4. Update `setupEventListeners()` with new event bindings

#### **Chart Customizations**
Chart.js configuration is centralized in `createCalorieChart()` - modify colors, animations, or chart type here.

### Security Considerations

- **XSS Prevention**: All user inputs are numeric-only with validation
- **localStorage Safety**: JSON.parse wrapped in try-catch blocks
- **No external data**: App works entirely offline with no API calls
- **Content Security**: No eval() or innerHTML with user data