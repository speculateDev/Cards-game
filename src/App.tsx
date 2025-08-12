import { useEffect, useState } from "react";
import type { Card } from "./schemas";

import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import CardsList from "./components/CardsList";
import Spinner from "./components/Spinner";
import GameOver from "./components/GameOver";
import useLocalStorage from "./hooks/useLocalStorage";
import Score from "./components/Score";

function App() {
  const [difficulty, setDifficulty] = useState<number | null>(null);
  const [cards, setCards] = useState<Card[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [bestScore, setBestScore] = useLocalStorage<number>("bestScore");
  const [score, setScore] = useState(0);

  useEffect(() => {
    async function fetchCards() {
      setIsLoading(true);
      const res = await fetch(
        "https://cards-game-321.netlify.app/.netlify/functions/index"
      );
      const data = await res.json();
      setCards(data);
      setIsLoading(false);
    }

    fetchCards();
  }, []);

  if (isLoading)
    return (
      <div className="h-screen w-full relative">
        <div
          style={{
            backgroundImage: "url(/images/cover.png)",
            backgroundSize: "cover",
            backgroundOrigin: "center",
          }}
          className="absolute inset-0 -z-2"
        />
        <div className="absolute inset-0 bg-black/90 -z-1"></div>
        <Spinner />
      </div>
    );

  return (
    <div className="min-h-screen w-full relative">
      <div
        style={{
          backgroundImage: "url(/images/cover.png)",
          backgroundSize: "cover",
          backgroundOrigin: "center",
        }}
        className="absolute inset-0 -z-2"
      />
      <div className="absolute inset-0 bg-black/90 -z-1"></div>

      <div className="z-10 h-full w-full">
        {difficulty ? (
          <GamePage setDifficulty={setDifficulty}>
            {gameOver && (
              <GameOver
                setDifficulty={setDifficulty}
                setGameOver={setGameOver}
              />
            )}
            <Score score={score} bestScore={bestScore} />
            <CardsList
              setGameOver={setGameOver}
              defaultCards={cards}
              difficulty={difficulty}
              setScore={setScore}
              setBestScore={setBestScore}
              score={score}
              bestScore={bestScore}
            />
          </GamePage>
        ) : (
          <StartPage setDifficulty={setDifficulty} />
        )}
      </div>
    </div>
  );
}

export default App;
