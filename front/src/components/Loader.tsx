export default function Loader() {
    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className="spinner-border animate-spin inline-block w-12 h-12 border-8 rounded-full text-blue-900" role="status"></div>
            <span>Chargement en cours...</span>
        </div>
    )
}