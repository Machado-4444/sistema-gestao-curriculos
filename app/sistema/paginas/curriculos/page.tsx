'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { Header } from '@/components/heather'
import { Footer } from '@/components/footer'
import { mockCurriculos } from '@/data/mockCurriculos'
import { Curriculo } from '@/types/curriculo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Search, UserPlus, Briefcase, Mail, Phone, ArrowRight, FileQuestion } from 'lucide-react'

export default function ListaCurriculosPage() {
  const [busca, setBusca] = useState('')
  const [curriculos] = useState<Curriculo[]>(mockCurriculos)
  const [isLoading, startTransition] = useTransition()

  // Filtro em tempo real por Nome ou Cargo Desejado
  const curriculosFiltrados = curriculos.filter((c) => {
    const termo = busca.toLowerCase()
    return (
      c.nome.toLowerCase().includes(termo) ||
      c.cargoDesejado.toLowerCase().includes(termo)
    )
  })

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value
    startTransition(() => {
      setBusca(valor)
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Currículos Cadastrados</h1>
            <p className="text-slate-500 mt-1">Gerencie e visualize os profissionais disponíveis na plataforma.</p>
          </div>

          <Link href="/sistema/paginas/curriculos/novo">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
              <UserPlus className="h-4 w-4" />
              Novo Currículo
            </Button>
          </Link>
        </div>

        {/* Barra de Busca */}
        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Buscar por nome ou cargo..."
            value={busca}
            onChange={handleSearchChange}
            className="pl-10 bg-white"
          />
        </div>

        {/* Estado de Carregamento (Skeleton) */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white p-6 rounded-xl border space-y-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        ) : curriculosFiltrados.length > 0 ? (
          /* Grid de Cards de Currículos */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {curriculosFiltrados.map((curriculo) => (
              <div key={curriculo.id} className="bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={curriculo.foto}
                      alt={curriculo.nome}
                      className="h-14 w-14 rounded-full object-cover border-2 border-blue-100"
                    />
                    <div>
                      <h3 className="font-semibold text-lg text-slate-900">{curriculo.nome}</h3>
                      <p className="text-sm font-medium text-blue-600 flex items-center gap-1 mt-0.5">
                        <Briefcase className="h-3.5 w-3.5" />
                        {curriculo.cargoDesejado}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 line-clamp-3 mb-6">
                    {curriculo.resumoProfissional}
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-500 mb-6 border-t pt-4">
                    <div className="flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 text-slate-400" />
                      <span>{curriculo.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 text-slate-400" />
                      <span>{curriculo.telefone}</span>
                    </div>
                  </div>
                </div>

                <Link href={`/sistema/paginas/curriculos/${curriculo.id}`} className="w-full">
                  <Button variant="outline" className="w-full gap-2 border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200">
                    Ver Currículo Completo
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State (Caso não encontre ou esteja vazio) */
          <div className="text-center py-16 bg-white rounded-xl border border-dashed p-8">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 mb-4">
              <FileQuestion className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">Nenhum currículo encontrado</h3>
            <p className="text-sm text-slate-500 mb-6 max-w-sm mx-auto">
              Não encontramos nenhum currículo correspondente à sua busca ou a base está vazia no momento.
            </p>
            <Link href="/sistema/paginas/curriculos/novo">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                <UserPlus className="h-4 w-4" />
                Criar meu primeiro currículo
              </Button>
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}