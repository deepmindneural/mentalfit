import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ficha de Paciente | MentalFit',
  description: 'Información completa del paciente'
}

export default function PaginaFichaPaciente() {
  return (
    <EnConstruccion
      titulo="Ficha de Paciente"
      descripcion="Información completa del paciente"
      funcionalidadesEsperadas={[
        'Perfil del paciente',
        'Motivo de consulta',
        'Historial clínico',
        'Plan de tratamiento',
        'Notas de sesiones',
        'Archivos adjuntos'
      ]}
    />
  )
}
