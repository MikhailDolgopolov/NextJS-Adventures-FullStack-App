import { useEffect, useState } from "react";
import Loading from "./Loading";

interface ButtonSelectProps<Type> {
  array?: Type[];
  id: string;
  stringify: (item: Type) => string;
  onSelect: (item: Type) => void;
  clearSwitch?: unknown;
  resetSwitch?: boolean;
  defaultValue?: string;
  hideContent?: boolean;
  children?: React.ReactNode;
}

function ButtonSelect<Type>({
  array,
  id,
  stringify,
  onSelect,
  clearSwitch,
  resetSwitch,
  defaultValue,
  hideContent,
  children,
}: ButtonSelectProps<Type>) {
  const [selectedKey, setSelectedKey] = useState<string | undefined>(defaultValue);

  // Reset selection when clearSwitch changes
  useEffect(() => {
    setSelectedKey(undefined);
  }, [clearSwitch]);

  // Initialize selection when array or defaultValue or resetSwitch changes
  useEffect(() => {
    if (!array || array.length === 0) return;
    if (defaultValue) setSelectedKey(defaultValue);
    else setSelectedKey(stringify(array[0]));
  }, [array, defaultValue, resetSwitch, stringify]);

  if (!array) return <Loading object="данные" />;

  return (
    <div className="flex-grid wide">
      {!hideContent &&
        array.map((item) => {
          const key = stringify(item);
          const isSelected = key === selectedKey;
          return (
            <button
              type="button"
              key={key}
              id={key}
              data-selected={isSelected ? "1" : "0"}
              className={`flex-block hoverable my-select-button-${id}`}
              onClick={() => {
                setSelectedKey(key);
                onSelect(item);
              }}
            >
              {key.includes("(") ? <p className="note">{key}</p> : key}
            </button>
          );
        })}
      {children}
    </div>
  );
}

export default ButtonSelect;
