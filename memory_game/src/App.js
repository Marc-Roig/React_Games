import './App.css';
import { useEffect, useState } from 'react';

import cardImages from './constants/cardImages';
import Card from './components/Card';

function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // Card array initialization
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
  }

  useEffect(() => {
    shuffleCards()
  }, []);

  // Handle Card Choice 
  const handleChoice = (card) => {
    if (card.matched) return;
    if (card === choiceOne) return;

    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  // Reset turn after selecting second card
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  }

  // Check if cards match
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => prevCards.map(
          card => card.src === choiceOne.src ? { ...card, matched: true } : card
        ))
        resetTurn();
      } else {
        setTimeout(resetTurn, 1000)
      }
    }
    return () => { }
  }, [choiceOne, choiceTwo])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card =>
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        )}
      </div>

      <p className='turns'>Turns: {turns}</p>
    </div>
  );
}

export default App;
