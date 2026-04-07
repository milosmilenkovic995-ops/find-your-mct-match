"use client";

import React, { useMemo, useState } from "react";

const products = {
  mctOil: {
    id: "mctOil",
    name: "MCT Oil Powder – Organic",
    subtitle: "Versatile • Unflavored",
    description:
      "A simple, flexible option that mixes easily into smoothies, shakes, coffee, or recipes.",
    image: "/images/mct-oil-powder.png",
    badges: ["Organic", "Unflavored", "Versatile"],
    href: "https://www.znaturalfoods.com/products/mct-oil-powder-organic",
  },
  collagenCreamer: {
    id: "collagenCreamer",
    name: "Collagen MCT Creamer",
    subtitle: "Creamy • Easy Morning Add-On",
    description:
      "A smooth, convenient creamer-style option designed to fit naturally into your coffee routine.",
    image: "/images/collagen-mct-creamer.png",
    badges: ["Creamy", "Coffee-Friendly", "Convenient"],
    href: "https://www.znaturalfoods.com/products/collagen-creamer-unflavored",
  },
  cacaoCoffee: {
    id: "cacaoCoffee",
    name: "Cognitive Cacao & Coffee Blend",
    subtitle: "Rich • Ready-to-Mix Drink",
    description:
      "A flavored drink option for people who want a richer, more enjoyable part of their morning routine.",
    image: "/images/cognitive-cacao-and-coffee.png",
    badges: ["Rich Taste", "Morning Routine", "Ready to Mix"],
    href: "https://www.znaturalfoods.com/products/cognitive-cacao-and-coffee-blend-organic",
  },
};

