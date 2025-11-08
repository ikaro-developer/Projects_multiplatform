export type Transaction = {
  categoria: Category;
  valor: number;
  description: string;
  data: Date;
  comprovantes: string[];
};

// export interface Transaction {
//   id: string;
//   categoryId: string;
//   amount: number;
//   description: string;
//   date: string;
//   type: TransactionType;
//   createdAt: string;
//   isPaid?: boolean;
//   paidDate?: string;
//   proofs?: TransactionProof[];
//   comments?: TransactionComment[];
// }
export type Category = {
  id: string;
  title: string;
  type: "Despesa" | "Receita";
  recorrencia:
    | "fixed" // Fixo com valor fixo
    | "variable" // Variável
    | "fixed-variable"; // Fixo porém valor varia
  icon: string;
  color: string;

  transaction?: Transaction[];
};
