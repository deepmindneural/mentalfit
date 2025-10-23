import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cuestionario | MentalFit',
  description: 'Responder evaluación'
}

export default function PaginaPreguntasEvaluacion() {
  return (
    <EnConstruccion
      titulo="Cuestionario"
      descripcion="Responder evaluación"
      funcionalidadesEsperadas={[
        'Preguntas del test',
        'Barra de progreso',
        'Navegación entre preguntas',
        'Guardar borrador',
        'Finalizar evaluación',
        'Validación de respuestas'
      ]}
    />
  )
}