const resultRecipes = {
  mctOil: [
    {
      title: "Quick Green MCT Smoothie",
      image:
        "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=1200&q=80",
      time: "3 min",
      intro: "Fastest option — a quick everyday smoothie.",
      ingredients: [
        "1 cup milk of choice",
        "1 banana",
        "**MCT Oil Powder – Organic**",
        "Handful of spinach",
      ],
      steps: [
        "Add the milk, banana, spinach, and **MCT Oil Powder – Organic** to a blender.",
        "Blend until smooth and creamy.",
        "Pour into a glass and serve right away.",
      ],
    },
    {
      title: "Berry MCT Breakfast Bowl",
      image:
        "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=1200&q=80",
      time: "8 min",
      intro: "A more filling option that takes a little more prep.",
      ingredients: [
        "1 cup berries",
        "3/4 cup yogurt",
        "**MCT Oil Powder – Organic**",
        "Granola topping",
      ],
      steps: [
        "Add the berries, yogurt, and **MCT Oil Powder – Organic** to a blender.",
        "Blend until the mixture is thick and smooth.",
        "Pour the mixture into a bowl.",
        "Top with granola and any extra fruit you want before serving.",
      ],
    },
    {
      title: "MCT Snack Bites",
      image:
        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=80",
      time: "15 min",
      intro: "The most involved of the three, but still very manageable.",
      ingredients: [
        "1 cup oats",
        "2 tbsp nut butter",
        "**MCT Oil Powder – Organic**",
        "Honey to taste",
      ],
      steps: [
        "Add the oats, nut butter, honey, and **MCT Oil Powder – Organic** to a mixing bowl.",
        "Stir everything together until the mixture starts to hold its shape.",
        "If needed, add a little more nut butter or honey to help it come together.",
        "Roll the mixture into small bite-size balls.",
        "Place the bites in the fridge for a short time to firm up.",
        "Serve once chilled, or store for later.",
      ],
    },
  ],
  collagenCreamer: [
    {
      title: "Creamy Morning Coffee",
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
      time: "3 min",
      intro: "Fastest option — ideal for a quick morning routine.",
      ingredients: [
        "Coffee",
        "**Collagen MCT Creamer**",
        "Cinnamon optional",
      ],
      steps: [
        "Pour hot coffee into your mug.",
        "Add **Collagen MCT Creamer** and stir or froth until smooth.",
        "Top with cinnamon if desired and serve warm.",
      ],
    },
    {
      title: "Vanilla Coffee Shake",
      image:
        "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=1200&q=80",
      time: "7 min",
      intro: "A colder, more filling option with a little extra prep.",
      ingredients: [
        "Ice",
        "Milk",
        "**Collagen MCT Creamer**",
        "Vanilla",
      ],
      steps: [
        "Add the milk, vanilla, ice, and **Collagen MCT Creamer** to a blender.",
        "Blend until smooth and creamy.",
        "Taste and adjust the texture if needed with more milk.",
        "Pour into a glass and serve chilled.",
      ],
    },
    {
      title: "Creamy Overnight Oats",
      image:
        "https://plus.unsplash.com/premium_photo-1668615554420-d37c385d3a9d?q=80&w=687&auto=format&fit=crop",
      time: "10 min prep",
      intro: "The most involved option, with the most prep time of the three.",
      ingredients: [
        "Oats",
        "Milk",
        "**Collagen MCT Creamer**",
        "Chia seeds optional",
      ],
      steps: [
        "Add the oats, milk, and **Collagen MCT Creamer** to a jar or bowl.",
        "Stir well until the creamer is fully mixed in.",
        "Add chia seeds if you want a thicker texture.",
        "Cover and place in the fridge until the oats soften and set.",
        "Stir again before serving.",
        "Enjoy cold, or let it sit briefly at room temperature first.",
      ],
    },
  ],
  cacaoCoffee: [
    {
      title: "Warm Cacao Latte",
      image:
        "https://images.unsplash.com/photo-1517701550927-30cf4ba1fdd8?auto=format&fit=crop&w=1200&q=80",
      time: "4 min",
      intro: "Fastest option — warm, easy, and quick to make.",
      ingredients: ["Hot milk", "**Cognitive Cacao & Coffee Blend**"],
      steps: [
        "Pour hot milk into a mug.",
        "Add **Cognitive Cacao & Coffee Blend**.",
        "Whisk or stir until smooth and serve warm.",
      ],
    },
    {
      title: "Iced Cacao Coffee",
      image:
        "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1200&q=80",
      time: "6 min",
      intro: "A slightly more involved cold version for a refreshing option.",
      ingredients: ["Ice", "Milk", "**Cognitive Cacao & Coffee Blend**"],
      steps: [
        "Add the milk and **Cognitive Cacao & Coffee Blend** to a shaker or glass.",
        "Mix until the blend is fully combined.",
        "Fill a serving glass with ice.",
        "Pour the mixture over the ice and serve cold.",
      ],
    },
    {
      title: "Cacao Banana Smoothie",
      image:
        "https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?auto=format&fit=crop&w=1200&q=80",
      time: "9 min",
      intro: "The most involved recipe here, but still very approachable.",
      ingredients: [
        "Banana",
        "Milk",
        "**Cognitive Cacao & Coffee Blend**",
        "Ice",
      ],
      steps: [
        "Add the banana, milk, ice, and **Cognitive Cacao & Coffee Blend** to a blender.",
        "Blend until smooth and creamy.",
        "Check the texture and add a little more milk if needed.",
        "Blend again briefly to adjust consistency.",
        "Pour into a glass.",
        "Serve immediately while cold.",
      ],
    },
  ],
};

