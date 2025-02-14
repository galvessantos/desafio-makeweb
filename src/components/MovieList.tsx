import React from "react";
import { Movie } from "../types/movie";
import { MovieCard } from "./MovieCard";

interface MovieListProps {
    movies: Movie[];
}

export function MovieList({ movies }: MovieListProps) {
    if (movies.length === 0) {
        return <p className="text-center text-gray-600">Nenhum filme encontrado.</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
}