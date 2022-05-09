import { FaStar, FaRegStar } from "react-icons/fa";

export default function FavoriteStar({ onClick, isActive, className }) {
    return (
        <button
            onClick={onClick}
            className={className}
            value={isActive ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
            {isActive ? (
                <span className="text-yellow-400 hover:text-yellow-500 transition">
                    <FaStar />
                </span>
            ) : (
                <span className="text-blue-700 dark:text-gray-700 hover:text-yellow-500 dark:hover:text-yellow-500 transition">
                    <FaRegStar />
                </span>
            )}
        </button>
    );
}
