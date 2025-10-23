import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mis Sesiones | MentalFit',
  description: 'Gestión de sesiones terapéuticas'
}

export default function PaginaMisSesiones() {
  return (
    <EnConstruccion
      titulo="Mis Sesiones"
      descripcion="Gestión de sesiones terapéuticas"
      funcionalidadesEsperadas={[
        'Próximas sesiones',
        'Sesiones pasadas',
        'Sesiones canceladas',
        'Buscar sesiones',
        'Filtros',
        'Exportar historial'
      ]}
    />
  )
}
