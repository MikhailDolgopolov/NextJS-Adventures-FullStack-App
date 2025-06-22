'use client';

import { useState, useEffect, useRef } from 'react';

interface SearchInputProps<Type> {
  id: string;
  /** Array of items to search */
  array?: Type[];
  /** How to turn an item into its display string */
  stringify: (item: Type) => string;
  /** Called whenever the input string changes or is cleared */
  onSetValue: (value: string) => void;
  /** Optionally called when an item is selected (or undefined if cleared) */
  onSetItem?: (item: Type | undefined) => void;
  /** If true, only allow selecting existing items (clears otherwise) */
  onlySelect?: boolean;
  /** Initial string in the input */
  defaultValue?: string;
  /** Whether the input may be left empty */
  not_required?: boolean;
}

export default function SearchInput<Type>({
  id,
  array = [],
  stringify,
  onSetValue,
  onSetItem,
  onlySelect = false,
  defaultValue = '',
  not_required = false,
}: SearchInputProps<Type>) {
  const [query, setQuery] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync outside defaultValue -> internal query
  useEffect(() => {
    setQuery(defaultValue);
  }, [defaultValue]);

  // Notify parent on query change
  useEffect(() => {
    onSetValue(query);
    if (onSetItem) {
      const match = array.find((item) => stringify(item) === query);
      onSetItem(match);
    }
  }, [query, array, stringify, onSetValue, onSetItem]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        // enforce onlySelect: clear if no exact match
        if (onlySelect && !array.find((item) => stringify(item) === query)) {
          setQuery('');
        }
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [array, onlySelect, query, stringify]);

  // Compute filtered suggestions
  const suggestions = array
    .map((item) => ({ item, text: stringify(item) }))
    .filter(({ text }) => {
      const q = query.toLowerCase();
      return q && text.toLowerCase().includes(q) && text.toLowerCase() !== q;
    });

  return (
    <div ref={containerRef} className="relative inline-block w-full">
      <input
        id={id}
        type="text"
        autoComplete="off"
        className="search w-full"
        value={query}
        required={!not_required}
        onFocus={() => setOpen(true)}
        onChange={(e) => setQuery(e.target.value)}
      />

      {open && suggestions.length > 0 && (
        <div className="outline results absolute z-10 w-full bg-white shadow">
          {suggestions.map(({ text }) => (
            <div
              key={text}
              className="hoverable cursor-pointer p-2"
              onClick={() => {
                setQuery(text);
                setOpen(false);
              }}
            >
              <p>{text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
