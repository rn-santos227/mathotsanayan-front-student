import Answer from "@/types/Answer";
import Result from "@/types/Result";

export function evaluateExam(result: Result) {
  const module = result.module;
  if (typeof module != "object") return "Failed";
  if (!(module.count && result.total_score)) return "Failed";
  if (result.total_score <= 0) return "Failed";

  const average = (result.total_score / module.count) * 100;
  const passing = module.passing;
  return average >= passing ? "Passed" : "Failed";
}

export function accuracy(result: Result, answers?: Answer[]): number {
  const total_answers = answers ? answers.length : result.answers?.length;
  if (result.total_score && total_answers && result.items) {
    const average = (result.total_score / total_answers) * 100;
    const grade = (result.total_score / result.items) * 100;
    const accuracy = (average + grade) / 2;
    return accuracy;
  } else {
    return 0;
  }
}

export function grade(result: Result): number {
  if (result.total_score && result.items) {
    const grade = (result.total_score / result.items) * 100;
    return grade;
  } else {
    return 0;
  }
}

export function skips(answers: Answer[] | undefined): number {
  if (!answers) return 0;
  let skips = 0;
  answers.forEach((item) => {
    if (item.grade?.evaluation === "skipped") {
      skips += 1;
    }
  });
  return skips;
}

export function skipAverage(
  answers: Answer[] | undefined,
  items: number | undefined
): number {
  if (!answers) return 0;
  if (!items) return 0;
  const totalSkips = skips(answers);
  const average = (totalSkips / items) * 100;
  return average <= 100 ? average : 100;
}

export function secondsToMinutes(seconds: number | undefined): string {
  if (seconds === undefined) return "Invalid Time";
  const totalMinutes = Math.floor(seconds / 60);
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = (seconds % 60).toFixed(1).padStart(4, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export function getAverageTime(
  timer: number | undefined,
  items: number | undefined
): string {
  if (timer && items) {
    const average = timer / items;
    return secondsToMinutes(average);
  } else return "Invalid Time";
}
