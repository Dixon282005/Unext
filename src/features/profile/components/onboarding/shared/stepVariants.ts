// Framer Motion animation variants shared across all onboarding steps
export const stepVariants = {
  enter: (d: number) => ({ x: d > 0 ? 50 : -50, opacity: 0 }),
  center: { zIndex: 1, x: 0, opacity: 1 },
  exit: (d: number) => ({ zIndex: 0, x: d < 0 ? 50 : -50, opacity: 0 }),
};

// Alias so steps can import as `variants` directly
export const variants = stepVariants;
