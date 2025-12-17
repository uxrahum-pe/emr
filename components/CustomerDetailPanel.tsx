"use client";

import { useState, useEffect } from "react";
import CustomerInfoPanel from "@/components/CustomerInfoPanel";
import VisitLogPanel from "@/components/VisitLogPanel";
import QuickActionsPanel from "@/components/QuickActionsPanel";
import ActionContentPanel from "@/components/ActionContentPanel";

interface CustomerDetailPanelProps {
  isOpen: boolean;
  onClose: () => void;
  isSmallScreen?: boolean;
  /** 퀵액션 패널(C100) hover 상태 변경 콜백 (옵션) */
  onQuickActionsHoverChange?: (hovered: boolean) => void;
}

/**
 * 고객 통합 정보 모달 패널 컴포넌트
 * ListItem 클릭 시 나타나고, 블러 영역 클릭 시 닫힘
 */
export default function CustomerDetailPanel({
  isOpen,
  onClose,
  isSmallScreen = false,
  onQuickActionsHoverChange,
}: CustomerDetailPanelProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  // Selected action state
  const [selectedAction, setSelectedAction] = useState<string>("report");

  // Section states
  const [sectionStates, setSectionStates] = useState<Record<string, boolean>>({
    basic: true,
    foreign: false,
    package: false,
    visit: false,
    treatment: false,
    prescription: false,
    additional: false,
  });

  // Action labels mapping
  const actionLabels: Record<string, string> = {
    report: "내원일지",
    package: "패키지",
    reservation: "예약",
    counseling: "상담",
    surgery: "수술",
    syringe: "시술",
    clinic: "진료",
    drug: "약처방",
    coin: "수납",
    gold: "실천지수",
    ruler: "사이즈",
    protect: "동의서&설문",
    clip: "기록지",
    blood: "혈액검사",
    speed: "TAT",
    pants: "가멘트",
    camera: "사진",
    mylocation: "상세로그",
  };

  // Section toggle handler
  const handleSectionToggle = (sectionKey: string) => {
    setSectionStates((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  useEffect(() => {
    if (isOpen) {
      // 컴포넌트가 나타나면 바로 렌더링
      setIsVisible(true);
      // 브라우저가 초기 상태를 인식한 후 애니메이션 트리거
      const timer = setTimeout(() => {
        setIsOpened(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      // 닫을 때: isOpened 제거 후 0.3초 뒤 컴포넌트 제거
      setIsOpened(false);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // 모달을 열 때마다 기본 액션을 '내원일지'로 리셋
  useEffect(() => {
    if (isOpen) {
      // 비동기로 처리하여 cascading renders 방지
      requestAnimationFrame(() => {
        setSelectedAction("report");
      });
    }
  }, [isOpen]);

  if (!isVisible) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    // C097 영역이 아닌 블러 처리된 영역 클릭 시
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`C096 ${isOpened ? "isOpened" : ""}`}
      onClick={handleBackdropClick}
    >
      <div className="C097" onClick={(e) => e.stopPropagation()}>
        <CustomerInfoPanel
          sectionStates={sectionStates}
          onSectionToggle={handleSectionToggle}
          onClose={onClose}
        />
        {selectedAction === "report" ? (
          <VisitLogPanel
            viewMode="date"
            showFutureSchedule={true}
            title={actionLabels[selectedAction]}
          />
        ) : [
            "package",
            "reservation",
            "counseling",
            "surgery",
            "syringe",
            "clinic",
            "drug",
            "coin",
            "gold",
            "ruler",
            "protect",
            "clip",
            "blood",
            "speed",
            "pants",
            "camera",
          ].includes(selectedAction) ? (
          <VisitLogPanel
            viewMode="package"
            showFutureSchedule={true}
            title={actionLabels[selectedAction] || selectedAction}
          />
        ) : selectedAction === "mylocation" ? (
          <VisitLogPanel
            viewMode="date"
            showFutureSchedule={false}
            title={actionLabels[selectedAction] || selectedAction}
          />
        ) : (
          <ActionContentPanel
            actionId={selectedAction}
            actionLabel={actionLabels[selectedAction] || selectedAction}
          />
        )}
        <QuickActionsPanel
          selectedAction={selectedAction}
          onActionChange={setSelectedAction}
          isSmallScreen={isSmallScreen}
          onHoverChange={onQuickActionsHoverChange}
        />
      </div>
    </div>
  );
}
