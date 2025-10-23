import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Traducciones | MentalFit',
  description: 'Gestión i18n'
}

export default function PaginaTraducciones() {
  return (
    <EnConstruccion
      titulo="Traducciones"
      descripcion="Gestión i18n"
      funcionalidadesEsperadas={[
        'Strings por idioma',
        'Strings faltantes',
        'Importar/Exportar',
        'Búsqueda de keys',
        'Edición en línea',
        'Historial de cambios'
      ]}
    />
  )
}
