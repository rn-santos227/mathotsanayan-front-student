import User from "./User";

type Audit = {
  id: number;
  user: User;
  activity: string;
  table: string;
  content: string;
  ip_address: string;
};

export default Audit;
