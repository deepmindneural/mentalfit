import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tarifas | MentalFit',
  description: 'Configuración de precios'
}

export default function PaginaTarifas() {
  return (
    <EnConstruccion
      titulo="Tarifas"
      descripcion="Configuración de precios"
      funcionalidadesEsperadas={[
        'Tarifa por sesión',
        'Tarifas por tipo de terapia',
        'Descuentos',
        'Paquetes de sesiones',
        'Política de cancelación',
        'Guardar tarifas'
      ]}
    />
  )
}
