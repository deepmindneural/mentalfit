import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pago Exitoso | MentalFit',
  description: 'Tu pago ha sido procesado'
}

export default function PaginaPagoExitoso() {
  return (
    <EnConstruccion
      titulo="Pago Exitoso"
      descripcion="Tu pago ha sido procesado"
      funcionalidadesEsperadas={[
        'Confirmación de pago',
        'Detalles de la transacción',
        'Recibo',
        'Descargar factura',
        'Ver plan actualizado',
        'Comenzar a usar beneficios'
      ]}
    />
  )
}
