import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { phq9Preguntas, interpretarPHQ9, generarRecomendaciones } from '../../data/cuestionarios';
import { RespuestaCuestionario, ResultadoCuestionario } from '../../tipos';

const PHQ9Form: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [respuestas, setRespuestas] = useState<RespuestaCuestionario[]>([]);
  const [enviando, setEnviando] = useState(false);

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
  };

  const getRespuestaValue = (preguntaId: number): number => {
    const respuesta = respuestas.find(r => r.preguntaId === preguntaId);
    return respuesta ? respuesta.respuesta : -1;
  };

  const calcularPuntajeTotal = (): number => {
    return respuestas.reduce((total, respuesta) => total + respuesta.respuesta, 0);
  };

  const todasPreguntasRespondidas = (): boolean => {
    return respuestas.length === phq9Preguntas.length;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!todasPreguntasRespondidas() || enviando) return;
    
    setEnviando(true);
    
    const puntajeTotal = calcularPuntajeTotal();
    const interpretacion = interpretarPHQ9(puntajeTotal);
    const recomendaciones = generarRecomendaciones('PHQ9', puntajeTotal);
    
    // Crear objeto de resultado
    const resultado: ResultadoCuestionario = {
      id: Date.now().toString(),
      tipo: 'PHQ9',
      puntajeTotal,
      interpretacion: `${interpretacion.nivel}: ${interpretacion.descripcion}`,
      recomendaciones,
      fecha: new Date().toISOString()
    };
    
    // Guardar en localStorage para persistencia (en una aplicación real iría a API)
    const resultadosAnteriores = JSON.parse(localStorage.getItem('resultadosCuestionarios') || '[]');
    localStorage.setItem('resultadosCuestionarios', JSON.stringify([...resultadosAnteriores, resultado]));
    
    // Navegar a página de resultados
    setTimeout(() => {
      navigate(`/resultados/${resultado.id}`);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('cuestionarioDepresion')}</h2>
      
      <div className="mb-6">
        <p className="text-gray-700">
          {t('instruccionesCuestionario')}
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-8">
          {phq9Preguntas.map((pregunta) => (
            <div key={pregunta.id} className="pb-6 border-b border-gray-200">
              <p className="font-medium text-gray-800 mb-4">{pregunta.id}. {pregunta.texto}</p>
              
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
        
        <div className="mt-8 flex justify-center">
          <button 
            type="submit" 
            className={`bg-primario-500 hover:bg-primario-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${!todasPreguntasRespondidas() || enviando ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!todasPreguntasRespondidas() || enviando}
          >
            {enviando ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('procesando')}
              </span>
            ) : t('enviarRespuestas')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PHQ9Form;
