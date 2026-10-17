export function Footer() {
  return (
    <footer className="w-full border-t bg-gray-50 py-6 text-center text-sm text-gray-500">
      <div className="container mx-auto px-4">
        <p>© {new Date().getFullYear()} Sistema de Gestão de Currículos. Todos os direitos reservados.</p>
        <p className="mt-1 text-xs text-gray-400">Desenvolvido com Next.js, Tailwind CSS e Shadcn/UI</p>
      </div>
    </footer>
  )
}