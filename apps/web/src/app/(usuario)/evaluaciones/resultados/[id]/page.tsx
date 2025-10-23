import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Detalle de Resultado | MentalFit',
  description: 'Análisis de evaluación'
}

export default function PaginaDetalleResultado() {
  return (
    <EnConstruccion
      titulo="Detalle de Resultado"
      descripcion="Análisis de evaluación"
      funcionalidadesEsperadas={[
        'Resultado completo',
        'Interpretación detallada',
        'Gráficos y métricas',
        'Áreas de atención',
        'Recursos recomendados',
        'Exportar PDF'
      ]}
    />
  )
}
