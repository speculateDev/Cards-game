import type { Card } from "../schemas";

function shuffle(cards: Card[] | undefined) {
  if (!cards || !cards.length || cards.length <= 0) return [];

  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards;
}

export default shuffle;
