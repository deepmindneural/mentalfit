import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Integraciones | MentalFit',
  description: 'Conectar con otros sistemas'
}

export default function PaginaIntegraciones() {
  return (
    <EnConstruccion
      titulo="Integraciones"
      descripcion="Conectar con otros sistemas"
      funcionalidadesEsperadas={[
        'SSO (Single Sign-On)',
        'HRIS (Workday, BambooHR)',
        'Slack, Teams',
        'Calendario corporativo',
        'API keys',
        'Webhooks'
      ]}
    />
  )
}
