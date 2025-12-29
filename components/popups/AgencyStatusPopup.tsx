"use client";

import Popup from "@/components/Popup";
import PopupSectionBox from "@/components/PopupSectionBox";

import type { AgencyStatusPopupProps } from "@/types/popups";

/**
 * 대행사 현황 팝업 컴포넌트
 *
 * @description 상담 페이지의 C194 "대행사 현황" 클릭 시 표시되는 팝업
 */
export default function AgencyStatusPopup({
  isOpen,
  onClose,
}: AgencyStatusPopupProps) {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <>
        <PopupSectionBox x={260} y={20} width={1400}>
          <div className="C180">
            <p className="T076">대행사 현황</p>
            <div className="C181 isCloseButton" onClick={onClose}>
              <div className="C179 isDepth1"></div>
              <div className="C182 styleSheet isIcon isBig isClose isWhite"></div>
            </div>
          </div>
        </PopupSectionBox>
        <PopupSectionBox x={260} y={140} width={1400} height={1040}>
          <div className="C180">
            {/* 대행사 현황 팝업 내용 - 여기에 퍼블리싱 */}
          </div>
        </PopupSectionBox>
      </>
    </Popup>
  );
}
