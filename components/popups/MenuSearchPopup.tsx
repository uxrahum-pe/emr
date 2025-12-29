"use client";

import Popup from "@/components/Popup";
import PopupSectionBox from "@/components/PopupSectionBox";

import type { MenuSearchPopupProps } from "@/types/popups";

/**
 * 메뉴 및 기능 검색 팝업 컴포넌트
 *
 * @description PageHeader의 C016 "메뉴 및 기능 검색" 클릭 시 표시되는 팝업
 * @component
 */
export default function MenuSearchPopup({
  isOpen,
  onClose,
}: MenuSearchPopupProps) {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <>
        <PopupSectionBox x={260} y={20} width={1400}>
          <div className="C180">
            <p className="T076">메뉴 및 기능 검색</p>
            <div className="C181 isCloseButton" onClick={onClose}>
              <div className="C179 isDepth1"></div>
              <div className="C182 styleSheet isIcon isBig isClose isWhite"></div>
            </div>
          </div>
        </PopupSectionBox>
        <PopupSectionBox x={260} y={140} width={1400} height={1040}>
          <div className="C180">
            {/* 메뉴 및 기능 검색 팝업 내용 - 여기에 퍼블리싱 */}
          </div>
        </PopupSectionBox>
      </>
    </Popup>
  );
}
