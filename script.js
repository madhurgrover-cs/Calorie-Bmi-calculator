// Calorie & BMI Counter JavaScript
// Dark theme health calculator with localStorage and Chart.js

// Global variables for charts
let calorieChart = null;

// Storage keys
const STORAGE_KEYS = {
    CALORIE_HISTORY: 'calorieHistory',
    BMI_HISTORY: 'bmiHistory'
};

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadSavedResults();
    setupEventListeners();
});

// Event listeners setup
function setupEventListeners() {
    // Unit change listeners for BMI calculator
    document.getElementById('weight-unit').addEventListener('change', updateWeightPlaceholder);
    document.getElementById('height-unit').addEventListener('change', updateHeightPlaceholder);
    
    // Enter key listeners for inputs
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                if (this.closest('#calorie-section')) {
                    calculateCalories();
                } else if (this.closest('#bmi-section')) {
                    calculateBMI();
                }
            }
        });
    });
}

// Calorie Calculator Functions
function calculateCalories() {
    // Get input values
    const carbs = parseFloat(document.getElementById('carbs').value) || 0;
    const protein = parseFloat(document.getElementById('protein').value) || 0;
    const fats = parseFloat(document.getElementById('fats').value) || 0;
    
    // Validation
    if (carbs < 0 || protein < 0 || fats < 0) {
        showNotification('Please enter valid positive numbers', 'error');
        return;
    }
    
    if (carbs === 0 && protein === 0 && fats === 0) {
        showNotification('Please enter at least one macronutrient value', 'warning');
        return;
    }
    
    // Calculate calories using standard values
    const carbCalories = carbs * 4;      // 1g carbs = 4 calories
    const proteinCalories = protein * 4;  // 1g protein = 4 calories
    const fatCalories = fats * 9;        // 1g fat = 9 calories
    const totalCalories = carbCalories + proteinCalories + fatCalories;
    
    // Calculate percentages
    const carbPercentage = totalCalories > 0 ? ((carbCalories / totalCalories) * 100).toFixed(1) : 0;
    const proteinPercentage = totalCalories > 0 ? ((proteinCalories / totalCalories) * 100).toFixed(1) : 0;
    const fatPercentage = totalCalories > 0 ? ((fatCalories / totalCalories) * 100).toFixed(1) : 0;
    
    // Update display
    document.getElementById('total-calories').textContent = totalCalories.toFixed(1);
    document.getElementById('carb-calories').textContent = carbCalories.toFixed(1);
    document.getElementById('carb-percentage').textContent = `(${carbPercentage}%)`;
    document.getElementById('protein-calories').textContent = proteinCalories.toFixed(1);
    document.getElementById('protein-percentage').textContent = `(${proteinPercentage}%)`;
    document.getElementById('fat-calories').textContent = fatCalories.toFixed(1);
    document.getElementById('fat-percentage').textContent = `(${fatPercentage}%)`;
    
    // Show results with animation
    const resultsElement = document.getElementById('calorie-results');
    resultsElement.classList.add('show');
    
    // Create/update pie chart
    createCalorieChart(carbCalories, proteinCalories, fatCalories);
    
    // Save to localStorage
    saveCalorieResult({
        carbs,
        protein,
        fats,
        totalCalories,
        carbCalories,
        proteinCalories,
        fatCalories,
        timestamp: new Date().toISOString()
    });
    
    // Add pulse animation to results
    resultsElement.classList.add('pulse');
    setTimeout(() => resultsElement.classList.remove('pulse'), 300);
    
    showNotification('Calories calculated successfully!', 'success');
}

function createCalorieChart(carbCalories, proteinCalories, fatCalories) {
    const ctx = document.getElementById('calorieChart').getContext('2d');
    
    // Destroy existing chart if it exists
    if (calorieChart) {
        calorieChart.destroy();
    }
    
    // Only create chart if there are calories to show
    if (carbCalories + proteinCalories + fatCalories === 0) {
        return;
    }
    
    const data = [];
    const labels = [];
    const colors = [];
    
    if (carbCalories > 0) {
        data.push(carbCalories);
        labels.push('Carbohydrates');
        colors.push('#00d4ff');
    }
    if (proteinCalories > 0) {
        data.push(proteinCalories);
        labels.push('Proteins');
        colors.push('#00ff88');
    }
    if (fatCalories > 0) {
        data.push(fatCalories);
        labels.push('Fats');
        colors.push('#ff9500');
    }
    
    calorieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors,
                borderColor: colors.map(color => color + '80'),
                borderWidth: 2,
                hoverBorderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#ffffff',
                        padding: 15,
                        usePointStyle: true,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: '#16213e',
                    titleColor: '#ffffff',
                    bodyColor: '#b4b8c5',
                    borderColor: '#2c3e50',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            const percentage = ((context.raw / (carbCalories + proteinCalories + fatCalories)) * 100).toFixed(1);
                            return `${context.label}: ${context.raw.toFixed(1)} cal (${percentage}%)`;
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 800
            }
        }
    });
}

