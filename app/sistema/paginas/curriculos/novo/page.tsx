'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm, useFieldArray } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'sonner'
import Swal from 'sweetalert2'
import { Header } from '@/components/heather'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Plus, Trash2, Save, User, Briefcase, GraduationCap } from 'lucide-react'

// Esquema de validação rigorosa com Yup exigido no trabalho
const schema = yup.object({
  nome: yup.string().required('O nome completo é obrigatório').min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: yup.string().required('O e-mail é obrigatório').email('Digite um e-mail válido'),
  telefone: yup.string().required('O telefone é obrigatório'),
  cpf: yup.string().required('O CPF é obrigatório'),
  dataNascimento: yup.string().required('A data de nascimento é obrigatória'),
  cargoDesejado: yup.string().required('O cargo desejado é obrigatório').min(2, 'Informe o cargo desejado'),
  resumoProfissional: yup.string().required('O resumo profissional é obrigatório').min(10, 'O resumo deve ter pelo menos 10 caracteres'),
  foto: yup.string().required('A foto (upload fake) é obrigatória'),
  experiencias: yup.array().of(
    yup.object({
      empresa: yup.string().required('Empresa obrigatória'),
      cargo: yup.string().required('Cargo obrigatório'),
      periodo: yup.string().required('Período obrigatório'),
      descricao: yup.string().required('Descrição obrigatória'),
    })
  ),
  formacoes: yup.array().of(
    yup.object({
      instituicao: yup.string().required('Instituição obrigatória'),
      curso: yup.string().required('Curso obrigatório'),
      conclusao: yup.string().required('Ano de conclusão obrigatório'),
    })
  ),
}).required()

type FormData = yup.InferType<typeof schema>

