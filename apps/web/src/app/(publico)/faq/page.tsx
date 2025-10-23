import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes | MentalFit',
  description: 'Respuestas rápidas a dudas comunes'
}

export default function PaginaPreguntasFrecuentes() {
  return (
    <EnConstruccion
      titulo="Preguntas Frecuentes"
      descripcion="Respuestas rápidas a dudas comunes"
      funcionalidadesEsperadas={[
        'Preguntas sobre registro',
        'Preguntas sobre sesiones',
        'Preguntas sobre pagos',
        'Preguntas sobre privacidad',
        'Preguntas sobre cancelaciones',
        'Preguntas técnicas'
      ]}
    />
  )
}
