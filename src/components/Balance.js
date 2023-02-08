import React from 'react'
import { useSelector } from 'react-redux'
import numberWithCommas from '../utils/thousandSeparator'

const Balance = () => {

  const {transactions}= useSelector(state => state.transaction)

  const calcullateTransactions = transactions => {
    let income = 0;
    transactions.forEach(item => {
      const {type,amount}  = item;
        if(type === 'income'){
           income += amount;
        }
        else{
          income -= amount

        }
      
    });
    return income;
  }
  return (
    <div class="top_card">
    <p>Your Current Balance</p>
    {
      transactions?.length > 0 ? <h3>
      {numberWithCommas(calcullateTransactions(transactions))}
  </h3>: <h3>0 tk</h3>
    }
    
</div>
  )
}

export default Balance