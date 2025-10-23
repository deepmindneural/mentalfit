import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gestión de Impuestos | MentalFit',
  description: 'Configuración fiscal'
}

export default function PaginaGestióndeImpuestos() {
  return (
    <EnConstruccion
      titulo="Gestión de Impuestos"
      descripcion="Configuración fiscal"
      funcionalidadesEsperadas={[
        'Tasas impositivas',
        'Reportes fiscales',
        'Configuración por región',
        'Retenciones',
        'Exportar para contabilidad',
        'Historial fiscal'
      ]}
    />
  )
}
