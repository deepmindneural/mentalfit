import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pagos Profesional | MentalFit',
  description: 'Gestión de pagos a terapeuta'
}

export default function PaginaPagosProfesional() {
  return (
    <EnConstruccion
      titulo="Pagos Profesional"
      descripcion="Gestión de pagos a terapeuta"
      funcionalidadesEsperadas={[
        'Historial de pagos',
        'Comisiones acumuladas',
        'Próximo pago',
        'Método de pago',
        'Ajustes manuales',
        'Exportar histórico'
      ]}
    />
  )
}
