export default function Comment() {
    return (
        <div className="flex flex-col mt-2 bg-white gap-1">
            <div className="flex divide-x divide-indigo-800 border border-indigo-800 rounded-sm">
                <div className="flex flex-col items-center gap-1 p-2">
                    <div className="border-[16px] border-white border-b-blue-800 hover:border-b-blue-500 focus:border-b-blue-500 active:border-b-blue-400 cursor-pointer transition-all"></div>
                    <div className="h-4 my-1 w-4/5 bg-gray-100 rounded-sm animate-pulse"></div>
                    <div className="border-[16px] border-white border-t-blue-800 hover:border-t-blue-500 focus:border-t-blue-500 active:border-t-blue-400 cursor-pointer transition-all"></div>
                </div>
                <div className="w-full flex flex-col items-around p-4 pb-0">
                    <div className="h-5 w-4/5 mb-3 bg-gray-100 rounded-sm animate-pulse"></div>
                    <div className="h-5 w-2/3 bg-gray-100 rounded-sm animate-pulse"></div>

                    <div className="border-t border-gray-400 text-sm mt-auto p-2 first-letter:capitalize">
                        <div className="h-5 w-1/3 bg-gray-100 rounded-sm animate-pulse"></div>
                    </div>
                </div>{" "}
            </div>
        </div>
    );
}
