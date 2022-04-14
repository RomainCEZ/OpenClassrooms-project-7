export default function PostPreviewLoader() {
    return (
        <article className="flex flex-col p-5 bg-white hover:bg-blue-200 w-full border border-indigo-900 rounded shadow-md">
            <div className="w-3/5 text-lg font-semibold bg-gray-200  h-6 rounded-sm animate-pulse"></div>
            <div className="mx-3 my-4 bg-gray-200 w-1/3 h-3 rounded-sm animate-pulse"></div>
            <div className="p-3 w-full border-t-2 border-indigo-900 border-b-[1px]">
                <div className="mt-4 bg-gray-200 w-4/5 h-4 rounded-sm animate-pulse"></div>
                <div className="mt-4 bg-gray-200 w-2/3 h-4 rounded-sm animate-pulse"></div>
                <div className="mt-4 bg-gray-200 w-1/2 h-4 rounded-sm animate-pulse"></div>
                <div className="my-4 bg-gray-200 w-1/3 h-4 rounded-sm animate-pulse"></div>
            </div>
            <div className="mt-5 ml-3 bg-gray-200 w-1/5 h-3 rounded-sm animate-pulse"></div>
        </article>
    );
}
