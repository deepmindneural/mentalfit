import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Casos de Éxito | MentalFit',
  description: 'Historias reales de transformación'
}

export default function PaginaCasosdeÉxito() {
  return (
    <EnConstruccion
      titulo="Casos de Éxito"
      descripcion="Historias reales de transformación"
      funcionalidadesEsperadas={[
        'Testimonios verificados de usuarios',
        'Casos de éxito empresariales',
        'Métricas de impacto',
        'Historias por categoría',
        'Videos testimoniales',
        'Estadísticas de satisfacción'
      ]}
    />
  )
}
