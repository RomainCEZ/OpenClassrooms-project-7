import { Link } from "react-router-dom";

export default function BlueLinkButton({ children, path }) {
    return (
        <Link
            to={path}
            className="flex justify-center p-2 rounded bg-blue-700 text-white font-bold px-6
            hover:bg-blue-600 focus:bg-blue-600 focus:shadow active:bg-blue-500 active:shadow
            transition-all duration-150 ease-in-out"
        >
            {children}
        </Link>
    );
}
