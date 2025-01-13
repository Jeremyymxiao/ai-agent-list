import { HTMLAttributeAnchorTarget } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { CONTACT_US_EMAIL } from '@/lib/env';

function InfoLink({
  href,
  title,
  target,
  type,
  className = '',
}: {
  href: string;
  title: string;
  target?: HTMLAttributeAnchorTarget;
  type?: string;
  className?: string;
}) {
  return (
    <Link href={href} title={title} className={`text-sm font-medium ${className}`} target={target} type={type}>
      {title}
    </Link>
  );
}

export default function Footer() {
  'use client';

  const t = useTranslations('Footer');

  const INFO_LIST = [
    {
      title: t('privacy'),
      href: '/privacy-policy',
    },
    {
      title: t('termsConditions'),
      href: '/terms-of-service',
    },
  ];

  return (
    <footer className='w-full border-t border-gray-800/30 bg-[#15141A]/80 backdrop-blur-sm'>
      <div className='mx-auto max-w-pc px-6 py-10'>
        <div className='flex flex-col items-center space-y-8 lg:flex-row lg:items-center lg:justify-between lg:space-y-0'>
          {/* Logo and Description */}
          <div className='text-center lg:text-left'>
            <h2 className='mb-2 text-2xl font-bold text-white transition-colors hover:text-gray-200 lg:text-3xl'>
              {t('title')}
            </h2>
            <p className='max-w-md text-sm text-gray-400/90'>{t('subTitle')}</p>
          </div>

          {/* Links Section */}
          <nav className='flex items-center space-x-8'>
            {INFO_LIST.map((item) => (
              <InfoLink
                key={item.href}
                href={item.href}
                title={item.title}
                className='text-gray-300 transition-colors hover:text-white'
              />
            ))}
            <a
              href={`mailto:${CONTACT_US_EMAIL}`}
              className='text-sm font-medium text-gray-300 transition-colors hover:text-white'
              title={t('contactUs')}
              type='email'
            >
              {t('contactUs')}
            </a>
          </nav>
        </div>

        {/* Copyright Line */}
        <div className='mt-8 border-t border-gray-800/30 pt-8'>
          <p className='text-center text-xs text-gray-500/90'>
            {new Date().getFullYear()} AI Agent List. {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
