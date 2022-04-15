function RedOnClickButton({ onClick, children }) {
    return (
        <button
            className="flex justify-center p-2 px-5 text-white font-bold rounded bg-red-800 shadow-md 
                hover:bg-red-600 focus:bg-red-600 active:bg-red-500 transition-all"
            onClick={onClick}
        >
            {children}
        </button>
    );
}
export default RedOnClickButton;
