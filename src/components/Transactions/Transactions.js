import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../features/transaction/transactionSlice";

import Transaction from "./Transaction";

const Transactions = () => {
  const { isLoading, transactions, isError, error } = useSelector(
    (state) => state.transaction
  );

  const dispatch = useDispatch()

  useEffect(() => {
   dispatch(fetchTransactions())
  },[dispatch])

  console.log(transactions)
  // decide what to render

  let content = null;

  if (isLoading) <p>Loading...</p>;

  if (!isLoading && isError) content = <p>There is an error</p>;

  if (!isLoading && !isError && transactions?.length > 0) {
    content = transactions.map((t) => (
      <Transaction key={t.id} transaction={t} />
    ));
  }

  if (!isLoading && !isError && transactions?.length === 0) {
    content = <p>No transaction found</p>;
  }
  return (
    <>
      <p class="second_heading">Your Transactions:</p>

      <div class="conatiner_of_list_of_transactions">
        <ul>{content}</ul>
      </div>
    </>
  );
};

export default Transactions;
