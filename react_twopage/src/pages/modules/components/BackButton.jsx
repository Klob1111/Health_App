const BackButton = ({ toModMenu }) => {
  const icon = "bi bi-arrow-left-short p-0 position-fixed top-0 ps-2";
  return (
    <button className="btn border-0 bg-none" onClick={toModMenu}>
      <i className={icon} style={{ fontSize: "60px" }} />
    </button>
  );
};

export default BackButton;
