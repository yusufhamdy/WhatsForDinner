# What's For Dinner 🍽️

A small web app that picks a random dinner recipe every time you click **Try Another Recipe**.

## Project structure

```
whats-for-dinner/
├── index.html    # page structure
├── style.css     # all styling
├── data.js       # the meals (array of objects)
├── script.js     # logic: random pick, rendering, tabs
└── images/       # optional real photos (see below)
```

## How it works

- `data.js` holds an **array** of meal **objects**. Each meal has strings, numbers, arrays
  (`ingredients`, `instructions`, `tips`) and a nested `nutrition` object.
- `getRandomMeal()` picks a random meal using `Math.random()` and never repeats the same meal twice in a row.
- `isLongRecipe()` shows the "Extended Preparation Time" warning when `prepTime + cookTime > 45`.
- Each dish picture is drawn in code (SVG). If a real photo exists in `images/`, it is shown instead.

## Adding a meal

Copy one object inside the `meals` array in `data.js`, paste it, and change the values.

## Adding real photos (optional)

Put the files in `images/` with these exact names:

| Meal | File |
|---|---|
| Chicken Tikka Masala | `chicken-tikka-masala.jpg` |
| Koshari | `koshari.jpg` |
| Chicken Molokhia | `chicken-molokhia.jpg` |
| Grilled Kofta with Tahini | `grilled-kofta.jpg` |
| Fattah | `fattah.jpg` |

## Run locally

Open `index.html` in the browser.
