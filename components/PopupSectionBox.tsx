"use client";

import { ReactNode } from "react";

export interface PopupSectionBoxProps {
  /** 컨테이너 내용 */
  children: ReactNode;
  /** X 좌표 (left) */
  x?: number | string;
  /** Y 좌표 (top) */
  y?: number | string;
  /** 너비 */
  width?: number | string;
  /** 높이 */
  height?: number | string;
  /** 추가 클래스명 */
  className?: string;
  /** C183 영역의 배경색상 (CSS 변수명 예: "white-25", "magenta-7" 또는 직접 색상 값) */
  borderBackgroundColor?: string;
}

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

  return (
    <section
      className={`C178 ${className}`.trim()}
      style={style}
      onClick={handleClick}
    >
      <div className="C179"></div>
      <div className="C183" style={borderStyle}>
        {children}
      </div>
    </section>
  );
}
