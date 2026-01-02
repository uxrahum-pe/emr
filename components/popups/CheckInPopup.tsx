"use client";

import { useState, useMemo } from "react";
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
import type { PackageItemData } from "@/types/package";
import AuthorInfo from "../AuthorInfo";
import CustomerInfo from "../CustomerInfo";
import PackageItem from "../PackageItem";
import CustomLabeledCheckbox from "../CustomLabeledCheckbox";
import StageSelector, { type StageData } from "../StageSelector";

// 패키지 데이터에 잔여 시술 정보를 포함한 확장 타입
interface ExtendedPackageItemData extends PackageItemData {
  /** 잔여 시술 횟수 (무한이면 null) */
  remainingCount: number | null;
}

// 패키지 더미 데이터
const packageItems: ExtendedPackageItemData[] = [
  {
    defaultFolded: true,
    header: {
      part: "허벅지",
      code: "FAT242",
      grcode: "D088",
      partClass: "isThigh",
    },
    body: {
      title: "러브핸들 지방흡입 + 허리 라인 교정",
      spec: "B2(62~64.8cm이하)",
      type: "병행",
      count: "무한",
    },
    stats: {
      method: "일반",
      specialRate: 0,
      fatLevel: 0,
      procedureCount: 2,
    },
    payment: {
      contractAmount: 5000000,
      reservationAmount: 500000,
      discountRate: 10.13,
      discountAmount: 50000,
    },
    remainingCount: null, // 무한
  },
  {
    defaultFolded: false,
    header: {
      part: "얼굴",
      code: "FAC101",
      grcode: "A015",
      partClass: "isFace",
    },
    body: {
      title: "이중턱 지방흡입 + V라인 성형",
      spec: "A1(55cm이하)",
      type: "단독",
      count: "3회",
    },
    stats: {
      method: "특수",
      specialRate: 15,
      fatLevel: 2,
      procedureCount: 3,
    },
    payment: {
      contractAmount: 3500000,
      reservationAmount: 300000,
      discountRate: 5.5,
      discountAmount: 192500,
    },
    remainingCount: 1, // 잔여 1회
  },
];

// 기수 데이터 (외부 JSON에서 받아올 데이터)
const stageData: StageData[] = [
  {
    stage: 4,
    startDate: "24.01.04",
    endDate: "24.03.14",
    duration: 61,
    className: "isGreen",
  },
  {
    stage: 3,
    startDate: "24.01.04",
    endDate: "24.03.14",
    duration: 61,
    className: "isGreen",
  },
  {
    stage: 2,
    startDate: "24.01.04",
    endDate: "24.03.14",
    duration: 61,
    className: "isGreen",
  },
  {
    stage: 1,
    startDate: "24.01.04",
    endDate: "24.03.14",
    duration: 61,
  },
];

/**
 * 접수하기 팝업 컴포넌트
 */
