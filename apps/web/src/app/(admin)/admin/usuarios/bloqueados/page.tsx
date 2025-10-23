import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Usuarios Bloqueados | MentalFit',
  description: 'Gestión de bloqueos'
}

export default function PaginaUsuariosBloqueados() {
  return (
    <EnConstruccion
      titulo="Usuarios Bloqueados"
      descripcion="Gestión de bloqueos"
      funcionalidadesEsperadas={[
        'Lista de usuarios bloqueados',
        'Motivos de bloqueo',
        'Duración del bloqueo',
        'Desbloquear usuarios',
        'Historial de bloqueos',
        'Estadísticas'
      ]}
    />
  )
}
