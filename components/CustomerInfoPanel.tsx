"use client";

import { useRef, useState } from "react";
import ScrollableContainer, {
  ScrollableContainerRef,
} from "@/components/ScrollableContainer";
import Popup from "@/components/Popup";
import PopupSectionBox from "@/components/PopupSectionBox";
import ValidatedInput from "@/components/ValidatedInput";
import LabeledCheckbox from "@/components/LabeledCheckbox";
import CustomLabeledCheckbox from "@/components/CustomLabeledCheckbox";
import CalendarIconPopup from "@/components/CalendarIconPopup";
import DropdownList from "@/components/DropdownList";
import { formatDate } from "@/lib/utils/date";
import { startOfDay } from "date-fns";

interface CustomerInfoPanelProps {
  sectionStates: Record<string, boolean>;
  onSectionToggle: (sectionKey: string) => void;
  onClose: () => void;
}

/**
 * 고객 정보 패널 컴포넌트 (C098)
 * 고객의 기본정보, 외국인 정보, 패키지, 내원, 진료, 처방, 추가 정보를 표시
 */
export default function CustomerInfoPanel({
  sectionStates,
  onSectionToggle,
  onClose,
}: CustomerInfoPanelProps) {
  const c109ScrollRef = useRef<ScrollableContainerRef>(null);

  // 팝업 상태 관리
  const [openPopup, setOpenPopup] = useState<string | null>(null);

  // 체크박스 상태 관리
  const [useAliasChecked, setUseAliasChecked] = useState(false);
  const [customerRejectedChecked, setCustomerRejectedChecked] = useState(false);
  const [smsRejectedChecked, setSmsRejectedChecked] = useState(false);
  const [smsReceivedChecked, setSmsReceivedChecked] = useState(false);
  const [verifiedCustomerAuthChecked, setVerifiedCustomerAuthChecked] = useState(false);
  const [unverifiedCustomerAuthChecked, setUnverifiedCustomerAuthChecked] = useState(false);
  const [registeredChecked, setRegisteredChecked] = useState(false);
  const [preRegisteredChecked, setPreRegisteredChecked] = useState(false);
  const [pendingChecked, setPendingChecked] = useState(false);
  const [deletedChecked, setDeletedChecked] = useState(false);
  const [refundedChecked, setRefundedChecked] = useState(false);
  const [movedChecked, setMovedChecked] = useState(false);
  const [hospitalCallRejectedChecked, setHospitalCallRejectedChecked] = useState(false);
  const [supporterChecked, setSupporterChecked] = useState(false);
  const [foreignerChecked, setForeignerChecked] = useState(false);
  const [koreanChecked, setKoreanChecked] = useState(false);
  const [hasResidencePermitChecked, setHasResidencePermitChecked] = useState(false);
  const [noResidencePermitChecked, setNoResidencePermitChecked] = useState(false);

  // 날짜 상태 관리
  const [entryDate, setEntryDate] = useState<Date | null>(() => startOfDay(new Date("2025-12-23")));
  const [exitDate, setExitDate] = useState<Date | null>(() => startOfDay(new Date("2025-12-23")));

  // 거부사유 드롭다운 상태
  const [rejectionReason, setRejectionReason] = useState<
    string | number | null
  >(null);

  // 거부사유 드롭다운 데이터
  const rejectionReasonItems = [
    { value: "", label: "사유1" },
    { value: "0", label: "종류 선택" },
    { value: "1", label: "종류 선택" },
    { value: "2", label: "종류 선택" },
  ];

  // 할인구분 드롭다운 상태
  const [discountType, setDiscountType] = useState<string | number | null>(
    null
  );

  // 할인구분 드롭다운 데이터
  const discountTypeItems = [
    { value: "0", label: "종류 선택" },
    { value: "1", label: "할인 유형 1" },
    { value: "2", label: "할인 유형 2" },
  ];

  // 직업 드롭다운 상태
  const [occupation, setOccupation] = useState<string | number | null>(null);

  // 직업 드롭다운 데이터
  const occupationItems = [
    { value: "0", label: "종류 선택" },
    { value: "1", label: "직업 1" },
    { value: "2", label: "직업 2" },
  ];

  // 국적 드롭다운 상태
  const [nationality, setNationality] = useState<string | number | null>(null);

  // 국적 드롭다운 데이터
  const nationalityItems = [
    { value: "0", label: "국적 선택" },
    { value: "1", label: "한국" },
    { value: "2", label: "중국" },
    { value: "3", label: "베트남" },
    { value: "4", label: "태국" },
  ];

  // 체류자격 드롭다운 상태
  const [residenceStatus, setResidenceStatus] = useState<
    string | number | null
  >(null);

  // 체류자격 드롭다운 데이터
  const residenceStatusItems = [
    { value: "0", label: "코드 선택" },
    { value: "1", label: "코드 1" },
    { value: "2", label: "코드 2" },
  ];

  // Section toggle handler with scroll logic
  const handleSectionToggle = (sectionKey: string, event: React.MouseEvent) => {
    const wasOpened = sectionStates[sectionKey];
    const clickedElement = event.currentTarget.closest(".C110") as HTMLElement;

    onSectionToggle(sectionKey);

    if (!wasOpened && clickedElement && c109ScrollRef.current) {
      setTimeout(() => {
        const scrollContainer = c109ScrollRef.current?.getElement();
        if (scrollContainer && clickedElement) {
          const containerRect = scrollContainer.getBoundingClientRect();
          const elementRect = clickedElement.getBoundingClientRect();
          const size5 =
            parseFloat(
              window
                .getComputedStyle(document.documentElement)
                .getPropertyValue("--size-5")
            ) || 5;
          const scrollTop =
            scrollContainer.scrollTop +
            (elementRect.top - containerRect.top) -
            size5;
          scrollContainer.scrollTo({
            top: Math.max(0, scrollTop),
            behavior: "smooth",
          });
        }
        c109ScrollRef.current?.checkOverflow();
      }, 100);
    } else {
      setTimeout(() => {
        c109ScrollRef.current?.checkOverflow();
      }, 100);
    }
  };

  return (
    <div className="C098">
      <div className="C101">
        <p className="T047">고객 정보</p>
        <div
          className="C102 isBarcode"
          onClick={() => setOpenPopup("barcode")}
          style={{ cursor: "pointer" }}
        >
          <div className="C103 styleSheet isIcon isBarcode"></div>
        </div>
        <div
          className="C102 isSetting"
          onClick={() => setOpenPopup("customerEdit")}
          style={{ cursor: "pointer" }}
        >
          <div className="C103 styleSheet isIcon isSetting"></div>
        </div>
        <div className="C108" onClick={onClose}>
          <div className="C012 styleSheet isIcon isArrow isLeft"></div>
        </div>
      </div>
      <ScrollableContainer ref={c109ScrollRef} className="C109">
        <div
          className={`C110 ${sectionStates.basic ? "isOpened" : "isFolded"}`}
        >
          <div
            className="C111"
            onClick={(e) => handleSectionToggle("basic", e)}
          >
            <p className="T048">기본정보</p>
            <p className="T051">
              <span className="isUnit">최초등록: 2024.</span>08.16
            </p>
            <div className="C112">
              <div className="C113 styleSheet isIcon isMini isChevron"></div>
            </div>
          </div>
          <div className="C116">
            <p className="T013">신수빈</p>
            <p className="T014 isRed">여성</p>
            <p className="T014">
              28<span className="isUnit">세</span>
            </p>
            <p className="T014 isOldbie">
              2<span className="isUnit">기</span>
            </p>
          </div>
          <div className="C111">
            <p className="T050">차트번호:</p>
            <p className="T049">070007777</p>
          </div>
          <div className="C111">
            <p className="T050">고객명:</p>
            <p className="T049 isBold isLarge">신수빈</p>
          </div>
          <div className="C111">
            <p className="T050">영문명:</p>
            <p className="T049">Shin SooBin</p>
          </div>
          <div className="C111">
            <p className="T050">휴대전화:</p>
            <p className="T049">010-7444-4118</p>
          </div>
          <div className="C111">
            <p className="T050">주민번호:</p>
            <p className="T049">800423-1*</p>
            <p className="T042 isRed">여성</p>
            <p className="T042">
              33<span className="isUnit">세</span>
            </p>
          </div>
          <div className="C114">
            <p className="T050">특수사항</p>
            <div className="C115">
              <p className="T042">찐서포터</p>
              <p className="T042">EC</p>
              <p className="T042">CC</p>
              <p className="T042">마케팅거부</p>
              <p className="T042">MATE</p>
              <p className="T042">기증자</p>
              <p className="T042">실천반갑</p>
              <p className="T042">성공기 작성</p>
              <p className="T042 isRed">혈액검사 대상자</p>
            </div>
          </div>
        </div>
        <div
          className={`C110 ${sectionStates.foreign ? "isOpened" : "isFolded"}`}
        >
          <div
            className="C111"
            onClick={(e) => handleSectionToggle("foreign", e)}
          >
            <p className="T048">외국인 정보</p>
            <p className="T051">
              <span className="isUnit">국적:</span> 필리핀
            </p>
            <div className="C112">
              <div className="C113 styleSheet isIcon isMini isChevron"></div>
            </div>
          </div>
        </div>
        <div
          className={`C110 isPackage ${
            sectionStates.package ? "isOpened" : "isFolded"
          }`}
        >
          <div
            className="C111"
            onClick={(e) => handleSectionToggle("package", e)}
          >
            <p className="T048">패키지</p>
            <p className="T042 isGreen">
              2<span className="isUnit">기</span>
            </p>
            <p className="T051">
              <span className="isUnit">등록: 2024.</span>08.16
            </p>
            <div className="C112">
              <div className="C113 styleSheet isIcon isMini isChevron"></div>
            </div>
          </div>
          <div className="C116">
            <p className="T019">
              계약금:<span className="isBold isBlue">3,500,000</span>원
            </p>
            <p className="T019">
              예약금:<span className="isBold isBlack">500,000</span>원
            </p>
            <p className="T019">
              할인:<span className="isBold isRed">1,200,000</span>원
            </p>
            <p className="T019">
              미수:<span className="isBold isMint">6,800,000</span>원
            </p>
          </div>
          <div className="C111">
            <p className="T049 isGreen">부산365mc병원</p>
            <p className="T051">
              <span className="isUnit">패키지 수:</span>{" "}
              <span className="isBold">6</span>
              <span className="isUnit">개</span>
            </p>
          </div>
          <div className="C117">
            <div className="C118">
              <div className="C119">
                <div className="C121 styleSheet isIcon isPart isFace"></div>
              </div>
              <div className="C120">
                <div className="C122">
                  <p className="T049 isRed">수술</p>
                  <p className="T049 isBold">얼굴</p>
                  <p className="T042">진행</p>
                  <p className="T051">
                    <span className="isUnit">횟수:</span> 3
                    <span className="isUnit">회</span>
                  </p>
                </div>
                <p className="T049 isGrey isEllipsis">
                  이중턱 지방흡입 + V라인 성형 + 얼굴 리프팅
                </p>
              </div>
            </div>
            <div className="C118">
              <div className="C119">
                <div className="C121 styleSheet isIcon isPart isShoulder"></div>
              </div>
              <div className="C120">
                <div className="C122">
                  <p className="T049 isRed">수술</p>
                  <p className="T049 isBold">가슴</p>
                  <p className="T042">진행</p>
                  <p className="T051">
                    <span className="isUnit">횟수:</span> 1
                    <span className="isUnit">회</span>
                  </p>
                </div>
                <p className="T049 isGrey isEllipsis">
                  가슴 지방이식 + 리프팅 + 상승술
                </p>
              </div>
            </div>
            <div className="C118">
              <div className="C119">
                <div className="C121 styleSheet isIcon isPart isArm"></div>
              </div>
              <div className="C120">
                <div className="C122">
                  <p className="T049 isRed">수술</p>
                  <p className="T049 isBold">팔</p>
                  <p className="T042">진행</p>
                  <p className="T051">
                    <span className="isUnit">횟수:</span> 2
                    <span className="isUnit">회</span>
                  </p>
                </div>
                <p className="T049 isGrey isEllipsis">
                  상완부 지방흡입 + 팔뚝 리프팅
                </p>
              </div>
            </div>
            <div className="C118">
              <div className="C119">
                <div className="C121 styleSheet isIcon isPart isBelly"></div>
              </div>
              <div className="C120">
                <div className="C122">
                  <p className="T049 isRed">수술</p>
                  <p className="T049 isBold">복부</p>
                  <p className="T042">진행</p>
                  <p className="T051">
                    <span className="isUnit">횟수:</span> 2
                    <span className="isUnit">회</span>
                  </p>
                </div>
                <p className="T049 isGrey isEllipsis">
                  복부 지방흡입 + 복부성형술 + 옆구리 라인
                </p>
              </div>
            </div>
            <div className="C118">
              <div className="C119">
                <div className="C121 styleSheet isIcon isPart isWaist"></div>
              </div>
              <div className="C120">
                <div className="C122">
                  <p className="T049 isRed">수술</p>
                  <p className="T049 isBold">허리</p>
                  <p className="T042">완료</p>
                  <p className="T051">
                    <span className="isUnit">횟수:</span> 1
                    <span className="isUnit">회</span>
                  </p>
                </div>
                <p className="T049 isGrey isEllipsis">
                  러브핸들 지방흡입 + 허리 라인 교정
                </p>
              </div>
            </div>
            <div className="C118">
              <div className="C119">
                <div className="C121 styleSheet isIcon isPart isThigh"></div>
              </div>
              <div className="C120">
                <div className="C122">
                  <p className="T049 isRed">수술</p>
                  <p className="T049 isBold">허벅지</p>
                  <p className="T042">진행</p>
                  <p className="T051">
                    <span className="isUnit">횟수:</span> 3
                    <span className="isUnit">회</span>
                  </p>
                </div>
                <p className="T049 isGrey isEllipsis">
                  대퇴부 지방흡입 + 허벅지 안쪽 리프팅
                </p>
              </div>
            </div>
            <div className="C118">
              <div className="C119">
                <div className="C121 styleSheet isIcon isPart isCalf"></div>
              </div>
              <div className="C120">
                <div className="C122">
                  <p className="T049 isRed">수술</p>
                  <p className="T049 isBold">종아리</p>
                  <p className="T042">예정</p>
                  <p className="T051">
                    <span className="isUnit">횟수:</span> 2
                    <span className="isUnit">회</span>
                  </p>
                </div>
                <p className="T049 isGrey isEllipsis">
                  종아리 지방흡입 + 종아리 라인 교정
                </p>
              </div>
            </div>
          </div>
          <div className="C111">
            <p className="T050">총 계약금:</p>
            <p className="T049 isBold isBlue isRight">
              12,000,000<span className="isUnit">원</span>
            </p>
          </div>
          <div className="C111">
            <p className="T050">예약금:</p>
            <p className="T049 isRight">
              4,000,000<span className="isUnit">원</span>
            </p>
          </div>
          <div className="C111">
            <p className="T050">할인액:</p>
            <p className="T049 isRed isRight">
              1,200,000<span className="isUnit">원 (</span>10.0
              <span className="isUnit">%)</span>
            </p>
          </div>
          <div className="C111">
            <p className="T050">잔액:</p>
            <p className="T049 isMint isRight">
              6,800,000<span className="isUnit">원</span>
            </p>
          </div>
        </div>
        <div
          className={`C110 ${sectionStates.visit ? "isOpened" : "isFolded"}`}
        >
          <div
            className="C111"
            onClick={(e) => handleSectionToggle("visit", e)}
          >
            <p className="T048">내원</p>
            <p className="T051">
              <span className="isUnit">실천지수: </span>
              <span className="isYellow">74,000</span>
              <span className="isUnit">점</span>
            </p>
            <div className="C112">
              <div className="C113 styleSheet isIcon isMini isChevron"></div>
            </div>
          </div>
          <div className="C111">
            <p className="T050">시술 시작일:</p>
            <p className="T049 isRight">2024.10.20</p>
          </div>
          <div className="C111">
            <p className="T050">주기적 내원일:</p>
            <p className="T049 isRight">2024.11.23</p>
          </div>
          <div className="C111">
            <p className="T050">다음 내원일:</p>
            <p className="T049 isRight">--</p>
          </div>
          <div className="C111">
            <p className="T050">시술 예정일:</p>
            <p className="T049 isRight">2024.09.23</p>
          </div>
          <div className="C111">
            <p className="T050">목표 체중:</p>
            <p className="T049 isRight">
              78.2<span className="isUnit">kg</span>
            </p>
          </div>
          <div className="C111">
            <p className="T050">달성 체중:</p>
            <p className="T049 isRight">
              76.2<span className="isUnit">kg</span>
            </p>
          </div>
          <div className="C111">
            <p className="T050">S/O:</p>
            <p className="T049 isRight">
              2024<span className="isUnit">년</span> 12
              <span className="isUnit">월경</span>
            </p>
          </div>
        </div>
        <div
          className={`C110 ${
            sectionStates.treatment ? "isOpened" : "isFolded"
          }`}
        >
          <div
            className="C111"
            onClick={(e) => handleSectionToggle("treatment", e)}
          >
            <p className="T048">진료</p>
            <p className="T051 isMini">
              <span className="isUnit">총일수: </span>37
              <span className="isUnit">일 / 조정: </span>-22
              <span className="isUnit">일</span>
            </p>
            <div className="C112">
              <div className="C113 styleSheet isIcon isMini isChevron"></div>
            </div>
          </div>
          <div className="C124"></div>
          <ScrollableContainer className="C123">
            <div className="C125">
              <div className="C046">
                <div className="C047 styleSheet isIcon isMini isClock"></div>
              </div>
              <p className="T052">
                <span className="isGrey">2025.</span>12.07{" "}
                <span className="isUnit"> - </span>
                <span className="isBold">3</span>
                <span className="isUnit">차 진료</span>
                <span className="isLabel isRed">예정</span>
              </p>
              <div className="C126">
                <p className="T053">
                  <span className="isUnit">일수:</span> 10{" "}
                  <span className="isUnit"> / 조정: </span>-2
                  <span className="isUnit">일</span>
                </p>
                <div className="C039">
                  <div className="C040 isMale"></div>
                  <p className="T018">
                    홍성훈<span className="isUnit">원장</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="C125">
              <div className="C046">
                <div className="C047 styleSheet isIcon isMini isClock"></div>
              </div>
              <p className="T052">
                <span className="isGrey">2025.</span>12.07{" "}
                <span className="isUnit"> - </span>
                <span className="isBold">3</span>
                <span className="isUnit">차 진료</span>
                <span className="isLabel isRed">예정</span>
              </p>
              <div className="C126">
                <p className="T053">
                  <span className="isUnit">일수:</span> 10{" "}
                  <span className="isUnit"> / 조정: </span>-2
                  <span className="isUnit">일</span>
                </p>
                <div className="C039">
                  <div className="C040 isMale"></div>
                  <p className="T018">
                    홍성훈<span className="isUnit">원장</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="C125">
              <div className="C046">
                <div className="C047 styleSheet isIcon isMini isClock"></div>
              </div>
              <p className="T052">
                <span className="isGrey">2025.</span>12.07{" "}
                <span className="isUnit"> - </span>
                <span className="isBold">3</span>
                <span className="isUnit">차 진료</span>
                <span className="isLabel isRed">예정</span>
              </p>
              <div className="C126">
                <p className="T053">
                  <span className="isUnit">일수:</span> 10{" "}
                  <span className="isUnit"> / 조정: </span>-2
                  <span className="isUnit">일</span>
                </p>
                <div className="C039">
                  <div className="C040 isMale"></div>
                  <p className="T018">
                    홍성훈<span className="isUnit">원장</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="C125">
              <div className="C046">
                <div className="C047 styleSheet isIcon isMini isClock"></div>
              </div>
              <p className="T052">
                <span className="isGrey">2025.</span>12.07{" "}
                <span className="isUnit"> - </span>
                <span className="isBold">3</span>
                <span className="isUnit">차 진료</span>
                <span className="isLabel isRed">예정</span>
              </p>
              <div className="C126">
                <p className="T053">
                  <span className="isUnit">일수:</span> 10{" "}
                  <span className="isUnit"> / 조정: </span>-2
                  <span className="isUnit">일</span>
                </p>
                <div className="C039">
                  <div className="C040 isMale"></div>
                  <p className="T018">
                    홍성훈<span className="isUnit">원장</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="C125">
              <div className="C046">
                <div className="C047 styleSheet isIcon isMini isClock"></div>
              </div>
              <p className="T052">
                <span className="isGrey">2025.</span>12.07{" "}
                <span className="isUnit"> - </span>
                <span className="isBold">3</span>
                <span className="isUnit">차 진료</span>
                <span className="isLabel isRed">예정</span>
              </p>
              <div className="C126">
                <p className="T053">
                  <span className="isUnit">일수:</span> 10{" "}
                  <span className="isUnit"> / 조정: </span>-2
                  <span className="isUnit">일</span>
                </p>
                <div className="C039">
                  <div className="C040 isMale"></div>
                  <p className="T018">
                    홍성훈<span className="isUnit">원장</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="C125">
              <div className="C046">
                <div className="C047 styleSheet isIcon isMini isClock"></div>
              </div>
              <p className="T052">
                <span className="isGrey">2025.</span>12.07{" "}
                <span className="isUnit"> - </span>
                <span className="isBold">3</span>
                <span className="isUnit">차 진료</span>
                <span className="isLabel isRed">예정</span>
              </p>
              <div className="C126">
                <p className="T053">
                  <span className="isUnit">일수:</span> 10{" "}
                  <span className="isUnit"> / 조정: </span>-2
                  <span className="isUnit">일</span>
                </p>
                <div className="C039">
                  <div className="C040 isMale"></div>
                  <p className="T018">
                    홍성훈<span className="isUnit">원장</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="C125">
              <div className="C046">
                <div className="C047 styleSheet isIcon isMini isClock"></div>
              </div>
              <p className="T052">
                <span className="isGrey">2025.</span>12.07{" "}
                <span className="isUnit"> - </span>
                <span className="isBold">3</span>
                <span className="isUnit">차 진료</span>
                <span className="isLabel isRed">예정</span>
              </p>
              <div className="C126">
                <p className="T053">
                  <span className="isUnit">일수:</span> 10{" "}
                  <span className="isUnit"> / 조정: </span>-2
                  <span className="isUnit">일</span>
                </p>
                <div className="C039">
                  <div className="C040 isMale"></div>
                  <p className="T018">
                    홍성훈<span className="isUnit">원장</span>
                  </p>
                </div>
              </div>
            </div>
          </ScrollableContainer>
        </div>
        <div
          className={`C110 ${
            sectionStates.prescription ? "isOpened" : "isFolded"
          }`}
        >
          <div
            className="C111"
            onClick={(e) => handleSectionToggle("prescription", e)}
          >
            <p className="T048">처방</p>
            <p className="T051 isMini">
              <span className="isUnit">무료처방: </span>37
              <span className="isUnit">일 / 총처방: </span>22
              <span className="isUnit">일</span>
            </p>
            <div className="C112">
              <div className="C113 styleSheet isIcon isMini isChevron"></div>
            </div>
          </div>
          <div className="C111">
            <p className="T050">무료 처방일:</p>
            <p className="T049 isRight">2024.10.20</p>
          </div>
          <div className="C111">
            <p className="T050">전 기수:</p>
            <p className="T049 isRight">--</p>
          </div>
          <div className="C111">
            <p className="T050">최종 처방일:</p>
            <p className="T049 isRight">--</p>
          </div>
          <div className="C111">
            <p className="T050">처방일수 합:</p>
            <p className="T049 isRight">--</p>
          </div>
          <div className="C111">
            <p className="T050">일수 조정:</p>
            <p className="T049 isRight">
              15<span className="isUnit">일</span>
            </p>
          </div>
        </div>
        <div
          className={`C110 ${
            sectionStates.additional ? "isOpened" : "isFolded"
          }`}
        >
          <div
            className="C111"
            onClick={(e) => handleSectionToggle("additional", e)}
          >
            <p className="T048">추가 정보</p>
            <div className="C112">
              <div className="C113 styleSheet isIcon isMini isChevron"></div>
            </div>
          </div>
          <div className="C111">
            <p className="T050">긴급 연락처::</p>
            <p className="T049 isRight">010-1234-5678</p>
          </div>
          <div className="C111">
            <p className="T050">보호자 성명:</p>
            <p className="T049 isRight">박철수</p>
          </div>
          <div className="C111">
            <p className="T050">고객과 관계:</p>
            <p className="T049 isRight">아버지</p>
          </div>
          <div className="C111">
            <p className="T050">직업:</p>
            <p className="T049 isRight">무직</p>
          </div>
          <div className="C111">
            <p className="T050">결혼 여부:</p>
            <p className="T049 isRight">기혼</p>
          </div>
          <div className="C111">
            <p className="T050">흡연:</p>
            <p className="T049 isRight">하루 1갑갑</p>
          </div>
          <div className="C111">
            <p className="T050">음주:</p>
            <p className="T049 isRight">하루 반병</p>
          </div>
          <div className="C111">
            <p className="T050">종교:</p>
            <p className="T049 isRight">무교</p>
          </div>
        </div>
      </ScrollableContainer>

      {/* 바코드 관리 팝업 */}
      <Popup
        isOpen={openPopup === "barcode"}
        onClose={() => setOpenPopup(null)}
      >
        <>
          <PopupSectionBox x={960} y={395} width={450}>
            <div className="C180">
              <p className="T076">바코드 관리</p>
              <div
                className="C181 isCloseButton"
                onClick={() => setOpenPopup(null)}
              >
                <div className="C179 isDepth1"></div>
                <div className="C182 styleSheet isIcon isBig isClose isWhite"></div>
              </div>
            </div>
          </PopupSectionBox>

          <PopupSectionBox x={510} y={395} width={430} height={270}>
              <div className="C2022">
                <div className="C2023"></div>
                <div className="C2024">
                  <img 
                    src="/images/365mcLogo.png" 
                    alt="365mc" 
                    className="C2032"
                  />
                  <div className="C2025">
                    <div className="C2026"></div>
                    <div className="T2022">1600016819392871</div>
                  </div>
                </div>
              </div>
          </PopupSectionBox>

          <PopupSectionBox x={960} y={515} width={450} height={150}>
            <div className="C2027">
              <div className="T2027">
                <div>전화번호 <span className="T2027Phone">010-7444-4118</span>로</div>
                <div>설치 안내 문자를 발송할까요?</div>
              </div>
              <button className="C2028">문자발송</button>
            </div>
          </PopupSectionBox>

          <PopupSectionBox x={510} y={685} width={900} height={120}>
            <div className="C2029">
              <div className="C2030">
                <div className="T2029">고객이름</div>
                <div className="T2029 is20p">주민번호</div>
                <div className="T2029">휴대번호</div>
                <div className="T2029">웹 ID</div>
                <div className="T2029 is20p">바코드번호</div>
                <div className="T2029">차트연동</div>
              </div>
              <div className="C2031">
                <div className="T2030">이신득</div>
                <div className="T2030 is20p">840923-1712313</div>
                <div className="T2030">010-7444-4118</div>
                <div className="T2030">uxrahum</div>
                <div className="T2031 is20p">1600016819392871</div>
                <div className="T2032">연결완료</div>
              </div>
            </div>
          </PopupSectionBox>
        </>
      </Popup>

      {/* 고객정보 수정 팝업 */}
      <Popup
        isOpen={openPopup === "customerEdit"}
        onClose={() => setOpenPopup(null)}
      >
                <div>
          <PopupSectionBox x={290} y={70} width={660} height={1060}>
            <div className="C1003">
              <div className="C1007">
                <div className="C1000">
                  <p className="T1000">주민번호:</p>
                  <div className="C1017">
                    <ValidatedInput
                      className="T1002"
                      type="text"
                      placeholder="000000-0******"
                      minLength={14}
                      required
                      minLengthErrorMessage="입력값이 모자랍니다"
                    />
                  </div>

                  <button className="C1005"><p className="T1008 isSize15">중복검사</p></button>
                  <div className="C1011">
                    <CustomLabeledCheckbox
                      checked={useAliasChecked}
                      onChange={setUseAliasChecked}
                      text="가명 사용"
                    />
                  </div>
                </div>
              </div>
              <div className="C1007">
                <div className="C1000">
                  <p className="T1000">성명:</p>
                  <div className="C1017">
                    <ValidatedInput
                      className="T1002"
                      type="text"
                      placeholder="최대 16자까지"
                      minLength={1}
                      maxLength={16}
                      required
                      minLengthErrorMessage="입력값이 모자랍니다"
                    />
                  </div>
                  <p className="T1000">가명:</p>
                  <div className="C1017">
                    <ValidatedInput
                      className="T1002"
                      type="text"
                      placeholder="최대 16자까지"
                      minLength={1}
                      maxLength={16}
                      required
                      minLengthErrorMessage="입력값이 모자랍니다"
                    />
                  </div>
                </div>
              </div>
              <div className="C1007">
                <div className="C1000">
                  <p className="T1000">전화번호:</p>
                  <div className="C1017">
                    <ValidatedInput
                      className="T1002"
                      type="text"
                      placeholder="000-0000-0000"
                      minLength={13}
                      maxLength={13}
                      required
                      minLengthErrorMessage="입력값이 모자랍니다"
                    />
                  </div>
                  <button className="C1005 isRetryIdentification"><p className="T1008 isSize15">재인증</p></button>

                  <input className="T1002" type="text" placeholder="6자리" />
                  <button className="C1010">확인</button>
                </div>
              </div>
              <div className="C1007">
                <div className="C1000">
                  <p className="T1000">자택번호:</p>
                  <div className="C1017">
                    <ValidatedInput
                      className="T1002"
                      type="text"
                      placeholder="000-0000-0000"
                      minLength={13}
                      maxLength={13}
                      required
                      minLengthErrorMessage="입력값이 모자랍니다"
                    />
                  </div>
                  <p className="T1000">이메일:</p>
                  <div className="C1017">
                    <ValidatedInput
                      className="T1002"
                      type="text"
                      placeholder="최대32자까지"
                      minLength={1}
                      maxLength={32}
                      required
                      validateEmail={true}
                      minLengthErrorMessage="입력값이 모자랍니다"
                      emailErrorMessage="입력 양식이 잘못되었습니다."
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="C1007">
              <div className="C1000">
                <p className="T1000">주소:</p>
                  <div className="C1004">
                    <ValidatedInput
                      className="T1001"
                      type="text"
                      placeholder=""
                      required
                      disabled
                    />
                    <button className="C1005"><p className="T1008 isSize15">주소검색</p></button>
                  </div>
              </div>
            </div>
            <div className="C1009"></div>

            <div className="C1007">
              <div className="C1000">
                <p className="T1000">SMS수신:</p>
                <div className="C1018">
                  <CustomLabeledCheckbox
                    checked={customerRejectedChecked}
                    onChange={setCustomerRejectedChecked}
                    text="고객 거부"
                  />
                  <CustomLabeledCheckbox
                    checked={smsRejectedChecked}
                    onChange={setSmsRejectedChecked}
                    text="수신 금지"
                  />
                  <CustomLabeledCheckbox
                    checked={smsReceivedChecked}
                    onChange={setSmsReceivedChecked}
                    text="수신 받음"
                  />
                </div>
              </div>
            </div>

            <div className="C1007">
              <div className="C1000">
                <p className="T1000">거부사유:</p>
                <DropdownList
                  items={rejectionReasonItems}
                  selectedValue={rejectionReason}
                  onSelect={(item) => setRejectionReason(item.value)}
                  placeholder="종류 선택"
                />
              </div>
            </div>
            <div className="C1007">
              <div className="C1000">
                <p className="T1000">할인구분:</p>
                <DropdownList
                  items={discountTypeItems}
                  selectedValue={discountType}
                  onSelect={(item) => setDiscountType(item.value)}
                  placeholder="종류 선택"
                />
                <p className="T1000">직업:</p>
                <DropdownList
                  items={occupationItems}
                  selectedValue={occupation}
                  onSelect={(item) => setOccupation(item.value)}
                  placeholder="종류 선택"
                />
              </div>
            </div>
            <div className="C1007">
              <div className="C1000">
                <p className="T1000">본인인증:</p>
                <div className="C1018">
                  <CustomLabeledCheckbox
                    checked={verifiedCustomerAuthChecked}
                    onChange={setVerifiedCustomerAuthChecked}
                    text="인증 고객"
                  />
                  <CustomLabeledCheckbox
                    checked={unverifiedCustomerAuthChecked}
                    onChange={setUnverifiedCustomerAuthChecked}
                    text="미인증 고객"
                  />
                </div>
              </div>
            </div>
            <div className="C1007">
              <div className="C1000 isTopFitted">
                <p className="T1000">상태:</p>
                <div className="C1018">
                <CustomLabeledCheckbox
                    checked={registeredChecked}
                    onChange={setRegisteredChecked}
                    text="등록"
                  />
                  <CustomLabeledCheckbox
                    checked={preRegisteredChecked}
                    onChange={setPreRegisteredChecked}
                    text="가등록"
                  />
                  <CustomLabeledCheckbox
                    checked={pendingChecked}
                    onChange={setPendingChecked}
                    text="보류"
                  />
                  <CustomLabeledCheckbox
                    checked={deletedChecked}
                    onChange={setDeletedChecked}
                    text="삭제"
                  />
                  <CustomLabeledCheckbox
                    checked={refundedChecked}
                    onChange={setRefundedChecked}
                    text="환불"
                  />
                  <CustomLabeledCheckbox
                    checked={movedChecked}
                    onChange={setMovedChecked}
                    text="이동"
                  />
                </div>
              </div>
            </div>
          </PopupSectionBox>
          <PopupSectionBox x={970} y={70} width={660}>
            <div className="C180">
              <p className="T076">고객 정보 수정</p>
              <div className="C2033">
                <img alt="작성자" className="C2034" src="/images/male-64.jpg" />
                <div className="C2035">
                  <p className="T2040">작성자</p>
                  <p className="T2041">
                    홍성훈<span className="T2042"> 원장님</span>
                  </p>
                </div>
                <div className="C2036 styleSheet isIcon isMini isChevron isRight"></div>
              </div>
              <div
                className="C181 isCloseButton"
                onClick={() => setOpenPopup(null)}
              >
                <div className="C179 isDepth1"></div>
                <div className="C182 styleSheet isIcon isBig isClose isWhite"></div>
              </div>
            </div>
          </PopupSectionBox>
          <PopupSectionBox x={970} y={190} width={660} height={820}>
            <div className="C1003">
              <div className="C1007">
                <div className="C1000">
                  <p className="T1000">특기사항:</p>
                  <div className="C1018">
                    <CustomLabeledCheckbox
                      checked={hospitalCallRejectedChecked}
                      onChange={setHospitalCallRejectedChecked}
                      checkedBackgroundColor="linear-gradient(to right, var(--color-yellow), var(--color-red))"
                      checkedIconClassName="isIMaskMagenta isIcon isMini isCheckedBold"
                      text="원내 호출 거부"
                    />
                    <CustomLabeledCheckbox
                      checked={supporterChecked}
                      onChange={setSupporterChecked}
                      text="서포터"
                    />
                  </div>
                </div>
              </div>
              <div className="C1009"></div>
              <div className="C1007">
                <div className="C1000">
                  <p className="T1000">분류:</p>
                  <div className="C1018">
                    <CustomLabeledCheckbox
                      checked={foreignerChecked}
                      onChange={setForeignerChecked}
                      text="외국인"
                    />
                    <CustomLabeledCheckbox
                      checked={koreanChecked}
                      onChange={setKoreanChecked}
                      text="내국인"
                    />
                  </div>
                </div>
              </div>
              <div className="C1007 isReducedMarginLeft">
                <div className="C1000">
                  <p className="T1000">국적:</p>
                  <DropdownList
                    items={nationalityItems}
                    selectedValue={nationality}
                    onSelect={(item) => setNationality(item.value)}
                    placeholder="국적 선택"
                  />
                  <p className="T1000">영문명:</p>
                  <div className="C1017">
                    <ValidatedInput
                      className="T1002"
                      type="text"
                      placeholder="최대 16자까지"
                      minLength={1}
                      maxLength={16}
                      required
                      minLengthErrorMessage="입력값이 모자랍니다"
                    />
                  </div>
                </div>
              </div>
              <div className="C1007 isReducedMarginLeft">
                <div className="C1000">
                  <p className="T1000">여권번호:</p>

                  <div className="C1017">
                    <ValidatedInput
                      className="T1002"
                      type="text"
                      placeholder="M00000000"
                      minLength={8}
                      maxLength={8}
                      required
                      minLengthErrorMessage="입력값이 모자랍니다"
                    />
                  </div>
                  <p className="T1000">건강보험:</p>

                  <div className="C1017">
                    <ValidatedInput
                      className="T1002"
                      type="text"
                      placeholder="3-00000000000"
                      minLength={13}
                      maxLength={13}
                      required
                      minLengthErrorMessage="입력값이 모자랍니다"
                    />
                  </div>
                </div>
              </div>
              <div className="C1007 isReducedMarginLeft">
                <div className="C1000">
                  <p className="T1000">거소증:</p>
                  <div className="C1018">
                    <CustomLabeledCheckbox
                      checked={hasResidencePermitChecked}
                      onChange={setHasResidencePermitChecked}
                      text="있음"
                    />
                    <CustomLabeledCheckbox
                      checked={noResidencePermitChecked}
                      onChange={setNoResidencePermitChecked}
                      text="없음"
                    />
                  </div>

                  <p className="T1000">체류자격:</p>
                  <DropdownList
                    items={residenceStatusItems}
                    selectedValue={residenceStatus}
                    onSelect={(item) => setResidenceStatus(item.value)}
                    placeholder="코드 선택"
                  />
                </div>
              </div>
              <div className="C1012">
                <div className="C1013">
                  <div className="C1028 styleSheet isIcon isClip"></div>
                  <label htmlFor="img-upload" className="T1006">
                    첨부할 거소증 이미지를 올리세요.
                  </label>
                  <input
                    className="T1006" 
                    type="file" 
                    id="img-upload" 
                    accept="image/*" 
                    hidden
                  />
                </div>
                <div className="C1014">
                  <div className="C1015">
                    <p className="T1000">입국일:</p>
                    <CalendarIconPopup
                      selectedDate={entryDate}
                      onDateSelect={setEntryDate}
                      triggerClassName="C1016"
                      isDark={true}
                    />
                  </div>

                  <div className="C1015">
                    <p className="T1000">출국일:</p>
                    <CalendarIconPopup
                      selectedDate={exitDate}
                      onDateSelect={setExitDate}
                      triggerClassName="C1016"
                      isDark={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </PopupSectionBox>
          <PopupSectionBox x={970} y={1030} width={660} height={100}>
            <div className="C1000">
              <div style={{ display: "flex", alignItems: "center", textAlign: "center", gap: "var(--size-5)", marginLeft: "var(--size-50)", lineHeight: "var(--size-100)" }}>
                <p style={{ color: "var(--color-white-50)", fontSize: "var(--font-15)", fontWeight: "800" }}>최종 등록 및 수정일자:</p>
                <p style={{ color: "var(--color-white)", fontSize: "var(--font-15)", fontWeight: "800" }}>2025.08.21</p>
                <p style={{ color: "var(--color-white-50)", fontSize: "var(--font-15)", fontWeight: "800" }}>PM</p>
                <p style={{ color: "var(--color-white)", fontSize: "var(--font-15)", fontWeight: "800" }}>03:23</p>
              </div>
              <button className="C1023 isEdit">
                <div className="C1024"><div className="C1025 styleSheet isIcon isArrow isRight"></div></div>
              
                <p className="T1008">정보수정
                </p></button>
            </div>
          </PopupSectionBox>
        </div>
      </Popup>
    </div>
  );
}
