export default function PostPreviewLoader() {
    return (
            <article className="flex flex-col p-5 bg-white hover:bg-blue-200 w-full border border-indigo-900 rounded">
                <h2 className="w-3/5 text-lg font-semibold bg-gray-200 h-6 rounded animate-pulse"></h2>
                <div className="pt-3 cover w-full" >
                    <p className="mt-4 bg-gray-200 w-4/5 h-4 rounded animate-pulse"></p>
                    <p className="mt-4 bg-gray-200 w-2/3 h-4 rounded animate-pulse"></p>
                    <p className="mt-4 bg-gray-200 w-1/2 h-4 rounded animate-pulse"></p>
                    <p className="mt-4 bg-gray-200 w-1/3 h-4 rounded animate-pulse"></p>

                </div>
            </article>
    );
}
