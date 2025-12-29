"use client";

import PopupSectionBox from "@/components/PopupSectionBox";

/**
 * MovePartPopup Component
 *
 * @description 파트이동 팝업 컴포넌트입니다.
 *
 * @component
 */

import type { MovePartPopupProps } from "@/types/popups";

/**
 * 파트이동 팝업 컴포넌트
 */
export default function MovePartPopup({ onClose }: MovePartPopupProps) {
  return (
    <>
      <PopupSectionBox x={260} y={20} width={1400}>
        <div className="C180">
          {/* 파트이동 팝업 헤더 - 여기에 퍼블리싱 (제목, 닫기 버튼 등)
              닫기 버튼 클릭 시: onClose() 호출 */}
        </div>
      </PopupSectionBox>
      <PopupSectionBox x={260} y={140} width={1400} height={1040}>
        <div className="C180">{/* 파트이동 팝업 내용 - 여기에 퍼블리싱 */}</div>
      </PopupSectionBox>
    </>
  );
}
