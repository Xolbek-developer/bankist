import React, { useRef, useState } from "react";
import logo from "../assets/logo.png";

let currentAccount;
const Header = ({ accounts, selectAccount }) => {
  const [message, setMessage] = useState("Log in to get started");
  const inputLoginUsername = useRef();
  const inputLoginPin = useRef();

  const login = (e) => {
    e.preventDefault();

    currentAccount = accounts.find(
      (acc) => acc.username === inputLoginUsername.current.value
    );

    if (currentAccount?.pin === Number(inputLoginPin.current.value)) {
      // Display UI and message
      setMessage(`Welcome back, ${currentAccount.owner.split(" ")[0]}`);

      // Clear input fields
      inputLoginUsername.current.value = inputLoginPin.current.value = "";

      selectAccount(currentAccount);
    }
  };

  // accounts

  return (
    <nav>
      <p className="welcome">{message}</p>
      <img src={logo} alt="Logo" className="logo" />
      <form className="login">
        <input
          type="text"
          placeholder="user"
          className="login__input login__input--user"
          ref={inputLoginUsername}
        />
        {/* <!-- In practice, use type="password" --> */}
        <input
          type="text"
          placeholder="PIN"
          maxLength="4"
          className="login__input login__input--pin"
          ref={inputLoginPin}
        />
        <button onClick={login} className="login__btn">
          &rarr;
        </button>
      </form>
    </nav>
  );
};

export default Header;
