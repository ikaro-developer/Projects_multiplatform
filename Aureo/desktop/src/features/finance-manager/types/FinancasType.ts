// ===================== REGRAS =====================
export interface RecurrenceRule {
  id: string;
  tipo: "fixed" | "variable" | "fixed-variable";
  valor_fixo?: number | null;
  descricao_regra?: string | null;
}

// ===================== CATEGORIAS =====================
export interface Category {
  id: string;
  recorrencia_id: string;
  name: string;
  type: "Despesa" | "Receita";
  color: string;
}

// ===================== TRANSAÇÕES =====================
export interface Transaction {
  id: string;
  categoria_id: string;
  valor: number;
  description: string;
  data: string;
  comprovantes: string;
}
