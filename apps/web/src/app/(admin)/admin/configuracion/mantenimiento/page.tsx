import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mantenimiento | MentalFit',
  description: 'Tareas de mantenimiento'
}

export default function PaginaMantenimiento() {
  return (
    <EnConstruccion
      titulo="Mantenimiento"
      descripcion="Tareas de mantenimiento"
      funcionalidadesEsperadas={[
        'Programar mantenimiento',
        'Backup de base de datos',
        'Limpieza de datos',
        'Optimización',
        'Historial de mantenimientos',
        'Estado del sistema'
      ]}
    />
  )
}
