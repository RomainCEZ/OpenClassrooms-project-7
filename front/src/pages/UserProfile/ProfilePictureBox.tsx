export default function ProfilePictureBox({ picture }) {
    return (
        <div className="group relative flex flex-col justify-center items-center w-full h-full z-10 bg-gray-100 rounded-full border-4 border-blue-800 hover:border-blue-500 focus:border-blue-500 active:border-blue-400 dark:border-gray-900 dark:hover:border-gray-600 dark:active:border-gray-500 overflow-hidden shadow-lg cursor-pointer transition">
            {picture && (
                <img
                    src={picture}
                    className="absolute h-full z-10 w-full object-cover group-hover:brightness-110 group-focus:brightness-110 group-active:brightness-125 transition"
                />
            )}
            <div className="absolute flex flex-col items-center top-0 w-full h-[180%]">
                <div className="mt-[20%] h-[48%] w-[45%] bg-blue-700 rounded-full shadow-lg group-hover:bg-blue-500 group-focus:bg-blue-500 group-active:bg-blue-400 transition"></div>
                <div className="mt-[3%] h-[120%] w-[95%] bg-blue-700 rounded-full shadow-lg group-hover:bg-blue-500 group-focus:bg-blue-500 group-active:bg-blue-400 transition"></div>
            </div>
        </div>
    );
}
