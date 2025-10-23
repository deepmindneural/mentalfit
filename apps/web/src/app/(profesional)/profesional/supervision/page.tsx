import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Supervisión | MentalFit',
  description: 'Asesoría profesional'
}

export default function PaginaSupervisión() {
  return (
    <EnConstruccion
      titulo="Supervisión"
      descripcion="Asesoría profesional"
      funcionalidadesEsperadas={[
        'Solicitar supervisión',
        'Sesiones de supervisión',
        'Casos para discutir',
        'Supervisores disponibles',
        'Historial de supervisión',
        'Certificados'
      ]}
    />
  )
}
