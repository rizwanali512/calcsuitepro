import Footer from '@/components/layout/footer';
import GlobalBreadcrumbs from '@/components/GlobalBreadcrumbs';
import Header from '@/components/layout/header/header';
import CommandMenu from '@/components/CommandMenu';
import PageTransition from '@/components/PageTransition';

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="dark:bg-[#101828] flex flex-col flex-1">
      <Header />
      <CommandMenu />
      <GlobalBreadcrumbs />
      <div className="isolate flex-1 flex flex-col">
        <PageTransition>{children}</PageTransition>
      </div>
      <Footer />
    </div>
  );
}
