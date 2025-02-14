import { useNavigate } from "react-router-dom";
import { Movie } from "../types/movie";

interface MovieCardProps {
    movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
    const navigate = useNavigate();

    return (
        <div
            className="relative bg-white rounded-lg shadow-md overflow-hidden transition hover:shadow-lg cursor-pointer"
            onClick={() => navigate(`/filme/${movie.id}`)}
        >
            <img
                src={movie.urlimagem || "url_da_imagem_padrao"}
                alt={movie.nome || "Nome do filme"}
                className="w-full h-48 object-cover"
            />

            <div className="p-4">
                <h3 className="text-lg font-semibold">{movie.nome || "Nome do filme"}</h3>
                <p className="text-gray-600">
                    {movie.diretor || "Diretor não informado"} • {movie.anolancamento || "Ano não informado"} • {movie.genero || "Gênero não informado"}
                </p>
                <p className="text-purple-500 font-bold flex items-center">
                    {movie.avaliacao !== undefined && movie.avaliacao !== null ? `${movie.avaliacao}/10` : "Avaliação não informada"}{" "}
                    <span className="ml-1 text-purple-500">★</span>
                </p>
            </div>
        </div>
    );
}
