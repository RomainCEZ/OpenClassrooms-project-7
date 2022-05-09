import { FaUser } from "react-icons/fa";

export default function NavPictureBox({ picture }) {
    return (
        <div className="relative flex flex-col justify-center items-center w-full h-full z-10 rounded-full border-4 bg-gray-100 dark:bg-gray-200 border-blue-800 group-hover:border-blue-500 focus:border-blue-500 active:border-blue-400 dark:border-gray-800 dark:group-hover:border-gray-300 dark:active:border-gray-400 overflow-hidden shadow-lg cursor-pointer transition">
            {picture ? (
                <img
                    src={picture}
                    alt="Image de profil"
                    className="absolute h-full z-10 w-full object-cover group-hover:brightness-110 group-focus:brightness-110 group-active:brightness-125 transition"
                />
            ) : (
                <span className="absolute top-4 text-[5rem] rounded-full text-blue-700 group-hover:text-blue-500 dark:text-gray-700 dark:group-hover:text-gray-300 transition">
                    <FaUser />
                </span>
            )}
        </div>
    );
}
