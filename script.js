// =============================================================
// 2) ILLUSTRATION: draws a dish as SVG, so no image files are needed
// =============================================================
function hashSeed(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function drawDish(meal) {
  const a = meal.art;
  const rnd = mulberry32(hashSeed(meal.name));   // same dish = same picture every time
  const R = (min, max) => min + rnd() * (max - min);
  const pick = (list) => list[Math.floor(rnd() * list.length)];
  const f = (n) => n.toFixed(1);
  const cx = 300, cy = 330;
  const inCircle = (r) => {
    const ang = rnd() * Math.PI * 2;
    const d = Math.sqrt(rnd()) * r;
    return [cx + Math.cos(ang) * d, cy + Math.sin(ang) * d];
  };
  const at = (x, y, rot) => `translate(${f(x)} ${f(y)}) rotate(${f(rot)})`;

  let food = "";

  if (a.style === "stew") {
    food += `<circle cx="${cx}" cy="${cy}" r="166" fill="${a.sauce}"/>`;
    food += `<path d="M ${cx - 110} ${cy + 10} C ${cx - 80} ${cy - 120}, ${cx + 90} ${cy - 110}, ${cx + 110} ${cy - 10}" stroke="${a.swirl}" stroke-width="18" fill="none" stroke-linecap="round" opacity=".55"/>`;
    for (let i = 0; i < 9; i++) {
      const [x, y] = inCircle(115);
      const w = R(50, 70), h = R(36, 50);
      food += `<g transform="${at(x, y, R(0, 180))}"><rect x="${f(-w / 2)}" y="${f(-h / 2)}" width="${f(w)}" height="${f(h)}" rx="16" fill="${a.chunk}"/><rect x="${f(-w / 2 + 6)}" y="${f(-h / 2 + 5)}" width="${f(w * 0.55)}" height="${f(h * 0.28)}" rx="8" fill="#fff" opacity=".18"/></g>`;
    }
    for (let i = 0; i < 18; i++) {
      const [x, y] = inCircle(135);
      food += `<ellipse rx="${f(R(7, 12))}" ry="${f(R(3, 5))}" fill="${a.garnish}" transform="${at(x, y, R(0, 180))}"/>`;
    }
  } else if (a.style === "pasta") {
    food += `<circle cx="${cx}" cy="${cy}" r="166" fill="${a.sauce}"/><g clip-path="url(#foodClip)">`;
    for (let i = 0; i < 30; i++) {
      const [x1, y1] = inCircle(170), [x2, y2] = inCircle(170);
      const [c1x, c1y] = inCircle(230), [c2x, c2y] = inCircle(230);
      const d = `M ${f(x1)} ${f(y1)} C ${f(c1x)} ${f(c1y)}, ${f(c2x)} ${f(c2y)}, ${f(x2)} ${f(y2)}`;
      food += `<path d="${d}" stroke="${a.noodle}" stroke-width="13" fill="none" stroke-linecap="round"/>`;
      food += `<path d="${d}" stroke="${a.noodleLight}" stroke-width="4" fill="none" stroke-linecap="round" opacity=".8"/>`;
    }
    food += `</g>`;
    for (let i = 0; i < 14; i++) {
      const [x, y] = inCircle(140);
      food += `<rect x="-11" y="-6" width="22" height="12" rx="4" fill="${a.chunk}" transform="${at(x, y, R(0, 180))}"/>`;
    }
    for (let i = 0; i < 10; i++) {
      const [x, y] = inCircle(140);
      food += `<ellipse rx="${f(R(5, 9))}" ry="${f(R(2.5, 4))}" fill="#fff8d6" transform="${at(x, y, R(0, 180))}"/>`;
    }
    for (let i = 0; i < 46; i++) {
      const [x, y] = inCircle(150);
      food += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(R(1.6, 3.2))}" fill="#2b2b2b"/>`;
    }
    for (let i = 0; i < 10; i++) {
      const [x, y] = inCircle(130);
      food += `<ellipse rx="${f(R(5, 9))}" ry="${f(R(2, 3.5))}" fill="${a.garnish}" transform="${at(x, y, R(0, 180))}"/>`;
    }
  } else if (a.style === "grain") {
    food += `<circle cx="${cx}" cy="${cy}" r="166" fill="${a.base}"/><g clip-path="url(#foodClip)">`;
    for (let i = 0; i < 480; i++) {
      const [x, y] = inCircle(172);
      food += `<ellipse rx="${f(R(5, 9))}" ry="${f(R(3, 5))}" fill="${pick(a.grains)}" transform="${at(x, y, R(0, 180))}"/>`;
    }
    food += `</g>`;
    food += `<circle cx="${cx}" cy="${cy}" r="54" fill="${a.sauce}"/><circle cx="${cx - 14}" cy="${cy - 16}" r="18" fill="#fff" opacity=".22"/>`;
    for (let i = 0; i < 80; i++) {
      const [x, y] = inCircle(95);
      const dx = R(-22, 22), dy = R(-22, 22);
      food += `<path d="M ${f(x)} ${f(y)} q ${f(dx)} ${f(dy)} ${f(dx * 1.6)} ${f(dy * 0.4)}" stroke="${a.top}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
    }
  } else {
    // skewers
    [-92, 0, 92].forEach((dy) => {
      const y = cy + dy;
      food += `<line x1="${cx - 215}" y1="${y}" x2="${cx + 215}" y2="${y}" stroke="#c9a36a" stroke-width="7" stroke-linecap="round"/>`;
      for (let i = 0; i < 5; i++) {
        const x = cx - 150 + i * 75 + R(-4, 4);
        const h = R(50, 60);
        food += `<g transform="${at(x, y, R(-6, 6))}"><rect x="-34" y="${f(-h / 2)}" width="68" height="${f(h)}" rx="24" fill="${a.chunk}"/><path d="M -22 -12 L -6 12 M -4 -14 L 12 10 M 14 -12 L 28 8" stroke="${a.mark}" stroke-width="4" stroke-linecap="round" opacity=".55"/><rect x="-24" y="${f(-h / 2 + 6)}" width="34" height="9" rx="4" fill="#fff" opacity=".16"/></g>`;
      }
    });
    [[-130, 168], [-82, 188]].forEach(([dx, dy]) => {
      food += `<circle cx="${cx + dx}" cy="${cy + dy}" r="24" fill="${a.tomato}"/><circle cx="${cx + dx}" cy="${cy + dy}" r="14" fill="#f06a5a"/>`;
    });
    food += `<circle cx="${cx + 130}" cy="${cy + 168}" r="26" fill="#f7d94c" stroke="#e0b92a" stroke-width="4"/><path d="M ${cx + 130} ${cy + 142} V ${cy + 194} M ${cx + 104} ${cy + 168} H ${cx + 156}" stroke="#e0b92a" stroke-width="2"/>`;
    for (let i = 0; i < 14; i++) {
      const [x, y] = inCircle(150);
      food += `<ellipse rx="${f(R(5, 9))}" ry="${f(R(2.5, 4))}" fill="#3f8f3a" transform="${at(x, y + 70, R(0, 180))}"/>`;
    }
  }

  let stripes = "";
  for (let i = 0; i < 7; i++) {
    stripes += `<rect x="0" y="${i * 130}" width="600" height="2" fill="#fff" opacity=".1"/>`;
  }

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration of ${meal.name}">
  <defs>
<radialGradient id="bgGrad" cx="50%" cy="38%" r="80%">
  <stop offset="0" stop-color="${a.bg[0]}"/><stop offset="1" stop-color="${a.bg[1]}"/>
</radialGradient>
<radialGradient id="plateGrad" cx="50%" cy="45%" r="60%">
  <stop offset="0.6" stop-color="#ffffff"/><stop offset="1" stop-color="#ebe5d8"/>
</radialGradient>
<clipPath id="foodClip"><circle cx="${cx}" cy="${cy}" r="166"/></clipPath>
<filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="14"/></filter>
  </defs>
  <rect width="600" height="800" fill="url(#bgGrad)"/>
  ${stripes}
  <ellipse cx="${cx + 12}" cy="${cy + 22}" rx="250" ry="246" fill="#000" opacity=".28" filter="url(#soft)"/>
  <circle cx="${cx}" cy="${cy}" r="240" fill="url(#plateGrad)"/>
  <circle cx="${cx}" cy="${cy}" r="205" fill="none" stroke="#e0d9ca" stroke-width="3"/>
  <circle cx="${cx}" cy="${cy}" r="178" fill="#f3efe6"/>
  ${food}
</svg>`;
}

// =============================================================
// 3) DOM references + small helpers
// =============================================================
const $ = (id) => document.getElementById(id);
const tabButtons = document.querySelectorAll(".tab");
const panel = $("panel");

const BULB = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-1.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 2z"/><rect x="9.5" y="17.4" width="5" height="2" rx="1"/><rect x="10.5" y="20.4" width="3" height="1.6" rx=".8"/></svg>`;

let currentIndex = -1;
let currentMeal = null;
let activeTab = "ingredients";
const savedMeals = new Set();
let toastTimer;

function showToast(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
}

// =============================================================
// 4) CORE FUNCTIONS
// =============================================================

// Random meal, never the same one twice in a row.
function getRandomMeal() {
  let index;
  do {
    index = Math.floor(Math.random() * meals.length);
  } while (index === currentIndex && meals.length > 1);
  currentIndex = index;
  return meals[index];
}

// Warning rule from the assignment: prep + cook > 45 minutes.
function isLongRecipe(meal) {
  return meal.prepTime + meal.cookTime > 45;
}

function numberedList(items) {
  const rows = items
    .map((text, i) => `<li><span class="badge">${i + 1}</span><span>${text}</span></li>`)
    .join("");
  return `<ul class="item-list">${rows}</ul>`;
}

function tipsList(items) {
  const rows = items
    .map((text) => `<li><span class="bulb">${BULB}</span><span>${text}</span></li>`)
    .join("");
  return `<ul class="item-list">${rows}</ul>`;
}

function nutritionView(n) {
  // [label, value, unit, rough daily value used for the bar]
  const rows = [
    ["Protein", n.protein, "g", 50],
    ["Carbohydrates", n.carbs, "g", 300],
    ["Fat", n.fat, "g", 78],
    ["Fiber", n.fiber, "g", 28],
    ["Sodium", n.sodium, "mg", 2300]
  ];
  const bars = rows
    .map(([label, value, unit, daily]) => {
      const percent = Math.min(100, Math.round((value / daily) * 100));
      return `<div class="nutri-row">
        <div class="nutri-top"><span>${label}</span><strong>${value}${unit}</strong></div>
        <div class="bar"><div style="width:${percent}%"></div></div>
      </div>`;
    })
    .join("");
  return `<div class="calories"><span>Calories</span><strong>${n.calories} kcal</strong></div>${bars}`;
}

function renderPanel() {
  const m = currentMeal;
  if (activeTab === "ingredients") panel.innerHTML = numberedList(m.ingredients);
  if (activeTab === "instructions") panel.innerHTML = numberedList(m.instructions);
  if (activeTab === "nutrition") panel.innerHTML = nutritionView(m.nutrition);
  if (activeTab === "tips") panel.innerHTML = tipsList(m.tips);
  panel.scrollTop = 0;
}

function showTab(name) {
  activeTab = name;
  tabButtons.forEach((btn) => {
    btn.setAttribute("aria-selected", String(btn.dataset.tab === name));
  });
  renderPanel();
}

// Draw the illustration first; if a real photo exists, show it on top.
function renderMedia(meal) {
  const photo = $("photo");
  $("art").innerHTML = drawDish(meal);
  photo.hidden = true;
  photo.alt = meal.name;
  photo.onload = () => { photo.hidden = false; };
  photo.onerror = () => { photo.hidden = true; };
  photo.src = meal.image;
}

function updateBookmark() {
  $("bookmark").classList.toggle("active", savedMeals.has(currentMeal.name));
}

function renderMeal(meal) {
  currentMeal = meal;
  renderMedia(meal);

  $("rating").textContent = meal.rating;
  $("reviews").textContent = `(${meal.reviews} reviews)`;
  $("prep").textContent = `${meal.prepTime} min`;
  $("cook").textContent = `${meal.cookTime} min`;
  $("servings").textContent = `${meal.servings} people`;

  const level = $("difficulty");
  level.textContent = meal.difficulty;
  level.className = "tag " + (meal.difficulty === "Hard" ? "amber" : "green");
  $("cuisine").textContent = meal.cuisine;

  $("name").textContent = meal.name;
  $("description").textContent = meal.description;
  $("alert").hidden = !isLongRecipe(meal);

  updateBookmark();
  showTab("ingredients");
}

function showRandomMeal() {
  renderMeal(getRandomMeal());
}

async function shareMeal() {
  const text = `Tonight's dinner: ${currentMeal.name}`;
  try {
    if (navigator.share) {
      await navigator.share({ title: "What's For Dinner", text });
    } else {
      await navigator.clipboard.writeText(text);
      showToast("Copied to clipboard");
    }
  } catch (err) {
    /* the user closed the share sheet, nothing to do */
  }
}

// =============================================================
// 5) EVENTS + first render
// =============================================================
$("new-recipe").addEventListener("click", showRandomMeal);
$("share").addEventListener("click", shareMeal);
$("bookmark").addEventListener("click", () => {
  const name = currentMeal.name;
  if (savedMeals.has(name)) {
    savedMeals.delete(name);
    showToast("Removed from saved recipes");
  } else {
    savedMeals.add(name);
    showToast("Saved to your recipes");
  }
  updateBookmark();
});
tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => showTab(btn.dataset.tab));
});

showRandomMeal();