"use client";

import Popup from "@/components/Popup";
import PopupSectionBox from "@/components/PopupSectionBox";
import PopupHeader from "@/components/popups/PopupHeader";

import type { ForeignerStatusPopupProps } from "@/types/popups";

export default function ForeignerStatusPopup({
  isOpen,
  onClose,
}: ForeignerStatusPopupProps) {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <>
        <PopupSectionBox x={260} y={20} width={1400}>
          <PopupHeader title="외국인 현황" onClose={onClose} />
        </PopupSectionBox>
        <PopupSectionBox x={260} y={140} width={1400} height={1040}>
          <div className="C180">
            {/* ============================================
                외국인 현황 팝업 내용 - 여기에 퍼블리싱
                ============================================ */}
          </div>
        </PopupSectionBox>
      </>
    </Popup>
  );
}
