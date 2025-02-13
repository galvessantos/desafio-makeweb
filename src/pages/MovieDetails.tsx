import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Movie } from "../types/movie";
import { ArrowLeft } from "lucide-react";

export function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/filmes/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const filmeFormatado: Movie = {
          id: data.id,
          titulo: data.nome,
          descricao: data.descricao,
          diretor: data.diretor,
          anoLancamento: data.anolancamento,
          genero: data.genero,
          avaliacao: data.avaliacao,
          urlimagem: data.urlimagem,
        };
        setMovie(filmeFormatado);
      })
      .catch((error) => console.error("Erro ao carregar filme:", error));
  }, [id]);

  if (!movie) {
    return <p className="text-center text-gray-600">Carregando...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 relative">
      {/* Botão de voltar com flecha roxa */}
      <button 
        onClick={() => navigate(-1)} 
        className="absolute top-4 left-4 bg-gray-200 text-gray-700 px-3 py-2 rounded-full shadow hover:bg-gray-300 transition flex items-center gap-2"
      >
        <ArrowLeft size={18} className="text-purple-500" /> Voltar
      </button>

      <img 
        src={movie.urlimagem} 
        alt={movie.titulo} 
        className="w-full h-80 object-cover rounded-lg"
        onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/400x300")} 
      />
      <h1 className="text-3xl font-bold mt-4">{movie.titulo}</h1>
      <p className="text-gray-600">{movie.diretor} • {movie.anoLancamento} • {movie.genero}</p>
      <p className="text-purple-500 font-medium mt-2 flex items-center gap-1">⭐ {movie.avaliacao}/10</p>
      <p className="mt-4 text-gray-700 text-justify">{movie.descricao}</p>
    </div>
  );
}
