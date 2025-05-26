import React from 'react';
import { useTranslation } from 'react-i18next';

interface Reserva {
  id: string;
  especialistaId: string;
  usuarioId: string;
  fecha: string;
  hora: string;
  estado: 'pendiente' | 'confirmada' | 'completada' | 'cancelada';
  precio: number;
  creditos: number;
  createdAt: string;
  motivoConsulta?: string;
  notas?: string;
  modalidad: 'presencial' | 'virtual';
  especialistaNombre: string;
  especialistaApellido: string;
  especialistaEspecialidad: string;
  especialistaFoto: string;
  usuarioNombre: string;
  usuarioApellido: string;
  usuarioEmail: string;
}

interface DetalleReservaProps {
  reserva: Reserva | null;
  onClose: () => void;
  onConfirmar: (reservaId: string) => Promise<void>;
  onCompletar: (reservaId: string) => Promise<void>;
  onCancelar: (reservaId: string) => Promise<void>;
}

const DetalleReserva: React.FC<DetalleReservaProps> = ({
  reserva,
  onClose,
  onConfirmar,
  onCompletar,
  onCancelar
}) => {
  const { t } = useTranslation();
  const [accion, setAccion] = React.useState<string | null>(null);
  const [cargando, setCargando] = React.useState(false);
  
  if (!reserva) return null;
  
  const formatearFecha = (fechaStr: string) => {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const formatearHora = (hora: string) => {
    return hora;
  };
  
  const getEstadoClase = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return 'bg-amber-100 text-amber-800';
      case 'confirmada':
        return 'bg-green-100 text-green-800';
      case 'completada':
        return 'bg-blue-100 text-blue-800';
      case 'cancelada':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const handleAction = async (action: string) => {
    setCargando(true);
    setAccion(action);
    
    try {
      switch (action) {
        case 'confirmar':
          await onConfirmar(reserva.id);
          break;
        case 'completar':
          await onCompletar(reserva.id);
          break;
        case 'cancelar':
          await onCancelar(reserva.id);
          break;
      }
    } catch (error) {
      console.error(`Error al ${action} la reserva:`, error);
    } finally {
      setCargando(false);
      setAccion(null);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        {/* Cabecera */}
        <div className="bg-primario-600 text-white px-6 py-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold">Detalle de Reserva</h3>
          <button 
            onClick={onClose}
            className="text-white hover:text-primario-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Contenido */}
        <div className="p-6">
          {/* Estado de la reserva */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm text-gray-500">Estado</span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoClase(reserva.estado)}`}>
              {reserva.estado.charAt(0).toUpperCase() + reserva.estado.slice(1)}
            </span>
          </div>
          
          {/* Datos del usuario */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Paciente</h4>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-primario-100 flex items-center justify-center text-primario-600 font-medium mr-3">
                {reserva.usuarioNombre.charAt(0)}{reserva.usuarioApellido.charAt(0)}
              </div>
              <div>
                <div className="font-medium text-gray-800">{reserva.usuarioNombre} {reserva.usuarioApellido}</div>
                <div className="text-xs text-gray-500">{reserva.usuarioEmail}</div>
              </div>
            </div>
          </div>
          
          {/* Detalles de la cita */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Detalles de la cita</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-500">Fecha</div>
                  <div className="font-medium text-gray-800">{formatearFecha(reserva.fecha)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Hora</div>
                  <div className="font-medium text-gray-800">{formatearHora(reserva.hora)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Modalidad</div>
                  <div className="font-medium text-gray-800">
                    {reserva.modalidad === 'virtual' ? 'Virtual' : 'Presencial'}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Créditos</div>
                  <div className="font-medium text-gray-800">{reserva.creditos}</div>
                </div>
              </div>
              
              {reserva.motivoConsulta && (
                <div className="mt-4">
                  <div className="text-xs text-gray-500 mb-1">Motivo de consulta</div>
                  <div className="text-sm text-gray-800">{reserva.motivoConsulta}</div>
                </div>
              )}
              
              {reserva.notas && (
                <div className="mt-4">
                  <div className="text-xs text-gray-500 mb-1">Notas adicionales</div>
                  <div className="text-sm text-gray-800">{reserva.notas}</div>
                </div>
              )}
            </div>
          </div>
          
          {/* Acciones */}
          <div className="flex space-x-3 mt-6">
            {reserva.estado === 'pendiente' && (
              <button
                onClick={() => handleAction('confirmar')}
                disabled={cargando}
                className={`flex-1 py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors ${cargando && accion === 'confirmar' ? 'opacity-75' : ''}`}
              >
                {cargando && accion === 'confirmar' ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Confirmando...
                  </span>
                ) : 'Confirmar Cita'}
              </button>
            )}
            
            {reserva.estado === 'confirmada' && (
              <button
                onClick={() => handleAction('completar')}
                disabled={cargando}
                className={`flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors ${cargando && accion === 'completar' ? 'opacity-75' : ''}`}
              >
                {cargando && accion === 'completar' ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Completando...
                  </span>
                ) : 'Marcar como Completada'}
              </button>
            )}
            
            {(reserva.estado === 'pendiente' || reserva.estado === 'confirmada') && (
              <button
                onClick={() => handleAction('cancelar')}
                disabled={cargando}
                className={`py-2 px-4 border border-red-600 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors ${cargando && accion === 'cancelar' ? 'opacity-75' : ''}`}
              >
                {cargando && accion === 'cancelar' ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Cancelando...
                  </span>
                ) : 'Cancelar'}
              </button>
            )}
            
            {reserva.estado === 'completada' || reserva.estado === 'cancelada' ? (
              <button
                onClick={onClose}
                className="flex-1 py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
              >
                Cerrar
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleReserva;
