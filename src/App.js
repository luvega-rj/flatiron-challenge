import React, { useState, useEffect } from 'react';
import Form from './Form';
import Table from './Table';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/transactions')
 
      .then(response => response.json())
      .then(data => setTransactions(data));
  }, []);

  const handleSort = (type) => {
    const sortedTransactions = [...transactions].sort((a, b) => {
      if (a[type] < b[type]) {
        return -1;
      }
      if (a[type] > b[type]) {
        return 1;
      }
      return 0;
    });
    setTransactions(sortedTransactions);
  };

  const handleDelete = (id) => {
    const filteredTransactions = transactions.filter(transaction => transaction.id !== id);
    setTransactions(filteredTransactions);
  };

  const handleAddTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  return (
    <div className="container">
       
      <Table
        transactions={transactions}
        handleSort={handleSort}
        handleDelete={handleDelete}
      />
      <Form handleAddTransaction={handleAddTransaction} />
    </div>
  );
}

export default App;