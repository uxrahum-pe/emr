"use client";

import SlidePage from "@/components/SlidePage";
import ScrollableContainer from "@/components/ScrollableContainer";

import type { MyAlarmsSlideProps } from "@/types/slides";

/**
 * 내 알림 보기 Slide 컴포넌트
 *
 * @description PageHeader의 C018.isAlarm 버튼 클릭 시 표시되는 페이지
 * @component
 */
export default function MyAlarmsSlide({
  onGoBack,
  showBackButton = false,
  transform,
  zIndex,
}: MyAlarmsSlideProps = {}) {
  return (
    <SlidePage
      title="내 알림 보기"
      showToggleSwitch={false}
      onGoBack={onGoBack}
      showBackButton={showBackButton}
      transform={transform}
      zIndex={zIndex}
    >
      <ScrollableContainer className="C156">
        {/* ============================================
            내 알림 보기 Slide 내용 - 여기에 퍼블리싱
            ============================================ */}
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
          {/* 추가 알림 카드들... */}
        </>
      </ScrollableContainer>
    </SlidePage>
  );
}

MyAlarmsSlide.displayName = "MyAlarmsSlide";
