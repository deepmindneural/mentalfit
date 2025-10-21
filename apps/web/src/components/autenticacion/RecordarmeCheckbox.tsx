'use client';

import { useTranslations } from 'next-intl';

interface PropiedadesRecordarmeCheckbox {
  valor: boolean;
  onChange: (valor: boolean) => void;
  className?: string;
}

export default function RecordarmeCheckbox({
  valor,
  onChange,
  className = ''
}: PropiedadesRecordarmeCheckbox) {
  const t = useTranslations();

  return (
    <div className={`flex items-center ${className}`}>
      <input
        id="recordarme"
        name="recordarme"
        type="checkbox"
        checked={valor}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded cursor-pointer transition-colors"
      />
      <label
        htmlFor="recordarme"
        className="ml-2 block text-sm text-gray-700 cursor-pointer select-none"
      >
        {t('auth.login.rememberMe')}
      </label>
    </div>
  );
}
