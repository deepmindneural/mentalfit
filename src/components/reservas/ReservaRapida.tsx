import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { useReservas } from '../../context/ReservasContext';
import { especialistas, filtrarEspecialistas } from '../../data/especialistas';
import { Especialista } from '../../tipos';

interface ReservaRapidaProps {
  className?: string;
  mostrarTitulo?: boolean;
}

const ReservaRapida: React.FC<ReservaRapidaProps> = ({ 
  className = '', 
  mostrarTitulo = true 
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { sesion } = useAuth();
  const { obtenerDisponibilidad } = useReservas();
  
  const [especialistas, setEspecialistas] = useState<Especialista[]>([]);
  const [especialistaSeleccionado, setEspecialistaSeleccionado] = useState<string>('');
  const [especialidad, setEspecialidad] = useState<string>('');
  const [cargando, setCargando] = useState<boolean>(false);
  const [especialidades, setEspecialidades] = useState<string[]>([]);
  
  useEffect(() => {
    const cargarEspecialistas = async () => {
      setCargando(true);
      try {
        // Usar la función filtrarEspecialistas o la lista directa
        let listaEspecialistas = especialidad ? 
          filtrarEspecialistas({ especialidad: especialidad }) : 
          [...especialistas];
        
        setEspecialistas(listaEspecialistas);
        
        // Extraer todas las especialidades únicas
        const todasEspecialidades = new Set<string>();
        especialistas.forEach((esp: Especialista) => {
          todasEspecialidades.add(esp.especialidad);
        });
        
        setEspecialidades(Array.from(todasEspecialidades).sort());
      } catch (error) {
        console.error('Error al cargar especialistas:', error);
      } finally {
        setCargando(false);
      }
    };
    
    cargarEspecialistas();
  }, [especialidad]);
  
  const handleContinuar = () => {
    if (!especialistaSeleccionado) {
      alert(t('Por favor selecciona un especialista para continuar'));
      return;
    }
    
    // Redirigir a la página de detalle del especialista
    navigate(`/especialistas/${especialistaSeleccionado}`);
  };
  
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      {mostrarTitulo && (
        <h3 className="text-xl font-bold text-gray-800 mb-4">{t('Reserva tu cita ahora')}</h3>
      )}
      
      <div className="space-y-4">
        {/* Selección de especialidad */}
        <div>
          <label htmlFor="especialidad" className="block text-sm font-medium text-gray-700 mb-1">
            {t('Especialidad que buscas')}
          </label>
          <select
            id="especialidad"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-primario-500 focus:border-primario-500"
            value={especialidad}
            onChange={(e) => setEspecialidad(e.target.value)}
          >
            <option value="">{t('Todas las especialidades')}</option>
            {especialidades.map((esp) => (
              <option key={esp} value={esp}>
                {esp}
              </option>
            ))}
          </select>
        </div>
        
        {/* Selección de especialista */}
        <div>
          <label htmlFor="especialista" className="block text-sm font-medium text-gray-700 mb-1">
            {t('Selecciona un especialista')}
          </label>
          <select
            id="especialista"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-primario-500 focus:border-primario-500"
            value={especialistaSeleccionado}
            onChange={(e) => setEspecialistaSeleccionado(e.target.value)}
          >
            <option value="">{t('Seleccionar especialista')}</option>
            {especialistas.map((esp) => (
              <option key={esp.id} value={esp.id}>
                {esp.nombre} {esp.apellido} - {esp.especialidad}
              </option>
            ))}
          </select>
        </div>
        
        {/* Botón de continuar */}
        <button
          onClick={handleContinuar}
          disabled={!especialistaSeleccionado || cargando}
          className={`w-full bg-primario-600 hover:bg-primario-700 text-white py-3 px-4 rounded-lg font-medium transition duration-300 ${cargando || !especialistaSeleccionado ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {cargando ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t('Cargando...')}
            </span>
          ) : (
            t('Continuar con la reserva')
          )}
        </button>
        
        {/* Información adicional */}
        <p className="text-sm text-gray-600 mt-2">
          {t('Al reservar aceptas nuestros')} <Link to="/terminos" className="text-primario-600 hover:underline">{t('Términos y Condiciones')}</Link> {t('y')} <Link to="/privacidad" className="text-primario-600 hover:underline">{t('Política de Privacidad')}</Link>
        </p>
      </div>
    </div>
  );
};

export default ReservaRapida;
