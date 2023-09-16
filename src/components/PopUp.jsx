// eslint-disable-next-line react/prop-types
const Popup = ({ isOpen, children }) => {
  if (!isOpen) return null;
  return (
    <div className="popup-overlay">
      <div className="popup">
        <p className="text-center text-xl">
          Your Expense
        </p>
        {children}
      </div>
    </div>
  );
};

export default Popup;
