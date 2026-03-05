# 🔒 Dados Críticos - NÃO ALTERAR

> **ATENÇÃO:** Este ficheiro documenta todos os dados de negócio que **DEVEM ser preservados** durante qualquer reestruturação do website. Qualquer alteração a estes valores requer aprovação explícita.

---

## 💰 Tabela de Preços

### 🌳 Presencial

| Modalidade | Avulso | 1x/Semana | 2x/Semana | 3x/Semana |
|------------|--------|-----------|-----------|-----------|
| **Grupo** | €15,00 | €30,00 | €45,00 | ~~€60,00~~ **€54,00** (-10%) |
| **PT Individual** | €35,00 | €75,00 | €130,00 | €180,00 |
| **Dupla** (-20%) | €28,00 | €60,00 | €104,00 | €144,00 |

### 💻 Online (20% OFF vs Presencial)

| Modalidade | Avulso | 1x/Semana | 2x/Semana | 3x/Semana |
|------------|--------|-----------|-----------|-----------|
| **Grupo** | €12,00 | €24,00 | €36,00 | €48,00 |
| **PT Individual** | €28,00 | €60,00 | €104,00 | €144,00 |
| **Dupla** (-20%) | €22,00 | €48,00 | €83,00 | €115,00 |

### ⚡ Oferta Fundadora
**10% desconto vitalício** para a Turma Fundadora:
- Limitado às primeiras **8 pessoas**
- Apenas para **Grupo Presencial 3x/semana**
- Preço: ~~€60,00~~ → **€54,00**/mês

---

## 📅 Horários

### Horário Principal
- **6:15 - 7:15** • 60 minutos

📍 **Localização:** Parque da Cidade - Porto  
🌍 **GPS:** 41.1627, -8.6577

---

## 🎁 Desconto Referência de Amigo

### Benefício
**25% + 25%** - Ambos ganham!

### Como Funciona
1. **Quem indica:** Recebe 25% desconto automaticamente quando o amigo se inscrever
2. **Novo membro:** Paga com 25% desconto no primeiro mês
3. **Duração:** Desconto aplicado no primeiro mês para ambos

### Condições
- ✅ Novo membro deve mencionar quem o indicou
- ✅ Válido para todas as modalidades (Grupo, PT Individual, Dupla)
- ✅ Válido para Presencial e Online
- ✅ 25% desconto aplicado automaticamente
- ✅ Sem limite de indicações

### Exemplo (Grupo Presencial 3x/semana)
- **Preço normal:** €54,00/mês
- **Com desconto 25%:** €40,50/mês no primeiro mês
- **Tu indicaste:** €40,50/mês no mês seguinte
- **Amigo indicado:** €40,50/mês no primeiro mês

---

## 🔐 Notas de Implementação

### Para Desenvolvedores
Ao migrar páginas para a nova estrutura:

1. **NÃO alterar** valores de preços
2. **NÃO alterar** horários
3. **NÃO alterar** condições de desconto referência
4. **NÃO alterar** percentagens de desconto (10%, 20%, 25%)
5. **NÃO alterar** limites (8 pessoas Turma Fundadora)

### Ficheiros com Dados Críticos
- `tabela-precos.html` - Tabela completa de preços
- `horarios.html` - Horários e localização
- `comunidade/desconto-referencia.html` - Condições de referência

### Permitido
- ✅ Melhorar design/layout
- ✅ Adicionar ícones (mantendo números)
- ✅ Reorganizar estrutura HTML
- ✅ Consolidar CSS
- ✅ Melhorar acessibilidade
- ✅ Otimizar performance

### Proibido
- ❌ Mudar valores monetários
- ❌ Mudar percentagens de desconto
- ❌ Mudar condições de programas
- ❌ Mudar horários
- ❌ Remover informação de preços

---

## 📊 Valores de Referência Rápidos

```
PRESENCIAL - Grupo 3x/sem:     €54,00/mês (Fundadora)
PRESENCIAL - PT Individual:     €35-€180/mês
ONLINE - Grupo:                 €12-€48/mês
DESCONTO DUPLA:                 -20%
DESCONTO FUNDADORA:             -10% vitalício
DESCONTO REFERÊNCIA:            -25% (1º mês, ambos)
HORÁRIO:                        6:15-7:15 (60min)
```

---

**Última atualização:** 2024  
**Responsável:** Isaac Treinos Ar Livre  
**Status:** 🔒 DADOS CRÍTICOS - NÃO ALTERAR SEM APROVAÇÃO
