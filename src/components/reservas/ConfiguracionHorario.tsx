import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface DisponibilidadHoraria {
  dia: string;
  horasDisponibles: string[];
}

interface PerfilProfesional {
  id: string;
  disponibilidad: DisponibilidadHoraria[];
  precioPorSesion: number;
  creditosPorSesion: number;
  duracionSesion: number;
  modalidades: ('presencial' | 'virtual')[];
  ubicacion?: string;
  direccion?: string;
}

interface ConfiguracionHorarioProps {
  perfilProfesional: PerfilProfesional | null;
  guardarConfiguracion: (disponibilidad: DisponibilidadHoraria[], configHorario: any) => Promise<void>;
}

const ConfiguracionHorario: React.FC<ConfiguracionHorarioProps> = ({ 
  perfilProfesional,
  guardarConfiguracion 
}) => {
  const { t } = useTranslation();
  const [cargando, setCargando] = useState(false);
  
  // Horarios disponibles (9:00 a 18:00)
  const horariosDisponibles = Array.from({ length: 10 }, (_, i) => `${i + 9}:00`);
  
  // Días de la semana
  const diasSemana = [
    { nombre: 'Lunes', valor: 'lunes' },
    { nombre: 'Martes', valor: 'martes' },
    { nombre: 'Miércoles', valor: 'miercoles' },
    { nombre: 'Jueves', valor: 'jueves' },
    { nombre: 'Viernes', valor: 'viernes' },
    { nombre: 'Sábado', valor: 'sabado' },
    // Domingo generalmente no hay atención
  ];
  
  // Estados para la configuración
  const [disponibilidad, setDisponibilidad] = useState<Record<string, boolean[]>>({
    lunes: Array(10).fill(false),
    martes: Array(10).fill(false),
    miercoles: Array(10).fill(false),
    jueves: Array(10).fill(false),
    viernes: Array(10).fill(false),
    sabado: Array(10).fill(false),
  });
  
  const [configHorario, setConfigHorario] = useState({
    precio: 150000,
    creditos: 20,
    duracion: 60,
    modalidades: ['presencial', 'virtual'],
  });
  
  // Cargar la configuración actual del perfil profesional
  useEffect(() => {
    if (perfilProfesional) {
      // Actualizar configuración de horario
      setConfigHorario({
        precio: perfilProfesional.precioPorSesion,
        creditos: perfilProfesional.creditosPorSesion,
        duracion: perfilProfesional.duracionSesion,
        modalidades: perfilProfesional.modalidades,
      });
      
      // Convertir la disponibilidad del formato de la API a nuestro formato de UI
      // Este es un ejemplo simple, en una aplicación real probablemente la estructura sería diferente
      const disponibilidadInicial = { ...disponibilidad };
      
      // Esto es solo un ejemplo, en una aplicación real la disponibilidad probablemente
      // tendría un formato diferente
      perfilProfesional.disponibilidad.forEach(dispo => {
        const diasSemana = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
        const diaSemana = diasSemana[new Date(dispo.dia).getDay() - 1]; // 0 es domingo, 1 es lunes
        
        if (diaSemana && disponibilidadInicial[diaSemana]) {
          dispo.horasDisponibles.forEach(hora => {
            const horaIndex = horariosDisponibles.findIndex(h => h === hora);
            if (horaIndex !== -1) {
              disponibilidadInicial[diaSemana][horaIndex] = true;
            }
          });
        }
      });
      
      setDisponibilidad(disponibilidadInicial);
    }
  }, [perfilProfesional]);
  
  // Manejar cambios en la disponibilidad
  const handleDisponibilidadChange = (dia: string, horaIndex: number) => {
    setDisponibilidad(prev => {
      const nuevaDisponibilidad = { ...prev };
      nuevaDisponibilidad[dia][horaIndex] = !nuevaDisponibilidad[dia][horaIndex];
      return nuevaDisponibilidad;
    });
  };
  
  // Manejar cambios en la configuración de horario
  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    setConfigHorario(prev => {
      if (name === 'modalidades') {
        const modalidad = value as 'presencial' | 'virtual';
        const modalidades = [...prev.modalidades] as ('presencial' | 'virtual')[];
        
        if (e.target.checked) {
          if (!modalidades.includes(modalidad)) {
            modalidades.push(modalidad);
          }
        } else {
          const index = modalidades.indexOf(modalidad);
          if (index !== -1) {
            modalidades.splice(index, 1);
          }
        }
        
        return { ...prev, modalidades };
      } else {
        return { ...prev, [name]: type === 'number' ? parseInt(value) : value };
      }
    });
  };
  
  // Convertir la disponibilidad del formato de UI al formato de la API
  const convertirDisponibilidadParaAPI = () => {
    const disponibilidadAPI: DisponibilidadHoraria[] = [];
    
    // Fecha base (hoy)
    const hoy = new Date();
    
    // Para cada día de la semana
    Object.entries(disponibilidad).forEach(([dia, horas], index) => {
      // Encontrar la fecha correspondiente al próximo día de la semana
      const fecha = new Date(hoy);
      const diaActual = fecha.getDay();
      const diaSemana = index + 1; // lunes = 1, martes = 2, etc.
      
      // Calcular días a sumar
      const diasASumar = (7 + diaSemana - diaActual) % 7;
      fecha.setDate(fecha.getDate() + diasASumar);
      
      // Formatear fecha
      const fechaFormateada = fecha.toISOString().split('T')[0];
      
      // Obtener horas disponibles
      const horasDisponibles = horas
        .map((disponible, i) => disponible ? horariosDisponibles[i] : null)
        .filter(Boolean) as string[];
      
      if (horasDisponibles.length > 0) {
        disponibilidadAPI.push({
          dia: fechaFormateada,
          horasDisponibles
        });
      }
    });
    
    return disponibilidadAPI;
  };
  
  // Guardar configuración
  const handleGuardar = async () => {
    setCargando(true);
    
    try {
      const disponibilidadAPI = convertirDisponibilidadParaAPI();
      await guardarConfiguracion(disponibilidadAPI, configHorario);
    } catch (error) {
      console.error('Error al guardar configuración:', error);
      alert('No se pudo guardar la configuración. Intente nuevamente.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Configuración de Horarios</h2>
        <p className="text-gray-600 mb-6">Configura tus horarios disponibles para atender citas y consultas.</p>
        
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h3 className="font-medium text-gray-800">Disponibilidad Semanal</h3>
            <p className="text-xs text-gray-500 mt-1">Selecciona los horarios en los que estás disponible para atender.</p>
          </div>
          
          <div className="p-4">
            <div className="flex flex-col">
              {/* Cabecera de horas */}
              <div className="grid grid-cols-[120px_repeat(10,minmax(80px,1fr))] gap-2 mb-4">
                <div className="text-sm font-medium text-gray-500">Día / Hora</div>
                {horariosDisponibles.map((hora, i) => (
                  <div key={i} className="text-center text-sm font-medium text-gray-500">{hora}</div>
                ))}
              </div>
              
              {/* Filas por día */}
              {diasSemana.map((dia, diaIndex) => (
                <div 
                  key={diaIndex}
                  className={`grid grid-cols-[120px_repeat(10,minmax(80px,1fr))] gap-2 py-3 ${diaIndex !== diasSemana.length - 1 ? 'border-b border-gray-100' : ''}`}
                >
                  <div className="text-sm font-medium text-gray-700">{dia.nombre}</div>
                  {disponibilidad[dia.valor].map((seleccionado, horaIndex) => (
                    <div key={horaIndex} className="flex justify-center">
                      <button
                        type="button"
                        onClick={() => handleDisponibilidadChange(dia.valor, horaIndex)}
                        className={`w-8 h-8 rounded-md ${seleccionado ? 'bg-primario-600 text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                      >
                        {seleccionado ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : null}
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4">Configuración de Sesiones</h3>
        
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Precio por sesión (COP)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="number"
                  name="precio"
                  value={configHorario.precio}
                  onChange={handleConfigChange}
                  className="block w-full pl-8 pr-12 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primario-500 focus:border-primario-500 sm:text-sm"
                  placeholder="150000"
                  min="0"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">COP</span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Créditos por sesión</label>
              <input
                type="number"
                name="creditos"
                value={configHorario.creditos}
                onChange={handleConfigChange}
                className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-primario-500 focus:border-primario-500 sm:text-sm"
                placeholder="20"
                min="1"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duración de la sesión (minutos)</label>
              <input
                type="number"
                name="duracion"
                value={configHorario.duracion}
                onChange={handleConfigChange}
                className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-primario-500 focus:border-primario-500 sm:text-sm"
                placeholder="60"
                min="15"
                step="15"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Modalidades de atención</label>
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <input
                    id="modalidad-presencial"
                    name="modalidades"
                    type="checkbox"
                    value="presencial"
                    checked={configHorario.modalidades.includes('presencial')}
                    onChange={handleConfigChange}
                    className="h-4 w-4 text-primario-600 focus:ring-primario-500 border-gray-300 rounded"
                  />
                  <label htmlFor="modalidad-presencial" className="ml-2 block text-sm text-gray-700">Presencial</label>
                </div>
                <div className="flex items-center">
                  <input
                    id="modalidad-virtual"
                    name="modalidades"
                    type="checkbox"
                    value="virtual"
                    checked={configHorario.modalidades.includes('virtual')}
                    onChange={handleConfigChange}
                    className="h-4 w-4 text-primario-600 focus:ring-primario-500 border-gray-300 rounded"
                  />
                  <label htmlFor="modalidad-virtual" className="ml-2 block text-sm text-gray-700">Virtual</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={handleGuardar}
          disabled={cargando}
          className="px-6 py-2 bg-primario-600 text-white rounded-lg hover:bg-primario-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primario-500 font-medium transition-colors duration-200"
        >
          {cargando ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Guardando...
            </span>
          ) : 'Guardar Configuración'}
        </button>
      </div>
    </div>
  );
};

export default ConfiguracionHorario;
