import { Usuario, UsuarioRegular, Aliado, Administrador, CredencialesLogin, ResultadoLogin } from '../tipos/auth';

// Usuarios regulares
const usuariosRegulares: UsuarioRegular[] = [
  {
    id: 'usr001',
    email: 'carlos.rodriguez@mentalfit.co',
    nombre: 'Carlos',
    apellido: 'Rodru00edguez',
    rol: 'usuario',
    foto: 'https://randomuser.me/api/portraits/men/32.jpg',
    fechaRegistro: '2025-01-15',
    activo: true,
    planActual: 'plan002',
    fechaVencimientoPlan: '2025-06-15',
  },
  {
    id: 'usr002',
    email: 'maria.lopez@mentalfit.co',
    nombre: 'Maru00eda',
    apellido: 'Lu00f3pez',
    rol: 'usuario',
    foto: 'https://randomuser.me/api/portraits/women/44.jpg',
    fechaRegistro: '2025-02-20',
    activo: true,
  },
  {
    id: 'usr003',
    email: 'pedro.sanchez@mentalfit.co',
    nombre: 'Pedro',
    apellido: 'Su00e1nchez',
    rol: 'usuario',
    foto: 'https://randomuser.me/api/portraits/men/76.jpg',
    fechaRegistro: '2025-03-05',
    activo: true,
    planActual: 'plan001',
    fechaVencimientoPlan: '2025-07-05',
  },
];

// Aliados
const aliados: Aliado[] = [
  {
    id: 'al001',
    email: 'juan.garcia@clinicabienestar.co',
    nombre: 'Juan',
    apellido: 'Garcu00eda',
    rol: 'aliado',
    foto: 'https://randomuser.me/api/portraits/men/45.jpg',
    fechaRegistro: '2024-12-10',
    activo: true,
    nombreEmpresa: 'Clu00ednica Bienestar',
    comision: 10,
    categorias: ['Psicologu00eda', 'Terapia'],
  },
  {
    id: 'al002',
    email: 'aliados@unal.edu.co',
    nombre: 'Universidad',
    apellido: 'Nacional',
    rol: 'aliado',
    foto: 'https://randomuser.me/api/portraits/women/28.jpg',
    fechaRegistro: '2024-11-05',
    activo: true,
    nombreEmpresa: 'Universidad Nacional de Colombia',
    comision: 15,
    categorias: ['Educaciu00f3n', 'Investigaciu00f3n'],
  },
  {
    id: 'al003',
    email: 'monica.duarte@psicologosasociados.co',
    nombre: 'Mu00f3nica',
    apellido: 'Duarte',
    rol: 'aliado',
    foto: 'https://randomuser.me/api/portraits/women/65.jpg',
    fechaRegistro: '2025-01-20',
    activo: true,
    nombreEmpresa: 'Psicu00f3logos Asociados',
    comision: 12,
    categorias: ['Terapia', 'Trastornos'],
  },
];

// Administradores
const administradores: Administrador[] = [
  {
    id: 'adm001',
    email: 'andres.martinez@mentalfit.co',
    nombre: 'Andrés',
    apellido: 'Martínez',
    rol: 'admin',
    foto: 'https://randomuser.me/api/portraits/men/92.jpg',
    fechaRegistro: '2024-10-01',
    activo: true,
    permisos: ['all'],
  },
  {
    id: 'adm002',
    email: 'carolina.herrera@mentalfit.co',
    nombre: 'Carolina',
    apellido: 'Herrera',
    rol: 'admin',
    foto: 'https://randomuser.me/api/portraits/women/22.jpg',
    fechaRegistro: '2024-11-15',
    activo: true,
    permisos: ['usuarios', 'aliados'],
  },
];

// Combinar todos los usuarios
export const todosUsuarios: Usuario[] = [
  ...usuariosRegulares,
  ...aliados,
  ...administradores,
];

// Contraseñas (en un sistema real estarían hasheadas y no aquí)
const passwords: Record<string, string> = {
  // Usuarios
  'carlos.rodriguez@mentalfit.co': 'cRod#4521',
  'maria.lopez@mentalfit.co': 'mLpz*7832',
  'pedro.sanchez@mentalfit.co': 'pS@nch3z95',
  
  // Aliados
  'juan.garcia@clinicabienestar.co': 'JG#Clinica2025',
  'aliados@unal.edu.co': 'UN@L-2025aliados',
  'monica.duarte@psicologosasociados.co': 'MD_Psico87!',
  
  // Administradores
  'andres.martinez@mentalfit.co': 'A&Mtz_Admin!2025',
  'carolina.herrera@mentalfit.co': 'CH-@dmin2025!'
};

