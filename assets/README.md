# Imagens do site

## O que está aqui

- `logo.jpg` — brasão do restaurante, 150×150. Veio da foto de perfil do
  Instagram, que é o maior tamanho servido publicamente. Serve de favicon,
  mas é pequeno demais para preview de link.
- `fotos/` — 5 fotos reais tiradas do Instagram do restaurante em 29/08/2026.
  Foram recortadas para remover os textos sobrepostos dos posts.

| Arquivo | Origem | Onde aparece |
|---|---|---|
| `fotos/balcao.jpg` | post de 06/04/2026 | fundo de "Como funciona" e galeria |
| `fotos/linguica.jpg` | post de 06/08/2026 | galeria |
| `fotos/prato.jpg` | post de 14/08/2026 | galeria e preview de compartilhamento |
| `fotos/feijao.jpg` | post de 24/08/2026 | galeria |
| `fotos/salao.jpg` | post de 17/08/2026 | seção de eventos |

## Limitações a resolver com o restaurante

1. **Resolução.** O Instagram serve no máximo 640px de largura. Os tamanhos de
   exibição no site foram escolhidos para ficar perto de 1× e evitar borrão,
   mas em tela retina ainda amaciam. Peça os arquivos originais.
2. **Preview de link.** O `og:image` aponta para `fotos/prato.jpg` (360×262).
   O ideal é uma imagem 1200×630 feita para isso.
3. **Pessoas identificáveis.** `fotos/salao.jpg` mostra clientes no salão. É
   uma foto de divulgação publicada pelo próprio restaurante, mas confirme se
   eles têm autorização de uso de imagem antes de publicar.
4. **Fotos descartadas.** Dois posts tinham pessoas em primeiro plano e não
   foram usados. Outros quatro tinham texto sobreposto que não dava para
   recortar sem estragar o enquadramento. A foto da tábua de picanha, que
   estava no hero, foi retirada a pedido.
