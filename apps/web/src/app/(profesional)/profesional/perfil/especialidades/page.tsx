import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Especialidades | MentalFit',
  description: 'Áreas de práctica'
}

export default function PaginaEspecialidades() {
  return (
    <EnConstruccion
      titulo="Especialidades"
      descripcion="Áreas de práctica"
      funcionalidadesEsperadas={[
        'Especialidades actuales',
        'Agregar especialidad',
        'Nivel de experiencia',
        'Certificaciones asociadas',
        'Eliminar especialidad',
        'Guardar'
      ]}
    />
  )
}
