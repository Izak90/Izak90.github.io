# P3 — Auditoria de entrada: PEDEx e CF

Data: 2026-10-07. Fontes recuperadas das pastas públicas já registadas em `data/ucs.json`. PDFs originais e texto extraído ficaram na pasta temporária `academy-p3-sources`; não são distribuídos pela PWA. Os hashes abaixo permitem identificar as versões examinadas.

## Estado posterior de PEDEx e CF

A revisão solicitada com os ficheiros originais foi concluída em 2026-10-07: resumo detalhado, três bancos e matriz dos 71 subtópicos. O estado anterior de PEDEx abaixo é histórico; evidência atual em [PEDEX_COVERAGE.md](PEDEX_COVERAGE.md). CF também foi revisto: resumo, três bancos e matriz dos 20 itens finais da Lista em [CF_COVERAGE.md](CF_COVERAGE.md). Os achados e estados abaixo são históricos, relativos à auditoria de entrada.

## Resultado e limite

Os motores `assets/training.js` e `assets/simulator.js` já aceitam os três bancos por UC através de `data-bank-file`, `data-bank-file-medium` e `data-bank-file-hard`. Não há necessidade de duplicar motores. Na entrada desta auditoria, PEDEx e CF tinham apenas Fácil; o estado atual tem três dificuldades em ambas.

A comparação de âmbito e da matriz existente encontrou lacunas que impedem validar as declarações de 100%. Esta é uma auditoria de entrada, não uma certificação integral de todas as respostas ou de cada diapositivo visual. A extração textual não substitui a inspeção das figuras. A matriz abaixo identifica os candidatos existentes para revisão individual; não transforma uma correspondência temática em cobertura explícita.

## Fontes identificadas

