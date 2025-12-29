"use client";

import { useState } from "react";
import PopupSectionBox from "@/components/PopupSectionBox";
import Popup from "@/components/Popup";
import AuthorInfo from "@/components/AuthorInfo";
import CustomerInfo from "@/components/CustomerInfo";
import type { CheckOutPopupProps } from "@/types/popups";

/**
 * CheckOutPopup Component
 *
 * @description 귀가처리 팝업 컴포넌트입니다.
 *
 * @component
 */

/**
 * 귀가처리 팝업 컴포넌트
 */
export default function CheckOutPopup({ onClose }: CheckOutPopupProps) {
  const [isCustomerBasicInfoPopupOpen, setIsCustomerBasicInfoPopupOpen] =
    useState(false);
  return (
    <>
      <PopupSectionBox x={700} y={330} width={520}>
        <div className="C180">
          <p className="T076">귀가처리</p>
          <AuthorInfo
            imageSrc="/images/male-64.jpg"
            imageAlt="작성자"
            label="작성자"
            name="홍성훈"
            title="원장님"
          />
          <div className="C181 isCloseButton" onClick={onClose}>
            <div className="C179 isDepth1"></div>
            <div className="C182 styleSheet isIcon isBig isClose isWhite"></div>
          </div>
        </div>
      </PopupSectionBox>
      <PopupSectionBox x={700} y={450} width={520}>
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
      <PopupSectionBox x={700} y={570} width={520} height={300}>
        <div className="C2040">
          <p className="T2048">선택 고객을 귀가처리 하시겠습니까?</p>
          <div className="C2042">
            <p className="T2049">해당 고객의 귀가 처리를 완료하시겠습니까?</p>
            <p className="T2049">완료 후에는 상태 변경이 제한될 수 있습니다.</p>
          </div>
          <button className="C2041">귀가처리</button>
        </div>
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
