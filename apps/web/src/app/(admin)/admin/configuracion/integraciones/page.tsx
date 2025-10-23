import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Integraciones | MentalFit',
  description: 'APIs y servicios externos'
}

export default function PaginaIntegraciones() {
  return (
    <EnConstruccion
      titulo="Integraciones"
      descripcion="APIs y servicios externos"
      funcionalidadesEsperadas={[
        'Integraciones activas',
        'Configurar nueva integración',
        'API keys',
        'Webhooks',
        'Logs de sincronización',
        'Estado de servicios'
      ]}
    />
  )
}
