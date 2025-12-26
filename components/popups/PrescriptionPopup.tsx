"use client";

import PopupSectionBox from "@/components/PopupSectionBox";

/**
 * PrescriptionPopup Component
 *
 * @description 처방전 팝업 컴포넌트입니다.
 *
 * @component
 */

export interface PrescriptionPopupProps {
  /** 팝업 닫기 핸들러 */
  onClose: () => void;
}

/**
 * 처방전 팝업 컴포넌트
 */
export default function PrescriptionPopup({ onClose }: PrescriptionPopupProps) {
  return (
    <>
      <PopupSectionBox x={260} y={20} width={1400}>
        <div className="C180">
          {/* 처방전 팝업 헤더 - 여기에 퍼블리싱 (제목, 닫기 버튼 등)
              닫기 버튼 클릭 시: onClose() 호출 */}
        </div>
      </PopupSectionBox>
      <PopupSectionBox x={260} y={140} width={1400} height={1040}>
        <div className="C180">{/* 처방전 팝업 내용 - 여기에 퍼블리싱 */}</div>
      </PopupSectionBox>
    </>
  );
}
