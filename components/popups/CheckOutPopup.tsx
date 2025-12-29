"use client";

import PopupSectionBox from "@/components/PopupSectionBox";
import PopupHeader from "./PopupHeader";
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
  return (
    <>
      <PopupSectionBox x={700} y={330} width={520} height={100}>
        <PopupHeader title="귀가처리" onClose={onClose} />
        <div className="C2036">
          <img 
            src="/images/male-64.jpg" 
            alt="작성자" 
            className="C2037"
          />
          <div className="C2038">
            <p className="T2038">작성자</p>
            <p className="T2039">홍성훈<span className="T2040"> 원장님</span></p>
          </div>
          <div className="C2040 styleSheet isIcon isMini isChevron isRight"></div>

        </div>
      </PopupSectionBox>
      <PopupSectionBox x={700} y={450} width={520} height={100}>
        <div className="C2033">
          <p className="T2033">신수빈</p>
          <p className="T2034">여성</p>
          <p className="T2035">32<span className="T2037">세</span></p>
          <p className="T2035">1<span className="T2037">기</span></p>
          <p className="T2036">210047938</p>
          <div className="C2035">
            <div className="C179 isDepth1"></div>
            <div className="C182 styleSheet isIcon isInfo"></div>
          </div>
        </div>
      </PopupSectionBox>
      <PopupSectionBox x={700} y={570} width={520} height={300}>
        <div></div>
      </PopupSectionBox>
    </>
  );
}
