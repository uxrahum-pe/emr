"use client";

import { useMemo } from "react";

import type { PopupSectionBoxProps } from "@/types/ui";

/**
 * 팝업 섹션 박스용 컨테이너 컴포넌트
 * 절대좌표로 위치와 크기를 지정할 수 있는 섹션 박스
 */
export default function PopupSectionBox({
  children,
  x,
  y,
  width,
  height,
  className = "",
  borderBackgroundColor,
  innerClassName = "C183",
  name,
  onMouseEnter,
  onMouseLeave,
}: PopupSectionBoxProps) {
  const toSizeValue = (
    value: number | string | undefined
  ): string | undefined => {
    if (value === undefined) return undefined;
    if (typeof value === "number") {
      return `var(--size-${value})`;
    }
    return value;
  };

  const toColorValue = (value: string | undefined): string | undefined => {
    if (value === undefined) return undefined;
    // CSS 변수 형식인지 확인 (예: "white-25", "magenta-7")
    if (
      value.includes("-") &&
      !value.startsWith("#") &&
      !value.startsWith("rgb")
    ) {
      // 색상 이름과 투명도 분리 (예: "white-25" -> "white", "25")
      const parts = value.split("-");
      if (parts.length >= 2) {
        const colorName = parts[0];
        const opacity = parts.slice(1).join("-");
        return `var(--color-${colorName}-${opacity})`;
      }
      return `var(--color-${value})`;
    }
    // 직접 색상 값 (hex, rgb 등)
    return value;
  };

  const style: React.CSSProperties = {
    position: "absolute",
    ...(x !== undefined && { left: toSizeValue(x) }),
    ...(y !== undefined && { top: toSizeValue(y) }),
    width: width !== undefined ? toSizeValue(width) : "fit-content",
    height: height !== undefined ? toSizeValue(height) : "fit-content",
  };

  const borderStyle: React.CSSProperties = {
    ...(borderBackgroundColor && {
      background: toColorValue(borderBackgroundColor),
    }),
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const sectionClassName = useMemo(() => {
    const classes = [
      "C178",
      name && `is${name.charAt(0).toUpperCase() + name.slice(1)}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");
    return classes.trim();
  }, [name, className]);

  return (
    <section
      className={sectionClassName}
      style={style}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="C179"></div>
      <div className={innerClassName} style={borderStyle}>
        {children}
      </div>
    </section>
  );
}
