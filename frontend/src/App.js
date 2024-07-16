import React from "react";
import ExpenseTracker from "./components/ExpenseTracker";
import Footer from "./components/Footer";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="">
      <Header />
      <ExpenseTracker />
      <Footer/>
    </div>
  );
};

export default App;
