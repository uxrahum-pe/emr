"use client";

import { useState, useRef, useEffect } from "react";
import type { DropdownListProps, DropdownListItem } from "@/types";

/**
 * DropdownList 컴포넌트
 *
 * @description C1008 (트리거)와 C228 (드롭다운 메뉴)를 사용하는 드롭다운 리스트 컴포넌트
 * 롤오버 시 드롭다운이 열리고, JSON 데이터를 받아 목록을 렌더링합니다.
 *
 * @component
 */
export default function DropdownList({
  items,
  selectedValue,
  onSelect,
  placeholder = "종류 선택",
  className = "",
  disabled = false,
}: DropdownListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 선택된 항목 찾기
  const selectedItem = items.find((item) => item.value === selectedValue);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  // cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  // 항목 선택 핸들러
  const handleItemClick = (item: DropdownListItem) => {
    if (disabled) return;
    onSelect?.(item);
    setIsOpen(false);
  };

  // 롤오버 핸들러 - 갭을 통과할 시간을 주기 위해 delay 추가
  const handleMouseEnter = () => {
    if (disabled) return;
    // 기존 timeout 취소
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    // 약간의 delay를 주어 갭을 통과할 시간을 줌
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  return (
    <div
      ref={containerRef}
      className={`C1008 ${className}`.trim()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: disabled ? "default" : "pointer", position: "relative" }}
    >
      <p className="T096">{selectedItem?.label ?? placeholder}</p>
      <div className="C1019 isIcon styleSheet isMini isChevron isWhite"></div>
      <div
        className={`C228 ${isOpen ? "isOpened" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ top: "100%", marginTop: "var(--size-5)" }}
      >
        {items.map((item) => (
          <div
            key={item.value}
            className="C229"
            onClick={() => handleItemClick(item)}
          >
            <p className="T097">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
