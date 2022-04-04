export default function BlueFormButton({ children }) {
    return (
        <button
            className="m-2 ml-auto p-2 rounded bg-blue-800 text-white font-bold px-6
            hover:bg-blue-600 focus:bg-blue-600 focus:shadow active:bg-blue-500 active:shadow
            transition-all"
        >
            {children}
        </button>
    );
}
