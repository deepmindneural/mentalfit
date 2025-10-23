import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Herramientas Clínicas | MentalFit',
  description: 'Recursos para práctica'
}

export default function PaginaHerramientasClínicas() {
  return (
    <EnConstruccion
      titulo="Herramientas Clínicas"
      descripcion="Recursos para práctica"
      funcionalidadesEsperadas={[
        'Evaluaciones disponibles',
        'Protocolos de intervención',
        'Plantillas de notas',
        'Recursos educativos',
        'Técnicas terapéuticas',
        'Biblioteca clínica'
      ]}
    />
  )
}
