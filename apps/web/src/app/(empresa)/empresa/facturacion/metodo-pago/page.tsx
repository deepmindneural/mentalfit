import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Método de Pago | MentalFit',
  description: 'Configuración de pagos'
}

export default function PaginaMétododePago() {
  return (
    <EnConstruccion
      titulo="Método de Pago"
      descripcion="Configuración de pagos"
      funcionalidadesEsperadas={[
        'Método actual',
        'Agregar tarjeta',
        'Transferencia bancaria',
        'Facturación automática',
        'Actualizar datos',
        'Historial de cambios'
      ]}
    />
  )
}
