import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import GraficosResultados from '../../components/analisis/GraficosResultados';
import { ResultadoCuestionario } from '../../tipos/cuestionarios';

const MiProgreso: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { historialCuestionarios } = useAppContext();
  const { sesion } = useAuth();
  const filtros = ['todos', 'PHQ9', 'GAD7', 'DASS21'];
  const [filtroActivo, setFiltroActivo] = useState<'todos' | 'PHQ9' | 'GAD7' | 'DASS21'>('todos');
  
  // Este componente debe estar protegido por RutaProtegida, pero aún así verificamos
  // para asegurarnos de que realmente hay un usuario autenticado
  if (!sesion.isAutenticado || !sesion.usuario) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Acceso Restringido</h2>
          <p className="text-gray-600 mb-6">Necesitas iniciar sesión para ver tu progreso y resultados.</p>
          <button 
            onClick={() => navigate('/login')} 
            className="px-6 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition-colors"
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    );
  }
  
  // Ordenar resultados por fecha (más reciente primero)
  const resultadosOrdenados = [...historialCuestionarios].sort((a, b) => 
    new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
  );
  
  // Aplicar filtro si es necesario
  const resultadosFiltrados = filtroActivo === 'todos' 
    ? resultadosOrdenados 
    : resultadosOrdenados.filter(r => r.tipo === filtroActivo);
  
  // Función para obtener el nivel de severidad del resultado
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
  
  const getColorClasificacion = (nivelSeveridad: string) => {
    switch (nivelSeveridad.toLowerCase()) {
      case 'muy severo':
      case 'severo':
        return 'bg-red-100 text-red-800';
      case 'moderadamente severo':
      case 'moderadamente-severo':
      case 'moderado':
        return 'bg-orange-100 text-orange-800';
      case 'leve':
        return 'bg-yellow-100 text-yellow-800';
      case 'mínimo':
      case 'minimo':
      case 'normal':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Encabezado */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Mi Progreso</h1>
          <button 
            onClick={() => navigate('/cuestionarios')} 
            className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
            Nuevo Cuestionario
          </button>
        </div>
        
        {/* Tarjeta de resumen */}
        <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg shadow-md p-6 mb-8 text-white">
          <h2 className="text-xl font-semibold mb-4">Resumen de Salud Mental</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/20 p-4 rounded-lg">
              <p className="text-sm">Cuestionarios realizados</p>
              <p className="text-3xl font-bold">{historialCuestionarios.length}</p>
            </div>
            <div className="bg-white/20 p-4 rounded-lg">
              <p className="text-sm">PHQ-9 (Depresión)</p>
              <p className="text-3xl font-bold">{historialCuestionarios.filter(r => r.tipo === 'PHQ9').length}</p>
            </div>
            <div className="bg-white/20 p-4 rounded-lg">
              <p className="text-sm">GAD-7 (Ansiedad)</p>
              <p className="text-3xl font-bold">{historialCuestionarios.filter(r => r.tipo === 'GAD7').length}</p>
            </div>
            <div className="bg-white/20 p-4 rounded-lg">
              <p className="text-sm">DASS-21</p>
              <p className="text-3xl font-bold">{historialCuestionarios.filter(r => r.tipo === 'DASS21').length}</p>
            </div>
          </div>
        </div>
        
        {/* Análisis gráfico */}
        <GraficosResultados tipo={filtroActivo === 'todos' ? undefined : filtroActivo} />
        
        {/* Historial de resultados */}
        <div className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Historial de Resultados</h3>
            <div className="flex space-x-2">
              {filtros.map((filtro) => (
                <button 
                  key={filtro}
                  onClick={() => setFiltroActivo(filtro as 'todos' | 'PHQ9' | 'GAD7' | 'DASS21')}
                  className={`px-3 py-1 rounded-md text-sm ${filtroActivo === filtro ? 'bg-cyan-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  {filtro === 'todos' ? 'Todos' : filtro === 'PHQ9' ? 'PHQ-9' : filtro === 'GAD7' ? 'GAD-7' : 'DASS-21'}
                </button>
              ))}
            </div>
          </div>
          
          {resultadosFiltrados.length > 0 ? (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cuestionario</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Puntuación</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nivel</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {resultadosFiltrados.map((resultado) => {
                    // Determinar color del nivel de severidad
                    const nivelSeveridad = getNivelSeveridad(resultado);
                    const colorClase = getColorClasificacion(nivelSeveridad);
                    
                    // Formatear fecha
                    const fecha = new Date(resultado.fecha);
                    const fechaFormateada = fecha.toLocaleDateString();
                    
                    return (
                      <tr key={resultado.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fechaFormateada}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {resultado.tipo === 'PHQ9' ? 'PHQ-9 (Depresión)' : 
                           resultado.tipo === 'GAD7' ? 'GAD-7 (Ansiedad)' : 
                           'DASS-21 (Depresión, Ansiedad y Estrés)'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{resultado.puntajeTotal || 0}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClase}`}>
                            {getNivelSeveridad(resultado)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            onClick={() => navigate(`/resultados/${resultado.id}`)}
                            className="text-cyan-600 hover:text-cyan-900"
                          >
                            Ver detalle
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <p className="text-gray-600">
                {filtroActivo === 'todos' 
                  ? 'Au00fan no tienes resultados de cuestionarios guardados.' 
                  : `No tienes resultados del cuestionario ${filtroActivo}.`}
              </p>
              <button 
                onClick={() => navigate('/cuestionarios')} 
                className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition-colors"
              >
                Realizar un cuestionario
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MiProgreso;
