type Tprops={
    onClick:()=>void
}
const Backdrop:React.FC<Tprops>= ({ onClick }) => {
  return (
    <div
      className="fixed inset-0 bg-black opacity-50 z-40"
      onClick={onClick}
    ></div>
  );
};

export default Backdrop;
