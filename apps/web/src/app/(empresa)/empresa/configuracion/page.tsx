import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Configuración Corporativa | MentalFit',
  description: 'Ajustes de la organización'
}

export default function PaginaConfiguraciónCorporativa() {
  return (
    <EnConstruccion
      titulo="Configuración Corporativa"
      descripcion="Ajustes de la organización"
      funcionalidadesEsperadas={[
        'Configuración general',
        'Preferencias de uso',
        'Políticas internas',
        'Personalización',
        'Integraciones',
        'Historial de cambios'
      ]}
    />
  )
}
