import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Soporte Técnico | MentalFit',
  description: 'Contacta con nuestro equipo de ayuda'
}

export default function PaginaSoporteTécnico() {
  return (
    <EnConstruccion
      titulo="Soporte Técnico"
      descripcion="Contacta con nuestro equipo de ayuda"
      funcionalidadesEsperadas={[
        'Formulario de contacto',
        'Chat en vivo',
        'Horarios de atención',
        'Email de soporte',
        'Estado del servicio',
        'Reportar un problema'
      ]}
    />
  )
}
