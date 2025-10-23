import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Horarios | MentalFit',
  description: 'Configuración de agenda'
}

export default function PaginaHorarios() {
  return (
    <EnConstruccion
      titulo="Horarios"
      descripcion="Configuración de agenda"
      funcionalidadesEsperadas={[
        'Lunes a Domingo',
        'Horarios por día',
        'Excepciones',
        'Aplicar a todas las semanas',
        'Guardar configuración',
        'Preview de disponibilidad'
      ]}
    />
  )
}
