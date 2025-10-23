import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Facturación Empresa | MentalFit',
  description: 'Gestión de pagos corporativos'
}

export default function PaginaFacturacionEmpresa() {
  return (
    <EnConstruccion
      titulo="Facturación Empresa"
      descripcion="Gestión de pagos corporativos"
      funcionalidadesEsperadas={[
        'Historial de facturas',
        'Próximo cobro',
        'Método de pago',
        'Ajustes manuales',
        'Créditos y descuentos',
        'Exportar facturas'
      ]}
    />
  )
}
