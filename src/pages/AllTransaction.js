import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Transaction from "../components/Transactions/Transaction";
import {
  fetchTransactions,
  filterTransactions,
} from "../features/transaction/transactionSlice";

const AllTransaction = () => {
  const { isLoading, transactions, isError, error } = useSelector(
    (state) => state.transaction
  );
  const [type, setType] = useState("");
  const [active, setActive] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch, active]);

  console.log(transactions);

  const handleFilter = (data) => {
    setType(data);
    dispatch(filterTransactions(data));
  };

  // pagination

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + 7;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = transactions.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(transactions.length / 7);

  // Invoke when user click to request another page.
  const handleChangePage = (e, value) => {
    const newpage = value - 1;
    console.log(value);
    const newOffset = (newpage * 7) % transactions.length;

    console.log(
      `User requested page number ${newpage}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  // decide what to render

  let content = null;

  if (isLoading) <p>Loading...</p>;

  if (!isLoading && isError) content = <p>There is an error</p>;

  if (!isLoading && !isError && currentItems?.length > 0) {
    content = currentItems.map((t) => (
      <Transaction key={t.id} transaction={t} />
    ));
  }

  if (!isLoading && !isError && currentItems?.length === 0) {
    content = <p>No transaction found</p>;
  }
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <p class="second_heading">Your Transactions:</p>
      <form>
        <div class="form-group radio">
          <div class="radio_group">
            <input
              type="radio"
              value="income"
              name="type"
              checked={type === "income"}
              onChange={(e) => handleFilter("income")}
              required
            />
            <label>Income</label>
          </div>
          <div class="radio_group">
            <input
              type="radio"
              value="expense"
              checked={type === "expense"}
              name="type"
              placeholder="Expense"
              onChange={() => handleFilter("expense")}
            />
            <label>Expense</label>
          </div>
          <button onCLick={() => setActive(true)}>Reset</button>
        </div>
      </form>
      <div className="text-end"></div>

      <div class="conatiner_of_list_of_transactions">
        <ul>{content}</ul>
      </div>
      <Pagination onChange={handleChangePage} count={pageCount} />
    </div>
  );
};

export default AllTransaction;
