"use client";

import { useState } from "react";

export interface TabItem {
  title: string;
  link?: string;
}

export interface TabSelectorProps {
  items: TabItem[];
  multiple?: boolean;
  defaultValue?: number | number[];
  value?: number | number[];
  onChange?: (selected: number | number[]) => void;
  className?: string;
  width?: string | number;
}

export default function TabSelector(props: TabSelectorProps) {
  const {
    items,
    multiple = false,
    defaultValue,
    value,
    onChange,
    className = "",
    width,
  } = props;

  const isControlled = value !== undefined;

  const [internalValue, setInternalValue] = useState<number | number[]>(() => {
    if (isControlled) {
      return multiple ? (value as number[]) || [] : (value as number) || 0;
    }
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    if (multiple) {
      // multiple일 때 모든 항목 선택 (0부터 items.length-1까지)
      return items.map((_, index) => index);
    }
    // single일 때 첫 번째 항목 선택
    return 0;
  });

  const currentValue = isControlled ? value : internalValue;

  const handleClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();

    if (multiple) {
      const currentArray = Array.isArray(currentValue) ? currentValue : [];
      const newValue = currentArray.includes(index)
        ? currentArray.filter((i) => i !== index)
        : [...currentArray, index];

      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    } else {
      const newValue = index;
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    }
  };

  const isSelected = (index: number): boolean => {
    if (multiple) {
      const currentArray = Array.isArray(currentValue) ? currentValue : [];
      return currentArray.includes(index);
    }
    return currentValue === index;
  };

  const widthStyle =
    width !== undefined
      ? { width: typeof width === "number" ? `${width}px` : width }
      : {};

  return (
    <div className={`C049 ${className}`} style={widthStyle}>
      {items.map((item, index) => (
        <div
          key={index}
          className={`C050 ${isSelected(index) ? "isSelected" : ""}`}
          onClick={(e) => handleClick(index, e)}
        >
          <p className="T025">{item.title}</p>
        </div>
      ))}
    </div>
  );
}
