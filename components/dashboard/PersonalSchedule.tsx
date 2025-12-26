/**
 * PersonalSchedule Component
 *
 * @description 대시보드 페이지의 Aside에 표시되는 개인 일정 컴포넌트입니다.
 * 사용자가 직접 디자인할 빈 컨테이너입니다.
 *
 * @component
 * @example
 * ```tsx
 * <PersonalSchedule />
 * ```
 *
 * @remarks
 * - Aside 내부에 렌더링되어야 useAside 훅을 사용할 수 있습니다.
 * - 완전히 비어있는 상태로, 사용자가 직접 퍼블리싱할 수 있습니다.
 */

"use client";

import { memo, useState } from "react";
import MonthlyCalendar from "@/components/MonthlyCalendar";
import { startOfDay } from "date-fns";

/**
 * 개인 일정 메인 콘텐츠 컴포넌트
 */
const PersonalSchedule = memo(() => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    startOfDay(new Date())
  );

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <div className="C221">
        <div className="C212"></div>
        <p className="T092">
          홍성훈 <span className="isUnit">원장님</span>{" "}
          <span className="isBold">월간 일정</span>
        </p>
      </div>
      <div className="C222">
        <MonthlyCalendar
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
        />
      </div>
      <div className="C227">
        <p className="T093">일별 기록</p>
        <div className="C223">
          <div className="C226">
            <div className="C224 styleSheet isIcon isSpeed"></div>
          </div>
          <div className="C225">
            <p className="T094">지점 업무 이력</p>
            <p className="T095">
              총 활동 수: <span className="isValue">15</span>건
              <span className="isRed isMini"> (-1)</span>
            </p>
          </div>
          <div className="C112">
            <div className="C113 styleSheet isIcon isMini isChevron isRight"></div>
          </div>
        </div>
        <div className="C223">
          <div className="C226">
            <div className="C224 styleSheet isIcon isWrite"></div>
          </div>
          <div className="C225">
            <p className="T094">참조사항 입력 기록</p>
            <p className="T095">
              총 메세지 수: <span className="isValue">25</span>건
              <span className="isRed isMini"> (-1)</span>
            </p>
          </div>
          <div className="C112">
            <div className="C113 styleSheet isIcon isMini isChevron isRight"></div>
          </div>
        </div>
        <div className="C223">
          <div className="C226">
            <div className="C224 styleSheet isIcon isComunication"></div>
          </div>
          <div className="C225">
            <p className="T094">상호작용 고객 기록</p>
            <p className="T095">
              총 인원: <span className="isValue">10</span>명
              <span className="isRed isMini"> (-1)</span>
            </p>
          </div>
          <div className="C112">
            <div className="C113 styleSheet isIcon isMini isChevron isRight"></div>
          </div>
        </div>
        <div className="C223">
          <div className="C226">
            <div className="C224 styleSheet isIcon isMap"></div>
          </div>
          <div className="C225">
            <p className="T094">EMR 사용 로그</p>
            <p className="T095">
              총 활동 수: <span className="isValue">215</span>건
              <span className="isBlue isMini"> (+1)</span>
            </p>
          </div>
          <div className="C112">
            <div className="C113 styleSheet isIcon isMini isChevron isRight"></div>
          </div>
        </div>
      </div>
    </>
  );
});

PersonalSchedule.displayName = "PersonalSchedule";

export default PersonalSchedule;
