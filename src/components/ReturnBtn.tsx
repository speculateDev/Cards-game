import Arrow from "../assets/leftArrow.svg";

export default function ReturnBtn({
  setDifficulty,
}: {
  setDifficulty: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  return (
    <button
      onClick={() => setDifficulty(null)}
      className="btn-outline p-3 rounded-full absolute left-5 top-5  cursor-pointer font-extrabold transition-colors duration-300"
    >
      <Arrow />
    </button>
  );
}
