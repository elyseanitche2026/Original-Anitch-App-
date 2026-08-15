import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Grille de départ, à valider/ajuster par Thimothee avant mise en prod.
 * Tranches en mètres, prix en FCFA. Ecart de négociation par défaut : ±20%.
 */
const TIERS = [
  { minDistanceM: 0, maxDistanceM: 2000, basePrice: 1000 },
  { minDistanceM: 2000, maxDistanceM: 5000, basePrice: 1500 },
  { minDistanceM: 5000, maxDistanceM: 10000, basePrice: 2000 },
  { minDistanceM: 10000, maxDistanceM: 20000, basePrice: 3000 },
  { minDistanceM: 20000, maxDistanceM: null, basePrice: 4500 },
];

async function main() {
  const existing = await prisma.priceGridTier.count();
  if (existing > 0) {
    console.log("ℹ️ Grille tarifaire déjà initialisée, seed ignoré.");
    return;
  }

  for (const tier of TIERS) {
    await prisma.priceGridTier.create({ data: { ...tier, maxNegotiationPct: 0.2, isActive: true } });
  }
  console.log(`✅ Grille tarifaire initialisée (${TIERS.length} tranches)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
