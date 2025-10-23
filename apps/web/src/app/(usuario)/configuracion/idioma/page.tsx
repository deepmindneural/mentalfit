import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Idioma | MentalFit',
  description: 'Configuración de idioma'
}

export default function PaginaIdioma() {
  return (
    <EnConstruccion
      titulo="Idioma"
      descripcion="Configuración de idioma"
      funcionalidadesEsperadas={[
        'Idioma de la interfaz',
        'Idioma de contenido',
        'Idioma preferido para terapia',
        'Formato de fecha',
        'Formato de hora',
        'Aplicar cambios'
      ]}
    />
  )
}
