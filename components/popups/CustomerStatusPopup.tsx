"use client";

import Popup from "@/components/Popup";
import PopupSectionBox from "@/components/PopupSectionBox";
import PopupHeader from "@/components/popups/PopupHeader";
import type { CustomerStatusPopupProps } from "@/types/popups";

export default function CustomerStatusPopup({
  isOpen,
  onClose,
}: CustomerStatusPopupProps) {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <>
        <PopupSectionBox x={260} y={20} width={1400}>
          <PopupHeader title="고객 현황" onClose={onClose} />
        </PopupSectionBox>
        <PopupSectionBox x={260} y={140} width={1400} height={1040}>
          <div className="C180">
            {/* ============================================
                고객 현황 팝업 내용 - 여기에 퍼블리싱
                ============================================ */}
          </div>
        </PopupSectionBox>
      </>
    </Popup>
  );
}