function resetCalorieCalculator() {
    // Clear input fields
    document.getElementById('carbs').value = '';
    document.getElementById('protein').value = '';
    document.getElementById('fats').value = '';
    
    // Clear results
    document.getElementById('total-calories').textContent = '-';
    document.getElementById('carb-calories').textContent = '-';
    document.getElementById('carb-percentage').textContent = '(-)';
    document.getElementById('protein-calories').textContent = '-';
    document.getElementById('protein-percentage').textContent = '(-)';
    document.getElementById('fat-calories').textContent = '-';
    document.getElementById('fat-percentage').textContent = '(-)';
    
    // Hide results
    document.getElementById('calorie-results').classList.remove('show');
    
    // Destroy chart
    if (calorieChart) {
        calorieChart.destroy();
        calorieChart = null;
    }
    
    showNotification('Calorie calculator reset', 'info');
}

// BMI Calculator Functions
function calculateBMI() {
    // Get input values
    let weight = parseFloat(document.getElementById('weight').value);
    let height = parseFloat(document.getElementById('height').value);
    const weightUnit = document.getElementById('weight-unit').value;
    const heightUnit = document.getElementById('height-unit').value;
    
    // Validation
    if (!weight || !height || weight <= 0 || height <= 0) {
        showNotification('Please enter valid weight and height values', 'error');
        return;
    }
    
    // Convert weight to kg if necessary
    if (weightUnit === 'lbs') {
        weight = weight / 2.20462; // Convert lbs to kg
    }
    
    // Convert height to meters if necessary
    if (heightUnit === 'ft') {
        height = height * 0.3048; // Convert ft to meters
    } else if (heightUnit === 'cm') {
        height = height / 100; // Convert cm to meters
    }
    
    // Calculate BMI
    const bmi = weight / (height * height);
    
    // Determine BMI category and color
    let category, categoryClass;
    if (bmi < 18.5) {
        category = 'Underweight';
        categoryClass = 'underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
        category = 'Normal weight';
        categoryClass = 'normal';
    } else if (bmi >= 25 && bmi < 30) {
        category = 'Overweight';
        categoryClass = 'overweight';
    } else {
        category = 'Obese';
        categoryClass = 'obese';
    }
    
    // Update display
    document.getElementById('bmi-value').textContent = bmi.toFixed(1);
    const categoryElement = document.getElementById('bmi-category');
    categoryElement.textContent = category;
    categoryElement.className = `bmi-category ${categoryClass}`;
    
    const indicatorElement = document.getElementById('bmi-indicator');
    indicatorElement.className = `bmi-indicator ${categoryClass}`;
    
    // Show results with animation
    const resultsElement = document.getElementById('bmi-results');
    resultsElement.classList.add('show');
    
    // Save to localStorage
    saveBMIResult({
        weight: parseFloat(document.getElementById('weight').value),
        height: parseFloat(document.getElementById('height').value),
        weightUnit,
        heightUnit,
        bmi,
        category,
        timestamp: new Date().toISOString()
    });
    
    // Add pulse animation
    resultsElement.classList.add('pulse');
    setTimeout(() => resultsElement.classList.remove('pulse'), 300);
    
    showNotification(`BMI calculated: ${category}`, 'success');
}

function resetBMICalculator() {
    // Clear input fields
    document.getElementById('weight').value = '';
    document.getElementById('height').value = '';
    
    // Reset units to default
    document.getElementById('weight-unit').value = 'kg';
    document.getElementById('height-unit').value = 'm';
    updateWeightPlaceholder();
    updateHeightPlaceholder();
    
    // Clear results
    document.getElementById('bmi-value').textContent = '-';
    document.getElementById('bmi-category').textContent = '-';
    document.getElementById('bmi-category').className = 'bmi-category';
    document.getElementById('bmi-indicator').className = 'bmi-indicator';
    
    // Hide results
    document.getElementById('bmi-results').classList.remove('show');
    
    showNotification('BMI calculator reset', 'info');
}

// Unit conversion helpers
function updateWeightPlaceholder() {
    const unit = document.getElementById('weight-unit').value;
    const input = document.getElementById('weight');
    input.placeholder = unit === 'kg' ? 'Enter weight in kg' : 'Enter weight in lbs';
}

