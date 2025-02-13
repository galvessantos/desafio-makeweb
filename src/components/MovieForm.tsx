import React, { useState } from "react";
import { Movie } from "../types/movie";

interface MovieFormProps {
  onSubmit: (movie: Movie) => void;
}

export function MovieForm({ onSubmit }: MovieFormProps) {
  const [formData, setFormData] = useState<Omit<Movie, "id">>({
    titulo: "",
    descricao: "",
    anoLancamento: new Date().getFullYear(),
    diretor: "",
    urlImagem: "",
    avaliacao: 0,
    genero: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, id: Date.now() });
    setFormData({
      titulo: "",
      descricao: "",
      anoLancamento: new Date().getFullYear(),
      diretor: "",
      urlImagem: "",
      avaliacao: 0,
      genero: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Título</label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Diretor</label>
          <input
            type="text"
            name="diretor"
            value={formData.diretor}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Ano de Lançamento</label>
          <input
            type="number"
            name="anoLancamento"
            value={formData.anoLancamento}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Avaliação (0-10)</label>
          <input
            type="number"
            name="avaliacao"
            min="0"
            max="10"
            step="0.1"
            value={formData.avaliacao}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">URL da Imagem</label>
          <input
            type="url"
            name="urlImagem"
            value={formData.urlImagem}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Gênero</label>
          <select
            name="genero"
            value={formData.genero}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2"
          >
            <option value="">Selecione um gênero</option>
            <option value="Ação">Ação</option>
            <option value="Comédia">Comédia</option>
            <option value="Drama">Drama</option>
            <option value="Terror">Terror</option>
            <option value="Ficção Científica">Ficção Científica</option>
            <option value="Suspense">Suspense</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Descrição</label>
        <textarea
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2"
          rows={2}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-700 transition"
      >
        Adicionar Filme
      </button>
    </form>
  );
}