import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aviso Legal | MentalFit',
  description: 'Información legal de MentalFit'
}

export default function PaginaAvisoLegal() {
  return (
    <EnConstruccion
      titulo="Aviso Legal"
      descripcion="Información legal de MentalFit"
      funcionalidadesEsperadas={[
        'Datos identificativos de la empresa',
        'Información de contacto legal',
        'Registro mercantil',
        'Propiedad intelectual',
        'Jurisdicción aplicable',
        'Regulación sectorial'
      ]}
    />
  )
}
