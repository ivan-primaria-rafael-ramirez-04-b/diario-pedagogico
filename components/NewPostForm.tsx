
import React, { useState } from 'react';
import { Post, User } from '../types';
import { getTitleSuggestion } from '../services/geminiService';
import { PlusCircle, Sparkles } from 'lucide-react';

interface NewPostFormProps {
  currentUser: User;
  onAddPost: (post: Post) => void;
  setPage: (page: 'home') => void;
}

const NewPostForm: React.FC<NewPostFormProps> = ({ currentUser, onAddPost, setPage }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuggestingTitle, setIsSuggestingTitle] = useState(false);

  const handleTitleSuggestion = async () => {
    if (!content) {
      alert('Por favor, escribe algo en el contenido principal para poder sugerir un título.');
      return;
    }
    setIsSuggestingTitle(true);
    try {
      const suggestedTitle = await getTitleSuggestion(content);
      setTitle(suggestedTitle);
    } catch (error) {
      console.error("Error suggesting title:", error);
      alert('Hubo un error al generar la sugerencia de título.');
    } finally {
      setIsSuggestingTitle(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
        alert('El título y el contenido son obligatorios.');
        return;
    }
    setIsSubmitting(true);

    const newPost: Post = {
      id: `post-${Date.now()}`,
      author: currentUser,
      title,
      content,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
      createdAt: new Date().toISOString(),
      imageUrl: imageUrl || undefined,
      likes: 0,
      comments: [],
    };
    
    onAddPost(newPost);
    // Simulate a short delay for submission effect
    setTimeout(() => {
        setIsSubmitting(false);
        setPage('home');
    }, 500);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <PlusCircle className="w-10 h-10 text-red-800 mr-4" />
        <div>
          <h2 className="text-3xl font-bold text-red-900">Crear Nueva Publicación</h2>
          <p className="text-gray-600">Comparte tus experiencias y estrategias pedagógicas.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Título de la Publicación</label>
          <div className="flex items-center space-x-2">
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
              placeholder="Un título atractivo para tu experiencia"
              required
            />
            <button 
              type="button" 
              onClick={handleTitleSuggestion}
              disabled={isSuggestingTitle || !content}
              className="flex items-center bg-yellow-400 text-yellow-900 font-semibold py-2 px-3 rounded-md hover:bg-yellow-500 transition-colors disabled:bg-gray-300 disabled:text-gray-500"
              title="Sugerir título basado en el contenido"
            >
              {isSuggestingTitle ? (
                 <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                 </svg>
              ) : (
                <Sparkles size={18} />
              )}
              <span className="ml-2 hidden sm:inline">Sugerir Título</span>
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Contenido Principal</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={12}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
            placeholder="Describe la actividad, estrategia o reflexión. ¿Qué funcionó? ¿Qué aprendiste?"
            required
          />
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">Etiquetas (separadas por comas)</label>
          <input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
            placeholder="Ej: matemáticas, multigrado, gamificación"
          />
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">URL de la Imagen (Opcional)</label>
          <input
            id="imageUrl"
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
            placeholder="https://ejemplo.com/imagen.jpg"
          />
        </div>

        <div className="flex justify-end space-x-4 pt-4 border-t">
            <button
                type="button"
                onClick={() => setPage('home')}
                className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-md hover:bg-gray-300 transition-colors"
            >
                Cancelar
            </button>
            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-red-800 text-white font-bold py-2 px-6 rounded-md hover:bg-red-900 transition-colors disabled:bg-gray-400"
            >
                {isSubmitting ? 'Publicando...' : 'Publicar'}
            </button>
        </div>
      </form>
    </div>
  );
};

export default NewPostForm;
