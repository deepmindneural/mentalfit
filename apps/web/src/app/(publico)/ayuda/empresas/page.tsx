import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ayuda para Empresas | MentalFit',
  description: 'Guías para organizaciones'
}

export default function PaginaAyudaparaEmpresas() {
  return (
    <EnConstruccion
      titulo="Ayuda para Empresas"
      descripcion="Guías para organizaciones"
      funcionalidadesEsperadas={[
        'Configuración inicial corporativa',
        'Gestión de empleados',
        'Dashboard de métricas',
        'Facturación y pagos',
        'Configuración de beneficios',
        'Reportes personalizados'
      ]}
    />
  )
}
