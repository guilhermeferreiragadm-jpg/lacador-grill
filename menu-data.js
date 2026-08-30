/* =============================================================
   Laçador Grill — dados do restaurante e do cardápio.
   Este é o único arquivo que precisa ser editado no dia a dia.

   ATENÇÃO — CONFERIR COM O RESTAURANTE ANTES DE PUBLICAR:
   - O número da rua aparece como 15657, 15711 e 15771 em fontes
     diferentes. Abaixo está o endereço oficial do Lake Buena Vista
     Factory Stores (15657). Confirmar o número da loja no food court.
   - Os horários vieram de agregadores, não do perfil oficial.
   - Os PRATOS EXECUTIVOS são reais (fonte: DoorDash do restaurante).
     As demais categorias ainda são exemplos — substituir pelo balcão real.
   - O DoorDash mostra um modelo de prato feito com preço fixo, não
     buffet por peso. Confirmar se os dois coexistem.
   ============================================================= */

const RESTAURANT = {
  whatsapp: "14077902932",
  phone: "+14077902932",
  phoneDisplay: "(407) 790-2932",
  email: "lacadorgrillorlando@gmail.com",
  instagram: "https://www.instagram.com/lacadorgrill/",
  facebook: "https://www.facebook.com/lacadorgrill/",
  timeZone: "America/New_York",
  address: {
    street: "15657 S Apopka Vineland Rd (SR 535)",
    detail: "Lake Buena Vista Factory Stores — Food Court",
    city: "Orlando",
    region: "FL",
    postalCode: "32821",
    country: "US",
  },
};

RESTAURANT.mapsQuery = "Lacador Grill, 15657 S Apopka Vineland Rd, Orlando, FL 32821";
RESTAURANT.mapsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(RESTAURANT.mapsQuery);
RESTAURANT.mapsEmbed =
  "https://maps.google.com/maps?q=" + encodeURIComponent(RESTAURANT.mapsQuery) + "&z=16&output=embed";

/* Horário de funcionamento no fuso do restaurante (America/New_York).
   day: 0 = domingo ... 6 = sábado. Minutos desde a meia-noite. */
const HOURS = [
  { day: 0, open: 11 * 60, close: 19 * 60 },
  { day: 1, open: 10 * 60, close: 20 * 60 },
  { day: 2, open: 10 * 60, close: 20 * 60 },
  { day: 3, open: 10 * 60, close: 20 * 60 },
  { day: 4, open: 10 * 60, close: 20 * 60 },
  { day: 5, open: 10 * 60, close: 20 * 60 },
  { day: 6, open: 10 * 60, close: 20 * 60 },
];

/* Preço do buffet por peso — CONFIRMAR. */
const BUFFET = { pricePerLb: 12.99 };

const MENU_CATEGORIES = [
  { id: "executivos", pt: "Pratos executivos", en: "Executive Plates" },
  { id: "churrasco", pt: "Churrasco", en: "From the Grill" },
  { id: "quentes", pt: "Pratos quentes", en: "Hot Dishes" },
  { id: "acompanhamentos", pt: "Acompanhamentos", en: "Sides" },
  { id: "salgados", pt: "Salgados", en: "Snacks" },
  { id: "sobremesas", pt: "Sobremesas", en: "Desserts" },
  { id: "bebidas", pt: "Bebidas", en: "Drinks" },
];

/* price: null  -> item entra no buffet por peso (mostra "por peso" / "by weight")
   price: 4.5   -> item vendido por unidade */
