import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Error del Servidor | MentalFit',
  description: 'Algo salió mal en nuestro servidor'
}

export default function PaginaErrordelServidor() {
  return (
    <EnConstruccion
      titulo="Error del Servidor"
      descripcion="Algo salió mal en nuestro servidor"
      funcionalidadesEsperadas={[
        'Mensaje de error 500',
        'Información para el usuario',
        'Reintento automático',
        'Contactar soporte técnico',
        'Estado del servicio',
        'Volver al inicio'
      ]}
    />
  )
}
