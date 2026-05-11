import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Package, Tag, LayoutGrid, ExternalLink } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { searchAll, highlight, SearchResult } from "@/lib/search";
import { openNamedTab, tabName } from "@/lib/tabs";

export const SearchBox = () => {
  const nav = useNavigate();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const debounced = useDebounce(q, 300);

  const results = useMemo(() => searchAll(debounced), [debounced]);

  useEffect(() => setActive(0), [debounced]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const go = (r: SearchResult, newTab = false) => {
    const key = r.type === "product" ? r.product.id : r.to;
    if (newTab) {
      openNamedTab(r.to, tabName(key));
    } else {
      nav(r.to);
    }
    setOpen(false);
    setQ("");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (results[active]) return go(results[active]);
    if (q.trim()) {
      nav(`/c/all?q=${encodeURIComponent(q.trim())}`);
      setOpen(false);
    }
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (!open || !results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const showDropdown = open && debounced.trim().length > 0;

  return (
    <div ref={wrapRef} className="relative max-w-md">
      <form
        onSubmit={onSubmit}
        className="flex items-center gap-2 border-b border-foreground/30 pb-1.5"
      >
        <Search className="w-5 h-5 text-brand-magenta" />
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKey}
          placeholder="Search NNNOW"
          aria-label="Search NNNOW"
          aria-autocomplete="list"
          aria-expanded={showDropdown}
          className="bg-transparent outline-none w-full text-sm placeholder:text-foreground/50"
        />
      </form>

      {showDropdown && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-full mt-2 bg-background border border-border rounded-sm shadow-lg max-h-[480px] overflow-auto z-50"
        >
          {results.length === 0 ? (
            <div className="px-4 py-6 text-sm text-foreground/60 text-center">
              No results found for <span className="font-semibold">"{debounced}"</span>
            </div>
          ) : (
            <ul className="py-1">
              {results.map((r, i) => (
                <ResultRow
                  key={`${r.type}-${i}-${r.label}`}
                  r={r}
                  q={debounced}
                  active={i === active}
                  onHover={() => setActive(i)}
                  onSelect={(newTab) => go(r, newTab)}
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

const ResultRow = ({
  r,
  q,
  active,
  onHover,
  onSelect,
}: {
  r: SearchResult;
  q: string;
  active: boolean;
  onHover: () => void;
  onSelect: (newTab: boolean) => void;
}) => {
  const Icon = r.type === "product" ? Package : r.type === "brand" ? Tag : LayoutGrid;
  const parts = highlight(r.label, q);

  return (
    <li
      role="option"
      aria-selected={active}
      onMouseEnter={onHover}
      onClick={(e) => onSelect(e.metaKey || e.ctrlKey)}
      onContextMenu={(e) => {
        e.preventDefault();
        onSelect(true);
      }}
      className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer text-sm ${
        active ? "bg-secondary" : ""
      }`}
    >
      {r.type === "product" && r.product.image ? (
        <img
          src={r.product.image}
          alt=""
          className="w-10 h-10 object-cover rounded-sm bg-muted shrink-0"
          loading="lazy"
        />
      ) : (
        <span className="w-10 h-10 grid place-items-center bg-muted rounded-sm shrink-0">
          <Icon className="w-4 h-4 text-foreground/60" />
        </span>
      )}
      <div className="flex-1 min-w-0">
        <p className="truncate">
          {parts.map((p, i) =>
            p.match ? (
              <mark key={i} className="bg-brand-yellow/40 text-foreground rounded-sm px-0.5">
                {p.text}
              </mark>
            ) : (
              <span key={i}>{p.text}</span>
            ),
          )}
        </p>
        <p className="text-xs text-foreground/50 truncate">
          {r.type === "product"
            ? r.sublabel
            : r.type === "brand"
              ? `Brand · ${r.count} items`
              : `Category · ${r.count} items`}
        </p>
      </div>
      <button
        type="button"
        aria-label="Open in new tab"
        onClick={(e) => {
          e.stopPropagation();
          onSelect(true);
        }}
        className="opacity-60 hover:opacity-100 p-1"
      >
        <ExternalLink className="w-3.5 h-3.5" />
      </button>
    </li>
  );
};
