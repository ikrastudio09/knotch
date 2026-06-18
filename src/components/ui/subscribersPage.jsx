"use client";
import { useState, useEffect } from "react";
import {
  Eye,
  X,
  Mail,
  Send,
  Users,
  Calendar,
  CheckCircle,
  Trash2,
  Download,
} from "lucide-react";

// ── Status Badge (mirrors your StatusBadge component) ───────
function StatusBadge({ status }) {
  const map = {
    active: {
      label: "Active",
      bg: "bg-[#E6F4EA]",
      text: "text-[#1A7F37]",
      dot: "bg-[#1A7F37]",
    },
    unsubscribed: {
      label: "Unsubscribed",
      bg: "bg-[#FFF3CD]",
      text: "text-[#856404]",
      dot: "bg-[#856404]",
    },
    bounced: {
      label: "Bounced",
      bg: "bg-[#F8D7DA]",
      text: "text-[#842029]",
      dot: "bg-[#842029]",
    },
  };
  const s = map[status] || map["active"];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] tracking-widest uppercase font-medium ${s.bg} ${s.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

// ── Compose Email Modal ──────────────────────────────────────
function ComposeModal({ subscribers, selectedIds, onClose, onSend }) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const targets =
    selectedIds.length > 0
      ? subscribers.filter((s) => selectedIds.includes(s._id))
      : subscribers.filter((s) => s.status === "active");

  const handleSend = async () => {
    if (!subject.trim() || !body.trim()) return;
    setSending(true);
    // TODO: POST /api/subscribers/send-email { subject, body, recipientIds: targets.map(t => t._id) }
    await new Promise((r) => setTimeout(r, 1200)); // simulate API
    setSending(false);
    setSent(true);
    setTimeout(() => {
      onSend();
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#BFC3C7] sticky top-0 bg-white z-10">
          <div>
            <p className="text-xs tracking-[0.3em] text-black uppercase mb-1">
              Promotional Email
            </p>
            <h2
              className="text-2xl font-bold text-black"
              style={{ fontFamily: "var(--seasons)" }}
            >
              Compose
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center border border-[#BFC3C7] text-black hover:bg-black hover:text-white hover:border-black transition-all"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-8 py-6 space-y-6">
          {/* Recipients */}
          <section className="space-y-3">
            <p className="text-xs tracking-[0.25em] text-black uppercase border-b border-[#BFC3C7] pb-2">
              Recipients ({targets.length})
            </p>
            <div className="flex flex-wrap gap-2 max-h-28 overflow-y-auto pr-1">
              {targets.map((t) => (
                <span
                  key={t._id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#BFC3C7] text-xs text-black bg-[#F8F8F8]"
                >
                  <Mail size={10} />
                  {t.email}
                </span>
              ))}
            </div>
            {selectedIds.length === 0 && (
              <p className="text-xs text-[#6B6B6B] italic">
                No subscribers selected — sending to all active subscribers.
              </p>
            )}
          </section>

          {/* Subject */}
          <section className="space-y-2">
            <p className="text-xs tracking-[0.25em] text-black uppercase border-b border-[#BFC3C7] pb-2">
              Subject Line
            </p>
            <input
              type="text"
              placeholder="e.g. New Collection — Exclusively Yours"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border border-[#BFC3C7] px-4 py-3 text-sm text-black placeholder-[#9CA3AF] focus:outline-none focus:border-black transition-colors bg-white"
            />
          </section>

          {/* Body */}
          <section className="space-y-2">
            <p className="text-xs tracking-[0.25em] text-black uppercase border-b border-[#BFC3C7] pb-2">
              Email Body
            </p>
            <textarea
              rows={8}
              placeholder="Write your promotional message here..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full border border-[#BFC3C7] px-4 py-3 text-sm text-black placeholder-[#9CA3AF] focus:outline-none focus:border-black transition-colors bg-white resize-none"
            />
          </section>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-8 py-5 border-t border-[#BFC3C7] bg-[#F8F8F8] sticky bottom-0">
          <button
            onClick={onClose}
            className="px-6 py-3 text-xs tracking-widest uppercase border border-[#BFC3C7] text-black hover:border-black transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={sending || sent || !subject.trim() || !body.trim()}
            className={`flex items-center gap-2 px-8 py-3 text-xs tracking-widest uppercase font-medium transition-colors ${
              sent
                ? "bg-[#1A7F37] text-white"
                : "bg-black text-white hover:bg-[#2B2B2B] disabled:opacity-40 disabled:cursor-not-allowed"
            }`}
          >
            {sent ? (
              <>
                <CheckCircle size={14} /> Sent!
              </>
            ) : sending ? (
              "Sending…"
            ) : (
              <>
                <Send size={14} /> Send to {targets.length} subscriber
                {targets.length !== 1 ? "s" : ""}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Subscriber Detail Modal ──────────────────────────────────
function SubscriberModal({ subscriber, onClose, onDelete }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#BFC3C7]">
          <div>
            <p className="text-xs tracking-[0.3em] text-black uppercase mb-1">
              Subscriber
            </p>
            <h2
              className="text-2xl font-bold text-black"
              style={{ fontFamily: "var(--seasons)" }}
            >
              Details
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center border border-[#BFC3C7] text-black hover:bg-black hover:text-white hover:border-black transition-all"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-8 py-6 space-y-6">
          {/* Email */}
          <section className="space-y-3">
            <p className="text-xs tracking-[0.25em] text-black uppercase border-b border-[#BFC3C7] pb-2">
              Contact
            </p>
            <div className="flex items-center gap-2">
              <Mail size={13} className="text-black flex-shrink-0" />
              <p className="text-sm text-black">{subscriber.email}</p>
            </div>
          </section>

          {/* Status & Source */}
          <section className="space-y-3">
            <p className="text-xs tracking-[0.25em] text-black uppercase border-b border-[#BFC3C7] pb-2">
              Info
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs tracking-widest text-black uppercase mb-1">
                  Status
                </p>
                <StatusBadge status={subscriber.status} />
              </div>
              <div>
                <p className="text-xs tracking-widest text-black uppercase mb-1">
                  Source
                </p>
                <p className="text-sm font-bold text-black capitalize">
                  {subscriber.source || "Website"}
                </p>
              </div>
              <div>
                <p className="text-xs tracking-widest text-black uppercase mb-1">
                  Subscribed On
                </p>
                <p className="text-sm font-bold text-black">
                  {new Date(subscriber.subscribedAt).toLocaleDateString(
                    "en-IN",
                    { year: "numeric", month: "short", day: "numeric" }
                  )}
                </p>
              </div>
              {subscriber.unsubscribedAt && (
                <div>
                  <p className="text-xs tracking-widest text-black uppercase mb-1">
                    Unsubscribed On
                  </p>
                  <p className="text-sm font-bold text-black">
                    {new Date(subscriber.unsubscribedAt).toLocaleDateString(
                      "en-IN",
                      { year: "numeric", month: "short", day: "numeric" }
                    )}
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-8 py-5 border-t border-[#BFC3C7] bg-[#F8F8F8]">
          <button
            onClick={onClose}
            className="px-6 py-3 text-xs tracking-widest uppercase border border-[#BFC3C7] text-black hover:border-black transition-all"
          >
            Close
          </button>
          <button
            onClick={() => {
              onDelete(subscriber._id);
              onClose();
            }}
            className="flex items-center gap-2 px-6 py-3 text-xs tracking-widest uppercase border border-[#BFC3C7] text-[#842029] hover:bg-[#842029] hover:text-white hover:border-[#842029] transition-all"
          >
            <Trash2 size={13} /> Remove
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Subscribers Page ─────────────────────────────────────────
export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showCompose, setShowCompose] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const res = await fetch("/api/admin/manage/subscribers");
      const data = await res.json();
      if (data.success) {
        setSubscribers(data.subscribers);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    // TODO: DELETE /api/subscribers/:id
    setSubscribers((prev) => prev.filter((s) => s._id !== id));
    setSelectedIds((prev) => prev.filter((i) => i !== id));
  };

  const handleExportCSV = () => {
    const rows = [
      ["Email", "Status", "Source", "Subscribed On"],
      ...filtered.map((s) => [
        s.email,
        s.status,
        s.source || "website",
        new Date(s.subscribedAt).toLocaleDateString("en-IN"),
      ]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subscribers-${filter}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filtered.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filtered.map((s) => s._id));
    }
  };

  const counts = {
    all: subscribers.length,
    active: subscribers.filter((s) => s.status === "active").length,
    unsubscribed: subscribers.filter((s) => s.status === "unsubscribed").length,
    bounced: subscribers.filter((s) => s.status === "bounced").length,
  };

  const filtered =
    filter === "all"
      ? subscribers
      : subscribers.filter((s) => s.status === filter);

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading subscribers...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs tracking-[0.3em] text-black uppercase mb-1">
            Marketing
          </p>
          <h1
            className="text-4xl font-bold text-black"
            style={{ fontFamily: "var(--seasons)" }}
          >
            Subscribers
          </h1>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 mt-1">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-4 py-2.5 text-xs tracking-widest uppercase border border-[#BFC3C7] text-black hover:border-black transition-all"
          >
            <Download size={13} /> Export CSV
          </button>
          <button
            onClick={() => setShowCompose(true)}
            className="flex items-center gap-1.5 px-5 py-2.5 text-xs tracking-widest uppercase bg-black text-white hover:bg-[#2B2B2B] transition-colors font-medium"
          >
            <Send size={13} /> Send Email
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total", value: counts.all, icon: Users },
          { label: "Active", value: counts.active, icon: CheckCircle },
          { label: "Unsubscribed", value: counts.unsubscribed, icon: X },
          { label: "Bounced", value: counts.bounced, icon: Mail },
        ].map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="border border-[#BFC3C7] px-5 py-4 flex items-center gap-3"
          >
            <div className="w-8 h-8 border border-[#BFC3C7] flex items-center justify-center flex-shrink-0">
              <Icon size={14} className="text-black" />
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase text-black">
                {label}
              </p>
              <p className="text-xl font-bold text-black">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter tabs + select action */}
      <div className="flex items-center justify-between">
        <div className="flex border border-[#BFC3C7] w-fit">
          {["all", "active", "unsubscribed", "bounced"].map((f, i) => (
            <button
              key={f}
              onClick={() => {
                setFilter(f);
                setSelectedIds([]);
              }}
              className={`px-5 py-3 text-xs tracking-widest uppercase transition-all ${
                filter === f ? "bg-black text-white" : "text-black hover:text-black"
              } ${i !== 0 ? "border-l border-[#BFC3C7]" : ""}`}
            >
              {f} ({counts[f]})
            </button>
          ))}
        </div>

        {selectedIds.length > 0 && (
          <button
            onClick={() => setShowCompose(true)}
            className="flex items-center gap-1.5 px-5 py-2.5 text-xs tracking-widest uppercase bg-black text-white hover:bg-[#2B2B2B] transition-colors font-medium"
          >
            <Send size={13} /> Email {selectedIds.length} Selected
          </button>
        )}
      </div>

      {/* Table */}
      <div className="border border-[#BFC3C7] overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-[#BFC3C7] bg-[#F8F8F8]">
              <th className="px-5 py-4 w-10">
                <input
                  type="checkbox"
                  checked={
                    filtered.length > 0 &&
                    selectedIds.length === filtered.length
                  }
                  onChange={toggleSelectAll}
                  className="w-4 h-4 accent-black cursor-pointer"
                />
              </th>
              {["Email", "Status", "Source", "Subscribed On", ""].map((h) => (
                <th
                  key={h}
                  className="text-left px-5 py-4 text-xs tracking-widest text-black uppercase font-medium whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-16 text-sm text-[#6B6B6B]"
                >
                  No subscribers found.
                </td>
              </tr>
            ) : (
              filtered.map((s) => (
                <tr
                  key={s._id}
                  className={`border-b border-[#BFC3C7] last:border-b-0 hover:bg-[#F8F8F8] transition-colors ${
                    selectedIds.includes(s._id) ? "bg-[#F8F8F8]" : ""
                  }`}
                >
                  <td className="px-5 py-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(s._id)}
                      onChange={() => toggleSelect(s._id)}
                      className="w-4 h-4 accent-black cursor-pointer"
                    />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Mail size={13} className="text-black flex-shrink-0" />
                      <p className="text-sm font-medium text-black">
                        {s.email}
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={s.status} />
                  </td>
                  <td className="px-5 py-4 text-sm text-[#2B2B2B] capitalize">
                    {s.source || "Website"}
                  </td>
                  <td className="px-5 py-4 text-xs text-black whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={11} className="text-black" />
                      {new Date(s.subscribedAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => setSelected(s)}
                      className="flex items-center gap-1.5 text-xs tracking-widest uppercase border border-[#BFC3C7] px-3 py-2 hover:border-black hover:text-black text-black transition-all whitespace-nowrap"
                    >
                      <Eye size={12} /> Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {selected && (
        <SubscriberModal
          subscriber={selected}
          onClose={() => setSelected(null)}
          onDelete={handleDelete}
        />
      )}

      {showCompose && (
        <ComposeModal
          subscribers={subscribers}
          selectedIds={selectedIds}
          onClose={() => setShowCompose(false)}
          onSend={() => setSelectedIds([])}
        />
      )}
    </div>
  );
}