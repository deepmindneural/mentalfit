import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mantenimiento Programado | MentalFit',
  description: 'Estamos mejorando la plataforma'
}

export default function PaginaMantenimientoProgramado() {
  return (
    <EnConstruccion
      titulo="Mantenimiento Programado"
      descripcion="Estamos mejorando la plataforma"
      funcionalidadesEsperadas={[
        'Información de mantenimiento',
        'Duración estimada',
        'Mejoras incluidas',
        'Hora de regreso',
        'Suscribirse a notificaciones',
        'Contacto de urgencias'
      ]}
    />
  )
}
