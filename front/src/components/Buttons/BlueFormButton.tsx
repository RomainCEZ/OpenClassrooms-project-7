export default function BlueFormButton({ children, target }) {
    return (
        <button
            type="submit"
            form={target}
            className="p-2 rounded flex-grow bg-blue-700 text-white shadow-md font-bold px-6
            hover:bg-blue-600 focus:bg-blue-600 active:bg-blue-500 transition-all"
        >
            {children}
        </button>
    );
}
