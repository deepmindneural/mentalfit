import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Detalle de Sesión | MentalFit',
  description: 'Información completa de sesión'
}

export default function PaginaDetalleSesionUsuario() {
  return (
    <EnConstruccion
      titulo="Detalle de Sesión"
      descripcion="Información completa de sesión"
      funcionalidadesEsperadas={[
        'Datos de la sesión',
        'Profesional',
        'Fecha y hora',
        'Estado',
        'Unirse a videollamada',
        'Opciones de gestión'
      ]}
    />
  )
}
