import React, { useEffect, useState } from 'react';

  //function to calculate reward points for each trnasaction
export const calculateRewardPoints = (amount) => {
    let points = 0;
    if (amount > 100) {
      points += (amount - 100) * 2; //2 points for every dollar over 100
      points += 50; //1 point for every dollar between 50 and 100
    } else if (amount > 50) {
      points += (amount - 50) * 1; //1 point for every dollar between 50 and 100
    }

    return points;
  }

//component to render transaction rewards points
const TransactionList = () => {
  const [transactions, setTransactions] = useState([]); //state to set transactions
  const [loading, setLoading] = useState(true); //state to set data loading 
  const [error, setError] = useState(null); //state to set errors
  const [rewardSummary, setRewardSummary] = useState({}); //state to set reward summary

  const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  //useEffect to perform side effects in our component
  useEffect(() => {
    //function to fetch transaction data from api
    const fetchTransactions = async () => {
      //try catch block for error and exception handling
      try {
        await fetch('http://localhost:5000/api/transactions')
          .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              throw new Error('Network response is not ok');
            }
          })
          .then(data => {
            setTransactions(data);
            calculateRewards(data); //calculate rewards after fetching data
            setLoading(false);
          })
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    };

    fetchTransactions();
  }, []);

  //function to calculate rewards
  const calculateRewards = (transactions) => {
    const rewards = {};

    transactions.map((transaction) => {
      const month = new Date(transaction.Date).getMonth() + 1; //getting the month from the date
      const points = calculateRewardPoints(transaction.Amount); //calculating reward points

      //initialising rewards object with the customer ID
      if (!rewards[transaction.customerId]) {
        rewards[transaction.customerId] = { total: 0, months: {} }
      }

      //initialising rewards object month
      if (!rewards[transaction.customerId].months[month]) {
        rewards[transaction.customerId].months[month] = 0;
      }

      // setting value of points per month
      rewards[transaction.customerId].months[month] += points;

      // setting value of total points 
      rewards[transaction.customerId].total += points;
    });

    setRewardSummary(rewards)
  }

  if (loading) {
    //loading state
    return <div>loading transactions...</div>;
  }

  if (error) {
    //error state
    return <div>Error fetching transactions: {error}</div>;
  }
  return (
    <div>
      <h2>Reward Points Summary</h2>
      <ol>
        {/* rendering customer total and per month points */}
        {Object.keys(rewardSummary)?.map((customerId) => (
          <li key={customerId}>
            <h3>Customer Id: {customerId}</h3>
            <p>Total Points: {rewardSummary[customerId].total}</p>
            <ul>
              {Object.keys(rewardSummary[customerId].months)?.map((month) => (
                <li key={month}>
                  Points for month {monthList[month]}: {rewardSummary[customerId].months[month]}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default TransactionList;