export default function CheckInPopup({ onClose }: CheckInPopupProps) {
  const [isCustomerBasicInfoPopupOpen, setIsCustomerBasicInfoPopupOpen] =
    useState(false);
  const [showRemainingOnly, setShowRemainingOnly] = useState(false);
  const [isStageHovered, setIsStageHovered] = useState(false);

  // 잔여 시술만 보기 필터링
  const filteredPackageItems = useMemo(() => {
    if (!showRemainingOnly) {
      return packageItems;
    }
    // 잔여 시술이 있는 패키지만 필터링 (무한이거나 remainingCount > 0)
    return packageItems.filter(
      (item) => item.remainingCount === null || item.remainingCount > 0
    );
  }, [showRemainingOnly]);

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
      <PopupSectionBox x={390} y={190} width={520} height={620}>
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
      <PopupSectionBox x={390} y={750} width={520} height={250}>
        <div className="C233">
          <div className="C242">
            <p className="T102">체중:</p>
            <div className="C1017">
              <input className="T103" placeholder="kg 단위" type="text" />
            </div>
            <p className="T104">
              최종 측정값: <span className="isValue">56.4</span> kg (24.06.27)
            </p>
          </div>
          <div className="C242">
            <p className="T102">키:</p>
            <div className="C1017">
              <input className="T103" placeholder="cm 단위" type="text" />
            </div>
            <p className="T104">
              최종 측정값: <span className="isValue">162.4</span> cm (24.06.27)
            </p>
          </div>
          <div className="C242">
            <p className="T107">
              <span className="isUnit">최종 등록:</span> 2024.06.27
            </p>
            <p className="T106">최종데이터 자동입력</p>
            <div className="C243">
              <div className="C244">
                <div className="C245 styleSheet isIcon isArrow"></div>
              </div>
              <p className="T105">입력 완료</p>
            </div>
          </div>
        </div>
      </PopupSectionBox>
      <PopupSectionBox x={390} y={1020} width={520} height={110}>
        <div className="C233">
          <div className="C242">
            <div>
              <p className="T108">인바디 기록</p>
              <p className="T107">
                <span className="isUnit">최종 측정일시: 2024.</span>06.27
                <span className="isUnit"> AM</span> 10:30
              </p>
            </div>
            <div className="C243 isGrey">
              <div className="C244">
                <div className="C245 styleSheet isIcon isRuler"></div>
              </div>
              <p className="T105">측정 시작</p>
            </div>
          </div>
        </div>
      </PopupSectionBox>
      <PopupSectionBox x={930} y={190} width={600} height={230}>
        <div className="C233">
          <div className="C231">
            <p className="T098">상담 내용</p>
            <p className="T109">
              <span className="isUnit">최종 상담일시:</span> 2024.11.07{" "}
              <span className="isUnit">PM</span> 05:31
            </p>
          </div>
          <div className="C232">
            <div className="C246">
              <div className="C247">
                <p className="T110">키</p>
                <p className="T111">
                  <span className="isValue">175</span> cm
                </p>
              </div>
              <div className="C247">
                <p className="T110">
                  1개월 <span className="isYellow">목표</span> 체중
                </p>
                <p className="T111">
                  <span className="isValue">62.0</span> kg →{" "}
                  <span className="isValue isYellow">59.5</span> kg
                </p>
              </div>
              <div className="C247">
                <p className="T110">목표량</p>
                <p className="T111">
                  <span className="isValue isYellow">-2.5</span> kg
                </p>
              </div>
              <div className="C247">
                <p className="T110">주기적 내원 종료 (1달 후)</p>
                <p className="T111">
                  {" "}
                  2025.<span className="isValue">10.01</span>
                </p>
              </div>
            </div>
            <div className="C246">
              <div className="C247">
                <p className="T110">키</p>
                <p className="T111">
                  <span className="isValue">175</span> cm
                </p>
              </div>
              <div className="C247">
                <p className="T110">
                  2개월 <span className="isMint">달성</span> 체중
                </p>
                <p className="T111">
                  <span className="isValue">62.0</span> kg →{" "}
                  <span className="isValue isMint">59.5</span> kg
                </p>
              </div>
              <div className="C247">
                <p className="T110">달성량</p>
                <p className="T111">
                  <span className="isValue isMint">-2.5</span> kg
                </p>
              </div>
              <div className="C247">
                <p className="T110">주기적 내원 종료 (2달 후)</p>
                <p className="T111">
                  {" "}
                  2025.<span className="isValue">11.01</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </PopupSectionBox>
      <PopupSectionBox
        x={930}
        y={440}
        width={600}
        height={260}
        name="stage"
        onMouseEnter={() => setIsStageHovered(true)}
        onMouseLeave={() => setIsStageHovered(false)}
      >
        <div className="C233">
          <div className="C231">
            <p className="T098">기수 선택</p>
          </div>
          <StageSelector
            stages={stageData}
            defaultSelectedIndex={0}
            onStageSelect={(stage, index) => {
              console.log("Selected stage:", stage, index);
            }}
          />
        </div>
      </PopupSectionBox>
      <PopupSectionBox
        x={930}
        y={isStageHovered ? 640 : 550}
        width={600}
        height={isStageHovered ? 490 : 580}
        name="package"
      >
        <div className="C233">
          <div className="C231">
            <p className="T098">패키지 내역</p>
          </div>
          <div className="C232">
            {filteredPackageItems.map((item, index) => (
              <PackageItem
                key={index}
                defaultFolded={item.defaultFolded}
                isDarkMode={true}
                icon={<div className="C134 isIMaskMagenta isSyringe"></div>}
                partIcon={
                  <div className="C119">
                    <div
                      className={`C121 styleSheet isIcon isPart ${item.header.partClass}`}
                    ></div>
                  </div>
                }
                header={item.header}
                body={item.body}
                remainingCount={item.remainingCount}
                stats={item.stats}
                payment={item.payment}
                notes={
                  index === 0
                    ? [
                        {
                          date: "25.08.23",
                          content: "1차 시술 완료. 통증 없음, 상태 양호",
                          authorName: "이미영",
                          authorTitle: "간호사",
                          authorImageUrl: "/images/female-64.jpg",
                        },
                        {
                          date: "25.07.15",
                          content: "초진 상담 완료. 계약금 입금 확인",
                          authorName: "김민수",
                          authorTitle: "과장",
                        },
                      ]
                    : [
                        {
                          date: "25.08.20",
                          content: "2차 시술 완료. 부종 경미, 회복 양호",
                          authorName: "이미영",
                          authorTitle: "간호사",
                          authorImageUrl: "/images/female-64.jpg",
                        },
                        {
                          date: "25.08.05",
                          content: "1차 시술 완료. 특수 수술방법 적용",
                          authorName: "홍성훈",
                          authorTitle: "원장님",
                        },
                        {
                          date: "25.07.28",
                          content: "예약금 입금 완료. 수술 일정 확정",
                          authorName: "김민수",
                          authorTitle: "과장",
                        },
                      ]
                }
              />
            ))}
          </div>
          <div className="C248"></div>
          <div className="C249">
            <CustomLabeledCheckbox
              checked={showRemainingOnly}
              onChange={setShowRemainingOnly}
              text="잔여 시술만 보기"
            />
          </div>
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
