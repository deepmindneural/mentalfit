import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tema Visual | MentalFit',
  description: 'Personalización de interfaz'
}

export default function PaginaTemaVisual() {
  return (
    <EnConstruccion
      titulo="Tema Visual"
      descripcion="Personalización de interfaz"
      funcionalidadesEsperadas={[
        'Modo claro',
        'Modo oscuro',
        'Automático (según sistema)',
        'Tamaño de fuente',
        'Contraste',
        'Aplicar tema'
      ]}
    />
  )
}
