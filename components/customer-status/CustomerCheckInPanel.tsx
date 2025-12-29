/**
 * CustomerCheckInPanel Component (C152)
 *
 * @description 고객 상세 패널 하단의 체크인/액션 버튼 패널입니다.
 * 고객의 현재 상태에 따라 표시되는 버튼이 달라집니다.
 *
 * @component
 * @example
 * ```tsx
 * <CustomerCheckInPanel
 *   isOpen={isCustomerDetailOpen}
 *   customerStatus="pending"
 *   isFolded={isQuickActionHovered}
 * />
 * ```
 */

"use client";

import { useEffect, useState, useCallback, memo } from "react";
import Popup from "@/components/Popup";
import CheckInPopup from "@/components/popups/CheckInPopup";
import MovePartPopup from "@/components/popups/MovePartPopup";
import StatusManagementPopup from "@/components/popups/StatusManagementPopup";
import AppointmentPopup from "@/components/popups/AppointmentPopup";
import DailyProcedurePopup from "@/components/popups/DailyProcedurePopup";
import PrescriptionPopup from "@/components/popups/PrescriptionPopup";
import PaymentPopup from "@/components/popups/PaymentPopup";
import CheckOutPopup from "@/components/popups/CheckOutPopup";
import { getAllowedButtonsForStatus } from "./configs";
import type { CustomerCheckInPanelProps, CheckInButtonId } from "./types";

// ============================================
// 버튼 설정
// ============================================

interface CheckInButtonConfig {
  id: CheckInButtonId;
  title: string;
  className: string;
  iconClass: string;
}

/** 체크인 패널 버튼 목록 */
const CHECKIN_BUTTONS: CheckInButtonConfig[] = [
  {
    id: "checkIn",
    title: "접수하기",
    className: "isCheckIn",
    iconClass: "isCheckIn",
  },
  {
    id: "movePart",
    title: "파트이동",
    className: "isMovePart",
    iconClass: "isPaperPlane",
  },
  {
    id: "status",
    title: "상태관리",
    className: "isStatus",
    iconClass: "isRibbon",
  },
  {
    id: "appointment",
    title: "상담예약",
    className: "isAppointment",
    iconClass: "isAlarmClock",
  },
  {
    id: "dailyProcedure",
    title: "일일시술&처방",
    className: "isDailyProcedure",
    iconClass: "isClinic",
  },
  {
    id: "prescription",
    title: "처방전",
    className: "isPrescription",
    iconClass: "isDrug",
  },
  {
    id: "payment",
    title: "수납등록",
    className: "isPayment",
    iconClass: "isCoin",
  },
  {
    id: "checkOut",
    title: "귀가처리",
    className: "isCheckOut",
    iconClass: "isExit",
  },
];

/** 팝업 ID 타입 */
type PopupId = CheckInButtonId | null;

// ============================================
// 컴포넌트
// ============================================

const CustomerCheckInPanel = memo(function CustomerCheckInPanel({
  isOpen,
  isFolded = false,
  customerStatus,
  allowedButtonIds,
}: CustomerCheckInPanelProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [openPopup, setOpenPopup] = useState<PopupId>(null);

  // 열림/닫힘 애니메이션
  useEffect(() => {
    let openFrame1: number | null = null;
    let openFrame2: number | null = null;
    let closeFrame: number | null = null;
    let closeTimer: number | null = null;

    if (isOpen) {
      openFrame1 = requestAnimationFrame(() => {
        setIsVisible(true);
        openFrame2 = requestAnimationFrame(() => {
          setIsOpened(true);
        });
      });
    } else {
      closeFrame = requestAnimationFrame(() => {
        setIsOpened(false);
        closeTimer = window.setTimeout(() => {
          setIsVisible(false);
        }, 300);
      });
    }

    return () => {
      if (openFrame1 !== null) cancelAnimationFrame(openFrame1);
      if (openFrame2 !== null) cancelAnimationFrame(openFrame2);
      if (closeFrame !== null) cancelAnimationFrame(closeFrame);
      if (closeTimer !== null) clearTimeout(closeTimer);
    };
  }, [isOpen]);

  // 표시할 버튼 필터링
  const getFilteredButtons = useCallback((): CheckInButtonConfig[] => {
    // allowedButtonIds가 직접 제공되면 우선 사용
    if (allowedButtonIds && allowedButtonIds.length > 0) {
      return CHECKIN_BUTTONS.filter((btn) => allowedButtonIds.includes(btn.id));
    }

    // customerStatus가 있으면 상태별 설정 사용
    if (customerStatus) {
      const statusAllowedIds = getAllowedButtonsForStatus(customerStatus);
      if (statusAllowedIds.length > 0) {
        return CHECKIN_BUTTONS.filter((btn) => statusAllowedIds.includes(btn.id));
      }
    }

    // 기본: 모든 버튼 표시
    return CHECKIN_BUTTONS;
  }, [allowedButtonIds, customerStatus]);

  const handleButtonClick = useCallback((id: CheckInButtonId) => {
    setOpenPopup(id);
  }, []);

  const handlePopupClose = useCallback(() => {
    setOpenPopup(null);
  }, []);

  if (!isVisible) return null;

  const filteredButtons = getFilteredButtons();

  return (
    <>
      <section
        className={`C152 ${isOpened ? "isOpened" : ""} ${
          isFolded ? "isFolded" : ""
        }`.trim()}
      >
        {filteredButtons.map((button) => (
          <div
            key={button.id}
            className={`C153 ${button.className}`}
            onClick={() => handleButtonClick(button.id)}
            style={{ cursor: "pointer" }}
          >
            <div className={`C154 styleSheet isIcon ${button.iconClass}`}></div>
            <div className="C155">
              <p className="T068">{button.title}</p>
            </div>
          </div>
        ))}
      </section>

      {/* 팝업들 */}
      <Popup isOpen={openPopup === "checkIn"} onClose={handlePopupClose}>
        <CheckInPopup onClose={handlePopupClose} />
      </Popup>
      <Popup isOpen={openPopup === "movePart"} onClose={handlePopupClose}>
        <MovePartPopup onClose={handlePopupClose} />
      </Popup>
      <Popup isOpen={openPopup === "status"} onClose={handlePopupClose}>
        <StatusManagementPopup onClose={handlePopupClose} />
      </Popup>
      <Popup isOpen={openPopup === "appointment"} onClose={handlePopupClose}>
        <AppointmentPopup onClose={handlePopupClose} />
      </Popup>
      <Popup isOpen={openPopup === "dailyProcedure"} onClose={handlePopupClose}>
        <DailyProcedurePopup onClose={handlePopupClose} />
      </Popup>
      <Popup isOpen={openPopup === "prescription"} onClose={handlePopupClose}>
        <PrescriptionPopup onClose={handlePopupClose} />
      </Popup>
      <Popup isOpen={openPopup === "payment"} onClose={handlePopupClose}>
        <PaymentPopup onClose={handlePopupClose} />
      </Popup>
      <Popup isOpen={openPopup === "checkOut"} onClose={handlePopupClose}>
        <CheckOutPopup onClose={handlePopupClose} />
      </Popup>
    </>
  );
});

CustomerCheckInPanel.displayName = "CustomerCheckInPanel";

export default CustomerCheckInPanel;
