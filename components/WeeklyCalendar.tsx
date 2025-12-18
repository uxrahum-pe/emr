"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Popup from "@/components/Popup";
import MonthlyCalendar from "@/components/MonthlyCalendar";

interface WeeklyCalendarProps {
  /** 그림자 제거 여부 (기본: false) */
  isNotShadow?: boolean;
}

export default function WeeklyCalendar({
  isNotShadow = false,
}: WeeklyCalendarProps) {
  const [weekOffset, setWeekOffset] = useState(0); // 주간 오프셋
  const calendarScrollRef = useRef<HTMLDivElement>(null);
  const [opacities, setOpacities] = useState<number[]>(() => {
    // 초기값을 모두 0으로 설정 (50주 * 7일 = 350개)
    return new Array(350).fill(0);
  });
  const [isInitialized, setIsInitialized] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate());
  });
  const savedScrollRatioRef = useRef<number | null>(null);
  const isResizingRef = useRef(false);
  const [centerDate, setCenterDate] = useState<{ year: number; month: number }>(
    () => {
      const today = new Date();
      return { year: today.getFullYear(), month: today.getMonth() + 1 };
    }
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // 주간 달력 데이터 생성
  const generateWeekDays = useCallback((offset: number) => {
    const today = new Date();
    const currentDay = today.getDay(); // 0=일요일, 6=토요일
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - currentDay + offset * 7); // 해당 주의 일요일

    const weekDays = [];
    const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      weekDays.push({
        dayName: dayNames[i],
        day: date.getDate(),
        date: new Date(date),
        isToday: date.toDateString() === today.toDateString(),
        isSelected: false, // 선택 로직은 필요시 추가
      });
    }
    
    return weekDays;
  }, []);

  // 날짜를 가운데로 스크롤하는 헬퍼 함수
  const scrollToDate = useCallback(
    (date: Date, smooth = true) => {
      const container = calendarScrollRef.current;
      if (!container) return;

      const allElements = container.querySelectorAll(".C055");
      const targetDateStr = date.toDateString();
    
    // 해당 날짜를 포함하는 요소 찾기
      let targetElementIndex = -1;
    allElements.forEach((element, index) => {
        const weekIndex = Math.floor(index / 7);
        const dayIndex = index % 7;
        const weekDays = generateWeekDays(weekIndex - 25 + weekOffset);
        const dayData = weekDays[dayIndex];
      
      if (dayData && dayData.date.toDateString() === targetDateStr) {
          targetElementIndex = index;
      }
      });
    
    if (targetElementIndex >= 0) {
        const element = allElements[targetElementIndex] as HTMLElement;
        const containerRect = container.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const elementCenter = elementRect.left + elementRect.width / 2;
        const containerCenter = containerRect.left + containerRect.width / 2;
        const scrollOffset = elementCenter - containerCenter;
      
      if (smooth) {
        container.scrollTo({
          left: container.scrollLeft + scrollOffset,
            behavior: "smooth",
          });
      } else {
          container.scrollLeft = container.scrollLeft + scrollOffset;
        }
      }
    },
    [weekOffset, generateWeekDays]
  );

  // selectedDate가 변경되면 selectedDayIndex도 업데이트하고 스크롤
  useEffect(() => {
    if (!selectedDate) {
      setSelectedDayIndex(null);
      return;
    }

    // 주간 달력에서 선택된 날짜 찾기
    const targetDateStr = selectedDate.toDateString();
    for (let weekIndex = 0; weekIndex < 50; weekIndex++) {
      const weekDays = generateWeekDays(weekIndex - 25 + weekOffset);
      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        const day = weekDays[dayIndex];
        if (day && day.date.toDateString() === targetDateStr) {
          const elementIndex = weekIndex * 7 + dayIndex;
          setSelectedDayIndex(elementIndex);
          // 월간 달력에서 선택한 경우 스크롤 애니메이션 적용
          setTimeout(() => {
            scrollToDate(selectedDate, true);
          }, 100);
          return;
        }
      }
    }
    // 찾지 못한 경우 selectedDayIndex를 null로 설정
    setSelectedDayIndex(null);
  }, [selectedDate, weekOffset, generateWeekDays, scrollToDate]);

  const handleDayClick = (
    weekIndex: number,
    dayIndex: number,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    const elementIndex = weekIndex * 7 + dayIndex;
    const weekDays = generateWeekDays(weekIndex - 25 + weekOffset);
    const day = weekDays[dayIndex];
    
    if (selectedDayIndex === elementIndex) {
      // 같은 날짜 클릭 시 선택 해제
      setSelectedDayIndex(null);
      setSelectedDate(null);
    } else {
      // 새로운 날짜 선택
      setSelectedDayIndex(elementIndex);
      if (day) {
        setSelectedDate(day.date);
      }
      
      // 선택된 날짜를 가운데로 스크롤 (애니메이션 적용)
      if (day) {
        setTimeout(() => {
          scrollToDate(day.date, true);
        }, 50);
      }
    }
  };

  // 날짜 포맷팅 함수 (YYYY.MM.DD)
  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  // 오늘로 이동 핸들러
  const handleGoToToday = () => {
    const today = new Date();
    setSelectedDate(today);
    setTimeout(() => {
      scrollToDate(today, true);
    }, 100);
  };

  // 초기 스크롤 위치를 오늘 날짜가 중앙에 오도록 설정
  useEffect(() => {
    const container = calendarScrollRef.current;
    if (!container) return;
    
    const centerOnToday = () => {
      const allElements = container.querySelectorAll(".C055");
      if (allElements.length === 0) return; // 요소가 없으면 나중에 다시 시도

      const today = new Date();
      
      // 오늘 날짜를 포함하는 요소 찾기
      let todayElementIndex = -1;
      allElements.forEach((element, index) => {
        const weekIndex = Math.floor(index / 7);
        const dayIndex = index % 7;
        const weekDays = generateWeekDays(weekIndex - 25 + weekOffset);
        const dayData = weekDays[dayIndex];
        
        if (dayData && dayData.date.toDateString() === today.toDateString()) {
          todayElementIndex = index;
        }
      });
      
      if (todayElementIndex >= 0) {
        const element = allElements[todayElementIndex] as HTMLElement;
        const containerRect = container.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const elementCenter = elementRect.left + elementRect.width / 2;
        const containerCenter = containerRect.left + containerRect.width / 2;
        const scrollOffset = elementCenter - containerCenter;
        container.scrollLeft = container.scrollLeft + scrollOffset;
        
        // 오늘 날짜 선택
        setSelectedDayIndex(todayElementIndex);
        setSelectedDate(
          new Date(today.getFullYear(), today.getMonth(), today.getDate())
        );
        return true; // 성공
      } else {
        // 오늘 날짜를 찾지 못한 경우 중앙으로
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;
        if (scrollWidth > clientWidth) {
          container.scrollLeft = (scrollWidth - clientWidth) / 2;
      }
        return false; // 실패
      }
    };
    
    // DOM이 완전히 렌더링된 후 실행 (여러 번 시도)
    const timeouts: NodeJS.Timeout[] = [];
    timeouts.push(
      setTimeout(() => {
        if (!centerOnToday()) {
          // 첫 시도 실패 시 추가 시도
          timeouts.push(
            setTimeout(() => {
              if (!centerOnToday()) {
                timeouts.push(setTimeout(centerOnToday, 200));
              }
            }, 200)
          );
        }
      }, 100)
    );

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [weekOffset, generateWeekDays]);

  // opacity 계산 및 업데이트, 중앙 날짜 감지
  useEffect(() => {
    const container = calendarScrollRef.current;
    if (!container) return;

    let rafId: number | null = null;
    let resizeTimeoutId: ReturnType<typeof setTimeout> | null = null;
    let lastUpdateTime = 0;
    const throttleDelay = 16; // ~60fps
    
    // viewport 계산 결과 캐시
    let cachedFourDaysDistance: number | null = null;
    const calculateFourDaysDistance = () => {
      const viewportWidth = window.innerWidth;
      const breakpoint = 1980;
      const dayWidthVw = 60 / breakpoint;
      const gapVw = 3 / breakpoint;
      const dayWidth = viewportWidth * dayWidthVw;
      const gap = viewportWidth * gapVw;
      return (dayWidth + gap) * 4;
    };

    // 스크롤 위치를 기준으로 상대적으로 계산 (viewport 크기와 무관)
    const updateOpacities = (timestamp: number, skipDateUpdate = false) => {
      // 리사이즈 중에는 throttle만 더 길게 적용 (완전히 건너뛰지 않음)
      const currentThrottleDelay = isResizingRef.current
        ? throttleDelay * 2
        : throttleDelay;
      
      // Throttle: 리사이즈 중에는 더 긴 간격으로 업데이트
      if (timestamp - lastUpdateTime < currentThrottleDelay) {
        rafId = requestAnimationFrame((t) =>
          updateOpacities(t, skipDateUpdate)
        );
        return;
      }
      lastUpdateTime = timestamp;

      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;
      const containerLeft = containerRect.left;
      const containerRight = containerRect.right;
      
      const allElements = container.querySelectorAll(".C055");
      const newOpacities: number[] = new Array(allElements.length).fill(0);
      let closestElement: HTMLElement | null = null;
      let closestDistance = Infinity;
      
      // 중앙에서 4일 떨어진 거리 계산 - CSS 변수 기반으로 계산 (캐시 사용)
      if (cachedFourDaysDistance === null) {
        cachedFourDaysDistance = calculateFourDaysDistance();
      }
      const fourDaysDistance = cachedFourDaysDistance;
      
      // 가시 영역 밖 요소는 계산 생략 (성능 최적화)
      const viewportMargin = fourDaysDistance * 1.5; // 여유 공간 추가
      
      allElements.forEach((element, index) => {
        const elementRect = element.getBoundingClientRect();
        
        // 가시 영역 밖 요소는 opacity 0으로 설정하고 건너뛰기
        if (
          elementRect.right < containerLeft - viewportMargin ||
          elementRect.left > containerRight + viewportMargin
        ) {
          newOpacities[index] = 0;
          return;
        }
        
        const elementCenter = elementRect.left + elementRect.width / 2;
        
        // 중앙에서의 거리 계산 (픽셀 단위)
        const distance = Math.abs(elementCenter - containerCenter);
        
        // 가장 가까운 요소 찾기 (날짜 업데이트가 필요한 경우만, 리사이즈 중에는 건너뛰기)
        if (
          !skipDateUpdate &&
          !isResizingRef.current &&
          distance < closestDistance
        ) {
          closestDistance = distance;
          closestElement = element as HTMLElement;
        }
        
        // 거리에 따라 opacity 계산 (0 ~ 1)
        const opacity = Math.max(0, 1 - distance / fourDaysDistance);
        newOpacities[index] = opacity;
      });
      
      setOpacities(newOpacities);
      setIsInitialized(true);
      
      // 중앙에 가장 가까운 요소의 날짜 정보 추출 (스크롤 시에만, 리사이즈 중에는 건너뛰기)
      if (!skipDateUpdate && !isResizingRef.current && closestElement) {
        // 요소의 인덱스를 직접 계산
        const elementIndex = Array.from(allElements).indexOf(
          closestElement as Element
        );
        if (elementIndex >= 0) {
          const weekIndex = Math.floor(elementIndex / 7);
          const dayIndex = elementIndex % 7;
          const weekDays = generateWeekDays(weekIndex - 25 + weekOffset);
          const day = weekDays[dayIndex];
          if (day) {
            const date = day.date;
            setCenterDate({
              year: date.getFullYear(),
              month: date.getMonth() + 1,
            });
          }
        }
      }
    };

    const handleScroll = () => {
      // 스크롤 시 저장된 비율 초기화 (사용자가 직접 스크롤한 경우)
      if (!isResizingRef.current) {
        savedScrollRatioRef.current = null;
      }
      
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame((t) => updateOpacities(t, false));
    };

    const handleResize = () => {
      // 리사이즈 시작
      if (!isResizingRef.current) {
        isResizingRef.current = true;
        // 스크롤 위치를 비율로 저장 (viewport 크기와 무관하게 유지)
        const maxScroll = container.scrollWidth - container.clientWidth;
        if (maxScroll > 0) {
          savedScrollRatioRef.current = container.scrollLeft / maxScroll;
        } else {
          savedScrollRatioRef.current = 0;
        }
      }
      
      // 기존 타이머 취소
      if (resizeTimeoutId) {
        clearTimeout(resizeTimeoutId);
      }
      
      // 리사이즈 완료 후 처리 (debounce 시간 증가)
      resizeTimeoutId = setTimeout(() => {
        // viewport 계산 캐시 초기화 (리사이즈 후 재계산 필요)
        cachedFourDaysDistance = null;
        
        // 스크롤 위치 복원
        if (savedScrollRatioRef.current !== null) {
          const maxScroll = container.scrollWidth - container.clientWidth;
          if (maxScroll > 0) {
            container.scrollLeft = savedScrollRatioRef.current * maxScroll;
          } else {
            container.scrollLeft = 0;
          }
        }
        
        // 리사이즈 완료 플래그 해제 (opacity 업데이트 전에 해제하여 즉시 업데이트 가능하도록)
        isResizingRef.current = false;
        
        // 리사이즈 완료 후 opacity 업데이트 (한 번만)
        requestAnimationFrame((t) => {
          updateOpacities(t, true);
          savedScrollRatioRef.current = null;
        });
      }, 300); // 300ms debounce (150ms에서 증가)
    };

    // 초기 계산은 약간 지연
    const initialTimeout = setTimeout(() => {
      rafId = requestAnimationFrame(updateOpacities);
    }, 100);

    container.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(initialTimeout);
      if (resizeTimeoutId) clearTimeout(resizeTimeoutId);
      if (rafId) cancelAnimationFrame(rafId);
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [weekOffset]);

  // 마우스 드래그 스크롤 구현
  useEffect(() => {
    const container = calendarScrollRef.current;
    if (!container) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      container.style.cursor = "grabbing";
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      e.preventDefault();
    };

    const handleMouseLeave = () => {
      isDown = false;
      container.style.cursor = "grab";
    };

    const handleMouseUp = () => {
      isDown = false;
      container.style.cursor = "grab";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    };

    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // 무한 스크롤 구현 및 opacity 업데이트
  useEffect(() => {
    const container = calendarScrollRef.current;
    if (!container) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollLeft = container.scrollLeft;
          const scrollWidth = container.scrollWidth;
          const clientWidth = container.clientWidth;
          const threshold = 300;

          // 오른쪽 끝에 가까우면 다음 주 추가
          if (scrollLeft + clientWidth >= scrollWidth - threshold) {
            setWeekOffset((prev) => prev + 5);
          }
          
          // 왼쪽 끝에 가까우면 이전 주 추가
          if (scrollLeft <= threshold) {
            const prevScrollWidth = container.scrollWidth;
            setWeekOffset((prev) => prev - 5);
            // 스크롤 위치 조정 (추가된 내용만큼)
            setTimeout(() => {
              if (container) {
                const newScrollWidth = container.scrollWidth;
                container.scrollLeft =
                  newScrollWidth - prevScrollWidth + scrollLeft;
              }
            }, 0);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [weekOffset]);

  return (
    <div className={`C057 ${isNotShadow ? "isNotShadow" : ""}`}>
      <p className="T029">
        {centerDate.year}
        <span className="isUnit">년</span>{" "}
        {String(centerDate.month).padStart(2, "0")}
        <span className="isUnit">월</span>
      </p>
      <div className="C053" ref={calendarScrollRef}>
        <div className="C054">
          {Array.from({ length: 50 }, (_, weekIndex) => {
            const weekDays = generateWeekDays(weekIndex - 25 + weekOffset);
            return weekDays.map((day, dayIndex) => {
              const elementIndex = weekIndex * 7 + dayIndex;
              const opacity =
                isInitialized && opacities[elementIndex] !== undefined
                  ? opacities[elementIndex]
                  : 0;
              return (
                <div
                  key={`week-${weekIndex}-day-${dayIndex}`}
                  className={`C055 ${day.isToday ? "isToday" : ""} ${
                    selectedDayIndex === elementIndex ? "isSelected" : ""
                  }`}
                  style={{ opacity }}
                >
                  <p className="T027">{day.dayName}</p>
                  <div
                    className="C056"
                    onClick={(e) => handleDayClick(weekIndex, dayIndex, e)}
                  >
                    <p className="T028">{String(day.day).padStart(2, "0")}</p>
                  </div>
                </div>
              );
            });
          })}
        </div>
      </div>
      <div className="C058">
        <Popup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
        >
          <MonthlyCalendar
            selectedDate={selectedDate} 
            onDateSelect={(date) => {
                setSelectedDate(date);
            }}
            onClose={() => setIsPopupOpen(false)}
          />
        </Popup>
          <div className="C059" onClick={() => setIsPopupOpen(true)}>
            <p className="T030">
              <span className="isUnit">선택 날짜:</span>{" "}
              {selectedDate ? formatDate(selectedDate) : "선택 안됨"}
            </p>
            <div className="C060 styleSheet isIcon isCalendar"></div>
          </div>
        </Popup>
        <div className="C059 isToday" onClick={handleGoToToday}>
          <p className="T031">오늘로 이동</p>
        </div>
      </div>
    </div>
  );
}
