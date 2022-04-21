import { ReactChild } from "react";

interface ButtonProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    children: ReactChild;
    className?: string;
}

function RedOnClickButton({ onClick, children, className }: ButtonProps) {
    return (
        <button
            className={`p-2.5 px-5 text-white font-bold rounded-md bg-red-800 shadow-md 
            hover:bg-red-600 focus:bg-red-600 active:bg-red-500 transition-all ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
export default RedOnClickButton;
