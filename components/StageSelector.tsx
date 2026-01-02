"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import DraggableScrollContainer from "@/components/DraggableScrollContainer";

/**
 * 기수 데이터 타입
 */
export interface StageData {
  /** 기수 번호 */
  stage: number;
  /** 시작일 (예: "24.01.04") */
  startDate: string;
  /** 종료일 (예: "24.03.14") */
  endDate: string;
  /** 진행 일수 */
  duration: number;
  /** 선택 여부 (선택사항) */
  isSelected?: boolean;
  /** 추가 스타일 클래스 (예: "isGreen") */
  className?: string;
}

export interface StageSelectorProps {
  /** 기수 데이터 배열 */
  stages: StageData[];
  /** 초기 선택된 기수 인덱스 */
  defaultSelectedIndex?: number;
  /** 기수 선택 핸들러 */
  onStageSelect?: (stage: StageData, index: number) => void;
  /** 추가 클래스명 */
  className?: string;
}

/**
 * 기수 선택 컴포넌트
 * 주간 달력과 유사한 스크롤 및 opacity 효과를 제공
 */
export default function StageSelector({
  stages,
  defaultSelectedIndex = 0,
  onStageSelect,
  className = "",
}: StageSelectorProps) {
  const [selectedIndex, setSelectedIndex] = useState(defaultSelectedIndex);
  const [opacities, setOpacities] = useState<number[]>(
    new Array(stages.length).fill(1)
  );
  const [isInitialized, setIsInitialized] = useState(false);
  const [spacerWidth, setSpacerWidth] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const firstElementRef = useRef<HTMLDivElement>(null);
  const isResizingRef = useRef(false);

  // scrollRef를 DraggableScrollContainer 내부 요소에 연결하는 헬퍼 함수
  const getScrollContainer = useCallback((): HTMLDivElement | null => {
    const container = containerRef.current?.parentElement;
    if (container && container.classList.contains("C252")) {
      return container as HTMLDivElement;
    }
    return null;
  }, []);

  // 중앙 정렬 함수
  const centerOnSelected = useCallback(
    (index?: number) => {
      const container = getScrollContainer();
      if (!container) return false;

      const allElements = container.querySelectorAll(".C253");
      if (allElements.length === 0) return false;

      const targetIndex = index !== undefined ? index : selectedIndex;
      const selectedElement = allElements[targetIndex] as HTMLElement;
      if (!selectedElement) return false;

      const containerRect = container.getBoundingClientRect();
      const elementRect = selectedElement.getBoundingClientRect();
      const elementCenter = elementRect.left + elementRect.width / 2;
      const containerCenter = containerRect.left + containerRect.width / 2;
      const scrollOffset = elementCenter - containerCenter;
      const targetScrollLeft = container.scrollLeft + scrollOffset;

      // 부드러운 스크롤 애니메이션
      container.scrollTo({
        left: targetScrollLeft,
        behavior: "smooth",
      });
      return true;
    },
    [selectedIndex, getScrollContainer]
  );

  // Spacer 너비 및 C254 width 계산 (첫 번째 요소가 중앙에 오도록)
  useEffect(() => {
    const calculateDimensions = () => {
      const container = getScrollContainer();
      const innerContainer = containerRef.current;
      const firstElement = firstElementRef.current;
      if (!container || !innerContainer || !firstElement) return;

      // 컨테이너의 너비
      const containerWidth = container.clientWidth;
      const containerCenter = containerWidth / 2;

      // 첫 번째 요소의 너비
      const firstElementWidth = firstElement.offsetWidth;
      const firstElementCenter = firstElementWidth / 2;

      // 첫 번째 요소가 중앙에 오도록 필요한 spacer 너비 계산
      const spacer = containerCenter - firstElementCenter;
      setSpacerWidth(Math.max(0, spacer));

      // 모든 C253 요소의 너비 합산
      const allElements = innerContainer.querySelectorAll(".C253");
      let totalElementsWidth = 0;

      // 각 요소의 실제 너비 측정
      // flex-shrink: 0이 적용되어 있으므로 자연스러운 너비로 측정됨
      allElements.forEach((element) => {
        const el = element as HTMLElement;
        // scrollWidth를 사용하여 내용에 맞는 실제 너비 측정
        const width =
          el.scrollWidth || el.offsetWidth || el.getBoundingClientRect().width;
        totalElementsWidth += width;
      });

      // gap 계산 (요소 개수 - 1) * gap
      // getComputedStyle로 실제 gap 값 가져오기
      const computedStyle = window.getComputedStyle(innerContainer);
      const gapValue = computedStyle.gap || computedStyle.columnGap;
      const gap = gapValue ? parseFloat(gapValue) : 10; // 기본값 10px
      const totalGap =
        allElements.length > 0 ? (allElements.length - 1) * gap : 0;

      // C254의 최소 너비 = 왼쪽 spacer + 모든 요소 너비 + gap + 오른쪽 spacer
      // scrollWidth를 사용하여 더 정확한 너비 계산
      const innerScrollWidth = innerContainer.scrollWidth;
      const calculatedWidth = spacer + totalElementsWidth + totalGap + spacer; // 오른쪽 spacer 추가
      const minContainerWidth = Math.max(calculatedWidth, innerScrollWidth);

      setContainerWidth(minContainerWidth);
    };

    // DOM이 완전히 렌더링된 후 실행 (여러 번 시도)
    const timeouts: NodeJS.Timeout[] = [];

    timeouts.push(
      setTimeout(() => {
        calculateDimensions();
        timeouts.push(
          setTimeout(() => {
            calculateDimensions();
            timeouts.push(setTimeout(calculateDimensions, 200));
          }, 200)
        );
      }, 100)
    );

    // 리사이즈 시에도 재계산
    const handleResize = () => {
      calculateDimensions();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
      window.removeEventListener("resize", handleResize);
    };
  }, [stages.length]);

  // scrollRef를 DraggableScrollContainer 내부 요소에 연결
  useEffect(() => {
    const container = containerRef.current?.parentElement;
    if (container && container.classList.contains("C252")) {
      (scrollRef as React.MutableRefObject<HTMLDivElement | null>).current =
        container as HTMLDivElement;
    }
  }, []);

  // Opacity 업데이트 및 중앙 감지
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let rafId: number | null = null;
    let lastUpdateTime = 0;
    const throttleDelay = 16; // ~60fps

    const updateOpacities = (timestamp: number) => {
      if (timestamp - lastUpdateTime < throttleDelay) {
        rafId = requestAnimationFrame(updateOpacities);
        return;
      }
      lastUpdateTime = timestamp;

      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;
      const containerLeft = containerRect.left;
      const containerRight = containerRect.right;

      const allElements = container.querySelectorAll(".C253");
      const newOpacities: number[] = new Array(allElements.length).fill(0);

      // 중앙에서의 기준 거리 (요소 너비의 약 2배)
      const firstElement = allElements[0] as HTMLElement;
      const baseDistance = firstElement ? firstElement.offsetWidth * 2 : 300;

      allElements.forEach((element, index) => {
        const elementRect = (element as HTMLElement).getBoundingClientRect();

        // 가시 영역 밖 요소는 opacity 0
        if (
          elementRect.right < containerLeft - baseDistance ||
          elementRect.left > containerRight + baseDistance
        ) {
          newOpacities[index] = 0;
          return;
        }

        const elementCenter = elementRect.left + elementRect.width / 2;
        const distance = Math.abs(elementCenter - containerCenter);

        // 거리에 따라 opacity 계산 (0.25 ~ 1)
        // 끝단은 최소 0.25, 중앙은 1.0
        const normalizedDistance = Math.min(1, distance / baseDistance);
        const opacity = 0.25 + (1 - normalizedDistance) * 0.75;
        newOpacities[index] = opacity;
      });

      setOpacities(newOpacities);
      setIsInitialized(true);

      // 스크롤 시 자동 선택 비활성화 - 오직 클릭 시에만 선택됨
    };

    const handleScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateOpacities);
      }
    };

    const handleResize = () => {
      isResizingRef.current = true;
      updateOpacities(performance.now());
      setTimeout(() => {
        isResizingRef.current = false;
      }, 200);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    // 초기 opacity 계산
    updateOpacities(performance.now());

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [stages, selectedIndex, onStageSelect]);

  // 클릭 핸들러
  const handleStageClick = useCallback(
    (index: number) => {
      setSelectedIndex(index);
      onStageSelect?.(stages[index], index);
      // 클릭 후 부드러운 중앙 정렬 (약간의 지연으로 DOM 업데이트 대기)
      setTimeout(() => {
        centerOnSelected(index);
      }, 10);
    },
    [stages, onStageSelect, centerOnSelected]
  );

  // 마우스 휠 이벤트 핸들러
  useEffect(() => {
    const container = getScrollContainer();
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // 수평 스크롤 (속도 조절: 0.5배로 느리게)
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY * 0.5;
      } else if (e.deltaX !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaX * 0.5;
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [getScrollContainer]);

  return (
    <DraggableScrollContainer
      className={`C252 ${className}`.trim()}
      scrollSpeed={0.8}
      scrollToEnd={false}
    >
      <div
        className="C254"
        ref={containerRef}
        style={{
          width: containerWidth > 0 ? `${containerWidth}px` : undefined,
          minWidth: containerWidth > 0 ? `${containerWidth}px` : undefined,
        }}
      >
        {/* 첫 번째 요소가 중앙에 오도록 하는 보이지 않는 spacer */}
        {spacerWidth > 0 && (
          <div
            style={{
              width: `${spacerWidth}px`,
              flexShrink: 0,
              visibility: "hidden",
            }}
            aria-hidden="true"
          />
        )}
        {stages.map((stage, index) => {
          const opacity = isInitialized ? opacities[index] : 1;
          const isSelected = index === selectedIndex;

          return (
            <div
              key={index}
              ref={index === 0 ? firstElementRef : undefined}
              className={`C253 ${stage.className || ""} ${
                isSelected ? "isSelected" : ""
              }`.trim()}
              style={{ opacity }}
              onClick={() => handleStageClick(index)}
            >
              <p className={`T115 ${stage.className || ""}`.trim()}>
                {stage.stage}
                <span className="isUnit">기</span>
              </p>
              <p className="T114">
                <span className="isUnit">시작:</span> {stage.startDate}
              </p>
              <p className="T114">
                <span className="isUnit">종료:</span> {stage.endDate}
              </p>
              <p className="T114">
                {stage.duration}
                <span className="isUnit">일 간 진행</span>
              </p>
            </div>
          );
        })}
        {/* 마지막 요소(1기) 오른쪽에도 보이지 않는 spacer 추가 */}
        {spacerWidth > 0 && (
          <div
            style={{
              width: `${spacerWidth}px`,
              flexShrink: 0,
              visibility: "hidden",
            }}
            aria-hidden="true"
          />
        )}
      </div>
    </DraggableScrollContainer>
  );
}
