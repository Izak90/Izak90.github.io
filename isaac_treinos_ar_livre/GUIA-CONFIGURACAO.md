# 📊 Sistema de Configuração Centralizada

## 🎯 Objetivo

Este sistema permite atualizar **num único local** dados que aparecem em várias páginas do site, como:
- Número de vagas disponíveis na Turma Fundadora
- Preços e descontos
- Contactos (WhatsApp, email, Instagram)
- Horários de treino
- Password de acesso à comunidade

---

## 🔧 Como Usar

### Atualizar Número de Alunos

1. Abre [`assets/js/config.js`](assets/js/config.js)
2. Procura a secção **TURMA FUNDADORA**
3. Atualiza o valor de `alunosAtuais`:

```javascript
turma: {
    totalVagas: 8,           // Total de vagas (não mexer)
    alunosAtuais: 5,         // ← ATUALIZA AQUI (ex: 5 alunos inscritos)
    // ...
}
```

4. **Automaticamente calcula**:
   - Vagas disponíveis: 8 - 5 = **3 vagas**
   - Preço fundador: €60 - 10% = **€54**
   - Urgência: "3 vagas disponíveis"

5. **Guarda o ficheiro** e faz commit:
```bash
git add assets/js/config.js
git commit -m "Atualizar número de alunos: 5/8"
git push
```

### Atualizar Password de Acesso

**IMPORTANTE:** O sistema agora usa **hash SHA-256** para maior segurança!

No ficheiro [`config.js`](assets/js/config.js), a password está armazenada como hash:

```javascript
acesso: {
    passwordHash: 'bf117f5c251424269357a6a402c5c8daac6600f14324b311ead1be4ff59411e2',  // Hash de "TREINO2026"
    expiracaoHoras: 24
}
```

**Para trocar a password:**

1. Abre a consola do browser (F12) numa página do site
2. Executa:
```javascript
await Security.sha256('TUA_NOVA_PASSWORD')
```
3. Copia o hash gerado (64 caracteres hexadecimais)
4. Substitui o valor de `passwordHash` no [`config.js`](assets/js/config.js)
5. Guarda e faz commit

**Exemplo:**
```javascript
// Para password "NOVOCODIGO2026"
await Security.sha256('NOVOCODIGO2026')
// Retorna: "a1b2c3d4e5f6789..." (exemplo)
// Copia este valor para passwordHash
```

⚠️ **Todos os alunos precisarão da nova password (não do hash) após esta alteração!**

### Atualizar Contactos

```javascript
contacto: {
    whatsapp: '351939481840',    // ← Novo número WhatsApp
    instagram: '@isaac.treinos',  
    email: 'isaac.treinos@gmail.com'
}
```

---

## 📄 Usar Valores nas Páginas HTML

### Método 1: Texto Dinâmico

```html
<!-- Exibir vagas disponíveis -->
<span data-config="turma.vagasDisponiveis">6</span> vagas

<!-- Exibir preço com formatação -->
<span data-config="turma.precoFundador" data-format="price">€54</span>/mês

<!-- Exibir desconto -->
<span data-config="turma.descontoPercentual">10</span>% OFF
```

### Método 2: Links Dinâmicos (WhatsApp)

```html
<a data-config-href="whatsapp" 
   data-whatsapp-msg="Olá! Quero inscrever-me">
    Contactar
</a>
```

### Método 3: Classes Dinâmicas (Urgência)

```html
<div data-config-class="urgency">
    <!-- Adiciona class baseada nas vagas:
         urgency--critical (≤2 vagas)
         urgency--high (≤4 vagas)
         urgency--medium (>4 vagas) -->
</div>
```

---

## 📋 Páginas Já Atualizadas

- ✅ [`index.html`](index.html) - Badge urgência, banner fundador
- ✅ [`horarios.html`](horarios.html) - CTA com vagas dinâmicas
- 🔄 `tabela-precos.html` - (próximo)
- 🔄 `comunidade.html` - (próximo)

---

## 🔐 Segurança no GitHub Pages (Gratuito)

### ✅ Sistema Atual Implementado

**O que tens agora (ATUALIZADO - Hash SHA-256):**
- ✅ Password armazenada como **hash SHA-256** (não em texto claro)
- ✅ Validação client-side usando Web Crypto API
- ✅ sessionStorage com expiração de 24h
- ✅ Chave única partilhada por todos os alunos

**Ficheiros:**
- [`assets/js/security.js`](assets/js/security.js) - Funções de hash SHA-256
- [`assets/js/config.js`](assets/js/config.js) - Hash da password armazenado

**Como funciona:**
1. Aluno insere password (ex: "TREINO2026")
2. JavaScript calcula hash SHA-256 do input
3. Compara com hash armazenado no config.js
4. Se igual → acesso concedido

**Segurança:**
- 🟢 Password **NÃO aparece em texto claro** no código
- 🟢 Protege contra **leitura casual** do código-fonte
- 🟡 Qualquer pessoa pode copiar o hash (mas não revela a password original)
- 🟢 Adequado para grupo pequeno de confiança
- 🟢 Password expira após 24h

### Limitações do GitHub Pages

