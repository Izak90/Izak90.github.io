# Ajustes pedidos

## Complementos pedidos e implementados

- [x] Alinhar o topo do título de abertura com a imagem; ajustar também o espaço tipográfico acima das maiúsculas.
- [x] Retirar a assinatura “O universo de Patrícia Costa” do cabeçalho.
- [x] Aumentar o texto do menu: 17 px em desktop e 15 px em telemóvel.
- [x] Volume 08: preço de 26 € com condições até 31 de dezembro de 2026, na coleção e na ficha.
- [x] Substituir a lista no fim da página por barra fixa com contador, confirmação de alterações, acesso ao WhatsApp e janela para rever/remover livros. Manter seleção entre coleção e fichas, navegação por teclado e retorno do foco ao fechar.

## Auditoria de 3 de novembro de 2026

Os pedidos originais estão preservados abaixo. A primeira validação não cobriu navegadores com personalizações antigas guardadas: essas configurações podiam repor preços, imagens e textos anteriores. Corrigido em `runtime-v4.js`: a página pública usa a configuração publicada; os dados locais ficam preservados no editor e em `?preview=1`.

| Ponto | Implementação verificada no código e build local |
| --- | --- |
| 1 | Símbolo PNG maior e logótipo textual no cabeçalho. |
| 2 | Rodapé sem instalação nem acesso ao editor. |
| 3 | Número omitido como texto; ligação WhatsApp mantida. |
| 4 | Frase retirada da abertura. |
| 5 | Sem poupança nem contagem nos packs; 02+03 removido; 01–08 a 169 €. |
| 6 | Máscaras a 26 €; edições especiais removidas do catálogo e FAQ. |
| 7 | Tabela e notas de portes com 05–08. |
| 8 | Parágrafo de prazo expirado retirado. |
| 9 | Botões alinhados com a coluna de texto; email adicionado. |
| 10 | Textos de contacto e da lista sem a repetição indicada. |

Verificado em Edge também com uma configuração antiga simulada no armazenamento: o site público manteve os logótipos atuais, Máscaras a 26 € e o email correto; o rascunho anterior continuou disponível e editável. A publicação remota e a confirmação visual pelo utilizador continuam por verificar.

## Texto original

1- header: logo redondo maior (usar enerelis-logo.png) e em vez de texto "Crónicas de Enerelis" usar logo (logo-azulverde.png ou logo-preto.png)
2 - não aparecer botão de instalação de aplicação/acesso e área da autora no rodapé (footer)
3- contactos, omitir número de telefone
4- retirar texto "BANDA DESENHADA PORTUGUESA · FANTASIA ÉPICA"
5- tirar os valores de poupança dos packs e a menção ao número de volumes (2 volumes, 3....) e tirar o pack 02+03. Acrescenta o pack do 01 ao 08. Custa 169€
6- máscaras custa 26€. Tira as referências às edições especiais em todo o lado 
7- tabela de portes, pôr 05-08 (está 05-07)
8- tirar aquele parágrafo q tem a letra mais pequena: "O prazo de pagamento da pré-venda anunciado para 31 de outubro de 2026 já terminou. Contacta a autora para conhecer as condições atuais."
9- alinhar os botões de contacto com o texto por baixo e acrescentar enviar email cdenerelis@gmail.com
10- existem muitas referências à autora no website. ajusta o texto de forma a evitar isso: exemplo: "Depois, envia a lista à autora por WhatsApp."
