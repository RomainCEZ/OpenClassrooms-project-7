export default function CommentLoader() {
    return (
        <div className="flex flex-col mt-2 bg-white dark:bg-gray-400 gap-1 shadow-md">
            <div className="flex divide-x divide-indigo-800 dark:divide-gray-300 sm:border border-indigo-800 dark:border-gray-300 sm:rounded-sm">
                <div className="flex flex-col items-center gap-1 p-2">
                    <div
                        className="border-[16px] border-transparent border-b-blue-700 dark:border-b-gray-700
                    hover:border-b-blue-500 dark:hover:border-b-gray-300 active:border-b-blue-400 dark:active:border-b-gray-400 cursor-pointer transition"
                    ></div>
                    <div className="h-4 my-1 w-4/5 bg-gray-100 dark:bg-gray-700 rounded-sm animate-pulse"></div>
                    <div
                        className="border-[16px] border-transparent border-t-blue-700 dark:border-t-gray-700
                    hover:border-t-blue-500 dark:hover:border-t-gray-300 active:border-t-blue-400 dark:active:border-t-gray-400 cursor-pointer transition"
                    ></div>
                </div>
                <div className="w-full flex flex-col items-around p-4 pb-0">
                    <div className="h-5 w-4/5 mb-3 bg-gray-100 dark:bg-gray-700 rounded-sm animate-pulse"></div>
                    <div className="h-5 w-2/3 bg-gray-100 dark:bg-gray-700 rounded-sm animate-pulse"></div>

                    <div className="border-t border-gray-400 dark:border-gray-300 text-sm mt-auto p-2 first-letter:capitalize">
                        <div className="h-5 w-1/3 bg-gray-100 dark:bg-gray-700 rounded-sm animate-pulse"></div>
                    </div>
                </div>{" "}
            </div>
        </div>
    );
}
