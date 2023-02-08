import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchTransactions } from "../../features/transaction/transactionSlice";

import Transaction from "./Transaction";

const Transactions = () => {
  const {isLoading, transactions, isError, error,deleteOperation } = useSelector(
    (state) => state.transaction
  );

  const dispatch = useDispatch()

  useEffect(() => {
   dispatch(fetchTransactions())
  },[dispatch,deleteOperation])

  console.log(transactions)
  // decide what to render

  let content = null;

  if (isLoading) <p>Loading...</p>;

  if (!isLoading && isError) content = <p>There is an error</p>;

  if (!isLoading && !isError && transactions?.length > 0) {
    const latest = transactions.slice(Math.max(transactions.length - 5, 1))
    content = latest.map((t) => (
      <Transaction key={t.id} transaction={t} />
    ));
  }

  if (!isLoading && !isError && transactions?.length === 0) {
    content = <p>No transaction found</p>;
  }
  return (
    <>
      <p class="second_heading">Your Transactions:</p>
      <div className="text-end">
        <Link to="/transactions">
        <button style={{padding : '10px 20px', backgroundColor : 'skyblue', cursor : 'pointer'}}>View All</button>
        </Link>
    
      </div>
      

      <div class="conatiner_of_list_of_transactions">
        <ul>{content}</ul>
      </div>
    </>
  );
};

export default Transactions;
