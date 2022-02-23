export default function MainContainer({children}) {

    return (
        <main className="flex justify-between bg-gray-200 sm:px-10 gap-x-10">
            {children}
        </main>
    )
}