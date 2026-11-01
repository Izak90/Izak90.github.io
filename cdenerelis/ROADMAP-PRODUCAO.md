# Roadmap de produção — Crónicas de Enerelis

Data: 31 de outubro de 2026  
Domínio pretendido: **https://enerelis.pt**  
Alojamento indicado: **OVHcloud**; plano e configuração por confirmar.

## Objetivo e âmbito

Publicar uma montra rápida, acessível e pesquisável no Google, que apresente a saga, a autora e os livros e encaminhe os interessados para o Instagram ou WhatsApp. A autora deve conseguir manter conteúdos e aparência sem editar código.

Mantêm-se as páginas de início, coleção e detalhes de cada livro, preços e packs, FAQ, contactos e amostras autorizadas. Não se incluem eventos, catálogo de stickers/prints, checkout ou ligações públicas ao Goodreads. Os detalhes dos livros continuam em páginas próprias; a ampliação das amostras usa um diálogo.

## Ponto de partida

O PoC tem HTML, CSS e JavaScript, páginas estáticas geradas, metadados, sitemap, manifesto, service worker, editor visual e exportação. Não é necessário mudar de framework para publicar esta montra.

**A principal diferença para produção é a publicação dos conteúdos.** Atualmente, “Guardar e aplicar” altera apenas a aplicação nesse navegador. Não existe autenticação de administradora, armazenamento partilhado nem publicação remota pelo editor. Um botão de guardar local não satisfaz o requisito de a autora publicar para todos os visitantes.

O domínio já está na configuração do projeto. Isso não demonstra que o site esteja instalado na OVH nem que DNS, certificado e redirecionamentos estejam corretos. Os ISBNs continuam por confirmar. As amostras dependem de páginas fornecidas pela autora.

## Sequência e marcos

| Fase | Resultado | Responsável principal | Dependência |
| --- | --- | --- | --- |
| 1. Acessos e inventário | Conhecer o alojamento e preservar o que existe | Autora + responsável técnico | Nenhuma |
| 2. Conteúdo aprovado | Catálogo e identidade prontos a publicar | Autora | Pode decorrer em paralelo com 1 |
| 3. Publicação e gestão | Escolher e implementar o fluxo editorial | Responsável técnico + autora | 1 |
| 4. Pré-produção na OVH | Versão completa testável sem substituir o site atual | Responsável técnico | 1 e 3 |
| 5. Validação final | Aprovação funcional, editorial e operacional | Autora + responsável técnico | 2 e 4 |
| 6. Lançamento | Site público em enerelis.pt, com recuperação preparada | Responsável técnico | 5 + autorização de lançamento |
| 7. Acompanhamento | Corrigir problemas reais e manter conteúdos atuais | Autora + responsável técnico | 6 |

Os prazos devem ser estimados depois de confirmar o plano OVH e a opção de gestão. Não há uma data de lançamento fechada.

## 1. Confirmar acessos e estado do alojamento

- [ ] Identificar a conta titular, plano OVH, acesso delegado, pasta associada ao domínio, espaço disponível e versões de execução suportadas.
- [ ] Confirmar se existem site, base de dados, caixas de correio ou outros serviços em utilização.
- [ ] Inventariar DNS de `enerelis.pt` e `www.enerelis.pt`, incluindo registos de email. Não substituir a zona DNS integralmente.
- [ ] Confirmar acessos seguros a ficheiros e disponibilidade de base de dados, backups e ambiente de testes conforme o plano.
- [ ] Criar uma cópia do site e das configurações existentes antes de qualquer substituição.
- [ ] Definir quem gere o domínio, as renovações, o alojamento e a recuperação da conta. Não colocar palavras-passe no repositório ou no site.

**Critério de conclusão:** inventário registado e acesso técnico suficiente para preparar uma versão de testes, sem afetar o serviço existente.

## 2. Aprovar conteúdos e condições comerciais

- [ ] A autora aprova biografia, apresentação da saga, sinopses e textos sem spoilers. A pesquisa bibliográfica serve de apoio; o texto final deve ser aprovado para publicação.
- [ ] Confirmar títulos, ordem, anos, páginas, número de tomos e ISBN por edição/tomo na ficha editorial. Não atribuir um ISBN a vários tomos sem confirmação.
- [ ] Confirmar dimensões quando se pretenda apresentá-las; omitir dados opcionais desconhecidos.
- [ ] Confirmar autorização para logótipo, capas, fotografia e imagens; fornecer páginas interiores autorizadas para amostras.
- [ ] Rever disponibilidade, edições esgotadas, preços individuais, packs, portes e meios de pagamento.
- [ ] Confirmar o que sucede ao Volume 08 após **31/10/2026**: o prazo de pré-venda termina nessa data. Não publicar previsões de envio como informação atual sem confirmação.
- [ ] Preparar a atualização das promoções que terminam em **31/12/2026** e a respetiva revisão do HTML gerado.
- [ ] Confirmar Instagram e autorização para publicar o WhatsApp fornecido.

