import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pagos Pendientes | MentalFit',
  description: 'Pagos a procesar'
}

export default function PaginaPagosPendientes() {
  return (
    <EnConstruccion
      titulo="Pagos Pendientes"
      descripcion="Pagos a procesar"
      funcionalidadesEsperadas={[
        'Lista de pagos pendientes',
        'Priorización',
        'Procesar pagos',
        'Rechazar pagos',
        'Historial',
        'Estadísticas'
      ]}
    />
  )
}
