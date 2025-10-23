'use client';

import LandingLayout from '@/components/landing/LandingLayout';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import AreaTexto from '@/components/ui/AreaTexto';
import { Mail, Phone, MapPin, Clock, CheckCircle } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Nombre requerido'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  company: z.string().optional(),
  department: z.string().min(1, 'Selecciona un departamento'),
  subject: z.string().min(3, 'Asunto requerido'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres')
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactoPage() {
  const t = useTranslations('contact');
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // TODO: API call to send contact message
      console.log('Contact data:', data);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitted(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (submitted) {
    return (
      <LandingLayout>
        <section className="py-20 lg:py-32 bg-gradient-to-br from-primary-50 to-white min-h-screen flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center space-y-8">
              <div className="w-20 h-20 bg-exito-100 text-exito-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-12 h-12" />
              </div>
              <h1 className="text-4xl font-bold font-display text-gray-900">
                {t('success.title')}
              </h1>
              <p className="text-xl text-gray-600">
                {t('success.subtitle')}
              </p>
            </div>
          </div>
        </section>
      </LandingLayout>
    );
  }

  return (
    <LandingLayout>
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold font-display text-gray-900 mb-4">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-gray-600">
              {t('hero.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Contact Info Cards */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('info.email.title')}</h3>
              <p className="text-gray-600">{t('info.email.value')}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('info.phone.title')}</h3>
              <p className="text-gray-600">{t('info.phone.value')}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('info.hours.title')}</h3>
              <p className="text-gray-600">{t('info.hours.value')}</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 lg:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t('form.title')}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  etiqueta={t('form.name')}
                  error={errors.name?.message}
                  {...register('name')}
                />

                <Input
                  etiqueta={t('form.email')}
                  type="email"
                  error={errors.email?.message}
                  {...register('email')}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  etiqueta={t('form.phone')}
                  type="tel"
                  error={errors.phone?.message}
                  {...register('phone')}
                />

                <Input
                  etiqueta={t('form.company')}
                  error={errors.company?.message}
                  {...register('company')}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                  etiqueta={t('form.department')}
                  error={errors.department?.message}
                  placeholder={t('form.departmentPlaceholder')}
                  opciones={[
                    { valor: 'ventas', etiqueta: t('form.departments.sales') },
                    { valor: 'soporte', etiqueta: t('form.departments.support') },
                    { valor: 'facturacion', etiqueta: t('form.departments.billing') },
                    { valor: 'general', etiqueta: t('form.departments.general') }
                  ]}
                  {...register('department')}
                />

                <Input
                  etiqueta={t('form.subject')}
                  error={errors.subject?.message}
                  {...register('subject')}
                />
              </div>

              <AreaTexto
                etiqueta={t('form.message')}
                rows={6}
                error={errors.message?.message}
                {...register('message')}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all duration-200 shadow-lg hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t('form.submitting') : t('form.submit')}
              </button>
            </form>
          </div>

          {/* Additional Help */}
          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-4">
              {t('help.title')}
            </p>
            <a
              href="/ayuda"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
            >
              {t('help.linkText')}
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}
