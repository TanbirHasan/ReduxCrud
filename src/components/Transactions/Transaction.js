import React from "react";
import editImage from "../../assets/images/edit.svg"
import deleteImage from "../../assets/images/delete.svg"
import { useDispatch } from "react-redux";
import { editActive, removeTransactions } from "../../features/transaction/transactionSlice";
import numberWithCommas from "../../utils/thousandSeparator";

const Transaction = ({transaction}) => {

  const {id,name,amount,type} = transaction || {}


const dispatch = useDispatch();

const handleEdit = () => {
  dispatch(editActive(transaction))
}

const handleDelete = (id) => {
  dispatch(removeTransactions(id))
}


  return (
    <li class={`transaction ${type}`}>
      <p>{name}</p>
      <div class="right">
        <p>{numberWithCommas(amount)}</p>
        <button class="link" onClick={handleEdit}>
          <img class="icon" src={editImage} />
        </button>
        <button class="link" onClick={() => handleDelete(id)}>
          <img class="icon" src={deleteImage} />
        </button>
      </div>
    </li>
  );
};

export default Transaction;
