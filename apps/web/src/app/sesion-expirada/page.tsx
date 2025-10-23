import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sesión Expirada | MentalFit',
  description: 'Tu sesión ha caducado'
}

export default function PaginaSesiónExpirada() {
  return (
    <EnConstruccion
      titulo="Sesión Expirada"
      descripcion="Tu sesión ha caducado"
      funcionalidadesEsperadas={[
        'Mensaje de sesión expirada',
        'Iniciar sesión nuevamente',
        'Recordar dispositivo',
        'Recuperar trabajo no guardado',
        'Configurar tiempo de sesión',
        'Contactar soporte'
      ]}
    />
  )
}
