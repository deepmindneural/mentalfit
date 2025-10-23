import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Historial Clínico | MentalFit',
  description: 'Registro completo de sesiones'
}

export default function PaginaHistorialPaciente() {
  return (
    <EnConstruccion
      titulo="Historial Clínico"
      descripcion="Registro completo de sesiones"
      funcionalidadesEsperadas={[
        'Cronología de sesiones',
        'Evolución del caso',
        'Notas clínicas',
        'Evaluaciones aplicadas',
        'Objetivos y progreso',
        'Exportar historial'
      ]}
    />
  )
}
