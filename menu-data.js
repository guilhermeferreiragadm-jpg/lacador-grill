/* =============================================================
   Laçador Grill — dados do restaurante e do cardápio.
   Este é o único arquivo que precisa ser editado no dia a dia.

   ATENÇÃO — CONFERIR COM O RESTAURANTE ANTES DE PUBLICAR:
   - Endereço confirmado pelo restaurante em 29/08/2026: 15771. As fontes
     públicas divergiam entre 15657, 15711 e 15771.
   - Horário e preço do buffet foram confirmados pelo restaurante.
   - O restaurante passou a trabalhar SÓ por peso (confirmado em 29/08/2026).
     A listagem de pratos saiu do site; sobraram as duas faixas de preço.
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
    street: "15771 S Apopka Vineland Rd (SR 535)",
    detail: "Lake Buena Vista Factory Stores — Food Court",
    city: "Orlando",
    region: "FL",
    postalCode: "32821",
    country: "US",
  },
};

RESTAURANT.mapsQuery = "Lacador Grill, 15771 S Apopka Vineland Rd, Orlando, FL 32821";
RESTAURANT.mapsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(RESTAURANT.mapsQuery);
RESTAURANT.mapsEmbed =
  "https://maps.google.com/maps?q=" + encodeURIComponent(RESTAURANT.mapsQuery) + "&z=16&output=embed";

/* Horário de funcionamento no fuso do restaurante (America/New_York).
   CONFIRMADO pelo restaurante em 29/08/2026: todos os dias, 11h30 às 16h.
   day: 0 = domingo ... 6 = sábado. Minutos desde a meia-noite. */
const HOURS = [0, 1, 2, 3, 4, 5, 6].map((day) => ({
  day,
  open: 11 * 60 + 30,
  close: 16 * 60,
}));

/* Buffet por peso — preços CONFIRMADOS pelo restaurante em 29/08/2026.
   A faixa do fim de semana também vale em feriados, e feriado não dá para
   deduzir do dia da semana. Por isso o site mostra as duas faixas lado a
   lado em vez de tentar adivinhar qual vale hoje: um preço errado na tela
   é pior do que o cliente ler duas linhas. */
const BUFFET = {
  tiers: [
    { pricePerLb: 15.99, pt: "Segunda a quinta", en: "Monday to Thursday" },
    { pricePerLb: 16.99, pt: "Sexta a domingo e feriados", en: "Friday to Sunday and holidays" },
  ],
};
