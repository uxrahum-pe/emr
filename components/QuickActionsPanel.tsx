"use client";

import { useRef } from "react";

interface QuickActionsPanelProps {
  selectedAction: string;
  onActionChange: (actionId: string) => void;
  isSmallScreen?: boolean;
  /** C100 hover 상태를 부모에 알려주기 위한 콜백 (옵션) */
  onHoverChange?: (hovered: boolean) => void;
}

export default function QuickActionsPanel({
  selectedAction,
  onActionChange,
  isSmallScreen = false,
  onHoverChange,
}: QuickActionsPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const actions = [
    { id: "report", icon: "isReport", label: "내원일지" },
    { id: "package", icon: "isPackage", label: "패키지" },
    { id: "reservation", icon: "isReservation", label: "예약" },
    { id: "counseling", icon: "isCounseling", label: "상담" },
    { id: "surgery", icon: "isSurgery", label: "수술" },
    { id: "syringe", icon: "isSyringe", label: "시술" },
    { id: "clinic", icon: "isClinic", label: "진료" },
    { id: "drug", icon: "isDrug", label: "약처방" },
    { id: "coin", icon: "isCoin", label: "수납" },
    { id: "gold", icon: "isGold", label: "실천지수" },
    { id: "ruler", icon: "isRuler", label: "사이즈" },
    { id: "protect", icon: "isProtect", label: "동의서&설문" },
    { id: "clip", icon: "isClip", label: "기록지" },
    { id: "blood", icon: "isBlood", label: "혈액검사" },
    { id: "pants", icon: "isPants", label: "가멘트" },
    { id: "camera", icon: "isCamera", label: "사진" },
    { id: "speed", icon: "isSpeed", label: "TAT" },
    { id: "mylocation", icon: "isMyLocation", label: "상세로그" },
  ];

  const handleActionClick = (actionId: string) => {
    onActionChange(actionId);
  };

  const handleMouseEnter = () => {
    onHoverChange?.(true);
  };

  const handleMouseLeave = () => {
    onHoverChange?.(false);
  };

  return (
    <div
      ref={containerRef}
      className="C100"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {actions.flatMap((action) => {
        const elements = [
          <div
            key={action.id}
            ref={(el) => {
              itemRefs.current[action.id] = el;
            }}
            className={`C127 ${
              selectedAction === action.id ? "isSelected" : ""
            }`}
            onClick={() => handleActionClick(action.id)}
          >
            <div className={`C128 styleSheet isIcon ${action.icon}`}></div>
            <p className="T054">{action.label}</p>
          </div>,
        ];

        // 특정 위치에 C139 div 추가
        let dividerText = "";
        if (action.id === "report") {
          dividerText = "상담"; // 내원일지 다음
        } else if (action.id === "counseling") {
          dividerText = "의료"; // 상담 다음
        } else if (action.id === "clinic") {
          dividerText = "수납"; // 진료 다음
        } else if (action.id === "gold") {
          dividerText = "기록"; // 실천지수 다음
        } else if (action.id === "clip") {
          dividerText = "전처치"; // 기록지 다음
        }

        if (dividerText) {
          elements.push(
            <div key={`divider-${action.id}`} className="C139">
              <p className="T062">{dividerText}</p>
            </div>
          );
        }

        return elements;
      })}
    </div>
  );
}
