export type MenuTag = "bestseller" | "spicy" | "new" | "chefs-pick";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  /** Optional bigger portion / full plate price. */
  priceFull?: number;
  categoryId: CategoryId;
  veg: boolean;
  emoji: string;
  tags?: MenuTag[];
  /** Drop a photo in /public/menu and point here, e.g. "/menu/steamed-momos.jpg". */
  image?: string;
};

export type CategoryId =
  | "momos"
  | "rolls"
  | "spring-rolls"
  | "noodles"
  | "burgers"
  | "sides"
  | "beverages";

export type Category = {
  id: CategoryId;
  name: string;
  blurb: string;
  emoji: string;
  accent: string;
};

export const categories: Category[] = [
  {
    id: "momos",
    name: "Momos",
    blurb: "Steamed, fried, tandoori and kurkure — with fiery red chutney.",
    emoji: "🥟",
    accent: "from-chilli-500 to-masala-400",
  },
  {
    id: "rolls",
    name: "Rolls",
    blurb: "Egg, paneer, chicken and veg rolls wrapped in flaky paratha.",
    emoji: "🌯",
    accent: "from-masala-500 to-chilli-500",
  },
  {
    id: "spring-rolls",
    name: "Spring Rolls",
    blurb: "Crunchy golden rolls stuffed with veggies, paneer or chicken.",
    emoji: "🥢",
    accent: "from-masala-400 to-masala-600",
  },
  {
    id: "noodles",
    name: "Noodles & Chinese",
    blurb: "Wok-tossed hakka, schezwan and chilli garlic noodles.",
    emoji: "🍜",
    accent: "from-chilli-600 to-charcoal-700",
  },
  {
    id: "burgers",
    name: "Burgers & Sandwiches",
    blurb: "Toasted buns, crispy patties and loads of cheese.",
    emoji: "🍔",
    accent: "from-masala-300 to-chilli-400",
  },
  {
    id: "sides",
    name: "Snacks & Sides",
    blurb: "Fries, honey chilli potato, chilli paneer and more.",
    emoji: "🍟",
    accent: "from-masala-400 to-chilli-600",
  },
  {
    id: "beverages",
    name: "Shakes & Beverages",
    blurb: "Thick shakes, mojitos, cold coffee and sweet lassi.",
    emoji: "🥤",
    accent: "from-chilli-400 to-masala-300",
  },
];

