import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Notas de Sesión | MentalFit',
  description: 'Registro clínico detallado'
}

export default function PaginaNotasSesion() {
  return (
    <EnConstruccion
      titulo="Notas de Sesión"
      descripcion="Registro clínico detallado"
      funcionalidadesEsperadas={[
        'Plantilla SOAP',
        'Notas de evolución',
        'Observaciones clínicas',
        'Plan de seguimiento',
        'Guardar borrador',
        'Finalizar notas'
      ]}
    />
  )
}
