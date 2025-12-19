"use client";

import { useState, useRef, useEffect } from "react";
import MiniPopup from "./MiniPopup";
import MonthlyCalendar from "./MonthlyCalendar";

export interface CalendarMiniPopupProps {
  /** 선택된 날짜 */
  selectedDate: Date | null;
  /** 날짜 선택 핸들러 */
  onDateSelect: (date: Date) => void;
}

/**
 * 달력 미니 팝업 컴포넌트
 * C059 클릭 시 표시되는 달력 팝업
 */
export default function CalendarMiniPopup({
  selectedDate,
  onDateSelect,
}: CalendarMiniPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerEvent, setTriggerEvent] = useState<MouseEvent | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // 직접 이벤트 리스너 추가로 더 강력하게 차단
  useEffect(() => {
    const element = triggerRef.current;
    if (!element) return;

    const handleClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      setTriggerEvent(e);
      setIsOpen(true);
    };

    // 캡처 단계에서 이벤트 리스너 추가
    element.addEventListener("click", handleClick, { capture: true });

    return () => {
      element.removeEventListener("click", handleClick, { capture: true });
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.nativeEvent.stopImmediatePropagation) {
      e.nativeEvent.stopImmediatePropagation();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setTriggerEvent(null);
  };

  const handleDateSelect = (date: Date) => {
    onDateSelect(date);
    handleClose();
  };

  return (
    <>
      <div className="C059" ref={triggerRef} onClick={handleClick}>
        <p className="T030">
          <span className="isUnit">선택 날짜:</span>{" "}
          {selectedDate
            ? `${selectedDate.getFullYear()}.${String(
                selectedDate.getMonth() + 1
              ).padStart(2, "0")}.${String(selectedDate.getDate()).padStart(
                2,
                "0"
              )}`
            : "선택 안됨"}
        </p>
        <div className="C060 styleSheet isIcon isCalendar"></div>
      </div>
      <MiniPopup
        isOpen={isOpen}
        onClose={handleClose}
        triggerEvent={triggerEvent}
      >
        <MonthlyCalendar
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          onClose={handleClose}
        />
      </MiniPopup>
    </>
  );
}
