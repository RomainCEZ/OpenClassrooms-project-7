import { Link } from "react-router-dom";

export default function BlueLinkButton({ children, path }) {
    return (
        <Link
            to={path}
            className="flex justify-center p-2 rounded bg-blue-700 text-white font-bold px-6 shadow-md
            hover:bg-blue-600 focus:bg-blue-600 active:bg-blue-500
            transition-all"
        >
            {children}
        </Link>
    );
}
