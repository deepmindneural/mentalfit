import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacidad | MentalFit',
  description: 'Control de datos personales'
}

export default function PaginaPrivacidad() {
  return (
    <EnConstruccion
      titulo="Privacidad"
      descripcion="Control de datos personales"
      funcionalidadesEsperadas={[
        'Configuración de privacidad',
        'Visibilidad de perfil',
        'Compartición de datos',
        'Consentimientos',
        'Eliminar datos',
        'Exportar datos'
      ]}
    />
  )
}
