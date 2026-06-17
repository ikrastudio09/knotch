"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Tag,
  X,
  Upload,
  ChevronDown,
  AlertCircle,
} from "lucide-react";

// ── Toggle switch ────────────────────────────────────────────
function Toggle({ value, onChange }) {
  return (
    <div
      onClick={() => onChange(!value)}
      className={`w-12 h-6 relative transition-colors cursor-pointer flex-shrink-0 ${value ? "bg-black" : "bg-[#BFC3C7]"}`}
    >
      <div
        className={`absolute top-1 w-4 h-4 bg-white transition-all ${value ? "left-7" : "left-1"}`}
      />
    </div>
  );
}

// ── Category Modal ───────────────────────────────────────────
function CategoryModal({ onClose, onSave }) {
  const [name, setName] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md">
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#BFC3C7]">
          <div>
            <p className="text-xs tracking-[0.3em] text-black uppercase mb-1">
              New Category
            </p>
            <h2
              className="text-2xl font-bold text-black"
              style={{ fontFamily: "var(--seasons)" }}
            >
              Add Category
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center border border-[#BFC3C7] text-black hover:bg-black hover:text-white hover:border-black transition-all"
          >
            <X size={18} />
          </button>
        </div>
        <div className="px-8 py-6">
          <label className="block text-xs tracking-widest text-[#2B2B2B] uppercase mb-2">
            Category Name *
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && name.trim() && (onSave(name), onClose())
            }
            className="w-full border border-[#BFC3C7] px-4 py-3 text-sm text-black focus:outline-none focus:border-black transition-colors"
            placeholder="e.g. Dresses"
            autoFocus
          />
          <p className="text-[11px] text-black mt-2">
            Slug is auto-generated from the name
          </p>
        </div>
        <div className="flex items-center justify-between px-8 py-5 border-t border-[#BFC3C7] bg-[#F8F8F8]">
          <button
            onClick={onClose}
            className="px-6 py-3 text-xs tracking-widest uppercase border border-[#BFC3C7] text-black hover:border-black hover:text-black transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (name.trim()) {
                onSave(name);
                onClose();
              }
            }}
            className="px-8 py-3 text-xs tracking-widest uppercase bg-black text-white hover:bg-[#2B2B2B] transition-colors font-medium"
          >
            Create Category
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({ value, onChange, ...props }) {
  return (
    <input
      value={value ?? ""}
      onChange={onChange}
      className="w-full border border-[#BFC3C7] px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors text-black"
      {...props}
    />
  );
}

