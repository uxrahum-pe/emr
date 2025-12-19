/**
 * CustomerStatusSection Component
 *
 * @description 원무 페이지의 고객 상태 섹션 컴포넌트입니다.
 * 예약, 대기, 완료 등 고객 상태를 관리하고 표시합니다.
 *
 * @component
 * @example
 * ```tsx
 * <CustomerStatusSection
 *   handleC032Click={handleC032Click}
 *   isSmallScreen={isSmallScreen}
 *   setIsSmallScreen={setIsSmallScreen}
 *   // ... 기타 props
 * />
 * ```
 *
 * @remarks
 * - 원무 페이지에서만 사용되는 컴포넌트입니다.
 * - Zustand 스토어(useReceptionStore)를 사용하여 상태를 관리합니다.
 * - useAside 훅을 사용하여 Aside 네비게이션을 수행합니다.
 */

"use client";

import { useAside } from "@/components/AsideContext";
import SlidePage from "@/components/SlidePage";
import ReferenceMessage from "@/components/ReferenceMessage";
import ToggleSwitch from "@/components/ToggleSwitch";
import Tooltip from "@/components/Tooltip";
import DraggableScrollContainer from "@/components/DraggableScrollContainer";
import ScrollableContainer from "@/components/ScrollableContainer";
import TabSelector from "@/components/TabSelector";
import EmployeeBadge from "@/components/EmployeeBadge";
import CustomerDetailPanel from "@/components/CustomerDetailPanel";
import ReceptionCheckInButton from "@/components/ReceptionCheckInButton";
import { getRoleInfo } from "@/lib/utils/role";
import type { CustomerStatusSectionProps } from "@/types/reception";

/**
 * CustomerStatusSection 컴포넌트
 */
