import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Acceso Denegado | MentalFit',
  description: 'No tienes permisos para acceder'
}

export default function PaginaAccesoDenegado() {
  return (
    <EnConstruccion
      titulo="Acceso Denegado"
      descripcion="No tienes permisos para acceder"
      funcionalidadesEsperadas={[
        'Mensaje de acceso denegado',
        'Motivo de restricción',
        'Solicitar acceso',
        'Contactar administrador',
        'Cambiar de cuenta',
        'Volver al inicio'
      ]}
    />
  )
}
