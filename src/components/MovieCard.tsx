import React from "react";
import { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105">
      <img
        src={movie.urlImagem || "https://via.placeholder.com/400x300"}
        alt={movie.titulo}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{movie.titulo}</h3>
        <p className="text-gray-600 text-sm">{movie.diretor} • {movie.anoLancamento}</p>
      </div>
    </div>
  );
}
