"use client";

/**
 * CustomerInfo Component
 *
 * @description 고객 정보를 표시하는 컴포넌트 (C2037 구조)
 * @component
 */

import type { CustomerInfoProps } from "@/types/ui";

/**
 * 고객 정보 컴포넌트
 */
export default function CustomerInfo({
  name,
  gender,
  age,
  packageNumber,
  customerNumber,
  onInfoClick,
  className = "",
  length,
}: CustomerInfoProps) {
  const lengthClass =
    length === "short"
      ? "isShort"
      : length === "shorter"
      ? "isShorter"
      : length === "veryShorter"
      ? "isVeryShorter"
      : "";

  const containerClassName = ["C2037", lengthClass, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClassName}>
      {name && <p className="T2043">{name}</p>}
      {gender && <p className="T2044">{gender}</p>}
      {age !== undefined && (
        <p className="T2045">
          {age}
          <span className="T2047">세</span>
        </p>
      )}
      {packageNumber !== undefined && (
        <p className="T2045">
          {packageNumber}
          <span className="T2047">기</span>
        </p>
      )}
      {customerNumber && <p className="T2046">{customerNumber}</p>}
      {onInfoClick && (
        <div className="C2038" onClick={onInfoClick}>
          <div className="C179 isDepth1"></div>
          <div className="C2039 styleSheet isIcon isInfo"></div>
        </div>
      )}
    </div>
  );
}
