"use client";

import { usePathname } from "next/navigation";
import Popup from "@/components/Popup";
import PopupSectionBox from "@/components/PopupSectionBox";
import PopupHeader from "./PopupHeader";

export interface PartReferencePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * 파트 참조사항 팝업 컴포넌트
 *
 * @description 현재 페이지 경로에 따라 "원무파트 참조사항", "상담파트 참조사항" 등을 표시합니다.
 * 팝업 내부에서 pathname을 확인하여 적절한 제목과 내용을 표시합니다.
 */
export default function PartReferencePopup({
  isOpen,
  onClose,
}: PartReferencePopupProps) {
  const pathname = usePathname();

  // 페이지별 팝업 제목 결정
  const getPartReferenceTitle = () => {
    if (pathname === "/reception") return "원무파트 참조사항";
    if (pathname === "/counseling") return "상담파트 참조사항";
    if (pathname === "/pre-care") return "전처치파트 참조사항";
    if (pathname === "/clinic") return "진료파트 참조사항";
    if (pathname === "/surgery") return "수술파트 참조사항";
    if (pathname === "/procedure") return "시술파트 참조사항";
    if (pathname === "/post-care") return "후관리파트 참조사항";
    if (pathname === "/statistics") return "통계파트 참조사항";
    return "파트 참조사항";
  };

  // 페이지별 파트명 결정 (from: 원무, from: 상담 등)
  const getPartName = () => {
    if (pathname === "/reception") return "원무";
    if (pathname === "/counseling") return "상담";
    if (pathname === "/pre-care") return "전처치";
    if (pathname === "/clinic") return "진료";
    if (pathname === "/surgery") return "수술";
    if (pathname === "/procedure") return "시술";
    if (pathname === "/post-care") return "후관리";
    if (pathname === "/statistics") return "통계";
    return "";
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <>
        <PopupSectionBox x={260} y={20} width={1400}>
          <PopupHeader title={getPartReferenceTitle()} onClose={onClose} />
        </PopupSectionBox>
        <PopupSectionBox x={260} y={140} width={1400} height={1040}>
          <div className="C180">
            {/* 파트 참조사항 팝업 내용 - 여기에 퍼블리싱 */}
            {/* 현재 파트: {getPartName()} - from: {getPartName()} 형태로 사용 가능 */}
          </div>
        </PopupSectionBox>
      </>
    </Popup>
  );
}
