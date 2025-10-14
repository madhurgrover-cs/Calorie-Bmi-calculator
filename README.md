# 🔥 Calorie & BMI Counter

A responsive, single-page web application that helps you track your health metrics with precision. Built with a modern dark theme and featuring comprehensive calorie and BMI calculations.

## ✨ Features

### 🍎 Calorie Calculator
- **Macronutrient Input**: Enter carbohydrates, proteins, and fats in grams
- **Standard Calculations**: Uses industry-standard calorie values (4/4/9 calories per gram)
- **Detailed Breakdown**: Shows total calories and individual macronutrient contributions
- **Percentage Analysis**: Displays the percentage contribution of each macronutrient
- **Interactive Pie Chart**: Visual representation using Chart.js
- **Input Validation**: Ensures accurate data entry with helpful tooltips

### ⚖️ BMI Calculator
- **Multiple Units**: Supports kg/lbs for weight and m/ft/cm for height
- **Automatic Conversion**: Seamlessly converts between different units
- **BMI Classification**: Categorizes results as Underweight, Normal, Overweight, or Obese
- **Color-coded Results**: Visual indicators using green, orange, and red colors
- **Range Indicators**: Clear BMI category ranges with visual feedback

### 🎨 User Interface
- **Dark Theme**: Modern, eye-friendly dark interface
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Card-based Layout**: Clean, organized sections for each calculator
- **Smooth Animations**: Engaging transitions and hover effects
- **Tooltip System**: Helpful information on hover/focus

### 💾 Data Management
- **Local Storage**: Automatically saves your calculation history
- **Result History**: Keep track of up to 10 recent calculations for each type
- **Export/Clear**: Easy management of saved data
- **Persistent Data**: Results survive browser sessions

### 🚀 Technical Features
- **Pure Frontend**: No backend required - runs entirely in the browser
- **Chart.js Integration**: Beautiful, interactive charts for data visualization
- **Error Handling**: Comprehensive validation and user feedback
- **Notifications**: Real-time feedback system for user actions
- **Keyboard Support**: Enter key support for quick calculations

## 🛠️ Technical Stack

- **HTML5**: Semantic, accessible markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript**: No frameworks - pure performance
- **Chart.js**: Professional charting library via CDN
- **Local Storage API**: Client-side data persistence

## 📱 Browser Compatibility

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Getting Started

1. **Clone or Download**: Get the project files
2. **Open**: Simply open `index.html` in your web browser
3. **Start Calculating**: No installation or setup required!

### File Structure
```
warp-prompt-config/
├── index.html      # Main application page
├── style.css       # Dark theme styles and responsive design
├── script.js       # Application logic and Chart.js integration
└── README.md       # This documentation
```

## 📊 Usage Guide

### Calorie Calculator
1. Enter your macronutrient values in grams
2. Click "Calculate Calories" or press Enter
3. View your total calories and breakdown
4. Analyze the pie chart for visual distribution
5. Results are automatically saved to history

### BMI Calculator
1. Select your preferred units (kg/lbs for weight, m/ft/cm for height)
2. Enter your weight and height values
3. Click "Calculate BMI" or press Enter
4. See your BMI value and health category
5. Results include color-coded indicators

### History Management
- View recent calculations in the "Saved Results" section
- Clear all history with the "Clear History" button
- Data persists between browser sessions

## 🎨 Design Philosophy

The application follows modern UI/UX principles:

- **Dark Mode First**: Reduces eye strain and looks professional
- **Mobile Responsive**: Adapts beautifully to any screen size
- **Accessible**: Proper contrast ratios and keyboard navigation
- **Fast**: Lightweight and optimized for performance
- **Intuitive**: Clear labels, tooltips, and visual feedback

## 📈 Health Information

The app includes educational content about:

- **Calorie Understanding**: How macronutrients contribute to energy
- **BMI Categories**: What different BMI ranges mean for health
- **Health Relationships**: How calories and BMI work together

## 🔧 Customization

The application is built with CSS custom properties (variables), making it easy to customize:

```css
:root {
    --bg-primary: #0f0f23;
    --accent-blue: #00d4ff;
    --accent-green: #00ff88;
    /* ... more variables */
}
```

## 📝 Development Notes

- **No Build Process**: Direct browser compatibility
- **ES6+ Features**: Modern JavaScript for better performance
- **Progressive Enhancement**: Works even if JavaScript is disabled (basic form functionality)
- **Error Recovery**: Graceful handling of edge cases and invalid inputs

## 🤝 Contributing

This is a single-page application designed for simplicity and ease of use. If you'd like to enhance it:

1. Fork the repository
2. Make your improvements
3. Test across different browsers and devices
4. Submit a pull request with detailed description

## 📄 License

This project is open source and available under the MIT License.

## 🎯 Future Enhancements

Potential features for future versions:
- Daily calorie goal tracking
- Export data to CSV/JSON
- Additional health metrics (body fat percentage, etc.)
- Integration with fitness trackers
- Multi-language support
- Dark/light theme toggle

---

**Made with ❤️ for health-conscious individuals who want a simple, effective way to track their nutrition and BMI metrics.**