import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Lista de especialidades disponibles basada en los datos existentes
const ESPECIALIDADES = [
  { id: 'todas', nombre: 'Todas las especialidades' },
  { id: 'psicologia-clinica', nombre: 'Psicología Clínica' },
  { id: 'psiquiatria', nombre: 'Psiquiatría' },
  { id: 'psicologia-infantojuvenil', nombre: 'Psicología Infanto-Juvenil' },
  { id: 'psicologia-organizacional', nombre: 'Psicología Organizacional' },
  { id: 'terapia-familiar', nombre: 'Terapia Familiar' },
  { id: 'psicoterapia', nombre: 'Psicoterapia' },
  { id: 'terapia-pareja', nombre: 'Terapia de Pareja' },
  { id: 'neuropsicologia', nombre: 'Neuropsicología' },
];

interface EspecialistaFilterProps {
  onFiltrar: (filtros: {
    especialidad: string;
    genero: string;
    calificacionMinima: number;
    usarUbicacion: boolean;
  }) => void;
}

const EspecialistaFilter: React.FC<EspecialistaFilterProps> = ({ onFiltrar }) => {
  const { t } = useTranslation();
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState('todas');
  const [genero, setGenero] = useState('todos');
  const [calificacionMinima, setCalificacionMinima] = useState(0);
  const [usarUbicacion, setUsarUbicacion] = useState(false);
  const [activeTab, setActiveTab] = useState('todas');

  // Aplicar los filtros cuando se cambia la especialidad desde las pestañas
  useEffect(() => {
    // Si se selecciona una especialidad desde las pestañas, actualizar el estado del select
    if (activeTab !== 'todas') {
      setEspecialidadSeleccionada(activeTab);
    }
    
    handleFiltrar();
  }, [activeTab]);

  // Filtrar cuando se cambia la especialidad desde el select
  useEffect(() => {
    setActiveTab(especialidadSeleccionada);
  }, [especialidadSeleccionada]);

  const handleFiltrar = () => {
    // Convertir el ID de la especialidad seleccionada al nombre para la búsqueda
    const especialidadNombre = ESPECIALIDADES.find(esp => esp.id === especialidadSeleccionada)?.nombre || '';
    const especialidadQuery = especialidadSeleccionada === 'todas' ? '' : especialidadNombre;

    onFiltrar({
      especialidad: especialidadQuery,
      genero,
      calificacionMinima,
      usarUbicacion
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFiltrar();
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
      {/* Pestañas de especialidades */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex space-x-1 p-2 bg-gray-50 border-b border-gray-200 whitespace-nowrap">
          {ESPECIALIDADES.map((especialidad) => (
            <button
              key={especialidad.id}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === especialidad.id
                  ? 'bg-primario-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab(especialidad.id)}
            >
              {especialidad.nombre}
            </button>
          ))}
        </div>
      </div>
      
      {/* Filtros avanzados */}
      <div className="p-6">
        <div className="flex items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{t('filtrosAvanzados')}</h3>
          <div className="ml-auto flex space-x-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="ubicacion"
                className="w-5 h-5 text-primario-600 border-gray-300 rounded focus:ring-primario-500"
                checked={usarUbicacion}
                onChange={(e) => {
                  setUsarUbicacion(e.target.checked);
                  // Aplicar filtro inmediatamente al cambiar
                  setTimeout(handleFiltrar, 0);
                }}
              />
              <label htmlFor="ubicacion" className="ml-2 text-sm font-medium text-gray-700">
                {t('mostrarMasCercanos')}
              </label>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Especialidad (select) */}
            <div>
              <label htmlFor="especialidad" className="block mb-2 text-sm font-medium text-gray-700">
                {t('especialidad')}
              </label>
              <select
                id="especialidad"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primario-500"
                value={especialidadSeleccionada}
                onChange={(e) => setEspecialidadSeleccionada(e.target.value)}
              >
                {ESPECIALIDADES.map((especialidad) => (
                  <option key={especialidad.id} value={especialidad.id}>
                    {especialidad.nombre}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Género */}
            <div>
              <label htmlFor="genero" className="block mb-2 text-sm font-medium text-gray-700">
                {t('genero')}
              </label>
              <select
                id="genero"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primario-500"
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
              >
                <option value="todos">{t('todosGeneros')}</option>
                <option value="hombre">{t('hombre')}</option>
                <option value="mujer">{t('mujer')}</option>
              </select>
            </div>
            
            {/* Calificación mínima */}
            <div>
              <label htmlFor="calificacion" className="block mb-2 text-sm font-medium text-gray-700">
                {t('calificacionMinima')}
              </label>
              <select
                id="calificacion"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primario-500"
                value={calificacionMinima}
                onChange={(e) => setCalificacionMinima(Number(e.target.value))}
              >
                <option value="0">Todas las calificaciones</option>
                <option value="3">3+ ⭐</option>
                <option value="4">4+ ⭐</option>
                <option value="4.5">4.5+ ⭐</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-primario-500 hover:bg-primario-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {t('aplicarFiltros')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EspecialistaFilter;
