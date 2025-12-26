"use client";

import { useEffect, useState } from "react";
import Popup from "@/components/Popup";
import PopupSectionBox from "@/components/PopupSectionBox";

interface ReceptionCheckInButtonProps {
  /** 고객 상세 패널(모달) 열림 여부 */
  isOpen: boolean;
  /** 퀵액션(C100) hover 여부에 따른 접힘 상태 */
  isFolded?: boolean;
}

/**
 * 원무 화면 우측 하단 접수 버튼 (C152)
 * - C096(고객 상세 패널)과 비슷하게 마운트/언마운트 + isOpened 애니메이션 관리
 */
export default function ReceptionCheckInButton({
  isOpen,
  isFolded = false,
}: ReceptionCheckInButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  // 각 팝업의 열림 상태 관리
  const [openPopup, setOpenPopup] = useState<string | null>(null);

  useEffect(() => {
    let openFrame1: number | null = null;
    let openFrame2: number | null = null;
    let closeFrame: number | null = null;
    let closeTimer: number | null = null;

    if (isOpen) {
      // 1프레임째: DOM 추가 (isOpened=false 상태)
      openFrame1 = requestAnimationFrame(() => {
        setIsVisible(true);
        // 2프레임째: isOpened=true 부여 → 트랜지션 시작
        openFrame2 = requestAnimationFrame(() => {
          setIsOpened(true);
        });
      });
    } else {
      // 닫힐 때: 다음 프레임에 isOpened 제거 후, 트랜지션 끝나면 DOM 제거
      closeFrame = requestAnimationFrame(() => {
        setIsOpened(false);
        closeTimer = window.setTimeout(() => {
          setIsVisible(false);
        }, 300);
      });
    }

    return () => {
      if (openFrame1 !== null) cancelAnimationFrame(openFrame1);
      if (openFrame2 !== null) cancelAnimationFrame(openFrame2);
      if (closeFrame !== null) cancelAnimationFrame(closeFrame);
      if (closeTimer !== null) clearTimeout(closeTimer);
    };
  }, [isOpen]);

  if (!isVisible) return null;

  // 팝업 버튼 데이터
  const popupButtons = [
    {
      id: "checkIn",
      title: "접수하기",
      className: "isCheckIn",
      iconClass: "isCheckIn",
    },
    {
      id: "movePart",
      title: "파트이동",
      className: "isMovePart",
      iconClass: "isPaperPlane",
    },
    {
      id: "status",
      title: "상태관리",
      className: "isStatus",
      iconClass: "isRibbon",
    },
    {
      id: "appointment",
      title: "상담예약",
      className: "isAppointment",
      iconClass: "isAlarmClock",
    },
    {
      id: "dailyProcedure",
      title: "일일시술&처방",
      className: "isDailyProcedure",
      iconClass: "isClinic",
    },
    {
      id: "prescription",
      title: "처방전",
      className: "isPrescription",
      iconClass: "isDrug",
    },
    {
      id: "payment",
      title: "수납등록",
      className: "isPayment",
      iconClass: "isCoin",
    },
    {
      id: "checkOut",
      title: "귀가처리",
      className: "isCheckOut",
      iconClass: "isExit",
    },
  ];

  const handleButtonClick = (id: string) => {
    setOpenPopup(id);
  };

  // 각 팝업의 내용을 렌더링하는 함수
  const renderPopupContent = (popupId: string) => {
    const button = popupButtons.find((b) => b.id === popupId);
    if (!button) return null;

    switch (popupId) {
      case "checkIn":
        return (
          <>
            <PopupSectionBox x={260} y={20} width={1400}>
              <div className="C180">
                <p className="T076">{button.title}</p>
                <div
                  className="C181 isCloseButton"
                  onClick={() => setOpenPopup(null)}
                >
                  <div className="C179 isDepth1"></div>
                  <div className="C182 styleSheet isIcon isBig isClose isWhite"></div>
                </div>
              </div>
            </PopupSectionBox>
            <PopupSectionBox x={260} y={140} width={1400} height={1040}>
              <div className="C180">{/* 접수하기 팝업 내용 */}</div>
            </PopupSectionBox>
          </>
        );

      case "movePart":
        return (
          <>
            <PopupSectionBox x={260} y={20} width={1400}>
              <div className="C180">
                <p className="T076">{button.title}</p>
                <div
                  className="C181 isCloseButton"
                  onClick={() => setOpenPopup(null)}
                >
                  <div className="C179 isDepth1"></div>
                  <div className="C182 styleSheet isIcon isBig isClose isWhite"></div>
                </div>
              </div>
            </PopupSectionBox>
            <PopupSectionBox x={260} y={140} width={1400} height={1040}>
              <div className="C180">{/* 파트이동 팝업 내용 */}</div>
            </PopupSectionBox>
          </>
        );

      case "status":
        return (
          <>
            <PopupSectionBox x={260} y={20} width={1400}>
              <div className="C180">
                <p className="T076">{button.title}</p>
                <div
                  className="C181 isCloseButton"
                  onClick={() => setOpenPopup(null)}
                >
                  <div className="C179 isDepth1"></div>
                  <div className="C182 styleSheet isIcon isBig isClose isWhite"></div>
                </div>
              </div>
            </PopupSectionBox>
            <PopupSectionBox x={260} y={140} width={1400} height={1040}>
              <div className="C180">{/* 상태관리 팝업 내용 */}</div>
            </PopupSectionBox>
          </>
        );

      case "appointment":
        return (
          <>
            <PopupSectionBox x={260} y={20} width={1400}>
              <div className="C180">
                <p className="T076">{button.title}</p>
                <div
                  className="C181 isCloseButton"
                  onClick={() => setOpenPopup(null)}
                >
                  <div className="C179 isDepth1"></div>
                  <div className="C182 styleSheet isIcon isBig isClose isWhite"></div>
                </div>
              </div>
            </PopupSectionBox>
            <PopupSectionBox x={260} y={140} width={1400} height={1040}>
              <div className="C180">{/* 상담예약 팝업 내용 */}</div>
            </PopupSectionBox>
          </>
        );

      case "dailyProcedure":
        return (
          <>
            <PopupSectionBox x={260} y={20} width={1400}>
              <div className="C180">
                <p className="T076">{button.title}</p>
                <div
                  className="C181 isCloseButton"
                  onClick={() => setOpenPopup(null)}
                >
                  <div className="C179 isDepth1"></div>
                  <div className="C182 styleSheet isIcon isBig isClose isWhite"></div>
                </div>
              </div>
            </PopupSectionBox>
            <PopupSectionBox x={260} y={140} width={1400} height={1040}>
              <div className="C180">{/* 일일시술&처방 팝업 내용 */}</div>
            </PopupSectionBox>
          </>
        );

      case "prescription":
        return (
          <>
            <PopupSectionBox x={260} y={20} width={1400}>
              <div className="C180">
                <p className="T076">{button.title}</p>
                <div
                  className="C181 isCloseButton"
                  onClick={() => setOpenPopup(null)}
                >
                  <div className="C179 isDepth1"></div>
                  <div className="C182 styleSheet isIcon isBig isClose isWhite"></div>
                </div>
              </div>
            </PopupSectionBox>
            <PopupSectionBox x={260} y={140} width={1400} height={1040}>
              <div className="C180">{/* 처방전 팝업 내용 */}</div>
            </PopupSectionBox>
          </>
        );

      case "payment":
        return (
          <>
            <PopupSectionBox x={260} y={20} width={1400}>
              <div className="C180">
                <p className="T076">{button.title}</p>
                <div
                  className="C181 isCloseButton"
                  onClick={() => setOpenPopup(null)}
                >
                  <div className="C179 isDepth1"></div>
                  <div className="C182 styleSheet isIcon isBig isClose isWhite"></div>
                </div>
              </div>
            </PopupSectionBox>
            <PopupSectionBox x={260} y={140} width={1400} height={1040}>
              <div className="C180">{/* 수납등록 팝업 내용 */}</div>
            </PopupSectionBox>
          </>
        );

      case "checkOut":
        return (
          <>
            <PopupSectionBox x={260} y={20} width={1400}>
              <div className="C180">
                <p className="T076">{button.title}</p>
                <div
                  className="C181 isCloseButton"
                  onClick={() => setOpenPopup(null)}
                >
                  <div className="C179 isDepth1"></div>
                  <div className="C182 styleSheet isIcon isBig isClose isWhite"></div>
                </div>
              </div>
            </PopupSectionBox>
            <PopupSectionBox x={260} y={140} width={1400} height={1040}>
              <div className="C180">{/* 귀가처리 팝업 내용 */}</div>
            </PopupSectionBox>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <section
        className={`C152 ${isOpened ? "isOpened" : ""} ${
          isFolded ? "isFolded" : ""
        }`.trim()}
      >
        {popupButtons.map((button) => (
          <div
            key={button.id}
            className={`C153 ${button.className}`}
            onClick={() => handleButtonClick(button.id)}
            style={{ cursor: "pointer" }}
          >
            <div className={`C154 styleSheet isIcon ${button.iconClass}`}></div>
            <div className="C155">
              <p className="T068">{button.title}</p>
            </div>
          </div>
        ))}
      </section>

      {/* 각 팝업을 별도로 렌더링 */}
      {popupButtons.map((button) => (
        <Popup
          key={button.id}
          isOpen={openPopup === button.id}
          onClose={() => setOpenPopup(null)}
        >
          {renderPopupContent(button.id)}
        </Popup>
      ))}
    </>
  );
}
