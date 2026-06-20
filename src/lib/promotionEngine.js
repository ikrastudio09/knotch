import PromotionModel from "@/Models/PromotionalModel";

/**
 * Fetches all currently active and valid promotions from the DB.
 */
export async function getActivePromotions() {
  const now = new Date();
  return await PromotionModel.find({
    active: true,
    $or: [{ validFrom: { $lte: now } }, { validFrom: null }],
    $or: [{ validTill: { $gte: now } }, { validTill: null }],
  }).populate("categoryID");
}

/**
 * For each active promotion, count how many qualifying cart items exist
 * and compute progress toward unlocking the bundle.
 *
 * @param {Array} cart          - user.cartData (populated with productID)
 * @param {Array} promotions    - active promotions from getActivePromotions()
 * @returns {Array}             - tracker objects for every promotion
 */
export function calculatePromotionProgress(cart, promotions) {
  return promotions.map((promo) => {
    const promoCategory = promo.categoryID._id.toString();

    // Sum quantities of cart items belonging to this promotion's category
    const qualifyingItems = cart.filter((item) => {
      const itemCategory = item.productID.productCategory?.toString();
      return itemCategory === promoCategory;
    });

    const currentQuantity = qualifyingItems.reduce(
      (sum, item) => sum + item.productQuantity,
      0
    );

    const requiredQuantity = promo.requiredQuantity;
    const unlocked = currentQuantity >= requiredQuantity;

    // Potential savings: what the qualifying items cost vs bundle price
    // Use the first requiredQuantity items (sorted cheapest-first to max savings)
    let potentialSavings = 0;

    if (unlocked) {
      const sortedItems = [...qualifyingItems].sort(
        (a, b) =>
          a.productID.productSellingPrice - b.productID.productSellingPrice
      );

      let counted = 0;
      let originalCostOfBundle = 0;

      for (const item of sortedItems) {
        const take = Math.min(
          item.productQuantity,
          requiredQuantity - counted
        );
        originalCostOfBundle += item.productID.productSellingPrice * take;
        counted += take;
        if (counted >= requiredQuantity) break;
      }

      potentialSavings = Math.max(0, originalCostOfBundle - promo.bundlePrice);
    }

    return {
      promotionId: promo._id.toString(),
      title: promo.title,
      bundlePrice: promo.bundlePrice,
      requiredQuantity,
      currentQuantity,
      remainingQuantity: Math.max(0, requiredQuantity - currentQuantity),
      unlocked,
      potentialSavings,
      categoryName: promo.categoryID.categoryName,
    };
  });
}

/**
 * Applies a single selected bundle promotion to the cart.
 * Only runs if selectedPromotionId is provided and that promotion is unlocked.
 *
 * @param {Array}  cart                 - user.cartData (populated)
 * @param {Array}  promotions           - active promotions
 * @param {string} selectedPromotionId  - the ID the user chose
 * @returns {{ totalDiscount, appliedPromotions }}
 */
export function applyBundlePromotions(cart, promotions, selectedPromotionId) {
  if (!selectedPromotionId) {
    return { totalDiscount: 0, appliedPromotions: [] };
  }

  const promo = promotions.find(
    (p) => p._id.toString() === selectedPromotionId.toString()
  );

  if (!promo) {
    throw new Error("Selected promotion not found or no longer active");
  }

  const promoCategory = promo.categoryID._id
    ? promo.categoryID._id.toString()
    : promo.categoryID.toString();

  const qualifyingItems = cart.filter((item) => {
    const itemCategory = item.productID.productCategory?.toString();
    return itemCategory === promoCategory;
  });

  const currentQuantity = qualifyingItems.reduce(
    (sum, item) => sum + item.productQuantity,
    0
  );

  if (currentQuantity < promo.requiredQuantity) {
    throw new Error(
      `Promotion "${promo.title}" requires ${promo.requiredQuantity} items from ${promo.categoryID.categoryName}. You only have ${currentQuantity}.`
    );
  }

  // Apply bundle to the cheapest requiredQuantity items to maximise savings
  const sortedItems = [...qualifyingItems].sort(
    (a, b) =>
      a.productID.productSellingPrice - b.productID.productSellingPrice
  );

  let counted = 0;
  let originalCostOfBundle = 0;

  for (const item of sortedItems) {
    const take = Math.min(
      item.productQuantity,
      promo.requiredQuantity - counted
    );
    originalCostOfBundle += item.productID.productSellingPrice * take;
    counted += take;
    if (counted >= promo.requiredQuantity) break;
  }

  const discount = Math.max(0, originalCostOfBundle - promo.bundlePrice);

  return {
    totalDiscount: discount,
    appliedPromotions: [
      {
        promotionId: promo._id,
        title: promo.title,
        bundlePrice: promo.bundlePrice,
        requiredQuantity: promo.requiredQuantity,
        discount,
      },
    ],
  };
}