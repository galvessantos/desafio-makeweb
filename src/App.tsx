import React from "react";
import { Movie } from "./types/movie";
import { MovieList } from "./components/MovieList";

const mockMovies: Movie[] = [
  {
    id: 1,
    titulo: "Inception",
    descricao: "Um ladrão que invade os sonhos para roubar segredos.",
    anoLancamento: 2010,
    diretor: "Christopher Nolan",
    urlImagem: "https://m.media-amazon.com/images/S/pv-target-images/e826ebbcc692b4d19059d24125cf23699067ab621c979612fd0ca11ab42a65cb._SX1080_FMjpg_.jpg",
    avaliacao: 8.8,
    genero: "Ficção Científica",
  },
  {
    id: 2,
    titulo: "Interestelar",
    descricao: "Uma jornada pelo espaço para salvar a humanidade.",
    anoLancamento: 2014,
    diretor: "Christopher Nolan",
    urlImagem: "https://s2-techtudo.glbimg.com/n88U7XfMlsCb0jXxdVdFCJTO4-U=/0x0:2048x1365/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2023/6/H/xIprUBTb6T1OR2SOaBDg/mv5bmtayoti5mtg5mdfeqtjeqwpwz15bbwu4mdyymjg4mtmx.-v1-.jpg",
    avaliacao: 8.6,
    genero: "Ficção Científica",
  },
];

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Gerenciador de Filmes</h1>
      <MovieList movies={mockMovies} />
    </div>
  );
}
