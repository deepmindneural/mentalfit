import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Configurar Beneficios | MentalFit',
  description: 'Límites y accesos'
}

export default function PaginaConfigurarBeneficios() {
  return (
    <EnConstruccion
      titulo="Configurar Beneficios"
      descripcion="Límites y accesos"
      funcionalidadesEsperadas={[
        'Sesiones incluidas por empleado',
        'Tipos de terapia cubiertos',
        'Recursos disponibles',
        'Restricciones',
        'Políticas de uso',
        'Guardar cambios'
      ]}
    />
  )
}
