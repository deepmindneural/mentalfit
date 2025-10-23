import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Actualizar Plan | MentalFit',
  description: 'Cambio de suscripción'
}

export default function PaginaActualizarPlan() {
  return (
    <EnConstruccion
      titulo="Actualizar Plan"
      descripcion="Cambio de suscripción"
      funcionalidadesEsperadas={[
        'Planes disponibles',
        'Comparativa de características',
        'Calculadora de costos',
        'Preview de cambio',
        'Confirmar upgrade',
        'Prorrateo de pago'
      ]}
    />
  )
}
