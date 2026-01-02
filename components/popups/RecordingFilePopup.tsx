"use client";

import Popup from "@/components/Popup";
import PopupSectionBox from "@/components/PopupSectionBox";

import type { RecordingFilePopupProps } from "@/types/popups";

/**
 * 녹취파일 관리 팝업 컴포넌트
 *
 * @description 상담 페이지의 C194 "녹취파일 관리" 클릭 시 표시되는 팝업
 */
export default function RecordingFilePopup({
  isOpen,
  onClose,
}: RecordingFilePopupProps) {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <>
        <PopupSectionBox x={260} y={20} width={1400}>
          <div className="C180">
            <p className="T076">녹취파일 관리</p>
            <div className="C181 isCloseButton" onClick={onClose}>
              <div className="C179 isDepth1"></div>
              <div className="C182 styleSheet isIcon isBig isClose isWhite"></div>
            </div> 
          </div>
        </PopupSectionBox>
        <PopupSectionBox x={260} y={140} width={1400} height={1040}>
          <div className="C180">
            {/* 녹취파일 관리 팝업 내용 - 여기에 퍼블리싱 */}
          </div>
        </PopupSectionBox>
      </>
    </Popup>
  );
}
