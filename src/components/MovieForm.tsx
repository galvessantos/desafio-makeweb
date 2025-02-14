import React, { useState } from "react";
import { Movie } from "../types/movie";

interface MovieFormProps {
  onClose: () => void;
  onAddMovie: (movie: Omit<Movie, "id">) => void;
}

export function MovieForm({ onClose, onAddMovie }: MovieFormProps) {
  const [movie, setMovie] = useState<Omit<Movie, "id">>({
    nome: "",
    descricao: "",
    diretor: "",
    anolancamento: new Date().getFullYear(),
    genero: "Ação",
    avaliacao: 0,
    urlimagem: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMovie((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (movie.avaliacao < 0 || movie.avaliacao > 10) {
      alert("A avaliação deve estar entre 0 e 10.");
      return;
    }

    const currentYear = new Date().getFullYear();
    if (movie.anolancamento > currentYear) {
      alert("O ano de lançamento não pode ser maior que o ano atual.");
      return;
    }

    onAddMovie(movie);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[850px] max-h-[520px] relative flex flex-col">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          ✖
        </button>
        <h2 className="text-xl font-semibold mb-4">Adicionar Novo Filme</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label>
            Nome
            <input type="text" name="nome" value={movie.nome} onChange={handleChange} className="w-full border rounded-md px-2 py-1" required />
          </label>
          <div className="flex gap-4">
            <label className="flex-1">
              Ano de Lançamento
              <input type="number" name="anolancamento" value={movie.anolancamento} onChange={handleChange} className="w-full border rounded-md px-2 py-1" required max={new Date().getFullYear()} inputMode="numeric" pattern="\d*" onKeyDown={(e) => e.preventDefault()} />
            </label>
            <label className="flex-1">
              Gênero
              <select name="genero" value={movie.genero} onChange={handleChange} className="w-full border rounded-md px-2 py-1" required>
                <option>Ação</option>
                <option>Drama</option>
                <option>Comédia</option>
                <option>Ficção Científica</option>
                <option>Terror</option>
              </select>
            </label>
          </div>
          <label>
            Descrição
            <textarea name="descricao" value={movie.descricao} onChange={handleChange} className="w-full border rounded-md px-2 py-1" required />
          </label>
          <div className="flex gap-4">
            <label className="flex-1">
              Diretor
              <input type="text" name="diretor" value={movie.diretor} onChange={handleChange} className="w-full border rounded-md px-2 py-1" required />
            </label>
            <label className="flex-1">
              Avaliação (0-10)
              <input type="number" name="avaliacao" value={movie.avaliacao} onChange={handleChange} className="w-full border rounded-md px-2 py-1" min="0" max="10" required inputMode="numeric" pattern="\d*" onKeyDown={(e) => e.preventDefault()} />
            </label>
          </div>
          <label>
            URL da Imagem
            <input type="text" name="urlimagem" value={movie.urlimagem} onChange={handleChange} className="w-full border rounded-md px-2 py-1" required />
          </label>
          <div className="flex justify-end gap-2 mt30">
            <button type="button" onClick={onClose} className="bg-gray-300 px-3 py-2 rounded-md">Cancelar</button>
            <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded-md">Adicionar Filme</button>
          </div>
        </form>
      </div>
    </div>
  );
}
