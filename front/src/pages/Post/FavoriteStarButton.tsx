import { FaStar, FaRegStar } from "react-icons/fa";

export default function FavoriteStar({ onClick, isActive, className }) {
    return (
        <button
            onClick={onClick}
            className={className}
            value={isActive ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
            {isActive && (
                <span className="absolute ml-[-15px] text-yellow-400 transition">
                    <FaStar />
                </span>
            )}
            <span className="relative text-blue-700 dark:text-gray-700 hover:text-yellow-400 dark:hover:text-yellow-400 transition">
                <FaRegStar />
            </span>
        </button>
    );
}
