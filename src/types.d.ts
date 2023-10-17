
interface PayloadJwt {
  email: string;
  id: string;
  cargo: string;
  nome: string;
}

type RelatorioData= {
  dataInicial: string;
  dataFinal: string
  hora: string;
  filtroSel: string;
  filtro: 'Ascendente'|'Descendente';
  nome: boolean;
  sobrenome: boolean;
  idade: boolean;
  procedimento: boolean;
  horario: boolean;
  valor: boolean;
  telefone: boolean;
}

interface PacienteQueryParam {
  date: string;
}