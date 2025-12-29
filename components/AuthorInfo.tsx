"use client";

/**
 * AuthorInfo Component
 *
 * @description 작성자 정보를 표시하는 컴포넌트 (C2033 구조)
 * @component
 */

import type { AuthorInfoProps } from "@/types/ui";

/**
 * 작성자 정보 컴포넌트
 */
export default function AuthorInfo({
  imageSrc,
  imageAlt = "작성자",
  label = "작성자",
  name,
  title,
  onClick,
  className = "",
  length,
}: AuthorInfoProps) {
  const lengthClass =
    length === "short"
      ? "isShort"
      : length === "shorter"
      ? "isShorter"
      : length === "veryShorter"
      ? "isVeryShorter"
      : "";

  const containerClassName = ["C2033", lengthClass, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClassName} onClick={onClick}>
      <img src={imageSrc} alt={imageAlt} className="C2034" />
      <div className="C2035">
        <p className="T2040">{label}</p>
        <p className="T2041">
          {name}
          {title && <span className="T2042"> {title}</span>}
        </p>
      </div>
      <div className="C2036 styleSheet isIcon isMini isChevron isRight"></div>
    </div>
  );
}