// Funciu00f3n para verificar credenciales y realizar login
export const loginUsuario = (credenciales: CredencialesLogin): ResultadoLogin => {
  const { email, password } = credenciales;
  
  // Verificar si el email existe
  const usuario = todosUsuarios.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (!usuario) {
    return {
      success: false,
      mensaje: 'El email no estu00e1 registrado',
    };
  }
  
  // Verificar si el usuario estu00e1 activo
  if (!usuario.activo) {
    return {
      success: false,
      mensaje: 'Esta cuenta no estu00e1 activa',
    };
  }
  
  // Verificar contraseu00f1a
  const passwordCorrecta = passwords[email] === password;
  
  if (!passwordCorrecta) {
    return {
      success: false,
      mensaje: 'Contraseu00f1a incorrecta',
    };
  }
  
  // Generar cadu00cada para el token (24 horas desde ahora)
  const fechaCaducidad = new Date();
  fechaCaducidad.setHours(fechaCaducidad.getHours() + 24);
  
  // Login exitoso
  return {
    success: true,
    usuario,
    token: `jwt-token-${Date.now()}`, // Token simulado
    caducidad: fechaCaducidad.toISOString(), // Anexar informaciu00f3n de cadu00cada
  };
};

// Funciu00f3n para obtener un usuario por su ID
export const obtenerUsuarioPorId = (id: string): Usuario | undefined => {
  return todosUsuarios.find(usuario => usuario.id === id);
};

// Funciu00f3n para obtener un usuario por su email
export const obtenerUsuarioPorEmail = (email: string): Usuario | undefined => {
  return todosUsuarios.find(usuario => usuario.email.toLowerCase() === email.toLowerCase());
};

// Funciu00f3n para verificar la validez de un token JWT
export const verificarTokenUsuario = async (token: string): Promise<boolean> => {
  // En un sistema real, esto haru00eda una llamada al API para validar el token
  // Para esta simulaciu00f3n, simplemente verificamos que el token tenga formato correcto
  try {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Verificar que el token siga el formato esperado (jwt-token-timestamp)
    const esTokenValido = token.startsWith('jwt-token-') && !isNaN(parseInt(token.split('jwt-token-')[1]));
    
    // En un sistema real, tambu00e9n verificaru00edamos firma, expiraciu00f3n, etc.
    return esTokenValido;
  } catch (error) {
    console.error('Error al verificar token:', error);
    return false;
  }
};

// Funciu00f3n para refrescar un token JWT
export const refrescarToken = async (tokenAntiguo: string): Promise<string | null> => {
  // En un sistema real, esto haru00eda una llamada al API para obtener un nuevo token
  // Para esta simulaciu00f3n, simplemente generamos un nuevo token
  try {
    // Verificar que el token antiguo sea vu00e1lido
    const esValido = await verificarTokenUsuario(tokenAntiguo);
    
    if (!esValido) {
      return null;
    }
    
    // Generar un nuevo token
    return `jwt-token-${Date.now()}`;
  } catch (error) {
    console.error('Error al refrescar token:', error);
    return null;
  }
};

// Funciu00f3n para actualizar datos de un usuario
export const actualizarDatosUsuario = async (id: string, datos: Partial<Usuario>): Promise<Usuario | null> => {
  // En un sistema real, esto haru00eda una llamada al API para actualizar los datos
  // Para esta simulaciu00f3n, actualizamos localmente
  
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Encontrar el usuario
  const indice = todosUsuarios.findIndex(u => u.id === id);
  
  if (indice === -1) {
    return null;
  }
  
  // Actualizar datos (immutable)
  const usuarioActualizado = {
    ...todosUsuarios[indice],
    ...datos,
    // Evitar cambiar campos cru00edticos a travu00e9s de esta funciu00f3n
    id: todosUsuarios[indice].id,
    rol: todosUsuarios[indice].rol,
  };
  
  // En un sistema real, guardaríamos en la base de datos
  // Aquí solo actualizamos nuestro array local
  // Esto no persistiru00e1 entre recargas de pu00e1gina
  return usuarioActualizado;
};
