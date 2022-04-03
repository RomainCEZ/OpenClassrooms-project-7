export default function Comment() {
    return (
        <>
            <div className="flex flex-col items-center gap-1 p-2">
                <div className="border-[16px] border-white border-b-blue-800 hover:border-b-blue-500 cursor-pointer transition-colors"></div>
                <p>+2</p>
                <div className="border-[16px] border-white border-t-blue-800 hover:border-t-blue-500 cursor-pointer transition-colors"></div>
            </div>
            <div className="w-full flex flex-col items-around p-4 pb-0">
                <p></p>

                <p className="border-t border-gray-400 text-sm mt-auto p-2 first-letter:capitalize">
                    <div className="h-20 bg-gray-100 rounded-sm animate-pulse"></div>
                </p>
            </div>
        </>
    );
}
