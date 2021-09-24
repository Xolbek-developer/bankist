import React, { useState } from "react";
import Header from "./components/header";
import "./App.css";
import Main from "./components/main";
const App = () => {
  const account1 = {
    owner: "Xolbek Xalilov",
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
  };

  const account2 = {
    owner: "Hello Gays",
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
  };
  const [currentAccount, setCurrentAccount] = useState();
  const accounts = [account1, account2];
  const [acnts, setAccounts] = useState(accounts);
  const createUserName = (accounts) => {
    accounts.forEach((acc) => {
      acc.username = acc.owner
        .toLowerCase()
        .split(" ")
        .map((name) => name[0])
        .join("");
    });
  };
  createUserName(accounts);
  console.log(accounts);
  return (
    <React.Fragment>
      <Header
        accounts={accounts}
        selectAccount={(currentAccount) => setCurrentAccount(currentAccount)}
      />
      {currentAccount && (
        <Main
          accounts={acnts}
          movements={currentAccount.movements}
          interestRate={currentAccount.interestRate}
          balance={currentAccount.balance}
          userName={currentAccount.username}
          userPin={currentAccount.pin}
          acnts={(accs) => setAccounts(accs)}
          crtAcc = {crt => setCurrentAccount(crt)}
        />
      )}
      <footer>&copy; by Jonas Schmedtmann.(From Udemy)</footer>
    </React.Fragment>
  );
};
export default App;
