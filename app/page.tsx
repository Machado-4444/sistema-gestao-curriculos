import Link from 'next/link'
import { Header } from '../components/heather'
import { Footer } from '../components/footer'
import { Button } from '../components/ui/button'
import { FileText, Users, UserPlus, ShieldCheck, Zap, Sparkles } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-b from-blue-50/50 to-slate-50">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              <span>Sistema Profissional de Gestão de Currículos</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
              Gerencie talentos e currículos com <span className="text-blue-600">agilidade e eficiência</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
              Plataforma desenvolvida para otimizar processos de recrutamento, com validação rigorosa, formulários dinâmicos e experiência moderna em Next.js.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/sistema/paginas/curriculos">
                <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white gap-2">
                  <Users className="h-5 w-5" />
                  Ver Currículos Cadastrados
                </Button>
              </Link>

              <Link href="/sistema/paginas/curriculos/novo">
                <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 border-slate-300">
                  <UserPlus className="h-5 w-5" />
                  Cadastrar Novo Currículo
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col items-start">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg mb-4">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Campos Dinâmicos</h3>
              <p className="text-slate-600">
                Adicione e remova experiências profissionais e formações acadêmicas de forma fluida com validação instantânea pelo Yup.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col items-start">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg mb-4">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Validação Rigorosa</h3>
              <p className="text-slate-600">
                Garantia de dados consistentes através de máscaras de entrada automatizadas (CPF, telefones e datas) e feedback via Sonner.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col items-start">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Busca em Tempo Real</h3>
              <p className="text-slate-600">
                Filtre listagens instantaneamente por nome ou cargo desejado com excelente desempenho de navegação.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}