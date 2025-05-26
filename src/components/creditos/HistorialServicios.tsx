import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { obtenerTransaccionesPorUsuario } from '../../data/transacciones';
import { beneficiosDisponibles } from '../../data/monetizacion';

interface Props {
  usuarioId: string;
}

const HistorialServicios: React.FC<Props> = ({ usuarioId }) => {
  const { t } = useTranslation();
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState<'semana' | 'mes' | 'trimestre' | 'todo'>('mes');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<'todos' | 'sesiones' | 'cuestionarios' | 'suscripciones'>('todos');
  
  // Obtenemos las transacciones del usuario
  const transacciones = obtenerTransaccionesPorUsuario(usuarioId);
  
  // Filtramos por período
  const filtrarPorPeriodo = () => {
    const ahora = new Date();
    let fechaMinima = new Date();
    
    switch (periodoSeleccionado) {
      case 'semana':
        fechaMinima.setDate(ahora.getDate() - 7);
        break;
      case 'mes':
        fechaMinima.setMonth(ahora.getMonth() - 1);
        break;
      case 'trimestre':
        fechaMinima.setMonth(ahora.getMonth() - 3);
        break;
      case 'todo':
      default:
        fechaMinima = new Date(0); // Desde el principio de los tiempos
        break;
    }
    
    return transacciones.filter(t => new Date(t.fecha) >= fechaMinima);
  };
  
  // Filtramos por categoría
  const filtrarPorCategoria = (transaccionesFiltradas: any[]) => {
    if (categoriaSeleccionada === 'todos') return transaccionesFiltradas;
    
    return transaccionesFiltradas.filter(t => t.producto.tipo === categoriaSeleccionada.slice(0, -1)); // Removemos la 's' final
  };
  
  // Aplicamos filtros
  const transaccionesFiltradas = filtrarPorCategoria(filtrarPorPeriodo());
  
  // Agrupamos por tipo de servicio para mostrar estadísticas
  const estadisticasPorTipo: Record<string, {cantidad: number, monto: number}> = {};
  
  transaccionesFiltradas.forEach(t => {
    if (t.tipo === 'ingreso' && t.estado === 'completada') {
      const tipo = t.producto.tipo;
      if (!estadisticasPorTipo[tipo]) {
        estadisticasPorTipo[tipo] = { cantidad: 0, monto: 0 };
      }
      estadisticasPorTipo[tipo].cantidad += 1;
      estadisticasPorTipo[tipo].monto += t.monto;
    }
  });
  
  // Calculamos las estadísticas generales
  const totalServicios = Object.values(estadisticasPorTipo).reduce((sum, item) => sum + item.cantidad, 0);
  const totalGastado = Object.values(estadisticasPorTipo).reduce((sum, item) => sum + item.monto, 0);
  
  // Obtenemos los beneficios activos para el usuario (simulado basado en su suscripción)
  // Asumimos que tiene el plan Premium (plan002)
  const planUsuario = 'plan002';
  const beneficiosActivos = beneficiosDisponibles.filter(b => b.aplicableA.includes(planUsuario));
  
  return (
    <div className="space-y-6">
      {/* Título de la sección */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Historial de Servicios</h2>
        
        <div className="flex space-x-2">
          <select 
            className="px-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primario-500 focus:border-primario-500"
            value={periodoSeleccionado}
            onChange={(e) => setPeriodoSeleccionado(e.target.value as any)}
          >
            <option value="semana">Última semana</option>
            <option value="mes">Último mes</option>
            <option value="trimestre">Último trimestre</option>
            <option value="todo">Todo el historial</option>
          </select>
          
          <select 
            className="px-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primario-500 focus:border-primario-500"
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value as any)}
          >
            <option value="todos">Todos los servicios</option>
            <option value="sesiones">Sesiones</option>
            <option value="cuestionarios">Cuestionarios</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>
      </div>
      
      {/* Resumen estadístico */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-sm text-gray-500 mb-1">Total servicios</h3>
          <p className="text-2xl font-bold text-gray-800">{totalServicios}</p>
          <p className="text-xs text-gray-500 mt-1">en el período seleccionado</p>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-sm text-gray-500 mb-1">Total invertido</h3>
          <p className="text-2xl font-bold text-primario-600">${totalGastado.toLocaleString()} COP</p>
          <p className="text-xs text-gray-500 mt-1">en salud mental</p>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-sm text-gray-500 mb-1">Servicio más usado</h3>
          <p className="text-2xl font-bold text-gray-800">
            {Object.entries(estadisticasPorTipo).sort((a, b) => b[1].cantidad - a[1].cantidad)[0]?.[0] || 'Ninguno'}
          </p>
          <p className="text-xs text-gray-500 mt-1">categoría preferida</p>
        </div>
      </div>
      
      {/* Lista detallada de servicios */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-800">Detalle de servicios utilizados</h3>
        </div>
        
        {transaccionesFiltradas.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {transaccionesFiltradas
              .filter(t => t.tipo === 'ingreso' && t.estado === 'completada')
              .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
              .map(transaccion => (
                <div key={transaccion.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800">{transaccion.concepto}</h4>
                      <p className="text-sm text-gray-500">
                        {new Date(transaccion.fecha).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                      <div className="mt-1 flex items-center">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          transaccion.producto.tipo === 'sesion' ? 'bg-blue-100 text-blue-800' :
                          transaccion.producto.tipo === 'cuestionario' ? 'bg-purple-100 text-purple-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {transaccion.producto.tipo}
                        </span>
                        
                        {transaccion.cuponAplicado && (
                          <span className="ml-2 text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                            Cupón: {transaccion.cuponAplicado.codigo}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold text-gray-800">${transaccion.monto.toLocaleString()} COP</p>
                      <p className="text-xs text-gray-500">Método: {transaccion.metodoPago}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p>No se encontraron servicios en el período seleccionado.</p>
          </div>
        )}
      </div>
      
      {/* Beneficios activos */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-primario-600 to-primario-700 p-4 text-white">
          <h3 className="font-medium">Beneficios activos con tu plan</h3>
        </div>
        
        {beneficiosActivos.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {beneficiosActivos.map(beneficio => (
              <div key={beneficio.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800">{beneficio.nombre}</h4>
                    <p className="text-sm text-gray-500">{beneficio.descripcion}</p>
                    
                    {beneficio.valor && (
                      <p className="text-xs text-green-600 mt-1">Valor: ${beneficio.valor.toLocaleString()} COP</p>
                    )}
                    
                    {beneficio.condiciones && (
                      <p className="text-xs text-gray-500 mt-1">{beneficio.condiciones}</p>
                    )}
                  </div>
                  
                  <div>
                    <button className="px-3 py-1 text-xs rounded-md bg-primario-100 text-primario-700 hover:bg-primario-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primario-500 transition-colors">
                      Usar beneficio
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            <p>No tienes beneficios activos con tu plan actual.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistorialServicios;
