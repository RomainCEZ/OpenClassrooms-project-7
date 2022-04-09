export default function BlueFormButton({ children }) {
    return (
        <button
            className="p-2 rounded flex-grow bg-blue-700 text-white font-bold px-6
            hover:bg-blue-600 focus:bg-blue-600 focus:shadow active:bg-blue-500 active:shadow
            transition-all"
        >
            {children}
        </button>
    );
}
