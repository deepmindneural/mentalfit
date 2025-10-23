import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cumplimiento Normativo | MentalFit',
  description: 'HIPAA, GDPR y certificaciones'
}

export default function PaginaCumplimientoNormativo() {
  return (
    <EnConstruccion
      titulo="Cumplimiento Normativo"
      descripcion="HIPAA, GDPR y certificaciones"
      funcionalidadesEsperadas={[
        'Certificación HIPAA',
        'Cumplimiento GDPR',
        'ISO 27001 y seguridad',
        'Auditorías de terceros',
        'Políticas de compliance',
        'Reportes de transparencia'
      ]}
    />
  )
}