const questions = [
  {
    id: "goal",
    title: "What kind of product are you most interested in?",
    answers: [
      {
        id: "simple-everyday",
        title: "Something simple for everyday use",
        desc: "Easy to work into my regular routine",
        icon: "⚡",
        score: { mctOil: 2, collagenCreamer: 1, cacaoCoffee: 1 },
      },
      {
        id: "enjoyable-morning",
        title: "A more enjoyable morning option",
        desc: "Something I will actually look forward to",
        icon: "🧠",
        score: { cacaoCoffee: 3, collagenCreamer: 1 },
      },
      {
        id: "overall-routine",
        title: "Something that fits my overall routine",
        desc: "Flexible and easy to use in different ways",
        icon: "💚",
        score: { mctOil: 2, collagenCreamer: 2 },
      },
      {
        id: "active-lifestyle",
        title: "Something that fits an active lifestyle",
        desc: "A good match for busy or training days",
        icon: "💪",
        score: { collagenCreamer: 2, mctOil: 1, cacaoCoffee: 1 },
      },
    ],
  },
  {
    id: "priority",
    title: "What matters most to you right now?",
    answers: [
      {
        id: "easy-routine",
        title: "Easy to use day to day",
        desc: "Something simple I can use consistently",
        icon: "⚡",
        score: { mctOil: 2, collagenCreamer: 1 },
      },
      {
        id: "morning-experience",
        title: "A better morning experience",
        desc: "A more enjoyable fit for my mornings",
        icon: "🧠",
        score: { cacaoCoffee: 3 },
      },
      {
        id: "flexible-option",
        title: "A flexible option",
        desc: "Something that fits easily into my routine",
        icon: "💚",
        score: { mctOil: 2, collagenCreamer: 1 },
      },
      {
        id: "busy-lifestyle",
        title: "A fit for busy days",
        desc: "Something that works with an active schedule",
        icon: "💪",
        score: { collagenCreamer: 2, mctOil: 1 },
      },
    ],
  },
  {
    id: "format",
    title: "What sounds most appealing to you?",
    answers: [
      {
        id: "unflavored",
        title: "An unflavored everyday add-in",
        desc: "Great for shakes, coffee, and simple recipes",
        icon: "🌿",
        score: { mctOil: 3 },
      },
      {
        id: "creamy-coffee",
        title: "A creamy coffee companion",
        desc: "A smoother option for your morning cup",
        icon: "🥛",
        score: { collagenCreamer: 3 },
      },
      {
        id: "flavored-drink",
        title: "A rich flavored drink",
        desc: "A more enjoyable option with a flavored profile",
        icon: "🍫",
        score: { cacaoCoffee: 3 },
      },
    ],
  },
  {
    id: "lifestyle",
    title: "Which lifestyle sounds most like you?",
    answers: [
      {
        id: "keto",
        title: "Keto or low-carb",
        desc: "I usually lean toward lower-carb choices",
        icon: "🥩",
        score: { mctOil: 2, collagenCreamer: 1 },
      },
      {
        id: "whole-foods",
        title: "Whole foods focused",
        desc: "I prefer products that fit a simpler routine",
        icon: "🥗",
        score: { mctOil: 2, collagenCreamer: 1 },
      },
      {
        id: "active-balanced",
        title: "Active and balanced",
        desc: "I want something that works with a busy schedule",
        icon: "🏃",
        score: { collagenCreamer: 2, cacaoCoffee: 1 },
      },
      {
        id: "just-starting",
        title: "Just looking for an easy place to start",
        desc: "I want something simple and approachable",
        icon: "🙂",
        score: { collagenCreamer: 1, cacaoCoffee: 1, mctOil: 1 },
      },
    ],
  },
];

function renderIngredient(text: string) {
  const isBold = text.startsWith("**") && text.endsWith("**");
  const clean = isBold ? text.replace(/\*\*/g, "") : text;
  return isBold ? <strong>{clean}</strong> : clean;
}

