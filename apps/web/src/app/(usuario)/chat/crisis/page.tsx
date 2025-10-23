import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chat de Crisis | MentalFit',
  description: 'Apoyo inmediato'
}

export default function PaginaChatdeCrisis() {
  return (
    <EnConstruccion
      titulo="Chat de Crisis"
      descripcion="Apoyo inmediato"
      funcionalidadesEsperadas={[
        'Línea de crisis 24/7',
        'Protocolo de emergencia',
        'Contacto inmediato',
        'Recursos de emergencia',
        'Teléfonos de ayuda',
        'Escalación a servicios de emergencia'
      ]}
    />
  )
}
