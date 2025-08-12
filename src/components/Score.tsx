function Score({ score, bestScore }: { score: number; bestScore: number }) {
  return (
    <div className="absolute right-6 top-6 text-3xl shadow-2xl shadow-white/60 border p-3">
      <div className="flex">
        <span className="mr-3">Score: </span>
        <span>{score}</span>
      </div>
      <div className="flex">
        <span className="mr-3">Best Score: </span>
        <span>{bestScore}</span>
      </div>
    </div>
  );
}

export default Score;
