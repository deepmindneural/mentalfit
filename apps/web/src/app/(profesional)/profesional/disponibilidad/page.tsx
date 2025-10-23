import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Configurar Disponibilidad | MentalFit',
  description: 'Gestión de horarios'
}

export default function PaginaConfigurarDisponibilidad() {
  return (
    <EnConstruccion
      titulo="Configurar Disponibilidad"
      descripcion="Gestión de horarios"
      funcionalidadesEsperadas={[
        'Horarios semanales',
        'Días laborables',
        'Horarios específicos',
        'Duración de sesiones',
        'Buffer entre sesiones',
        'Aplicar cambios'
      ]}
    />
  )
}
