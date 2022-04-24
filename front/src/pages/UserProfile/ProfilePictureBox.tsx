export default function ProfilePictureBox({ avatar }) {
    return (
        <button className="group relative flex flex-col justify-center items-center mt-16 z-10 w-36 h-36 bg-gray-100 rounded-full border-4 border-blue-800 hover:border-blue-500 focus:border-blue-500 active:border-blue-400 overflow-hidden shadow-lg cursor-pointer transition">
            {avatar && (
                <img
                    src={avatar}
                    className="absolute h-full z-10 w-full object-cover group-hover:brightness-110 group-focus:brightness-110 group-active:brightness-125 transition"
                />
            )}
            <div className="absolute flex flex-col justify-center items-center">
                <div className="mt-20 p-8 bg-blue-700 rounded-full shadow-lg group-hover:bg-blue-500 group-focus:bg-blue-500 group-active:bg-blue-400 transition"></div>
                <div className="mt-0.5 p-14 bg-blue-700 rounded-full shadow-lg group-hover:bg-blue-500 group-focus:bg-blue-500 group-active:bg-blue-400 transition"></div>
            </div>
        </button>
    );
}
