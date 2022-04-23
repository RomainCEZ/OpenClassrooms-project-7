import { ReactChild } from "react";

export default function BlueFormButton({
    children,
    target,
    className,
}: {
    children: ReactChild;
    target: string;
    className?: string;
}) {
    return (
        <button
            type="submit"
            form={target}
            className={`p-2.5 rounded-md flex-grow bg-blue-700 text-white shadow-md font-bold
            hover:bg-blue-600 focus:bg-blue-600 active:bg-blue-500 transition ${className}`}
        >
            {children}
        </button>
    );
}
