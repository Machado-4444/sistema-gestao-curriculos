export interface Experiencia {
  id?: string
  empresa: string
  cargo: string
  periodo: string
  descricao: string
}

export interface Formacao {
  id?: string
  instituicao: string
  curso: string
  conclusao: string
}

export interface Curriculo {
  id: string
  nome: string
  email: string
  telefone: string
  cpf: string
  dataNascimento: string
  cargoDesejado: string
  resumoProfissional: string
  foto: string
  experiencias: Experiencia[]
  formacoes: Formacao[]
}