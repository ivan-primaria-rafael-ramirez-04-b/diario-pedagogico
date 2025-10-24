
import React, { useState } from 'react';
import { getPedagogicalSuggestion } from '../services/geminiService';
import { Sparkles } from 'lucide-react';

// A simple markdown-to-html renderer
const SimpleMarkdown: React.FC<{ text: string }> = ({ text }) => {
    const formatText = (txt: string) => {
        return txt
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br />');
    };

    return <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: formatText(text) }} />;
};


const AIAssistant: React.FC = () => {
  const [context, setContext] = useState<string>('Grupo multigrado (3° y 4°), escuela rural con acceso limitado a internet.');
  const [topic, setTopic] = useState<string>('El ciclo del agua y su importancia para la comunidad.');
  const [objective, setObjective] = useState<string>('Que los alumnos comprendan las fases del ciclo del agua y lo relacionen con actividades locales como la agricultura.');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [suggestion, setSuggestion] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuggestion('');
    setError('');
    try {
      const result = await getPedagogicalSuggestion(context, topic, objective);
      setSuggestion(result);
    } catch (err) {
      setError('Ocurrió un error al contactar al asistente de IA.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
      <div className="flex items-center mb-6">
        <Sparkles className="w-10 h-10 text-red-800 mr-4" />
        <div>
            <h2 className="text-3xl font-bold text-red-900">Asistente Pedagógico con IA</h2>
            <p className="text-gray-600">Obtén sugerencias de actividades adaptadas a tu contexto escolar.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="context" className="block text-sm font-medium text-gray-700 mb-1">Contexto del Aula</label>
          <textarea
            id="context"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            rows={3}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
            placeholder="Ej: Grupo de 25 alumnos, 5° grado, escuela urbana..."
          />
        </div>
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">Tema a Desarrollar</label>
          <input
            id="topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
            placeholder="Ej: Las fracciones equivalentes"
          />
        </div>
        <div>
          <label htmlFor="objective" className="block text-sm font-medium text-gray-700 mb-1">Objetivo de Aprendizaje</label>
          <input
            id="objective"
            type="text"
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
            placeholder="Ej: Que los alumnos identifiquen y representen fracciones equivalentes."
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center bg-red-800 text-white font-bold py-3 px-4 rounded-md hover:bg-red-900 transition-colors disabled:bg-gray-400"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generando...
            </>
          ) : (
            'Generar Sugerencias'
          )}
        </button>
      </form>

      {error && <p className="mt-4 text-red-600">{error}</p>}

      {suggestion && (
        <div className="mt-8 border-t pt-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Sugerencias Generadas</h3>
          <div className="bg-gray-50 p-6 rounded-md text-gray-800 leading-relaxed">
            <SimpleMarkdown text={suggestion} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
