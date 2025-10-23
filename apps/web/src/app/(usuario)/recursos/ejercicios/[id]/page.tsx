import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ejercicio | MentalFit',
  description: 'Práctica guiada'
}

export default function PaginaEjercicioRecurso() {
  return (
    <EnConstruccion
      titulo="Ejercicio"
      descripcion="Práctica guiada"
      funcionalidadesEsperadas={[
        'Instrucciones del ejercicio',
        'Audio/video guiado',
        'Duración',
        'Beneficios',
        'Marcar como completado',
        'Programar recordatorios'
      ]}
    />
  )
}
