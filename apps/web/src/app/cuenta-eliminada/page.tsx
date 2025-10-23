import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cuenta Eliminada | MentalFit',
  description: 'Tu cuenta ha sido eliminada'
}

export default function PaginaCuentaEliminada() {
  return (
    <EnConstruccion
      titulo="Cuenta Eliminada"
      descripcion="Tu cuenta ha sido eliminada"
      funcionalidadesEsperadas={[
        'Confirmación de eliminación',
        'Período de recuperación',
        'Recuperar cuenta',
        'Datos eliminados',
        'Exportación de datos',
        'Feedback de salida'
      ]}
    />
  )
}
