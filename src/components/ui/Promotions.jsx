"use client";
import { useState, useEffect, useCallback } from "react";
import {
  Search,
  X,
  Plus,
  Edit2,
  Trash2,
  ToggleLeft,
  ToggleRight,
  RotateCcw,
  Zap,
  CheckCircle,
  Clock,
  TrendingUp,
  ChevronDown,
  Loader2,
  Package,
  AlertTriangle,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Toast
// ─────────────────────────────────────────────────────────────────────────────
function Toast({ toasts, remove }) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-3 px-5 py-3.5 text-sm font-medium border shadow-lg min-w-[260px] ${
            t.type === "error"
              ? "bg-black text-white border-black"
              : "bg-white text-black border-[#BFC3C7]"
          }`}
        >
          <span className="flex-1">{t.message}</span>
          <button
            onClick={() => remove(t.id)}
            className="text-current opacity-50 hover:opacity-100"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}

function useToast() {
  const [toasts, setToasts] = useState([]);
  const add = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(
      () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      3500
    );
  }, []);
  const remove = useCallback(
    (id) => setToasts((prev) => prev.filter((t) => t.id !== id)),
    []
  );
  return { toasts, add, remove };
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared primitives
// ─────────────────────────────────────────────────────────────────────────────
const inputCls =
  "w-full border border-[#BFC3C7] px-4 py-2.5 text-sm text-black placeholder:text-[#BFC3C7] focus:outline-none focus:border-black transition-colors bg-white";

function Field({ label, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs tracking-[0.2em] text-[#8A8A8A] uppercase">
        {label}
      </label>
      {children}
    </div>
  );
}

function SummaryCard({ icon: Icon, label, value, accent }) {
  return (
    <div className="border border-[#BFC3C7] p-5 flex items-center gap-4">
      <div
        className={`w-11 h-11 flex items-center justify-center flex-shrink-0 border ${
          accent ? "bg-black border-black" : "border-[#BFC3C7]"
        }`}
      >
        <Icon size={17} className={accent ? "text-white" : "text-[#8A8A8A]"} />
      </div>
      <div>
        <p className="text-2xl font-bold text-black">{value}</p>
        <p className="text-[10px] tracking-widest uppercase text-[#8A8A8A] mt-0.5">
          {label}
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Promotion Form (shared by Create and Edit)
// ─────────────────────────────────────────────────────────────────────────────
const EMPTY_FORM = {
  title: "",
  promotionType: "bundle_price",
  categoryID: "",
  requiredQuantity: "",
  bundlePrice: "",
  active: true,
  validFrom: "",
  validTill: "",
};

function PromotionForm({
  initial,
  onSubmit,
  loading,
  submitLabel,
  onReset,
  categories,
}) {
  const [form, setForm] = useState(initial || EMPTY_FORM);

  useEffect(() => {
    if (initial) setForm(initial);
  }, [initial]);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const handleReset = () => {
    setForm(EMPTY_FORM);
    onReset?.();
  };

  // Live preview of the promotion label
  const previewLabel =
    form.categoryID && form.requiredQuantity && form.bundlePrice
      ? `Buy Any ${form.requiredQuantity} ${
          categories.find((c) => c._id === form.categoryID)?.categoryName ||
          "items"
        } @ ₹${Number(form.bundlePrice).toLocaleString()}`
      : null;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Live Preview pill */}
      {previewLabel && (
        <div className="flex items-center gap-2 px-4 py-3 border border-black bg-black">
          <Zap size={13} className="text-white shrink-0" />
          <p className="text-xs font-bold tracking-widest text-white uppercase">
            {previewLabel}
          </p>
        </div>
      )}

      {/* Title */}
      <Field label="Promotion Title">
        <input
          required
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          placeholder='e.g. "Buy Any 3 Shirts @ ₹1100"'
          className={inputCls}
        />
      </Field>

      {/* Type + Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Promotion Type">
          <div className="relative">
            <select
              value={form.promotionType}
              onChange={(e) => set("promotionType", e.target.value)}
              className={inputCls + " appearance-none pr-9 cursor-pointer"}
            >
              <option value="bundle_price">Bundle Price</option>
              {/* Future types added here */}
            </select>
            <ChevronDown
              size={13}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8A8A] pointer-events-none"
            />
          </div>
        </Field>

        <Field label="Category">
          <div className="relative">
            <select
              required
              value={form.categoryID}
              onChange={(e) => set("categoryID", e.target.value)}
              className={inputCls + " appearance-none pr-9 cursor-pointer"}
            >
              <option value="">Select category…</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.categoryName}
                </option>
              ))}
            </select>
            <ChevronDown
              size={13}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8A8A] pointer-events-none"
            />
          </div>
        </Field>
      </div>

      {/* Bundle fields (always shown in V1, only bundle_price exists) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Required Quantity">
          <input
            required
            type="number"
            min="2"
            value={form.requiredQuantity}
            onChange={(e) => set("requiredQuantity", e.target.value)}
            placeholder="e.g. 3"
            className={inputCls}
          />
          <p className="text-[11px] text-[#8A8A8A] mt-1">
            Minimum 2 items to form a bundle
          </p>
        </Field>

        <Field label="Bundle Price (₹)">
          <input
            required
            type="number"
            min="0"
            value={form.bundlePrice}
            onChange={(e) => set("bundlePrice", e.target.value)}
            placeholder="e.g. 1100"
            className={inputCls}
          />
          <p className="text-[11px] text-[#8A8A8A] mt-1">
            Total price for the entire bundle
          </p>
        </Field>
      </div>

      {/* Validity window */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Valid From">
          <input
            type="date"
            value={form.validFrom}
            onChange={(e) => set("validFrom", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Valid Till">
          <input
            type="date"
            value={form.validTill}
            onChange={(e) => set("validTill", e.target.value)}
            className={inputCls}
          />
        </Field>
      </div>

      {/* Active checkbox */}
      <div className="pt-1">
        <label className="flex items-center gap-2.5 cursor-pointer group w-fit">
          <div
            onClick={() => set("active", !form.active)}
            className={`w-5 h-5 border flex items-center justify-center flex-shrink-0 transition-colors ${
              form.active
                ? "bg-black border-black"
                : "border-[#BFC3C7] group-hover:border-black"
            }`}
          >
            {form.active && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path
                  d="M1 4L3.5 6.5L9 1"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </div>
          <span className="text-xs tracking-[0.2em] uppercase text-[#2B2B2B]">
            Active — visible to customers
          </span>
        </label>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 bg-black text-white text-xs tracking-widest uppercase hover:bg-[#2B2B2B] transition-colors disabled:opacity-50"
        >
          {loading ? (
            <Loader2 size={13} className="animate-spin" />
          ) : (
            <Plus size={13} />
          )}
          {submitLabel || "Create Promotion"}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-2 px-6 py-3 border border-[#BFC3C7] text-[#8A8A8A] text-xs tracking-widest uppercase hover:border-black hover:text-black transition-colors"
        >
          <RotateCcw size={13} />
          Reset
        </button>
      </div>
    </form>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Edit Modal
// ─────────────────────────────────────────────────────────────────────────────
function EditModal({ promotion, onClose, onSave, loading, categories }) {
  const toDateInput = (d) =>
    d ? new Date(d).toISOString().split("T")[0] : "";

  const initial = {
    title: promotion.title || "",
    promotionType: promotion.promotionType || "bundle_price",
    categoryID:
      promotion.categoryID?._id?.toString() ||
      promotion.categoryID?.toString() ||
      "",
    requiredQuantity: promotion.requiredQuantity?.toString() || "",
    bundlePrice: promotion.bundlePrice?.toString() || "",
    active: promotion.active ?? true,
    validFrom: toDateInput(promotion.validFrom),
    validTill: toDateInput(promotion.validTill),
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#BFC3C7] sticky top-0 bg-white z-10">
          <div>
            <p className="text-xs tracking-[0.3em] text-[#8A8A8A] uppercase">
              Edit Promotion
            </p>
            <h2
              className="text-xl font-bold text-black tracking-wide mt-0.5"
              style={{ fontFamily: "var(--seasons)" }}
            >
              {promotion.title}
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
          <PromotionForm
            initial={initial}
            onSubmit={onSave}
            loading={loading}
            submitLabel="Save Changes"
            onReset={onClose}
            categories={categories}
          />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Delete Confirm Modal
// ─────────────────────────────────────────────────────────────────────────────
function DeleteModal({ promotion, onClose, onConfirm, loading }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-sm">
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#BFC3C7]">
          <p className="text-xs tracking-[0.3em] text-[#8A8A8A] uppercase">
            Confirm Delete
          </p>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center border border-[#BFC3C7] hover:bg-black hover:text-white hover:border-black transition-all"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-8 py-6 space-y-4">
          <div className="flex gap-3 items-start">
            <AlertTriangle size={18} className="text-[#8A8A8A] shrink-0 mt-0.5" />
            <p className="text-sm text-[#2B2B2B] leading-relaxed">
              Delete{" "}
              <span className="font-bold">"{promotion.title}"</span>? This
              cannot be undone. If this promotion has been used in orders, it
              will be blocked — disable it instead.
            </p>
          </div>
        </div>

        <div className="px-8 py-5 border-t border-[#BFC3C7] flex gap-3">
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-black text-white text-xs tracking-widest uppercase hover:bg-[#2B2B2B] transition-colors disabled:opacity-50"
          >
            {loading ? (
              <Loader2 size={13} className="animate-spin" />
            ) : (
              <Trash2 size={13} />
            )}
            Delete
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-[#BFC3C7] text-[#8A8A8A] text-xs tracking-widest uppercase hover:border-black hover:text-black transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Status Badge
// ─────────────────────────────────────────────────────────────────────────────
function StatusBadge({ active, expired }) {
  if (expired)
    return (
      <span className="text-[10px] px-2 py-0.5 border border-[#BFC3C7] text-[#8A8A8A] tracking-widest uppercase">
        Expired
      </span>
    );
  return (
    <span
      className={`text-[10px] px-2 py-0.5 border tracking-widest uppercase ${
        active
          ? "border-black text-black"
          : "border-[#BFC3C7] text-[#8A8A8A]"
      }`}
    >
      {active ? "Active" : "Inactive"}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────────────────────────────────────
export default function PromotionsPage() {
  const [promotions, setPromotions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createLoading, setCreateLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const [editPromotion, setEditPromotion] = useState(null);
  const [deletePromotion, setDeletePromotion] = useState(null);

  const { toasts, add: toast, remove: removeToast } = useToast();

  // ── Fetch promotions ───────────────────────────────────────────────────────
  const fetchPromotions = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/manage/promotions");
      const data = await res.json();
      if (data.success) setPromotions(data.promotions || []);
      else throw new Error(data.message || "Failed to load");
    } catch (err) {
      toast("Failed to load promotions", "error");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // ── Fetch categories for the form selects ─────────────────────────────────
  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch("/api/category/fetch");
      const data = await res.json();
      if (data.success) setCategories(data.categories || []);
    } catch {
      // non-fatal — form will show empty dropdown
    }
  }, []);

  useEffect(() => {
    fetchPromotions();
    fetchCategories();
  }, [fetchPromotions, fetchCategories]);

  // ── Create ─────────────────────────────────────────────────────────────────
  const handleCreate = async (form) => {
    try {
      setCreateLoading(true);
      const res = await fetch("/api/manage/promotions/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          requiredQuantity: Number(form.requiredQuantity),
          bundlePrice: Number(form.bundlePrice),
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Create failed");
      toast("Promotion created");
      fetchPromotions();
    } catch (err) {
      toast(err.message || "Failed to create promotion", "error");
    } finally {
      setCreateLoading(false);
    }
  };

  // ── Update ─────────────────────────────────────────────────────────────────
  const handleUpdate = async (form) => {
    try {
      setActionLoading(editPromotion._id + "_edit");
      const res = await fetch(
        `/api/manage/promotions/update/${editPromotion._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            requiredQuantity: Number(form.requiredQuantity),
            bundlePrice: Number(form.bundlePrice),
          }),
        }
      );
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Update failed");
      toast("Promotion updated");
      setEditPromotion(null);
      fetchPromotions();
    } catch (err) {
      toast(err.message || "Failed to update promotion", "error");
    } finally {
      setActionLoading(null);
    }
  };

  // ── Toggle active ──────────────────────────────────────────────────────────
  const handleToggle = async (p) => {
    try {
      setActionLoading(p._id + "_toggle");
      const res = await fetch(`/api/manage/promotions/update/${p._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !p.active }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Toggle failed");
      toast(`Promotion ${!p.active ? "enabled" : "disabled"}`);
      fetchPromotions();
    } catch (err) {
      toast(err.message || "Failed to update status", "error");
    } finally {
      setActionLoading(null);
    }
  };

  // ── Delete ─────────────────────────────────────────────────────────────────
  const handleDelete = async () => {
    try {
      setActionLoading(deletePromotion._id + "_del");
      const res = await fetch(
        `/api/manage/promotions/delete/${deletePromotion._id}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Delete failed");
      toast("Promotion deleted");
      setDeletePromotion(null);
      fetchPromotions();
    } catch (err) {
      toast(err.message || "Failed to delete promotion", "error");
    } finally {
      setActionLoading(null);
    }
  };

  // ── Derived stats ──────────────────────────────────────────────────────────
  const now = new Date();
  const isExpired = (p) =>
    p.validTill && new Date(p.validTill) < now;

  const summary = {
    total: promotions.length,
    active: promotions.filter((p) => p.active && !isExpired(p)).length,
    expired: promotions.filter(isExpired).length,
    categories: new Set(
      promotions.map(
        (p) => p.categoryID?._id?.toString() || p.categoryID?.toString()
      )
    ).size,
  };

  // ── Filtered + sorted list ─────────────────────────────────────────────────
  const filtered = promotions
    .filter((p) => {
      const matchSearch =
        p.title?.toLowerCase().includes(search.toLowerCase()) ||
        p.categoryID?.categoryName
          ?.toLowerCase()
          .includes(search.toLowerCase());
      const expired = isExpired(p);
      const matchStatus =
        filterStatus === "all"
          ? true
          : filterStatus === "active"
          ? p.active && !expired
          : !p.active || expired;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      if (sortBy === "newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === "savings")
        return b.bundlePrice - a.bundlePrice;
      return 0;
    });

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-8">
      <Toast toasts={toasts} remove={removeToast} />

      {/* Page Header */}
      <div>
        <p className="text-xs tracking-[0.3em] text-[#8A8A8A] uppercase mb-1">
          Promotions
        </p>
        <h1
          className="text-4xl font-bold text-black"
          style={{ fontFamily: "var(--seasons)" }}
        >
          Bundle Offers
        </h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          icon={Zap}
          label="Total Promotions"
          value={summary.total}
          accent
        />
        <SummaryCard
          icon={CheckCircle}
          label="Active"
          value={summary.active}
        />
        <SummaryCard icon={Clock} label="Expired" value={summary.expired} />
        <SummaryCard
          icon={Package}
          label="Categories"
          value={summary.categories}
        />
      </div>

      {/* ── Create Form ── */}
      <div className="border border-[#BFC3C7]">
        <div className="px-8 py-5 border-b border-[#BFC3C7] bg-[#F8F8F8]">
          <p className="text-xs tracking-[0.3em] text-[#8A8A8A] uppercase">
            New
          </p>
          <h2
            className="text-xl font-bold text-black mt-0.5"
            style={{ fontFamily: "var(--seasons)" }}
          >
            Create Promotion
          </h2>
        </div>
        <div className="px-8 py-6">
          {categories.length === 0 && !loading ? (
            <div className="flex items-center gap-3 py-4 text-[#8A8A8A]">
              <AlertTriangle size={16} />
              <p className="text-sm">
                No categories found. Create categories before setting up
                promotions.
              </p>
            </div>
          ) : (
            <PromotionForm
              onSubmit={handleCreate}
              loading={createLoading}
              categories={categories}
            />
          )}
        </div>
      </div>

      {/* ── Promotions Table ── */}
      <div className="space-y-4">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search
              size={15}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8A8A]"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title or category…"
              className="w-full border border-[#BFC3C7] pl-11 pr-4 py-3 text-sm text-black placeholder:text-[#8A8A8A] focus:outline-none focus:border-black transition-colors"
            />
          </div>

          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="appearance-none border border-[#BFC3C7] pl-4 pr-10 py-3 text-sm text-black focus:outline-none focus:border-black transition-colors cursor-pointer bg-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive / Expired</option>
            </select>
            <ChevronDown
              size={13}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8A8A] pointer-events-none"
            />
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none border border-[#BFC3C7] pl-4 pr-10 py-3 text-sm text-black focus:outline-none focus:border-black transition-colors cursor-pointer bg-white"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="savings">Bundle Price</option>
            </select>
            <ChevronDown
              size={13}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8A8A] pointer-events-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="border border-[#BFC3C7] overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="border-b border-[#BFC3C7] bg-[#F8F8F8]">
                {[
                  "Promotion",
                  "Category",
                  "Type",
                  "Bundle",
                  "Qty Required",
                  "Status",
                  "Valid Till",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-4 text-xs tracking-widest text-[#8A8A8A] uppercase font-medium whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-5 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Loader2
                        size={24}
                        className="animate-spin text-[#8A8A8A]"
                      />
                      <p className="text-xs tracking-widest uppercase text-[#8A8A8A]">
                        Loading promotions…
                      </p>
                    </div>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Zap size={24} className="text-[#BFC3C7]" />
                      <p className="text-xs tracking-widest uppercase text-[#8A8A8A]">
                        No promotions found
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((p) => {
                  const expired = isExpired(p);
                  const toggleLoading = actionLoading === p._id + "_toggle";
                  const delLoading = actionLoading === p._id + "_del";
                  const categoryName =
                    p.categoryID?.categoryName || "Unknown";

                  return (
                    <tr
                      key={p._id}
                      className="border-b border-[#BFC3C7] last:border-b-0 hover:bg-[#F8F8F8] transition-colors"
                    >
                      {/* Promotion title */}
                      <td className="px-5 py-4 max-w-[200px]">
                        <p className="text-sm font-bold text-black leading-snug">
                          {p.title}
                        </p>
                      </td>

                      {/* Category */}
                      <td className="px-5 py-4">
                        <span className="text-[10px] px-2 py-0.5 border border-[#BFC3C7] text-[#8A8A8A] tracking-widest uppercase whitespace-nowrap">
                          {categoryName}
                        </span>
                      </td>

                      {/* Type */}
                      <td className="px-5 py-4">
                        <span className="text-[10px] px-2 py-0.5 border border-black text-black tracking-widest uppercase">
                          {p.promotionType === "bundle_price"
                            ? "Bundle"
                            : p.promotionType}
                        </span>
                      </td>

                      {/* Bundle Price */}
                      <td className="px-5 py-4">
                        <p className="text-sm font-bold text-black">
                          ₹{p.bundlePrice?.toLocaleString()}
                        </p>
                        <p className="text-[11px] text-[#8A8A8A] mt-0.5">
                          total bundle
                        </p>
                      </td>

                      {/* Qty required */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xl font-bold text-black">
                            {p.requiredQuantity}
                          </span>
                          <span className="text-[11px] text-[#8A8A8A]">
                            items
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <StatusBadge active={p.active} expired={expired} />
                      </td>

                      {/* Valid Till */}
                      <td className="px-5 py-4 text-xs text-[#8A8A8A] whitespace-nowrap">
                        {p.validTill
                          ? new Date(p.validTill).toLocaleDateString("en-IN", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : "No expiry"}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          {/* Edit */}
                          <button
                            onClick={() => setEditPromotion(p)}
                            className="flex items-center gap-1.5 text-xs tracking-widest uppercase border border-[#BFC3C7] px-3 py-2 hover:border-black hover:text-black text-[#8A8A8A] transition-all whitespace-nowrap"
                          >
                            <Edit2 size={11} />
                            Edit
                          </button>

                          {/* Toggle */}
                          <button
                            onClick={() => handleToggle(p)}
                            disabled={!!actionLoading}
                            className={`flex items-center gap-1.5 text-xs tracking-widest uppercase border px-3 py-2 transition-all whitespace-nowrap disabled:opacity-40 ${
                              p.active
                                ? "border-[#BFC3C7] text-[#8A8A8A] hover:border-black hover:text-black"
                                : "border-black text-black hover:bg-black hover:text-white"
                            }`}
                          >
                            {toggleLoading ? (
                              <Loader2 size={11} className="animate-spin" />
                            ) : p.active ? (
                              <ToggleRight size={11} />
                            ) : (
                              <ToggleLeft size={11} />
                            )}
                            {p.active ? "Disable" : "Enable"}
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => setDeletePromotion(p)}
                            disabled={!!actionLoading}
                            className="flex items-center gap-1.5 text-xs tracking-widest uppercase border border-[#BFC3C7] px-3 py-2 hover:border-black hover:text-black text-[#8A8A8A] transition-all disabled:opacity-40"
                          >
                            {delLoading ? (
                              <Loader2 size={11} className="animate-spin" />
                            ) : (
                              <Trash2 size={11} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {!loading && (
          <p className="text-xs text-[#8A8A8A] tracking-wider">
            Showing {filtered.length} of {promotions.length} promotions
          </p>
        )}
      </div>

      {/* Edit Modal */}
      {editPromotion && (
        <EditModal
          promotion={editPromotion}
          onClose={() => setEditPromotion(null)}
          onSave={handleUpdate}
          loading={actionLoading === editPromotion._id + "_edit"}
          categories={categories}
        />
      )}

      {/* Delete Modal */}
      {deletePromotion && (
        <DeleteModal
          promotion={deletePromotion}
          onClose={() => setDeletePromotion(null)}
          onConfirm={handleDelete}
          loading={actionLoading === deletePromotion._id + "_del"}
        />
      )}
    </div>
  );
}