import Category from "@/Models/CategoryModel";

export const createCategory = async (data) => {
  return await Category.create(data);
};