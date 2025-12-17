"use client";

import { memo } from "react";

export interface FatLevelGaugeProps {
  /** 지방경도 레벨 (0~4) */
  level?: number;
  /** 추가 클래스명 */
  className?: string;
}

/**
 * 지방경도 게이지 컴포넌트 (C149)
 * 0~4 레벨을 표시하는 별 게이지
 */
function FatLevelGauge({ level = 0, className = "" }: FatLevelGaugeProps) {
  // 0~4 범위로 제한
  const clampedLevel = Math.max(0, Math.min(4, level ?? 0));

  // 기본값은 isLv1 (level이 0이거나 undefined일 때)
  // 0 -> isLv1, 1 -> isLv2, 2 -> isLv3, 3 -> isLv4, 4 -> isLv5
  const levelClass = clampedLevel === 0 ? "isLv1" : `isLv${clampedLevel + 1}`;

  const combinedClassName = className ? `C149 ${className}`.trim() : "C149";

  return (
    <div className={combinedClassName}>
      <div className={`C150 styleSheet isGage isStar ${levelClass}`}></div>
    </div>
  );
}

export default memo(FatLevelGauge);