const MENU = [
  /* ---- Pratos executivos ----
     CONFIRMADOS: nomes e preços vieram da listagem do próprio restaurante
     no DoorDash (consultada em 29/08/2026). Acompanham arroz, feijão,
     fritas e salada, salvo indicação em contrário.
     Faltam preços de "Frango à parmegiana" e "Filé de tilápia". */
  {
    id: "picanha-3", cat: "executivos", price: 59.90, highlight: true,
    pt: { name: "Picanha para 3 pessoas", desc: "Picanha, linguiça, arroz, feijão, fritas, salada e mandioca frita." },
    en: { name: "Picanha Plate for 3", desc: "Picanha, sausage, rice, beans, French fries, salad and fried cassava." },
  },
  {
    id: "picanha-individual", cat: "executivos", price: 21.99, highlight: true,
    pt: { name: "Picanha", desc: "Com arroz, feijão, fritas e salada." },
    en: { name: "Top Sirloin", desc: "Comes with rice, beans, fries and salad." },
  },
  {
    id: "file-parmegiana", cat: "executivos", price: 20.99,
    pt: { name: "Filé à parmegiana", desc: "Com arroz, fritas e salada. Não acompanha feijão e farofa." },
    en: { name: "Meat Parmegiana", desc: "Comes with rice, fries and salad. Beans and farofa not included." },
  },
  {
    id: "estrogonofe-carne", cat: "executivos", price: 20.99,
    pt: { name: "Estrogonofe de carne", desc: "Com arroz, fritas e salada. Não acompanha feijão e farofa." },
    en: { name: "Beef Stroganoff", desc: "Comes with rice, fries and salad. Beans and farofa not included." },
  },
  {
    id: "estrogonofe-frango-exec", cat: "executivos", price: 19.99,
    pt: { name: "Estrogonofe de frango", desc: "Com arroz, fritas e salada." },
    en: { name: "Chicken Stroganoff", desc: "Comes with rice, fries and salad." },
  },
  {
    id: "bife-a-cavalo", cat: "executivos", price: 18.99,
    pt: { name: "Bife a cavalo", desc: "Bife com ovo, arroz, feijão, fritas e salada." },
    en: { name: "Steak with Egg", desc: "Steak and egg with rice, beans, fries and salad." },
  },
  {
    id: "frango-milanesa", cat: "executivos", price: 18.99,
    pt: { name: "Frango à milanesa", desc: "Com arroz, feijão, fritas e salada." },
    en: { name: "Breaded Chicken", desc: "Comes with rice, beans, fries and salad." },
  },
  {
    id: "bife-acebolado", cat: "executivos", price: 18.99,
    pt: { name: "Bife acebolado", desc: "Com arroz, feijão, fritas e salada." },
    en: { name: "Beef with Onions", desc: "Comes with rice, beans, fries and salad." },
  },
  {
    id: "linguica-exec", cat: "executivos", price: 17.99,
    pt: { name: "Linguiça", desc: "Com arroz, feijão, fritas e salada." },
    en: { name: "Brazilian Sausage", desc: "Comes with rice, beans, fries and salad." },
  },

  // ---- Churrasco (EXEMPLOS — substituir pelo balcão real) ----
  {
    id: "picanha", cat: "churrasco", price: null, highlight: true,
    pt: { name: "Picanha na brasa", desc: "O corte mais querido do churrasco brasileiro, grelhado na brasa e fatiado na hora." },
    en: { name: "Grilled Picanha", desc: "Brazil's favorite cut — top sirloin cap, fire-grilled and sliced to order." },
  },
  {
    id: "fraldinha", cat: "churrasco", price: null,
    pt: { name: "Fraldinha", desc: "Macia e suculenta, temperada só com sal grosso." },
    en: { name: "Flank Steak", desc: "Tender and juicy, seasoned simply with coarse salt." },
  },
  {
    id: "costela", cat: "churrasco", price: null, highlight: true,
    pt: { name: "Costela bovina", desc: "Assada em fogo baixo por horas, até desmanchar no garfo." },
    en: { name: "Beef Short Rib", desc: "Slow-roasted for hours until it falls off the bone." },
  },
  {
    id: "linguica", cat: "churrasco", price: null,
    pt: { name: "Linguiça toscana", desc: "Linguiça artesanal de porco, grelhada na brasa." },
    en: { name: "Brazilian Pork Sausage", desc: "House-style toscana sausage, straight off the grill." },
  },
  {
    id: "frango-bacon", cat: "churrasco", price: null,
    pt: { name: "Frango com bacon", desc: "Filé de frango enrolado em bacon e grelhado." },
    en: { name: "Bacon-Wrapped Chicken", desc: "Chicken fillet wrapped in bacon and grilled." },
  },
  {
    id: "coracao", cat: "churrasco", price: null,
    pt: { name: "Coração de frango", desc: "Clássico de churrascaria, no espeto e bem temperado." },
    en: { name: "Chicken Hearts", desc: "A churrascaria classic, skewered and well seasoned." },
  },

  // ---- Pratos quentes ----
  {
    id: "feijoada", cat: "quentes", price: null, highlight: true,
    pt: { name: "Feijoada", desc: "O prato nacional: feijão preto com carnes defumadas, servido com arroz, couve e laranja." },
    en: { name: "Feijoada", desc: "Brazil's national dish — black bean stew with smoked meats, served with rice, collard greens and orange." },
  },
  {
    id: "estrogonofe", cat: "quentes", price: null,
    pt: { name: "Estrogonofe de frango", desc: "Cremoso, do jeito brasileiro, com batata palha por cima." },
    en: { name: "Chicken Stroganoff", desc: "Creamy Brazilian-style stroganoff topped with crispy shoestring potatoes." },
  },
  {
    id: "escondidinho", cat: "quentes", price: null,
    pt: { name: "Escondidinho de carne seca", desc: "Purê de mandioca gratinado com carne seca desfiada." },
    en: { name: "Carne Seca Shepherd's Pie", desc: "Baked cassava purée with shredded sun-dried beef." },
  },
  {
    id: "moqueca", cat: "quentes", price: null,
    pt: { name: "Moqueca de peixe", desc: "Peixe cozido no leite de coco com dendê, pimentões e coentro." },
    en: { name: "Fish Moqueca", desc: "Fish simmered in coconut milk with palm oil, peppers and cilantro." },
  },

  // ---- Acompanhamentos ----
  {
    id: "arroz", cat: "acompanhamentos", price: null,
    pt: { name: "Arroz branco", desc: "Soltinho, feito no alho, como em casa." },
    en: { name: "White Rice", desc: "Fluffy garlic rice, just like at home." },
  },
  {
    id: "feijao-tropeiro", cat: "acompanhamentos", price: null,
    pt: { name: "Feijão tropeiro", desc: "Feijão com farinha, bacon, linguiça e ovos." },
    en: { name: "Feijão Tropeiro", desc: "Beans tossed with cassava flour, bacon, sausage and egg." },
  },
  {
    id: "farofa", cat: "acompanhamentos", price: null,
    pt: { name: "Farofa", desc: "Farinha de mandioca tostada na manteiga — companhia obrigatória do churrasco." },
    en: { name: "Farofa", desc: "Toasted cassava flour in butter — the essential churrasco side." },
  },
  {
    id: "mandioca", cat: "acompanhamentos", price: null,
    pt: { name: "Mandioca frita", desc: "Crocante por fora, macia por dentro." },
    en: { name: "Fried Cassava", desc: "Crispy outside, soft inside." },
  },
  {
    id: "vinagrete", cat: "acompanhamentos", price: null,
    pt: { name: "Vinagrete", desc: "Tomate, cebola e pimentão picados no vinagre." },
    en: { name: "Vinagrete", desc: "Chopped tomato, onion and pepper in vinaigrette." },
  },

  // ---- Salgados ----
  {
    id: "pao-de-queijo", cat: "salgados", price: 3.5, highlight: true,
    pt: { name: "Pão de queijo", desc: "Quentinho, feito com polvilho e queijo. Impossível comer um só." },
    en: { name: "Pão de Queijo", desc: "Warm Brazilian cheese bread. Nobody stops at one." },
  },
  {
    id: "coxinha", cat: "salgados", price: 4.5,
    pt: { name: "Coxinha de frango", desc: "Massa crocante recheada com frango desfiado e catupiry." },
    en: { name: "Coxinha", desc: "Crispy teardrop croquette filled with shredded chicken and cream cheese." },
  },
  {
    id: "pastel", cat: "salgados", price: 5.5,
    pt: { name: "Pastel de carne", desc: "Massa fina e crocante, frita na hora." },
    en: { name: "Beef Pastel", desc: "Thin, crispy turnover fried to order." },
  },
  {
    id: "kibe", cat: "salgados", price: 4.5,
    pt: { name: "Kibe", desc: "Trigo e carne moída temperados, fritos até dourar." },
    en: { name: "Kibe", desc: "Seasoned bulgur and ground beef, fried golden." },
  },
  {
    id: "empada", cat: "salgados", price: 4.5,
    pt: { name: "Empada de frango", desc: "Massa amanteigada com recheio cremoso de frango." },
    en: { name: "Chicken Empada", desc: "Buttery crust with a creamy chicken filling." },
  },

  // ---- Sobremesas ----
  {
    id: "brigadeiro", cat: "sobremesas", price: 2.5, highlight: true,
    pt: { name: "Brigadeiro", desc: "Chocolate e leite condensado. A sobremesa mais brasileira que existe." },
    en: { name: "Brigadeiro", desc: "Chocolate and condensed milk truffle — the most Brazilian dessert there is." },
  },
  {
    id: "pudim", cat: "sobremesas", price: 6.5,
    pt: { name: "Pudim de leite", desc: "Cremoso, com calda de caramelo." },
    en: { name: "Flan", desc: "Silky condensed-milk flan with caramel sauce." },
  },
  {
    id: "acai", cat: "sobremesas", price: 9.5,
    pt: { name: "Açaí na tigela", desc: "Açaí cremoso com granola e banana." },
    en: { name: "Açaí Bowl", desc: "Creamy açaí topped with granola and banana." },
  },
  {
    id: "beijinho", cat: "sobremesas", price: 2.5,
    pt: { name: "Beijinho", desc: "Docinho de coco com leite condensado." },
    en: { name: "Beijinho", desc: "Coconut and condensed milk sweet." },
  },

  // ---- Bebidas ----
  {
    id: "guarana", cat: "bebidas", price: 3.5,
    pt: { name: "Guaraná Antarctica", desc: "O refrigerante brasileiro, gelado." },
    en: { name: "Guaraná Antarctica", desc: "Brazil's own soda, served ice cold." },
  },
  {
    id: "suco-maracuja", cat: "bebidas", price: 5.5,
    pt: { name: "Suco de maracujá", desc: "Natural, feito na hora." },
    en: { name: "Passion Fruit Juice", desc: "Fresh, made to order." },
  },
  {
    id: "agua-coco", cat: "bebidas", price: 4.5,
    pt: { name: "Água de coco", desc: "Natural e gelada." },
    en: { name: "Coconut Water", desc: "Natural and chilled." },
  },
  {
    id: "cafe", cat: "bebidas", price: 2.5,
    pt: { name: "Cafezinho", desc: "Café brasileiro, curto e forte." },
    en: { name: "Brazilian Coffee", desc: "Short, strong and sweet." },
  },
];
