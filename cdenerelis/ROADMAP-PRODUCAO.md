# Roadmap de produção — Crónicas de Enerelis

Atualizado em **3 de novembro de 2026**. PoC aprovado. Contas GitHub e Cloudflare criadas pela titular; repositório [Enerelis/Enerelis](https://github.com/Enerelis/Enerelis) na sua conta e responsável técnico como colaborador. Estes dados não comprovam uma ligação Cloudflare ativa ou uma publicação.

## Arquitetura e decisão proposta

Manter a montra estática atual: HTML completo para início, coleção e livros; CSS/JavaScript sem dependências de execução; conteúdos em `content.js`; geração por `exporter.js`. Cloudflare Pages ligado ao GitHub é o destino proposto. O domínio é `enerelis.pt`; a referência anterior à OVH passa a contexto do registo/alojamento existente, cujo estado deve ser inventariado antes de qualquer migração.

O lançamento inicial pode usar publicação assistida por Git: alterações revistas numa pull request, preview, aprovação e merge em `main`. O editor atual continua local: **Guardar e aplicar não publica na Internet**. Retirar o acesso do rodapé não cria autenticação. Se a autonomia editorial for requisito para o primeiro lançamento, a fase de CMS abaixo torna-se bloqueante.

Não há checkout: disponibilidade e total final são confirmados por contacto. Instagram, WhatsApp e email são os canais previstos.

## Fases e critérios de aceitação

| Prioridade / fase | Entrega | Aceitação | Responsável |
| --- | --- | --- | --- |
| P0 · Conteúdo e UI | Correções do TODO, identidade, preços e contactos | Revisão no telemóvel e aprovação editorial dos dados finais | Técnica + titular |
| P0 · Integração | GitHub da titular ligado ao Cloudflare Pages e preview | Build limpo, apenas `dist` publicado, preview associado a commit | Técnica + titular |
| P0 · Qualidade | Verificação funcional, acessibilidade, SEO e cache | Sem falhas bloqueantes nos critérios abaixo | Técnica |
| P0 · Domínio e lançamento | DNS, HTTPS, redirecionamentos e recuperação | `enerelis.pt` serve versão aprovada; rollback ensaiado | Técnica + titular |
| P1 · Autonomia | Publicação autenticada no editor/CMS | Rascunho privado e publicação visível noutro dispositivo | Técnica + titular |
| P2 · Operação | Revisões, backups e evolução | Responsáveis e rotina registados, manutenção sustentável | Técnica + titular |

Não existe data de lançamento acordada. A primeira previsão depende da revisão editorial, acessos Cloudflare/DNS e decisão entre publicação assistida e autónoma.

## 1. Preparar o projeto Cloudflare Pages

1. A titular instala/autoriza a integração Cloudflare com acesso apenas a este repositório. Conceder acesso delegado ao responsável técnico; ativar autenticação de dois fatores e recuperação nas contas. Não guardar tokens no código.
2. Criar um projeto **Pages com integração Git**, escolher `Enerelis/Enerelis`, branch de produção `main`, preset sem framework, diretório raiz do repositório, comando `npm run build`, saída `dist`. Definir Node 22 ou superior suportado pelo ambiente de build; registar a versão utilizada.
3. O comando gera HTML e recursos numa pasta isolada. Não publicar a raiz: contém documentação e ficheiros de trabalho. O build não instala dependências de terceiros.
4. Configurar previews de branches/pull requests e testar uma alteração antes de merge. Proteger `main` com revisão e verificações conforme as funcionalidades disponíveis na conta. Restringir previews com Cloudflare Access se contiverem informação não pública; `noindex` não controla acesso.
5. Confirmar `_headers` nas respostas HTTP reais: cache revalidável, prevenção de MIME sniffing e editor sem indexação. O iframe do editor exige `SAMEORIGIN`.
6. Registar nome do projeto, URL Pages, commit publicado e pessoas com acesso. Não ativar integração ou deploy usando credenciais embutidas no editor.

**Aceitação:** clone limpo → `npm run build` → preview funcional; `README.md`, `TODO.md`, ficheiros Git e pastas de revisão não são servidos. A publicação de produção mantém a versão anterior recuperável.

Referências oficiais verificadas em 03/11/2026: [integração Git](https://developers.cloudflare.com/pages/get-started/git-integration/), [headers](https://developers.cloudflare.com/pages/configuration/headers/) e [previews](https://developers.cloudflare.com/pages/configuration/preview-deployments/).

## 2. Aprovar e validar a versão de lançamento

- [ ] Aprovar biografia, sinopses, imagens e direitos de publicação. Confirmar os ISBNs; omitir os desconhecidos. Amostras interiores só com autorização.
- [ ] Confirmar preços, packs (incluindo 01–08 a 169 €), Máscaras a 26 €, portes 05–08 e disponibilidade. Rever a situação real do volume 08 após 31/10/2026 sem reintroduzir mensagens vencidas.
- [ ] Definir a atualização das promoções até 31/12/2026: uma nova publicação deve atualizar também HTML, dados estruturados e cache. Um preço expirado não pode depender apenas de JavaScript para desaparecer da página estática.
- [ ] Testar início, coleção e todos os livros com e sem JavaScript; links, pesquisa, packs, lista de informações, email, WhatsApp e Instagram.
- [ ] Testar teclado, foco, diálogos, zoom 200%, contraste e largura de 320 px. Validar em Safari/iOS, Chrome/Android e desktop, incluindo os logótipos sem distorção.
- [ ] Verificar títulos, descrições, canónicos, sitemap, robots e partilhas. Previews não devem competir na pesquisa com o domínio oficial.
- [ ] Testar PWA existente: atualização de versão, cache antigo, modo offline e regresso da rede. A informação comercial offline deve pedir confirmação.
- [ ] Rever ausência de dados privados no artefacto, uploads e comportamento do editor. O editor local acessível por URL não deve sugerir que está autenticado ou que publica remotamente.
- [ ] Rever a informação de privacidade conforme os serviços realmente usados. Analytics, formulários ou widgets adicionais exigem nova avaliação antes de ativar.
- [ ] Preparar página 404 real e verificar resposta de URLs inexistentes em Pages; confirmar caminhos sem extensão e com `.html`.

**Aceitação:** aprovação editorial registada e nenhuma falha bloqueante de navegação, contacto, preços, segurança ou perda de dados. Os testes locais não substituem os testes no preview final.

## 3. Associar enerelis.pt e lançar

1. Inventariar DNS e serviços existentes, incluindo MX, SPF, DKIM, DMARC, subdomínios, DNSSEC e eventual site OVH. Guardar configuração e versão atual. Confirmar acesso ao registo e renovações.
2. Adicionar `enerelis.pt` como domínio personalizado do projeto Pages antes de apontar DNS. Para domínio raiz em Pages, a zona tem de estar na mesma conta Cloudflare; confirmar a migração de nameservers e a coordenação DNSSEC no registo. Preservar email e outros serviços. [Domínios personalizados](https://developers.cloudflare.com/pages/configuration/custom-domains/).
3. Associar também `www.enerelis.pt` e definir redirecionamento permanente para `https://enerelis.pt/`, preservando caminhos e parâmetros. Validar HTTPS e ausência de ciclos. Preparar redirecionamento da versão Pages de produção quando apropriado, preservando previews.
4. Aprovar a versão/commit e janela de lançamento com a titular. Efetuar a alteração e verificar resolução DNS, certificado, páginas, imagens, contactos, cache e 404 a partir de outra rede.
5. Confirmar Google Search Console, enviar sitemap e atualizar o link Instagram. Não prometer posição na pesquisa.
6. Ensaiar recuperação da versão anterior em Pages. Alterações DNS têm reversão separada e podem ficar em cache; manter o serviço anterior disponível durante a transição.

**Aceitação:** domínio principal por HTTPS, redirecionamentos corretos, email preservado, versão aprovada identificável e rollback documentado. Não cancelar o alojamento anterior antes da estabilização e do inventário dos serviços.

## 4. Publicação autónoma e autenticação

Antes de desenvolver, validar o fluxo com a titular: editar → guardar rascunho → preview → publicar → restaurar. Escolher uma única solução após um pequeno protótipo:

- **CMS ligado ao Git:** conteúdos estruturados num formato de dados, autenticação GitHub e serviço OAuth seguro quando necessário; alterações versionadas e build Pages. Adaptar o editor atual ou adotar um CMS após comparar esforço, acessibilidade, custos e manutenção.
- **Editor atual com backend editorial:** Pages Functions/Worker com identidade validada no servidor, autorização da titular, armazenamento persistente e publicação através de credenciais restritas mantidas no servidor. Cloudflare Access pode controlar acesso, mas não substitui autorização nem o backend de gravação.

Em ambas as opções: validar conteúdo e uploads no servidor, limitar tamanho/formato, evitar execução de ficheiros enviados, tratar concorrência e falhas de rede, proteger sessões/pedidos e manter histórico recuperável. Separar conteúdo oficial de personalização local e nunca expor token GitHub/Cloudflare no JavaScript. Não descrever o editor local como CMS de produção.

**Aceitação:** edição não publicada invisível a visitantes; publicação confirmada noutro dispositivo sem sessão; utilizador não autorizado impedido de gravar; restauração de conteúdo e imagens testada. A titular consegue executar o fluxo sem ajuda técnica.

## 5. Operação e evolução

- Primeiras 48 horas: verificar erros, contactos, imagens, HTTPS e atualização de cache; corrigir bloqueantes.
- Quinzenalmente no primeiro mês: recolher dificuldades reais de leitura e edição, rever pesquisa e partilhas.
- Mensalmente: confirmar preços, disponibilidade, portes, backups, acessos e recuperabilidade do repositório e recursos.
- Antes de cada prazo promocional: aprovar novas condições e publicar páginas regeneradas. Considerar geração agendada apenas depois de existir CI com falhas notificadas e responsável definido.
- Periodicamente: testar rollback, rever permissões e recuperação de contas, domínio e faturação. Medir primeiro erros e facilidade de chegar aos contactos; analítica adicional é opcional.

## Próximas ações concretas

1. Técnica: concluir correções, gerar artefacto e entregar preview para revisão editorial.
2. Titular + técnica: ligar este repositório ao projeto Pages e escolher lançamento assistido ou CMS obrigatório na estreia.
3. Técnica + responsável pelo domínio: inventariar zona DNS/OVH, preparar domínio e plano de reversão.

Este documento não confirma alterações nas contas, no DNS ou publicação. A configuração Cloudflare, o CMS e a migração do domínio continuam pendentes.
