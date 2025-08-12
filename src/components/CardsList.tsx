import { useEffect, useState } from "react";
import type { Card as CardType } from "../schemas";
import CardComponent from "./Card";
import shuffle from "../hooks/useShuffle";

function CardsList({
  defaultCards,
  difficulty,
  setGameOver,
  setScore,
  setBestScore,
  score,
  bestScore,
}: {
  defaultCards: CardType[] | undefined;
  difficulty: number;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setBestScore: React.Dispatch<React.SetStateAction<number>>;
  score: number;
  bestScore: number;
}) {
  const [numCards, setNumCards] = useState<number>(3);
  const [cards, setCards] = useState<CardType[]>([]);
  const [clicked, setClicked] = useState<number[]>([]);
  const [flipped, setFlipped] = useState<boolean>(false);

  useEffect(() => {
    setCards(shuffle(defaultCards));
  }, [defaultCards, clicked]);

  // Get number of cards from difficulty
  useEffect(() => {
    if (difficulty === 1) {
      setNumCards(3);
    } else if (difficulty === 2) {
      setNumCards(4);
    } else if (difficulty === 3) {
      setNumCards(6);
    } else return;
  }, [difficulty]);

  if (cards.length <= 0)
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <p className="text-5xl font-extrabold">There are no cards for now!</p>
      </div>
    );

  return (
    <div
      className={`min-h-screen ${
        numCards === 3 || numCards === 4
          ? "flex flex-col sm:flex-row gap-3"
          : "flex flex-col md:grid lg:grid-cols-[256px_256px_256px] md:grid-cols-[256px_256px]"
      }  gap-6 justify-center items-center pt-[160px] pb-4 px-4`}
    >
      {cards?.slice(0, numCards).map((card) => (
        <CardComponent
          setScore={setScore}
          setGameOver={setGameOver}
          clicked={clicked}
          setClicked={setClicked}
          card={card}
          key={card.id}
          flipped={flipped}
          setFlipped={setFlipped}
          setBestScore={setBestScore}
          score={score}
          bestScore={bestScore}
        />
      ))}
    </div>
  );
}

export default CardsList;
