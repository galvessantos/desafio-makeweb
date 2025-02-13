import React, { useState } from "react";
import { Movie } from "../types/movie";
import { Star } from "lucide-react";

export function MovieCard({ movie }: { movie: Movie }) {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105 p-4"
      onClick={() => setShowDescription(!showDescription)}
    >
      <img
        src={movie.urlImagem || "https://via.placeholder.com/400x300"}
        alt={movie.titulo}
        className="w-full h-48 object-cover rounded-md"
      />
      <div className="mt-4">
        <h3 className="text-xl font-semibold">{movie.titulo}</h3>
        <p className="text-gray-600 text-sm">{movie.diretor} • {movie.anoLancamento} • {movie.genero}</p>
        <p className="text-yellow-500 flex items-center gap-1 font-medium">
          {movie.avaliacao} <Star size={16} fill="yellow" className="text-yellow-500" />
        </p>
      </div>
      {showDescription && (
        <p className="text-gray-700 mt-3">{movie.descricao}</p>
      )}
    </div>
  );
}
