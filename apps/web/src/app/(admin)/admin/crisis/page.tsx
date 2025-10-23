import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gestión de Crisis | MentalFit',
  description: 'Protocolo de emergencias'
}

export default function PaginaGestióndeCrisis() {
  return (
    <EnConstruccion
      titulo="Gestión de Crisis"
      descripcion="Protocolo de emergencias"
      funcionalidadesEsperadas={[
        'Alertas activas',
        'Protocolo de intervención',
        'Contactos de emergencia',
        'Escalación de casos',
        'Historial de crisis',
        'Recursos de emergencia'
      ]}
    />
  )
}
