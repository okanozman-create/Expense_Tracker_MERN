import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CircularInput,
  CircularTrack,
  CircularProgress,
  CircularThumb,
} from "react-circular-input";

const ExpenseTracker = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const fetchExpenses = async () => {
      const token = localStorage.getItem("awsToken");
      if (!token) {
        // console.error('Token not found in localStorage');
        return;
      }
      try {
        // const response = await axios.get("http://localhost:5000/expenses", {
          const response = await axios.get("https://backend-nr2q.onrender.com/expenses", {
          headers: {
            "x-auth-token": token,
          },
        });
        // console.log("Fetched expenses:", response.data);

        setTransactions(response.data);

        const totalBalance = response.data.reduce(
          (acc, transaction) => acc + transaction.amount,
          0
        );
        setBalance(totalBalance);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  const addExpense = async () => {
    const parsedAmount = parseFloat(amount);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    const newExpense = {
      description: description,
      amount: parsedAmount,
      date: new Date(),
    };

    try {
      const token = localStorage.getItem("awsToken");
      const response = await axios.post(
        // "http://localhost:5000/expenses",
        "https://backend-nr2q.onrender.com/expenses",
        newExpense,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        setBalance((prevBalance) => prevBalance + parsedAmount);
        setTransactions((prevTransactions) => [
          ...prevTransactions,
          response.data,
        ]);
        setDescription("");
        setAmount("");
      } else {
        console.error("Failed to add expense:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const handleDelete = async (index) => {
    const transactionToDelete = transactions[index];

    try {
      await axios.delete(
        // `http://localhost:5000/expenses/${transactionToDelete._id}`
        `https://backend-nr2q.onrender.com/expenses/${transactionToDelete._id}`,
      );

      const updatedTransactions = [...transactions];
      const deletedAmount = updatedTransactions[index].amount;
      updatedTransactions.splice(index, 1);

      setTransactions(updatedTransactions);
      setBalance((prevBalance) => prevBalance - deletedAmount);
    } catch (error) {
      console.error("Failed to delete transaction:", error);
    }
  };

  return (
    <section className="section flex flex-col items-s">
      <div className="px-2">
        <div className="flex flex-col items-center gap-9">
          <h2 className="text-4xl text-center text-black font-extrabold">
            You've spent
          </h2>

          <div>
            <CircularInput value={balance / 100}>
              <CircularTrack />
              <CircularProgress />
              <CircularThumb />
              <text x={100} y={100} textAnchor="middle" dy=".3em" fontSize="40">
                ${balance.toFixed(2)} <br />
              </text>
            </CircularInput>
          </div>
        </div>

        <div className="mt-5 mb-8">
          <form className="flex max-w-full px-12 py-2 gap-1">
            <input
              placeholder="Expense Name"
              type="text"
              className="rounded-sm border border-stone-500 shadow-lg"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <input
              placeholder="Amount"
              type="number"
              className="rounded-sm border border-stone-500 shadow-lg"
              id="amount"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />

            <button
              className="block rounded-lg bg-[#3b82f6] cursor-pointer p-3 text-white font-bold hover:bg-slate-700 transition-all duration-300"
              type="button"
              onClick={addExpense}
            >
              Add Expense
            </button>
          </form>
        </div>

        <h2
          className={`${
            transactions.length !== 0 ? "block" : "hidden"
          } text-3xl mb-7 text-left pl-2 underline decoration-slate-500`}
        >
          Expense List
        </h2>

        <ul className="flex flex-col gap-3">
          {transactions.map((transaction, index) => (
            <li
              key={transaction._id}
              className="flex justify-between items-center bg-white shadow-xl pl-2"
            >
              <span className="text-left uppercase">{`${
                transaction.description
              }: $${transaction.amount.toFixed(2)}`}</span>
              <button
                onClick={() => handleDelete(index)}
                className="bg-slate-500 hover:bg-slate-700 text-white py-1 px-2 rounded-md"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ExpenseTracker;
