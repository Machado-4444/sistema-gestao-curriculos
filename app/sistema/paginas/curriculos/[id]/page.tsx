'use client'

import { use } from 'react'
import Link from 'next/link'
import { Header } from '@/components/heather'
import { Footer } from '@/components/footer'
import { mockCurriculos } from '@/data/mockCurriculos'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Briefcase, GraduationCap, Mail, Phone, Calendar, UserCheck, FileQuestion } from 'lucide-react'

interface DetalhesPageProps {
  params: Promise<{ id: string }>
}

export default function DetalhesCurriculoPage({ params }: DetalhesPageProps) {
  const resolvedParams = use(params)
  const curriculo = mockCurriculos.find((c) => c.id === resolvedParams.id)

  if (!curriculo) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-16 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600 mb-4">
            <FileQuestion className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Currículo não encontrado</h2>
          <p className="text-slate-500 mb-6">O candidato que você está procurando não existe ou foi removido.</p>
          <Link href="/sistema/paginas/curriculos">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar para a listagem
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        {/* Botão de Voltar */}
        <div className="mb-6">
          <Link href="/sistema/paginas/curriculos">
            <Button variant="outline" className="gap-2 border-slate-200">
              <ArrowLeft className="h-4 w-4" />
              Voltar para Currículos
            </Button>
          </Link>
        </div>

        {/* Card Principal do Candidato */}
        <div className="bg-white rounded-2xl border shadow-sm p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
            <img
              src={curriculo.foto}
              alt={curriculo.nome}
              className="h-28 w-28 rounded-full object-cover border-4 border-blue-50 shadow-md"
            />
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{curriculo.nome}</h1>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold self-center md:self-auto">
                  <UserCheck className="h-3.5 w-3.5" />
                  Perfil Ativo
                </span>
              </div>

              <p className="text-lg font-medium text-blue-600 mb-4">{curriculo.cargoDesejado}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-slate-600 border-t pt-4">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <span>{curriculo.email}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Phone className="h-4 w-4 text-slate-400" />
                  <span>{curriculo.telefone}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <span>Nascimento: {curriculo.dataNascimento}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Resumo Profissional */}
          <div className="mt-8 border-t pt-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Resumo Profissional</h3>
            <p className="text-slate-600 leading-relaxed">{curriculo.resumoProfissional}</p>
          </div>
        </div>

        {/* Seção de Experiências Profissionais */}
        <div className="bg-white rounded-2xl border shadow-sm p-6 md:p-8 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Briefcase className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Experiência Profissional</h2>
          </div>

          {curriculo.experiencias && curriculo.experiencias.length > 0 ? (
            <div className="space-y-6">
              {curriculo.experiencias.map((exp, index) => (
                <div key={index} className="border-l-2 border-blue-200 pl-4 py-1 space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <h4 className="font-semibold text-slate-900 text-base">{exp.cargo}</h4>
                    <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full w-fit mt-1 sm:mt-0">
                      {exp.periodo}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-blue-600">{exp.empresa}</p>
                  <p className="text-sm text-slate-600 mt-2">{exp.descricao}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">Nenhuma experiência informada.</p>
          )}
        </div>

        {/* Seção de Formação Acadêmica */}
        <div className="bg-white rounded-2xl border shadow-sm p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <GraduationCap className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Formação Acadêmica</h2>
          </div>

          {curriculo.formacoes && curriculo.formacoes.length > 0 ? (
            <div className="space-y-6">
              {curriculo.formacoes.map((form, index) => (
                <div key={index} className="border-l-2 border-blue-200 pl-4 py-1 space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <h4 className="font-semibold text-slate-900 text-base">{form.curso}</h4>
                    <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full w-fit mt-1 sm:mt-0">
                      Conclusão: {form.conclusao}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-blue-600">{form.instituicao}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">Nenhuma formação informada.</p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}