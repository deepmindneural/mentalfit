import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Historial de Recursos | MentalFit',
  description: 'Contenido consumido'
}

export default function PaginaHistorialdeRecursos() {
  return (
    <EnConstruccion
      titulo="Historial de Recursos"
      descripcion="Contenido consumido"
      funcionalidadesEsperadas={[
        'Recursos visitados',
        'Fecha de acceso',
        'Tiempo invertido',
        'Filtros',
        'Continuar donde lo dejaste',
        'Limpiar historial'
      ]}
    />
  )
}
