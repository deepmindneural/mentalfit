import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ayuda con Sesiones | MentalFit',
  description: 'Todo sobre sesiones terapéuticas'
}

export default function PaginaAyudaconSesiones() {
  return (
    <EnConstruccion
      titulo="Ayuda con Sesiones"
      descripcion="Todo sobre sesiones terapéuticas"
      funcionalidadesEsperadas={[
        'Agendar una sesión',
        'Unirse a videollamada',
        'Cancelar o reprogramar',
        'Problemas técnicos',
        'Grabar sesiones',
        'Calificar terapeuta'
      ]}
    />
  )
}
