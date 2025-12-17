"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import ToggleSwitch from "@/components/ToggleSwitch";
import Tooltip from "@/components/Tooltip";
import ScrollableContainer from "@/components/ScrollableContainer";
import ListItem from "@/components/ListItem";
import DraggableScrollContainer from "@/components/DraggableScrollContainer";
import TabSelector from "@/components/TabSelector";
import ExpandableText from "@/components/ExpandableText";
import Aside from "@/components/Aside";
import { useAside } from "@/components/AsideContext";
import DoctorSlidePage from "@/components/DoctorSlidePage";
import EmployeeSlidePage from "@/components/EmployeeSlidePage";
import CounselorSlidePage from "@/components/CounselorSlidePage";
import CustomerDetailPanel from "@/components/CustomerDetailPanel";
import ReceptionCheckInButton from "@/components/ReceptionCheckInButton";
import SlidePage from "@/components/SlidePage";
import ReferenceMessage from "@/components/ReferenceMessage";
import EmployeeBadge from "@/components/EmployeeBadge";

function MainContent() {
  const { navigateToPage } = useAside();

  const handleEmployeeClick = (
    employeeName: string,
    employeeId: string,
    role: string,
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("직원 클릭:", employeeName, employeeId, role);
    try {
      // 역할에 따라 적절한 컴포넌트 선택
      let SlidePageComponent = EmployeeSlidePage;
      if (role.includes("원장")) {
        SlidePageComponent = DoctorSlidePage;
      } else if (role.includes("상담사")) {
        SlidePageComponent = CounselorSlidePage;
      }

      // 역할 기반으로 pageId 생성 (동일 역할은 같은 페이지에서 데이터만 리로드)
      let roleCategory = "employee";
      if (role.includes("상담사")) {
        roleCategory = "counselor";
      } else if (role.includes("원장")) {
        roleCategory = "doctor";
      } else if (role.includes("과장")) {
        roleCategory = "manager";
      } else if (role.includes("대리")) {
        roleCategory = "assistant";
      } else if (role.includes("팀장")) {
        roleCategory = "team-leader";
      } else if (role.includes("주임")) {
        roleCategory = "clerk";
      }

      // 역할에 따라 title 결정
      let pageTitle = "업무 일정 보기";
      if (role.includes("원장")) {
        pageTitle = "원장 일정 보기";
      } else if (role.includes("상담사")) {
        pageTitle = "상담 일정 보기";
      }

      // 동일 역할 카테고리는 같은 pageId 사용 (employeeId 무시)
      navigateToPage(
        roleCategory,
        <SlidePageComponent
          title={pageTitle}
          employeeName={employeeName}
          employeeRole={role}
          employeeId={employeeId}
        />
      );
    } catch (error) {
      console.error("navigateToPage 오류:", error);
    }
  };

  const handleCustomerClick = (
    customerName: string,
    customerId: string,
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("고객 클릭:", customerName, customerId);
    // 모든 고객은 동일한 customer 카테고리로 묶어서 누적 없이 데이터만 리로드
    navigateToPage(
      "customer",
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "var(--background-green)",
        }}
      ></div>
    );
  };

  return (
    <div className="C075">
      <div className="C076">
        <div className="C077">
          <p className="T036">
            <span className="isUnit">AM</span> 10:15
          </p>
          <Tooltip text="업무 일지 보기">
            <div
              className="C088"
              onClick={(e) =>
                handleEmployeeClick("김민수", "kms002", "과장", e)
              }
            >
              <p className="T037">
                김민수<span className="isUnit">과장</span>
              </p>
              <p className="T038">(kms002)</p>
            </div>
          </Tooltip>
        </div>
        <div className="C078">
          <div className="C080">
            <div className="C081 styleSheet isIcon isMini isChecked"></div>
          </div>
          <div className="C082 isMale"></div>
        </div>
        <Tooltip text="고객 상세 정보">
          <div
            className="C079"
            onClick={(e) => handleCustomerClick("박지영", "210048921", e)}
          >
            <div className="C087">
              <div className="C084">
                <div className="C033 isIcon styleSheet isPaperPlane"></div>
              </div>
              <div className="C083">
                <p className="T039">
                  <span className="isBold">파트이동</span>{" "}
                </p>
                <div className="C086">
                  <p className="T041">박지영</p>
                  <p className="T042 isRed">여성</p>
                  <p className="T042">
                    32<span className="isUnit">세</span>
                  </p>
                  <p className="T042">
                    1<span className="isUnit">기</span>
                  </p>
                  <p className="T016 isGrey">210048921</p>
                </div>
              </div>
            </div>
            <div className="C085">
              <div className="C036">
                <div className="C033 isIcon styleSheet isReception"></div>
              </div>
              <div className="C080 isFitted">
                <div className="C081 styleSheet isIcon isMini isArrow"></div>
              </div>
              <div className="C036">
                <div className="C033 isIcon styleSheet isSurgery "></div>
              </div>
              <p className="T043">
                <span className="isBold">수술파트</span>
                <span className="isGrey">로 고객 이관</span>
              </p>
            </div>
          </div>
        </Tooltip>
      </div>
      <div className="C076">
        <div className="C077">
          <p className="T036">
            <span className="isUnit">AM</span> 11:32
          </p>
          <Tooltip text="업무 일지 보기">
            <div
              className="C088"
              onClick={(e) =>
                handleEmployeeClick("이수진", "lsj003", "대리", e)
              }
            >
              <p className="T037">
                이수진<span className="isUnit">대리</span>
              </p>
              <p className="T038">(lsj003)</p>
            </div>
          </Tooltip>
        </div>
        <div className="C078">
          <div className="C080">
            <div className="C081 styleSheet isIcon isMini isMegaphone"></div>
          </div>
          <div className="C082 isFemale"></div>
        </div>
        <div className="C079 isMine isComment">
          <div className="C087">
            <div className="C084">
              <div className="C033 isIcon styleSheet isReception"></div>
            </div>
            <div className="C083">
              <p className="T039">
                <span className="isBold">원무파트</span>{" "}
                <span className="isGrey">- 전체 전달사항</span>
              </p>
              <ExpandableText
                text="오늘 오후 2시부터 시스템 점검이 예정되어 있습니다. 업무에 참고 부탁드립니다. 점검 시간 동안 일시적으로 접속이 불가능할 수 있으며, 긴급한 업무는 사전에 처리해 주시기 바랍니다. 점검이 완료되면 자동으로 알림이 발송될 예정입니다. 추가 문의사항이 있으시면 원무팀으로 연락 부탁드립니다."
                maxLines={4}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="C076">
        <div className="C077">
          <p className="T036">
            <span className="isUnit">PM</span> 02:18
          </p>
          <Tooltip text="업무 일지 보기">
            <div
              className="C088"
              onClick={(e) =>
                handleEmployeeClick("정태영", "jty004", "주임", e)
              }
            >
              <p className="T037">
                정태영<span className="isUnit">주임</span>
              </p>
              <p className="T038">(jty004)</p>
            </div>
          </Tooltip>
        </div>
        <div className="C078">
          <div className="C080">
            <div className="C081 styleSheet isIcon isMini isChecked"></div>
          </div>
          <div className="C082 isMale"></div>
        </div>
        <Tooltip text="고객 상세 정보">
          <div
            className="C079"
            onClick={(e) => handleCustomerClick("최민호", "210046587", e)}
          >
            <div className="C087">
              <div className="C084">
                <div className="C033 isIcon styleSheet isExit"></div>
              </div>
              <div className="C083">
                <p className="T039">
                  <span className="isBold">귀가 처리 완료</span>
                </p>
                <div className="C086">
                  <p className="T041">최민호</p>
                  <p className="T042 isBlue">남성</p>
                  <p className="T042">
                    45<span className="isUnit">세</span>
                  </p>
                  <p className="T042 isOldbie">
                    3<span className="isUnit">기</span>
                  </p>
                  <p className="T016 isGrey">210046587</p>
                </div>
              </div>
            </div>
            <div className="C085">
              <p className="T016">
                <span className="isUnit">수납액:</span>
              </p>
              <p className="T016 isBold isBlue">
                3,200,000<span className="isUnit">원</span>
              </p>
              <p className="T016">
                <span className="isUnit">/ 미수금:</span>
              </p>
              <p className="T016 isBold isMint">
                800,000<span className="isUnit">원</span>
              </p>
              <p className="T016">
                <span className="isUnit">/ 계약금 총액:</span>
              </p>
              <p className="T016 isBold">
                4,000,000<span className="isUnit">원</span>
              </p>
            </div>
          </div>
        </Tooltip>
      </div>
      <div className="C076">
        <div className="C077">
          <p className="T036">
            <span className="isUnit">PM</span> 01:45
          </p>
          <Tooltip text="업무 일지 보기">
            <div
              className="C088"
              onClick={(e) =>
                handleEmployeeClick("안경희", "akh001", "팀장", e)
              }
            >
              <p className="T037">
                안경희<span className="isUnit">팀장</span>
              </p>
              <p className="T038">(akh001)</p>
            </div>
          </Tooltip>
        </div>
        <div className="C078">
          <div className="C080">
            <div className="C081 styleSheet isIcon isMini isChecked"></div>
          </div>
          <div className="C082 isFemale"></div>
        </div>
        <Tooltip text="고객 상세 정보">
          <div
            className="C079"
            onClick={(e) => handleCustomerClick("한소영", "210048901", e)}
          >
            <div className="C087">
              <div className="C084">
                <div className="C033 isIcon styleSheet isCheckIn"></div>
              </div>
              <div className="C083">
                <p className="T039">
                  <span className="isBold">접수완료</span>{" "}
                  <span className="isGrey">- Vital 입력완료</span>
                </p>
                <div className="C086">
                  <p className="T041">한소영</p>
                  <p className="T042 isRed">여성</p>
                  <p className="T042">
                    33<span className="isUnit">세</span>
                  </p>
                  <p className="T042">
                    1<span className="isUnit">기</span>
                  </p>
                  <p className="T016 isGrey">210048901</p>
                </div>
              </div>
            </div>
          </div>
        </Tooltip>
      </div>
      <div className="C076">
        <div className="C077">
          <p className="T036">
            <span className="isUnit">PM</span> 12:28
          </p>
          <Tooltip text="원장 일지 보기">
            <div
              className="C088"
              onClick={(e) =>
                handleEmployeeClick("홍성훈", "hsh000", "원장", e)
              }
            >
              <p className="T037">
                홍성훈<span className="isUnit">원장</span>
              </p>
              <p className="T038">(hsh000)</p>
            </div>
          </Tooltip>
        </div>
        <div className="C078">
          <div className="C080">
            <div className="C081 styleSheet isIcon isMini isChecked"></div>
          </div>
          <div className="C082 isMale"></div>
        </div>
        <Tooltip text="고객 상세 정보">
          <div
            className="C079"
            onClick={(e) => handleCustomerClick("조예린", "210051567", e)}
          >
            <div className="C087">
              <div className="C084">
                <div className="C033 isIcon styleSheet isPaperPlane"></div>
              </div>
              <div className="C083">
                <p className="T039">
                  <span className="isBold">파트이동</span>{" "}
                </p>
                <div className="C086">
                  <p className="T041">조예린</p>
                  <p className="T042 isRed">여성</p>
                  <p className="T042">
                    25<span className="isUnit">세</span>
                  </p>
                  <p className="T042 isOldbie">
                    2<span className="isUnit">기</span>
                  </p>
                  <p className="T016 isGrey">210051567</p>
                </div>
              </div>
            </div>
            <div className="C085">
              <div className="C036">
                <div className="C033 isIcon styleSheet isClinic"></div>
              </div>
              <div className="C080 isFitted">
                <div className="C081 styleSheet isIcon isMini isArrow"></div>
              </div>
              <div className="C036">
                <div className="C033 isIcon styleSheet isReception"></div>
              </div>
              <p className="T043">
                <span className="isBold">진료파트</span>
                <span className="isGrey">에서 이관받음</span>
              </p>
            </div>
          </div>
        </Tooltip>
      </div>
      <div className="C076">
        <div className="C077">
          <p className="T036">
            <span className="isUnit">PM</span> 03:55
          </p>
          <Tooltip text="업무 일지 보기">
            <div
              className="C088"
              onClick={(e) =>
                handleEmployeeClick("박미영", "pmy005", "과장", e)
              }
            >
              <p className="T037">
                박미영<span className="isUnit">과장</span>
              </p>
              <p className="T038">(pmy005)</p>
            </div>
          </Tooltip>
        </div>
        <div className="C078">
          <div className="C080">
            <div className="C081 styleSheet isIcon isMini isMegaphone"></div>
          </div>
          <div className="C082 isFemale"></div>
        </div>
        <div className="C079 isComment">
          <div className="C087">
            <div className="C084">
              <div className="C033 isIcon styleSheet isReception"></div>
            </div>
            <div className="C083">
              <p className="T039">
                <span className="isBold">원무파트</span>{" "}
                <span className="isGrey">- 전체 전달사항</span>
              </p>
              <ExpandableText
                text="내일 오전 9시 전체 파트 미팅이 예정되어 있습니다. 필참 부탁드립니다. 미팅에서는 이번 달 업무 현황과 다음 달 계획에 대해 논의할 예정입니다. 각 파트별 발표 자료는 오늘 오후 5시까지 제출해 주시기 바랍니다. 미팅 장소는 본관 3층 대회의실이며, 회의록은 미팅 후 공유될 예정입니다."
                maxLines={4}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="C076">
        <div className="C077">
          <p className="T036">
            <span className="isUnit">PM</span> 04:12
          </p>
          <Tooltip text="업무 일지 보기">
            <div
              className="C088"
              onClick={(e) =>
                handleEmployeeClick("김유정", "kyj006", "대리", e)
              }
            >
              <p className="T037">
                김유정<span className="isUnit">대리</span>
              </p>
              <p className="T038">(kyj006)</p>
            </div>
          </Tooltip>
        </div>
        <div className="C078">
          <div className="C080">
            <div className="C081 styleSheet isIcon isMini isChecked"></div>
          </div>
          <div className="C082 isFemale"></div>
        </div>
        <Tooltip text="고객 상세 정보">
          <div
            className="C079"
            onClick={(e) => handleCustomerClick("윤서아", "210053210", e)}
          >
            <div className="C087">
              <div className="C084">
                <div className="C033 isIcon styleSheet isCoin"></div>
              </div>
              <div className="C083">
                <p className="T039">
                  <span className="isBold">수납완료</span>
                </p>
                <div className="C086">
                  <p className="T041">윤서아</p>
                  <p className="T042 isRed">여성</p>
                  <p className="T042">
                    26<span className="isUnit">세</span>
                  </p>
                  <p className="T042">
                    1<span className="isUnit">기</span>
                  </p>
                  <p className="T016 isGrey">210053210</p>
                </div>
              </div>
            </div>
            <div className="C085">
              <p className="T016">
                <span className="isUnit">수납액:</span>
              </p>
              <p className="T016 isBold isBlue">
                2,500,000<span className="isUnit">원</span>
              </p>
              <p className="T016">
                <span className="isUnit">/ 미수금:</span>
              </p>
              <p className="T016 isBold isMint">
                500,000<span className="isUnit">원</span>
              </p>
              <p className="T016">
                <span className="isUnit">/ 계약금 총액:</span>
              </p>
              <p className="T016 isBold">
                3,000,000<span className="isUnit">원</span>
              </p>
            </div>
          </div>
        </Tooltip>
      </div>
      <div className="C076">
        <div className="C077">
          <p className="T036">
            <span className="isUnit">AM</span> 09:52
          </p>
          <Tooltip text="업무 일지 보기">
            <div
              className="C088"
              onClick={(e) =>
                handleEmployeeClick("이서연", "lsy007", "주임", e)
              }
            >
              <p className="T037">
                이서연<span className="isUnit">주임</span>
              </p>
              <p className="T038">(lsy007)</p>
            </div>
          </Tooltip>
        </div>
        <div className="C078">
          <div className="C080">
            <div className="C081 styleSheet isIcon isMini isChecked"></div>
          </div>
          <div className="C082 isFemale"></div>
        </div>
        <Tooltip text="고객 상세 정보">
          <div
            className="C079"
            onClick={(e) => handleCustomerClick("송예준", "210046789", e)}
          >
            <div className="C087">
              <div className="C084">
                <div className="C033 isIcon styleSheet isHourglass"></div>
              </div>
              <div className="C083">
                <p className="T039">
                  <span className="isBold">보류상태</span>
                  <span className="isGrey">로 전환</span>
                </p>
                <div className="C086">
                  <p className="T041">송예준</p>
                  <p className="T042 isBlue">남성</p>
                  <p className="T042">
                    38<span className="isUnit">세</span>
                  </p>
                  <p className="T042">
                    1<span className="isUnit">기</span>
                  </p>
                  <p className="T016 isGrey">210046789</p>
                </div>
              </div>
            </div>
            <div className="C085">
              <div className="C036">
                <div className="C033 isIcon styleSheet isCounseling"></div>
              </div>
              <div className="C080 isFitted">
                <div className="C081 styleSheet isIcon isMini isArrow"></div>
              </div>
              <div className="C036">
                <div className="C033 isIcon styleSheet isReception"></div>
              </div>
              <p className="T043">
                <span className="isBold">상담파트</span>
                <span className="isGrey">에서 이관받음</span>
              </p>
            </div>
          </div>
        </Tooltip>
      </div>
    </div>
  );
}

