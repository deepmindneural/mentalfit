import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Eliminar Cuenta | MentalFit',
  description: 'Borrado de cuenta'
}

export default function PaginaEliminarCuenta() {
  return (
    <EnConstruccion
      titulo="Eliminar Cuenta"
      descripcion="Borrado de cuenta"
      funcionalidadesEsperadas={[
        'Consecuencias del borrado',
        'Período de gracia',
        'Datos que se eliminarán',
        'Confirmar identidad',
        'Motivo de eliminación',
        'Confirmar eliminación'
      ]}
    />
  )
}
