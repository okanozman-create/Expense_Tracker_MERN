import dotenv from 'dotenv';
import axios from 'axios';
import Expense from './models/Expense.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const fetchData = async () => {
  try {
    const response = await axios.get('https://backend-nr2q.onrender.com/expenses');
    return response.data;
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await Expense.deleteMany();

    const expenses = await fetchData();
    await Expense.insertMany(expenses);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Expense.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};  

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}