export default function ReceptionPage() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedTabs, setSelectedTabs] = useState<number[]>([0, 1, 2]); // 예약 탭 (multiple)
  const [selectedPendingTabs, setSelectedPendingTabs] = useState<number[]>([
    0, 1,
  ]); // 대기 탭 (multiple)
  const [selectedSortTab, setSelectedSortTab] = useState<number>(0); // 정렬 탭 (single)
  const [isQuickActionsHovered, setIsQuickActionsHovered] = useState(false);

  const handleC032Click = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <main className="C007">
        <PageHeader title="원무" />
        <Aside mainContent={() => <MainContent />}>
          <CustomerStatusSection
            handleC032Click={handleC032Click}
            isSmallScreen={isSmallScreen}
            setIsSmallScreen={setIsSmallScreen}
            activeIndex={activeIndex}
            selectedTabs={selectedTabs}
            setSelectedTabs={setSelectedTabs}
            selectedPendingTabs={selectedPendingTabs}
            setSelectedPendingTabs={setSelectedPendingTabs}
            selectedSortTab={selectedSortTab}
            setSelectedSortTab={setSelectedSortTab}
            isQuickActionsHovered={isQuickActionsHovered}
            setIsQuickActionsHovered={setIsQuickActionsHovered}
          />
        </Aside>
      </main>
      <Sidebar />
    </>
  );
}

