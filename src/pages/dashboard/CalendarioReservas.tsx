import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { useReservas } from '../../context/ReservasContext';
import CalendarioSemanal from '../../components/reservas/CalendarioSemanal';
import DetalleReserva from '../../components/reservas/DetalleReserva';
import ConfiguracionHorario from '../../components/reservas/ConfiguracionHorario';

const CalendarioReservas: React.FC = () => {
  const { t } = useTranslation();
  const { 
    reservasProfesional, 
    cargandoReservas, 
    perfilProfesional,
    confirmarReserva, 
    completarReserva, 
    cancelarReserva,
    actualizarPerfilProfesional
  } = useReservas();
  
  const [vistaActiva, setVistaActiva] = useState<'calendario' | 'configuracion'>('calendario');
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date>(new Date());
  const [reservaSeleccionada, setReservaSeleccionada] = useState<string | null>(null);
  
  // Abrir modal de detalle de reserva
  const abrirDetalleReserva = (reservaId: string) => {
    setReservaSeleccionada(reservaId);
  };
  
  // Cerrar modal de detalle de reserva
  const cerrarDetalleReserva = () => {
    setReservaSeleccionada(null);
  };
  
  // Confirmar una reserva
  const handleConfirmarReserva = async (reservaId: string) => {
    try {
      await confirmarReserva(reservaId);
      cerrarDetalleReserva();
    } catch (error) {
      console.error('Error al confirmar reserva:', error);
      alert('No se pudo confirmar la reserva. Intente nuevamente.');
    }
  };
  
  // Completar una reserva
  const handleCompletarReserva = async (reservaId: string) => {
    try {
      await completarReserva(reservaId);
      cerrarDetalleReserva();
    } catch (error) {
      console.error('Error al completar reserva:', error);
      alert('No se pudo marcar la reserva como completada. Intente nuevamente.');
    }
  };
  
  // Cancelar una reserva
  const handleCancelarReserva = async (reservaId: string) => {
    if (window.confirm('¿Estás seguro de que deseas cancelar esta reserva? Esta acción no se puede deshacer.')) {
      try {
        await cancelarReserva(reservaId);
        cerrarDetalleReserva();
      } catch (error) {
        console.error('Error al cancelar reserva:', error);
        alert('No se pudo cancelar la reserva. Intente nuevamente.');
      }
    }
  };
  
  // Obtener la reserva seleccionada
  const getReservaSeleccionada = () => {
    if (!reservaSeleccionada) return null;
    return reservasProfesional.find(r => r.id === reservaSeleccionada) || null;
  };
  
  // Guardar configuración de horario
  const guardarConfiguracionHorario = async (disponibilidad: any, configHorario: any) => {
    try {
      await actualizarPerfilProfesional({
        disponibilidad,
        precioPorSesion: configHorario.precio,
        creditosPorSesion: configHorario.creditos,
        duracionSesion: configHorario.duracion,
        modalidades: configHorario.modalidades
      });
      
      setVistaActiva('calendario');
      alert('Configuración guardada correctamente');
    } catch (error) {
      console.error('Error al guardar la configuración:', error);
      alert('No se pudo guardar la configuración. Intente nuevamente.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Cabecera */}
            <div className="border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Calendario de Reservas</h1>
                
                <div className="flex space-x-4">
                  <button 
                    onClick={() => setVistaActiva('calendario')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${vistaActiva === 'calendario' ? 'bg-primario-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    Ver Calendario
                  </button>
                  <button 
                    onClick={() => setVistaActiva('configuracion')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${vistaActiva === 'configuracion' ? 'bg-primario-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    Configurar Horarios
                  </button>
                </div>
              </div>
            </div>
            
            {/* Contenido */}
            <div className="p-6">
              {cargandoReservas ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primario-600"></div>
                </div>
              ) : vistaActiva === 'calendario' ? (
                <CalendarioSemanal 
                  fechaSeleccionada={fechaSeleccionada}
                  setFechaSeleccionada={setFechaSeleccionada}
                  reservas={reservasProfesional}
                  abrirDetalleReserva={abrirDetalleReserva}
                />
              ) : (
                <ConfiguracionHorario 
                  perfilProfesional={perfilProfesional}
                  guardarConfiguracion={guardarConfiguracionHorario}
                />
              )}
            </div>
          </div>
          
          {/* Estadísticas rápidas */}
          {vistaActiva === 'calendario' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-primario-600">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-primario-100 text-primario-600 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Citas Hoy</div>
                    <div className="text-lg font-semibold text-gray-800">
                      {reservasProfesional.filter(r => {
                        const hoy = new Date();
                        const fechaReserva = new Date(r.fecha);
                        return fechaReserva.toDateString() === hoy.toDateString();
                      }).length}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-yellow-500">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Pendientes</div>
                    <div className="text-lg font-semibold text-gray-800">
                      {reservasProfesional.filter(r => r.estado === 'pendiente').length}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Confirmadas</div>
                    <div className="text-lg font-semibold text-gray-800">
                      {reservasProfesional.filter(r => r.estado === 'confirmada').length}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Completadas</div>
                    <div className="text-lg font-semibold text-gray-800">
                      {reservasProfesional.filter(r => r.estado === 'completada').length}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      {/* Modal de detalle de reserva */}
      {reservaSeleccionada && (
        <DetalleReserva 
          reserva={getReservaSeleccionada()}
          onClose={cerrarDetalleReserva}
          onConfirmar={handleConfirmarReserva}
          onCompletar={handleCompletarReserva}
          onCancelar={handleCancelarReserva}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default CalendarioReservas;
