import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Detalle Equipo | MentalFit',
  description: 'Vista de equipo específico'
}

export default function PaginaDetalleEquipo() {
  return (
    <EnConstruccion
      titulo="Detalle Equipo"
      descripcion="Vista de equipo específico"
      funcionalidadesEsperadas={[
        'Información del equipo',
        'Miembros del equipo',
        'Métricas colectivas',
        'Dinámicas de equipo',
        'Comparativas',
        'Exportar datos'
      ]}
    />
  )
}
