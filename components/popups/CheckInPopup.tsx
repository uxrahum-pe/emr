"use client";

import PopupSectionBox from "@/components/PopupSectionBox";

/**
 * CheckInPopup Component
 *
 * @description 접수하기 팝업 컴포넌트입니다.
 *
 * @component
 */

import type { CheckInPopupProps } from "@/types/popups";
import AuthorInfo from "../AuthorInfo";

/**
 * 접수하기 팝업 컴포넌트
 */
export default function CheckInPopup({ onClose }: CheckInPopupProps) {
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
          <div className="C181 isCloseButton" onClick={onClose}>
            <div className="C179 isDepth1"></div>
            <div className="C182 styleSheet isIcon isBig isClose isWhite"></div>
          </div>
        </div>
      </PopupSectionBox>
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
          <div className="C181 isCloseButton" onClick={onClose}>
            <div className="C179 isDepth1"></div>
            <div className="C182 styleSheet isIcon isBig isClose isWhite"></div>
          </div>
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
    </>
  );
}
