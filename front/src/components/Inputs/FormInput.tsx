export default function FormInput({
    type,
    name,
    label,
    inputValue,
    handleChange,
    errorMessage,
}) {
    return (
        <>
            <label
                htmlFor={name}
                className="font-bold mt-1 after:text-red-800 after:content-['*'] after:ml-0.5"
            >
                {label}
            </label>
            <input
                type={type}
                name={name}
                className="mx-2 p-2 border border-blue-900 rounded"
                onChange={handleChange(event)}
                value={inputValue}
                required
            />
            {errorMessage && (
                <p className="mx-4 h-4 font-bold text-red-800">
                    {errorMessage}
                </p>
            )}
        </>
    );
}
