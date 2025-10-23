import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Métricas Empresa | MentalFit',
  description: 'Estadísticas de uso corporativo'
}

export default function PaginaMetricasEmpresa() {
  return (
    <EnConstruccion
      titulo="Métricas Empresa"
      descripcion="Estadísticas de uso corporativo"
      funcionalidadesEsperadas={[
        'Adopción de la plataforma',
        'Sesiones por departamento',
        'Evaluaciones completadas',
        'Recursos más usados',
        'ROI calculado',
        'Comparativa temporal'
      ]}
    />
  )
}
