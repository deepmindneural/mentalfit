import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Retiros | MentalFit',
  description: 'Solicitar pagos'
}

export default function PaginaRetiros() {
  return (
    <EnConstruccion
      titulo="Retiros"
      descripcion="Solicitar pagos"
      funcionalidadesEsperadas={[
        'Saldo disponible',
        'Solicitar retiro',
        'Historial de retiros',
        'Método de pago configurado',
        'Tiempos de procesamiento',
        'Estado de solicitudes'
      ]}
    />
  )
}
