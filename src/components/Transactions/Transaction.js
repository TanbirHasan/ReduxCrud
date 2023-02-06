import React from "react";
import editImage from "../../assets/images/edit.svg"
import deleteImage from "../../assets/images/delete.svg"

const Transaction = ({transaction}) => {

  const {name,amount,type} = transaction || {}





  return (
    <li class={`transaction ${type}`}>
      <p>{name}</p>
      <div class="right">
        <p>{amount}</p>
        <button class="link">
          <img class="icon" src={editImage} />
        </button>
        <button class="link">
          <img class="icon" src={deleteImage} />
        </button>
      </div>
    </li>
  );
};

export default Transaction;