function CustomerStatusSection({
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
}: {
  handleC032Click: (index: number, e: React.MouseEvent) => void;
  isSmallScreen: boolean;
  setIsSmallScreen: (value: boolean) => void;
  activeIndex: number | null;
  selectedTabs: number[];
  setSelectedTabs: (value: number[]) => void;
  selectedPendingTabs: number[];
  setSelectedPendingTabs: (value: number[]) => void;
  selectedSortTab: number;
  setSelectedSortTab: (value: number) => void;
  isQuickActionsHovered: boolean;
  setIsQuickActionsHovered: (value: boolean) => void;
}) {
  const { navigateToPage, resetToMain } = useAside();
  const [isCustomerDetailOpen, setIsCustomerDetailOpen] = useState(false);
  // TODO: 섹션 토글, C106/C107 스크롤 동기화가 다시 필요해지면 여기서 상태/refs를 복원

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
              <span className="isUnit">To:</span> 원무
            </p>
          </div>
          <p className="T035">
            <span className="isUnit">참조사항 입력</span>
          </p>
          <div className="C071">
            <div className="C072 styleSheet isIcon isWrite"></div>
          </div>
        </div>
        <ReferenceMessage
          iconClass="isNote"
          from={{ department: "원무", type: "일반" }}
          author={{
            name: "이수진",
            role: "상담사",
            avatarClass: "isMale",
            tooltipText: "이수진 상담사",
            employeeId: "lsj003",
          }}
          content="오늘 오후 2시부터 시스템 점검이 예정되어 있습니다. 업무에 참고 부탁드립니다. 점검 시간 동안 일시적으로 접속이 불가능할 수 있으며, 긴급한 업무는 사전에 처리해 주시기 바랍니다. 점검이 완료되면 자동으로 알림이 발송될 예정입니다. 추가 문의사항이 있으시면 원무팀으로 연락 부탁드립니다."
        />
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
    e.stopPropagation(); // ListItem 클릭 이벤트와 충돌 방지
    console.log("고객현황 직원 클릭:", employeeName, employeeId, role);
    // 역할에 따라 적절한 컴포넌트 선택
    let SlidePageComponent = EmployeeSlidePage;
    if (role.includes("원장")) {
      SlidePageComponent = DoctorSlidePage;
    } else if (role.includes("상담사")) {
      SlidePageComponent = CounselorSlidePage;
    }

    // [업무 일정 보기] 클릭 시 분류: 원장, 상담사, 나머지 직원
    let roleCategory = "employee"; // 나머지 직원 (과장, 대리, 팀장, 주임 등)
    if (role.includes("원장")) {
      roleCategory = "doctor";
    } else if (role.includes("상담사")) {
      roleCategory = "counselor";
    }

    // 역할에 따라 title 결정
    let pageTitle = "업무 일정 보기";
    if (role.includes("원장")) {
      pageTitle = "원장 일정 보기";
    } else if (role.includes("상담사")) {
      pageTitle = "상담 일정 보기";
    }

    // 동일 역할 카테고리는 같은 pageId 사용 (employeeId 무시)
    navigateToPage(
      roleCategory,
      <SlidePageComponent
        title={pageTitle}
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
                <ListItem
                  onClick={() => handleCustomerClick("이서연", "210051234")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">이서연</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        28<span className="isUnit">세</span>
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
                      tooltipText="상담 일지 보기"
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
                </ListItem>
                <ListItem
                  onClick={() => handleCustomerClick("박민준", "210048765")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">박민준</p>
                      <p className="T014 isBlue">남성</p>
                      <p className="T014">
                        35<span className="isUnit">세</span>
                      </p>
                      <p className="T014">
                        1<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210048765</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 11:00 예정.
                    </p>
                    <p className="T017">재진 상담</p>
                    <Tooltip text="상담 일지 보기">
                      <div
                        className="C039"
                        onClick={(e) =>
                          handleEmployeeClickFromStatus(
                            "이수진",
                            "lsj003",
                            "상담사",
                            e
                          )
                        }
                      >
                        <div className="C040 isMale"></div>
                        <p className="T018">
                          이수진<span className="isUnit">상담사</span>
                        </p>
                      </div>
                    </Tooltip>
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
                </ListItem>
                <ListItem
                  onClick={() => handleCustomerClick("최지우", "210052341")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">최지우</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        24<span className="isUnit">세</span>
                      </p>
                      <p className="T014 isOldbie">
                        3<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210052341</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 11:15 예정.
                    </p>
                    <p className="T017">시술 신환 상담</p>
                    <EmployeeBadge
                      name="김유정"
                      role="상담사"
                      employeeId="kyj006"
                      tooltipText="상담 일지 보기"
                    />
                    <p className="T019 isGreen">5분 후 도착예정.</p>
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
                </ListItem>
                <ListItem
                  onClick={() => handleCustomerClick("정하늘", "210049876")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">정하늘</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        29<span className="isUnit">세</span>
                      </p>
                      <p className="T014">
                        1<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210049876</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 11:30 예정.
                    </p>
                    <p className="T017">시술 신환 상담</p>
                    <Tooltip text="상담 일지 보기">
                      <div
                        className="C039"
                        onClick={(e) =>
                          handleEmployeeClickFromStatus(
                            "박미영",
                            "pmy005",
                            "상담사",
                            e
                          )
                        }
                      >
                        <div className="C040"></div>
                        <p className="T018">
                          박미영<span className="isUnit">상담사</span>
                        </p>
                      </div>
                    </Tooltip>
                    <p className="T019 isGreen">10분 후 도착예정.</p>
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
                </ListItem>
                <ListItem
                  onClick={() => handleCustomerClick("김도현", "210045678")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">김도현</p>
                      <p className="T014 isBlue">남성</p>
                      <p className="T014">
                        41<span className="isUnit">세</span>
                      </p>
                      <p className="T014 isOldbie">
                        2<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210045678</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">PM</span> 12:00 예정.
                    </p>
                    <p className="T017">재진 상담</p>
                    <EmployeeBadge
                      name="이수진"
                      role="상담사"
                      employeeId="lsj003"
                      avatarClass="isMale"
                      tooltipText="상담 일지 보기"
                    />
                    <p className="T019">30분 후 도착예정.</p>
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
                </ListItem>
                <ListItem
                  onClick={() =>
                    handleCustomerClick("황보제갈수빈", "210047938")
                  }
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">황보제갈수빈</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        32<span className="isUnit">세</span>
                      </p>
                      <p className="T014">
                        1<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210047938</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">PM</span> 12:30 예정.
                    </p>
                    <p className="T017">시술 신환 상담</p>
                    <EmployeeBadge
                      name="김유정"
                      role="상담사"
                      employeeId="kyj006"
                      tooltipText="상담 일지 보기"
                    />
                    <p className="T019">50분 후 도착예정.</p>
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
                </ListItem>
                <ListItem
                  onClick={() => handleCustomerClick("윤서아", "210053210")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">윤서아</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        26<span className="isUnit">세</span>
                      </p>
                      <p className="T014">
                        1<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210053210</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">PM</span> 1:00 예정.
                    </p>
                    <p className="T017">시술 신환 상담</p>
                    <EmployeeBadge
                      name="박미영"
                      role="상담사"
                      employeeId="pmy005"
                      tooltipText="상담 일지 보기"
                    />
                    <p className="T019">1시간30분 후 도착예정.</p>
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
                </ListItem>
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
                  items={[{ title: "접수고객" }, { title: "보류고객" }]}
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
                <ListItem
                  onClick={() => handleCustomerClick("오수빈", "210049123")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">오수빈</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        31<span className="isUnit">세</span>
                      </p>
                      <p className="T014 isOldbie">
                        2<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210049123</p>
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
                            <span className="isUnit">상태변경:</span> 시술시작.
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
                            <span className="isUnit">시술완료:</span> O2
                            고압산소
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
                            <span className="isUnit">파트이동:</span> 보류
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </ListItem>
                <ListItem
                  onClick={() => handleCustomerClick("강민서", "210050456")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">강민서</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        27<span className="isUnit">세</span>
                      </p>
                      <p className="T014">
                        1<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210050456</p>
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
                            <span className="isUnit">상태변경:</span> 시술시작.
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
                            <span className="isUnit">시술완료:</span> O2
                            고압산소
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
                            <span className="isUnit">파트이동:</span> 보류
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </ListItem>
                <ListItem
                  onClick={() => handleCustomerClick("송예준", "210046789")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">송예준</p>
                      <p className="T014 isBlue">남성</p>
                      <p className="T014">
                        38<span className="isUnit">세</span>
                      </p>
                      <p className="T014">
                        1<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210046789</p>
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
                            <span className="isUnit">상태변경:</span> 시술시작.
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
                            <span className="isUnit">시술완료:</span> O2
                            고압산소
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
                            <span className="isUnit">파트이동:</span> 보류
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </ListItem>
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
                  대기: <span className="isValue isBlack">4</span>명 / 호출:{" "}
                  <span className="isValue isYellow">2</span>명 / 진행:{" "}
                  <span className="isValue isGreen">2</span>명
                </p>
                <p className="T020">
                  <span className="isBlack">4</span> /{" "}
                  <span className="isYellow">2</span> /{" "}
                  <span className="isGreen">2</span>
                </p>
              </div>
              <ScrollableContainer>
                <ListItem
                  onClick={() => handleCustomerClick("한소영", "210048901")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">한소영</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        33<span className="isUnit">세</span>
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
                            <span className="isUnit">상태변경:</span> 시술시작.
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
                            <span className="isUnit">시술완료:</span> O2
                            고압산소
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
                            <span className="isUnit">파트이동:</span> 보류
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </ListItem>
                <ListItem
                  onClick={() => handleCustomerClick("조예린", "210051567")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">조예린</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        25<span className="isUnit">세</span>
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
                    <p className="T017">O2 고압산소</p>
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
                            <span className="isUnit">상태변경:</span> 시술시작.
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
                            <span className="isUnit">시술완료:</span> O2
                            고압산소
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
                            <span className="isUnit">파트이동:</span> 보류
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </ListItem>
                <ListItem
                  onClick={() => handleCustomerClick("임지훈", "210044321")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">임지훈</p>
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
                    <p className="T017">O2 고압산소</p>
                    <p className="T016">
                      01:12:34.56 <span className="isUnit">경과</span>{" "}
                    </p>
                    <p className="T019">
                      -예상:<span className="isBold">1시간 30분</span>
                    </p>
                    <Tooltip text="원장 일지 보기">
                      <div
                        className="C039"
                        onClick={(e) =>
                          handleEmployeeClickFromStatus(
                            "홍성훈",
                            "hsh000",
                            "원장",
                            e
                          )
                        }
                      >
                        <div className="C040 isMale"></div>
                        <p className="T018">
                          홍성훈<span className="isUnit">원장</span>
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
                            <span className="isUnit">상태변경:</span> 시술시작.
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
                            <span className="isUnit">시술완료:</span> O2
                            고압산소
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
                            <span className="isUnit">파트이동:</span> 보류
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </ListItem>
                <ListItem
                  onClick={() => handleCustomerClick("배수진", "210047654")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">배수진</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        30<span className="isUnit">세</span>
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
                    <p className="T017">O2 고압산소</p>
                    <p className="T016">
                      01:12:34 <span className="isUnit">경과</span>{" "}
                    </p>
                    <Tooltip text="원장 일지 보기">
                      <div
                        className="C039"
                        onClick={(e) =>
                          handleEmployeeClickFromStatus(
                            "홍성훈",
                            "hsh000",
                            "원장",
                            e
                          )
                        }
                      >
                        <div className="C040 isMale"></div>
                        <p className="T018">
                          홍성훈<span className="isUnit">원장</span>
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
                            <span className="isUnit">상태변경:</span> 시술시작.
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
                            <span className="isUnit">시술완료:</span> O2
                            고압산소
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
                            <span className="isUnit">파트이동:</span> 보류
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </ListItem>
                <ListItem
                  onClick={() => handleCustomerClick("서민재", "210049432")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">서민재</p>
                      <p className="T014 isBlue">남성</p>
                      <p className="T014">
                        36<span className="isUnit">세</span>
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
                    <p className="T017">O2 고압산소</p>
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
                            <span className="isUnit">상태변경:</span> 시술시작.
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
                            <span className="isUnit">시술완료:</span> O2
                            고압산소
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
                            <span className="isUnit">파트이동:</span> 보류
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </ListItem>
                <ListItem
                  onClick={() => handleCustomerClick("노다혜", "210052098")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">노다혜</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        29<span className="isUnit">세</span>
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
                    <p className="T017">O2 고압산소</p>
                    <p className="T016">
                      01:12:34.56 <span className="isUnit">경과</span>{" "}
                    </p>
                    <p className="T019">
                      -예상:<span className="isBold">1시간 30분</span>
                    </p>
                    <Tooltip text="원장 일지 보기">
                      <div
                        className="C039"
                        onClick={(e) =>
                          handleEmployeeClickFromStatus(
                            "홍성훈",
                            "hsh000",
                            "원장",
                            e
                          )
                        }
                      >
                        <div className="C040 isMale"></div>
                        <p className="T018">
                          홍성훈<span className="isUnit">원장</span>
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
                            <span className="isUnit">상태변경:</span> 시술시작.
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
                            <span className="isUnit">시술완료:</span> O2
                            고압산소
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
                            <span className="isUnit">파트이동:</span> 보류
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </ListItem>
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
                <ListItem
                  onClick={() => handleCustomerClick("유하은", "210048234")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">유하은</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        34<span className="isUnit">세</span>
                      </p>
                      <p className="T014">
                        1<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210048234</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 10:20 이관.
                    </p>
                    <p className="T017">수납 대기</p>
                    <p className="T016 isGreen">
                      <span className="isBold">18분</span> 대기
                    </p>
                    <p className="T019">
                      -합계:<span className="isBold isRed">52분</span>
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
                            <span className="isUnit">상태변경:</span> 시술시작.
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
                            <span className="isUnit">시술완료:</span> O2
                            고압산소
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
                            <span className="isUnit">파트이동:</span> 보류
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </ListItem>
                <ListItem
                  onClick={() => handleCustomerClick("안지영", "210050123")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">안지영</p>
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
                      미수:<span className="isBold isMint">750,000</span>원
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
                            <span className="isUnit">상태변경:</span> 시술시작.
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
                            <span className="isUnit">시술완료:</span> O2
                            고압산소
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
                            <span className="isUnit">파트이동:</span> 보류
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </ListItem>
                <ListItem
                  onClick={() => handleCustomerClick("홍준서", "210045678")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">홍준서</p>
                      <p className="T014 isBlue">남성</p>
                      <p className="T014">
                        39<span className="isUnit">세</span>
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
                      2,800,000<span className="isUnit">원</span>
                    </p>
                    <p className="T019">
                      미수:<span className="isBold isMint">1,200,000</span>원
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
                            <span className="isUnit">상태변경:</span> 시술시작.
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
                            <span className="isUnit">시술완료:</span> O2
                            고압산소
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
                            <span className="isUnit">파트이동:</span> 보류
                          </p>
                        </div>
                        <div className="C046">
                          <div className="C047 styleSheet isIcon isMini isMyLocation"></div>
                        </div>
                      </div>
                    </div>
                  </DraggableScrollContainer>
                </ListItem>
                <ListItem
                  onClick={() => handleCustomerClick("전미나", "210047567")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">전미나</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        31<span className="isUnit">세</span>
                      </p>
                      <p className="T014 isOldbie">
                        3<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210047567</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 11:10 귀가.
                    </p>
                    <p className="T016 isBlue">
                      8,500,000<span className="isUnit">원</span>
                    </p>
                    <p className="T019">
                      미수:<span className="isBold isMint">0</span>원
                    </p>
                  </div>
                  <div className="C048">
                    <p className="T016">
                      <span className="isUnit">계약금 총액:</span>
                    </p>
                    <p className="T016 isBold">
                      8,500,000<span className="isUnit">원</span>
                    </p>
                    <p className="T016">
                      <span className="isUnit">/ 예약금:</span>
                    </p>
                    <p className="T016">
                      1,500,000<span className="isUnit">원</span>
                    </p>
                    <p className="T016">
                      <span className="isUnit">/ 할인:</span>
                    </p>
                    <p className="T016 isRed">
                      300,000<span className="isUnit">원</span>
                    </p>
                    <p className="T017">
                      <span className="isUnit">수납구분:</span> 지방흡입
                    </p>
                  </div>
                </ListItem>
                <ListItem
                  onClick={() => handleCustomerClick("장우진", "210043890")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">장우진</p>
                      <p className="T014 isBlue">남성</p>
                      <p className="T014">
                        44<span className="isUnit">세</span>
                      </p>
                      <p className="T014 isOldbie">
                        2<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210043890</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 11:20 귀가.
                    </p>
                    <p className="T016 isBlue">
                      3,200,000<span className="isUnit">원</span>
                    </p>
                    <p className="T019">
                      미수:<span className="isBold isMint">800,000</span>원
                    </p>
                  </div>
                  <div className="C048">
                    <p className="T016">
                      <span className="isUnit">계약금 총액:</span>
                    </p>
                    <p className="T016 isBold">
                      4,000,000<span className="isUnit">원</span>
                    </p>
                    <p className="T016">
                      <span className="isUnit">/ 예약금:</span>
                    </p>
                    <p className="T016">
                      800,000<span className="isUnit">원</span>
                    </p>
                    <p className="T016">
                      <span className="isUnit">/ 할인:</span>
                    </p>
                    <p className="T016 isRed">
                      150,000<span className="isUnit">원</span>
                    </p>
                    <p className="T017">
                      <span className="isUnit">수납구분:</span> 리프팅 시술
                    </p>
                  </div>
                </ListItem>
                <ListItem
                  onClick={() => handleCustomerClick("문서아", "210052345")}
                >
                  <Tooltip text="고객 상세 정보">
                    <div className="C035">
                      <p className="T013">문서아</p>
                      <p className="T014 isRed">여성</p>
                      <p className="T014">
                        27<span className="isUnit">세</span>
                      </p>
                      <p className="T014">
                        1<span className="isUnit">기</span>
                      </p>
                      <p className="T015">210052345</p>
                    </div>
                  </Tooltip>
                  <div className="C037">
                    <p className="T016">
                      <span className="isUnit">AM</span> 11:25 귀가.
                    </p>
                    <p className="T016 isBlue">
                      1,850,000<span className="isUnit">원</span>
                    </p>
                    <p className="T019">
                      미수:<span className="isBold isMint">0</span>원
                    </p>
                  </div>
                  <div className="C048">
                    <p className="T016">
                      <span className="isUnit">계약금 총액:</span>
                    </p>
                    <p className="T016 isBold">
                      1,850,000<span className="isUnit">원</span>
                    </p>
                    <p className="T016">
                      <span className="isUnit">/ 예약금:</span>
                    </p>
                    <p className="T016">
                      300,000<span className="isUnit">원</span>
                    </p>
                    <p className="T016">
                      <span className="isUnit">/ 할인:</span>
                    </p>
                    <p className="T016 isRed">
                      80,000<span className="isUnit">원</span>
                    </p>
                    <p className="T017">
                      <span className="isUnit">수납구분:</span> 보톡스/필러
                    </p>
                  </div>
                </ListItem>
              </ScrollableContainer>
            </div>
          </div>
        </div>
        <CustomerDetailPanel
          isOpen={isCustomerDetailOpen}
          onClose={handleCustomerDetailClose}
          isSmallScreen={isSmallScreen}
          onQuickActionsHoverChange={setIsQuickActionsHovered}
        ></CustomerDetailPanel>
      </section>
      <ReceptionCheckInButton
        isOpen={isCustomerDetailOpen}
        isFolded={isQuickActionsHovered}
      />
    </article>
  );
}
