import Product from "@/Models/ProductModel";

export const createProduct = async (data) => {
  return await Product.create(data);
};

export const updateProduct = async (productId, updatedData) => {
  return await Product.findByIdAndUpdate(
    productId,
    {$set: updatedData},
    {new: true, runValidators: true}
  );
};