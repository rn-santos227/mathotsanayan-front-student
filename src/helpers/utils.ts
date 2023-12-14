import Option from "@/types/Option";

export const shuffleOptions = (array: Option[]): Option[] => {
  const newOptions = [...array];

  for (let i = newOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newOptions[i], newOptions[j]] = [newOptions[j], newOptions[i]];
  }

  return newOptions;
};
