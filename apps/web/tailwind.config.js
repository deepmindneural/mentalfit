/** @type {import('tailwindcss').Config} */
module.exports = {
  // Modo oscuro con estrategia de clase
  darkMode: 'class',

  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764'
        },
        secondary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49'
        },
        accent: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617'
        },
        // Colores para estados
        exito: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        advertencia: {
          50: '#fefce8',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
        },
        peligro: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
        informacion: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },

      // Animaciones expandidas
      animation: {
        // Animaciones de entrada
        'aparecer': 'aparecer 0.5s ease-in-out',
        'aparecer-rapido': 'aparecer 0.3s ease-in-out',
        'aparecer-lento': 'aparecer 0.8s ease-in-out',

        // Animaciones de deslizamiento
        'deslizar-arriba': 'deslizarArriba 0.3s ease-out',
        'deslizar-abajo': 'deslizarAbajo 0.3s ease-out',
        'deslizar-izquierda': 'deslizarIzquierda 0.3s ease-out',
        'deslizar-derecha': 'deslizarDerecha 0.3s ease-out',

        // Animaciones de escala
        'escalar': 'escalar 0.2s ease-in-out',
        'escalar-entrada': 'escalarEntrada 0.3s ease-out',

        // Animaciones de rotación
        'girar': 'girar 1s linear infinite',
        'girar-lento': 'girar 2s linear infinite',

        // Animaciones de pulso
        'pulso-suave': 'pulsoSuave 2s infinite',
        'pulso-rapido': 'pulsoSuave 1s infinite',
        'latir': 'latir 1.5s ease-in-out infinite',

        // Animaciones de sacudida
        'sacudir': 'sacudir 0.5s ease-in-out',
        'temblar': 'temblar 0.3s ease-in-out',

        // Animaciones de rebote
        'rebotar': 'rebotar 1s infinite',
        'rebotar-suave': 'rebotarSuave 2s infinite',

        // Animaciones de progreso
        'progreso': 'progreso 1.5s ease-in-out infinite',
        'cargando-puntos': 'cargandoPuntos 1.4s infinite',

        // Animaciones de notificaciones
        'notificacion-entrada': 'notificacionEntrada 0.4s ease-out',
        'notificacion-salida': 'notificacionSalida 0.3s ease-in',

        // Animaciones de modal
        'modal-entrada': 'modalEntrada 0.3s ease-out',
        'modal-fondo': 'modalFondo 0.3s ease-out',
      },

      keyframes: {
        // Aparecer
        aparecer: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },

        // Deslizamientos
        deslizarArriba: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        deslizarAbajo: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        deslizarIzquierda: {
          '0%': { transform: 'translateX(10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        deslizarDerecha: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },

        // Escala
        escalar: {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        escalarEntrada: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },

        // Rotación
        girar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },

        // Pulso
        pulsoSuave: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        latir: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },

        // Sacudida
        sacudir: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(4px)' },
        },
        temblar: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-2deg)' },
          '75%': { transform: 'rotate(2deg)' },
        },

        // Rebote
        rebotar: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        rebotarSuave: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },

        // Progreso
        progreso: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        cargandoPuntos: {
          '0%, 20%': { content: '.' },
          '40%': { content: '..' },
          '60%, 100%': { content: '...' },
        },

        // Notificaciones
        notificacionEntrada: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        notificacionSalida: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },

        // Modal
        modalEntrada: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        modalFondo: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },

      // Espaciado personalizado
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },

      // Alturas y anchos personalizados
      maxHeight: {
        '128': '32rem',
        '144': '36rem',
      },

      // Border radius personalizado
      borderRadius: {
        '4xl': '2rem',
      },

      // Transiciones personalizadas
      transitionDuration: {
        '2000': '2000ms',
      },

      // Sombras personalizadas
      boxShadow: {
        'inner-lg': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.1)',
        'glow': '0 0 20px rgba(168, 85, 247, 0.4)',
        'glow-blue': '0 0 20px rgba(14, 165, 233, 0.4)',
      },
    },
  },

  plugins: [
    require('@tailwindcss/forms'),
  ],
};
