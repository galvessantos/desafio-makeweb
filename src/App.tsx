import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Movie } from "./types/movie";
import { MovieList } from "./components/MovieList";
import { MovieDetails } from "./pages/MovieDetails";
import { MovieForm } from "./components/MovieForm";
import { Modal } from "./components/Modal";
import Pagination from "./components/Pagination";

export default function App() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [moviesPerPage] = useState(8);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetch("http://localhost:3001/filmes")
            .then((response) => response.json())
            .then((data) => setMovies(data))
            .catch((error) => console.error("Erro ao buscar filmes:", error));
    }, []);

    const filteredMovies = movies.filter((movie) =>
        movie.nome?.toLowerCase().includes(searchTerm?.toLowerCase() || "")
    );

    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handleAddMovie = (movie: Omit<Movie, "id">) => {
        fetch("http://localhost:3001/filmes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(movie),
        })
            .then((response) => response.json())
            .then((data: Movie) => {
                setMovies((prevMovies) => [...prevMovies, data]);
                navigate(`/filme/${data.id}`);
                setIsModalOpen(false);
            })
            .catch((error) => console.error("Erro ao adicionar filme:", error));
    };

    const handleDeleteMovie = (id: number) => {
        fetch(`http://localhost:3001/filmes/${id}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((err) => {
                        console.error("Erro na API (DELETE):", err);
                        throw new Error(err.message || `Erro ao deletar filme (status ${response.status})`);
                    });
                }
                return response;
            })
            .then(() => {
                setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
                navigate("/");
            })
            .catch((error) => console.error("Erro ao deletar filme:", error));
    };

    const handleMovieDeleted = () => {
        fetch("http://localhost:3001/filmes")
            .then((response) => response.json())
            .then((data) => setMovies(data))
            .catch((error) => console.error("Erro ao buscar filmes:", error));
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900"> 🎬 Gerenciador de Filmes</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700 transition flex items-center gap-2"
                    >
                        <span className="text-lg">+</span> Adicionar Filme
                    </button>
                </div>
            </header>

            {location.pathname === "/" && (
                <div className="w-full flex justify-center px-6 mt-6">
                    <input
                        type="text"
                        placeholder="Buscar filme..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-3xl w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            )}

            <main className="flex-grow max-w-7xl mx-auto py-8">
                <Routes>
                    <Route path="/" element={<MovieList movies={currentMovies} />} />
                    <Route
                        path="/filme/:id"
                        element={<MovieDetails onMovieDeleted={handleMovieDeleted} onDelete={handleDeleteMovie} />}
                    />
                </Routes>
                {location.pathname === "/" && (
                    <Pagination
                        moviesPerPage={moviesPerPage}
                        totalMovies={filteredMovies.length}
                        paginate={paginate}
                    />
                )}
            </main>

            <footer className="bg-gray-200 py-4 text-center w-full mt-auto">
                <p className="text-gray-600">&copy; {new Date().getFullYear()} - Gabriel Alves - Gerenciador de Filmes</p>
            </footer>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-xl font-semibold mb-4">Adicionar Novo Filme</h2>
                <MovieForm onClose={() => setIsModalOpen(false)} onAddMovie={handleAddMovie} />
            </Modal>
        </div>
    );
}
