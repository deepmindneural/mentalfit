// Tipos para el sistema de autenticación

export interface Usuario {
  id: string;
  email: string;
  nombre: string;
  apellido: string;
  rol: 'usuario' | 'aliado' | 'admin';
  foto?: string;
  fechaRegistro: string;
  activo: boolean;
}

export interface UsuarioRegular extends Usuario {
  rol: 'usuario';
  planActual?: string;
  fechaVencimientoPlan?: string;
}

export interface Aliado extends Usuario {
  rol: 'aliado';
  nombreEmpresa: string;
  comision: number;
  categorias: string[];
}

export interface Administrador extends Usuario {
  rol: 'admin';
  permisos: string[];
}

export interface CredencialesLogin {
  email: string;
  password: string;
}

export interface ResultadoLogin {
  success: boolean;
  mensaje?: string;
  usuario?: Usuario;
  token?: string;
  caducidad?: string; // Fecha ISO de caducidad del token
}

export interface SesionUsuario {
  usuario?: Usuario;
  isAutenticado: boolean;
  token?: string;
}
