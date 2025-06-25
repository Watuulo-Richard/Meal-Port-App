export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export type CategoryTypes = {
  name: string;
  slug: string;
  description: string;
  images: string[];
};

export type ReactQueryCategoryTypes = {
  id: string;
  name: string;
  slug: string;
  description: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
};

export interface CreateCatProps
  extends Omit<ReactQueryCategoryTypes, 'id' | 'createdAt' | 'updatedAt'> {}

export interface UpdateCategoryTypes extends Partial<CreateCatProps> {}

// For All Categories Response
export type QueriesCategoriesResponse = {
  data: ReactQueryCategoryTypes[] | [];
  error?: string;
};

// For Single Category Query Response
export type SingleQueryCategoryResponse = {
  data: ReactQueryCategoryTypes | null;
  error?: string;
};

// For create mutation operations Response
export type MutationCreateCategoryResponse = {
  success: boolean;
  data: CreateCatProps | null;
  error: string | null;
};

// For update mutation operations Response
export type MutationUpdateCategoryResponse = {
  success: boolean;
  data?: UpdateCategoryTypes;
  error?: string;
};

// Meal Types For React Query
export type ReactQueryMealProduct = {
  id: string;

  name: string;
  slug: string;
  description: string;
  images: string[];
  price: number;
  ingredients: string[];
  categoryId: string;

  createdAt: Date;
  updatedAt: Date;
};

// Here I Assign the ReactQueryMealProduct Types To CreateMealTypes😉
export interface CreateMealTypes
  extends Omit<ReactQueryMealProduct, 'id' | 'createdAt' | 'updatedAt'> {}
// Types For Update React Query
export interface UpdateMealTypes extends Partial<CreateMealTypes> {}

// For All Categories Response
export type QueriesMealResponse = {
  data: ReactQueryMealProduct[] | [];
  error?: string;
};

// For Single Category Query Response
export type SingleQueryMealResponse = {
  data: ReactQueryCategoryTypes | null;
  error?: string;
};

// For create mutation operations Response
export type MutationCreateMealResponse = {
  success: boolean;
  data: CreateMealTypes | null;
  error: string | null;
};

// For update mutation operations Response
export type MutationUpdateMealResponse = {
  success: boolean;
  data?: UpdateMealTypes;
  error?: string;
};

export type MealTypes = {
  name: string;
  slug: string;
  description: string;
  images: string[];
  price: number;
  ingredients: string[];
  categoryId: string;
}

// CategoryType-With-Meal-Type-Include
export type CategoryMealType = {
  name: string;
  slug: string;
  description: string;
  images: string[];
  meal: MealTypes
};
