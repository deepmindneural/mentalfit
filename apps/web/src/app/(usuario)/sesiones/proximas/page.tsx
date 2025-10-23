import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Próximas Sesiones | MentalFit',
  description: 'Calendario de citas'
}

export default function PaginaPróximasSesiones() {
  return (
    <EnConstruccion
      titulo="Próximas Sesiones"
      descripcion="Calendario de citas"
      funcionalidadesEsperadas={[
        'Sesiones programadas',
        'Detalles de cada sesión',
        'Unirse a videollamada',
        'Reprogramar',
        'Cancelar',
        'Preparación para sesión'
      ]}
    />
  )
}
