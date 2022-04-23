function WhiteOnClickButton({ onClick, children }) {
    return (
        <button
            className="text-center font-bold p-2 px-10 border bg-white shadow-md border-blue-800 rounded-md cursor-pointer
                     hover:bg-sky-100 hover:shadow-sky-200 
                     focus:bg-sky-100 focus:shadow-sky-200
                     active:bg-sky-100/20 active:text-sky-500 transition-all"
            onClick={onClick}
        >
            {children}
        </button>
    );
}
export default WhiteOnClickButton;
