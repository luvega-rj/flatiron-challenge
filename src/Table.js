import React from 'react';
 
function Table(props) {
  const { transactions, handleSort, handleDelete } = props;

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => handleSort('date')}>Date</th>
          <th onClick={() => handleSort('description')}>Description</th>
          <th onClick={() => handleSort('amount')}>Amount</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(transaction => (
          <tr key={transaction.id}>
            <td>{transaction.date}</td>
            <td>{transaction.description}</td>
            <td style={{ color: transaction.amount >= 0 ? 'green' : 'red' }}>
              {transaction.amount >= 0 ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
            </td>
            <td>
              <button onClick={() => handleDelete(transaction.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;