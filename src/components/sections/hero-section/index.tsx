import Image from 'next/image';
import Link from 'next/link';
import HeroStatsBar from '../hero-logos';
import { Subheading } from './subheading';
import { IntroVideo } from './intro-video';

export default function HeroSection() {
  return (
    <section className="pt-16 relative overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="absolute inset-0 pointer-events-none opacity-10 dark:opacity-5 bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 animate-gradient" />
      <div className="max-w-[120rem] mx-auto relative">
        <div className="wrapper">
          <div className="max-w-[800px] mx-auto">
            <div className="text-center pb-16">
              <Subheading text="Calculator & Formula Platform" />

              <h2 className="mx-auto font-bold mb-4 text-4xl sm:text-[50px] sm:leading-[64px] max-w-[700px] bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Free Online Calculators
              </h2>
              <p className="max-w-[620px] text-center mx-auto dark:text-gray-400 text-gray-500 text-base">
              Calculate faster with free tools across finance, math, physics, and health. Search instantly from anywhere using Cmd + K (Mac) or Ctrl + K (Windows), or browse categories to find the right calculator.
              </p>

              <div className="mt-9 flex sm:flex-row flex-col gap-3 relative z-30 items-center justify-center">
                <Link
                  href="/all-calculators"
                  className="h-12 inline-flex items-center justify-center px-6 py-3 rounded-full text-white text-sm bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-md"
                >
                  Start Calculating →
                </Link>
                <Link
                  href="/finance-calculators"
                  className="border border-gray-300 dark:border-slate-600 h-12 inline-flex items-center justify-center hover:bg-gray-50 dark:hover:bg-slate-800 px-6 py-3 rounded-full text-gray-700 dark:text-slate-200 text-sm transition"
                >
                  Start with Finance
                </Link>
                <IntroVideo />
              </div>
            </div>
          </div>
          <div className="max-w-[1000px] mx-auto relative">
            <div className="p-3 sm:p-[18px] relative z-30 rounded-[32px] border border-white/30 dark:border-white/10 bg-white/20">
              <Image
                src="/images/hero/hero-img.png"
                alt="CalcSuite Pro calculators dashboard screenshot"
                className="w-full rounded-2xl block dark:hidden"
                width={966}
                height={552}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 966px"
              />
              <Image
                src="/images/hero/hero-img-dark1.png"
                alt="CalcSuite Pro calculators dashboard screenshot dark theme"
                className="w-full rounded-2xl hidden dark:block"
                width={966}
                height={552}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 966px"
              />
            </div>
            <div className="absolute hidden lg:block z-10 -top-20 -translate-y-20 left-1/2 -translate-x-1/2">
              <svg
                width="1300"
                height="1001"
                viewBox="0 0 1300 1001"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.7" filter="url(#filter0_f_9279_7148)">
                  <circle cx="800" cy="500.03" r="300" fill="#4E6EFF" />
                </g>
                <g opacity="0.3" filter="url(#filter1_f_9279_7148)">
                  <circle cx="500" cy="500.03" r="300" fill="#FF58D5" />
                </g>
                <defs>
                  <filter
                    id="filter0_f_9279_7148"
                    x="300"
                    y="0.029541"
                    width="1000"
                    height="1000"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    />
                    <feGaussianBlur
                      stdDeviation="100"
                      result="effect1_foregroundBlur_9279_7148"
                    />
                  </filter>
                  <filter
                    id="filter1_f_9279_7148"
                    x="0"
                    y="0.029541"
                    width="1000"
                    height="1000"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    />
                    <feGaussianBlur
                      stdDeviation="100"
                      result="effect1_foregroundBlur_9279_7148"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        <div className="max-[1100px]:hidden">
          <Image
            src="/images/hero/shape-left-1.svg"
            className="absolute top-14 left-16 floating-1"
            alt=""
            role="presentation"
            aria-hidden="true"
            width={170}
            height={44}
          />
          <Image
            src="/images/hero/shape-left-2.svg"
            className="absolute left-[145px] top-[298px] floating-2 max-[1240px]:left-[80px]"
            alt=""
            role="presentation"
            aria-hidden="true"
            width={181}
            height={44}
          />
          <Image
            src="/images/hero/shape-right-1.svg"
            className="absolute right-16 top-[108px] floating-3"
            alt=""
            role="presentation"
            aria-hidden="true"
            width={176}
            height={44}
          />
          <Image
            src="/images/hero/shape-right-2.svg"
            className="absolute top-[316px] right-[200px] floating-4 max-[1240px]:right-[80px] max-[1350px]:right-[150px] max-[1500px]:right-[200px]"
            alt=""
            role="presentation"
            aria-hidden="true"
            width={179}
            height={44}
          />
        </div>
      </div>
      <div className="hero-glow-bg pointer-events-none w-full h-167.5 absolute z-10 bottom-0"></div>
      <HeroStatsBar />
    </section>
  );
}
