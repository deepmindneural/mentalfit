import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreditos } from '../../context/CreditosContext';

interface EstadisticasCreditosProps {
  refreshKey?: number;
}

const EstadisticasCreditos: React.FC<EstadisticasCreditosProps> = ({ refreshKey = 0 }) => {
  const { t } = useTranslation();
  const { obtenerEstadisticasUso, cargando } = useCreditos();
  
  const [estadisticas, setEstadisticas] = useState<any>(null);
  const [cargandoStats, setCargandoStats] = useState(true);
  
  useEffect(() => {
    const cargarEstadisticas = async () => {
      setCargandoStats(true);
      try {
        const stats = await obtenerEstadisticasUso();
        setEstadisticas(stats);
      } catch (error) {
        console.error('Error al cargar estadísticas:', error);
      } finally {
        setCargandoStats(false);
      }
    };
    
    cargarEstadisticas();
  }, [obtenerEstadisticasUso, refreshKey]);
  
  if (cargandoStats || cargando) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 space-y-4 animate-pulse">
        <div className="h-7 w-60 bg-gray-200 rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-40 bg-gray-200 rounded"></div>
          <div className="h-40 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }
  
  if (!estadisticas) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="text-center py-8 text-gray-500">
          <p>{t('noHayDatosEstadisticas')}</p>
        </div>
      </div>
    );
  }
  
  const generarColores = (cantidad: number) => {
    const colores = [
      'bg-primario-500', 'bg-secundario-500', 'bg-acento-500', 
      'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 
      'bg-cyan-500', 'bg-indigo-500', 'bg-fuchsia-500'
    ];
    
    return Array(cantidad).fill(0).map((_, i) => colores[i % colores.length]);
  };
  
  const renderGraficoBarras = (datos: Record<string, number>, titulo: string) => {
    if (!datos || Object.keys(datos).length === 0) {
      return (
        <div className="p-4 text-center text-gray-500">
          <p>{t('sinDatosSuficientes')}</p>
        </div>
      );
    }
    
    const entradas = Object.entries(datos);
    const total = entradas.reduce((sum, [_, valor]) => sum + valor, 0);
    const colores = generarColores(entradas.length);
    
    return (
      <div className="px-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">{titulo}</h4>
        <div className="space-y-3">
          {entradas.map(([clave, valor], index) => {
            const porcentaje = (valor / total * 100).toFixed(1);
            return (
              <div key={clave} className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium truncate">{clave}</span>
                  <span className="text-gray-500">{porcentaje}% ({valor})</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${colores[index]}`} 
                    style={{ width: `${porcentaje}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  const renderGraficoCircular = (porcentaje: number, titulo: string, subtitulo: string) => {
    // Calcular ángulo para SVG
    const angulo = porcentaje * 3.6; // 360 grados = 100%
    const x = Math.cos((angulo - 90) * Math.PI / 180) * 70 + 100;
    const y = Math.sin((angulo - 90) * Math.PI / 180) * 70 + 100;
    const largeArcFlag = angulo > 180 ? 1 : 0;
    
    return (
      <div className="flex flex-col items-center justify-center py-4">
        <h4 className="text-sm font-medium text-gray-700 mb-4">{titulo}</h4>
        
        <div className="relative w-40 h-40 mb-3">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Círculo base gris */}
            <circle cx="100" cy="100" r="70" fill="none" stroke="#E5E7EB" strokeWidth="20" />
            
            {/* Arco de progreso */}
            {porcentaje > 0 && (
              <path 
                d={`M 100,30 A 70,70 0 ${largeArcFlag},1 ${x},${y}`} 
                fill="none" 
                stroke="#0ea5e9" 
                strokeWidth="20" 
                strokeLinecap="round"
              />
            )}
            
            {/* Texto central */}
            <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" className="text-2xl font-bold">
              {`${porcentaje.toFixed(0)}%`}
            </text>
          </svg>
        </div>
        
        <div className="text-sm text-gray-600 text-center">{subtitulo}</div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">{t('analisisUsoCreditos')}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gráfico de uso global */}
          <div className="border rounded-lg overflow-hidden">
            {renderGraficoCircular(
              estadisticas.porcentajeUso,
              t('utilizacionCreditos'),
              `${estadisticas.creditosGastados} ${t('de')} ${estadisticas.creditosTotales} ${t('creditos')}`
            )}
          </div>
          
          {/* Distribución por categoría */}
          <div className="border rounded-lg overflow-hidden">
            {renderGraficoBarras(
              estadisticas.distribucionPorConcepto, 
              t('distribucionPorServicio')
            )}
          </div>
        </div>
        
        {/* Tendencia por mes si hay suficientes datos */}
        {Object.keys(estadisticas.distribucionPorMes).length > 1 && (
          <div className="mt-6 border rounded-lg overflow-hidden">
            {renderGraficoBarras(
              estadisticas.distribucionPorMes, 
              t('tendenciaPorMes')
            )}
          </div>
        )}
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
          <div className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primario-600 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <div>
              <p className="font-medium">{t('consejosOptimizacion')}</p>
              <p className="mt-1">{t('consejoUsoCreditos')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstadisticasCreditos;
