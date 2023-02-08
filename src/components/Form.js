import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTransaction } from "../features/transaction/transactionSlice";

import { changeTransactions } from "../features/transaction/transactionSlice";

const Form = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();

  const { isLoading, isError } = useSelector((state) => state.transaction);

  const { editing } = useSelector((state) => state.transaction);

  // const editing = useSelector(state => state.editing)

  // listen for editmodeactive

  useEffect(() => {
    const { id, name, amount, type } = editing || {};
    if (id) {
      setEditMode(true);
      setName(name);
      setAmount(amount);
      setType(type);
    } else {
      reset();
    }
  }, [editing]);

  const handleCreate = (e) => {
    e.preventDefault();

    dispatch(
      createTransaction({
        name,
        type,
        amount: Number(amount),
      })
    );

    reset();
  };


  const handleUpdate = (e) => {
    e.preventDefault();

    dispatch(changeTransactions({
      id : editing?.id,
      data : {
        name : name,
        amount:amount,
        type:type
      }

    }))
    reset()
  }

  const reset = () => {
    setName("");
    setType("");
    setAmount("");
  };

  const cancleEdit = () => {
    reset()
    setEditMode(false);
  };
  return (
    <div class="form">
      <h3>Add new transaction</h3>

      <form onSubmit={editMode ? handleUpdate : handleCreate}>
        <div class="form-group">
          <label for="transaction_name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div class="form-group radio">
          <label>Type</label>
          <div class="radio_group">
            <input
              type="radio"
              value="income"
              name="type"
              checked={type === "income"}
              onChange={(e) => setType("income")}
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
              onChange={(e) => setType("expense")}
            />
            <label>Expense</label>
          </div>
        </div>

        <div class="form-group">
          <label for="transaction_amount">Amount</label>
          <input
            type="number"
            placeholder="Enter Amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button disabled={isLoading} class="btn" type="submit">
          {editMode ? "Update Transaction" : "Add Transaction"}
        </button>
        {!isLoading && isError && <p>There is an error occured</p>}
      </form>
      {editMode && (
        <button class="w-full p-2 mt-5 bg-red-500" onClick={cancleEdit}>
          
          Cancel Edit
        </button>
      )}
    </div>
  );
};

export default Form;