export default function CustomerStatusSection({
  handleC032Click,
  isSmallScreen,
  setIsSmallScreen,
  activeIndex,
  selectedTabs,
  setSelectedTabs,
  selectedPendingTabs,
  setSelectedPendingTabs,
  selectedSortTab,
  setSelectedSortTab,
  isQuickActionsHovered,
  setIsQuickActionsHovered,
  isCustomerDetailOpen,
  setIsCustomerDetailOpen,
}: CustomerStatusSectionProps) {
  const { navigateToPage, resetToMain } = useAside();

  const handleCustomerClick = (
    customerName: string,
    customerId: string,
    e?: React.MouseEvent
  ) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log("고객 클릭:", customerName, customerId);
    // 고객 통합 정보 패널 열기
    setIsCustomerDetailOpen(true);
    // 모든 고객은 동일한 customer 카테고리로 묶어서 누적 없이 데이터만 리로드
    navigateToPage(
      "customer",
      <SlidePage
        title="고객 참조사항"
        customerName={customerName}
        customerId={customerId}
        showToggleSwitch={true}
      >
        <div className="C070">
          <div className="C157">
            <div className="C158 styleSheet isIcon isReception"></div>
            <p className="T069">
              <span className="isUnit">From:</span> 원무
            </p>
          </div>
          <p className="T035">
            <span className="isUnit">참조사항 입력</span>
          </p>
          <div className="C071">
            <div className="C072 styleSheet isIcon isWrite"></div>
          </div>
        </div>
        <div className="C156">
          <ReferenceMessage
            from={{
              department: "원무",
              type: "일반",
              iconClass: "isReception",
            }}
            author={{
              name: "김민수",
              role: "원무팀장",
              avatarClass: "isMale",
              tooltipText: "김민수 원무팀장",
              employeeId: "kms001",
            }}
            content="오늘 오후 2시부터 시스템 점검이 예정되어 있습니다. 점검 시간 동안 일시적으로 접속이 불가능할 수 있으니, 긴급한 업무는 사전에 처리해 주시기 바랍니다. 점검이 완료되면 자동으로 알림이 발송될 예정입니다."
            time="AM 09:15"
          />
          <div className="C135">
            <p className="T061">2025.12.15 (월)</p>
          </div>
          <ReferenceMessage
            from={{
              department: "원무",
              type: "긴급",
              iconClass: "isReception",
            }}
            to={{ department: "상담", type: "긴급", iconClass: "isCounseling" }}
            author={{
              name: "박지영",
              role: "상담사",
              avatarClass: "isFemale",
              tooltipText: "박지영 상담사",
              employeeId: "pjy002",
            }}
            content="홍길동 고객님께서 내일 오전 예약 변경을 요청하셨습니다. 원래 예약 시간은 오전 10시였는데, 오후 2시로 변경 희망하신다고 하셨습니다. 가능 여부 확인 후 연락 부탁드립니다."
            time="AM 10:32"
          />
          <ReferenceMessage
            from={{
              department: "상담",
              type: "일반",
              iconClass: "isCounseling",
            }}
            author={{
              name: "이수진",
              role: "상담사",
              avatarClass: "isMale",
              tooltipText: "이수진 상담사",
              employeeId: "lsj003",
            }}
            content="네, 확인했습니다. 오후 2시 시간대가 비어있어서 변경 가능합니다. 고객님께 확인 연락 드리겠습니다."
            isMine={true}
            time="AM 10:45"
          />
          <ReferenceMessage
            from={{
              department: "원무",
              type: "일반",
              iconClass: "isReception",
            }}
            to={{ department: "진료", type: "일반", iconClass: "isClinic" }}
            author={{
              name: "최영희",
              role: "원무과장",
              avatarClass: "isFemale",
              tooltipText: "최영희 원무과장",
              employeeId: "cyh004",
            }}
            content="이번 주 금요일부터 새로운 보험 정책이 적용됩니다. 주요 변경사항은 진료실로 공지문을 보내드렸으니 확인 부탁드립니다. 환자 상담 시 참고해 주시기 바랍니다."
            isMine={true}
            time="PM 02:15"
          />
        </div>
        <div className="C167">
          <div className="C168">
            <div className="C169 styleSheet isIcon isMegaphone"></div>
          </div>
          <div className="C170">
            <div className="C171">
              <p className="T072 isRed">전체공지</p>
              <p className="T019">
                From: <span className="isBold isBlack">원무</span>
              </p>
            </div>
            <p className="T073 isEllipsis">
              네트웍스 서포터
              asdfasdfasdfasdfasdㅁㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄹfasdf
            </p>
          </div>
          <div className="C112">
            <div className="C113 styleSheet isIcon isMini isChevron"></div>
          </div>
        </div>
      </SlidePage>
    );
  };

  const handleCustomerDetailClose = () => {
    setIsCustomerDetailOpen(false);
    // Aside도 원무파트 전체 타임라인으로 되돌리기
    resetToMain();
  };

  const handleEmployeeClickFromStatus = (
    employeeName: string,
    employeeId: string,
    role: string,
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation(); // C034 클릭 이벤트와 충돌 방지
    console.log("고객현황 직원 클릭:", employeeName, employeeId, role);

    // 역할 정보 가져오기 (유틸리티 함수 사용)
    const roleInfo = getRoleInfo(role);
    const SlidePageComponent = roleInfo.component;

    // 동일 역할 카테고리는 같은 pageId 사용 (employeeId 무시)
    navigateToPage(
      roleInfo.category,
      <SlidePageComponent
        title={roleInfo.title}
        employeeName={employeeName}
        employeeRole={role}
        employeeId={employeeId}
      />
    );
  };

  return (
    <article className="C020">
      <section className="C021">
        <div className="C028">
          <p className="T007">고객 현황</p>
          <div className="C022">
            <div className="C017 styleSheet isIcon isMagnifier"></div>
            <p className="T005">고객 통합 검색</p>
          </div>
          <div className="C023">
            <div className="C019 styleSheet isIcon isCheck"></div>
            <p className="T008">설문지 & 바코드 고객 검색</p>
          </div>
          <div className="C023">
            <div className="C019 styleSheet isIcon isSignUp"></div>
            <p className="T008">고객 직접 등록</p>
          </div>
          <div className="C024">
            <p className="T009">화면 크기:</p>
            <ToggleSwitch
              onLabel="큰 화면"
              offLabel="작은 화면"
              value={!isSmallScreen}
              onChange={(isOn) => {
                setIsSmallScreen(!isOn);
              }}
            />
          </div>
        </div>
        <div className={`C029 ${isSmallScreen ? "isSmall" : "isBig"}`}>
          <div className="C030 isQuartet">
            <div
              className={`C031 isReservation ${
                activeIndex === 0
                  ? "isActived"
                  : activeIndex !== null
                  ? "isFolded"
                  : ""
              }`}
            >
              <div className="C032" onClick={(e) => handleC032Click(0, e)}>
                <div className="C036">
                  <div className="C033 isIcon styleSheet isAlarmClock"></div>
                </div>
                <p className="T011">예약</p>
                <TabSelector
                  items={[
                    { title: "수술상담" },
                    { title: "시술상담" },
                    { title: "일반시술" },
                  ]}
                  multiple={true}
                  value={selectedTabs}
                  onChange={(selected) => setSelectedTabs(selected as number[])}
                />
                <div className="C051">
                  <div className="C052 styleSheet isIcon isMini isPin"></div>
                  <p className="T026">고정</p>
                </div>
                <p className="T012">
                  대기: <span className="isValue isBlack">5</span>명 / 지연:{" "}
                  <span className="isValue isRed">2</span>명
                </p>
                <p className="T020">
                  <span className="isBlack">5</span> /{" "}
                  <span className="isRed">2</span>
                </p>
              </div>
              <ScrollableContainer>
                <div
                  className="C034"
                  onClick={() => handleCustomerClick("김지영", "210051234")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">김지영</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        27<span className="isUnit">세</span>
                      </p>
                      <p className="T014 isOldbie">
                        2<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210051234</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 10:30 예정.
                    </p>
                    <p className="T017">시술 신환 상담</p>
                    <EmployeeBadge
                      name="김유정"
                      role="상담사"
                      employeeId="kyj006"
                      onClick={(e) =>
                        handleEmployeeClickFromStatus(
                          "김유정",
                          "kyj006",
                          "상담사",
                          e
                        )
                      }
                    />
                    <p className="T019 isRed">31분 지연.</p>
                    <p className="T023">
                      “국적: 캄보디아/ KVN 30% 수수료/155cm 47kg/얼굴”
                    </p>
                    <p className="T024">해외예약</p>
                    <p className="T024">외국인</p>
                    <p className="T024">통역필요</p>
                    <p className="T024">
                      <span className="isUnit">국적:</span>베트남
                    </p>
                    <p className="T024">
                      <span className="isUnit">사용언어:</span>베트남어
                    </p>
                    <p className="T024">
                      <span className="isUnit">통역:</span>후안펑
                    </p>
                  </div>
                </div>
                <div
                  className="C034"
                  onClick={() => handleCustomerClick("박준호", "210051235")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">박준호</p>
                      <p className="T014 isBlue">남성</p>
                      <p className="T014">
                        34<span className="isUnit">세</span>
                      </p>
                      <p className="T014 isNewbie">
                        1<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210051235</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 10:30 예정.
                    </p>
                    <p className="T017">시술 신환 상담</p>
                    <EmployeeBadge
                      name="김유정"
                      role="상담사"
                      employeeId="kyj006"
                      onClick={(e) =>
                        handleEmployeeClickFromStatus(
                          "김유정",
                          "kyj006",
                          "상담사",
                          e
                        )
                      }
                    />
                    <p className="T019 isYellow">11분 지연.</p>
                    <p className="T023">
                      “국적: 캄보디아/ KVN 30% 수수료/155cm 47kg/얼굴”
                    </p>
                    <p className="T024">해외예약</p>
                    <p className="T024">외국인</p>
                    <p className="T024">통역필요</p>
                    <p className="T024">
                      <span className="isUnit">국적:</span>베트남
                    </p>
                    <p className="T024">
                      <span className="isUnit">사용언어:</span>베트남어
                    </p>
                    <p className="T024">
                      <span className="isUnit">통역:</span>후안펑
                    </p>
                  </div>
                </div>
                <div
                  className="C034"
                  onClick={() => handleCustomerClick("최혜진", "210051236")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">최혜진</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        41<span className="isUnit">세</span>
                      </p>
                      <p className="T014 isOldbie">
                        3<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210051236</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 10:30 예정.
                    </p>
                    <p className="T017">시술 신환 상담</p>
                    <EmployeeBadge
                      name="김유정"
                      role="상담사"
                      employeeId="kyj006"
                      onClick={(e) =>
                        handleEmployeeClickFromStatus(
                          "김유정",
                          "kyj006",
                          "상담사",
                          e
                        )
                      }
                    />
                    <p className="T019 isGreen">5분 후 도착 예정.</p>
                    <p className="T023">
                      “국적: 캄보디아/ KVN 30% 수수료/155cm 47kg/얼굴”
                    </p>
                    <p className="T024">해외예약</p>
                    <p className="T024">외국인</p>
                    <p className="T024">통역필요</p>
                    <p className="T024">
                      <span className="isUnit">국적:</span>베트남
                    </p>
                    <p className="T024">
                      <span className="isUnit">사용언어:</span>베트남어
                    </p>
                    <p className="T024">
                      <span className="isUnit">통역:</span>후안펑
                    </p>
                  </div>
                </div>
                <div
                  className="C034"
                  onClick={() => handleCustomerClick("이은지", "210051237")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">이은지</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        39<span className="isUnit">세</span>
                      </p>
                      <p className="T014 isOldbie">
                        2<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210051237</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 10:30 예정.
                    </p>
                    <p className="T017">시술 신환 상담</p>
                    <EmployeeBadge
                      name="김유정"
                      role="상담사"
                      employeeId="kyj006"
                      onClick={(e) =>
                        handleEmployeeClickFromStatus(
                          "김유정",
                          "kyj006",
                          "상담사",
                          e
                        )
                      }
                    />
                    <p className="T019">30분 후 도착 예정.</p>
                    <p className="T023">
                      “국적: 캄보디아/ KVN 30% 수수료/155cm 47kg/얼굴”
                    </p>
                    <p className="T024">해외예약</p>
                    <p className="T024">외국인</p>
                    <p className="T024">통역필요</p>
                    <p className="T024">
                      <span className="isUnit">국적:</span>베트남
                    </p>
                    <p className="T024">
                      <span className="isUnit">사용언어:</span>베트남어
                    </p>
                    <p className="T024">
                      <span className="isUnit">통역:</span>후안펑
                    </p>
                  </div>
                </div>
                <div
                  className="C034"
                  onClick={() => handleCustomerClick("한소영", "210051238")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">한소영</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        26<span className="isUnit">세</span>
                      </p>
                      <p className="T014 isNewbie">
                        1<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210051238</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 10:30 예정.
                    </p>
                    <p className="T017">시술 신환 상담</p>
                    <EmployeeBadge
                      name="김유정"
                      role="상담사"
                      employeeId="kyj006"
                      onClick={(e) =>
                        handleEmployeeClickFromStatus(
                          "김유정",
                          "kyj006",
                          "상담사",
                          e
                        )
                      }
                    />
                    <p className="T019">1시간 30분 후 도착 예정.</p>
                    <p className="T023">
                      “국적: 캄보디아/ KVN 30% 수수료/155cm 47kg/얼굴”
                    </p>
                    <p className="T024">해외예약</p>
                    <p className="T024">외국인</p>
                    <p className="T024">통역필요</p>
                    <p className="T024">
                      <span className="isUnit">국적:</span>베트남
                    </p>
                    <p className="T024">
                      <span className="isUnit">사용언어:</span>베트남어
                    </p>
                    <p className="T024">
                      <span className="isUnit">통역:</span>후안펑
                    </p>
                  </div>
                </div>
              </ScrollableContainer>
            </div>
            <div
              className={`C031 isPending ${
                activeIndex === 1
                  ? "isActived"
                  : activeIndex !== null
                  ? "isFolded"
                  : ""
              }`}
            >
              <div className="C032" onClick={(e) => handleC032Click(1, e)}>
                <div className="C036">
                  <div className="C033 isIcon styleSheet isHourglass"></div>
                </div>
                <p className="T011">대기</p>
                <TabSelector
                  items={[{ title: "수술상담" }, { title: "시술상담" }]}
                  multiple={true}
                  value={selectedPendingTabs}
                  onChange={(selected) =>
                    setSelectedPendingTabs(selected as number[])
                  }
                />
                <div className="C051">
                  <div className="C052 styleSheet isIcon isMini isPin"></div>
                  <p className="T026">고정</p>
                </div>
                <p className="T012">
                  접수: <span className="isValue isBlack">2</span>명 / 보류:{" "}
                  <span className="isValue isYellow">1</span>명
                </p>
                <p className="T020">
                  <span className="isBlack">2</span> /{" "}
                  <span className="isYellow">1</span>
                </p>
              </div>
              <ScrollableContainer>
                <div
                  className="C034"
                  onClick={() => handleCustomerClick("정미영", "210051239")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">정미영</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        30<span className="isUnit">세</span>
                      </p>
                      <p className="T014 isNewbie">
                        1<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210051239</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 10:25 이관.
                    </p>
                    <p className="T016">
                      <span className="isUnit">from:</span> 진료파트
                    </p>
                    <p className="T016 isYellow">
                      <span className="isBold">21분</span> 대기
                    </p>
                    <p className="T019">
                      -합계:<span className="isBold isRed">31분</span>
                    </p>
                  </div>
                  <DraggableScrollContainer
                    className="C041"
                    scrollToEnd={activeIndex === 1}
                  >
                    <div className="C045">
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isRibbon"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">상태 변경</span> 시술시작.
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isSyringe"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">시술 완료:</span> O2
                            리프팅패키지
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isPaperPlane"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">파트이동:</span> 수납
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </div>
                <div
                  className="C034"
                  onClick={() => handleCustomerClick("윤지혜", "210051240")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">윤지혜</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        28<span className="isUnit">세</span>
                      </p>
                      <p className="T014 isNewbie">
                        1<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210051240</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 10:40 접수.
                    </p>
                    <p className="T016 isGreen">
                      <span className="isBold">11분</span> 대기
                    </p>
                    <p className="T019">
                      -합계:<span className="isBold isGreen">11분</span>
                    </p>
                  </div>
                  <DraggableScrollContainer
                    className="C041"
                    scrollToEnd={activeIndex === 1}
                  >
                    <div className="C045">
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isRibbon"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">상태 변경</span> 시술시작.
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isSyringe"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">시술 완료:</span> O2
                            리프팅패키지
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isPaperPlane"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">파트이동:</span> 수납
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </div>
                <div
                  className="C034"
                  onClick={() => handleCustomerClick("강민주", "210051241")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">강민주</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        31<span className="isUnit">세</span>
                      </p>
                      <p className="T014 isOldbie">
                        2<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210051241</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 10:50 접수.
                    </p>
                    <p className="T017 isBlue">Vital 입력완료</p>
                    <p className="T016 isGreen">
                      <span className="isBold">11분</span> 대기
                    </p>
                    <p className="T019">
                      -합계:<span className="isBold isGreen">11분</span>
                    </p>
                  </div>
                  <DraggableScrollContainer
                    className="C041"
                    scrollToEnd={activeIndex === 1}
                  >
                    <div className="C045">
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isRibbon"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">상태 변경</span> 시술시작.
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isSyringe"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">시술 완료:</span> O2
                            리프팅패키지
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isPaperPlane"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">파트이동:</span> 수납
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </div>
              </ScrollableContainer>
            </div>
            <div
              className={`C031 isClinic ${
                activeIndex === 2
                  ? "isActived"
                  : activeIndex !== null
                  ? "isFolded"
                  : ""
              }`}
            >
              <div className="C032" onClick={(e) => handleC032Click(2, e)}>
                <div className="C036">
                  <div className="C033 isIcon styleSheet isClinic"></div>
                </div>
                <p className="T011">진료</p>
                <TabSelector
                  items={[{ title: "시간순" }, { title: "상태순" }]}
                  multiple={false}
                  value={selectedSortTab}
                  onChange={(selected) =>
                    setSelectedSortTab(selected as number)
                  }
                />
                <div className="C051">
                  <div className="C052 styleSheet isIcon isMini isPin"></div>
                  <p className="T026">고정</p>
                </div>
                <p className="T012">
                  대기: <span className="isValue isBlack">4</span>명 / 진행:{" "}
                  <span className="isValue isYellow">2</span>명 / 완료:{" "}
                  <span className="isValue isGreen">2</span>명
                </p>
                <p className="T020">
                  <span className="isBlack">4</span> /{" "}
                  <span className="isYellow">2</span> /{" "}
                  <span className="isGreen">2</span>
                </p>
              </div>
              <ScrollableContainer>
                <div
                  className="C034"
                  onClick={() => handleCustomerClick("박수진", "210048901")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">박수진</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        32<span className="isUnit">세</span>
                      </p>
                      <p className="T014">
                        1<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210048901</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 10:15 이관.
                    </p>
                    <p className="T017">진료 대기</p>
                    <p className="T016 isRed">
                      <span className="isBold">31분</span> 대기
                    </p>
                    <p className="T019">
                      -합계:<span className="isBold isRed">41분</span>
                    </p>
                  </div>
                  <DraggableScrollContainer
                    className="C041"
                    scrollToEnd={activeIndex === 2}
                  >
                    <div className="C045">
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isRibbon"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">상태 변경</span> 시술시작.
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isSyringe"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">시술 완료:</span> O2
                            리프팅패키지
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isPaperPlane"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">파트이동:</span> 수납
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </div>
                <div
                  className="C034"
                  onClick={() => handleCustomerClick("이혜진", "210051567")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">이혜진</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        24<span className="isUnit">세</span>
                      </p>
                      <p className="T014 isOldbie">
                        2<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210051567</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 10:35 시작.
                    </p>
                    <p className="T017">시술 대기</p>
                    <p className="T019">
                      -<span className="isBold isGreen">대기없음</span>
                    </p>
                    <p className="T017">O2 리프팅패키지</p>
                    <p className="T016 isYellow">
                      <span className="isBold">21분</span> 대기
                    </p>
                    <p className="T019">
                      -합계:<span className="isBold isRed">31분</span>
                    </p>
                  </div>
                  <DraggableScrollContainer
                    className="C041"
                    scrollToEnd={activeIndex === 2}
                  >
                    <div className="C045">
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isRibbon"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">상태 변경</span> 시술시작.
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isSyringe"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">시술 완료:</span> O2
                            리프팅패키지
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isPaperPlane"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">파트이동:</span> 수납
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </div>
                <div
                  className="C034"
                  onClick={() => handleCustomerClick("김철수", "210044321")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">김철수</p>
                      <p className="T014 isBlue">남성</p>
                      <p className="T014">
                        42<span className="isUnit">세</span>
                      </p>
                      <p className="T014">
                        1<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210044321</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 9:45 시작.
                    </p>
                    <p className="T017 isGreen">진행중</p>
                    <p className="T017">O2 리프팅패키지</p>
                    <p className="T016">
                      01:12:34.56 <span className="isUnit">경과</span>{" "}
                    </p>
                    <p className="T019">
                      -예상:<span className="isBold">1시간 30분</span>
                    </p>
                    <Tooltip text="의사 상세 보기">
                      <div
                        className="C039"
                        onClick={(e) =>
                          handleEmployeeClickFromStatus(
                            "한상호",
                            "hsh000",
                            "원장",
                            e
                          )
                        }
                      >
                        <div className="C040 isMale"></div>
                        <p className="T018">
                          한상호<span className="isUnit">원장</span>
                        </p>
                      </div>
                    </Tooltip>
                  </div>
                  <DraggableScrollContainer
                    className="C041"
                    scrollToEnd={activeIndex === 2}
                  >
                    <div className="C045">
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isRibbon"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">상태 변경</span> 시술시작.
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isSyringe"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">시술 완료:</span> O2
                            리프팅패키지
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isPaperPlane"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">파트이동:</span> 수납
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </div>
                <div
                  className="C034"
                  onClick={() => handleCustomerClick("최수진", "210047654")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">최수진</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        29<span className="isUnit">세</span>
                      </p>
                      <p className="T014 isOldbie">
                        3<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210047654</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 9:30 시작.
                    </p>
                    <p className="T017 isBlue">시술 완료</p>
                    <p className="T017">O2 리프팅패키지</p>
                    <p className="T016">
                      01:12:34 <span className="isUnit">경과</span>{" "}
                    </p>
                    <Tooltip text="의사 상세 보기">
                      <div
                        className="C039"
                        onClick={(e) =>
                          handleEmployeeClickFromStatus(
                            "한상호",
                            "hsh000",
                            "원장",
                            e
                          )
                        }
                      >
                        <div className="C040 isMale"></div>
                        <p className="T018">
                          한상호<span className="isUnit">원장</span>
                        </p>
                      </div>
                    </Tooltip>
                  </div>
                  <DraggableScrollContainer
                    className="C041"
                    scrollToEnd={activeIndex === 2}
                  >
                    <div className="C045">
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isRibbon"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">상태 변경</span> 시술시작.
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isSyringe"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">시술 완료:</span> O2
                            리프팅패키지
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isPaperPlane"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">파트이동:</span> 수납
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </div>
                <div
                  className="C034"
                  onClick={() => handleCustomerClick("이성호", "210049432")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">이성호</p>
                      <p className="T014 isBlue">남성</p>
                      <p className="T014">
                        35<span className="isUnit">세</span>
                      </p>
                      <p className="T014 isOldbie">
                        2<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210049432</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 11:00 시작.
                    </p>
                    <p className="T017">시술 대기</p>
                    <p className="T019">
                      -순번:<span className="isBold isRed">3</span>
                    </p>
                    <p className="T017">O2 리프팅패키지</p>
                    <p className="T016 isGreen">
                      <span className="isBold">11분</span> 대기
                    </p>
                    <p className="T019">
                      -합계:<span className="isBold isYellow">21분</span>
                    </p>
                  </div>
                  <DraggableScrollContainer
                    className="C041"
                    scrollToEnd={activeIndex === 2}
                  >
                    <div className="C045">
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isRibbon"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">상태 변경</span> 시술시작.
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isSyringe"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">시술 완료:</span> O2
                            리프팅패키지
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isPaperPlane"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">파트이동:</span> 수납
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </div>
                <div
                  className="C034"
                  onClick={() => handleCustomerClick("정지영", "210052098")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">정지영</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        28<span className="isUnit">세</span>
                      </p>
                      <p className="T014">
                        1<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210052098</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 10:00 시작.
                    </p>
                    <p className="T017 isGreen">진행중</p>
                    <p className="T017">O2 리프팅패키지</p>
                    <p className="T016">
                      01:12:34.56 <span className="isUnit">경과</span>{" "}
                    </p>
                    <p className="T019">
                      -예상:<span className="isBold">1시간 30분</span>
                    </p>
                    <Tooltip text="의사 상세 보기">
                      <div
                        className="C039"
                        onClick={(e) =>
                          handleEmployeeClickFromStatus(
                            "한상호",
                            "hsh000",
                            "원장",
                            e
                          )
                        }
                      >
                        <div className="C040 isMale"></div>
                        <p className="T018">
                          한상호<span className="isUnit">원장</span>
                        </p>
                      </div>
                    </Tooltip>
                  </div>
                  <DraggableScrollContainer
                    className="C041"
                    scrollToEnd={activeIndex === 2}
                  >
                    <div className="C045">
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isRibbon"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">상태 변경</span> 시술시작.
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isSyringe"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">시술 완료:</span> O2
                            리프팅패키지
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isPaperPlane"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">파트이동:</span> 수납
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </div>
              </ScrollableContainer>
            </div>
            <div
              className={`C031 isPayment ${
                activeIndex === 3
                  ? "isActived"
                  : activeIndex !== null
                  ? "isFolded"
                  : ""
              }`}
            >
              <div className="C032" onClick={(e) => handleC032Click(3, e)}>
                <div className="C036">
                  <div className="C033 isIcon styleSheet isCoin"></div>
                </div>
                <p className="T011">수납</p>
                <TabSelector
                  items={[{ title: "시간순" }, { title: "상태순" }]}
                  multiple={false}
                  value={selectedSortTab}
                  onChange={(selected) =>
                    setSelectedSortTab(selected as number)
                  }
                />
                <div className="C051">
                  <div className="C052 styleSheet isIcon isMini isPin"></div>
                  <p className="T026">고정</p>
                </div>
                <p className="T012">
                  대기: <span className="isValue isBlack">2</span>명 / 완료:{" "}
                  <span className="isValue isBlue">5</span>명
                </p>
                <p className="T020">
                  <span className="isBlack">2</span> /{" "}
                  <span className="isBlue">5</span>
                </p>
              </div>
              <ScrollableContainer>
                <div
                  className="C034"
                  onClick={() => handleCustomerClick("한미영", "210048234")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">한미영</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        33<span className="isUnit">세</span>
                      </p>
                      <p className="T014">
                        1<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210048234</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 10:20 대기.
                    </p>
                    <p className="T017">수납 대기</p>
                    <p className="T016 isGreen">
                      <span className="isBold">18분</span> 대기
                    </p>
                    <p className="T019">
                      -지연:<span className="isBold isRed">52분</span>
                    </p>
                  </div>
                  <DraggableScrollContainer
                    className="C041"
                    scrollToEnd={activeIndex === 3}
                  >
                    <div className="C045">
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isRibbon"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">상태 변경</span> 시술시작.
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isSyringe"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">시술 완료:</span> O2
                            리프팅패키지
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isPaperPlane"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">파트이동:</span> 수납
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </div>
                <div
                  className="C034"
                  onClick={() => handleCustomerClick("윤서아", "210050123")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">윤서아</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        28<span className="isUnit">세</span>
                      </p>
                      <p className="T014 isOldbie">
                        2<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210050123</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 10:45 수납.
                    </p>
                    <p className="T016 isBlue">
                      1,250,000<span className="isUnit">원</span>
                    </p>
                    <p className="T019">
                      할인:<span className="isBold isMint">750,000</span>원
                    </p>
                  </div>
                  <DraggableScrollContainer
                    className="C041"
                    scrollToEnd={activeIndex === 3}
                  >
                    <div className="C045">
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isRibbon"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">상태 변경</span> 시술시작.
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isSyringe"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">시술 완료:</span> O2
                            리프팅패키지
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isPaperPlane"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">파트이동:</span> 수납
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </div>
                <div
                  className="C034"
                  onClick={() => handleCustomerClick("강지훈", "210045678")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">강지훈</p>
                      <p className="T014 isBlue">남성</p>
                      <p className="T014">
                        38<span className="isUnit">세</span>
                      </p>
                      <p className="T014">
                        1<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210045678</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 10:50 수납.
                    </p>
                    <p className="T016 isBlue">
                      3,200,000<span className="isUnit">원</span>
                    </p>
                    <p className="T019">
                      할인:<span className="isBold isMint">800,000</span>원
                    </p>
                  </div>
                  <DraggableScrollContainer
                    className="C041"
                    scrollToEnd={activeIndex === 3}
                  >
                    <div className="C045">
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isRibbon"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">상태 변경</span> 시술시작.
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isSyringe"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">시술 완료:</span> O2
                            리프팅패키지
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isChecked"></div>
                        </div>
                      </div>
                      <div className="C042">
                        <div className="C043 styleSheet isIcon isPaperPlane"></div>
                        <div className="C044">
                          <p className="T021">
                            <span className="isUnit">AM</span> 10:22
                          </p>
                          <p className="T022">
                            <span className="isUnit">파트이동:</span> 수납
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </div>
                <div
                  className="C034"
                  onClick={() => handleCustomerClick("김수진", "210047567")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">김수진</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        30<span className="isUnit">세</span>
                      </p>
                      <p className="T014 isOldbie">
                        2<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210047567</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 11:15 수납.
                    </p>
                    <p className="T016 isBlue">
                      1,500,000<span className="isUnit">원</span>
                    </p>
                    <p className="T019">
                      할인:<span className="isBold isMint">300,000</span>원
                    </p>
                  </div>
                  <div className="C048">
                    <p className="T016">
                      <span className="isUnit">계약금 총액:</span>
                    </p>
                    <p className="T016 isBold">
                      6,500,000<span className="isUnit">원</span>
                    </p>
                    <p className="T016">
                      <span className="isUnit">/ 예약금:</span>
                    </p>
                    <p className="T016">
                      1,200,000<span className="isUnit">원</span>
                    </p>
                    <p className="T016">
                      <span className="isUnit">/ 할인:</span>
                    </p>
                    <p className="T016 isRed">
                      200,000<span className="isUnit">원</span>
                    </p>
                    <p className="T017">
                      <span className="isUnit">수납구분:</span> 지방흡입
                    </p>
                  </div>
                </div>
                <div
                  className="C034"
                  onClick={() => handleCustomerClick("한소영", "210047568")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">한소영</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        29<span className="isUnit">세</span>
                      </p>
                      <p className="T014 isNewbie">
                        1<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210047568</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 11:20 수납.
                    </p>
                    <p className="T016 isBlue">
                      1,200,000<span className="isUnit">원</span>
                    </p>
                    <p className="T019">
                      할인:<span className="isBold isMint">150,000</span>원
                    </p>
                  </div>
                  <div className="C048">
                    <p className="T016">
                      <span className="isUnit">계약금 총액:</span>
                    </p>
                    <p className="T016 isBold">
                      5,000,000<span className="isUnit">원</span>
                    </p>
                    <p className="T016">
                      <span className="isUnit">/ 예약금:</span>
                    </p>
                    <p className="T016">
                      1,000,000<span className="isUnit">원</span>
                    </p>
                    <p className="T016">
                      <span className="isUnit">/ 할인:</span>
                    </p>
                    <p className="T016 isRed">
                      150,000<span className="isUnit">원</span>
                    </p>
                    <p className="T017">
                      <span className="isUnit">수납구분:</span> 리프팅
                    </p>
                  </div>
                </div>
              </ScrollableContainer>
            </div>
          </div>
        </div>
        <CustomerDetailPanel
          isOpen={isCustomerDetailOpen}
          onClose={handleCustomerDetailClose}
          isSmallScreen={isSmallScreen}
          onQuickActionsHoverChange={setIsQuickActionsHovered}
        />
      </section>
      <ReceptionCheckInButton
        isOpen={isCustomerDetailOpen}
        isFolded={isQuickActionsHovered}
      />
    </article>
  );
}
