import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className="flex flex-col justify-center items-center p-10 h">
      <Link to="/" className="text-2xl mb-8 underline text-indigo-900">Retour à l'accueil.</Link>
      <span className="mb-5 text-9xl font-black text-indigo-900">404</span>
      <p className="text-4xl text-indigo-900">Cette page n'existe pas !</p>
    </div>
  )
}