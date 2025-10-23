import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Servicio No Disponible | MentalFit',
  description: 'El servicio está temporalmente fuera de línea'
}

export default function PaginaServicioNoDisponible() {
  return (
    <EnConstruccion
      titulo="Servicio No Disponible"
      descripcion="El servicio está temporalmente fuera de línea"
      funcionalidadesEsperadas={[
        'Mensaje de mantenimiento',
        'Tiempo estimado de resolución',
        'Actualizaciones de estado',
        'Contacto de emergencia',
        'Suscribirse a actualizaciones',
        'Servicios alternativos'
      ]}
    />
  )
}
