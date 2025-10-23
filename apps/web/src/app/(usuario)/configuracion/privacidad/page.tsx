import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Configuración de Privacidad | MentalFit',
  description: 'Control de datos'
}

export default function PaginaConfiguracióndePrivacidad() {
  return (
    <EnConstruccion
      titulo="Configuración de Privacidad"
      descripcion="Control de datos"
      funcionalidadesEsperadas={[
        'Visibilidad de perfil',
        'Compartición de datos',
        'Cookies',
        'Análisis de uso',
        'Consentimientos',
        'Descargar datos'
      ]}
    />
  )
}
