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
  Tag,
  CheckCircle,
  Clock,
  TrendingUp,
  ChevronDown,
  Loader2,
} from "lucide-react";

// ── Toast Notification ───────────────────────────────────────
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
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);
  const remove = useCallback((id) => setToasts((prev) => prev.filter((t) => t.id !== id)), []);
  return { toasts, add, remove };
}

// ── Default form state ───────────────────────────────────────
const EMPTY_FORM = {
  code: "",
  description: "",
  discountType: "flat",
  discountValue: "",
  minOrderAmount: "",
  maxDiscount: "",
  freeShipping: false,
  usageLimit: "",
  validFrom: "",
  validTill: "",
  isActive: true,
};

// ── Summary Card ─────────────────────────────────────────────
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
        <p className="text-[10px] tracking-widest uppercase text-[#8A8A8A] mt-0.5">{label}</p>
      </div>
    </div>
  );
}

// ── Field Component ──────────────────────────────────────────
function Field({ label, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs tracking-[0.2em] text-[#8A8A8A] uppercase">{label}</label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full border border-[#BFC3C7] px-4 py-2.5 text-sm text-black placeholder:text-[#BFC3C7] focus:outline-none focus:border-black transition-colors";

// ── Voucher Form ─────────────────────────────────────────────
function VoucherForm({ initial, onSubmit, loading, submitLabel, onReset }) {
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

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Voucher Code">
          <input
            required
            value={form.code}
            onChange={(e) => set("code", e.target.value.toUpperCase())}
            placeholder="SUMMER25"
            className={inputCls + " uppercase tracking-widest font-medium"}
          />
        </Field>
        <Field label="Description">
          <input
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Brief description"
            className={inputCls}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Field label="Discount Type">
          <div className="relative">
            <select
              value={form.discountType}
              onChange={(e) => set("discountType", e.target.value)}
              className={inputCls + " appearance-none pr-9 cursor-pointer"}
            >
              <option value="flat">Flat (₹)</option>
              <option value="percentage">Percentage (%)</option>
            </select>
            <ChevronDown
              size={13}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8A8A] pointer-events-none"
            />
          </div>
        </Field>
        <Field label="Discount Value">
          <input
            required
            type="number"
            min="0"
            value={form.discountValue}
            onChange={(e) => set("discountValue", e.target.value)}
            placeholder={form.discountType === "percentage" ? "e.g. 20" : "e.g. 200"}
            className={inputCls}
          />
        </Field>
        <Field label="Max Discount (₹)">
          <input
            type="number"
            min="0"
            value={form.maxDiscount}
            onChange={(e) => set("maxDiscount", e.target.value)}
            placeholder="Optional cap"
            className={inputCls}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Minimum Order Amount (₹)">
          <input
            type="number"
            min="0"
            value={form.minOrderAmount}
            onChange={(e) => set("minOrderAmount", e.target.value)}
            placeholder="e.g. 999"
            className={inputCls}
          />
        </Field>
        <Field label="Usage Limit">
          <input
            type="number"
            min="1"
            value={form.usageLimit}
            onChange={(e) => set("usageLimit", e.target.value)}
            placeholder="Total uses allowed"
            className={inputCls}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Valid From">
          <input
            required
            type="date"
            value={form.validFrom}
            onChange={(e) => set("validFrom", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Valid Till">
          <input
            required
            type="date"
            value={form.validTill}
            onChange={(e) => set("validTill", e.target.value)}
            className={inputCls}
          />
        </Field>
      </div>

      {/* Checkboxes */}
      <div className="flex flex-wrap gap-6 pt-1">
        <label className="flex items-center gap-2.5 cursor-pointer group">
          <div
            onClick={() => set("freeShipping", !form.freeShipping)}
            className={`w-5 h-5 border flex items-center justify-center flex-shrink-0 transition-colors ${
              form.freeShipping ? "bg-black border-black" : "border-[#BFC3C7] group-hover:border-black"
            }`}
          >
            {form.freeShipping && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
          </div>
          <span className="text-xs tracking-[0.2em] uppercase text-[#2B2B2B]">Free Shipping</span>
        </label>
        <label className="flex items-center gap-2.5 cursor-pointer group">
          <div
            onClick={() => set("isActive", !form.isActive)}
            className={`w-5 h-5 border flex items-center justify-center flex-shrink-0 transition-colors ${
              form.isActive ? "bg-black border-black" : "border-[#BFC3C7] group-hover:border-black"
            }`}
          >
            {form.isActive && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
          </div>
          <span className="text-xs tracking-[0.2em] uppercase text-[#2B2B2B]">Active</span>
        </label>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 bg-black text-white text-xs tracking-widest uppercase hover:bg-[#2B2B2B] transition-colors disabled:opacity-50"
        >
          {loading ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} />}
          {submitLabel || "Create Voucher"}
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

// ── Edit Modal ───────────────────────────────────────────────
function EditModal({ voucher, onClose, onSave, loading }) {
  const toDateInput = (d) => (d ? new Date(d).toISOString().split("T")[0] : "");

  const initial = {
    code: voucher.code || "",
    description: voucher.description || "",
    discountType: voucher.discountType || "flat",
    discountValue: voucher.discountValue?.toString() || "",
    minOrderAmount: voucher.minOrderAmount?.toString() || "",
    maxDiscount: voucher.maxDiscount?.toString() || "",
    freeShipping: voucher.freeShipping || false,
    usageLimit: voucher.usageLimit?.toString() || "",
    validFrom: toDateInput(voucher.validFrom),
    validTill: toDateInput(voucher.validTill),
    isActive: voucher.isActive ?? true,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#BFC3C7] sticky top-0 bg-white z-10">
          <div>
            <p className="text-xs tracking-[0.3em] text-[#8A8A8A] uppercase">Edit Voucher</p>
            <h2 className="text-xl font-bold text-black tracking-widest mt-0.5">{voucher.code}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center border border-[#BFC3C7] text-black hover:bg-black hover:text-white hover:border-black transition-all"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-8 py-6">
          <VoucherForm
            initial={initial}
            onSubmit={onSave}
            loading={loading}
            submitLabel="Save Changes"
            onReset={onClose}
          />
        </div>
      </div>
    </div>
  );
}

// ── Delete Confirm Modal ─────────────────────────────────────
function DeleteModal({ voucher, onClose, onConfirm, loading }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-sm">
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#BFC3C7]">
          <p className="text-xs tracking-[0.3em] text-[#8A8A8A] uppercase">Confirm Delete</p>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center border border-[#BFC3C7] hover:bg-black hover:text-white hover:border-black transition-all"
          >
            <X size={18} />
          </button>
        </div>
        <div className="px-8 py-6 space-y-4">
          <p className="text-sm text-[#2B2B2B]">
            Delete voucher{" "}
            <span className="font-bold tracking-widest">{voucher.code}</span>? This action cannot be
            undone.
          </p>
        </div>
        <div className="px-8 py-5 border-t border-[#BFC3C7] flex gap-3">
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-black text-white text-xs tracking-widest uppercase hover:bg-[#2B2B2B] transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
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

// ── Status Badge ─────────────────────────────────────────────
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
        active ? "border-black text-black" : "border-[#BFC3C7] text-[#8A8A8A]"
      }`}
    >
      {active ? "Active" : "Inactive"}
    </span>
  );
}

// ── Main Page ────────────────────────────────────────────────
export default function VoucherPage() {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createLoading, setCreateLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const [editVoucher, setEditVoucher] = useState(null);
  const [deleteVoucher, setDeleteVoucher] = useState(null);

  const { toasts, add: toast, remove: removeToast } = useToast();

  // ── Fetch ──────────────────────────────────────────────────
  const fetchVouchers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/manage/vouchers");
      const data = await res.json();
      if (data.success) setVouchers(data.vouchers || []);
      else throw new Error(data.message || "Failed to load");
    } catch (err) {
      toast("Failed to load vouchers", "error");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchVouchers();
  }, [fetchVouchers]);

  // ── Create ─────────────────────────────────────────────────
  const handleCreate = async (form) => {
    try {
      setCreateLoading(true);
      const res = await fetch("/api/manage/vouchers/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Create failed");
      toast("Voucher created successfully");
      fetchVouchers();
    } catch (err) {
      toast(err.message || "Failed to create voucher", "error");
    } finally {
      setCreateLoading(false);
    }
  };

  // ── Update ─────────────────────────────────────────────────
  const handleUpdate = async (form) => {
    try {
      setActionLoading(editVoucher._id + "_edit");
      const res = await fetch(`/api/manage/vouchers/update/${editVoucher._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Update failed");
      toast("Voucher updated");
      setEditVoucher(null);
      fetchVouchers();
    } catch (err) {
      toast(err.message || "Failed to update voucher", "error");
    } finally {
      setActionLoading(null);
    }
  };

  // ── Toggle Active ──────────────────────────────────────────
  const handleToggle = async (v) => {
    try {
      setActionLoading(v._id + "_toggle");
      const res = await fetch(`/api/manage/vouchers/update/${v._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !v.isActive }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Toggle failed");
      toast(`Voucher ${!v.isActive ? "enabled" : "disabled"}`);
      fetchVouchers();
    } catch (err) {
      toast(err.message || "Failed to update status", "error");
    } finally {
      setActionLoading(null);
    }
  };

  // ── Delete ─────────────────────────────────────────────────
  const handleDelete = async () => {
    try {
      setActionLoading(deleteVoucher._id + "_del");
      const res = await fetch(`/api/manage/vouchers/delete/${deleteVoucher._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Delete failed");
      toast("Voucher deleted");
      setDeleteVoucher(null);
      fetchVouchers();
    } catch (err) {
      toast(err.message || "Failed to delete voucher", "error");
    } finally {
      setActionLoading(null);
    }
  };

  // ── Derived data ───────────────────────────────────────────
  const now = new Date();
  const isExpired = (v) => new Date(v.validTill) < now;

  const summary = {
    total: vouchers.length,
    active: vouchers.filter((v) => v.isActive && !isExpired(v)).length,
    expired: vouchers.filter(isExpired).length,
    redemptions: vouchers.reduce((sum, v) => sum + (v.usedCount || 0), 0),
  };

  const filtered = vouchers
    .filter((v) => {
      const matchSearch = v.code?.toLowerCase().includes(search.toLowerCase());
      const matchStatus =
        filterStatus === "all"
          ? true
          : filterStatus === "active"
          ? v.isActive && !isExpired(v)
          : !v.isActive || isExpired(v);
      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === "mostUsed") return (b.usedCount || 0) - (a.usedCount || 0);
      return 0;
    });

  return (
    <div className="space-y-8">
      <Toast toasts={toasts} remove={removeToast} />

      {/* Page Header */}
      <div>
        <p className="text-xs tracking-[0.3em] text-[#8A8A8A] uppercase mb-1">Promotions</p>
        <h1 className="text-4xl font-bold text-black" style={{ fontFamily: "var(--seasons)" }}>
          Vouchers
        </h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard icon={Tag} label="Total Vouchers" value={summary.total} accent />
        <SummaryCard icon={CheckCircle} label="Active" value={summary.active} />
        <SummaryCard icon={Clock} label="Expired" value={summary.expired} />
        <SummaryCard icon={TrendingUp} label="Total Redemptions" value={summary.redemptions} />
      </div>

      {/* Create Voucher Form */}
      <div className="border border-[#BFC3C7]">
        <div className="px-8 py-5 border-b border-[#BFC3C7] bg-[#F8F8F8]">
          <p className="text-xs tracking-[0.3em] text-[#8A8A8A] uppercase">New</p>
          <h2 className="text-xl font-bold text-black mt-0.5" style={{ fontFamily: "var(--seasons)" }}>
            Create Voucher
          </h2>
        </div>
        <div className="px-8 py-6">
          <VoucherForm onSubmit={handleCreate} loading={createLoading} />
        </div>
      </div>

      {/* Voucher Table */}
      <div className="space-y-4">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={15}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8A8A]"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by code…"
              className="w-full border border-[#BFC3C7] pl-11 pr-4 py-3 text-sm text-black placeholder:text-[#8A8A8A] focus:outline-none focus:border-black transition-colors"
            />
          </div>

          {/* Filter Status */}
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="appearance-none border border-[#BFC3C7] pl-4 pr-10 py-3 text-sm text-black focus:outline-none focus:border-black transition-colors cursor-pointer"
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

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none border border-[#BFC3C7] pl-4 pr-10 py-3 text-sm text-black focus:outline-none focus:border-black transition-colors cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="mostUsed">Most Used</option>
            </select>
            <ChevronDown
              size={13}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8A8A] pointer-events-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="border border-[#BFC3C7] overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead>
              <tr className="border-b border-[#BFC3C7] bg-[#F8F8F8]">
                {[
                  "Code",
                  "Description",
                  "Type",
                  "Value",
                  "Min Order",
                  "Limit / Used",
                  "Free Ship",
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
                  <td colSpan={10} className="px-5 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 size={24} className="animate-spin text-[#8A8A8A]" />
                      <p className="text-xs tracking-widest uppercase text-[#8A8A8A]">
                        Loading vouchers…
                      </p>
                    </div>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-5 py-16 text-center">
                    <p className="text-xs tracking-widest uppercase text-[#8A8A8A]">
                      No vouchers found
                    </p>
                  </td>
                </tr>
              ) : (
                filtered.map((v) => {
                  const expired = isExpired(v);
                  const toggleLoading = actionLoading === v._id + "_toggle";
                  const delLoading = actionLoading === v._id + "_del";

                  return (
                    <tr
                      key={v._id}
                      className="border-b border-[#BFC3C7] last:border-b-0 hover:bg-[#F8F8F8] transition-colors"
                    >
                      {/* Code */}
                      <td className="px-5 py-4">
                        <p className="text-sm font-bold text-black tracking-widest">{v.code}</p>
                      </td>

                      {/* Description */}
                      <td className="px-5 py-4">
                        <p className="text-xs text-[#2B2B2B] max-w-[140px] truncate">
                          {v.description || "—"}
                        </p>
                      </td>

                      {/* Type */}
                      <td className="px-5 py-4">
                        <span className="text-[10px] px-2 py-0.5 border border-[#BFC3C7] text-[#8A8A8A] tracking-widest uppercase">
                          {v.discountType}
                        </span>
                      </td>

                      {/* Value */}
                      <td className="px-5 py-4 text-sm font-bold text-black">
                        {v.discountType === "percentage"
                          ? `${v.discountValue}%`
                          : `₹${v.discountValue}`}
                      </td>

                      {/* Min Order */}
                      <td className="px-5 py-4 text-sm text-[#2B2B2B]">
                        {v.minOrderAmount ? `₹${v.minOrderAmount}` : "—"}
                      </td>

                      {/* Limit / Used */}
                      <td className="px-5 py-4 text-sm text-[#2B2B2B]">
                        <span className="font-medium">{v.usedCount || 0}</span>
                        <span className="text-[#BFC3C7]"> / </span>
                        <span>{v.usageLimit || "∞"}</span>
                      </td>

                      {/* Free Shipping */}
                      <td className="px-5 py-4">
                        {v.freeShipping ? (
                          <span className="text-[10px] px-2 py-0.5 border border-black text-black tracking-widest uppercase">
                            Yes
                          </span>
                        ) : (
                          <span className="text-[#BFC3C7] text-sm">—</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <StatusBadge active={v.isActive} expired={expired} />
                      </td>

                      {/* Valid Till */}
                      <td className="px-5 py-4 text-xs text-[#8A8A8A] whitespace-nowrap">
                        {new Date(v.validTill).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          {/* Edit */}
                          <button
                            onClick={() => setEditVoucher(v)}
                            className="flex items-center gap-1.5 text-xs tracking-widest uppercase border border-[#BFC3C7] px-3 py-2 hover:border-black hover:text-black text-[#8A8A8A] transition-all whitespace-nowrap"
                          >
                            <Edit2 size={11} />
                            Edit
                          </button>

                          {/* Toggle */}
                          <button
                            onClick={() => handleToggle(v)}
                            disabled={!!actionLoading}
                            className={`flex items-center gap-1.5 text-xs tracking-widest uppercase border px-3 py-2 transition-all whitespace-nowrap disabled:opacity-40 ${
                              v.isActive
                                ? "border-[#BFC3C7] text-[#8A8A8A] hover:border-black hover:text-black"
                                : "border-black text-black hover:bg-black hover:text-white"
                            }`}
                          >
                            {toggleLoading ? (
                              <Loader2 size={11} className="animate-spin" />
                            ) : v.isActive ? (
                              <ToggleRight size={11} />
                            ) : (
                              <ToggleLeft size={11} />
                            )}
                            {v.isActive ? "Disable" : "Enable"}
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => setDeleteVoucher(v)}
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

        {/* Row count */}
        {!loading && (
          <p className="text-xs text-[#8A8A8A] tracking-wider">
            Showing {filtered.length} of {vouchers.length} vouchers
          </p>
        )}
      </div>

      {/* Edit Modal */}
      {editVoucher && (
        <EditModal
          voucher={editVoucher}
          onClose={() => setEditVoucher(null)}
          onSave={handleUpdate}
          loading={actionLoading === editVoucher._id + "_edit"}
        />
      )}

      {/* Delete Modal */}
      {deleteVoucher && (
        <DeleteModal
          voucher={deleteVoucher}
          onClose={() => setDeleteVoucher(null)}
          onConfirm={handleDelete}
          loading={actionLoading === deleteVoucher._id + "_del"}
        />
      )}
    </div>
  );
}