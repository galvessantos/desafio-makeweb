import { Link } from "react-router-dom";
import { Movie } from "../types/movie";
import { Star } from "lucide-react";

export function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link to={`/filme/${movie.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105 p-4">
        <img src={movie.urlimagem} alt={movie.titulo} className="w-full h-48 object-cover rounded-md" />
        <div className="mt-4">
          <h3 className="text-xl font-semibold">{movie.titulo}</h3>
          <p className="text-gray-600 text-sm">{movie.diretor} • {movie.anoLancamento} • {movie.genero}</p>
          <p className="text-purple-500 flex items-center gap-1 font-medium">
            {movie.avaliacao}/10 <Star size={16} fill="purple" className="text-purple-500" />
          </p>
        </div>
      </div>
    </Link>
  );
}
