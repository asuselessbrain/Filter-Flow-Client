const HandleResetBtn = ({handleReset}) => {
  return (
    <button
      onClick={handleReset}
      className="btn bg-pink-600 hover:bg-pink-700 text-white flex-1"
    >
      Reset
    </button>
  );
};

export default HandleResetBtn;
