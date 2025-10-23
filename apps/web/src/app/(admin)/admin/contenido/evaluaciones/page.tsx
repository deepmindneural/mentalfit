import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Evaluaciones | MentalFit',
  description: 'Gestión de tests y cuestionarios'
}

export default function PaginaEvaluaciones() {
  return (
    <EnConstruccion
      titulo="Evaluaciones"
      descripcion="Gestión de tests y cuestionarios"
      funcionalidadesEsperadas={[
        'Lista de evaluaciones',
        'Crear evaluación',
        'Configurar scoring',
        'Activar/desactivar',
        'Estadísticas de uso',
        'Resultados agregados'
      ]}
    />
  )
}
