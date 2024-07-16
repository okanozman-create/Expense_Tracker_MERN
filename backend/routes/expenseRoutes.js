const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const authMiddleware = require('../middleware/authMiddleware');

// GET /expenses
// Read all expenses for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
    try {
      console.log('User ID:', req.user.id);
      const expenses = await Expense.find({ user: req.user.id });
      console.log('Expenses:', expenses);
      res.json(expenses);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });



// GET /expenses/:id
// Read single expense by ID
router.get('/:id', async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if (expense) {
            res.json(expense);
        } else {
            res.status(404).json({ message: 'Expense not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /expenses
// Create a new expense
router.post('/', authMiddleware, async (req, res) => {
    const { description, amount, date } = req.body;
    const userId = req.user.id;

    try {
        if (!description || !amount || !date) {
            return res.status(400).json({ message: 'Description, amount, and date are required.' });
        }

        const newExpense = new Expense({ description, amount, date, user: userId });
        await newExpense.save();
        console.log('New expense added:', newExpense);
        res.json(newExpense);
    } catch (error) {
        console.error('Error saving expense:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// PUT /expenses/:id
// Update an expense
router.put('/:id', async (req, res) => {
    const { description, amount, date } = req.body;

    try {
        const expense = await Expense.findById(req.params.id);
        if (expense) {
            expense.description = description || expense.description;
            expense.amount = amount || expense.amount;
            expense.date = date || expense.date;
            const updatedExpense = await expense.save();
            res.json(updatedExpense);
        } else {
            res.status(404).json({ message: 'Expense not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE /expenses/:id
// Delete an expense
router.delete('/:id', async (req, res) => {
    try {
        const expense = await Expense.findByIdAndDelete(req.params.id);
        if (expense) {
            res.json({ message: 'Expense removed' });
        } else {
            res.status(404).json({ message: 'Expense not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
