import "./App.css";
import Dice from "./components/Dice";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [diceArray, setDiceArray] = useState(rollNewDie);
  const [win, setWin] = useState(false);

  useEffect(() => {
    //if all dice have the same value as fisrt dice
    //game ends
    let winCondtion = diceArray[9].value;
    console.log(winCondtion);
    let isTheSame = diceArray.every(
      (dice) => diceArray[0].value === dice.value
    );
    let isHeld = diceArray.every((dice) => diceArray[0].isHeld === dice.isHeld);
    if (isTheSame && isHeld) {
      setWin(true);
      // alert("GAME WON WOHO!");
    }
  }, [diceArray]);

  function randomNumber() {
    return Math.floor(Math.random() * 6) + 1;
  }

  //creating dice objects and adding them to state
  function rollNewDie() {
    let diceValue = [];
    for (let i = 0; i < 10; i++) {
      diceValue[i] = {
        value: randomNumber(),
        isHeld: false,
        id: nanoid(),
      };
    }
    return diceValue;
  }

  //relloring all of the dices
  function rellor() {
    setDiceArray((prevDiceArray) => {
      if (win !== true) {
        return prevDiceArray.map((dice) => {
          return dice.isHeld
            ? dice
            : { ...dice, value: randomNumber(), id: nanoid() };
        });
      } else {
        setWin(false);
        return rollNewDie();
      }
    });
  }

  //creating list of DOM elements <Dice/>
  const diceList = diceArray.map((dice) => {
    console.log(dice.isHeld);
    return (
      <Dice
        value={dice.value}
        key={dice.id}
        isHeld={dice.isHeld}
        id={dice.id}
        handleToggle={holdDice}
      />
    );
  });

  //holding function thtat toggles dices between hold and unhold
  //takes id of dice that have to be toggled
  function holdDice(id) {
    setDiceArray((prevDiceArray) => {
      return prevDiceArray.map((dice) => {
        return {
          ...dice,
          isHeld: id === dice.id ? !dice.isHeld : dice.isHeld,
        };
      });
    });
  }

  return (
    <div className="App">
      <main className="container">
        <h1>{win ? "You WON " : "Tenzis Game"}</h1>
        {win && <Confetti />}
        <p>
          Roll until all dice are the same. Click die to freeze it's current
          value
        </p>
        {<div className="dice-wrapper">{diceList}</div>}
        <button className="dice-roll" onClick={rellor}>
          {win ? "Start new Game" : "Roll"}
        </button>
      </main>
    </div>
  );
}

export default App;
