export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Simplemente renderiza al hijo (tu página) sin agregarle nada extra
  // porque tu página ya se encarga de su propio diseño completo.
  return <>{children}</>;
}
