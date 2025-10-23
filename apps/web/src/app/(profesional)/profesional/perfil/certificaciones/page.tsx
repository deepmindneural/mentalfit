import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Certificaciones | MentalFit',
  description: 'Credenciales profesionales'
}

export default function PaginaCertificaciones() {
  return (
    <EnConstruccion
      titulo="Certificaciones"
      descripcion="Credenciales profesionales"
      funcionalidadesEsperadas={[
        'Certificaciones activas',
        'Subir certificado',
        'Fecha de vencimiento',
        'Institución emisora',
        'Verificación',
        'Renovaciones'
      ]}
    />
  )
}
