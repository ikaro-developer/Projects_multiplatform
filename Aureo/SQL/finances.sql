--===========================================
-- Banco de Dados: Controle Financeiro 
--===========================================

--Criação dos ENUMs necessários
CREATE TYPE recurrence_type AS ENUM ('fixed', 'variable', 'fixed-variable');
CREATE TYPE category_type AS ENUM ('Despesa', 'Receita');

--================== TABELA DE REGRAS ==================
CREATE TABLE recurrence_rule (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tipo recurrence_type NOT NULL,
    valor_fixo DECIMAL(10,2),
    descricao_regra TEXT
);

--================== TABELA DE CATEGORIAS ==================
CREATE TABLE category (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recorrencia_id UUID REFERENCES recurrence_rule(id) ON DELETE SET NULL,
    name VARCHAR(100) NOT NULL,
    type category_type NOT NULL,
    color VARCHAR(20)
);

--================== TABELA DE TRANSAÇÕES ==================
CREATE TABLE transaction (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    categoria_id UUID REFERENCES category(id) ON DELETE CASCADE,
    valor DECIMAL(10,2) NOT NULL,
    description TEXT,
    data DATE NOT NULL,
    comprovantes TEXT
);
