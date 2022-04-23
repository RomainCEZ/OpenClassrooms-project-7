import { ReactChild } from "react";

interface ButtonProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    children: ReactChild;
    className?: string;
}

function BlueOnClickButton({ onClick, children, className }: ButtonProps) {
    return (
        <button
            className={`p-2.5 text-white font-bold rounded-md bg-blue-700 shadow-md
            hover:bg-blue-600 focus:bg-blue-600 active:bg-blue-500 transition ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
export default BlueOnClickButton;