| UC | Documento | PDF original | SHA-256 |
|---|---|---|---|
| CF | Aula 1 | [Abrir](https://drive.google.com/file/d/1iEix2YBgkSFYnRm2nYNGRibCP8qjok4b/view) | `f6e978cf0614a13fb08f123ba8986072520e27e29219c86d7556d72855ab49c4` |
| CF | Aula 2 | [Abrir](https://drive.google.com/file/d/12n3kqWzNpWOsnzWZOsySZ-E0iCbdHsrg/view) | `081b65c850c0a9c9ffa230b8ecd6e3d3176bf950194b9dce5d68b6e8b1335bc5` |
| CF | Aula 3 | [Abrir](https://drive.google.com/file/d/1hQwO-I0f1cbGkW2wI4ur3g4Kjvm6kWyt/view) | `1a36b30dc4caca88bd1fc5f445bf20db3439a1109c37c98bc0c14176277c529a` |
| CF | Aula 4 | [Abrir](https://drive.google.com/file/d/1sjRVFRJwFXd0KeyxmWRGLYoS5c0cXdZu/view) | `bbf170274a650eaaca82fc124f16cda8cde5233d80d4434e70b05f58608abfc5` |
| CF | Lista de Saberes | [Abrir](https://drive.google.com/file/d/1YU2rtoZHkCHDpsNs_aqlCXsE73kATeQh/view) | `ff6347d3a40cf2af62f22e3135775a008aa474217c684028b4d8ca84eed96287` |
| PEDEX | Aula 1 | [Abrir](https://drive.google.com/file/d/1n04CBLKsLNRc6JXnH3xk8VmQZCjnqmwp/view) | `de2ec5ca5512f902d5baf22ae1298330bd256afaeb669b9399d2a2a77f082749` |
| PEDEX | Aula 2 | [Abrir](https://drive.google.com/file/d/1a4SAmRWNhAlBM9IWYr-2G-iPR2fVAWPc/view) | `dc11d04fc135e614a0c3792861b1177ea3a47e92cdb4d4d5f30f808f781748a0` |
| PEDEX | Aula 3 | [Abrir](https://drive.google.com/file/d/1_Yuu2zW-ETjVn_Ux6ZSe_iQhq0MeVuYp/view) | `43b9698b6c648656abddb5954736c81690ad494225ba581f4eddf3dbee5e647a` |
| PEDEX | Aula 4 | [Abrir](https://drive.google.com/file/d/1W0MrQKSWMpgauuegz2pvhpA4F0ObM1A_/view) | `3ee08672fe616f11aa5627d4d3b6cf928bccdd0f76c076b4aee05acd88c8799b` |
| PEDEX | Lista de Saberes | [Abrir](https://drive.google.com/file/d/1gEmv5-IlO-YQRmScEgO1QBRjX95QCbjv/view) | `c55b3629577d4d4ae86ccded8f5a5bf437300d6656cb4d48dcd004938adb8236` |

Os slides CF identificam Lara Cunha; os slides PEDEx identificam Ricardo Arnaut. O registo da turma identifica Ricardo Costa e Miguel Leitão, respetivamente. Autor/responsável do material e formador da turma são papéis diferentes: não se alterou a metadata da turma com base nas capas dos PDFs.

## Achados da auditoria inicial

- CF036 e CF040 perguntam pela mesma variação individual das seis necessidades, com a mesma resposta conceptual (Aula 2, p. 16). Os enunciados diferentes escapam à deteção de duplicação textual do P1.
- CF061 e CF062 avaliam a mesma sequência de ativação de energia (Aula 3, p. 37). Podem libertar um lugar para aplicação prática sem reduzir o banco de 80 perguntas.
- CF: a Lista pede reconhecer e implementar técnicas de rapport. CF044–054 privilegiam definições, reconhecimento e distinção; esse conjunto não demonstra por si só a implementação em situações concretas. O resumo localiza a teoria em s7/s8; a componente de aplicação precisa de revisão explícita (Aula 3, pp. 5–11 e 20–22).
- PEDEx: «Elementos do processo de comunicação» aponta só para PEDEX056, que pergunta apenas pelo emissor. Recetor, mensagem, código, canal e contexto estão no resumo s7 e na Aula 3, p. 8, mas essa pergunta não os avalia. PEDEX057/058 acrescentam ruído/feedback, não os restantes elementos.
- PEDEx: «Dimensões do feedback pedagógico» aponta para PEDEX073, que apenas pede reconhecer Objetivo. «Tipos» aponta para PEDEX074, apenas prescritivo. A Aula 3, pp. 28–30, distingue quatro dimensões e os objetivos avaliativo, prescritivo, descritivo e interrogativo. A matriz deve avaliar explicitamente as componentes, em vez de contar todo o saber com uma ocorrência.
- PEDEx agrega «Técnicas de Comunicação Não Verbal» em «Comunicação». São 11 blocos na Lista original e 10 na matriz legada; os sete subtópicos existem, mas a estrutura documental deve distinguir o agrupamento dos slides da estrutura da Lista.
- PEDEx Aula 4, pp. 6–8, aborda spotting. Este assunto não consta como saber autónomo na Lista recuperada nem no resumo/banco atual. Não o acrescentar ao âmbito de exame sem distinguir conteúdo de aula e âmbito da Lista.
- Valores de PEDEx sobre regra 80/20 e durações dos ciclos coincidem com Aula 1, pp. 10 e 16. Não substituir por valores genéricos de outras fontes.

## Decisão de implementação

Médio tem utilidade potencial em distinção de conceitos e interpretação de situações; Difícil pode acrescentar decisões com uma única melhor resposta. Ainda não se demonstrou uma cobertura explícita suficiente para publicar quatro novos bancos de 80 perguntas. O passo seguro é reparar/auditar a base primeiro, preservando IDs e os dois exames; depois produzir os novos bancos com referências por página e revisão dos distratores. Não se publicaram seletores ou links para bancos inexistentes.

Critérios de saída: cada bullet/sub-bullet original com localização no resumo e perguntas explícitas; resolver as lacunas e duplicações acima; verificar as figuras relevantes; revisão individual das chaves; só então autoria dos novos bancos, registo, páginas e precache com nova versão. P3 permanece em curso.

## Matriz de rastreabilidade existente

IDs abaixo são referências de partida, preservadas dos JSON. «A rever» significa que a correspondência ainda não constitui prova de cobertura integral. «Corrigida nesta revisão» identifica as três lacunas de PEDEx reparadas nos itens indicados; os restantes candidatos continuam a exigir revisão integral.

### CF

| Saber na matriz existente | Resumo | Perguntas candidatas | Estado |
|---|---|---|---|
| Definição de Coaching | [cf_resumo.html#s1](../centro_estudo/cf_resumo.html#s1) | CF001, CF005, CF007 | A rever |
| Papéis do Coach | [cf_resumo.html#s2](../centro_estudo/cf_resumo.html#s2) | CF009, CF010, CF011, CF012, CF013 | A rever |
| Pressupostos do Coaching | [cf_resumo.html#s3](../centro_estudo/cf_resumo.html#s3) | CF015, CF016, CF017, CF018, CF019, CF020, CF021 | A rever |
| Crenças | [cf_resumo.html#s4](../centro_estudo/cf_resumo.html#s4) | CF022, CF023, CF024, CF025, CF026, CF027 | A rever |
| Inteligência emocional | [cf_resumo.html#s5](../centro_estudo/cf_resumo.html#s5) | CF028, CF029, CF030, CF031, CF032, CF033, CF034 | A rever |
| 6 necessidades humanas — Tony Robbins | [cf_resumo.html#s6](../centro_estudo/cf_resumo.html#s6) | CF035, CF036, CF037, CF038, CF039, CF040 | A rever |
| Definição de Rapport | [cf_resumo.html#s7](../centro_estudo/cf_resumo.html#s7) | CF041 | A rever |
| Importância do Rapport e ausência de Rapport | [cf_resumo.html#s7](../centro_estudo/cf_resumo.html#s7) | CF042, CF043 | A rever |
| Escuta ativa | [cf_resumo.html#s7](../centro_estudo/cf_resumo.html#s7) | CF044, CF045, CF046, CF047 | A rever |
| Comunicação verbal — definição e Backtracking | [cf_resumo.html#s8](../centro_estudo/cf_resumo.html#s8) | CF048, CF050, CF051 | A rever |
| Comunicação não verbal — definição e linguagem corporal | [cf_resumo.html#s8](../centro_estudo/cf_resumo.html#s8) | CF049 | A rever |
| Mirroring e Matching | [cf_resumo.html#s8](../centro_estudo/cf_resumo.html#s8) | CF052 | A rever |
| Psicogeografia | [cf_resumo.html#s8](../centro_estudo/cf_resumo.html#s8) | CF053, CF054 | A rever |
| Modelo LASEr | [cf_resumo.html#s9](../centro_estudo/cf_resumo.html#s9) | CF055, CF056, CF057, CF058, CF059, CF060, CF061, CF062 | A rever |
| Feedback — Sandwich e BEAR | [cf_resumo.html#s10](../centro_estudo/cf_resumo.html#s10) | CF063, CF064, CF065, CF066, CF067 | A rever |
| Modelo GROW | [cf_resumo.html#s11](../centro_estudo/cf_resumo.html#s11) | CF068, CF069, CF070, CF071 | A rever |
| Modelo SMART aplicado ao Goal | [cf_resumo.html#s11](../centro_estudo/cf_resumo.html#s11) | CF072 | A rever |
| Roda da Vida — Reality | [cf_resumo.html#s11](../centro_estudo/cf_resumo.html#s11) | CF073 | A rever |
| Mudança de paradigma — Options | [cf_resumo.html#s11](../centro_estudo/cf_resumo.html#s11) | CF074 | A rever |
| SWOT | [cf_resumo.html#s12](../centro_estudo/cf_resumo.html#s12) | CF075, CF076 | A rever |
| Road Map | [cf_resumo.html#s12](../centro_estudo/cf_resumo.html#s12) | CF077, CF078 | A rever |
| Princípios Éticos e Deontológicos | [cf_resumo.html#s12](../centro_estudo/cf_resumo.html#s12) | CF079, CF080 | A rever |
### PEDEX

| Saber na matriz existente | Resumo | Perguntas candidatas | Estado |
|---|---|---|---|
| Pedagogia no Desporto | [pedex_resumo.html#s1](../centro_estudo/pedex_resumo.html#s1) | PEDEX001 | A rever |
| Características inerentes à pedagogia no desporto | [pedex_resumo.html#s1](../centro_estudo/pedex_resumo.html#s1) | PEDEX007 | A rever |
| Modelo de análise da relação pedagógica (Antes, Durante, Depois) | [pedex_resumo.html#s1](../centro_estudo/pedex_resumo.html#s1) | PEDEX004 | A rever |
| Papel do profissional no processo pedagógico | [pedex_resumo.html#s1](../centro_estudo/pedex_resumo.html#s1) | PEDEX002 | A rever |
| Ética — conceito e definição | [pedex_resumo.html#s2](../centro_estudo/pedex_resumo.html#s2) | PEDEX009 | A rever |
| Código de ética | [pedex_resumo.html#s2](../centro_estudo/pedex_resumo.html#s2) | PEDEX010 | A rever |
| Postura profissional do instrutor e do personal trainer | [pedex_resumo.html#s2](../centro_estudo/pedex_resumo.html#s2) | PEDEX016 | A rever |
| Situações éticas em contexto profissional | [pedex_resumo.html#s2](../centro_estudo/pedex_resumo.html#s2) | PEDEX012 | A rever |
| Boas práticas profissionais | [pedex_resumo.html#s2](../centro_estudo/pedex_resumo.html#s2) | PEDEX015 | A rever |
| Imagem, comunicação e primeira impressão | [pedex_resumo.html#s2](../centro_estudo/pedex_resumo.html#s2) | PEDEX014 | A rever |
| Centralidade do aluno na intervenção profissional | [pedex_resumo.html#s2](../centro_estudo/pedex_resumo.html#s2) | PEDEX013 | A rever |
| Processo de ensino–aprendizagem | [pedex_resumo.html#s3](../centro_estudo/pedex_resumo.html#s3) | PEDEX017 | A rever |
| Conceito de aprendizagem | [pedex_resumo.html#s3](../centro_estudo/pedex_resumo.html#s3) | PEDEX018 | A rever |
| Fatores influenciadores da aprendizagem | [pedex_resumo.html#s3](../centro_estudo/pedex_resumo.html#s3) | PEDEX019 | A rever |
| Fatores prévios da aprendizagem | [pedex_resumo.html#s3](../centro_estudo/pedex_resumo.html#s3) | PEDEX020 | A rever |
| Domínios da aprendizagem (Fazer, Saber, Estar) | [pedex_resumo.html#s3](../centro_estudo/pedex_resumo.html#s3) | PEDEX024 | A rever |
| Fases da aprendizagem motora | [pedex_resumo.html#s3](../centro_estudo/pedex_resumo.html#s3) | PEDEX026 | A rever |
| Conhecimento e domínio das técnicas a ensinar | [pedex_resumo.html#s4](../centro_estudo/pedex_resumo.html#s4) | PEDEX030 | A rever |
| Metodologia do ensino da técnica | [pedex_resumo.html#s4](../centro_estudo/pedex_resumo.html#s4) | PEDEX031 | A rever |
| Antes da instrução | [pedex_resumo.html#s4](../centro_estudo/pedex_resumo.html#s4) | PEDEX032 | A rever |
| Durante a explicação | [pedex_resumo.html#s4](../centro_estudo/pedex_resumo.html#s4) | PEDEX033 | A rever |
| Durante a demonstração | [pedex_resumo.html#s4](../centro_estudo/pedex_resumo.html#s4) | PEDEX034 | A rever |
| Durante a correção | [pedex_resumo.html#s4](../centro_estudo/pedex_resumo.html#s4) | PEDEX035 | A rever |
| Estratégias para melhorar a execução técnica | [pedex_resumo.html#s4](../centro_estudo/pedex_resumo.html#s4) | PEDEX036 | A rever |
| Descrição e análise de exercícios | [pedex_resumo.html#s4](../centro_estudo/pedex_resumo.html#s4) | PEDEX027 | A rever |
| Importância da definição de objetivos | [pedex_resumo.html#s5](../centro_estudo/pedex_resumo.html#s5) | PEDEX037 | A rever |
| Estruturação de objetivos (O quê, Quanto, Até quando, Porquê) | [pedex_resumo.html#s5](../centro_estudo/pedex_resumo.html#s5) | PEDEX040 | A rever |
| Regra 80/20 na definição de objetivos | [pedex_resumo.html#s5](../centro_estudo/pedex_resumo.html#s5) | PEDEX038 | A rever |
| Processo de definição de objetivos | [pedex_resumo.html#s5](../centro_estudo/pedex_resumo.html#s5) | PEDEX039 | A rever |
| Planeamento no fitness | [pedex_resumo.html#s5](../centro_estudo/pedex_resumo.html#s5) | PEDEX041 | A rever |
| Passos do planeamento | [pedex_resumo.html#s5](../centro_estudo/pedex_resumo.html#s5) | PEDEX042 | A rever |
| Fases do planeamento (longo, médio e curto prazo) | [pedex_resumo.html#s5](../centro_estudo/pedex_resumo.html#s5) | PEDEX043 | A rever |
| Supervisão no processo de planeamento | [pedex_resumo.html#s5](../centro_estudo/pedex_resumo.html#s5) | PEDEX045 | A rever |
| Avaliação, reavaliação e ajuste | [pedex_resumo.html#s5](../centro_estudo/pedex_resumo.html#s5) | PEDEX046 | A rever |
| Gestão da sessão de treino/aula | [pedex_resumo.html#s6](../centro_estudo/pedex_resumo.html#s6) | PEDEX047 | A rever |
| Estratégias de organização da sessão | [pedex_resumo.html#s6](../centro_estudo/pedex_resumo.html#s6) | PEDEX049 | A rever |
| Posicionamento do professor/instrutor | [pedex_resumo.html#s6](../centro_estudo/pedex_resumo.html#s6) | PEDEX053 | A rever |
| Gestão do tempo e das transições | [pedex_resumo.html#s6](../centro_estudo/pedex_resumo.html#s6) | PEDEX052 | A rever |
| Tempo útil da sessão | [pedex_resumo.html#s6](../centro_estudo/pedex_resumo.html#s6) | PEDEX050 | A rever |
| Estratégias para maximizar tempo útil e envolvimento | [pedex_resumo.html#s6](../centro_estudo/pedex_resumo.html#s6) | PEDEX051 | A rever |
| Conceito de comunicação | [pedex_resumo.html#s7](../centro_estudo/pedex_resumo.html#s7) | PEDEX055 | A rever |
| Elementos do processo de comunicação | [pedex_resumo.html#s7](../centro_estudo/pedex_resumo.html#s7) | PEDEX056 | Corrigida nesta revisão |
| Ruído no processo comunicacional | [pedex_resumo.html#s7](../centro_estudo/pedex_resumo.html#s7) | PEDEX057 | A rever |
| Feedback como elemento da comunicação | [pedex_resumo.html#s7](../centro_estudo/pedex_resumo.html#s7) | PEDEX058 | A rever |
| Regras e orientações para uma boa comunicação | [pedex_resumo.html#s7](../centro_estudo/pedex_resumo.html#s7) | PEDEX059 | A rever |
| Comunicação verbal | [pedex_resumo.html#s7](../centro_estudo/pedex_resumo.html#s7) | PEDEX003 | A rever |
| Comunicação não verbal | [pedex_resumo.html#s7](../centro_estudo/pedex_resumo.html#s7) | PEDEX008 | A rever |
| Proxémica | [pedex_resumo.html#s7](../centro_estudo/pedex_resumo.html#s7) | PEDEX060 | A rever |
| Cinésica | [pedex_resumo.html#s7](../centro_estudo/pedex_resumo.html#s7) | PEDEX061 | A rever |
| Paralinguagem | [pedex_resumo.html#s7](../centro_estudo/pedex_resumo.html#s7) | PEDEX021 | A rever |
| Cronémica | [pedex_resumo.html#s7](../centro_estudo/pedex_resumo.html#s7) | PEDEX062 | A rever |
| Imagem e aparência física | [pedex_resumo.html#s7](../centro_estudo/pedex_resumo.html#s7) | PEDEX022 | A rever |
| Tacésica | [pedex_resumo.html#s7](../centro_estudo/pedex_resumo.html#s7) | PEDEX023 | A rever |
| Comunicação olfativa | [pedex_resumo.html#s7](../centro_estudo/pedex_resumo.html#s7) | PEDEX025 | A rever |
| Conceito de instrução | [pedex_resumo.html#s8](../centro_estudo/pedex_resumo.html#s8) | PEDEX063 | A rever |
| Conceito de demonstração | [pedex_resumo.html#s8](../centro_estudo/pedex_resumo.html#s8) | PEDEX064 | A rever |
| Relação entre instrução e demonstração | [pedex_resumo.html#s8](../centro_estudo/pedex_resumo.html#s8) | PEDEX068 | A rever |
| Funções da instrução | [pedex_resumo.html#s8](../centro_estudo/pedex_resumo.html#s8) | PEDEX065 | A rever |
| Pistas verbais | [pedex_resumo.html#s8](../centro_estudo/pedex_resumo.html#s8) | PEDEX067 | A rever |
| Variáveis da demonstração | [pedex_resumo.html#s8](../centro_estudo/pedex_resumo.html#s8) | PEDEX070 | A rever |
| Momentos de apresentação do modelo | [pedex_resumo.html#s8](../centro_estudo/pedex_resumo.html#s8) | PEDEX069 | A rever |
| Conceito de feedback pedagógico | [pedex_resumo.html#s9](../centro_estudo/pedex_resumo.html#s9) | PEDEX071 | A rever |
| Importância do feedback na aprendizagem motora | [pedex_resumo.html#s9](../centro_estudo/pedex_resumo.html#s9) | PEDEX078 | A rever |
| Modelo de aplicação do feedback | [pedex_resumo.html#s9](../centro_estudo/pedex_resumo.html#s9) | PEDEX072 | A rever |
| Dimensões do feedback pedagógico | [pedex_resumo.html#s9](../centro_estudo/pedex_resumo.html#s9) | PEDEX073 | Corrigida nesta revisão |
| Tipos de feedback | [pedex_resumo.html#s9](../centro_estudo/pedex_resumo.html#s9) | PEDEX074 | Corrigida nesta revisão |
| Classificação do feedback | [pedex_resumo.html#s9](../centro_estudo/pedex_resumo.html#s9) | PEDEX077 | A rever |
| Conceito de erro | [pedex_resumo.html#s9](../centro_estudo/pedex_resumo.html#s9) | PEDEX075 | A rever |
| Erro como parte do processo de aprendizagem | [pedex_resumo.html#s9](../centro_estudo/pedex_resumo.html#s9) | PEDEX076 | A rever |
| Clima de aprendizagem e tolerância ao erro | [pedex_resumo.html#s9](../centro_estudo/pedex_resumo.html#s9) | PEDEX079 | A rever |
| Repensar o erro na intervenção pedagógica | [pedex_resumo.html#s9](../centro_estudo/pedex_resumo.html#s9) | PEDEX080 | A rever |

## Correções da base — 2026-10-07

- CF040 passou a um caso de reconhecimento de necessidade; CF036 conserva a variação de prioridades/formas de satisfação.
- CF062 passou à adaptação da comunicação à energia azul; CF061 conserva a sequência de ativação.
- CF047, CF050, CF052 e CF054 passaram a exemplos de aplicação de escuta ativa, backtracking, mirroring/matching e psicogeografia, respetivamente. O resumo s7/s8 já apresenta as técnicas correspondentes. LASEr mantém localização s9.
- PEDEX056 passou a avaliar os oito elementos comunicacionais; PEDEX073 identifica as quatro dimensões; PEDEX074 distingue os quatro objetivos do feedback. Resumo s7/s9 e referências de páginas constam nos itens.
- IDs, temas e repartição dos exames preservados. Opções dos 160 itens CF/PEDEx baralhadas e índices recalculados, sem impor equilíbrio de letras. Nos 151 itens sem revisão de conteúdo, a resposta correta textual e todas as opções permanecem iguais.
- Continua pendente: auditoria integral por subtópico/figura, reestruturação da matriz PEDEx pelos 11 blocos originais e revisão individual dos restantes itens. O estado `needs_revision` permanece; esta correção não certifica 100% de cobertura.
