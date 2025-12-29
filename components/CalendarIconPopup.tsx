"use client";

import { useState, useRef, useEffect } from "react";
import MiniPopup from "./MiniPopup";
import MonthlyCalendar from "./MonthlyCalendar";

export interface CalendarIconPopupProps {
  /** 선택된 날짜 */
  selectedDate: Date | null;
  /** 날짜 선택 핸들러 */
  onDateSelect: (date: Date) => void;
}

/**
 * 달력 아이콘 클릭 시 표시되는 달력 팝업 컴포넌트
 * C1026/C1027 스타일에 맞게 구성된 달력 기능
 * 달력 팝업은 왼쪽(팝업창 안쪽)으로 표시됩니다.
 */
export default function CalendarIconPopup({
  selectedDate,
  onDateSelect,
}: CalendarIconPopupProps) {
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

      // 왼쪽으로 이동시키기 위해 clientX를 조정한 새로운 이벤트 생성
      // 달력 너비(약 440px)를 고려하여 왼쪽으로 이동
      const adjustedEvent = new MouseEvent(e.type, {
        bubbles: e.bubbles,
        cancelable: e.cancelable,
        view: e.view,
        detail: e.detail,
        screenX: e.screenX,
        screenY: e.screenY,
        clientX: e.clientX - 440, // 왼쪽으로 440px 이동
        clientY: e.clientY,
        button: e.button,
        buttons: e.buttons,
        ctrlKey: e.ctrlKey,
        shiftKey: e.shiftKey,
        altKey: e.altKey,
        metaKey: e.metaKey,
      });

      setTriggerEvent(adjustedEvent as MouseEvent);
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
      <div className="C1026" ref={triggerRef} onClick={handleClick} style={{ cursor: "pointer" }}>
        <div className="C1027 styleSheet isIcon isCalendar"></div>
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

