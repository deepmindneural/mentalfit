import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bienvenido a MentalFit | MentalFit',
  description: 'Tu cuenta ha sido creada exitosamente'
}

export default function PaginaBienvenidoaMentalFit() {
  return (
    <EnConstruccion
      titulo="Bienvenido a MentalFit"
      descripcion="Tu cuenta ha sido creada exitosamente"
      funcionalidadesEsperadas={[
        'Mensaje de bienvenida',
        'Próximos pasos',
        'Completar perfil',
        'Tour guiado',
        'Buscar terapeuta',
        'Explorar recursos'
      ]}
    />
  )
}
