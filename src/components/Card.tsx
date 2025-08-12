import { useState, type MouseEvent, useCallback } from "react";
import type { Card } from "../schemas";
import BackSide from "../assets/back-side.png";

function CardComponent({
  clicked,
  setClicked,
  card,
  flipped,
  setFlipped,
  setGameOver,
  score,
  setScore,
  bestScore,
  setBestScore,
}: {
  clicked: number[];
  card: Card | undefined;
  setClicked: React.Dispatch<React.SetStateAction<number[]>>;
  flipped: boolean;
  setFlipped: React.Dispatch<React.SetStateAction<boolean>>;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  score: number;
  bestScore: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setBestScore: React.Dispatch<React.SetStateAction<number>>;
}) {
  function throttle<T extends (...args: Parameters<T>) => ReturnType<T>>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let lastCall = 0;
    return (...args: Parameters<T>) => {
      const now = new Date().getTime();
      if (now - lastCall < delay) return;
      lastCall = now;
      return func(...args);
    };
  }

  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const onMouseMove = useCallback(
    throttle((e: MouseEvent<HTMLDivElement>) => {
      const card = e.currentTarget;
      const box = card.getBoundingClientRect();
      const x = e.clientX - box.left;
      const y = e.clientY - box.top;
      const centerX = box.width / 2;
      const centerY = box.height / 2;
      const rotateX = (y - centerY) / 7;
      const rotateY = (centerX - x) / 7;

      setRotate({ x: rotateX, y: rotateY });
    }, 100),
    []
  );

  const onMouseLeave = () => setRotate({ x: 0, y: 0 });
  const onClick = async () => {
    if (flipped) return;

    setFlipped(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (card) {
      if (clicked.includes(card.id)) {
        setGameOver(true);
        if (score > bestScore) setBestScore(score);
        setScore(0);
        return;
      }

      setClicked((prevState) => [...prevState, card?.id]);
      setScore((score) => ++score);
    }

    await new Promise((resolve) => setTimeout(resolve, 100));
    setFlipped(false);
  };

  return (
    <div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{ perspective: "1000px" }}
      className="relative w-64 h-80 cursor-pointer"
    >
      <div
        className="relative w-full h-full"
        style={{
          transform: `rotateY(${flipped ? 180 : 0}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.6s ease",
        }}
      >
        {/* Front */}
        <div
          style={{
            transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            transition: "transform 0.1s ease",
            border: "4px solid rgba(255, 255, 255)",
            boxSizing: "border-box",
          }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={card?.image}
            alt="Card front"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xl bg-black/60 rounded-md px-4 py-0.5 font-bold">
            <span>
              {card
                ? card?.name.slice(0, 1).toUpperCase() + card?.name.slice(1)
                : ""}
            </span>
          </div>
        </div>

        {/* Back */}
        <div
          style={{
            transform: `rotateY(180deg) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            transition: "transform 0.1s ease",
            boxSizing: "border-box",
          }}
          className="absolute inset-0"
        >
          <img
            src={BackSide}
            alt="Card back"
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default CardComponent;
