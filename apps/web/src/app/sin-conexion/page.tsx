import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sin Conexión | MentalFit',
  description: 'No hay conexión a Internet'
}

export default function PaginaSinConexión() {
  return (
    <EnConstruccion
      titulo="Sin Conexión"
      descripcion="No hay conexión a Internet"
      funcionalidadesEsperadas={[
        'Verificar conexión',
        'Modo offline disponible',
        'Funcionalidades limitadas',
        'Reintentar conexión',
        'Soporte técnico',
        'Datos guardados localmente'
      ]}
    />
  )
}
