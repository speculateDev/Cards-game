function StartPage({
  setDifficulty,
}: {
  setDifficulty: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen h-full w-full">
      <h1 className="sm:text-8xl text-3xl font-extrabold text-gray-300 text-shadow-md text-shadow-white/50">
        Memory Game
      </h1>

      <div className="flex sm:gap-6 gap-3 mt-9">
        <button
          onClick={() => setDifficulty(1)}
          className="btn btn-outline btn-scale"
        >
          Easy
        </button>
        <button
          onClick={() => setDifficulty(2)}
          className="btn btn-outline btn-scale"
        >
          Medium
        </button>
        <button
          onClick={() => setDifficulty(3)}
          className="btn btn-outline btn-scale"
        >
          Hard
        </button>
      </div>
    </div>
  );
}

export default StartPage;
