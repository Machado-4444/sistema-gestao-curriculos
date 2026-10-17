'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FileText, Home, Users, UserPlus } from 'lucide-react'

export function Header() {
  const pathname = usePathname()

  const navLinks = [
    { name: 'Início', href: '/', icon: Home },
    { name: 'Currículos', href: '/sistema/paginas/curriculos', icon: Users },
    { name: 'Cadastrar', href: '/sistema/paginas/curriculos/novo', icon: UserPlus },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo / Título */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-600">
          <FileText className="h-6 w-6" />
          <span>GestãoCurrículos</span>
        </Link>

        {/* Navegação */}
        <nav className="flex items-center gap-1 md:gap-6">
          {navLinks.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden md:inline">{link.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}