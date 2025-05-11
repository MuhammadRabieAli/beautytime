
export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  shortDescription: string;
  image: string;
  category: string;
  featured: boolean;
  inStock: boolean;
};

export const products: Product[] = [
  {
    id: "p1",
    name: "Elysian Rose",
    price: 185,
    description: "A luxurious blend of Damascus rose, peony, and warm amber. Elysian Rose captures the essence of a Mediterranean garden at sunset. Notes of bergamot and blackcurrant add a fresh, fruity opening that mellows into a heart of rich florals. The base reveals sandalwood and musk for a lingering, sophisticated finish.",
    shortDescription: "Opulent rose with amber undertones",
    image: "/assets/perfume1.jpg",
    category: "floral",
    featured: true,
    inStock: true
  },
  {
    id: "p2",
    name: "Amber Noir",
    price: 210,
    description: "An intoxicating oriental fragrance built around precious amber and dark woods. Amber Noir opens with spicy notes of cardamom and saffron, revealing a heart of Turkish rose and jasmine. The base is rich with vanilla, patchouli, and oud, creating a mysterious and sensual experience that lasts throughout the day.",
    shortDescription: "Mysterious amber with spicy undertones",
    image: "/assets/perfume2.jpg",
    category: "oriental",
    featured: true,
    inStock: true
  },
  {
    id: "p3",
    name: "Velvet Orchid",
    price: 165,
    description: "A seductive composition centered around rare orchid species. The fragrance begins with mandarin and honey, blooming into a heart of black orchid and jasmine. Base notes of suede, vanilla, and sandalwood create a smooth, velvety texture that embodies understated luxury and modern femininity.",
    shortDescription: "Sensual orchid and smooth vanilla",
    image: "/assets/perfume3.jpg",
    category: "floral",
    featured: false,
    inStock: true
  },
  {
    id: "p4",
    name: "Aqua Sublime",
    price: 155,
    description: "A refreshing marine fragrance that captures the essence of Mediterranean coastlines. Aqua Sublime opens with bright citrus and sea notes, developing into a heart of lavender and rosemary. The dry down reveals cedar and white musk, evoking the feeling of warm sun on coastal rocks.",
    shortDescription: "Refreshing marine with citrus notes",
    image: "/assets/perfume4.jpg",
    category: "fresh",
    featured: false,
    inStock: true
  },
  {
    id: "p5",
    name: "Oud Royale",
    price: 295,
    description: "A majestic fragrance centered around precious oud wood. This opulent perfume opens with saffron and spices, unfolding into a rich heart of Bulgarian rose and patchouli. The base is dominated by aged oud, amber, and leather, creating a long-lasting, regal impression that embodies true luxury.",
    shortDescription: "Opulent oud with rose and spices",
    image: "/assets/perfume5.jpg",
    category: "woody",
    featured: true,
    inStock: true
  },
  {
    id: "p6",
    name: "Solar Bloom",
    price: 175,
    description: "A radiant floral fragrance inspired by sun-drenched gardens. Solar Bloom features bright bergamot and mandarin, leading to a luminous heart of orange blossom and jasmine. The base of warm amber and musk creates a golden glow that embodies the feeling of perfect summer days.",
    shortDescription: "Bright florals with citrus and amber",
    image: "/assets/perfume6.jpg",
    category: "floral",
    featured: false,
    inStock: true
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};
