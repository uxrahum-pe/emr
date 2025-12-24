/**
 * AlarmClickHandler Component
 *
 * @description PageHeader의 C018.isAlarm 버튼 클릭 시 "내 알림 보기" 페이지를 표시하는 핸들러를 생성합니다.
 *
 * @component
 * @example
 * ```tsx
 * <AlarmClickHandler onHandlerReady={handleAlarmHandlerReady} />
 * ```
 *
 * @remarks
 * - Aside 내부에 렌더링되어야 useAside 훅을 사용할 수 있습니다.
 * - 핸들러는 한 번만 등록되며, 애니메이션 중에는 클릭을 무시합니다.
 * - 함수형 업데이트를 사용하여 최신 상태를 보장합니다.
 */

"use client";

import { useEffect, useRef } from "react";
import { useAside } from "@/components/AsideContext";
import SlidePage from "@/components/SlidePage";
import type { AlarmClickHandlerProps } from "@/types/reception";
import ScrollableContainer from "../ScrollableContainer";

export default function AlarmClickHandler({
  onHandlerReady,
}: AlarmClickHandlerProps) {
  const { navigateToPage, isAnimating } = useAside();
  const navigateToPageRef = useRef(navigateToPage);
  const onHandlerReadyRef = useRef(onHandlerReady);
  const isAnimatingRef = useRef(isAnimating);

  // ref 업데이트 (항상 최신 값 유지)
  useEffect(() => {
    navigateToPageRef.current = navigateToPage;
    onHandlerReadyRef.current = onHandlerReady;
    isAnimatingRef.current = isAnimating;
  }, [navigateToPage, onHandlerReady, isAnimating]);

  // 핸들러 등록 (페이지 전환 시 재등록 가능하도록)
  useEffect(() => {
    const handler = () => {
      // 애니메이션 중이면 무시
      if (isAnimatingRef.current) {
        return;
      }
      navigateToPageRef.current(
        "my-alarms",
        <SlidePage title="내 알림 보기" showToggleSwitch={false}>
          <ScrollableContainer className="C156">
            <>
              <div className="C220">
                <div className="C087">
                  <div className="C084">
                    <div className="C033 isIcon styleSheet isExit"></div>
                  </div>
                  <div className="C083">
                    <p className="T039">
                      <span className="isBold">귀가 처리 완료</span>
                    </p>
                    <div className="C086">
                      <p className="T041">최민호</p>
                      <p className="T042 isBlue">남성</p>
                      <p className="T042">
                        45<span className="isUnit">세</span>
                      </p>
                      <p className="T042 isOldbie">
                        3<span className="isUnit">기</span>
                      </p>
                      <p className="T016 isGrey">210046587</p>
                    </div>
                  </div>
                </div>
                <div className="C214">
                  <div className="C212"></div>
                  <p className="T089">
                    <span className="isUnit">처리자:</span> 이미영
                    <span className="isUnit">간호사</span>
                  </p>
                  <p className="T090">
                    <span className="isUnit">2025.</span>12.24
                    <span className="isUnit"> AM</span> 10:00
                  </p>
                </div>
              </div>
            </>
          </ScrollableContainer>
        </SlidePage>
      );
    };
    // 다음 틱에 등록하여 무한 루프 방지 및 렌더링 완료 후 실행
    // 컴포넌트가 완전히 마운트된 후에만 등록
    const timeoutId = setTimeout(() => {
      if (onHandlerReadyRef.current) {
        onHandlerReadyRef.current(handler);
      }
    }, 100);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [onHandlerReady]); // onHandlerReady가 준비된 후에만 실행

  return null;
}
