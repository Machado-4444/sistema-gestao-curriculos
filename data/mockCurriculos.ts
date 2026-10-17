import { Curriculo } from '@/types/curriculo'

export const mockCurriculos: Curriculo[] = [
  {
    id: '1',
    nome: 'Ana Clara Souza',
    email: 'ana.souza@email.com',
    telefone: '(47) 99123-4567',
    cpf: '123.456.789-00',
    dataNascimento: '15/05/1998',
    cargoDesejado: 'Desenvolvedora Frontend React',
    resumoProfissional: 'Desenvolvedora Frontend com experiência em Next.js, Tailwind CSS e TypeScript, focada em criar interfaces responsivas e de alta performance.',
    foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
    experiencias: [
      {
        empresa: 'Tech Solutions Ltda',
        cargo: 'Desenvolvedora Frontend Jr',
        periodo: '2023 - Atualmente',
        descricao: 'Desenvolvimento de aplicações web utilizando React, Next.js e Tailwind CSS.'
      }
    ],
    formacoes: [
      {
        instituicao: 'Universidade Federal',
        curso: 'Ciência da Computação',
        conclusao: '2022'
      }
    ]
  },
  {
    id: '2',
    nome: 'Carlos Eduardo Lima',
    email: 'carlos.lima@email.com',
    telefone: '(47) 98888-1234',
    cpf: '987.654.321-11',
    dataNascimento: '20/10/1995',
    cargoDesejado: 'Engenheiro de Software Fullstack',
    resumoProfissional: 'Engenheiro de Software com sólida experiência em arquitetura de sistemas web, APIs RESTful e integração com bancos de dados relacionais e não relacionais.',
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    experiencias: [
      {
        empresa: 'Inovação Digital S.A.',
        cargo: 'Desenvolvedor Fullstack Pleno',
        periodo: '2021 - 2024',
        descricao: 'Criação de microsserviços e manutenção de portais corporativos.'
      }
    ],
    formacoes: [
      {
        instituicao: 'Centro Universitário',
        curso: 'Análise e Desenvolvimento de Sistemas',
        conclusao: '2020'
      }
    ]
  }
]