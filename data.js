// =============================================================
// 1) DATA
// meals = an ARRAY of meal OBJECTS.
//   strings   -> name, description, cuisine, difficulty, image
//   numbers   -> prepTime, cookTime, servings, rating, reviews
//   arrays    -> ingredients, instructions, tips
//   an object -> nutrition { calories, protein, carbs, fat, fiber, sodium }
//   an object -> art (colors used to draw the dish illustration)
//
// `image` = path to a real photo (optional). If the file is missing,
// the app shows the illustration drawn in code instead.
// =============================================================
const meals = [
  {
    name: "Chicken Tikka Masala",
    description: "Rich and creamy Indian curry with tender chicken pieces",
    image: "images/chicken-tikka-masala.jpg",
    rating: 4.7,
    reviews: 389,
    cuisine: "Asian",
    difficulty: "Intermediate",
    prepTime: 20,
    cookTime: 30,
    servings: 4,
    ingredients: [
      "600g chicken breast, cubed",
      "1 cup plain yogurt",
      "2 tablespoons tikka masala paste",
      "400ml coconut cream",
      "1 onion, diced",
      "4 cloves garlic, minced",
      "2 tablespoons ginger, grated",
      "400g canned tomatoes",
      "Fresh cilantro for garnish"
    ],
    instructions: [
      "Mix the chicken with the yogurt and tikka masala paste. Marinate for 20 minutes.",
      "Sear the chicken in a hot pan until golden, then set it aside.",
      "Fry the onion until soft, then add the garlic and ginger for 1 minute.",
      "Add the canned tomatoes and simmer for 10 minutes.",
      "Stir in the coconut cream and the chicken. Simmer 10 more minutes.",
      "Garnish with cilantro and serve with rice or naan."
    ],
    nutrition: { calories: 480, protein: 36, carbs: 18, fat: 28, fiber: 4, sodium: 720 },
    tips: [
      "Marinate overnight for the most tender chicken.",
      "Finish with a pinch of garam masala for extra aroma."
    ],
    art: { style: "stew", bg: ["#f0d8b0", "#c4965e"], sauce: "#d4501c", swirl: "#f6cfa8", chunk: "#b23d12", garnish: "#3f8f3a" }
  },
  {
    name: "Creamy Spaghetti Carbonara",
    description: "A classic Italian pasta dish with eggs, cheese, and pancetta",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/c987e47793-062e728ad4ccc343589c.png",
    rating: 4.8,
    reviews: 234,
    cuisine: "Italian",
    difficulty: "Easy",
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    ingredients: [
      "400g spaghetti pasta",
      "150g pancetta or beef bacon, diced",
      "3 eggs plus 1 egg yolk",
      "1 cup grated parmesan cheese",
      "2 cloves garlic",
      "Black pepper and salt"
    ],
    instructions: [
      "Boil the spaghetti in salted water until al dente. Keep a cup of pasta water.",
      "Fry the pancetta with the garlic until crispy.",
      "Whisk the eggs, yolk, parmesan and plenty of black pepper.",
      "Toss the hot pasta with the pancetta off the heat.",
      "Add the egg mixture and a splash of pasta water, stirring fast until creamy."
    ],
    nutrition: { calories: 520, protein: 28, carbs: 62, fat: 18, fiber: 3, sodium: 680 },
    tips: [
      "Take the pan off the heat before adding the eggs, or they will scramble.",
      "The pasta water makes the sauce silky."
    ],
    art: { style: "pasta", bg: ["#e8ecf1", "#b4bfcc"], sauce: "#f4e2a8", noodle: "#f0cf72", noodleLight: "#fbeab0", chunk: "#b5523b", garnish: "#4a9a45" }
  },
  {
    name: "Koshari",
    description: "Egypt's favorite dish: rice, lentils, pasta and chickpeas with spicy tomato sauce and crispy onions",
    image: "images/koshari.jpg",
    rating: 4.9,
    reviews: 512,
    cuisine: "Egyptian",
    difficulty: "Intermediate",
    prepTime: 20,
    cookTime: 45,
    servings: 4,
    ingredients: [
      "1 cup rice",
      "1 cup brown lentils",
      "1 cup short macaroni",
      "1 can chickpeas (400g), drained",
      "3 large onions, thinly sliced",
      "4 tomatoes, blended",
      "4 cloves garlic",
      "2 tablespoons white vinegar",
      "1 teaspoon cumin, oil, salt and chili flakes"
    ],
    instructions: [
      "Boil the lentils for 20 minutes, then drain.",
      "Cook the rice with the lentils for 15 more minutes until fluffy.",
      "Boil the macaroni separately and drain.",
      "Fry the sliced onions in oil until deep golden and crispy.",
      "Cook the garlic, add the blended tomatoes, cumin, salt and chili, then simmer 15 minutes.",
      "Layer the rice and lentils, macaroni, chickpeas and sauce. Top with crispy onions."
    ],
    nutrition: { calories: 610, protein: 21, carbs: 108, fat: 12, fiber: 14, sodium: 540 },
    tips: [
      "Fry the onions in batches so they get crispy, not soggy.",
      "Add garlic and vinegar sauce (daqqa) for the classic taste."
    ],
    art: { style: "grain", bg: ["#efdbbd", "#c29a6c"], base: "#e8cf94", grains: ["#fffaf0", "#c58a4a", "#e9c46a", "#8b5a2b", "#f3e2b3"], sauce: "#c2410c", top: "#7c4a12" }
  },
  {
    name: "Chicken Molokhia",
    description: "Silky green molokhia in garlicky chicken broth, served over rice",
    image: "images/chicken-molokhia.jpg",
    rating: 4.7,
    reviews: 301,
    cuisine: "Egyptian",
    difficulty: "Intermediate",
    prepTime: 15,
    cookTime: 50,
    servings: 4,
    ingredients: [
      "1 whole chicken, cut in pieces",
      "400g frozen molokhia",
      "1 onion, 1 carrot and 1 bay leaf",
      "6 cloves garlic, crushed",
      "1 tablespoon ground coriander",
      "2 tablespoons ghee",
      "Rice, salt and pepper"
    ],
    instructions: [
      "Boil the chicken with the onion, carrot, bay leaf and salt for 40 minutes.",
      "Remove the chicken and strain the broth.",
      "Heat 4 cups of broth, add the molokhia and keep it at a gentle simmer.",
      "Fry the garlic and coriander in ghee until golden, then add it to the pot.",
      "Brown the chicken pieces in the oven and serve over rice."
    ],
    nutrition: { calories: 540, protein: 42, carbs: 48, fat: 20, fiber: 5, sodium: 720 },
    tips: [
      "Do not let the molokhia boil hard, or it loses its texture.",
      "Add a squeeze of lemon right before eating."
    ],
    art: { style: "stew", bg: ["#d9e5d1", "#8ea889"], sauce: "#2f6b2a", swirl: "#9bc47a", chunk: "#d19a5c", garnish: "#e8c15a" }
  },
  {
    name: "Grilled Kofta with Tahini",
    description: "Juicy spiced minced-meat skewers with fresh salad and tahini sauce",
    image: "images/grilled-kofta.jpg",
    rating: 4.8,
    reviews: 296,
    cuisine: "Egyptian",
    difficulty: "Easy",
    prepTime: 15,
    cookTime: 15,
    servings: 4,
    ingredients: [
      "500g minced beef",
      "1 onion, grated and squeezed dry",
      "1/2 cup chopped parsley",
      "1 teaspoon cumin and 1 teaspoon coriander",
      "Salt and pepper",
      "Tahini, lemon and garlic for the sauce"
    ],
    instructions: [
      "Mix the meat with the onion, parsley, spices and salt until sticky.",
      "Shape it around skewers into long fingers.",
      "Grill or pan-sear for 12 to 15 minutes, turning often.",
      "Whisk tahini with lemon, garlic and water, then serve with salad and bread."
    ],
    nutrition: { calories: 430, protein: 34, carbs: 18, fat: 25, fiber: 3, sodium: 520 },
    tips: [
      "Squeeze the grated onion dry so the mixture holds on the skewer.",
      "Chill the shaped kofta for 10 minutes before grilling."
    ],
    art: { style: "skewers", bg: ["#e9d4b9", "#b88a5a"], chunk: "#8a4a2a", mark: "#3d1d0d", tomato: "#d93a2b" }
  },
  {
    name: "Fattah",
    description: "Crispy bread, rice and tender meat in garlic vinegar and tomato sauce",
    image: "images/fattah.jpg",
    rating: 4.9,
    reviews: 421,
    cuisine: "Egyptian",
    difficulty: "Hard",
    prepTime: 25,
    cookTime: 60,
    servings: 6,
    ingredients: [
      "1kg beef or lamb with bones",
      "3 cups rice",
      "3 baladi bread loaves",
      "8 cloves garlic",
      "1/3 cup white vinegar",
      "2 cups tomato sauce",
      "Ghee, salt, cardamom and bay leaf"
    ],
    instructions: [
      "Boil the meat with cardamom, bay leaf and salt for 60 minutes until tender.",
      "Cook the rice in some of the meat broth.",
      "Toast the bread pieces in the oven until crunchy.",
      "Fry crushed garlic in ghee, then add the vinegar and a ladle of broth.",
      "Layer the bread, rice and garlic sauce, then top with tomato sauce and the meat."
    ],
    nutrition: { calories: 780, protein: 45, carbs: 84, fat: 28, fiber: 4, sodium: 860 },
    tips: [
      "Serve immediately, because the bread softens quickly.",
      "A pressure cooker cuts the meat time to about 25 minutes."
    ],
    art: { style: "grain", bg: ["#e8d7c2", "#b59470"], base: "#f6efdc", grains: ["#fffdf5", "#f3ead0", "#e0b863", "#c99a45"], sauce: "#c1352a", top: "#6b3d12" }
  }
];
