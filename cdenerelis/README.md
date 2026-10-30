# Crónicas de Enerelis · site de apresentação e livros

Site de apresentação da saga e biografia de Patrícia Costa, com montra de livros, sinopses detalhadas, edições, preços, packs e contactos Instagram/WhatsApp. O Instagram mantém-se como canal principal. Não há eventos nem gestão de outros produtos.

## Abrir e personalizar

- Site: https://izak90.github.io/cdenerelis/
- Editor visual: https://izak90.github.io/cdenerelis/admin.html

No editor, usa as secções Página inicial, A autora, Livros e edições, Packs, Preços e portes, Contactos, Fontes e cores e Google e domínio. Os textos, imagens, preços, ISBNs, packs, cores e fontes são configuráveis sem código. A pré-visualização é imediata.

**Guardar neste navegador não publica para outros visitantes.** Para publicar, abre Publicar e cópias e transfere o site completo em ZIP, ou guarda-o numa pasta vazia através do navegador. O pacote contém as páginas e os recursos prontos a alojar. O editor não tem acesso ao alojamento remoto nem usa credenciais GitHub guardadas no site.

O ZIP pode ser entregue à pessoa que gere o alojamento, ou carregado e extraído no painel do alojamento do domínio existente. Não é necessário comprar outro domínio. O nome do domínio ainda não foi indicado; quando for conhecido, deve ser configurado em Google e domínio antes de gerar a versão final e associado ao alojamento no respetivo fornecedor.

## Conteúdos e condições

Preços e WhatsApp fornecidos pelo utilizador em 30-10-2026. Pré-venda do Volume 08: edição normal 26 €, especial limitada 30 € já esgotada; prazo de pagamento anunciado até 31-10-2026. Preços promocionais dos volumes 01–07 e packs até 31-12-2026. Após o prazo de cada livro/pack, aparece Consultar preço e a oferta expirada deixa de entrar nos dados estruturados. Portes são apresentados separadamente; não existe checkout.

As sinopses foram resumidas e aprofundadas a partir de fichas Goodreads acessíveis e documentação editorial complementar. A maioria dos ISBNs não foi confirmada; ficam vazios e assinalados como a confirmar. O número citado para Asas num pedido de utilizador Goodreads não foi publicado como ISBN confirmado. Os campos permitem introduzir e validar ISBN-10/13 por edição ou tomo.

Capas e arte © Patrícia Costa; fontes de pesquisa mantidas na documentação de trabalho, sem ligações bibliográficas na interface pública. As únicas saídas de contacto são Instagram e WhatsApp.

## Pesquisa no Google e páginas estáticas

A página inicial, a coleção e cada livro são gerados com conteúdo HTML completo, título, descrição, endereço canónico, Open Graph, dados estruturados Book e mapa do site. Podem ser lidos sem JavaScript. As fontes estão incluídas localmente. A indexação e posição no Google não são garantidas.

## Limites da POC

Alterações no editor e cópias ficam locais ao navegador até serem exportadas e publicadas. Não há autenticação de administradora, base de dados partilhada nem publicação remota automática. A edição visual e a exportação funcionam; um CMS remoto autenticado deve ser escolhido conforme o alojamento da autora, se for necessário publicar diretamente pelo navegador.

O código-fonte da configuração está em content.js. O editor gera esse ficheiro e as páginas automaticamente na exportação. Configurações antigas da POC ficam intocadas no armazenamento do navegador, mas não são utilizadas nesta versão de livros.

## Revisão UI/UX

A revisão de 30-10-2026 e as verificações executadas estão documentadas em `UI-UX-REVIEW.md`. Para regenerar as páginas estáticas e o service worker depois de alterar os módulos: `node build.mjs`, na pasta do projeto. A configuração editorial mantém-se em `content.js`; o editor visual continua a permitir exportar o site sem editar código.