function updateHeightPlaceholder() {
    const unit = document.getElementById('height-unit').value;
    const input = document.getElementById('height');
    let placeholder;
    switch(unit) {
        case 'm':
            placeholder = 'Enter height in meters';
            break;
        case 'ft':
            placeholder = 'Enter height in feet';
            break;
        case 'cm':
            placeholder = 'Enter height in cm';
            break;
        default:
            placeholder = 'Enter height';
    }
    input.placeholder = placeholder;
}

// LocalStorage Functions
function saveCalorieResult(result) {
    try {
        const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.CALORIE_HISTORY)) || [];
        history.unshift(result); // Add to beginning of array
        
        // Keep only last 10 results
        if (history.length > 10) {
            history.splice(10);
        }
        
        localStorage.setItem(STORAGE_KEYS.CALORIE_HISTORY, JSON.stringify(history));
        loadSavedResults();
    } catch (error) {
        console.error('Error saving calorie result:', error);
    }
}

function saveBMIResult(result) {
    try {
        const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.BMI_HISTORY)) || [];
        history.unshift(result); // Add to beginning of array
        
        // Keep only last 10 results
        if (history.length > 10) {
            history.splice(10);
        }
        
        localStorage.setItem(STORAGE_KEYS.BMI_HISTORY, JSON.stringify(history));
        loadSavedResults();
    } catch (error) {
        console.error('Error saving BMI result:', error);
    }
}

function loadSavedResults() {
    try {
        const calorieHistory = JSON.parse(localStorage.getItem(STORAGE_KEYS.CALORIE_HISTORY)) || [];
        const bmiHistory = JSON.parse(localStorage.getItem(STORAGE_KEYS.BMI_HISTORY)) || [];
        
        const savedResultsElement = document.getElementById('saved-results');
        
        if (calorieHistory.length === 0 && bmiHistory.length === 0) {
            savedResultsElement.innerHTML = '<p class="no-results">No saved results yet</p>';
            return;
        }
        
        let html = '';
        
        // Combine and sort all results by timestamp
        const allResults = [
            ...calorieHistory.map(item => ({...item, type: 'calorie'})),
            ...bmiHistory.map(item => ({...item, type: 'bmi'}))
        ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        allResults.forEach(result => {
            const date = new Date(result.timestamp).toLocaleString();
            
            if (result.type === 'calorie') {
                html += `
                    <div class="result-history-item fade-in">
                        <div class="values">
                            <span class="value">🔥 ${result.totalCalories.toFixed(1)} cal</span>
                            <span class="value">🥖 ${result.carbs}g carbs</span>
                            <span class="value">🥩 ${result.protein}g protein</span>
                            <span class="value">🥑 ${result.fats}g fats</span>
                        </div>
                        <span class="timestamp">${date}</span>
                    </div>
                `;
            } else {
                html += `
                    <div class="result-history-item fade-in">
                        <div class="values">
                            <span class="value">⚖️ BMI: ${result.bmi.toFixed(1)}</span>
                            <span class="value ${result.category.toLowerCase().replace(' ', '')}">${result.category}</span>
                            <span class="value">${result.weight}${result.weightUnit} / ${result.height}${result.heightUnit}</span>
                        </div>
                        <span class="timestamp">${date}</span>
                    </div>
                `;
            }
        });
        
        savedResultsElement.innerHTML = html;
    } catch (error) {
        console.error('Error loading saved results:', error);
    }
}

function clearHistory() {
    if (confirm('Are you sure you want to clear all saved results? This action cannot be undone.')) {
        try {
            localStorage.removeItem(STORAGE_KEYS.CALORIE_HISTORY);
            localStorage.removeItem(STORAGE_KEYS.BMI_HISTORY);
            loadSavedResults();
            showNotification('History cleared successfully', 'success');
        } catch (error) {
            console.error('Error clearing history:', error);
            showNotification('Error clearing history', 'error');
        }
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-message">${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
    `;
    
    // Set background color based on type
    const colors = {
        success: '#00ff88',
        error: '#ff4757',
        warning: '#ff9500',
        info: '#00d4ff'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // Style close button
    const closeButton = notification.querySelector('.notification-close');
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 3000);
}

// Add notification animations to CSS
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

// Export functions for global access (needed for HTML onclick handlers)
window.calculateCalories = calculateCalories;
window.resetCalorieCalculator = resetCalorieCalculator;
window.calculateBMI = calculateBMI;
window.resetBMICalculator = resetBMICalculator;
window.updateWeightPlaceholder = updateWeightPlaceholder;
window.updateHeightPlaceholder = updateHeightPlaceholder;
window.clearHistory = clearHistory;