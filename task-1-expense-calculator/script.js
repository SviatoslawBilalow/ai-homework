// Store expenses in an array
let expenses = [];

// DOM elements
const categoryInput = document.getElementById('category');
const amountInput = document.getElementById('amount');
const addExpenseBtn = document.getElementById('addExpense');
const calculateBtn = document.getElementById('calculateBtn');
const expensesList = document.getElementById('expensesList');
const resultsSection = document.getElementById('results');
const totalExpensesElement = document.getElementById('totalExpenses');
const averageDailyElement = document.getElementById('averageDaily');
const topExpensesElement = document.getElementById('topExpenses');

// Load expenses from localStorage when page loads
document.addEventListener('DOMContentLoaded', () => {
    const savedExpenses = localStorage.getItem('expenses');
    if (savedExpenses) {
        expenses = JSON.parse(savedExpenses);
        updateExpensesList();
    }
});

// Add event listeners
addExpenseBtn.addEventListener('click', addExpense);
calculateBtn.addEventListener('click', showResults);

// Function to save expenses to localStorage
function saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Function to add new expense
function addExpense() {
    const category = categoryInput.value.trim();
    const amount = parseFloat(amountInput.value);

    if (category && !isNaN(amount) && amount > 0) {
        expenses.push({ category, amount });
        updateExpensesList();
        saveExpenses();
        
        // Clear inputs
        categoryInput.value = '';
        amountInput.value = '';
    } else {
        alert('Please enter valid category and amount');
    }
}

// Function to update the expenses list in the table
function updateExpensesList() {
    expensesList.innerHTML = '';
    
    expenses.forEach((expense, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.category}</td>
            <td>$${expense.amount.toLocaleString()}</td>
            <td>
                <button class="delete-btn" onclick="deleteExpense(${index})">Delete</button>
            </td>
        `;
        expensesList.appendChild(row);
    });
}

// Function to delete an expense
function deleteExpense(index) {
    expenses.splice(index, 1);
    updateExpensesList();
    saveExpenses();
    // Hide results when an expense is deleted
    resultsSection.style.display = 'none';
}

// Function to calculate and display results
function showResults() {
    if (expenses.length === 0) {
        alert('Please add at least one expense before calculating');
        return;
    }

    // Show the results section
    resultsSection.style.display = 'block';

    // Calculate total expenses
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalExpensesElement.textContent = `$${total.toLocaleString()}`;

    // Calculate average daily expense (assuming 30 days in a month)
    const averageDaily = total / 30;
    averageDailyElement.textContent = `$${averageDaily.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

    // Get top 3 expenses
    const topExpenses = [...expenses]
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 3);

    // Display top 3 expenses
    topExpensesElement.innerHTML = '';
    topExpenses.forEach(expense => {
        const li = document.createElement('li');
        li.textContent = `${expense.category}: $${expense.amount.toLocaleString()}`;
        topExpensesElement.appendChild(li);
    });
} 