**Critério de conclusão:** aprovação escrita da versão editorial e da tabela comercial, com data de revisão. Se um ISBN não puder ser confirmado, decidir expressamente com a autora se o livro avança sem esse dado.

## 3. Definir como a autora publica alterações

### Opções compatíveis com o projeto existente

| Opção | Vantagens | Limitações e manutenção | Utilização |
| --- | --- | --- | --- |
| A. Site estático + exportação e publicação por responsável técnico | Reutiliza o PoC; pouca infraestrutura; páginas completas para pesquisa | A autora depende de outra pessoa para publicar; transferência e recuperação de versões têm de ser organizadas | Lançamento inicial assistido, se aceite pela autora |
| B. Site estático + serviço de publicação autenticado | Preserva a montra e o editor; permite guardar/publicar para todos; mantém páginas estáticas | Exige autenticação, uploads, armazenamento, histórico, publicação e manutenção do serviço; depende do plano OVH | Alvo para gestão autónoma sem código |

**Recomendação:** preservar o site estático. Para satisfazer a autonomia da autora, acrescentar apenas o serviço editorial necessário, depois de confirmar a compatibilidade do alojamento. A opção A só é uma alternativa de lançamento se a dependência de um responsável técnico for explicitamente aceite; não equivale a gestão autónoma.

Não adotar um novo framework ou CMS por defeito. Se o alojamento ou os requisitos exigirem outra solução, documentar a justificação, custos, migração dos conteúdos, impacto no editor e manutenção antes de a escolher.

### Trabalho necessário para a opção B

- [ ] Acesso reservado, validado no servidor, com recuperação de acesso e proteção contra tentativas abusivas. Esconder o link do editor não é autenticação.
- [ ] Guardar rascunhos no servidor, com imagens persistentes e cópias de segurança.
- [ ] Separar **Guardar rascunho**, **Pré-visualizar** e **Publicar**, com estados e erros claros.
- [ ] Ao publicar, validar conteúdos e gerar HTML, metadados, sitemap e cache PWA a partir da mesma versão.
- [ ] Publicar a versão completa de forma consistente, evitando mistura de páginas antigas e novas. Manter a versão anterior recuperável.
- [ ] Validar uploads no servidor: formato real, tamanho, nomes seguros e destino sem execução de ficheiros enviados.
- [ ] Impedir alterações anónimas, validar entradas e proteger sessões e pedidos de alteração; não expor credenciais de alojamento no JavaScript.
- [ ] Tratar falhas de rede e alterações concorrentes sem perder conteúdo ou comunicar publicação quando esta falhou.
- [ ] Definir **Repor definições iniciais** separadamente de **Restaurar versão anterior**. A reposição em produção deve poder ser pré-visualizada, confirmada e recuperada; não deve apagar a única cópia dos conteúdos.
- [ ] Retirar a personalização pública por `localStorage` como fonte do conteúdo oficial. O visitante deve receber a versão publicada, e o editor deve trabalhar com rascunhos autenticados.

**Critério de conclusão:** uma alteração publicada pela autora é visível noutro dispositivo sem a conta autenticada; uma alteração não publicada não aparece aos visitantes; existe recuperação testada.

## 4. Preparar pré-produção na OVH

- [ ] Criar pasta e endereço de testes separados da produção; restringir acesso e impedir indexação. `noindex` não substitui proteção de acesso.
- [ ] Associar o endereço de testes à pasta correta e configurar HTTPS conforme os recursos do plano.
- [ ] Enviar apenas os ficheiros necessários à aplicação; excluir segredos, ficheiros Git, documentação interna e backups.
- [ ] Validar funcionamento na raiz do domínio, em vez do subdiretório `/cdenerelis/` usado no GitHub Pages.
- [ ] Preparar configuração de produção com `https://enerelis.pt/` como endereço principal, sitemap e URLs de partilha coerentes.
- [ ] Definir redirecionamento permanente de HTTP para HTTPS e de `www` para o domínio principal, sem ciclos.
- [ ] Configurar página 404, cache e tipos de ficheiro. O service worker e os ficheiros que coordenam atualizações devem permitir receber novas versões.
- [ ] Atualizar ícones de instalação/PWA para a identidade oficial e confirmar que não subsistem ícones provisórios com o “E”.
- [ ] Rever previews públicos no GitHub: redirecionar ou desindexar a cópia de demonstração, conforme o controlo disponível, para concentrar a presença oficial no domínio.