export default function CadastrarCurriculoPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      experiencias: [{ empresa: '', cargo: '', periodo: '', descricao: '' }],
      formacoes: [{ instituicao: '', curso: '', conclusao: '' }],
    },
  })

  // Campos Dinâmicos (Field Arrays) exigidos pelo professor
  const {
    fields: expFields,
    append: appendExp,
    remove: removeExp,
  } = useFieldArray({
    control,
    name: 'experiencias',
  })

  const {
    fields: formFields,
    append: appendForm,
    remove: removeForm,
  } = useFieldArray({
    control,
    name: 'formacoes',
  })

  const onSubmit = (data: FormData) => {
    setIsSubmitting(true)

    // Simula salvamento
    setTimeout(() => {
      setIsSubmitting(false)
      
      toast.success('Currículo cadastrado com sucesso!')
      Swal.fire({
        title: 'Sucesso!',
        text: 'O currículo foi cadastrado e validado com sucesso.',
        icon: 'success',
        confirmButtonColor: '#2563eb',
      }).then(() => {
        router.push('/sistema/paginas/curriculos')
      })
    }, 1000)
  }

  const onError = (errors: any) => {
    const primeiroErro = Object.values(errors)[0] as any
    toast.error(primeiroErro?.message || 'Preencha todos os campos obrigatórios corretamente.')
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-6">
          <Link 
            href="/sistema/paginas/curriculos" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
        </div>

        <div className="bg-white rounded-2xl border shadow-sm p-6 md:p-8">
          <div className="mb-8 border-b pb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Cadastrar Novo Currículo</h1>
            <p className="text-slate-500 mt-1">Preencha os dados abaixo com validação instantânea e campos dinâmicos.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-8">
            {/* Dados Pessoais */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-blue-600 font-semibold border-b pb-2">
                <User className="h-5 w-5" />
                <h2>Dados Pessoais</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nome Completo *</label>
                  <Input {...register('nome')} placeholder="Ex: Maria Silva" />
                  {errors.nome && <span className="text-xs text-red-500 mt-1 block">{errors.nome.message}</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">E-mail *</label>
                  <Input {...register('email')} type="email" placeholder="exemplo@email.com" />
                  {errors.email && <span className="text-xs text-red-500 mt-1 block">{errors.email.message}</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Telefone *</label>
                  <Input {...register('telefone')} placeholder="(47) 99999-9999" />
                  {errors.telefone && <span className="text-xs text-red-500 mt-1 block">{errors.telefone.message}</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">CPF *</label>
                  <Input {...register('cpf')} placeholder="000.000.000-00" />
                  {errors.cpf && <span className="text-xs text-red-500 mt-1 block">{errors.cpf.message}</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Data de Nascimento *</label>
                  <Input {...register('dataNascimento')} placeholder="DD/MM/AAAA" />
                  {errors.dataNascimento && <span className="text-xs text-red-500 mt-1 block">{errors.dataNascimento.message}</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Cargo Desejado *</label>
                  <Input {...register('cargoDesejado')} placeholder="Ex: Desenvolvedor Frontend" />
                  {errors.cargoDesejado && <span className="text-xs text-red-500 mt-1 block">{errors.cargoDesejado.message}</span>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Resumo Profissional *</label>
                <textarea
                  {...register('resumoProfissional')}
                  rows={3}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  placeholder="Escreva um breve resumo sobre suas qualificações..."
                />
                {errors.resumoProfissional && <span className="text-xs text-red-500 mt-1 block">{errors.resumoProfissional.message}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">URL da Foto (Upload Fake) *</label>
                <Input {...register('foto')} placeholder="https://exemplo.com/foto.jpg" />
                {errors.foto && <span className="text-xs text-red-500 mt-1 block">{errors.foto.message}</span>}
              </div>
            </div>

            {/* Experiência Profissional (Field Arrays) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2 text-blue-600 font-semibold">
                  <Briefcase className="h-5 w-5" />
                  <h2>Experiência Profissional</h2>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendExp({ empresa: '', cargo: '', periodo: '', descricao: '' })}
                  className="gap-1 text-blue-600 border-blue-200 hover:bg-blue-50"
                >
                  <Plus className="h-4 w-4" /> Adicionar Experiência
                </Button>
              </div>

              {expFields.map((field, index) => (
                <div key={field.id} className="p-4 border rounded-xl bg-slate-50 relative space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium mb-1">Empresa</label>
                      <Input {...register(`experiencias.${index}.empresa` as const)} placeholder="Nome da empresa" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Cargo</label>
                      <Input {...register(`experiencias.${index}.cargo` as const)} placeholder="Seu cargo" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Período</label>
                      <Input {...register(`experiencias.${index}.periodo` as const)} placeholder="Ex: 2022 - Atual" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Descrição das Atividades</label>
                    <textarea
                      {...register(`experiencias.${index}.descricao` as const)}
                      rows={2}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                      placeholder="Descreva suas principais responsabilidades..."
                    />
                  </div>

                  {expFields.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeExp(index)}
                      className="absolute top-4 right-4 h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Formação Acadêmica (Field Arrays) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2 text-blue-600 font-semibold">
                  <GraduationCap className="h-5 w-5" />
                  <h2>Formação Acadêmica</h2>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendForm({ instituicao: '', curso: '', conclusao: '' })}
                  className="gap-1 text-blue-600 border-blue-200 hover:bg-blue-50"
                >
                  <Plus className="h-4 w-4" /> Adicionar Formação
                </Button>
              </div>

              {formFields.map((field, index) => (
                <div key={field.id} className="p-4 border rounded-xl bg-slate-50 relative space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="md:col-span-1">
                      <label className="block text-xs font-medium mb-1">Instituição</label>
                      <Input {...register(`formacoes.${index}.instituicao` as const)} placeholder="Nome da faculdade/escola" />
                    </div>
                    <div className="md:col-span-1">
                      <label className="block text-xs font-medium mb-1">Curso</label>
                      <Input {...register(`formacoes.${index}.curso` as const)} placeholder="Nome do curso" />
                    </div>
                    <div className="md:col-span-1">
                      <label className="block text-xs font-medium mb-1">Conclusão</label>
                      <Input {...register(`formacoes.${index}.conclusao` as const)} placeholder="Ano" />
                    </div>
                  </div>

                  {formFields.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeForm(index)}
                      className="absolute top-4 right-4 h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Botão de Envio */}
            <Button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2 py-6 text-base">
              <Save className="h-5 w-5" />
              {isSubmitting ? 'Salvando currículo...' : 'Salvar Currículo'}
            </Button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}