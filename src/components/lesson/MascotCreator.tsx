"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { fadeUp, inViewOnce, staggerContainer } from "@/lib/motion";

type Animal = { id: string; label: string; emoji: string };
type ColorOption = { id: string; label: string; className: string };
type Hat = { id: string; label: string; emoji: string | null };
type Accessory = { id: string; label: string; emoji: string | null };

const animals: Animal[] = [
  { id: "lion", label: "Lion", emoji: "🦁" },
  { id: "tiger", label: "Tiger", emoji: "🐯" },
  { id: "robot", label: "Robot", emoji: "🤖" },
  { id: "owl", label: "Owl", emoji: "🦉" },
  { id: "dragon", label: "Dragon", emoji: "🐉" },
];

const colors: ColorOption[] = [
  { id: "blue", label: "Blue", className: "bg-detective-blue-400" },
  { id: "orange", label: "Orange", className: "bg-detective-orange-500" },
  { id: "yellow", label: "Yellow", className: "bg-detective-yellow-400" },
  { id: "green", label: "Green", className: "bg-green-500" },
  { id: "purple", label: "Purple", className: "bg-purple-500" },
];

const hats: Hat[] = [
  { id: "none", label: "No hat", emoji: null },
  { id: "top-hat", label: "Top Hat", emoji: "🎩" },
  { id: "cap", label: "Cap", emoji: "🧢" },
  { id: "crown", label: "Crown", emoji: "👑" },
  { id: "grad-cap", label: "Graduation Cap", emoji: "🎓" },
];

const accessories: Accessory[] = [
  { id: "none", label: "No accessory", emoji: null },
  { id: "sunglasses", label: "Sunglasses", emoji: "🕶️" },
  { id: "bowtie", label: "Bow Tie", emoji: "🎀" },
  { id: "magnifier", label: "Magnifying Glass", emoji: "🔍" },
  { id: "backpack", label: "Backpack", emoji: "🎒" },
];

/** Labelled row of pickable option chips, shared by every picker below. */
function OptionRow<T extends { id: string; label: string }>({
  legend,
  options,
  selectedId,
  onSelect,
}: {
  legend: string;
  options: T[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 font-display text-sm font-semibold uppercase tracking-widest text-detective-blue-700/70">
        {legend}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = option.id === selectedId;
          return (
            <motion.button
              key={option.id}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(option.id)}
              aria-pressed={isSelected}
              className={`rounded-full border-2 px-4 py-2 text-sm font-display font-semibold transition-colors ${
                isSelected
                  ? "border-detective-orange-500 bg-detective-orange-100 text-detective-blue-900"
                  : "border-detective-blue-200 bg-white text-detective-blue-700 hover:border-detective-blue-400"
              }`}
            >
              {option.label}
            </motion.button>
          );
        })}
      </div>
    </fieldset>
  );
}

/** Interactive mascot builder: pick an animal, colour, hat and accessory, then see the mascot card. */
export function MascotCreator() {
  const [animalId, setAnimalId] = useState(animals[0].id);
  const [colorId, setColorId] = useState(colors[0].id);
  const [hatId, setHatId] = useState(hats[0].id);
  const [accessoryId, setAccessoryId] = useState(accessories[0].id);

  const animal = animals.find((item) => item.id === animalId) ?? animals[0];
  const color = colors.find((item) => item.id === colorId) ?? colors[0];
  const hat = hats.find((item) => item.id === hatId) ?? hats[0];
  const accessory = accessories.find((item) => item.id === accessoryId) ?? accessories[0];

  return (
    <motion.div
      variants={staggerContainer}
      {...inViewOnce}
      className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-start"
    >
      <motion.div variants={fadeUp} className="space-y-6">
        <OptionRow
          legend="Choose an animal"
          options={animals}
          selectedId={animalId}
          onSelect={setAnimalId}
        />
        <OptionRow
          legend="Choose a colour"
          options={colors}
          selectedId={colorId}
          onSelect={setColorId}
        />
        <OptionRow legend="Choose a hat" options={hats} selectedId={hatId} onSelect={setHatId} />
        <OptionRow
          legend="Choose an accessory"
          options={accessories}
          selectedId={accessoryId}
          onSelect={setAccessoryId}
        />
      </motion.div>

      <motion.div variants={fadeUp} className="flex justify-center">
        <div className="w-full max-w-xs rounded-3xl border-2 border-detective-blue-100 bg-white p-6 text-center shadow-xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-detective-yellow-100 px-4 py-2 font-display text-sm font-semibold text-detective-orange-600">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Your mascot
          </p>

          <div
            role="img"
            aria-label={`A ${color.label.toLowerCase()} ${animal.label.toLowerCase()} mascot${
              hat.emoji ? ` wearing a ${hat.label.toLowerCase()}` : ""
            }${accessory.emoji ? ` with a ${accessory.label.toLowerCase()}` : ""}`}
            className={`relative mx-auto grid h-40 w-40 place-items-center rounded-full shadow-inner transition-colors ${color.className}`}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={animal.id}
                initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 16 }}
                aria-hidden="true"
                className="text-7xl"
              >
                {animal.emoji}
              </motion.span>
            </AnimatePresence>

            <AnimatePresence>
              {hat.emoji && (
                <motion.span
                  key={hat.id}
                  initial={{ scale: 0, y: -10 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 14 }}
                  aria-hidden="true"
                  className="absolute -top-3 text-4xl"
                >
                  {hat.emoji}
                </motion.span>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {accessory.emoji && (
                <motion.span
                  key={accessory.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 14 }}
                  aria-hidden="true"
                  className="absolute -bottom-2 -right-2 text-3xl"
                >
                  {accessory.emoji}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <p className="mt-5 font-display text-lg font-bold text-detective-blue-900">
            {color.label} {animal.label}
          </p>
          <p className="mt-1 text-sm text-detective-blue-700/75">
            A brand-new brand hero, created by you!
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
