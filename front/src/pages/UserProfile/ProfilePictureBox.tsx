export default function ProfilePictureBox({ picture }) {
    return (
        <div className="relative flex flex-col justify-center items-center w-full h-full z-10 rounded-full border-4 bg-gray-100 dark:bg-gray-200 border-blue-800 group-hover:border-blue-500 focus:border-blue-500 active:border-blue-400 dark:border-gray-800 dark:group-hover:border-gray-300 dark:active:border-gray-400 overflow-hidden shadow-lg cursor-pointer transition">
            {picture && (
                <img
                    src={picture}
                    className="absolute h-full z-10 w-full object-cover group-hover:brightness-110 group-focus:brightness-110 group-active:brightness-125 transition"
                />
            )}
            <div className="absolute flex flex-col items-center top-0 w-full h-[180%]">
                <div className="mt-[20%] h-[48%] w-[45%] rounded-full shadow-lg bg-blue-700 dark:bg-gray-700 group-hover:bg-blue-500 dark:group-hover:bg-gray-500 group-active:bg-blue-400 dark:group-active:bg-gray-400 transition"></div>
                <div className="mt-[3%] h-[120%] w-[95%] rounded-full shadow-lg bg-blue-700 dark:bg-gray-700 group-hover:bg-blue-500 dark:group-hover:bg-gray-500 group-active:bg-blue-400 dark:group-active:bg-gray-400 transition"></div>
            </div>
        </div>
    );
}
