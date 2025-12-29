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
        <div className="C233">
          <div className="C231">
            <p className="T098">Vital 고객 이력</p>
          </div>
          <div className="C234"></div>
          <div className="C232">
            <div className="C076">
              <div className="C235">
                <p className="T036">
                  <span className="isUnit">25.</span>02.17
                  <br></br>
                  <span className="isUnit">AM</span> 10:30
                </p>
                <div className="C237">
                  <p className="T014 isOldbie">
                    2<span className="isUnit">기</span>
                  </p>
                </div>
                <div className="C088">
                  <p className="T099">
                    김민수<span className="isUnit">과장</span>
                  </p>
                  <p className="T038">(kms002)</p>
                </div>
              </div>
              <div className="C236">
                <div className="C080">
                  <div className="C081 styleSheet isIcon isMini isChecked"></div>
                </div>
                <div className="C082 isMale isGap"></div>
              </div>
              <div className="C238">
                <div className="C239">
                  <div className="C240">
                    <p className="T100">키</p>
                    <p className="T101">
                      175<span className="isUnit">cm</span>
                    </p>
                  </div>
                  <div className="C240">
                    <p className="T100">B.P</p>
                    <p className="T101">
                      132<span className="isUnit">/</span>88
                    </p>
                  </div>
                  <div className="C240">
                    <p className="T100">R</p>
                    <p className="T101">20</p>
                  </div>
                  <div className="C240">
                    <p className="T100">몸무게</p>
                    <p className="T101">
                      62.5<span className="isUnit">kg (</span>
                      <span className="isMagenta isValue">-0.2</span>
                      <span className="isUnit">)</span>
                    </p>
                  </div>
                </div>
                <div className="C239">
                  <div className="C240">
                    <p className="T100">P.R</p>
                    <p className="T101">69</p>
                  </div>
                  <div className="C240">
                    <p className="T100">BT</p>
                    <p className="T101">123</p>
                  </div>
                  <div className="C240">
                    <p className="T100">B.T</p>
                    <p className="T101">
                      35.6<span className="isUnit"> ℃</span>
                    </p>
                  </div>
                  <div className="C240">
                    <p className="T100">간호사 확인</p>
                    <div className="C214">
                      <div className="C241"></div>
                      <p className="T089">
                        이미영
                        <span className="isUnit">간호사</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="C076">
              <div className="C235">
                <p className="T036">
                  <span className="isUnit">25.</span>02.17
                  <br></br>
                  <span className="isUnit">AM</span> 10:30
                </p>
                <div className="C237">
                  <p className="T014 isOldbie">
                    2<span className="isUnit">기</span>
                  </p>
                </div>
                <div className="C088">
                  <p className="T099">
                    김민수<span className="isUnit">과장</span>
                  </p>
                  <p className="T038">(kms002)</p>
                </div>
              </div>
              <div className="C236">
                <div className="C080">
                  <div className="C081 styleSheet isIcon isMini isChecked"></div>
                </div>
                <div className="C082 isMale isGap"></div>
              </div>
              <div className="C238">
                <div className="C239">
                  <div className="C240">
                    <p className="T100">키</p>
                    <p className="T101">
                      175<span className="isUnit">cm</span>
                    </p>
                  </div>
                  <div className="C240">
                    <p className="T100">B.P</p>
                    <p className="T101">
                      132<span className="isUnit">/</span>88
                    </p>
                  </div>
                  <div className="C240">
                    <p className="T100">R</p>
                    <p className="T101">20</p>
                  </div>
                  <div className="C240">
                    <p className="T100">몸무게</p>
                    <p className="T101">
                      62.5<span className="isUnit">kg (</span>
                      <span className="isMagenta isValue">-0.2</span>
                      <span className="isUnit">)</span>
                    </p>
                  </div>
                </div>
                <div className="C239">
                  <div className="C240">
                    <p className="T100">P.R</p>
                    <p className="T101">69</p>
                  </div>
                  <div className="C240">
                    <p className="T100">BT</p>
                    <p className="T101">123</p>
                  </div>
                  <div className="C240">
                    <p className="T100">B.T</p>
                    <p className="T101">
                      35.6<span className="isUnit"> ℃</span>
                    </p>
                  </div>
                  <div className="C240">
                    <p className="T100">간호사 확인</p>
                    <div className="C214">
                      <div className="C241"></div>
                      <p className="T089">
                        이미영
                        <span className="isUnit">간호사</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="C076">
              <div className="C235">
                <p className="T036">
                  <span className="isUnit">25.</span>02.17
                  <br></br>
                  <span className="isUnit">AM</span> 10:30
                </p>
                <div className="C237">
                  <p className="T014 isOldbie">
                    2<span className="isUnit">기</span>
                  </p>
                </div>
                <div className="C088">
                  <p className="T099">
                    김민수<span className="isUnit">과장</span>
                  </p>
                  <p className="T038">(kms002)</p>
                </div>
              </div>
              <div className="C236">
                <div className="C080">
                  <div className="C081 styleSheet isIcon isMini isChecked"></div>
                </div>
                <div className="C082 isMale isGap"></div>
              </div>
              <div className="C238">
                <div className="C239">
                  <div className="C240">
                    <p className="T100">키</p>
                    <p className="T101">
                      175<span className="isUnit">cm</span>
                    </p>
                  </div>
                  <div className="C240">
                    <p className="T100">B.P</p>
                    <p className="T101">
                      132<span className="isUnit">/</span>88
                    </p>
                  </div>
                  <div className="C240">
                    <p className="T100">R</p>
                    <p className="T101">20</p>
                  </div>
                  <div className="C240">
                    <p className="T100">몸무게</p>
                    <p className="T101">
                      62.5<span className="isUnit">kg (</span>
                      <span className="isBlue isValue">+0.2</span>
                      <span className="isUnit">)</span>
                    </p>
                  </div>
                </div>
                <div className="C239">
                  <div className="C240">
                    <p className="T100">P.R</p>
                    <p className="T101">69</p>
                  </div>
                  <div className="C240">
                    <p className="T100">BT</p>
                    <p className="T101">123</p>
                  </div>
                  <div className="C240">
                    <p className="T100">B.T</p>
                    <p className="T101">
                      35.6<span className="isUnit"> ℃</span>
                    </p>
                  </div>
                  <div className="C240">
                    <p className="T100">간호사 확인</p>
                    <div className="C214">
                      <div className="C241"></div>
                      <p className="T089">
                        이미영
                        <span className="isUnit">간호사</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PopupSectionBox>
      <PopupSectionBox x={390} y={710} width={520} height={260}>
        <div className="C233"></div>
      </PopupSectionBox>
      <PopupSectionBox x={390} y={990} width={520} height={140}>
        <div className="C233"></div>
      </PopupSectionBox>
      <PopupSectionBox x={930} y={190} width={600} height={240}>
        <div className="C233">
          <div className="C231">
            <p className="T098">상담 내용</p>
          </div>
          <div className="C232"></div>
        </div>
      </PopupSectionBox>
      <PopupSectionBox x={930} y={450} width={600} height={260}>
        <div className="C233">
          <div className="C231">
            <p className="T098">기수 선택</p>
          </div>
        </div>
      </PopupSectionBox>
      <PopupSectionBox x={930} y={570} width={600} height={560}>
        <div className="C233">
          <div className="C231">
            <p className="T098">패키지 내역</p>
          </div>
          <div className="C232"></div>
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
