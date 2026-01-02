"use client";

import type { ReactNode } from "react";

/**
 * RoomCard Component
 *
 * @description 상담실 배정 페이지의 개별 상담실 카드 컴포넌트
 * @component
 */

export type RoomStatus = "inProgress" | "selectable" | "current";

export interface RoomCardProps {
  /** 상담실 번호 (예: "제1상담실") */
  roomNumber: string;
  /** 주사용자 정보 (예: "주사용자: 나혜영 (qdfsd1)") */
  mainUser: string;
  /** 카드 상태 */
  status: RoomStatus;
  /** 환자 상세 정보 (진행중/현재상태일 때만 표시) */
  patientInfo?: ReactNode;
  /** 클릭 핸들러 (선택하기/현재상태일 때만) */
  onClick?: () => void;
}

/**
 * 상담실 카드 컴포넌트
 */
export default function RoomCard({
  roomNumber,
  mainUser,
  status,
  patientInfo,
  onClick,
}: RoomCardProps) {
  const isClickable = status === "selectable" || status === "current";

  // 주사용자 정보 파싱: "주사용자: 나혜영 (qdfsd1)" -> "주사용자: " + "나혜영" + " (qdfsd1)"
  const parseMainUser = (user: string) => {
    const match = user.match(/^(주사용자:\s*)(.+?)(\s*\([^)]+\))$/);
    if (match) {
      return {
        prefix: match[1], // "주사용자: "
        name: match[2], // "나혜영"
        suffix: match[3], // " (qdfsd1)"
      };
    }
    return null;
  };

  const parsedUser = parseMainUser(mainUser);

  return (
    <div
      className={`C2084 ${status === "current" ? "isCurrent" : ""} ${
        status === "selectable" ? "isSelectable" : ""
      } ${isClickable ? "isClickable" : ""}`.trim()}
      onClick={isClickable ? onClick : undefined}
      style={isClickable ? { cursor: "pointer" } : undefined}
    >
      {/* 진행중 배지 (왼쪽) */}
      {status === "inProgress" && (
        <p className="C2085">
          <span className="T2081">진행중</span>
        </p>
      )}

      {/* 카드 내용 */}
      <div className="C2086">
        {/* 좌측 정보 */}
        <div className="C2087">
          <p className="T2082">{roomNumber}</p>
          {parsedUser ? (
            <p className="T2083">
              <span className="T2083Prefix">{parsedUser.prefix}</span>
              {parsedUser.name}
              <span className="T2083Suffix">{parsedUser.suffix}</span>
            </p>
          ) : (
            <p className="T2083">{mainUser}</p>
          )}
        </div>

        {/* 우측 정보 */}
        <div className="C2088">
          {status === "selectable" ? (
            <p className="T2084">사용 가능합니다.</p>
          ) : (
            patientInfo
          )}
        </div>
      </div>

      {/* 우측 상단 배지 (선택하기/현재상태) */}
      {status === "selectable" && (
        <p className="C2089">
          <span className="T2085">선택하기</span>
        </p>
      )}
      {status === "current" && (
        <p className="C2090">
          <span className="T2086">현재상태</span>
        </p>
      )}
    </div>
  );
}

