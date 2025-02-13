import React, { useEffect, useState } from "react";
import { Movie } from "./types/movie";
import { MovieList } from "./components/MovieList";
import { MovieForm } from "./components/MovieForm";
import { Modal } from "./components/Modal";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/filmes")
      .then((response) => response.json())
      .then((data) => {
        const filmesFormatados = data.map((filme: any) => ({
          id: filme.id,
          titulo: filme.nome,
          descricao: filme.descricao,
          diretor: filme.diretor,
          anoLancamento: filme.anolancamento,
          genero: filme.genero,
          avaliacao: filme.avaliacao,
          urlImagem: filme.urlimagem
        }));

        console.log("Filmes ajustados para o frontend:", filmesFormatados);
        setMovies(filmesFormatados);
      })
      .catch((error) => console.error("Erro ao buscar filmes:", error));
  }, []);

  const handleAddMovie = async (movie: Omit<Movie, "id">) => {
    const response = await fetch("http://localhost:3001/filmes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movie),
    });

    if (response.ok) {
      const newMovie = await response.json();
      setMovies([...movies, newMovie]);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Gerenciador de Filmes</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700 transition"
            >
              Adicionar Filme
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {movies.length > 0 ? (
          <MovieList movies={movies} />
        ) : (
          <p className="text-center text-gray-600">Nenhum filme encontrado.</p>
        )}
      </main>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">Adicionar Novo Filme</h2>
        <MovieForm onSubmit={handleAddMovie} />
      </Modal>
    </div>
  );
}
