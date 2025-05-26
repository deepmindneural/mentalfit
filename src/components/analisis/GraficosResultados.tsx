import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { ResultadoCuestionario, CONFIGURACION_CUESTIONARIOS, Recomendacion } from '../../tipos/cuestionarios';
import { ResultadoCuestionarioDASS21 } from '../../tipos/cuestionarios';

interface GraficosResultadosProps {
  tipo?: 'PHQ9' | 'GAD7' | 'DASS21'; // Si se especifica, solo muestra los resultados de ese tipo
}

const GraficosResultados: React.FC<GraficosResultadosProps> = ({ tipo }) => {
  const { historialCuestionarios } = useAppContext();
  
  // Función para obtener el puntaje total
  const getPuntajeTotal = (resultado: ResultadoCuestionario): number => {
    return resultado.puntajeTotal || 0;
  };
  
  // Función para obtener el nivel de severidad
  const getNivelSeveridad = (resultado: ResultadoCuestionario): string => {
    // Extraer de la interpretación (formato: "Nivel: Descripción")
    if (resultado.interpretacion) {
      const partes = resultado.interpretacion.split(':');
      if (partes.length > 0) {
        return partes[0].trim().replace('-', ' ');
      }
    }
    return 'No disponible';
  };
  
  // Filtrar por tipo si es necesario
  const resultadosFiltrados = tipo 
    ? historialCuestionarios.filter(r => r.tipo === tipo)
    : historialCuestionarios;
    
  // Ordenar por fecha (más reciente primero)
  const resultadosOrdenados = [...resultadosFiltrados].sort((a, b) => 
    new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
  );
  
  // Obtener el último resultado de cada tipo
  const ultimoPHQ9 = resultadosOrdenados.find(r => r.tipo === 'PHQ9');
  const ultimoGAD7 = resultadosOrdenados.find(r => r.tipo === 'GAD7');
  const ultimoDASS21 = resultadosOrdenados.find(r => r.tipo === 'DASS21');
  
  // Verificar si hay datos suficientes para mostrar
  if (resultadosOrdenados.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Análisis de Resultados</h3>
        <p className="text-gray-600">Aún no tienes resultados de cuestionarios. Completa un cuestionario para ver tu análisis.</p>
      </div>
    );
  }
  
  // Obtener historial de puntuaciones para gráficos
  const historialPHQ9 = resultadosOrdenados
    .filter(r => r.tipo === 'PHQ9')
    .slice(0, 5) // Últimos 5 resultados
    .reverse(); // Del más antiguo al más reciente para la gráfica
  
  const historialGAD7 = resultadosOrdenados
    .filter(r => r.tipo === 'GAD7')
    .slice(0, 5) // Últimos 5 resultados
    .reverse();
    
  const historialDASS21 = resultadosOrdenados
    .filter(r => r.tipo === 'DASS21')
    .slice(0, 5) // Últimos 5 resultados
    .reverse(); // Del más antiguo al más reciente para la gráfica
  
  // Calcular si ha habido mejora o empeoramiento
  const calcularTendencia = (historial: ResultadoCuestionario[]) => {
    if (historial.length < 2) return 'estable';
    
    const primeraP = getPuntajeTotal(historial[0]);
    const ultimaP = getPuntajeTotal(historial[historial.length - 1]);
    
    const diff = ultimaP - primeraP;
    
    // Mayor puntuación = peor estado
    if (diff < -3) return 'mejora-significativa';
    if (diff < 0) return 'mejora-leve';
    if (diff === 0) return 'estable';
    if (diff <= 3) return 'empeoramiento-leve';
    return 'empeoramiento-significativo';
  };
  
  const tendenciaPHQ9 = calcularTendencia(historialPHQ9);
  const tendenciaGAD7 = calcularTendencia(historialGAD7);
  const tendenciaDASS21 = calcularTendencia(historialDASS21);
  
  // Generar mensajes de tendencia
  const obtenerMensajeTendencia = (tendencia: string, tipo: 'PHQ9' | 'GAD7' | 'DASS21') => {
    let condicion = 'bienestar emocional';
    if (tipo === 'PHQ9') condicion = 'depresión';
    else if (tipo === 'GAD7') condicion = 'ansiedad';
    else if (tipo === 'DASS21') condicion = 'depresión, ansiedad y estrés';
    
    switch(tendencia) {
      case 'mejora-significativa':
        return `Has mostrado una mejora significativa en tus síntomas de ${condicion}. ¡Sigue así!`;
      case 'mejora-leve':
        return `Estás experimentando una leve mejoría en tus síntomas de ${condicion}.`;
      case 'estable':
        return `Tus síntomas de ${condicion} se mantienen estables.`;
      case 'empeoramiento-leve':
        return `Has experimentado un leve incremento en tus síntomas de ${condicion}. Considera consultar con un especialista.`;
      case 'empeoramiento-significativo':
        return `Tus síntomas de ${condicion} han aumentado significativamente. Te recomendamos consultar con un especialista pronto.`;
      default:
        return '';
    }
  };
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Análisis de Resultados</h3>
      
      {/* Visualización gráfica usando barras de colores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {(!tipo || tipo === 'PHQ9') && ultimoPHQ9 && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-medium text-gray-700 mb-3">Historial PHQ-9 (Depresión)</h4>
            <div className="flex items-center mb-2">
              <div className="flex-grow h-7 bg-gray-200 rounded-full overflow-hidden">
                {historialPHQ9.map((resultado, index) => {
                  // Determinar color basado en severidad
                  let color;
                  const nivelSeveridad = getNivelSeveridad(resultado).toLowerCase();
                  if (nivelSeveridad === 'minimo' || nivelSeveridad === 'miñimo' || nivelSeveridad === 'normal') color = 'bg-green-500';
                  else if (nivelSeveridad === 'leve') color = 'bg-yellow-400';
                  else if (nivelSeveridad === 'moderado') color = 'bg-orange-500';
                  else if (nivelSeveridad === 'moderadamente-severo' || nivelSeveridad === 'moderadamente severo') color = 'bg-red-400';
                  else color = 'bg-red-600';
                  
                  // Calcular porcentaje para la barra - PHQ9 tiene max 27 puntos
                  const porcentaje = (getPuntajeTotal(resultado) / 27) * 100;
                  
                  return (
                    <div 
                      key={index}
                      style={{ width: `${100/historialPHQ9.length}%` }}
                      className="relative h-full border-r border-white last:border-r-0"
                    >
                      <div 
                        className={`absolute bottom-0 w-full ${color}`}
                        style={{ height: `${porcentaje}%` }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-4">
              {historialPHQ9.length > 0 && (
                <span>
                  Último resultado: <span className="font-medium">{getPuntajeTotal(ultimoPHQ9)}</span> puntos ({getNivelSeveridad(ultimoPHQ9)})
                </span>
              )}
            </div>
            {tendenciaPHQ9 && (
              <p className={`text-sm ${tendenciaPHQ9.includes('mejora') ? 'text-green-600' : 
                tendenciaPHQ9 === 'estable' ? 'text-blue-600' : 'text-red-600'}`}>
                {obtenerMensajeTendencia(tendenciaPHQ9, 'PHQ9')}
              </p>
            )}
          </div>
        )}
        
        {(!tipo || tipo === 'GAD7') && ultimoGAD7 && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-medium text-gray-700 mb-3">Historial GAD-7 (Ansiedad)</h4>
            <div className="flex items-center mb-2">
              <div className="flex-grow h-7 bg-gray-200 rounded-full overflow-hidden">
                {historialGAD7.map((resultado, index) => {
                  // Determinar color basado en severidad
                  let color;
                  const nivelSeveridad = getNivelSeveridad(resultado).toLowerCase();
                  if (nivelSeveridad === 'minimo' || nivelSeveridad === 'miñimo' || nivelSeveridad === 'normal') color = 'bg-green-500';
                  else if (nivelSeveridad === 'leve') color = 'bg-yellow-400';
                  else if (nivelSeveridad === 'moderado') color = 'bg-orange-500';
                  else color = 'bg-red-600';
                  
                  // Calcular porcentaje para la barra - GAD7 tiene max 21 puntos
                  const porcentaje = (getPuntajeTotal(resultado) / 21) * 100;
                  
                  return (
                    <div 
                      key={index}
                      style={{ width: `${100/historialGAD7.length}%` }}
                      className="relative h-full border-r border-white last:border-r-0"
                    >
                      <div 
                        className={`absolute bottom-0 w-full ${color}`}
                        style={{ height: `${porcentaje}%` }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-4">
              {historialGAD7.length > 0 && (
                <span>
                  Último resultado: <span className="font-medium">{getPuntajeTotal(ultimoGAD7)}</span> puntos ({getNivelSeveridad(ultimoGAD7)})
                </span>
              )}
            </div>
            {tendenciaGAD7 && (
              <p className={`text-sm ${tendenciaGAD7.includes('mejora') ? 'text-green-600' : 
                tendenciaGAD7 === 'estable' ? 'text-blue-600' : 'text-red-600'}`}>
                {obtenerMensajeTendencia(tendenciaGAD7, 'GAD7')}
              </p>
            )}
          </div>
        )}
        
        {(!tipo || tipo === 'DASS21') && ultimoDASS21 && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-medium text-gray-700 mb-3">Historial DASS-21 (Depresión, Ansiedad y Estrés)</h4>
            <div className="flex items-center mb-2">
              <div className="flex-grow h-7 bg-gray-200 rounded-full overflow-hidden">
                {historialDASS21.map((resultado, index) => {
                  // Determinar color basado en severidad
                  let color;
                  const nivelSeveridad = getNivelSeveridad(resultado).toLowerCase();
                  if (nivelSeveridad === 'normal') color = 'bg-green-500';
                  else if (nivelSeveridad === 'leve') color = 'bg-yellow-400';
                  else if (nivelSeveridad === 'moderado') color = 'bg-orange-500';
                  else if (nivelSeveridad === 'severo') color = 'bg-red-400';
                  else color = 'bg-red-600';
                  
                  // Calcular porcentaje para la barra - DASS21 tiene max 126 puntos total (42 por subescala)
                  const porcentaje = (getPuntajeTotal(resultado) / 126) * 100;
                  
                  return (
                    <div 
                      key={index}
                      style={{ width: `${100/historialDASS21.length}%` }}
                      className="relative h-full border-r border-white last:border-r-0"
                    >
                      <div 
                        className={`absolute bottom-0 w-full ${color}`}
                        style={{ height: `${porcentaje}%` }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-4">
              {historialDASS21.length > 0 && (
                <span>
                  Último resultado: <span className="font-medium">{getPuntajeTotal(ultimoDASS21)}</span> puntos ({getNivelSeveridad(ultimoDASS21)})
                </span>
              )}
            </div>
            {tendenciaDASS21 && (
              <p className={`text-sm ${tendenciaDASS21.includes('mejora') ? 'text-green-600' : 
                tendenciaDASS21 === 'estable' ? 'text-blue-600' : 'text-red-600'}`}>
                {obtenerMensajeTendencia(tendenciaDASS21, 'DASS21')}
              </p>
            )}
          </div>
        )}
      </div>
      
      {/* Recomendaciones específicas */}
      <div className="mt-5">
        <h4 className="text-lg font-medium text-gray-700 mb-3">Recomendaciones Personalizadas</h4>
        <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4 rounded-r-md">
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {ultimoPHQ9 && ultimoPHQ9.recomendaciones && ultimoPHQ9.recomendaciones.slice(0, 2).map((rec, idx) => (
              <li key={`phq9-${idx}`}>{rec}</li>
            ))}
            {ultimoGAD7 && ultimoGAD7.recomendaciones && ultimoGAD7.recomendaciones.slice(0, 2).map((rec, idx) => (
              <li key={`gad7-${idx}`}>{rec}</li>
            ))}
            {ultimoDASS21 && ultimoDASS21.recomendaciones && ultimoDASS21.recomendaciones.slice(0, 2).map((rec, idx) => (
              <li key={`dass21-${idx}`}>{rec}</li>
            ))}
            <li className="text-cyan-700 font-medium">
              Para un análisis más detallado, te recomendamos consultar con uno de nuestros especialistas.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GraficosResultados;
