"use client";

import Popup from "@/components/Popup";
import PopupSectionBox from "@/components/PopupSectionBox";

import type { PracticeIndexStatusPopupProps } from "@/types/popups";

export default function PracticeIndexStatusPopup({
  isOpen,
  onClose,
}: PracticeIndexStatusPopupProps) {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <>
        <PopupSectionBox x={260} y={20} width={1400}>
          <div className="C180">
            <p className="T076">실천지수 현황</p>
            <div className="C181 isCloseButton" onClick={onClose}>
              <div className="C179 isDepth1"></div>
              <div className="C182 styleSheet isIcon isBig isClose isWhite"></div>
            </div>
          </div>
        </PopupSectionBox>
        <PopupSectionBox x={260} y={140} width={1400} height={1040}>
          <div className="C180">
            {/* ============================================
                실천지수 현황 팝업 내용 - 여기에 퍼블리싱
                ============================================ */}
          </div>
        </PopupSectionBox>
      </>
    </Popup>
  );
}
