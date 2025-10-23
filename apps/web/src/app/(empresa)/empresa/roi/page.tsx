import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ROI y Valor | MentalFit',
  description: 'Retorno de inversión'
}

export default function PaginaROIyValor() {
  return (
    <EnConstruccion
      titulo="ROI y Valor"
      descripcion="Retorno de inversión"
      funcionalidadesEsperadas={[
        'Cálculo de ROI',
        'Reducción de ausentismo',
        'Mejora en productividad',
        'Ahorro en costos de salud',
        'Comparativas temporales',
        'Proyecciones futuras'
      ]}
    />
  )
}
