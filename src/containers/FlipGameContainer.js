import React, { useState, useEffect } from "react";
import CardComponent from "../components/CardComponent";

const getShuffledArr = arr => {
  const newArr = arr.slice();
  for (let i = newArr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  return newArr;
};

const generatedId = () =>
  Math.random()
    .toString(36)
    .substr(2, 9);

const generateList = listFlipData => {
  const flipcards = getShuffledArr(listFlipData.concat(listFlipData));
  return flipcards.map(e => {
    const freezeObj = Object.assign({}, e);
    freezeObj.id = generatedId();
    freezeObj.fliped = false;
    return freezeObj;
  });
};

const FlipGameContainers = ({ cards }) => {
  const [state, setState] = useState({
    cards: generateList(cards),
    gameTurn: 1,
    isWinned: false,
    onAnimation: false
  });

  useEffect(() => {
    if (!state.isWinned && !state.cards.find(card => !card.win)) {
      setState({ ...state, isWinned: true });
    }
  }, [state]);

  const viewFlipCard = id => {
    const cardsUpdate = state.cards.map(card => {
      const copyCard = { ...card };
      if (copyCard.id === id) copyCard.fliped = true;
      return copyCard;
    });

    if (!state.onAnimation) {
      setState({
        ...state,
        gameTurn: state.gameTurn === 1 ? 2 : 1,
        cards: cardsUpdate,
        onAnimation: state.gameTurn === 2
      });
    }
    return cardsUpdate;
  };

  const findCardsWin = (cardsUpdate, id) => {
    let indexWin;
    return {
      cardsToUpdate: cardsUpdate.map(card => {
        const copyCard = { ...card };
        if (copyCard.id === id) {
          const res = cardsUpdate.find(
            cardFind =>
              cardFind.content === card.content && cardFind.id !== card.id
          );

          if (res.fliped) {
            copyCard.win = true;
            copyCard.fliped = true;
            indexWin = res.id;
          }
        }
        return copyCard;
      }),
      indexWin
    };
  };

  const toogleFlipCard = (id, cardsUpdate) => {
    const { cardsToUpdate, indexWin } = findCardsWin(cardsUpdate, id);

    if (indexWin) {
      const cardWin = cardsToUpdate.find(res => res.id === indexWin);
      cardWin.win = true;
      cardWin.fliped = true;
    }

    //reset toggle all cards
    if (state.gameTurn === 2 && !indexWin) {
      cardsToUpdate.map(card => {
        if (!card.win) card.fliped = false;
        return card;
      });
    }

    if (!state.onAnimation && state.gameTurn === 2) {
      setTimeout(() => {
        setState({
          ...state,
          cards: cardsToUpdate,
          gameTurn: state.gameTurn === 1 ? 2 : 1,
          onAnimation: false
        });
      }, 650);
    }
  };

  const handleChange = id => {
    const cardUpdate = viewFlipCard(id);
    toogleFlipCard(id, cardUpdate);
  };

  const generateCards = () => {
    return Array.from(state.cards).map((cardInfo, id) => {
      return (
        <CardComponent
          key={id}
          handleChange={handleChange}
          cardInfo={cardInfo}
        />
      );
    });
  };

  return (
    <div className="App">
      <h1>Flip Game</h1>
      {state.isWinned && <h2>Victory !!!</h2>}
      {generateCards()}
    </div>
  );
};

export default FlipGameContainers;
