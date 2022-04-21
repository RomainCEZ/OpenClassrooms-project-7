import { Link } from "react-router-dom";
import ILinkButtonProps from "./LinkButton.interface";

export default function BlueLinkButton({
    children,
    path,
    onClick,
    className,
}: ILinkButtonProps) {
    return (
        <Link
            to={path}
            className={`flex justify-center p-2.5 rounded-md bg-blue-700 text-white font-bold px-6 shadow-md
            hover:bg-blue-600 focus:bg-blue-600 active:bg-blue-500 transition-all ${className} `}
            onClick={onClick}
        >
            {children}
        </Link>
    );
}
