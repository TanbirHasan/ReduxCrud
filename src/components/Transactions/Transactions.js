import React from "react";

import Transaction from "./Transaction";

const Transactions = () => {
  return (
    <>
      <p class="second_heading">Your Transactions:</p>

      <div class="conatiner_of_list_of_transactions">
        <ul>
            <Transaction />
     
        </ul>
      </div>
    </>
  );
};

export default Transactions;