function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="bg-[#efefef] px-4 py-2 text-[12px] text-gray-600">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center">
          <span>📦 Free shipping for orders within the contiguous US over $75</span>
          <span>🕘 Mon–Fri 9AM–5:30PM EST</span>
          <span>📞 (888) 963-6637</span>
          <span className="font-semibold text-gray-800">★★★★★ 6293 REVIEWS</span>
        </div>
      </div>

      <div
        className="px-4 py-2 text-center text-sm font-bold text-white"
        style={{ backgroundColor: "#208b47" }}
      >
        Be Sure to Check Out All of Our Specials!
      </div>

      <div className="bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-6 py-5">
          <a href="https://www.znaturalfoods.com/">
            <img
              src="/images/logo.png"
              alt="Z Natural Foods"
              className="h-14 w-auto object-contain"
            />
          </a>

          <nav className="flex flex-wrap items-center gap-7 text-[15px] font-medium text-gray-900">
            <a href="https://www.znaturalfoods.com/collections/all">Categories</a>
            <a href="https://www.znaturalfoods.com/pages/health-concerns">Health Concerns</a>
            <a
              href="https://www.znaturalfoods.com/pages/specials"
              className="font-bold text-green-700"
            >
              🔥 Specials
            </a>
            <a href="https://www.znaturalfoods.com/blogs/articles">Articles</a>
            <a href="https://www.znaturalfoods.com/pages/bulk">Bulk</a>
            <a href="https://www.znaturalfoods.com/pages/about-us">About</a>
          </nav>

          <a
            href="https://www.znaturalfoods.com/search"
            className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-400"
          >
            🔎 Search
          </a>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  const colTitle = "mb-3 text-[15px] font-bold text-white";
  const link = "mb-1.5 block text-sm leading-6 text-gray-300";

  return (
    <footer className="mt-20 bg-slate-700 text-white">
      <div className="mx-auto max-w-7xl px-7 py-10">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          <div>
            <img
              src="/images/logo.png"
              alt="Z Natural Foods"
              className="mb-4 h-10 w-auto object-contain"
            />
            <p className="max-w-xs text-sm leading-7 text-gray-300">
              Z Natural Foods is dedicated to bringing you the finest quality in
              hard-to-find whole, all natural and organic foods.
            </p>
          </div>

          <div>
            <div className={colTitle}>CATALOG</div>
            <a href="https://www.znaturalfoods.com/collections/all-products" className={link}>All Products</a>
            <a href="https://www.znaturalfoods.com/pages/bulk" className={link}>Wholesale, Bulk & Custom Blends</a>
            <a href="https://www.znaturalfoods.com/collections/monthly-specials" className={link}>Specials</a>
            <a href="https://www.znaturalfoods.com/collections/new-products" className={link}>New Products</a>
            <a href="https://www.znaturalfoods.com/pages/reviews" className={link}>Reviews</a>
          </div>

          <div>
            <div className={colTitle}>MY ACCOUNT</div>
            <a href="https://www.znaturalfoods.com/account/register" className={link}>Register</a>
            <a href="https://www.znaturalfoods.com/account/addresses" className={link}>My Address</a>
            <a href="https://www.znaturalfoods.com/account" className={link}>Order History</a>
            <a href="https://www.znaturalfoods.com/account" className={link}>Recurring Deliveries</a>
            <a href="https://www.znaturalfoods.com/pages/rewards-program" className={link}>Rewards Program</a>
          </div>

          <div>
            <div className={colTitle}>INFORMATION</div>
            <a href="https://www.znaturalfoods.com/pages/about-us" className={link}>About Us</a>
            <a href="https://www.znaturalfoods.com/pages/contact-us" className={link}>Contact Us</a>
            <a href="https://www.znaturalfoods.com/pages/faqs" className={link}>FAQs</a>
            <a href="https://www.znaturalfoods.com/pages/shipping" className={link}>Shipping</a>
            <a href="https://www.znaturalfoods.com/blogs/articles" className={link}>News & Media</a>
            <a href="https://www.znaturalfoods.com/pages/vendors" className={link}>Vendors</a>
          </div>

          <div>
            <div className={colTitle}>POLICIES</div>
            <a href="https://www.znaturalfoods.com/policies/privacy-policy" className={link}>Privacy Policy</a>
            <a href="https://www.znaturalfoods.com/pages/california-prop65" className={link}>California Prop65</a>
            <a href="https://www.znaturalfoods.com/pages/legal-notice-disclaimer" className={link}>Legal Notice Disclaimer</a>
            <a href="https://www.znaturalfoods.com/policies/terms-of-service" className={link}>Terms of Use</a>
            <a href="https://www.znaturalfoods.com/pages/your-privacy-choices" className={link}>Your Privacy Choices</a>
            <a href="https://www.znaturalfoods.com/pages/accessibility" className={link}>Accessibility</a>
          </div>
        </div>

        <div className="mt-9 border-t border-white/20 pt-4 text-[13px] leading-6 text-gray-300">
          * Disclaimer: Comments, reviews, testimonials, ratings, and social media posts reflect
          individual customer experiences and opinions only. They do not constitute guarantees,
          typical results, medical claims, or representations that any person will achieve the same
          outcome.
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5 text-sm text-gray-300">
          <div>Copyright © 2026, Z Natural Foods, LLC. | ® All Rights Reserved.</div>
          <div className="flex flex-wrap gap-3 text-xs text-white">
            <span className="rounded bg-white px-3 py-2 text-slate-700">VISA</span>
            <span className="rounded bg-white px-3 py-2 text-slate-700">PayPal</span>
            <span className="rounded bg-white px-3 py-2 text-slate-700">AMEX</span>
            <span className="rounded bg-white px-3 py-2 text-slate-700">Mastercard</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Progress({ step }: { step: number }) {
  const items = [1, 2, 3, 4, 5];

  return (
    <div className="mt-6 flex items-center justify-center">
      {items.map((item, i) => {
        const active = item <= step;
        const isEmail = item === 5;

        return (
          <div key={item} className="flex items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold ${
                active
                  ? "border-green-700 bg-green-700 text-white"
                  : "border-gray-300 bg-white text-gray-400"
              }`}
            >
              {isEmail ? "✉" : item}
            </div>
            {i < items.length - 1 && (
              <div
                className={`h-[2px] w-12 ${
                  item < step ? "bg-green-700" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function QuestionCard({
  question,
  step,
  onAnswer,
}: {
  question: (typeof questions)[number];
  step: number;
  onAnswer: (answer: any) => void;
}) {
  return (
    <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm md:p-10">
      <div className="mb-4 text-xs font-extrabold tracking-[0.18em] text-green-700">
        QUESTION {step} OF 4
      </div>
      <h2 className="mb-7 text-3xl font-extrabold text-slate-900 md:text-4xl">
        {question.title}
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {question.answers.map((answer) => (
          <button
            key={answer.id}
            onClick={() => onAnswer(answer)}
            className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 text-left transition hover:border-green-600 hover:shadow-sm"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-xl">
              {answer.icon}
            </div>
            <div>
              <div className="mb-1 text-[17px] font-bold text-slate-900">
                {answer.title}
              </div>
              <div className="text-sm text-gray-500">{answer.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function EmailGate({
  firstName,
  setFirstName,
  email,
  setEmail,
  emailError,
  submitting,
  onSubmit,
}: {
  firstName: string;
  setFirstName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  emailError: boolean;
  submitting: boolean;
  onSubmit: () => void;
}) {
  return (
    <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
      <div className="mb-4 text-5xl">🎉</div>
      <h2 className="mb-3 text-4xl font-extrabold text-slate-900">
        Your match is ready!
      </h2>
      <p className="mx-auto mb-7 max-w-xl text-lg leading-8 text-gray-500">
        Enter your email to see your personalized results and unlock your recipe ideas.
      </p>
      <div className="mx-auto max-w-md space-y-3">
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name (optional)"
          className="w-full rounded-xl border border-gray-300 px-4 py-4 outline-none"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className={`w-full rounded-xl border px-4 py-4 outline-none ${
            emailError ? "border-red-500" : "border-gray-300"
          }`}
        />
        {emailError && (
          <div className="text-left text-sm text-red-500">
            Please enter a valid email address.
          </div>
        )}
        <button
          onClick={onSubmit}
          disabled={submitting}
          className="w-full rounded-xl bg-green-700 px-4 py-4 text-lg font-extrabold text-white disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "See My Results"}
        </button>
        <div className="text-xs text-gray-400">
          🔒 No spam, ever. Unsubscribe anytime.
        </div>
      </div>
    </div>
  );
}

function ProductCard({
  product,
  featured = false,
}: {
  product: (typeof products)[keyof typeof products];
  featured?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl bg-white p-6 text-center ${
        featured ? "border-2 border-green-700 shadow-md" : "border border-gray-200"
      }`}
    >
      {featured && (
        <div className="mb-4 inline-block rounded-full bg-green-700 px-3 py-2 text-[11px] font-extrabold text-white">
          BEST MATCH
        </div>
      )}
      <img
        src={product.image}
        alt={product.name}
        className={`mx-auto mb-5 w-full object-contain ${
          featured ? "h-80 max-w-md" : "h-48 max-w-xs"
        }`}
      />
      <h3
        className={`${featured ? "text-3xl" : "text-xl"} mb-2 font-extrabold text-slate-900`}
      >
        {product.name}
      </h3>
      <div className="mb-3 text-gray-500">{product.subtitle}</div>
      <p className="mb-4 leading-7 text-gray-600">{product.description}</p>
      <div className="mb-5 flex flex-wrap justify-center gap-2">
        {product.badges.map((b) => (
          <span
            key={b}
            className="rounded-full bg-green-50 px-3 py-2 text-xs font-bold text-green-700"
          >
            {b}
          </span>
        ))}
      </div>
      <a
        href={product.href}
        className="inline-block rounded-xl bg-green-700 px-5 py-3 font-extrabold text-white"
      >
        Shop Now →
      </a>
    </div>
  );
}

function RecipeCard({
  recipe,
}: {
  recipe: (typeof resultRecipes)["mctOil"][number];
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="h-72 w-full object-cover"
      />
      <div className="p-6">
        <h3 className="mb-2 text-2xl font-extrabold text-slate-900">
          {recipe.title}
        </h3>
        <div className="mb-3 text-sm font-medium text-gray-500">
          {recipe.time} • {recipe.intro}
        </div>
        <div className="mb-2 text-xs font-extrabold tracking-[0.16em] text-green-700">
          INGREDIENTS
        </div>
        <ul className="mb-5 list-disc space-y-1 pl-5 text-gray-700">
          {recipe.ingredients.map((item) => (
            <li key={item}>{renderIngredient(item)}</li>
          ))}
        </ul>
        <div className="mb-2 text-xs font-extrabold tracking-[0.16em] text-green-700">
          HOW TO MAKE IT
        </div>
        <ol className="list-decimal space-y-1 pl-5 text-gray-700">
          {recipe.steps.map((item) => (
            <li key={item}>{renderIngredient(item)}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default function Page() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const currentQuestion = questions[step - 1];

  const resultKey = useMemo(() => {
    const totals = { mctOil: 0, collagenCreamer: 0, cacaoCoffee: 0 };

    Object.values(answers).forEach((answer) => {
      Object.entries(answer.score).forEach(([k, v]) => {
        totals[k as keyof typeof totals] += Number(v || 0);
      });
    });

    return (
      Object.entries(totals).sort((a, b) => b[1] - a[1])[0]?.[0] || "mctOil"
    ) as keyof typeof products;
  }, [answers]);

  const primary = products[resultKey];
  const secondary = Object.values(products)
    .filter((p) => p.id !== resultKey)
    .slice(0, 2);
  const recipes = resultRecipes[resultKey];

  const handleAnswer = (answer: any) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: answer }));
    setStep((s) => s + 1);
  };

  const handleSubmit = async () => {
    if (!email || !email.includes("@")) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
    setSubmitting(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          firstName,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        console.error("Subscribe failed:", data);
        alert(data?.error || "Email was not sent to Klaviyo.");
        setSubmitting(false);
        return;
      }

      setStep(6);
    } catch (error) {
      console.error("Submit error:", error);
      alert("Something went wrong while sending to Klaviyo.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main className="mx-auto max-w-7xl px-6 pb-10 pt-12">
        {step <= 5 && (
          <section className="mb-8 text-center">
            <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
              Find Your <span className="text-green-700">MCT Superfood Match</span>
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-500 md:text-[28px] md:leading-[1.5]">
              Answer 4 quick questions and get a personalized product recommendation plus
              3 recipe ideas tailored to your routine.
            </p>
            <Progress step={step} />
          </section>
        )}

        {step <= 4 && currentQuestion && (
          <QuestionCard
            question={currentQuestion}
            step={step}
            onAnswer={handleAnswer}
          />
        )}

        {step === 5 && (
          <EmailGate
            firstName={firstName}
            setFirstName={setFirstName}
            email={email}
            setEmail={setEmail}
            emailError={emailError}
            submitting={submitting}
            onSubmit={handleSubmit}
          />
        )}

        {step === 6 && (
          <section>
            <div className="mb-10 text-center">
              <h2 className="text-4xl font-extrabold md:text-5xl">Your Best Match</h2>
              <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-gray-500">
                Based on your answers, here is the product that fits your routine best.
              </p>
            </div>

            <div className="mx-auto mb-8 max-w-4xl">
              <ProductCard product={primary} featured />
            </div>

            <div className="mb-5 text-center text-xs font-extrabold tracking-[0.16em] text-gray-500">
              ALSO WORTH TRYING
            </div>
            <div className="mx-auto mb-12 grid max-w-4xl gap-6 md:grid-cols-2">
              {secondary.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mx-auto max-w-4xl">
              <div className="mb-6 text-center text-2xl font-extrabold">
                🍽 Your recipe ideas based on your answers
              </div>
              <div className="space-y-6">
                {recipes.map((recipe) => (
                  <RecipeCard key={recipe.title} recipe={recipe} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
