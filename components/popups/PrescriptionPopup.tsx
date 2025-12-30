"use client";

import CustomerInfo from "@/components/CustomerInfo";
import type { PrescriptionPopupProps } from "@/types/popups";

/**
 * PrescriptionPopup Component
 *
 * @description 처방전 팝업 컴포넌트입니다.
 *
 * @component
 */
export default function PrescriptionPopup({ onClose }: PrescriptionPopupProps) {
  const handleInfoClick = () => {
    // 고객 정보 상세 팝업 열기 등의 로직
    console.log("고객 정보 상세 보기");
  };

  return (
    <div className="C2043">
      <div className="C2044">
        
        <CustomerInfo
          name="신수빈"
          gender="여성"
          age={32}
          packageNumber={1}
          customerNumber="210047938"
          onInfoClick={handleInfoClick}
        />
        <p className="T2050">처방전</p>
        <div className="C2045">
          <div className="C2046">
            <div className="C179 isDepth1"></div>
            <span className="T2051">내용수정</span>
          </div>
          <div className="C2047">
            <div className="C179 isDepth1"></div>
            <div className="C182 styleSheet isIcon isBig isDownload isWhite"></div>
          </div>
          <div className="C2048">
            <div className="C179 isDepth1"></div>
            <div className="C182 styleSheet isIcon isBig isPrint isWhite"></div>
          </div>
        </div>
        
        <div
          className="C181 isCloseButton"
          onClick={onClose}
        >
          <div className="C179 isDepth1"></div>
          <div className="C182 styleSheet isIcon isBig isClose isWhite"></div>
        </div>
      </div>
      <div className="C2072">
        <div className="C2073">
          <img 
            src="/images/prescription.png" 
            alt="prescription" 
            className="C2074"
          />
        </div>
      </div>
    </div>
  );
}
