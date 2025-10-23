import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Página No Encontrada | MentalFit',
  description: 'La página que buscas no existe'
}

export default function PaginaPáginaNoEncontrada() {
  return (
    <EnConstruccion
      titulo="Página No Encontrada"
      descripcion="La página que buscas no existe"
      funcionalidadesEsperadas={[
        'Mensaje de error 404',
        'Sugerencias de navegación',
        'Búsqueda de contenido',
        'Enlaces rápidos',
        'Contactar soporte',
        'Volver al inicio'
      ]}
    />
  )
}
