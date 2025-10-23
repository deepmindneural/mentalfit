import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad | MentalFit',
  description: 'Cómo protegemos tus datos personales'
}

export default function PaginaPolíticadePrivacidad() {
  return (
    <EnConstruccion
      titulo="Política de Privacidad"
      descripcion="Cómo protegemos tus datos personales"
      funcionalidadesEsperadas={[
        'Recopilación de datos personales',
        'Uso y procesamiento de información',
        'Compartición con terceros',
        'Derechos del usuario',
        'Seguridad de datos',
        'Cumplimiento GDPR y HIPAA'
      ]}
    />
  )
}
