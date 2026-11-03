# Crónicas de Enerelis

Montra de livros, saga e biografia de Patrícia Costa, com contactos Instagram, WhatsApp e email. O PoC foi aprovado; o repositório pertence à titular em [Enerelis/Enerelis](https://github.com/Enerelis/Enerelis), com colaboração técnica. O destino proposto é Cloudflare Pages e o domínio oficial é `https://enerelis.pt/`. A criação das contas não significa que o site já esteja publicado.

## Desenvolvimento e geração

Requer Node.js 22 ou superior. Não existem dependências npm de terceiros.

```powershell
npm run build
```

Gera a versão de alojamento em `dist/`, incluindo páginas completas, metadados, sitemap, manifesto, service worker e `_headers`. Publicar apenas essa pasta. Para regenerar também as páginas na raiz do repositório, executar `npm run build:source`.

No PowerShell, se a política de execução bloquear `npm.ps1`, usar `npm.cmd run build` (ou `node build-production.mjs`), sem alterar a política do sistema.

Para testar, servir a pasta por HTTP com um servidor local de ficheiros estáticos. Abrir por `file://` não permite testar corretamente módulos JavaScript e service worker. Verificar também o build num clone limpo antes da publicação.

- `content.js`: dados e condições comerciais.
- `render.js` e `style.css`: apresentação pública.
- `runtime-v4.js`: pesquisa, lista de informações e interação.
- `editor.js` e `admin.html`: edição local.
- `exporter.js`: geração partilhada pelo editor e builds.
- `resources.js`: lista explícita dos recursos incluídos; atualizar quando são adicionadas imagens.
- `build-production.mjs`: artefacto de produção isolado; não publica.

As capas e arte pertencem a Patrícia Costa. Não inventar ISBNs, dimensões nem páginas interiores.

## Editor e publicação

Abrir `admin.html` no servidor local ou no endereço de testes. **Guardar rascunho** guarda apenas no editor e na pré-visualização deste navegador. **Ver rascunho** abre essa versão com `?preview=1`. As páginas públicas recebem sempre os conteúdos publicados em `content.js`, mesmo quando existem configurações antigas no navegador. A pré-visualização pode incluir alterações ainda não guardadas.

Exportar permite obter ficheiros/ZIP com as alterações. Até existir CMS autenticado, a publicação é assistida: rever os ficheiros exportados numa branch, gerar o site, validar o preview e integrar em `main`. Não editar uma cópia local esperando que Cloudflare receba essas alterações automaticamente. Guardar uma cópia antes de repor definições.

O editor atual não tem autenticação, base de dados partilhada ou publicação remota. O acesso foi retirado da navegação pública; conhecer o URL continua a permitir abrir o editor local. O roadmap distingue este funcionamento de uma futura publicação autónoma.

## Cloudflare Pages

Configuração prevista, a efetuar na conta da titular:

| Campo | Valor |
| --- | --- |
| Repositório | `Enerelis/Enerelis` |
| Branch de produção | `main` |
| Framework | Nenhum |
| Diretório raiz | Raiz do repositório |
| Comando de build | `npm run build` |
| Diretório de saída | `dist` |
| Node.js | 22 ou superior suportado no build |

A integração Git permite gerar previews e publicar a branch de produção; requer autorização da conta e configuração no painel. [Documentação oficial](https://developers.cloudflare.com/pages/get-started/git-integration/).

`_headers` estabelece revalidação de cache, headers básicos e `noindex` no editor. Não cria autenticação. O service worker tem uma política de cache própria, que deve ser validada na atualização de versões.

Antes de associar `enerelis.pt`, inventariar DNS e serviços OVH existentes, preservar email, validar HTTPS e preparar rollback. Para o domínio raiz em Pages, a zona deve estar na conta Cloudflare do projeto. [Domínios personalizados](https://developers.cloudflare.com/pages/configuration/custom-domains/).

O plano com fases, responsáveis e critérios de lançamento está em [ROADMAP-PRODUCAO.md](ROADMAP-PRODUCAO.md). Não foram executados deploy, alterações DNS ou configuração de contas neste trabalho.

## Verificação antes de publicar

Rever todos os livros e packs, preços e prazos, portes, contactos, logótipos, navegação por teclado e telemóvel. Testar páginas sem JavaScript, atualização de uma instalação antiga e ligações externas. Confirmar no preview os headers, URLs dos livros, sitemap, canónicos e resposta 404.

Preços promocionais com prazo exigem regeneração e publicação quando expiram: atualizar apenas a interface JavaScript não atualiza o HTML que os motores de pesquisa recebem. A disponibilidade e o total com portes são confirmados por contacto; não existe checkout.
