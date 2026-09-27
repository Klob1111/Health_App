import BackButton from "./components/BackButton";

const ExerciseMod = ({ toModMenu, maincolor }) => {
  return (
    <div className="w-100 h-100" style={{ backgroundColor: maincolor }}>
      <BackButton toModMenu={toModMenu} />
    </div>
  );
};

export default ExerciseMod;
