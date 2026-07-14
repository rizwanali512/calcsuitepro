/**
 * Minimal layout for standalone hosted app docs (no CalcSuite header/footer).
 */
export default function StandaloneLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
