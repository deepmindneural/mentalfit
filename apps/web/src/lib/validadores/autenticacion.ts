import { z } from 'zod';

// Función auxiliar para validar contraseñas fuertes
const validarContrasenaFuerte = (contrasena: string) => {
  const tieneLongitudMinima = contrasena.length >= 8;
  const tieneMayuscula = /[A-Z]/.test(contrasena);
  const tieneMinuscula = /[a-z]/.test(contrasena);
  const tieneNumero = /\d/.test(contrasena);
  const tieneCaracterEspecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(contrasena);

  return tieneLongitudMinima && tieneMayuscula && tieneMinuscula && tieneNumero && tieneCaracterEspecial;
};

// Schema para validar email
const esquemaEmail = z.string()
  .min(1, 'auth.errors.emailRequired')
  .email('auth.errors.invalidEmail');

// Schema para validar contraseña fuerte
const esquemaContrasena = z.string()
  .min(8, 'auth.errors.passwordTooShort')
  .refine((contrasena) => /[A-Z]/.test(contrasena), {
    message: 'auth.errors.passwordNoUppercase',
  })
  .refine((contrasena) => /[a-z]/.test(contrasena), {
    message: 'auth.errors.passwordNoLowercase',
  })
  .refine((contrasena) => /\d/.test(contrasena), {
    message: 'auth.errors.passwordNoNumber',
  })
  .refine((contrasena) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(contrasena), {
    message: 'auth.errors.passwordNoSpecial',
  });

// Schema para login
export const esquemaLogin = z.object({
  email: esquemaEmail,
  contrasena: z.string().min(1, 'auth.errors.passwordRequired'),
  recordarme: z.boolean().optional(),
});

export type DatosLogin = z.infer<typeof esquemaLogin>;

// Schema para registro - Paso 1
export const esquemaRegistroPaso1 = z.object({
  nombre: z.string().min(1, 'auth.errors.firstNameRequired'),
  apellido: z.string().min(1, 'auth.errors.lastNameRequired'),
  email: esquemaEmail,
});

export type DatosRegistroPaso1 = z.infer<typeof esquemaRegistroPaso1>;

// Schema para registro - Paso 2
export const esquemaRegistroPaso2 = z.object({
  nombreEmpresa: z.string().min(1, 'auth.errors.companyNameRequired'),
  tamanoEmpresa: z.string().min(1, 'auth.errors.companySizeRequired'),
  cargo: z.string().min(1, 'auth.errors.jobTitleRequired'),
  rol: z.string().min(1, 'auth.errors.roleRequired'),
});

export type DatosRegistroPaso2 = z.infer<typeof esquemaRegistroPaso2>;

// Schema para registro - Paso 3
export const esquemaRegistroPaso3 = z.object({
  contrasena: esquemaContrasena,
  confirmarContrasena: z.string().min(1, 'auth.errors.required'),
}).refine((datos) => datos.contrasena === datos.confirmarContrasena, {
  message: 'auth.errors.passwordsNoMatch',
  path: ['confirmarContrasena'],
});

export type DatosRegistroPaso3 = z.infer<typeof esquemaRegistroPaso3>;

// Schema completo de registro (todos los pasos)
export const esquemaRegistroCompleto = esquemaRegistroPaso1
  .merge(esquemaRegistroPaso2)
  .merge(esquemaRegistroPaso3);

export type DatosRegistroCompleto = z.infer<typeof esquemaRegistroCompleto>;

// Schema para olvidé contraseña
export const esquemaOlvideContrasena = z.object({
  email: esquemaEmail,
});

export type DatosOlvideContrasena = z.infer<typeof esquemaOlvideContrasena>;

// Schema para restablecer contraseña
export const esquemaRestablecerContrasena = z.object({
  contrasena: esquemaContrasena,
  confirmarContrasena: z.string().min(1, 'auth.errors.required'),
}).refine((datos) => datos.contrasena === datos.confirmarContrasena, {
  message: 'auth.errors.passwordsNoMatch',
  path: ['confirmarContrasena'],
});

export type DatosRestablecerContrasena = z.infer<typeof esquemaRestablecerContrasena>;

// Schema para código 2FA
export const esquemaCodigo2FA = z.object({
  codigo: z.string()
    .length(6, 'auth.errors.invalid2FACode')
    .regex(/^\d{6}$/, 'auth.errors.invalid2FACode'),
});

export type DatosCodigo2FA = z.infer<typeof esquemaCodigo2FA>;

// Función auxiliar para calcular la fortaleza de la contraseña
export const calcularFortalezaContrasena = (contrasena: string): {
  nivel: 'debil' | 'media' | 'fuerte';
  porcentaje: number;
  requisitos: {
    longitud: boolean;
    mayuscula: boolean;
    minuscula: boolean;
    numero: boolean;
    caracterEspecial: boolean;
  };
} => {
  const requisitos = {
    longitud: contrasena.length >= 8,
    mayuscula: /[A-Z]/.test(contrasena),
    minuscula: /[a-z]/.test(contrasena),
    numero: /\d/.test(contrasena),
    caracterEspecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(contrasena),
  };

  const requisitosCumplidos = Object.values(requisitos).filter(Boolean).length;
  const porcentaje = (requisitosCumplidos / 5) * 100;

  let nivel: 'debil' | 'media' | 'fuerte' = 'debil';
  if (requisitosCumplidos >= 5) {
    nivel = 'fuerte';
  } else if (requisitosCumplidos >= 3) {
    nivel = 'media';
  }

  return { nivel, porcentaje, requisitos };
};
