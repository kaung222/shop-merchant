export type User = {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  password: string;
  role: string;
  status: "active" | "restrict";
};

export type Merchant = {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  status: "active" | "restrict";
};
