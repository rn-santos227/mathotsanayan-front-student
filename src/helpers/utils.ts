import Option from "@/types/Option";

export const shuffleOptions = (array: Option[]): Option[] => {
  const newOptions = [...array];

  for (let i = newOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newOptions[i], newOptions[j]] = [newOptions[j], newOptions[i]];
  }

  return newOptions;
};

export function formatDate(date: string | undefined): string {
  if (date) {
    const formatDate = new Date(date);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const month = months[formatDate.getMonth()];
    const day = formatDate.getDate();
    const year = formatDate.getFullYear();
    const hours = formatDate.getHours();
    const minutes = String(formatDate.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    const formattedDate = `${month} ${day}, ${year} ${
      hours % 12
    }:${minutes} ${ampm}`;

    return formattedDate;
  } else return "Unkown Date";
}

export function padLeft(num: number | undefined): string {
  if (num === undefined) {
    return "undefined";
  }
  let str = num.toString();
  while (str.length < 7) {
    str = "0" + str;
  }
  return str;
}
