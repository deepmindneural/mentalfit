import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { dass21Preguntas, interpretarDASS21, generarRecomendacionesDASS21 } from '../../data/cuestionarioDASS21';
import { RespuestaCuestionario } from '../../tipos';
import { ResultadoCuestionarioDASS21, InterpretacionDASS21 } from '../../tipos/cuestionarios';
import { useAuth } from '../../context/AuthContext';

const DASS21Form: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { sesion } = useAuth();
  const [respuestas, setRespuestas] = useState<RespuestaCuestionario[]>([]);
  const [enviando, setEnviando] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 7;
  
  // Progreso del cuestionario
  const progress = Math.min(100, Math.round((respuestas.length / dass21Preguntas.length) * 100));

  useEffect(() => {
    // Si hay respuestas guardadas en localStorage, recuperarlas
    const savedResponses = localStorage.getItem('dass21_temp_responses');
    if (savedResponses) {
      setRespuestas(JSON.parse(savedResponses));
    }
  }, []);

  // Guardar respuestas temporalmente en localStorage
  useEffect(() => {
    if (respuestas.length > 0) {
      localStorage.setItem('dass21_temp_responses', JSON.stringify(respuestas));
    }
  }, [respuestas]);

  const handleRespuesta = (preguntaId: number, valor: number) => {
    const respuestaExistente = respuestas.find(r => r.preguntaId === preguntaId);
    
    if (respuestaExistente) {
      setRespuestas(prevRespuestas => 
        prevRespuestas.map(r => 
          r.preguntaId === preguntaId ? { ...r, respuesta: valor } : r
        )
      );
    } else {
      setRespuestas(prevRespuestas => [
        ...prevRespuestas,
        { preguntaId, respuesta: valor }
      ]);
    }
    
    // Autoavanzar a la siguiente pregunta si está en la última de la página
    const currentPageQuestions = getCurrentPageQuestions();
    if (currentPageQuestions.length > 0 && preguntaId === currentPageQuestions[currentPageQuestions.length - 1].id) {
      const nextQuestion = dass21Preguntas.find(q => !respuestas.some(r => r.preguntaId === q.id) && q.id > preguntaId);
      if (nextQuestion) {
        const nextPage = Math.ceil(nextQuestion.id / questionsPerPage);
        if (nextPage > currentPage) {
          setTimeout(() => setCurrentPage(nextPage), 300);
        }
      }
    }
  };

  const getRespuestaValue = (preguntaId: number): number => {
    const respuesta = respuestas.find(r => r.preguntaId === preguntaId);
    return respuesta ? respuesta.respuesta : -1;
  };
  
  const getCurrentPageQuestions = () => {
    const startIndex = (currentPage - 1) * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    return dass21Preguntas.slice(startIndex, endIndex);
  };

  const calcularPuntajes = () => {
    const puntajes = {
      depresion: 0,
      ansiedad: 0,
      estres: 0
    };
    
    // Sumar los puntajes por categoría
    respuestas.forEach(respuesta => {
      const pregunta = dass21Preguntas.find(p => p.id === respuesta.preguntaId);
      // Usar aserción de tipo para las propiedades adicionales
      const preguntaConCategoria = pregunta as (typeof pregunta & { categoria?: 'depresion' | 'ansiedad' | 'estres' });
      if (preguntaConCategoria && preguntaConCategoria.categoria && ['depresion', 'ansiedad', 'estres'].includes(preguntaConCategoria.categoria)) {
        puntajes[preguntaConCategoria.categoria] += respuesta.respuesta;
      }
    });
    
    return puntajes;
  };

  const todasPreguntasRespondidas = (): boolean => {
    return respuestas.length === dass21Preguntas.length;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!todasPreguntasRespondidas() || enviando) return;
    
    setEnviando(true);
    
    // Calcular puntajes
    const puntajes = calcularPuntajes();
    
    // Obtener interpretaciones y recomendaciones
    const interpretaciones = interpretarDASS21(puntajes);
    const recomendaciones = generarRecomendacionesDASS21(puntajes) as {
      titulo: string;
      descripcion: string;
      tipo: 'general' | 'depresion' | 'ansiedad' | 'estres';
    }[];
    
    // Crear objeto de resultado
    const resultado: ResultadoCuestionarioDASS21 = {
      id: `dass21_${Date.now().toString()}`,
      tipo: 'DASS21',
      fecha: new Date().toISOString(),
      puntajes,
      interpretaciones,
      recomendaciones,
      usuarioId: sesion.isAutenticado ? sesion.usuario?.id : undefined
    };
    
    // Guardar en localStorage para persistencia (en una aplicación real iría a API)
    const resultadosAnteriores = JSON.parse(localStorage.getItem('resultadosCuestionarios') || '[]');
    localStorage.setItem('resultadosCuestionarios', JSON.stringify([...resultadosAnteriores, resultado]));
    
    // Limpiar las respuestas temporales
    localStorage.removeItem('dass21_temp_responses');
    
    // Navegar a página de resultados
    setTimeout(() => {
      navigate(`/resultados/${resultado.id}`);
    }, 1000);
  };
  
  // Avanzar a la siguiente página
  const handleNextPage = () => {
    const currentPageQuestions = getCurrentPageQuestions();
    const allCurrentAnswered = currentPageQuestions.every(q => respuestas.some(r => r.preguntaId === q.id));
    
    if (allCurrentAnswered) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      alert('Por favor responde todas las preguntas de esta página antes de continuar.');
    }
  };
  
  // Regresar a la página anterior
  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
    window.scrollTo(0, 0);
  };
  
  // Formatear categoría para mostrar en UI
  const formatCategoria = (categoria: string) => {
    switch (categoria) {
      case 'depresion': return '(Depresión)';
      case 'ansiedad': return '(Ansiedad)';
      case 'estres': return '(Estrés)';
      default: return '';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('cuestionarioDASS21')}</h2>
      
      <div className="mb-6">
        <p className="text-gray-700 mb-4">
          {t('instruccionesDASS21')}
        </p>
        
        {/* Barra de progreso */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div 
            className="bg-primario-600 h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-right text-sm text-gray-500">{progress}% completado</div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-8">
          {getCurrentPageQuestions().map((pregunta) => (
            <div key={pregunta.id} className="pb-6 border-b border-gray-200">
              <div className="flex items-start">
                <p className="font-medium text-gray-800 mb-4 flex-1">
                  {pregunta.id}. {pregunta.texto} 
                  <span className="ml-2 text-xs font-normal text-primario-600">
                    {(pregunta as any).categoria ? formatCategoria((pregunta as any).categoria) : ''}
                  </span>
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {pregunta.opciones.map((opcion, index) => (
                  <div key={index}>
                    <label 
                      className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${getRespuestaValue(pregunta.id) === opcion.valor ? 'bg-primario-50 border-primario-500 text-primario-700' : 'border-gray-300 hover:bg-gray-50'}`}
                    >
                      <input 
                        type="radio" 
                        name={`pregunta-${pregunta.id}`} 
                        value={opcion.valor} 
                        checked={getRespuestaValue(pregunta.id) === opcion.valor}
                        onChange={() => handleRespuesta(pregunta.id, opcion.valor)}
                        className="sr-only" 
                      />
                      <span className="text-sm">{opcion.texto}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Navegación entre páginas */}
        <div className="mt-8 flex justify-between">
          {currentPage > 1 && (
            <button 
              type="button"
              onClick={handlePrevPage}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Anterior
            </button>
          )}
          
          {currentPage < Math.ceil(dass21Preguntas.length / questionsPerPage) ? (
            <button 
              type="button"
              onClick={handleNextPage}
              className="ml-auto bg-primario-500 hover:bg-primario-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Siguiente
            </button>
          ) : (
            <button 
              type="submit" 
              className={`ml-auto bg-primario-500 hover:bg-primario-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${!todasPreguntasRespondidas() || enviando ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!todasPreguntasRespondidas() || enviando}
            >
              {enviando ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('procesando')}
                </span>
              ) : t('enviarRespuestas')}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default DASS21Form;
