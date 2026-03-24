import Image from "next/image";
import Link from "next/link";
import { features } from "@/config/features";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gray-900">
      <span className="absolute top-0 -translate-x-1/2 left-1/2">
        <svg
          width="1260"
          height="457"
          viewBox="0 0 1260 457"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_f_11105_867)">
            <circle cx="630" cy="-173.299" r="230" fill="#3B2EFF" />
          </g>
          <defs>
            <filter
              id="filter0_f_11105_867"
              x="0"
              y="-803.299"
              width="1260"
              height="1260"
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
                stdDeviation="200"
                result="effect1_foregroundBlur_11105_867"
              />
            </filter>
          </defs>
        </svg>
      </span>
      <div className="relative z-10 py-16 xl:py-24">
        <div className="container px-5 mx-auto sm:px-7">
          <div className="grid gap-y-8 gap-x-6 lg:grid-cols-12">
            <div className="lg:col-span-3 xl:col-span-4">
              <div>
                <Link href="/" className="mb-6 inline-flex items-center gap-2.5 whitespace-nowrap transition-opacity hover:opacity-90">
                  <Image
                    src="/images/logo.png"
                    alt="CalcSuite Pro"
                    width={32}
                    height={32}
                    className="h-8 w-auto shrink-0"
                  />
                  <span className="text-lg font-semibold tracking-tight text-white">
                    CalcSuite
                    <span className="text-primary-400"> Pro</span>
                  </span>
                </Link>
                <p className="block text-sm text-gray-400 mb-9">
                  Interactive Calculator & Formula Platform
                </p>
              </div>
            </div>
            <div className="lg:col-span-6 xl:col-span-5">
              <div className="grid sm:grid-cols-3 gap-7">
                <div>
                  <span className="block mb-6 text-sm text-gray-400">
                    Product
                  </span>
                  <nav className="flex flex-col space-y-3">
                    <Link
                      href="/all-calculators"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      All Calculators
                    </Link>
                    <Link
                      href="/finance-calculators"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      Finance Calculators
                    </Link>
                    <Link
                      href="/math-calculators"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      Math Calculators
                    </Link>
                    <Link
                      href="/physics-calculators"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      Physics Calculators
                    </Link>
                    <Link
                      href="/health-calculators"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      Health Calculators
                    </Link>
                    <Link
                      href="/mortgage-calculators"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      Mortgage Calculators
                    </Link>
                    <Link
                      href="/investment-calculators"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      Investment Calculators
                    </Link>
                    <Link
                      href="/loan-calculators"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      Loan Calculators
                    </Link>
                    <Link
                      href="/blog"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      Blog
                    </Link>
                  </nav>
                </div>
                <div>
                  <span className="block mb-6 text-sm text-gray-400">
                    Company
                  </span>
                  <nav className="flex flex-col space-y-3">
                    <Link
                      href="/about"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      About
                    </Link>
                    <Link
                      href="/contact"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      Contact
                    </Link>
                    {features.pricingEnabled && (
                      <Link
                        href="/pricing"
                        className="text-sm font-normal text-gray-400 transition hover:text-white"
                      >
                        Pricing
                      </Link>
                    )}
                  </nav>
                </div>
                <div>
                  <span className="block mb-6 text-sm text-gray-400">
                    Legal
                  </span>
                  <nav className="flex flex-col space-y-3">
                    <Link
                      href="/compound-interest-calculator"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      Compound Interest Calculator
                    </Link>
                    <Link
                      href="/emi-calculator"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      EMI Calculator
                    </Link>
                    <Link
                      href="/bmi-calculator"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      BMI Calculator
                    </Link>
                    <Link
                      href="/terms"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      Terms &amp; Conditions
                    </Link>
                    <Link
                      href="/privacy-policy"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      Privacy Policy
                    </Link>
                  </nav>
                </div>
              </div>
            </div>
            {features.authEnabled && (
              <div className="lg:col-span-3">
                <div>
                  <span className="block mb-6 text-sm text-gray-400">
                    Account
                  </span>
                  <nav className="flex flex-col space-y-3">
                    <Link
                      href="/signin"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      Sign in
                    </Link>
                    <Link
                      href="/signup"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      Sign up
                    </Link>
                    <Link
                      href="/reset-password"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      Reset password
                    </Link>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="container relative z-10 px-5 mx-auto sm:px-7">
          <div className="py-5 text-center">
            <p className="text-sm text-gray-500">
              &copy; 2026 CalcSuite Pro. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
