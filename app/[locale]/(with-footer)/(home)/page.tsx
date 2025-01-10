import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { createClient } from '@/db/supabase/client';
import { CircleChevronRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { RevalidateOneHour } from '@/lib/constants';
import Faq from '@/components/Faq';
import SearchForm from '@/components/home/SearchForm';
import WebNavCardList from '@/components/webNav/WebNavCardList';

import { TagList } from './Tag';

const ScrollToTop = dynamic(() => import('@/components/page/ScrollToTop'), { ssr: false });

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.home',
  });

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: './',
    },
  };
}

export const revalidate = RevalidateOneHour;

export default async function Page() {
  const supabase = createClient();
  const t = await getTranslations('Home');
  const [{ data: categoryList }, { data: navigationList }] = await Promise.all([
    supabase.from('navigation_category').select(),
    supabase.from('web_navigation').select().order('collection_time', { ascending: false }).limit(12),
  ]);

  return (
    <div className='relative w-full'>
      <div className='relative mx-auto w-full max-w-pc flex-1 px-3 lg:px-0'>
        <div className='relative my-12 flex flex-col items-center text-center lg:my-24'>
          <div className='absolute inset-0 -z-10 rounded-3xl bg-gradient-to-b from-purple-500/20 via-blue-500/20 to-transparent blur-3xl' />
          <h1 className='animate-fade-in text-4xl font-bold lg:text-7xl'>
            <span className='bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent'>
              {t('title')}
            </span>
          </h1>
          <div className='mt-6 max-w-3xl lg:mt-8'>
            <h2 className='animate-fade-in-delayed text-balance text-base font-medium text-gray-200/90 lg:text-xl'>
              {t('subTitle')}
            </h2>
          </div>
          <div className='absolute -left-4 top-0 h-72 w-72 animate-blob rounded-full bg-purple-500 opacity-20 mix-blend-multiply blur-xl filter' />
          <div className='animation-delay-2000 absolute -right-4 top-0 h-72 w-72 animate-blob rounded-full bg-blue-500 opacity-20 mix-blend-multiply blur-xl filter' />
        </div>
        <div className='flex w-full items-center justify-center'>
          <div className='w-full max-w-2xl animate-fade-in-delayed'>
            <SearchForm />
          </div>
        </div>
        <div className='mb-10 mt-5'>
          {categoryList && categoryList.length > 0 ? (
            <TagList
              data={categoryList.map((item) => ({
                id: String(item.id),
                name: item.name,
                href: `/category/${item.name}`,
              }))}
            />
          ) : null}
        </div>
        <div className='flex flex-col gap-5'>
          <h2 className='text-center text-[18px] lg:text-[32px]'>{t('ai-navigate')}</h2>
          {navigationList && navigationList.length > 0 ? (
            <>
              <WebNavCardList dataList={navigationList} />
              <Link
                href='/explore'
                className='mx-auto mb-5 flex w-fit items-center justify-center gap-5 rounded-[9px] border border-white p-[10px] text-sm leading-4 hover:opacity-70'
              >
                {t('more')}
                <CircleChevronRight className='h-4 w-4' />
              </Link>
            </>
          ) : null}
        </div>
        <Faq />
        <ScrollToTop />
      </div>
    </div>
  );
}
