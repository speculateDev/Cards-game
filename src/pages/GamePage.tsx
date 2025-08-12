import ReturnBtn from "../components/ReturnBtn";

function GamePage({
  setDifficulty,
  children,
}: {
  setDifficulty: React.Dispatch<React.SetStateAction<number | null>>;
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full relative">
      <ReturnBtn setDifficulty={setDifficulty} />
      {children}
    </div>
  );
}

export default GamePage;
