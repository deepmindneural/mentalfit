import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sesiones Usuario | MentalFit',
  description: 'Historial de sesiones'
}

export default function PaginaSesionesUsuario() {
  return (
    <EnConstruccion
      titulo="Sesiones Usuario"
      descripcion="Historial de sesiones"
      funcionalidadesEsperadas={[
        'Lista de sesiones',
        'Estado de cada sesión',
        'Profesionales atendidos',
        'Calificaciones dadas',
        'Notas clínicas (limitadas)',
        'Exportar historial'
      ]}
    />
  )
}
