'use client';

import LandingLayout from '@/components/landing/LandingLayout';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Checkbox from '@/components/ui/Checkbox';
import { CheckCircle, ArrowRight } from 'lucide-react';

const trialSchema = z.object({
  firstName: z.string().min(2, 'Nombre requerido'),
  lastName: z.string().min(2, 'Apellido requerido'),
  email: z.string().email('Email inválido'),
  companyName: z.string().min(2, 'Nombre de empresa requerido'),
  companySize: z.string().min(1, 'Selecciona un tamaño'),
  jobTitle: z.string().min(2, 'Cargo requerido'),
  phone: z.string().optional(),
  acceptTerms: z.boolean().refine(val => val === true, 'Debes aceptar los términos')
});

type TrialFormData = z.infer<typeof trialSchema>;

export default function PruebaGratisPage() {
  const t = useTranslations('freeTrial');
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<TrialFormData>({
    resolver: zodResolver(trialSchema)
  });

  const onSubmit = async (data: TrialFormData) => {
    try {
      // TODO: API call to register free trial
      console.log('Trial data:', data);
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
              <div className="bg-white rounded-xl shadow-lg p-8 text-left">
                <h3 className="font-semibold text-lg mb-4">{t('success.nextSteps.title')}</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5" />
                    <span className="text-gray-700">{t('success.nextSteps.step1')}</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5" />
                    <span className="text-gray-700">{t('success.nextSteps.step2')}</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5" />
                    <span className="text-gray-700">{t('success.nextSteps.step3')}</span>
                  </li>
                </ul>
              </div>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Benefits */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold font-display text-gray-900 mb-4">
                  {t('hero.title')}
                </h1>
                <p className="text-xl text-gray-600">
                  {t('hero.subtitle')}
                </p>
              </div>

              <div className="space-y-4">
                {[0, 1, 2, 3, 4].map(i => (
                  <div key={i} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {t(`benefits.${i}.title`)}
                      </h3>
                      <p className="text-gray-600">
                        {t(`benefits.${i}.description`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t('form.title')}
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Input
                      label={t('form.firstName')}
                      error={errors.firstName?.message}
                      {...register('firstName')}
                    />
                  </div>
                  <div>
                    <Input
                      label={t('form.lastName')}
                      error={errors.lastName?.message}
                      {...register('lastName')}
                    />
                  </div>
                </div>

                <Input
                  label={t('form.email')}
                  type="email"
                  error={errors.email?.message}
                  {...register('email')}
                />

                <Input
                  label={t('form.companyName')}
                  error={errors.companyName?.message}
                  {...register('companyName')}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    label={t('form.companySize')}
                    error={errors.companySize?.message}
                    {...register('companySize')}
                  >
                    <option value="">Selecciona</option>
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-200">51-200</option>
                    <option value="201-500">201-500</option>
                    <option value="501+">501+</option>
                  </Select>

                  <Input
                    label={t('form.jobTitle')}
                    error={errors.jobTitle?.message}
                    {...register('jobTitle')}
                  />
                </div>

                <Input
                  label={t('form.phone')}
                  type="tel"
                  error={errors.phone?.message}
                  {...register('phone')}
                />

                <div className="space-y-4">
                  <Checkbox
                    label={t('form.acceptTerms')}
                    error={errors.acceptTerms?.message}
                    {...register('acceptTerms')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all duration-200 shadow-lg hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? t('form.submitting') : t('form.submit')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>

                <p className="text-sm text-gray-500 text-center">
                  {t('form.privacy')}
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}
