'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DatoGrafico {
  nombre: string;
  [key: string]: string | number;
}

interface PropiedadesGraficoLinea {
  datos: DatoGrafico[];
  lineas: {
    clave: string;
    nombre: string;
    color: string;
  }[];
  alto?: number;
  mostrarCuadricula?: boolean;
  mostrarLeyenda?: boolean;
}

export default function GraficoLinea({
  datos,
  lineas,
  alto = 300,
  mostrarCuadricula = true,
  mostrarLeyenda = true,
}: PropiedadesGraficoLinea) {
  return (
    <ResponsiveContainer width="100%" height={alto}>
      <LineChart data={datos}>
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

        {lineas.map((linea) => (
          <Line
            key={linea.clave}
            type="monotone"
            dataKey={linea.clave}
            name={linea.nombre}
            stroke={linea.color}
            strokeWidth={2}
            dot={{ fill: linea.color, r: 4 }}
            activeDot={{ r: 6 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
