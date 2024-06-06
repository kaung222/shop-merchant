export type Section = {
  id: string;
  createdAt: string;
  name: string;
  description: string;
  subCategories: Category[];
};

export type Category = {
  id: string;
  createdAt: string;
  name: string;
  description: string;
};
