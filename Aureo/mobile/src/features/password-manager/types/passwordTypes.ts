export interface Password {
  id: string;
  name: string;
  username: string;
  password: string;
  url: string;
  created_at: string;
  updated_at: string;
  strength: "weak" | "medium" | "strong" | "very-strong";
}

export type PasswordFormData = {
  name: string;
  url?: string;
  username: string;
  password: string;
  strength: "weak" | "medium" | "strong" | "very-strong";
};

export interface GeneratorSettings {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
}
