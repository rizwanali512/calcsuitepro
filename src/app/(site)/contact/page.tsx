import { Input } from '@/components/ui/inputs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/inputs/textarea';
import type { Metadata } from 'next';
import { getBaseUrl } from '@/lib/site-url';
import { DEFAULT_KEYWORDS, siteConfig } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Contact Us – Get in Touch',
  description:
    'Have a question, feedback, or need help with our calculators? Contact us and we will get back to you soon.',
  keywords: DEFAULT_KEYWORDS,
  alternates: { canonical: getBaseUrl() + '/contact' },
  openGraph: {
    title: 'Contact Us – Get in Touch',
    description:
      'Have a question, feedback, or need help with our calculators? Contact us and we will get back to you soon.',
    url: getBaseUrl() + '/contact',
    type: 'website',
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us – Get in Touch',
    description:
      "Have a question, feedback, or need help with our calculators? Contact us and we'll get back to you soon.",
  },
};

export default function ContactPage() {
  return (
    <section className="py-28 relative">
      <div className="wrapper">
        <div className="relative max-w-[800px] mx-auto">
          <div className="contact-wrapper border p-14 relative z-30 bg-white border-gray-100 dark:bg-dark-primary dark:border-gray-800">
            <div className="text-center mb-12">
              <h1 className="text-gray-800 font-bold dark:text-white text-3xl mb-2">
                Need help? Get in touch
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Send us a message and we&apos;ll get back to you as soon as we can.
              </p>
            </div>
            <form action="#" method="post">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="contact-firstName">First name</Label>
                  <Input
                    id="contact-firstName"
                    name="firstName"
                    type="text"
                    placeholder="Your first name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contact-lastName">Last name</Label>
                  <Input
                    id="contact-lastName"
                    name="lastName"
                    type="text"
                    placeholder="Your last name"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="contact-email">Email address</Label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="contact-message">Message</Label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    rows={6}
                    placeholder="How can we help?"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="bg-primary-500 hover:bg-primary-600 transition h-12 py-3 px-6 w-full font-medium text-white text-sm rounded-full"
                  >
                    Send message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <span className="absolute -bottom-32 left-1/2 -translate-x-1/2 z-0">
        <svg
          width="930"
          height="760"
          viewBox="0 0 930 760"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.3" filter="url(#filter0_f_9248_10254)">
            <circle cx="380.335" cy="380.335" r="179.665" fill="#FF58D5" />
          </g>
          <g opacity="0.7" filter="url(#filter1_f_9248_10254)">
            <circle cx="549.665" cy="380.335" r="179.665" fill="#4E6EFF" />
          </g>
          <defs>
            <filter
              id="filter0_f_9248_10254"
              x="0.669922"
              y="0.6698"
              width="759.33"
              height="759.33"
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
                result="effect1_foregroundBlur_9248_10254"
              />
            </filter>
            <filter
              id="filter1_f_9248_10254"
              x="170"
              y="0.6698"
              width="759.33"
              height="759.33"
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
                result="effect1_foregroundBlur_9248_10254"
              />
            </filter>
          </defs>
        </svg>
      </span>
    </section>
  );
}