A OVH documenta a publicação de ficheiros e a associação entre domínio e pasta em [Publicar um site](https://docs.ovhcloud.com/en/guides/web-cloud/web-hosting/hosting-how-to-get-my-website-online) e [Configurar multisite](https://docs.ovhcloud.com/en/guides/web-cloud/web-hosting/multisites-configure-multisite). Confirmar sempre as opções efetivamente disponíveis na conta.

## 5. Validar antes de lançar

- [ ] Testar em telemóvel real e desktop, incluindo Safari/iOS, Chrome/Android e um navegador desktop.
- [ ] Verificar menu, pesquisa, páginas dos livros, ordem de leitura, sinopses, packs, amostras e mensagens de contacto.
- [ ] Verificar logótipo e imagens sem deformação, texto legível, navegação por teclado, foco dos diálogos e acessibilidade das cores editáveis.
- [ ] Pedir à autora para alterar uma capa, uma sinopse, um preço e uma cor, publicar, confirmar noutro dispositivo e restaurar uma versão. Registar dificuldades e ajustar o editor.
- [ ] Testar ausência de rede, regresso da ligação e atualização de uma PWA já instalada. Informação comercial em cache deve pedir confirmação e não parecer atualizada sem o ser.
- [ ] Testar expiração de preços, páginas sem JavaScript e dados estruturados. Programar regeneração/publicação quando uma promoção termina: o HTML estático também tem de deixar de anunciar preços expirados.
- [ ] Verificar títulos, descrições, canónicos, sitemap, robots, partilhas e ausência de bloqueios de indexação na versão final.
- [ ] Rever logs, contactos do responsável e informação de privacidade adequada ao funcionamento real. Não acrescentar formulários, tracking ou widgets sem rever o tratamento de dados.
- [ ] Se forem usados cookies/armazenamento ou serviços de analítica não essenciais, avaliar informação e consentimento antes de os ativar. A [nota da CNPD sobre cookies](https://www.cnpd.pt/media/x2zdus50/nota-informativa-cnpd_cookies_20210625.pdf) é uma referência para esta revisão, não uma certificação de conformidade do projeto.
- [ ] Executar e registar uma restauração de ficheiros, conteúdos e imagens; definir tempo aceitável de recuperação e perda de dados.

**Critério de conclusão:** sem problemas críticos de publicação, acesso, navegação ou perda de dados; conteúdos aprovados e recuperação demonstrada. Os testes já feitos no PoC não substituem estes testes no alojamento final.

## 6. Lançar enerelis.pt

1. Obter aprovação da autora para a versão final e autorização para a janela de lançamento.
2. Guardar cópia do serviço atual e registar os valores DNS antes das alterações.
3. Instalar a versão aprovada na pasta de produção e ajustar apenas os registos necessários, preservando email e outros serviços.
4. Confirmar certificado, HTTPS, domínio principal, páginas dos livros, contactos, publicação editorial e tratamento de erros.
5. Confirmar atualização da PWA e ausência de dados de demonstração ou conteúdos privados.
6. Verificar a propriedade do domínio no Google Search Console e enviar o sitemap. A inclusão e posição na pesquisa não são garantidas.
7. Atualizar a ligação na biografia do Instagram para `https://enerelis.pt/`.
8. Se houver falha crítica, restaurar a versão anterior e reverter apenas as alterações necessárias. Considerar que DNS pode manter valores em cache.

**Critério de conclusão:** domínio a servir a versão aprovada por HTTPS, contactos operacionais e fluxo editorial escolhido a funcionar, com cópia recuperável.

## 7. Operar e melhorar

- **Primeiras 48 horas:** verificar erros, contactos, imagens, certificado, publicação e cache; corrigir problemas bloqueantes.
- **Primeiras duas semanas:** confirmar rastreio no Search Console, testar utilização com a autora e recolher dúvidas reais dos leitores.
- **Mensalmente:** rever preços, disponibilidade, portes, contactos, backups e atualizações do serviço editorial e dependências, se existirem.
- **Antes de cada promoção terminar:** confirmar novas condições e agendar a atualização das páginas estáticas e da PWA.
- **Periodicamente:** testar restauração e rever acessos; acompanhar renovação do domínio, alojamento e certificado conforme o regime contratado.

Medir inicialmente páginas indexadas, erros e facilidade de chegar aos contactos. Analítica adicional é opcional; não é requisito de lançamento.

## Próximas três ações

1. **Autora:** fornecer acesso delegado ou inventário do plano OVH e aprovar os conteúdos e condições comerciais atuais.
2. **Autora + responsável técnico:** escolher entre lançamento assistido e publicação autónoma, com custos e manutenção definidos.
3. **Responsável técnico:** preparar pré-produção na OVH e implementar o fluxo editorial escolhido, preservando o site existente.

Este documento é um plano de execução. Não confirma alterações na conta OVH, no DNS ou uma publicação em produção.