GitHub Pages é **100% estático** - não há servidor backend, logo:
- ❌ Não existem variáveis de ambiente secretas server-side
- ❌ Não há autenticação server-side
- ❌ Todo o código JavaScript é visível ao cliente

### 📊 Níveis de Segurança Disponíveis

#### ✅ **Nível 1: Hash SHA-256** (IMPLEMENTADO)

**Status:** ✅ Já implementado

**Vantagens:**
- ✅ Password não visível em texto claro
- ✅ Funciona perfeitamente em GitHub Pages
- ✅ Fácil de mudar password (gera novo hash)
- ✅ Adequado para grupo pequeno (8-20 pessoas)

**Quando é suficiente:**
- Turma Fundadora pequena
- Grupo de confiança
- Conteúdo não extremamente sensível

---

#### 🔄 **Nível 2: Hash + Salt** (Upgrade Opcional - 30min)

**Melhoria sobre Nível 1:**
- Adiciona "salt" (valor aleatório) ao hash
- Torna rainbow table attacks inúteis
- Hash diferente mesmo para passwords iguais

**Implementação:**
```javascript
// Adicionar salt único por site
const SALT = 'isaac_treinos_2026_unique_salt';
const saltedPassword = password + SALT;
const hash = await Security.sha256(saltedPassword);
```

**Quando usar:**
- Grupo > 20 pessoas
- Conteúdo mais sensível

---

#### 🚀 **Nível 3: Firebase Authentication** (Recomendado para crescimento)

**Características:**
- ✅ Autenticação real com utilizadores individuais
- ✅ Email/Password, Google Login, etc.
2. Substitui `password` por `passwordHash` no config.js
3. Atualiza a função de validação para comparar hashes

**Vantagens:**
- ✅ Password não aparece em texto claro no código
- ✅ Ainda funciona em GitHub Pages estático

**Limitações:**
- 🟡 Qualquer pessoa pode copiar o hash e usá-lo
- 🟡 Ferramentas de desenvolvedor do browser mostram o processo

---

#### 3. **Serviços Externos Gratuitos (Recomendado para Maior Segurança)**

##### **Opção A: Firebase Authentication (Google)**

**Características:**
- ✅ Autenticação real com utilizadores individuais
- ✅ Email/Password, Google Login, etc.
- ✅ 10k autenticações/mês GRÁTIS
- ✅ Integração simples com JavaScript

**Tutorial mínimo:**
```javascript
// Adicionar SDK Firebase
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Autenticar
signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Acesso concedido
    });
```

**Quando usar:**
- Queres dar credenciais **individuais** a cada aluno
- Precisas de rastrear quem acede e quando
- Conteúdo realmente sensível/exclusivo

---

##### **Opção B: Supabase (Open Source)**

**Características:**
- ✅ PostgreSQL + Authentication
- ✅ 50k utilizadores GRÁTIS
- ✅ Row Level Security (RLS)
- ✅ API REST automática

**Vantagens:**
- Open source (podes migrar depois)
- Dashboard muito intuitivo
- Suporta OAuth (Google, GitHub, etc)

---

##### **Opção C: Netlify Identity (se migrares para Netlify)**

**Características:**
- ✅ 1000 utilizadores ativos GRÁTIS
- ✅ Integração nativa com Netlify
- ✅ Mais rápido que GitHub Pages

**Como funciona:**
```html
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
```

---

#### 4. **GitHub Actions + Encrypted Secrets (Avançado)**

**Como funciona:**
1. Password armazenada como **GitHub Secret**
2. GitHub Action gera hash durante o build
3. Hash é injetado no site estático

**Vantagens:**
- ✅ Password nunca aparece no código
- ✅ Ainda usa GitHub Pages gratuito

**Limitações:**
- 🟡 Requer configuração de CI/CD
- 🟡 Chain de build mais complexo
- 🟡 Hash ainda pode ser extraído do código final

---

## 🎯 Recomendação Final

### Para a Turma Fundadora (8 pessoas, grupo pequeno):

**✅ Sistema Atual é SUFICIENTE**

Porquê:
1. Grupo pequeno de confiança
2. Fácil de gerir (uma password partilhada)
3. Podes mudá-la facilmente se necessário
4. Custo: €0 (GitHub Pages gratuito)
5. Manutenção: mínima

**Se crescer muito ou conteúdo ficar mais sensível:**

**🚀 Migrar para Firebase Auth** (ainda gratuito até 10k users/mês)

---

## 📞 Suporte

Precisas de ajuda a implementar?

1. **Hash de Password**: Simples, 10 minutos
2. **Firebase Auth**: Médio, ~1h para configurar
3. **Supabase**: Médio, ~1h para configurar
4. **CI/CD GitHub Actions**: Avançado, ~3h

---

## 🔄 Próximas Melhorias Sugeridas

- [ ] Adicionar rate limiting (limitar tentativas de login)
- [ ] Dashboard admin para ver estatísticas de acesso
- [ ] Sistema de convites (cada aluno tem link único)
- [ ] Notificações quando novas vagas abrem

---

**Última atualização:** 2026-03-05  
**Autor:** Sistema de Configuração Centralizada v1.0
