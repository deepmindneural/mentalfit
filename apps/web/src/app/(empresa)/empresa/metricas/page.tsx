import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Métricas Corporativas | MentalFit',
  description: 'Dashboard de bienestar organizacional'
}

export default function PaginaMétricasCorporativas() {
  return (
    <EnConstruccion
      titulo="Métricas Corporativas"
      descripcion="Dashboard de bienestar organizacional"
      funcionalidadesEsperadas={[
        'Métricas de uso de la plataforma',
        'Indicadores de bienestar',
        'Sesiones por departamento',
        'Tendencias temporales',
        'Comparativas con benchmarks',
        'Exportar reportes'
      ]}
    />
  )
}
