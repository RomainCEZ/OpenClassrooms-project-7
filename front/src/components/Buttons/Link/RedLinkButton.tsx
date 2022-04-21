import { Link } from "react-router-dom";
import ILinkButtonProps from "./LinkButton.interface";

export default function RedLinkButton({
    children,
    path,
    onClick,
    className,
}: ILinkButtonProps) {
    return (
        <Link
            to={path}
            className={`flex justify-center p-2.5 px-5 text-white font-bold rounded-md bg-red-800 shadow-md 
            hover:bg-red-600 focus:bg-red-600 active:bg-red-500 transition-all ${className}`}
            onClick={onClick}
        >
            {children}
        </Link>
    );
}
