"use client";

import { useState, useRef, useEffect } from "react";
import MiniPopup from "./MiniPopup";
import MonthlyCalendar from "./MonthlyCalendar";
import { formatDate } from "@/lib/utils/date";
import { startOfDay } from "date-fns";

export interface CalendarIconPopupProps {
  /** 선택된 날짜 */
  selectedDate: Date | null;
  /** 날짜 선택 핸들러 */
  onDateSelect: (date: Date) => void;
  /** 트리거 클래스명 (기본값: "C1026") */
  triggerClassName?: string;
  /** 다크 모드 적용 여부 */
  isDark?: boolean;
}

/**
 * 달력 아이콘 클릭 시 표시되는 달력 팝업 컴포넌트
 * C1026/C1027 스타일에 맞게 구성된 달력 기능
 * 달력 팝업은 왼쪽(팝업창 안쪽)으로 표시됩니다.
 */
export default function CalendarIconPopup({
  selectedDate,
  onDateSelect,
  triggerClassName = "C1026",
  isDark = false,
}: CalendarIconPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerEvent, setTriggerEvent] = useState<MouseEvent | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // 클릭 핸들러 함수
  const handleClickEvent = (e: MouseEvent) => {
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

  // C1016이 아닌 경우에만 이벤트 리스너 추가 (C1016은 onClick으로 처리)
  useEffect(() => {
    if (triggerClassName === "C1016") {
      // C1016은 onClick으로 처리하므로 여기서는 처리하지 않음
      return;
    }

    const element = triggerRef.current;
    if (!element) return;

    element.addEventListener("click", handleClickEvent, { capture: true });

    return () => {
      element.removeEventListener("click", handleClickEvent, { capture: true });
    };
  }, [triggerClassName]);

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
    // 날짜를 startOfDay로 정규화하여 시간 정보 제거
    const normalizedDate = startOfDay(date);
    onDateSelect(normalizedDate);
    handleClose();
  };

  // 디버깅: selectedDate 변경 확인
  useEffect(() => {
    if (selectedDate) {
      console.log("[CalendarIconPopup] selectedDate changed:", selectedDate);
    }
  }, [selectedDate]);

  // C1016인 경우 C1016 자체를 렌더링
  if (triggerClassName === "C1016") {
    const handleC1016Click = (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.nativeEvent.stopImmediatePropagation) {
        e.nativeEvent.stopImmediatePropagation();
      }

      // 원본 이벤트를 그대로 사용 (MiniPopup이 우측 하단 위치 계산을 자동으로 처리)
      setTriggerEvent(e.nativeEvent);
      setIsOpen(true);
    };

    return (
      <>
        <div
          className="C1016"
          ref={triggerRef}
          onClick={handleC1016Click}
          style={{ cursor: "pointer" }}
        >
          <p className="T1004">
            {selectedDate ? formatDate(selectedDate, "yyyy-MM-dd") : ""}
          </p>
          <div className="C1027 styleSheet isIcon isCalendar"></div>
        </div>
        <MiniPopup
          isOpen={isOpen}
          onClose={handleClose}
          triggerEvent={triggerEvent}
          isDark={isDark}
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

  return (
    <>
      <div
        className={triggerClassName}
        ref={triggerRef}
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      >
        <div className="C1027 styleSheet isIcon isCalendar"></div>
      </div>
      <MiniPopup
        isOpen={isOpen}
        onClose={handleClose}
        triggerEvent={triggerEvent}
        isDark={isDark}
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
