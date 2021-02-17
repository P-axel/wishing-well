// trouver les listes qui correspondent à un slug
export const getUserOwnWishlist = (wishlists, slug) => (
  wishlists.find((wishlist) => (wishlist.creator.slug === slug))
);

export const giftsDisplayIfCreator = (gifts, userSlug) => (
  gifts.filter((gift) => (gift.creator.slug === userSlug))
);
