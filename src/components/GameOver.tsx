function GameOver({
  setGameOver,
  setDifficulty,
}: {
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  setDifficulty: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  return (
    <div className="h-full w-full absolute z-3">
      <div className="absolute inset-0 bg-black/90 -z-2" />
      <div className="absolute flex flex-col gap-5 text-7xl left-1/2 top-1/2 -translate-1/2">
        <p className="font-bold tracking-widest">Game Over</p>

        <button
          className="btn btn-text"
          onClick={() => {
            setGameOver(false);
            setDifficulty(null);
          }}
        >
          Restart
        </button>
      </div>
    </div>
  );
}

export default GameOver;
