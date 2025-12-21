export interface Password {
  id: string;
  name: string;
  username: string;
  password: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  lastUsed?: Date;
  strength: "weak" | "medium" | "strong" | "very-strong";
}

export interface GeneratorSettings {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
}
