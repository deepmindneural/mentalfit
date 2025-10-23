'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DatoGrafico {
  nombre: string;
  [key: string]: string | number;
}

interface PropiedadesGraficoBarra {
  datos: DatoGrafico[];
  barras: {
    clave: string;
    nombre: string;
    color: string;
  }[];
  alto?: number;
  mostrarCuadricula?: boolean;
  mostrarLeyenda?: boolean;
  apilado?: boolean;
}

export default function GraficoBarra({
  datos,
  barras,
  alto = 300,
  mostrarCuadricula = true,
  mostrarLeyenda = true,
  apilado = false,
}: PropiedadesGraficoBarra) {
  return (
    <ResponsiveContainer width="100%" height={alto}>
      <BarChart data={datos}>
        {mostrarCuadricula && <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />}
        <XAxis
          dataKey="nombre"
          className="text-xs text-gray-600 dark:text-gray-400"
          tick={{ fill: 'currentColor' }}
        />
        <YAxis
          className="text-xs text-gray-600 dark:text-gray-400"
          tick={{ fill: 'currentColor' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgb(31 41 55)',
            border: 'none',
            borderRadius: '0.5rem',
            color: 'white'
          }}
        />
        {mostrarLeyenda && <Legend />}

        {barras.map((barra) => (
          <Bar
            key={barra.clave}
            dataKey={barra.clave}
            name={barra.nombre}
            fill={barra.color}
            radius={[4, 4, 0, 0]}
            stackId={apilado ? 'stack' : undefined}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