// ── Product Modal (Add + Edit) ───────────────────────────────
function ProductModal({ product, categories, onClose, onSave }) {
  const isEdit = !!product;
  const [previewImages, setPreviewImages] = useState([]);

  const [form, setForm] = useState({
    productName: "",
    productSellingPrice: "",
    productOriginalPrice: "",
    productCategory: "",
    productDescription: "",
    productSize: "",
    productStock: "",
    displayAt: "none",
    isActive: true,
    exchangePolicy: false,
    images: [],
  });
  useEffect(() => {
    if (product) {
      setForm({
        productName: product.productName || "",
        productSellingPrice: product.productSellingPrice || "",
        productOriginalPrice: product.productOriginalPrice || "",
        productCategory: product.productCategory || "",
        productDescription: product.productDescription || "",
        productSize: product.productSize?.join(", ") || "",
        productStock: product.productStock
          ? Object.entries(product.productStock)
              .map(([k, v]) => `${k}:${v}`)
              .join(", ")
          : "",
        displayAt: product.displayAt ?? "none",
        isActive: product.isActive ?? true,
        exchangePolicy: product.exchangePolicy ?? false,
        images: [],
      });
    }
  }, [product]);

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const Field = ({ label, children, hint }) => (
    <div>
      <label className="block text-xs tracking-widest text-[#2B2B2B] uppercase mb-2">
        {label}
      </label>
      {children}
      {hint && <p className="text-[11px] text-black mt-1.5">{hint}</p>}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#BFC3C7] sticky top-0 bg-white z-10">
          <div>
            <p className="text-xs tracking-[0.3em] text-black uppercase mb-1">
              {isEdit ? "Edit Product" : "New Product"}
            </p>
            <h2
              className="text-2xl font-bold text-black"
              style={{ fontFamily: "var(--seasons)" }}
            >
              {isEdit ? product.productName : "Add Product"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center border border-[#BFC3C7] text-black hover:bg-black hover:text-white hover:border-black transition-all"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-8 py-6 space-y-8">
          {/* Basic Info */}
          <section className="space-y-4">
            <p className="text-xs tracking-[0.25em] text-black uppercase border-b border-[#BFC3C7] pb-2">
              Basic Information
            </p>
            <Field label="Product Name *">
              <Input
                value={form.productName}
                onChange={(e) => set("productName", e.target.value)}
                placeholder="e.g. Oversized Linen Shirt"
              />
            </Field>
            <Field label="Description">
              <textarea
                value={form.productDescription}
                onChange={(e) => set("productDescription", e.target.value)}
                rows={3}
                className="w-full border border-[#BFC3C7] px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors resize-none text-black"
                placeholder="Describe the product..."
              />
            </Field>
          </section>

          {/* Pricing */}
          <section className="space-y-4">
            <p className="text-xs tracking-[0.25em] text-black uppercase border-b border-[#BFC3C7] pb-2">
              Pricing
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Selling Price (₹) *">
                <Input
                  value={form.productSellingPrice}
                  onChange={(e) => set("productSellingPrice", e.target.value)}
                  type="number"
                  placeholder="2499"
                />
              </Field>
              <Field label="Original Price (₹)">
                <Input
                  value={form.productOriginalPrice}
                  onChange={(e) => set("productOriginalPrice", e.target.value)}
                  type="number"
                  placeholder="3299"
                />
              </Field>
            </div>
          </section>

          {/* Category & Display */}
          <section className="space-y-4">
            <p className="text-xs tracking-[0.25em] text-black uppercase border-b border-[#BFC3C7] pb-2">
              Category & Visibility
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Category *">
                <div className="relative">
                  <select
                    value={form.productCategory}
                    onChange={(e) => set("productCategory", e.target.value)}
                    className="w-full text-black border border-[#BFC3C7] px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors appearance-none bg-white"
                  >
                    <option value="">Select category</option>
                    {categories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.categoryName}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-black pointer-events-none"
                  />
                </div>
              </Field>
              <Field label="Display At">
                <div className="relative">
                  <select
                    value={form.displayAt}
                    onChange={(e) => set("displayAt", e.target.value)}
                    className="w-full text-black border border-[#BFC3C7] px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors appearance-none bg-white"
                  >
                    {["none", "home", "trending", "new-arrivals", "sale"].map(
                      (d) => (
                        <option key={d} value={d}>
                          {d.charAt(0).toUpperCase() + d.slice(1)}
                        </option>
                      ),
                    )}
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-black pointer-events-none"
                  />
                </div>
              </Field>
            </div>
          </section>

          {/* Sizes & Stock */}
          <section className="space-y-4">
            <p className="text-xs tracking-[0.25em] text-black uppercase border-b border-[#BFC3C7] pb-2">
              Sizes & Stock
            </p>
            <Field
              label="Available Sizes *"
              hint="Comma-separated — e.g. S, M, L, XL"
            >
              <Input
                value={form.productSize}
                onChange={(e) => set("productSize", e.target.value)}
                placeholder="S, M, L, XL"
              />
            </Field>

            <Field
              label="Stock per Size *"
              hint="Format: SIZE:QTY — e.g. S:12, M:8"
            >
              <Input
                value={form.productStock}
                onChange={(e) => set("productStock", e.target.value)}
                placeholder="S:12, M:8, L:5, XL:2"
              />
            </Field>
          </section>

          {/* Images */}
          <section className="space-y-4">
            <p className="text-xs tracking-[0.25em] text-black uppercase border-b border-[#BFC3C7] pb-2">
              Product Images
            </p>
            <div className="border-2 border-dashed border-[#BFC3C7] hover:border-black transition-colors p-8 flex flex-col items-center gap-3 cursor-pointer group relative">
              <input
                type="file"
                multiple
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => {
                  const files = Array.from(e.target.files);

                  set("images", files);

                  const previews = files.map((file) => ({
                    file,
                    url: URL.createObjectURL(file),
                  }));

                  setPreviewImages(previews);
                }}
              />

              <div className="w-12 h-12 border border-[#BFC3C7] group-hover:border-black flex items-center justify-center transition-colors">
                <Upload
                  size={20}
                  className="text-black group-hover:text-black transition-colors"
                />
              </div>

              <div className="text-center">
                <p className="text-sm font-bold text-black">Drop images here</p>
                <p className="text-xs text-black mt-1">
                  JPG, PNG up to 10MB — uploads to Cloudinary
                </p>
              </div>
            </div>
            {isEdit && product.productImages?.length > 0 && (
              <div className="flex gap-3 flex-wrap">
                {product.productImages.map((img, i) => (
                  <div
                    key={i}
                    className="relative w-20 h-20 border border-[#BFC3C7] overflow-hidden group cursor-pointer"
                  >
                    <img
                      src={img.url}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <X size={16} className="text-white" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Settings toggles */}
          <section className="space-y-4">
            <p className="text-xs tracking-[0.25em] text-black uppercase border-b border-[#BFC3C7] pb-2">
              Settings
            </p>
            {[
              {
                key: "isActive",
                label: "Active",
                sub: "Visible on storefront",
              },
              {
                key: "exchangePolicy",
                label: "Exchange Policy",
                sub: "Allow size exchanges",
              },
            ].map(({ key, label, sub }) => (
              <label
                key={key}
                className="flex items-center justify-between py-3 border-b border-[#BFC3C7] cursor-pointer last:border-b-0"
              >
                <div>
                  <p className="text-sm text-[#2B2B2B] font-medium">{label}</p>
                  <p className="text-xs text-black">{sub}</p>
                </div>
                <Toggle value={form[key]} onChange={(v) => set(key, v)} />
              </label>
            ))}
          </section>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-8 py-5 border-t border-[#BFC3C7] bg-[#F8F8F8] sticky bottom-0">
          <button
            onClick={onClose}
            className="px-6 py-3 text-xs tracking-widest uppercase border border-[#BFC3C7] text-black hover:border-black hover:text-black transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            className="px-8 py-3 text-xs tracking-widest uppercase bg-black text-white hover:bg-[#2B2B2B] transition-colors font-medium"
          >
            {isEdit ? "Save Changes" : "Add Product"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Delete Confirm ───────────────────────────────────────────
function DeleteConfirm({ onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white p-8 w-full max-w-sm border border-[#BFC3C7]">
        <AlertCircle size={32} className="mb-4 text-black" />
        <h3
          className="text-xl font-bold mb-2 text-black"
          style={{ fontFamily: "var(--seasons)" }}
        >
          Delete Product?
        </h3>
        <p className="text-sm text-black mb-6">
          This action cannot be undone. The product will be permanently removed.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 text-xs text-black tracking-widest uppercase border border-[#BFC3C7] hover:border-black transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 text-xs tracking-widest uppercase bg-black text-white hover:bg-[#2B2B2B] transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Products Page ────────────────────────────────────────────
export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [productModal, setProductModal] = useState(null);
  const [catModal, setCatModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/category/fetch");
      const data = await res.json();

      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products/admin/fetch");
      const data = await res.json();

      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filtered = products.filter((p) =>
    p.productName.toLowerCase().includes(search.toLowerCase()),
  );

  const getCatName = (id) =>
    categories.find((c) => c._id === id)?.categoryName || "—";

  const handleSave = async (form) => {
    if (!productModal._id) {
      const loadingToast = toast.loading("Creating product...");

      try {
        const formData = new FormData();

        formData.append("productName", form.productName);
        formData.append("productSellingPrice", form.productSellingPrice);
        formData.append("productOriginalPrice", form.productOriginalPrice);
        formData.append("productCategory", form.productCategory);
        formData.append("productDescription", form.productDescription);
        formData.append("displayAt", form.displayAt);
        formData.append("exchangePolicy", form.exchangePolicy);

        // sizes
        const sizes = form.productSize.split(",").map((s) => s.trim());
        formData.append("productSize", JSON.stringify(sizes));

        // stock
        const stockObj = {};
        form.productStock.split(",").forEach((item) => {
          const [size, qty] = item.split(":");
          stockObj[size.trim()] = Number(qty.trim());
        });

        formData.append("productStock", JSON.stringify(stockObj));
        if (form.images && form.images.length > 0) {
          for (const file of form.images) {
            formData.append("images", file);
          }
        }

        const res = await fetch("/api/products/admin/add", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        toast.dismiss(loadingToast);

        if (data.success) {
          toast.success("Product created successfully");

          await fetchProducts();

          setProductModal(null);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.dismiss(loadingToast);
        toast.error("Failed to create product");
      }
    } else {
      const loadingToast = toast.loading("Saving product...");

      try {
        const formData = new FormData();

        formData.append("productName", form.productName);
        formData.append("productSellingPrice", form.productSellingPrice);
        formData.append("productOriginalPrice", form.productOriginalPrice);
        formData.append(
          "productCategory",
          form.productCategory._id || form.productCategory,
        );
        formData.append("productDescription", form.productDescription);
        formData.append("displayAt", form.displayAt);
        formData.append("exchangePolicy", form.exchangePolicy);

        const sizes = form.productSize.split(",").map((s) => s.trim());
        formData.append("productSize", JSON.stringify(sizes));

        const stockObj = {};
        form.productStock.split(",").forEach((item) => {
          const [size, qty] = item.split(":");
          stockObj[size.trim()] = Number(qty.trim());
        });

        formData.append("productStock", JSON.stringify(stockObj));
        console.log(formData);

        const res = await fetch(
          `/api/products/admin/update/${productModal._id}`,
          {
            method: "PUT",
            body: formData,
          },
        );

        const data = await res.json();

        toast.dismiss(loadingToast);

        if (data.success) {
          toast.success("Product updated successfully");

          await fetchProducts();

          setProductModal(null);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.dismiss(loadingToast);
        toast.error("Failed to update product");
      }
    }
  };

  const handleDelete = async () => {
    const loadingToast = toast.loading("Deleting product...");

    try {
      const res = await fetch(`/api/products/admin/delete/${deleteTarget}`, {
        method: "DELETE",
      });

      const data = await res.json();

      toast.dismiss(loadingToast);

      if (data.success) {
        toast.success("Product deleted successfully");

        // remove from UI
        setProducts((prev) => prev.filter((p) => p._id !== deleteTarget));

        setDeleteTarget(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Failed to delete product");
    }
  };

  const handleAddCategory = async (name) => {
    try {
      const formData = new FormData();
      formData.append("categoryName", name);

      const res = await fetch("/api/category", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setCategories((prev) => [...prev, data.Category]);
      }
    } catch (error) {
      console.error("Error in creating category:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs tracking-[0.3em] text-black uppercase mb-1">
            Inventory
          </p>
          <h1
            className="text-4xl font-bold text-black"
            style={{ fontFamily: "var(--seasons)" }}
          >
            Products
          </h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setCatModal(true)}
            className="flex items-center gap-2 px-5 py-3 text-xs tracking-widest uppercase border border-black text-black hover:bg-black hover:text-white transition-all"
          >
            <Tag size={14} /> Add Category
          </button>
          <button
            onClick={() => setProductModal({})}
            className="flex items-center gap-2 px-5 py-3 text-xs tracking-widest uppercase bg-black text-white hover:bg-[#2B2B2B] transition-colors"
          >
            <Plus size={14} /> Add Product
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          size={15}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-black"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-[#BFC3C7] pl-11 pr-4 py-3 text-sm text-black placeholder:text-[#8A8A8A] focus:outline-none focus:border-black transition-colors"
          placeholder="Search products..."
        />
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((c) => (
          <span
            key={c._id}
            className="text-xs px-3 py-1.5 border border-[#BFC3C7] text-[#2B2B2B] tracking-widest uppercase"
          >
            {c.categoryName}
          </span>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((p) => (
          <div
            key={p._id}
            className="border border-[#BFC3C7] hover:border-black transition-all group overflow-hidden"
          >
            {/* Image */}
            <div className="relative h-52 overflow-hidden bg-[#F8F8F8]">
              <img
                src={p.productImages[0]?.url}
                alt={p.productName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {p.displayAt !== "none" && (
                <div className="absolute top-3 left-3">
                  <span className="text-xs px-2 py-1 bg-white text-black tracking-widest uppercase border border-[#BFC3C7]">
                    {p.displayAt}
                  </span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-4">
              <p className="text-xs text-black tracking-widest uppercase mb-1">
                {getCatName(p.productCategory)} · #{p.productID}
              </p>
              <h3 className="font-bold text-black leading-tight mb-2 truncate">
                {p.productName}
              </h3>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold text-black">
                  ₹{p.productSellingPrice.toLocaleString()}
                </span>
                {p.productOriginalPrice > p.productSellingPrice && (
                  <span className="text-sm text-black line-through">
                    ₹{p.productOriginalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 mb-4 flex-wrap">
                {p.productSize.map((s) => (
                  <span
                    key={s}
                    className="text-xs px-2 py-0.5 border border-[#BFC3C7] text-[#2B2B2B]"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setProductModal(p)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs tracking-widest uppercase border border-[#BFC3C7] text-[#2B2B2B] hover:border-black hover:text-black transition-all"
                >
                  <Edit2 size={12} /> Edit
                </button>
                <button
                  onClick={() => setDeleteTarget(p._id)}
                  className="w-10 flex items-center justify-center border border-[#BFC3C7] text-black hover:border-red-400 hover:text-red-500 transition-all"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {catModal && (
        <CategoryModal
          onClose={() => setCatModal(false)}
          onSave={handleAddCategory}
        />
      )}
      {productModal !== null && (
        <ProductModal
          product={productModal._id ? productModal : null}
          categories={categories}
          onClose={() => setProductModal(null)}
          onSave={handleSave}
        />
      )}
      {deleteTarget && (
        <DeleteConfirm
          onCancel={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
