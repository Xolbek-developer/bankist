import React, { useEffect, useRef, useState } from "react";

let dispBalance;
const Main = ({
  movements,
  interestRate,
  accounts,
  userName,
  userPin,
  acnts,
  crtAcc
}) => {
  const amount = useRef();
  const inputTransferTo = useRef();
  const closeInputUsr = useRef();
  const closeInputPin = useRef();
  const [incomes, setIncomes] = useState();
  const [out, setOut] = useState();
  const [interest, setInterest] = useState();
  useEffect(() => {
    check();
  });
  const check = () => {
    dispBalance = movements.reduce((acc, mov) => acc + mov, 0);
    setIncomes(
      movements.filter((mov) => mov > 0).reduce((acc, mov) => acc + mov, 0)
    );

    setOut(
      movements.filter((mov) => mov < 0).reduce((acc, mov) => acc + mov, 0)
    );

    setInterest(
      movements
        .filter((mov) => mov > 0)
        .map((deposit) => (deposit * interestRate) / 100)
        .filter((int, i, arr) => {
          return int >= 1;
        })
        .reduce((acc, int) => acc + int, 0)
    );
  };

  const btnTransfer = (e) => {
    e.preventDefault();
    const receiverAcc = accounts.find(
      (acc) => acc.username === inputTransferTo.current.value
    );

    if (
      amount.current.value > 0 &&
      receiverAcc &&
      receiverAcc.username !== userName
    ) {
      movements.push(Number(-amount.current.value));
      receiverAcc.movements.push(Number(amount.current.value));
      console.log("Hello guys");
      console.log(receiverAcc);
      check();
    }
    amount.current.value = inputTransferTo.current.value = "";
    console.log("Bye guys");
  };

  const closeBtn = (e) => {
    e.preventDefault();
    if (
      closeInputUsr.current.value === userName &&
      Number(closeInputPin.current.value) === userPin
    ) {
      const index = accounts.findIndex((acc) => acc.username === userName);
      accounts.splice(index, 1);
      console.log(accounts);
      acnts(accounts);
      crtAcc(false)
      check();
    }
  };
  return (
    <main className={"app"}>
      {/* <!-- BALANCE --> */}
      <div className="balance">
        <div>
          <p className="balance__label">Current balance</p>
          <p className="balance__date">
            As of <span className="date">05/03/2037</span>
          </p>
        </div>
        <p className="balance__value">{dispBalance}€</p>
      </div>

      {/* <!-- MOVEMENTS --> */}
      <div className="movements">
        {movements.map((mov, i) => (
          <div className="movements__row" key={i}>
            <div
              className={`movements__type movements__type--${
                mov >= 0 ? "deposit" : "withdrawal"
              }`}
            >
              {mov >= 0 ? `${i + 1} deposite` : `${i + 1} withdrawal`}
            </div>
            <div className="movements__date">3 days ago</div>
            <div className="movements__value">{mov}€</div>
          </div>
        ))}
      </div>

      {/* <!-- SUMMARY --> */}
      <div className="summary">
        <p className="summary__label">In</p>
        <p className="summary__value summary__value--in">{incomes}€</p>
        <p className="summary__label">Out</p>
        <p className="summary__value summary__value--out">{Math.abs(out)}€</p>
        <p className="summary__label">Interest</p>
        <p className="summary__value summary__value--interest">{interest}€</p>
        <button className="btn--sort"> SORT</button>
      </div>

      {/* <!-- OPERATION: TRANSFERS --> */}
      <div className="operation operation--transfer">
        <h2>Transfer money</h2>
        <form className="form form--transfer">
          <input
            type="text"
            className="form__input form__input--to"
            ref={inputTransferTo}
          />
          <input
            type="number"
            className="form__input form__input--amount"
            ref={amount}
          />
          <button
            className="form__btn form__btn--transfer"
            onClick={btnTransfer}
          >
            &rarr;
          </button>
          <label className="form__label">Transfer to</label>
          <label className="form__label">Amount</label>
        </form>
      </div>

      {/* <!-- OPERATION: LOAN --> */}
      <div className="operation operation--loan">
        <h2>Request loan</h2>
        <form className="form form--loan">
          <input
            type="number"
            className="form__input form__input--loan-amount"
          />
          <button className="form__btn form__btn--loan">&rarr;</button>
          <label className="form__label form__label--loan">Amount</label>
        </form>
      </div>

      {/* <!-- OPERATION: CLOSE --> */}
      <div className="operation operation--close">
        <h2>Close account</h2>
        <form className="form form--close">
          <input
            type="text"
            className="form__input form__input--user"
            ref={closeInputUsr}
          />
          <input
            type="password"
            maxLength="6"
            className="form__input form__input--pin"
            ref={closeInputPin}
          />
          <button className="form__btn form__btn--close" onClick={closeBtn}>
            &rarr;
          </button>
          <label className="form__label">Confirm user</label>
          <label className="form__label">Confirm PIN</label>
        </form>
      </div>

      {/* <!-- LOGOUT TIMER --> */}
      <p className="logout-timer">
        You will be logged out in <span className="timer">05:00</span>
      </p>
    </main>
  );
};

export default Main;
