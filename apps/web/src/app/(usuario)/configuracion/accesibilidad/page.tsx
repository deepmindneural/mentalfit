import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Accesibilidad | MentalFit',
  description: 'Ajustes de accesibilidad'
}

export default function PaginaAccesibilidad() {
  return (
    <EnConstruccion
      titulo="Accesibilidad"
      descripcion="Ajustes de accesibilidad"
      funcionalidadesEsperadas={[
        'Tamaño de texto',
        'Contraste alto',
        'Lector de pantalla',
        'Navegación por teclado',
        'Subtítulos',
        'Animaciones reducidas'
      ]}
    />
  )
}
