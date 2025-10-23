import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Historial de Sesiones | MentalFit',
  description: 'Registro completo'
}

export default function PaginaHistorialdeSesiones() {
  return (
    <EnConstruccion
      titulo="Historial de Sesiones"
      descripcion="Registro completo"
      funcionalidadesEsperadas={[
        'Todas las sesiones pasadas',
        'Búsqueda y filtros',
        'Estado de sesiones',
        'Notas tomadas',
        'Calificaciones recibidas',
        'Exportar historial'
      ]}
    />
  )
}
