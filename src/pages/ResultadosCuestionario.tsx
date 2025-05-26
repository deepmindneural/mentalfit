import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import RecomendacionesIA from '../components/cuestionarios/RecomendacionesIA';
import RecomendacionesDASS21 from '../components/cuestionarios/RecomendacionesDASS21';
import WhatsAppButton from '../components/shared/WhatsAppButton';
import IAChat from '../components/shared/IAChat';
import { ResultadoCuestionario } from '../tipos';
import { ResultadoCuestionarioDASS21 } from '../tipos/cuestionarios';

const ResultadosCuestionario: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [resultado, setResultado] = useState<ResultadoCuestionario | ResultadoCuestionarioDASS21 | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // En una aplicación real, esto sería una llamada a la API
    // Por ahora, obtenemos del localStorage
    const cargarResultado = () => {
      setCargando(true);
      try {
        const resultadosGuardados = JSON.parse(localStorage.getItem('resultadosCuestionarios') || '[]');
        const resultadoEncontrado = resultadosGuardados.find((r: ResultadoCuestionario) => r.id === id);
        
        if (resultadoEncontrado) {
          setResultado(resultadoEncontrado);
        }
      } catch (error) {
        console.error('Error al cargar resultado:', error);
      } finally {
        setCargando(false);
      }
    };

    cargarResultado();
  }, [id]);

  // Determinar color según tipo de cuestionario
  const getColorTema = () => {
    if (!resultado) return 'primario';
    
    switch(resultado.tipo) {
      case 'PHQ9': return 'blue';
      case 'GAD7': return 'purple';
      case 'DASS21': return 'teal';
      default: return 'primario';
    }
  };

  const colorTema = getColorTema();

  if (cargando) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primario-500"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!resultado) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('resultadoNoEncontrado')}</h2>
            <p className="text-gray-600 mb-8">{t('resultadoNoEncontradoDescripcion')}</p>
            <Link 
              to="/cuestionarios" 
              className="bg-primario-500 hover:bg-primario-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              {t('volverCuestionarios')}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Verificar si es un resultado DASS-21
  const esDASS21 = () => {
    return resultado?.tipo === 'DASS21';
  };
  
  // Obtener el resultado DASS-21 tipado
  const getResultadoDASS21 = () => {
    return resultado as ResultadoCuestionarioDASS21;
  };
  
  // Obtener el resultado estándar tipado
  const getResultadoEstandar = () => {
    return resultado as ResultadoCuestionario;
  };
  
  // Obtener texto de nivel para la UI
  const getNivelTexto = (interpretacion: string | undefined) => {
    if (!interpretacion) return '';
    const partes = interpretacion.split(':');
    return partes[0];
  };

  // Obtener color según nivel
  const getColorNivel = (nivel: string) => {
    switch (nivel.toLowerCase()) {
      case 'mínima':
      case 'mínima o nula':
        return 'bg-green-100 text-green-800';
      case 'leve':
        return 'bg-yellow-100 text-yellow-800';
      case 'moderada':
        return 'bg-orange-100 text-orange-800';
      case 'moderadamente severa':
        return 'bg-red-100 text-red-800';
      case 'severa':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Banner */}
      <section className={`pt-24 pb-10 bg-${colorTema}-600 text-white`}>
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">
            {resultado.tipo === 'PHQ9' ? t('resultadosDepresion') : 
             resultado.tipo === 'GAD7' ? t('resultadosAnsiedad') : 
             resultado.tipo === 'DASS21' ? t('resultadosDASS21') : t('resultadosCuestionario')}
          </h1>
          <p className="mt-2">{t('resultadosPersonalizados')}</p>
        </div>
      </section>
      
      <main className="flex-grow py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Resumen de resultados */}
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('resumenResultados')}</h2>
              
              {esDASS21() ? (
                <>
                  <div className="flex flex-col mb-6 pb-6 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-800">{t('cuestionarioDASS21')}</h3>
                      <span className="text-gray-600 text-sm">
                        {new Date(resultado.fecha).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Depresión */}
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h4 className="font-medium text-blue-800 mb-2">Depresión</h4>
                        <div className="flex items-center mb-2">
                          <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800`}>
                            {getResultadoDASS21().interpretaciones.depresion.nivel}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mt-2">
                          Puntaje: <span className="font-semibold">{getResultadoDASS21().puntajes.depresion}</span>
                        </p>
                        <p className="text-gray-700 text-sm mt-2">{getResultadoDASS21().interpretaciones.depresion.descripcion}</p>
                      </div>
                      
                      {/* Ansiedad */}
                      <div className="bg-purple-50 rounded-lg p-4">
                        <h4 className="font-medium text-purple-800 mb-2">Ansiedad</h4>
                        <div className="flex items-center mb-2">
                          <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800`}>
                            {getResultadoDASS21().interpretaciones.ansiedad.nivel}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mt-2">
                          Puntaje: <span className="font-semibold">{getResultadoDASS21().puntajes.ansiedad}</span>
                        </p>
                        <p className="text-gray-700 text-sm mt-2">{getResultadoDASS21().interpretaciones.ansiedad.descripcion}</p>
                      </div>
                      
                      {/* Estrés */}
                      <div className="bg-teal-50 rounded-lg p-4">
                        <h4 className="font-medium text-teal-800 mb-2">Estrés</h4>
                        <div className="flex items-center mb-2">
                          <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800`}>
                            {getResultadoDASS21().interpretaciones.estres.nivel}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mt-2">
                          Puntaje: <span className="font-semibold">{getResultadoDASS21().puntajes.estres}</span>
                        </p>
                        <p className="text-gray-700 text-sm mt-2">{getResultadoDASS21().interpretaciones.estres.descripcion}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-end">
                      <Link 
                        to="/cuestionarios/dass21" 
                        className={`bg-${colorTema}-500 hover:bg-${colorTema}-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200`}
                      >
                        {t('realizarNuevamente')}
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col md:flex-row md:items-center mb-6 pb-6 border-b border-gray-200">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getColorNivel(getNivelTexto(getResultadoEstandar().interpretacion))}`}>
                          {getNivelTexto(getResultadoEstandar().interpretacion)}
                        </span>
                        <span className="ml-3 text-gray-600 text-sm">
                          {new Date(resultado.fecha).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {resultado.tipo === 'PHQ9' ? t('cuestionarioDepresion') : t('cuestionarioAnsiedad')}
                      </h3>
                      <p className="text-gray-600 mt-2">
                        {t('puntajeTotal')}: <span className="font-semibold">{getResultadoEstandar().puntajeTotal}</span> / 
                        {resultado.tipo === 'PHQ9' ? '27' : '21'}
                      </p>
                    </div>
                    
                    <div className="mt-4 md:mt-0">
                      <Link 
                        to={`/cuestionarios/${resultado.tipo.toLowerCase()}`} 
                        className={`bg-${colorTema}-500 hover:bg-${colorTema}-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200`}
                      >
                        {t('realizarNuevamente')}
                      </Link>
                    </div>
                  </div>
                  
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">{t('interpretacionResultados')}</h3>
                    <p className="text-gray-700">
                      {getResultadoEstandar().interpretacion.split(':')[1]?.trim() || getResultadoEstandar().interpretacion}
                    </p>
                  </div>
                </>
              )}
              
              {/* Recomendaciones */}
              {esDASS21() ? (
                <RecomendacionesDASS21 recomendaciones={getResultadoDASS21().recomendaciones} />
              ) : (
                <RecomendacionesIA recomendaciones={getResultadoEstandar().recomendaciones} />
              )}
            </div>
            
            {/* Próximos pasos */}
            <div className={`bg-${colorTema}-50 border border-${colorTema}-200 rounded-xl p-6`}>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('proximosPasos')}</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className={`bg-${colorTema}-100 rounded-full p-2 mt-1 mr-4`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-${colorTema}-700`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{t('guardarResultados')}</h4>
                    <p className="text-gray-600 text-sm">{t('guardarResultadosDescripcion')}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className={`bg-${colorTema}-100 rounded-full p-2 mt-1 mr-4`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-${colorTema}-700`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{t('seguirRecomendaciones')}</h4>
                    <p className="text-gray-600 text-sm">{t('seguirRecomendacionesDescripcion')}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className={`bg-${colorTema}-100 rounded-full p-2 mt-1 mr-4`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-${colorTema}-700`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{t('consultarEspecialista')}</h4>
                    <p className="text-gray-600 text-sm">{t('consultarEspecialistaDescripcion')}</p>
                    <Link 
                      to="/especialistas" 
                      className="text-primario-600 hover:text-primario-700 text-sm font-medium inline-flex items-center mt-2"
                    >
                      {t('buscarEspecialistas')}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* WhatsApp Botón flotante */}
      <WhatsAppButton telefono="573001234567" flotante={true} />
      
      {/* Chat IA */}
      <IAChat />
    </div>
  );
};

export default ResultadosCuestionario;
