import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface Reserva {
  id: string;
  fecha: string;
  hora: string;
  estado: 'pendiente' | 'confirmada' | 'completada' | 'cancelada';
  usuarioNombre: string;
  usuarioApellido: string;
}

interface CalendarioSemanalProps {
  fechaSeleccionada: Date;
  setFechaSeleccionada: (fecha: Date) => void;
  reservas: Reserva[];
  abrirDetalleReserva: (reservaId: string) => void;
}

const CalendarioSemanal: React.FC<CalendarioSemanalProps> = ({
  fechaSeleccionada,
  setFechaSeleccionada,
  reservas,
  abrirDetalleReserva
}) => {
  const { t } = useTranslation();
  const [semana, setSemana] = useState<Date[]>([]);
  const [horasLaborales, setHorasLaborales] = useState<string[]>([]);
  
  // Generar las horas laborales (9:00 a 18:00)
  useEffect(() => {
    const horas = [];
    for (let i = 9; i <= 18; i++) {
      horas.push(`${i}:00`);
    }
    setHorasLaborales(horas);
  }, []);
  
  // Generar los du00edas de la semana a partir de la fecha seleccionada
  useEffect(() => {
    const inicio = new Date(fechaSeleccionada);
    // Ajustar al inicio de la semana (lunes)
    const diaSemana = inicio.getDay(); // 0 = domingo, 1 = lunes, ...
    const difDias = diaSemana === 0 ? 6 : diaSemana - 1; // En lunes difDias = 0
    inicio.setDate(inicio.getDate() - difDias);
    
    const diasSemana = [];
    for (let i = 0; i < 7; i++) {
      const nuevaFecha = new Date(inicio);
      nuevaFecha.setDate(inicio.getDate() + i);
      diasSemana.push(nuevaFecha);
    }
    
    setSemana(diasSemana);
  }, [fechaSeleccionada]);
  
  // Navegar a la semana anterior
  const irSemanaAnterior = () => {
    const nuevaFecha = new Date(fechaSeleccionada);
    nuevaFecha.setDate(nuevaFecha.getDate() - 7);
    setFechaSeleccionada(nuevaFecha);
  };
  
  // Navegar a la semana siguiente
  const irSemanaSiguiente = () => {
    const nuevaFecha = new Date(fechaSeleccionada);
    nuevaFecha.setDate(nuevaFecha.getDate() + 7);
    setFechaSeleccionada(nuevaFecha);
  };
  
  // Formatear fecha para comparar con las reservas
  const formatearFecha = (fecha: Date) => {
    return fecha.toISOString().split('T')[0];
  };
  
  // Verificar si hay una reserva en una fecha y hora especu00edficas
  const obtenerReservas = (fecha: Date, hora: string) => {
    const fechaFormateada = formatearFecha(fecha);
    return reservas.filter(r => r.fecha === fechaFormateada && r.hora === hora);
  };
  
  // Obtener color segu00fan el estado de la reserva
  const getColorEstado = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'confirmada':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'completada':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelada':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  // Formatear du00eda del mes
  const formatearDia = (fecha: Date) => {
    return fecha.getDate();
  };
  
  // Formatear mes
  const formatearMes = (fecha: Date) => {
    return fecha.toLocaleDateString('es-ES', { month: 'short' });
  };
  
  // Formatear du00eda de la semana
  const formatearDiaSemana = (fecha: Date) => {
    return fecha.toLocaleDateString('es-ES', { weekday: 'short' });
  };
  
  // Verificar si es hoy
  const esHoy = (fecha: Date) => {
    const hoy = new Date();
    return fecha.getDate() === hoy.getDate() && 
           fecha.getMonth() === hoy.getMonth() && 
           fecha.getFullYear() === hoy.getFullYear();
  };

  return (
    <div className="overflow-hidden">
      {/* Navegaciu00f3n del calendario */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {semana.length > 0 && (
              <>
                {new Date(semana[0]).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
              </>
            )}
          </h2>
          <p className="text-sm text-gray-500">{t('Semana del')} {semana.length > 0 && semana[0].getDate()} {t('al')} {semana.length > 0 && semana[6].getDate()}</p>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={irSemanaAnterior}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={() => setFechaSeleccionada(new Date())}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700"
          >
            {t('Hoy')}
          </button>
          
          <button 
            onClick={irSemanaSiguiente}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Calendario */}
      <div className="overflow-x-auto">
        <div className="min-w-full grid grid-cols-8 gap-px bg-gray-200">
          {/* Cabecera con du00edas */}
          <div className="bg-white p-2"></div>
          {semana.map((dia, index) => (
            <div 
              key={index} 
              className={`bg-white p-2 text-center ${esHoy(dia) ? 'bg-primario-50' : ''}`}
            >
              <div className={`text-xs uppercase tracking-wide text-gray-500 ${esHoy(dia) ? 'text-primario-800' : ''}`}>
                {formatearDiaSemana(dia)}
              </div>
              <div className={`font-semibold text-lg ${esHoy(dia) ? 'text-primario-700' : 'text-gray-800'}`}>
                {formatearDia(dia)}
              </div>
              <div className="text-xs text-gray-500">
                {formatearMes(dia)}
              </div>
            </div>
          ))}
          
          {/* Horas y celdas de reserva */}
          {horasLaborales.map((hora, horaIndex) => (
            <React.Fragment key={horaIndex}>
              {/* Columna de horas */}
              <div className="bg-white p-2 text-right pr-4 border-r border-gray-200">
                <span className="text-xs font-medium text-gray-500">{hora}</span>
              </div>
              
              {/* Celdas de reserva para cada du00eda */}
              {semana.map((dia, diaIndex) => {
                const reservasEnCelda = obtenerReservas(dia, hora);
                return (
                  <div 
                    key={diaIndex}
                    className={`bg-white p-2 h-16 border-b border-gray-100 ${esHoy(dia) ? 'bg-primario-50' : ''}`}
                  >
                    {reservasEnCelda.length > 0 ? (
                      <div className="h-full flex flex-col space-y-1">
                        {reservasEnCelda.map(reserva => (
                          <button
                            key={reserva.id}
                            onClick={() => abrirDetalleReserva(reserva.id)}
                            className={`text-left text-xs p-1 rounded border ${getColorEstado(reserva.estado)} truncate hover:bg-opacity-80 transition-colors duration-150 flex-1`}
                          >
                            <span className="font-medium">
                              {reserva.usuarioNombre} {reserva.usuarioApellido.charAt(0)}.
                            </span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="h-full w-full"></div>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      {/* Leyenda */}
      <div className="mt-6 flex flex-wrap gap-4">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-amber-400 mr-2"></div>
          <span className="text-xs text-gray-700">Pendiente</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
          <span className="text-xs text-gray-700">Confirmada</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
          <span className="text-xs text-gray-700">Completada</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <span className="text-xs text-gray-700">Cancelada</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarioSemanal;
