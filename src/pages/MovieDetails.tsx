import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Movie } from "../types/movie";
import { ArrowLeft, Trash2 } from "lucide-react";

interface MovieDetailsProps {
    onMovieDeleted: () => void;
    onDelete: (id: number) => void;
}

export function MovieDetails({ onMovieDeleted, onDelete }: MovieDetailsProps) {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3001/filmes/${id}`)
            .then((response) => response.json())
            .then((data) => {
                const filmeFormatado: Movie = {
                    id: data.id,
                    nome: data.nome,
                    descricao: data.descricao,
                    diretor: data.diretor,
                    anolancamento: data.anolancamento,
                    genero: data.genero,
                    avaliacao: data.avaliacao,
                    urlimagem: data.urlimagem,
                };
                setMovie(filmeFormatado);
            })
            .catch((error) => console.error("Erro ao carregar filme:", error));
    }, [id]);

    const handleDelete = () => {
        if (window.confirm("Tem certeza que deseja excluir este filme?")) {
            onDelete(Number(id));
            onMovieDeleted();
            navigate("/");
        }
    };

    if (!movie) {
        return <p className="text-center text-gray-600">Carregando...</p>;
    }

    return (
        <div className="max-w-3xl mx-auto p-6 relative">
            <button
                onClick={() => navigate(-1)}
                className="absolute top-4 left-4 bg-gray-200 text-gray-700 px-3 py-2 rounded-full shadow hover:bg-gray-300 transition flex items-center gap-2"
            >
                <ArrowLeft size={18} className="text-purple-500" /> Voltar
            </button>

            <button
                onClick={handleDelete}
                className="absolute top-4 right-4 bg-red-600 text-white px-3 py-2 rounded-full shadow hover:bg-red-700 transition flex items-center gap-2"
            >
                <Trash2 size={18} className="text-white" /> Excluir
            </button>

            <div className="flex justify-center">
                <img
                    src={movie.urlimagem}
                    alt={movie.nome}
                    className="w-[800px] h-[400px] object-cover rounded-lg"
                    onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/700x500")}
                />
            </div>
            <h1 className="text-3xl font-bold mt-4 text-center">{movie.nome}</h1>
            <p className="text-gray-600 text-center">{movie.diretor} • {movie.anolancamento || "Ano não informado"} • {movie.genero}</p>
            <p className="text-purple-500 font-medium mt-2 flex justify-center items-center gap-1">
                ⭐ {movie.avaliacao}/10
            </p>
            <p className="mt-4 text-gray-700 text-justify">{movie.descricao}</p>
        </div>
    );
}
