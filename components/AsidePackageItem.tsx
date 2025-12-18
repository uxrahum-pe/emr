"use client";

import { PackageItemStats, PackageItemPayment } from "@/types/package";

export interface AsidePackageItemProps {
  /** 헤더 내용 (C144 첫 번째) */
  headerContent: React.ReactNode;
  /** 본문 내용 (C144 두 번째) */
  bodyContent: React.ReactNode;
  /** 아이콘 (C141) */
  icon?: React.ReactNode;
  /** 부위 아이콘 (C142) */
  partIcon?: React.ReactNode;
  /** 통계 정보 (C147) */
  stats?: PackageItemStats;
  /** 결제 정보 (C151) */
  payment?: PackageItemPayment;
  /** 추가 클래스명 */
  className?: string;
  /** 예상 시작 시간 (24시간 형식, 예: 13 = PM 01:00) */
  startHour?: number;
  /** 예상 시작 분 (0-59) */
  startMinute?: number;
  /** 예상 소요 시간 (분 단위) */
  durationMinutes?: number;
  /** C172의 top 위치 (C175의 top 계산용) */
  scheduleC172Top?: number;
  /** 수술실 정보 */
  room?: string;
}

/**
 * Aside 모드용 패키지 아이템 컴포넌트 (C132.isAsideMode)
 * 일정 보기 등 Aside에서 사용되는 패키지 카드
 */
export default function AsidePackageItem({
  headerContent,
  bodyContent,
  icon,
  partIcon,
  stats,
  payment,
  className = "",
  startHour = 13,
  startMinute = 0,
  durationMinutes = 90,
  scheduleC172Top,
  room = "제8수술실",
}: AsidePackageItemProps) {
  const combinedClassName = `C175 ${className}`.trim();

  // 시간 포맷팅 (12시간 형식)
  const formatTime = (hour: number, minute: number) => {
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${period} ${String(displayHour).padStart(2, "0")}:${String(
      minute
    ).padStart(2, "0")}`;
  };

  const endHour = startHour + Math.floor((startMinute + durationMinutes) / 60);
  const endMinute = (startMinute + durationMinutes) % 60;
  const startTimeStr = formatTime(startHour, startMinute);
  const endTimeStr = formatTime(endHour, endMinute);

  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  const durationStr =
    hours > 0
      ? `${hours}시간${minutes > 0 ? ` ${minutes}분` : ""}`
      : `${minutes}분`;

  // 높이 계산: durationMinutes에 따라 케이스별로 설정
  // C172 간격이 80이고, C175 간에 10의 간격이 있으므로: 시간 * 80 - 10
  let durationClass: string;
  let heightInSizeUnits: number;

  const durationHours = durationMinutes / 60;
  const calculatedHeight = Math.round(durationHours * 80 - 10);

  if (durationMinutes <= 60) {
    heightInSizeUnits = calculatedHeight;
    durationClass = "isDuration1h";
  } else if (durationMinutes <= 90) {
    heightInSizeUnits = calculatedHeight;
    durationClass = "isDuration1h30m";
  } else if (durationMinutes <= 120) {
    heightInSizeUnits = calculatedHeight;
    durationClass = "isDuration2h";
  } else if (durationMinutes <= 150) {
    heightInSizeUnits = calculatedHeight;
    durationClass = "isDuration2h30m";
  } else if (durationMinutes <= 180) {
    heightInSizeUnits = calculatedHeight;
    durationClass = "isDuration3h";
  } else {
    heightInSizeUnits = calculatedHeight;
    durationClass = "isDurationOver3h";
  }

  const heightValue = `var(--size-${heightInSizeUnits})`;

  // duration 클래스를 className에 추가
  const finalClassName = `${combinedClassName} ${durationClass}`.trim();

  // 시작 위치 계산: 시작 시간 C172의 top 위치 + 오프셋
  const c175Offset = 20;
  // 30분에 시작하는 경우 추가로 10 더 올림, 그리고 5 더 내리기
  const minuteAdjustment = startMinute === 30 ? -10 + 5 + 5 : 0;
  const topInSizeUnits = scheduleC172Top
    ? scheduleC172Top + c175Offset + minuteAdjustment
    : (() => {
        const c172Interval = 80;
        const baseTopInSizeUnits = 10 + (startHour - 8) * c172Interval;
        const minuteOffsetInSizeUnits =
          Math.round(((startMinute / 60) * c172Interval) / 10) * 10;
        return (
          baseTopInSizeUnits +
          minuteOffsetInSizeUnits +
          c175Offset +
          minuteAdjustment
        );
      })();
  const topValue = `var(--size-${topInSizeUnits})`;

  return (
    <div
      className={finalClassName}
      style={{
        height: heightValue,
        top: topValue,
      }}
    >
      <div className="C133">
        <div className="C140 isFitted">
          {icon && <div className="C141">{icon}</div>}
          {partIcon && <div className="C142">{partIcon}</div>}
        </div>
        <div className="C143">
          <div className="C144">{headerContent}</div>
          <div className="C144 isFolded">{bodyContent}</div>
        </div>
      </div>
      <div className="C147">
        <div className="C086">
          <p className="T041">박지영</p>
          <p className="T042 isRed">여성</p>
          <p className="T042">
            32<span className="isUnit">세</span>
          </p>
          <p className="T042">
            1<span className="isUnit">기</span>
          </p>
          <p className="T016 isGrey">210048921</p>
        </div>
      </div>
      <div className="C151">
        <p className="T075">
          <span className="isUnit">예상시간: </span>
          {startTimeStr}
          <span className="isUnit"> ~ </span>
          {endTimeStr}
        </p>
        <p className="T075">
          <span className="isUnit">예상소요: </span>
          {durationStr}
        </p>
        <p className="T075">
          <span className="isUnit">수술실: </span>
          {room}
        </p>
      </div>
    </div>
  );
}
