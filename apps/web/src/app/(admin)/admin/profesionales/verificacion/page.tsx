import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Verificación | MentalFit',
  description: 'Proceso de credenciales'
}

export default function PaginaVerificación() {
  return (
    <EnConstruccion
      titulo="Verificación"
      descripcion="Proceso de credenciales"
      funcionalidadesEsperadas={[
        'Cola de verificación',
        'Documentos pendientes',
        'Criterios de aprobación',
        'Verificación manual',
        'Estadísticas',
        'Historial de verificaciones'
      ]}
    />
  )
}
