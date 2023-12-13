import Module from "./Module";
import Question from "./Question";
import Result from "./Result";
import Student from "./Student";

interface Answer {
  id?: number;
  content: string;
  timer: number;
  attempts: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  module?: number | Module;
  question?: number | Question;
  student?: number | Student;
  result?: number | Result;
}
export default Answer;
