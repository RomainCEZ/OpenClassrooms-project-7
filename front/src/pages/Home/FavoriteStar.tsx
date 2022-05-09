import { FaStar, FaRegStar } from "react-icons/fa";

export default function FavoriteStar({ isFavorite, className }) {
    return (
        <div
            className={className}
            aria-label={isFavorite ? "Dans les favoris" : ""}
        >
            {isFavorite ? (
                <span className="text-yellow-400">
                    <FaStar />
                </span>
            ) : (
                <span className="text-blue-700 dark:text-gray-700 dark:hover:text-yellow-500">
                    <FaRegStar />
                </span>
            )}
        </div>
    );
}