export const menu: MenuItem[] = [
  // ---------------- MOMOS ----------------
  {
    id: "steamed-veg-momos",
    name: "Steamed Veg Momos",
    description:
      "Eight hand-pleated dumplings stuffed with cabbage, carrot and spring onion. Served with red chutney and clear soup.",
    price: 70,
    priceFull: 120,
    categoryId: "momos",
    veg: true,
    emoji: "🥟",
    tags: ["bestseller"],
  },
  {
    id: "steamed-paneer-momos",
    name: "Steamed Paneer Momos",
    description: "Soft dumplings packed with grated paneer, ginger and herbs.",
    price: 90,
    priceFull: 150,
    categoryId: "momos",
    veg: true,
    emoji: "🥟",
  },
  {
    id: "steamed-chicken-momos",
    name: "Steamed Chicken Momos",
    description: "Juicy minced chicken filling, steamed to order.",
    price: 100,
    priceFull: 170,
    categoryId: "momos",
    veg: false,
    emoji: "🥟",
    tags: ["bestseller"],
  },
  {
    id: "fried-veg-momos",
    name: "Fried Veg Momos",
    description: "Golden fried till crisp outside, steaming hot inside.",
    price: 90,
    priceFull: 150,
    categoryId: "momos",
    veg: true,
    emoji: "🥟",
  },
  {
    id: "fried-chicken-momos",
    name: "Fried Chicken Momos",
    description: "Crisp fried chicken momos tossed with chaat masala.",
    price: 120,
    priceFull: 190,
    categoryId: "momos",
    veg: false,
    emoji: "🥟",
  },
  {
    id: "kurkure-momos",
    name: "Kurkure Momos",
    description:
      "Momos rolled in a crunchy corn-flake coating, deep fried and served with mayo dip.",
    price: 120,
    categoryId: "momos",
    veg: true,
    emoji: "🥟",
    tags: ["bestseller", "chefs-pick"],
  },
  {
    id: "tandoori-momos",
    name: "Tandoori Momos",
    description:
      "Marinated in spiced yoghurt and charred in the tandoor. Smoky, tangy, addictive.",
    price: 130,
    categoryId: "momos",
    veg: true,
    emoji: "🔥",
    tags: ["spicy", "chefs-pick"],
  },
  {
    id: "afghani-momos",
    name: "Afghani Momos",
    description: "Creamy cashew-garlic marinade, mild and rich.",
    price: 140,
    categoryId: "momos",
    veg: true,
    emoji: "🥟",
    tags: ["new"],
  },
  {
    id: "gravy-momos",
    name: "Chilli Gravy Momos",
    description: "Fried momos simmered in spicy schezwan onion gravy.",
    price: 140,
    categoryId: "momos",
    veg: true,
    emoji: "🍲",
    tags: ["spicy"],
  },
  {
    id: "cheese-corn-momos",
    name: "Cheese Corn Momos",
    description: "Melting mozzarella with sweet corn — a kids' favourite.",
    price: 120,
    categoryId: "momos",
    veg: true,
    emoji: "🧀",
  },
  {
    id: "momos-platter",
    name: "Momos Platter (16 pcs)",
    description:
      "Steamed, fried, kurkure and tandoori — four styles on one plate. Perfect for two.",
    price: 249,
    categoryId: "momos",
    veg: true,
    emoji: "🍽️",
    tags: ["chefs-pick"],
  },

  // ---------------- ROLLS ----------------
  {
    id: "egg-roll",
    name: "Egg Roll",
    description:
      "Classic Kolkata-style egg-coated paratha with onion, green chilli and tangy sauce.",
    price: 70,
    categoryId: "rolls",
    veg: false,
    emoji: "🥚",
    tags: ["bestseller"],
  },
  {
    id: "double-egg-roll",
    name: "Double Egg Roll",
    description: "Two eggs, double the wrap, double the satisfaction.",
    price: 95,
    categoryId: "rolls",
    veg: false,
    emoji: "🥚",
  },
  {
    id: "egg-chicken-roll",
    name: "Egg Chicken Roll",
    description: "Egg-coated paratha loaded with spicy chicken tikka chunks.",
    price: 140,
    categoryId: "rolls",
    veg: false,
    emoji: "🌯",
    tags: ["bestseller"],
  },
  {
    id: "paneer-roll",
    name: "Paneer Roll",
    description:
      "Tandoori paneer cubes, onion, capsicum and mint mayo in a flaky paratha.",
    price: 120,
    categoryId: "rolls",
    veg: true,
    emoji: "🧈",
    tags: ["bestseller"],
  },
  {
    id: "paneer-tikka-roll",
    name: "Paneer Tikka Roll",
    description: "Char-grilled tikka paneer with smoky chutney and crunchy salad.",
    price: 140,
    categoryId: "rolls",
    veg: true,
    emoji: "🌯",
  },
  {
    id: "veg-roll",
    name: "Veg Roll",
    description: "Crisp veggie filling with schezwan mayo, wrapped and grilled.",
    price: 80,
    categoryId: "rolls",
    veg: true,
    emoji: "🥬",
  },
  {
    id: "aloo-roll",
    name: "Masala Aloo Roll",
    description: "Spiced potato mash, pickled onion and green chutney.",
    price: 70,
    categoryId: "rolls",
    veg: true,
    emoji: "🥔",
  },
  {
    id: "chicken-tikka-roll",
    name: "Chicken Tikka Roll",
    description: "Boneless chicken tikka, onion rings and chilli garlic sauce.",
    price: 150,
    categoryId: "rolls",
    veg: false,
    emoji: "🍗",
    tags: ["spicy"],
  },
  {
    id: "chicken-seekh-roll",
    name: "Chicken Seekh Roll",
    description: "Juicy seekh kebab with mint chutney and sliced onion.",
    price: 160,
    categoryId: "rolls",
    veg: false,
    emoji: "🌯",
    tags: ["new"],
  },
  {
    id: "cheese-paneer-roll",
    name: "Cheese Paneer Roll",
    description: "Paneer plus a generous blanket of melted cheese.",
    price: 150,
    categoryId: "rolls",
    veg: true,
    emoji: "🧀",
  },

  // ---------------- SPRING ROLLS ----------------
  {
    id: "veg-spring-roll",
    name: "Veg Spring Roll",
    description:
      "Four crisp rolls stuffed with julienned vegetables and noodles. Served with sweet chilli dip.",
    price: 90,
    categoryId: "spring-rolls",
    veg: true,
    emoji: "🥢",
    tags: ["bestseller"],
  },
  {
    id: "paneer-spring-roll",
    name: "Paneer Spring Roll",
    description: "Shredded paneer and cabbage in a golden crunchy shell.",
    price: 110,
    categoryId: "spring-rolls",
    veg: true,
    emoji: "🥢",
  },
  {
    id: "chicken-spring-roll",
    name: "Chicken Spring Roll",
    description: "Minced chicken with spring onion, fried till shatteringly crisp.",
    price: 130,
    categoryId: "spring-rolls",
    veg: false,
    emoji: "🥢",
  },
  {
    id: "cheese-spring-roll",
    name: "Cheese Corn Spring Roll",
    description: "Gooey cheese and corn centre — best eaten hot.",
    price: 120,
    categoryId: "spring-rolls",
    veg: true,
    emoji: "🧀",
    tags: ["chefs-pick"],
  },
  {
    id: "schezwan-spring-roll",
    name: "Schezwan Spring Roll",
    description: "Tossed in house schezwan sauce for a fiery finish.",
    price: 120,
    categoryId: "spring-rolls",
    veg: true,
    emoji: "🌶️",
    tags: ["spicy"],
  },

  // ---------------- NOODLES & CHINESE ----------------
  {
    id: "veg-hakka-noodles",
    name: "Veg Hakka Noodles",
    description: "Wok-tossed noodles with crunchy vegetables and soy.",
    price: 100,
    priceFull: 160,
    categoryId: "noodles",
    veg: true,
    emoji: "🍜",
    tags: ["bestseller"],
  },
  {
    id: "schezwan-noodles",
    name: "Schezwan Noodles",
    description: "Hot, garlicky and unapologetically spicy.",
    price: 120,
    priceFull: 180,
    categoryId: "noodles",
    veg: true,
    emoji: "🌶️",
    tags: ["spicy"],
  },
  {
    id: "chilli-garlic-noodles",
    name: "Chilli Garlic Noodles",
    description: "Loaded with fried garlic and red chilli flakes.",
    price: 120,
    priceFull: 180,
    categoryId: "noodles",
    veg: true,
    emoji: "🧄",
  },
  {
    id: "paneer-noodles",
    name: "Paneer Chilli Noodles",
    description: "Hakka noodles topped with tossed chilli paneer.",
    price: 150,
    categoryId: "noodles",
    veg: true,
    emoji: "🍜",
  },
  {
    id: "chicken-hakka-noodles",
    name: "Chicken Hakka Noodles",
    description: "Shredded chicken, egg and vegetables in every bite.",
    price: 160,
    priceFull: 220,
    categoryId: "noodles",
    veg: false,
    emoji: "🍜",
  },
  {
    id: "veg-fried-rice",
    name: "Veg Fried Rice",
    description: "Long grain rice tossed with vegetables and pepper.",
    price: 100,
    priceFull: 160,
    categoryId: "noodles",
    veg: true,
    emoji: "🍚",
  },
  {
    id: "chicken-fried-rice",
    name: "Chicken Fried Rice",
    description: "Classic street-side fried rice with chunks of chicken.",
    price: 160,
    categoryId: "noodles",
    veg: false,
    emoji: "🍚",
  },
  {
    id: "chowmein-combo",
    name: "Noodles + Momos Combo",
    description: "Half plate hakka noodles with 6 steamed momos.",
    price: 179,
    categoryId: "noodles",
    veg: true,
    emoji: "🍱",
    tags: ["chefs-pick"],
  },

  // ---------------- BURGERS & SANDWICHES ----------------
  {
    id: "aloo-tikki-burger",
    name: "Aloo Tikki Burger",
    description: "Crisp potato patty, mint mayo, onion and tomato.",
    price: 60,
    categoryId: "burgers",
    veg: true,
    emoji: "🍔",
    tags: ["bestseller"],
  },
  {
    id: "cheese-burger",
    name: "Veg Cheese Burger",
    description: "Double cheese slice melted over a spiced veg patty.",
    price: 90,
    categoryId: "burgers",
    veg: true,
    emoji: "🧀",
  },
  {
    id: "paneer-burger",
    name: "Paneer Tikka Burger",
    description: "Grilled paneer patty with tandoori mayo and crunchy salad.",
    price: 120,
    categoryId: "burgers",
    veg: true,
    emoji: "🍔",
  },
  {
    id: "chicken-burger",
    name: "Crispy Chicken Burger",
    description: "Fried chicken fillet, lettuce and peri mayo.",
    price: 140,
    categoryId: "burgers",
    veg: false,
    emoji: "🍔",
    tags: ["chefs-pick"],
  },
  {
    id: "grilled-sandwich",
    name: "Veg Grilled Sandwich",
    description: "Triple-layer sandwich with potato, cheese and chutney.",
    price: 90,
    categoryId: "burgers",
    veg: true,
    emoji: "🥪",
  },
  {
    id: "cheese-chilli-sandwich",
    name: "Cheese Chilli Sandwich",
    description: "Loaded cheese with green chilli and herbs, grilled crisp.",
    price: 110,
    categoryId: "burgers",
    veg: true,
    emoji: "🥪",
  },

  // ---------------- SNACKS & SIDES ----------------
  {
    id: "salted-fries",
    name: "Salted French Fries",
    description: "Golden fries with a pinch of rock salt and pepper.",
    price: 70,
    categoryId: "sides",
    veg: true,
    emoji: "🍟",
  },
  {
    id: "peri-peri-fries",
    name: "Peri Peri Fries",
    description: "Dusted with tangy peri peri masala.",
    price: 90,
    categoryId: "sides",
    veg: true,
    emoji: "🍟",
    tags: ["bestseller"],
  },
  {
    id: "cheese-loaded-fries",
    name: "Cheese Loaded Fries",
    description: "Fries drowned in cheese sauce and jalapeño.",
    price: 130,
    categoryId: "sides",
    veg: true,
    emoji: "🧀",
  },
  {
    id: "honey-chilli-potato",
    name: "Honey Chilli Potato",
    description: "Crispy potato fingers glazed in honey chilli sauce and sesame.",
    price: 120,
    categoryId: "sides",
    veg: true,
    emoji: "🍯",
    tags: ["bestseller", "chefs-pick"],
  },
  {
    id: "chilli-paneer",
    name: "Chilli Paneer (Dry)",
    description: "Paneer cubes tossed with capsicum, onion and chilli sauce.",
    price: 160,
    categoryId: "sides",
    veg: true,
    emoji: "🌶️",
    tags: ["spicy"],
  },
  {
    id: "chilli-chicken",
    name: "Chilli Chicken (Dry)",
    description: "Batter-fried chicken in a sticky spicy glaze.",
    price: 190,
    categoryId: "sides",
    veg: false,
    emoji: "🍗",
    tags: ["spicy"],
  },
  {
    id: "veg-manchurian",
    name: "Veg Manchurian",
    description: "Fried vegetable balls in tangy garlic gravy.",
    price: 130,
    categoryId: "sides",
    veg: true,
    emoji: "🍲",
  },
  {
    id: "crispy-corn",
    name: "Crispy Corn",
    description: "Fried sweet corn tossed with onion, coriander and lemon.",
    price: 110,
    categoryId: "sides",
    veg: true,
    emoji: "🌽",
    tags: ["new"],
  },

  // ---------------- BEVERAGES ----------------
  {
    id: "cold-coffee",
    name: "Thick Cold Coffee",
    description: "Blended with ice cream and topped with chocolate.",
    price: 90,
    categoryId: "beverages",
    veg: true,
    emoji: "☕",
    tags: ["bestseller"],
  },
  {
    id: "chocolate-shake",
    name: "Chocolate Shake",
    description: "Rich cocoa thick shake with a brownie crumble.",
    price: 110,
    categoryId: "beverages",
    veg: true,
    emoji: "🥤",
  },
  {
    id: "oreo-shake",
    name: "Oreo Thick Shake",
    description: "Cookies and cream blended thick, served chilled.",
    price: 120,
    categoryId: "beverages",
    veg: true,
    emoji: "🍪",
    tags: ["chefs-pick"],
  },
  {
    id: "mango-lassi",
    name: "Mango Lassi",
    description: "Sweet curd blended with alphonso mango pulp.",
    price: 80,
    categoryId: "beverages",
    veg: true,
    emoji: "🥭",
  },
  {
    id: "virgin-mojito",
    name: "Virgin Mojito",
    description: "Lemon, mint and soda over crushed ice.",
    price: 80,
    categoryId: "beverages",
    veg: true,
    emoji: "🍋",
  },
  {
    id: "masala-chai",
    name: "Kulhad Masala Chai",
    description: "Slow-brewed chai with ginger and cardamom.",
    price: 30,
    categoryId: "beverages",
    veg: true,
    emoji: "🍵",
  },
];

export const getCategory = (id: CategoryId) =>
  categories.find((category) => category.id === id);

export const getItemsByCategory = (id: CategoryId) =>
  menu.filter((item) => item.categoryId === id);

export const bestsellers = menu.filter((item) =>
  item.tags?.includes("bestseller"),
);

export const findItem = (id: string) => menu.find((item) => item.id === id);

export const tagLabels: Record<MenuTag, string> = {
  bestseller: "Bestseller",
  spicy: "Extra spicy",
  new: "New",
  "chefs-pick": "Chef's pick",
};
