import React, { useState, useEffect } from 'react';
import Form from './Form';
import Table from './Table';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/transactions')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(transactions => setTransactions(transactions))
      .catch(error => console.error(error));
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
      {transactions && transactions.length > 0 ? (
        <Table
          transactions={transactions}
          handleSort={handleSort}
          handleDelete={handleDelete}
        />
      ) : (
        <p>Loading transactions...</p>
      )}
      <Form handleAddTransaction={handleAddTransaction} />
    </div>
  );
}

export default App;
