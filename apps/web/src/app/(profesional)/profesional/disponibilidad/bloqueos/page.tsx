import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bloqueos de Tiempo | MentalFit',
  description: 'Eventos especiales'
}

export default function PaginaBloqueosdeTiempo() {
  return (
    <EnConstruccion
      titulo="Bloqueos de Tiempo"
      descripcion="Eventos especiales"
      funcionalidadesEsperadas={[
        'Bloqueos puntuales',
        'Reuniones externas',
        'Formación continua',
        'Supervisión',
        'Crear bloqueo',
        'Eliminar bloqueo'
      ]}
    />
  )
}
