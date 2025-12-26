"use client";

import Popup from "@/components/Popup";
import PopupSectionBox from "@/components/PopupSectionBox";
import PopupHeader from "./PopupHeader";

export interface AgencyStatusPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

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
          <PopupHeader title="대행사 현황" onClose={onClose} />
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
