import Module from "./Module";
interface Result {
  id?: number;
  progress?: number;
  timer?: number;
  total_score?: number;
  average?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  module?: number | Module;
}
export default Result;
