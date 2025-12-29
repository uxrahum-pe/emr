"use client";

import Popup from "@/components/Popup";
import PopupSectionBox from "@/components/PopupSectionBox";
import PopupHeader from "./PopupHeader";

import type { ReservationServicePopupProps } from "@/types/popups";

/**
 * 통합 예약 서비스 팝업 컴포넌트
 *
 * @description PageHeader의 C014 "통합 예약 서비스" 클릭 시 표시되는 팝업
 * @component
 */
export default function ReservationServicePopup({
  isOpen,
  onClose,
}: ReservationServicePopupProps) {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <>
        <PopupSectionBox x={260} y={20} width={1400}>
          <PopupHeader title="통합 예약 서비스" onClose={onClose} />
        </PopupSectionBox>
        <PopupSectionBox x={260} y={140} width={1400} height={1040}>
          <div className="C180">
            {/* 통합 예약 서비스 팝업 내용 - 여기에 퍼블리싱 */}
          </div>
        </PopupSectionBox>
      </>
    </Popup>
  );
}
