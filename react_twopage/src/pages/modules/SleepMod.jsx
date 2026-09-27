import BackButton from "./components/BackButton";

const SleepMod = ({ toModMenu, maincolor }) => {
  return (
    <div className="w-100 h-100" style={{ backgroundColor: maincolor }}>
      <BackButton toModMenu={toModMenu} />
    </div>
  );
};

export default SleepMod;
