type Student = {
  id?: number;
  full_name?: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  suffix: string;
  email: string;
  password: string;
  password_confirm: string;
  contact_number: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
};

export default Student;