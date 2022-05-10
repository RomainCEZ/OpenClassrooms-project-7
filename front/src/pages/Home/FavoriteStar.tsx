import { FaStar, FaRegStar } from "react-icons/fa";

export default function FavoriteStar({ isFavorite, className }) {
    return (
        <div
            className={className}
            aria-label={isFavorite ? "Dans les favoris" : ""}
        >
            {isFavorite && (
                <span className="absolute text-yellow-400 group-hover:text-yellow-200">
                    <FaStar />
                </span>
            )}
            <span className="relative text-blue-700 dark:text-gray-800 group-hover:text-blue-500 dark:group-hover:text-gray-600">
                <FaRegStar />
            </span>
        </div>
    );
}
