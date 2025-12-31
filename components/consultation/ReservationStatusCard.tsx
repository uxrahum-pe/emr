"use client";

import type { ReactNode } from "react";

/**
 * ReservationStatusCard Component
 *
 * @description 예약 상태 카드 컴포넌트 (C2099 컨테이너용)
 * @component
 */

export interface ReservationStatusCardProps {
  /** 상태 타이틀 (예: "예약 상담대기 (1층)") */
  statusTitle: string;
  /** 인원수 */
  count: number;
  /** 아바타 칩에 표시할 이름 배열 */
  names?: Array<{ name: string; color?: "magenta" | "blue" }>;
  /** 클릭 핸들러 */
  onClick?: () => void;
}

/**
 * 예약 상태 카드 컴포넌트
 */
export default function ReservationStatusCard({
  statusTitle,
  count,
  names = [],
  onClick,
}: ReservationStatusCardProps) {
  return (
    <div
      className="C2100"
      onClick={onClick}
      style={onClick ? { cursor: "pointer" } : undefined}
    >
      {/* 상태 타이틀 (좌측 상단) */}
      <p className="T2098">{statusTitle}</p>

      {/* 선택 배지 (우측 상단) */}
      <div className="C2101">
        <span className="T2099">선택</span>
      </div>

      {/* 인원수 및 아바타 칩 (좌측 하단) */}
      <div className="C2102">
        <span className="T2100">
          인원: <span className="T2102">{count}</span>명
        </span>
        {names.length > 0 && (
          <div className="C2103">
            {names.map((nameItem, index) => {
              const name = typeof nameItem === "string" ? nameItem : nameItem.name;
              const color = typeof nameItem === "string" ? "magenta" : (nameItem.color || "magenta");
              return (
                <div key={index} className={`C2104 ${color === "blue" ? "isBlue" : ""}`}>
                  <span className="T2101">{name}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

