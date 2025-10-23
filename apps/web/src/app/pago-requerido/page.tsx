import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pago Requerido | MentalFit',
  description: 'Se requiere actualizar método de pago'
}

export default function PaginaPagoRequerido() {
  return (
    <EnConstruccion
      titulo="Pago Requerido"
      descripcion="Se requiere actualizar método de pago"
      funcionalidadesEsperadas={[
        'Mensaje de pago pendiente',
        'Actualizar tarjeta',
        'Ver facturas pendientes',
        'Métodos de pago aceptados',
        'Contactar facturación',
        'Downgrade de plan'
      ]}
    />
  )
}
