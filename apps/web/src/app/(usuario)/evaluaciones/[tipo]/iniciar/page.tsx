import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Iniciar Evaluación | MentalFit',
  description: 'Comenzar test de bienestar'
}

export default function PaginaIniciarEvaluacion() {
  return (
    <EnConstruccion
      titulo="Iniciar Evaluación"
      descripcion="Comenzar test de bienestar"
      funcionalidadesEsperadas={[
        'Información del test',
        'Duración estimada',
        'Instrucciones',
        'Privacidad de datos',
        'Comenzar evaluación',
        'Guardar para después'
      ]}
    />
  )
}
