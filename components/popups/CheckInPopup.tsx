"use client";

import { useState } from "react";
import PopupSectionBox from "@/components/PopupSectionBox";
import Popup from "@/components/Popup";

/**
 * CheckInPopup Component
 *
 * @description 접수하기 팝업 컴포넌트입니다.
 *
 * @component
 */

import type { CheckInPopupProps } from "@/types/popups";
import AuthorInfo from "../AuthorInfo";
import CustomerInfo from "../CustomerInfo";

/**
 * 접수하기 팝업 컴포넌트
 */
export default function CheckInPopup({ onClose }: CheckInPopupProps) {
  const [isCustomerBasicInfoPopupOpen, setIsCustomerBasicInfoPopupOpen] =
    useState(false);
  return (
    <>
      <PopupSectionBox x={390} y={70} width={520}>
        <div className="C180">
          <p className="T076">접수하기</p>
          <AuthorInfo
            imageSrc="/images/male-64.jpg"
            imageAlt="작성자"
            label="작성자"
            name="홍성훈"
            title="원장님"
          />
        </div>
      </PopupSectionBox>
      <PopupSectionBox x={930} y={70} width={480}>
        <div className="C180">
          <CustomerInfo
            name="신수빈"
            gender="여성"
            age={32}
            packageNumber={1}
            customerNumber="210047938"
            onInfoClick={() => setIsCustomerBasicInfoPopupOpen(true)}
          />
        </div>
      </PopupSectionBox>
      <PopupSectionBox x={1430} y={70} width={100}>
        <div className="C230">
          <div className="C181 isCloseButton" onClick={onClose}>
            <div className="C179 isDepth1"></div>
            <div className="C182 styleSheet isIcon isBig isClose isWhite"></div>
          </div>
        </div>
      </PopupSectionBox>
      <PopupSectionBox x={390} y={190} width={520} height={580}>
        <div className="C230">
          <div className="C231">
            <p className="T098">Vital 고객 이력</p>
          </div>
          <div className="C232"></div>
        </div>
      </PopupSectionBox>
      <PopupSectionBox x={390} y={710} width={520} height={260}>
        <div className="C230"></div>
      </PopupSectionBox>
      <PopupSectionBox x={390} y={990} width={520} height={140}>
        <div className="C230"></div>
      </PopupSectionBox>
      <PopupSectionBox x={930} y={190} width={600} height={240}>
        <div className="C230"></div>
      </PopupSectionBox>
      <PopupSectionBox x={930} y={450} width={600} height={260}>
        <div className="C230"></div>
      </PopupSectionBox>
      <PopupSectionBox x={930} y={570} width={600} height={560}>
        <div className="C230"></div>
      </PopupSectionBox>

      {/* 고객 기본 정보 중첩 팝업 */}
      <Popup
        isOpen={isCustomerBasicInfoPopupOpen}
        onClose={() => setIsCustomerBasicInfoPopupOpen(false)}
        className="isOverlay"
      >
        <PopupSectionBox x={290} y={70} width={660} height={1060}>
          <div className="C180">
            <p className="T076">고객 기본 정보</p>
            <div
              className="C181 isCloseButton"
              onClick={() => setIsCustomerBasicInfoPopupOpen(false)}
            >
              <div className="C179 isDepth1"></div>
              <div className="C182 styleSheet isIcon isBig isClose isWhite"></div>
            </div>
          </div>
        </PopupSectionBox>
        {/* 여기에 고객 기본 정보 퍼블리싱할 내용 추가 */}
      </Popup>
    </>
  );
}
