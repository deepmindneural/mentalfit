import React from 'react';
import { useTranslation } from 'react-i18next';
import { Especialista } from '../../tipos';
import EspecialistaCard from './EspecialistaCard';

interface EspecialistasGridProps {
  especialistas: Especialista[];
  titulo?: string;
  destacados?: boolean;
  mostrarDistancia?: boolean;
}

const EspecialistasGrid: React.FC<EspecialistasGridProps> = ({ 
  especialistas, 
  titulo, 
  destacados = false,
  mostrarDistancia = false 
}) => {
  const { t } = useTranslation();

  if (especialistas.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">{t('noHayEspecialistas')}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {titulo && (
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{titulo}</h2>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {especialistas.map((especialista) => (
          <EspecialistaCard 
            key={especialista.id} 
            especialista={especialista} 
            destacado={destacados}
            mostrarDistancia={mostrarDistancia}
          />
        ))}
      </div>
    </div>
  );
};

export default EspecialistasGrid;
