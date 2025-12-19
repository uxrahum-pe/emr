"use client";

import { useState, useMemo, useEffect } from "react";
import {
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
  addDays,
  isToday,
  isSameDay,
  getDay,
  format,
  startOfDay,
} from "date-fns";
import { ko } from "date-fns/locale";

interface MonthlyCalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  onClose?: () => void;
}

export default function MonthlyCalendar({
  selectedDate,
  onDateSelect,
  onClose,
}: MonthlyCalendarProps) {
  const today = startOfDay(new Date());
  const [currentMonth, setCurrentMonth] = useState(() => {
    // selectedDate가 있으면 그 월부터, 없으면 오늘 월부터
    if (selectedDate) {
      return startOfMonth(selectedDate);
    }
    return startOfMonth(today);
  });

  // selectedDate가 변경되면 해당 월로 이동
  useEffect(() => {
    if (selectedDate) {
      setCurrentMonth(startOfMonth(selectedDate));
    }
  }, [selectedDate]);

  // 해당 월의 첫날과 마지막날 계산 (date-fns 사용)
  const firstDay = startOfMonth(currentMonth);
  const lastDay = endOfMonth(currentMonth);
  const firstDayOfWeek = getDay(firstDay); // 0=일요일, 6=토요일
  const daysInMonth = lastDay.getDate();

  // 달력 날짜 배열 생성 (date-fns 사용)
  const calendarDays = useMemo(() => {
    const days: Array<{
      day: number;
      date: Date;
      isToday: boolean;
      isSelected: boolean;
      isCurrentMonth: boolean;
    }> = [];

    // 이전 달의 마지막 날들 (첫 주를 채우기 위해)
    const prevMonth = subMonths(currentMonth, 1);
    const prevMonthLastDay = endOfMonth(prevMonth).getDate();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = addDays(startOfMonth(prevMonth), prevMonthLastDay - i - 1);
      days.push({
        day: date.getDate(),
        date,
        isToday: isToday(date),
        isSelected: selectedDate ? isSameDay(date, selectedDate) : false,
        isCurrentMonth: false,
      });
    }

    // 현재 달의 날들
    for (let day = 1; day <= daysInMonth; day++) {
      const date = addDays(firstDay, day - 1);
      days.push({
        day,
        date,
        isToday: isToday(date),
        isSelected: selectedDate ? isSameDay(date, selectedDate) : false,
        isCurrentMonth: true,
      });
    }

    // 다음 달의 첫날들 (마지막 주를 채우기 위해, 총 42개가 되도록)
    const remainingDays = 42 - days.length;
    const nextMonthStart = addMonths(currentMonth, 1);
    for (let day = 1; day <= remainingDays; day++) {
      const date = addDays(startOfMonth(nextMonthStart), day - 1);
      days.push({
        day,
        date,
        isToday: isToday(date),
        isSelected: selectedDate ? isSameDay(date, selectedDate) : false,
        isCurrentMonth: false,
      });
    }

    return days;
  }, [
    currentMonth,
    selectedDate,
    today,
    firstDay,
    daysInMonth,
    firstDayOfWeek,
  ]);

  // 이전 달로 이동 (date-fns 사용)
  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  // 다음 달로 이동 (date-fns 사용)
  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  // 이번 달로 이동 (date-fns 사용)
  const handleGoToToday = () => {
    const todayMonth = startOfMonth(today);
    setCurrentMonth(todayMonth);
    onDateSelect(today);
  };

  // 날짜 클릭 처리
  const handleDateClick = (date: Date, isCurrentMonth: boolean) => {
    // 다른 달 날짜는 클릭 불가
    if (!isCurrentMonth) return;

    onDateSelect(date);
    // 날짜 선택 시 팝업 닫기
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      <div className="C064">
        <div className="C065" onClick={handlePrevMonth}>
          <div className="C066 styleSheet isIcon isArrow isLeft"></div>
          <p className="T027">이전 달</p>
        </div>
        <div className="C065" onClick={handleGoToToday}>
          <p className="T027">이번 달로 이동</p>
        </div>
        <div className="C065" onClick={handleNextMonth}>
          <p className="T027">다음 달</p>
          <div className="C066 styleSheet isIcon isArrow isRight"></div>
        </div>
      </div>
      <p className="T033">
        {format(currentMonth, "yyyy", { locale: ko })}
        <span className="isUnit">년</span>{" "}
        {format(currentMonth, "MM", { locale: ko })}
        <span className="isUnit">월</span>
      </p>
      <div className="C067">
        <div className="C068">
          <p className="T032">일</p>
          <p className="T032">월</p>
          <p className="T032">화</p>
          <p className="T032">수</p>
          <p className="T032">목</p>
          <p className="T032">금</p>
          <p className="T032">토</p>
        </div>
        <div className="C069">
          {calendarDays.map((item, index) => (
            <p
              key={index}
              className={`T034 ${!item.isCurrentMonth ? "isOtherMonth" : ""} ${
                item.isToday ? "isToday" : ""
              } ${item.isSelected ? "isSelected" : ""}`}
              onClick={() => handleDateClick(item.date, item.isCurrentMonth)}
              style={
                !item.isCurrentMonth ? { pointerEvents: "none" } : undefined
              }
            >
              {item.isCurrentMonth ? String(item.day).padStart(2, "0") : ""}
            </p>
          ))}
        </div>
      </div>
    </>
  );
}
