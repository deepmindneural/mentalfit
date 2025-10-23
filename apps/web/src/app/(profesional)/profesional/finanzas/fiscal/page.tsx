import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Información Fiscal | MentalFit',
  description: 'Datos para impuestos'
}

export default function PaginaInformaciónFiscal() {
  return (
    <EnConstruccion
      titulo="Información Fiscal"
      descripcion="Datos para impuestos"
      funcionalidadesEsperadas={[
        'Datos fiscales',
        'RFC/NIF',
        'Régimen fiscal',
        'Constancia fiscal',
        'Reportes anuales',
        'Actualizar información'
      ]}
    />
  )
}
