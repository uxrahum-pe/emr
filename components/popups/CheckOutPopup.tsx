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
        <div className="C2033">
          <img 
            src="/images/male-64.jpg" 
            alt="작성자" 
            className="C2034"
          />
          <div className="C2035">
            <p className="T2040">작성자</p>
            <p className="T2041">홍성훈<span className="T2042"> 원장님</span></p>
          </div>
          <div className="C2036 styleSheet isIcon isMini isChevron isRight"></div>

        </div>
      </PopupSectionBox>
      <PopupSectionBox x={700} y={450} width={520} height={100}>
        <div className="C2037">
          <p className="T2043">신수빈</p>
          <p className="T2044">여성</p>
          <p className="T2045">32<span className="T2047">세</span></p>
          <p className="T2045">1<span className="T2047">기</span></p>
          <p className="T2046">210047938</p>
          <div className="C2038">
            <div className="C179 isDepth1"></div>
            <div className="C2039 styleSheet isIcon isInfo"></div>
          </div>
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
    </>
  );
}
