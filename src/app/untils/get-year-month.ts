export const getYears = (startYear: number): number[] => {
  const currentYear = new Date().getFullYear();
  return Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => startYear + i
  ).sort((a, b) => b - a);
};

export const getMonthNames = (): string[] => {
  return Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString('default', { month: 'long' })
  );
};
