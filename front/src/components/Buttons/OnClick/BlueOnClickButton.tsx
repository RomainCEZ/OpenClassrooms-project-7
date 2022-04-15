function BlueOnClickButton({ onClick, children }) {
    return (
        <button
            className="flex justify-center p-2 px-8 text-white font-bold rounded bg-blue-700
                            hover:bg-blue-600 focus:bg-blue-600 focus:shadow active:bg-blue-500 active:shadow
                            transition-all"
            onClick={onClick}
        >
            {children}
        </button>
    );
}
export default BlueOnClickButton;
