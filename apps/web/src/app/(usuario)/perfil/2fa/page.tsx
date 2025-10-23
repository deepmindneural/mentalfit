import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Autenticación 2FA | MentalFit',
  description: 'Configurar verificación en dos pasos'
}

export default function PaginaAutenticación2FA() {
  return (
    <EnConstruccion
      titulo="Autenticación 2FA"
      descripcion="Configurar verificación en dos pasos"
      funcionalidadesEsperadas={[
        'Activar 2FA',
        'Métodos disponibles (app, SMS)',
        'Códigos de backup',
        'Escanear QR',
        'Verificar configuración',
        'Desactivar 2FA'
      ]}
    />
  )
}
