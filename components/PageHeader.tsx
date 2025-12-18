"use client";

import { useState } from "react";
import Tooltip from "@/components/Tooltip";
import Popup from "@/components/Popup";
import PopupSectionBox from "@/components/PopupSectionBox";
import { PageHeaderProps } from "@/types/ui";

export default function PageHeader({ title }: PageHeaderProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleC009Click = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <header className="C008">
        <h1>{title}</h1>
        <Tooltip text="지점 전체 방문 고객 현황">
          <div className="C009" onClick={handleC009Click}>
            <div className="C010"></div>
            <div className="C011">
              <p className="T003">방문 고객 현황</p>
              <p className="T004">장시간 대기중인 고객이 없습니다.</p>
            </div>
            <div className="C012 styleSheet isIcon isBentoMenu"></div>
          </div>
        </Tooltip>
        <Tooltip text="통합 예약 서비스">
          <div className="C014">
            <div className="C012 styleSheet isIcon isReservation"></div>
          </div>
        </Tooltip>
        <div className="C015">
          <div className="C016">
            <div className="C017 styleSheet isIcon isMagnifier"></div>
            <p className="T005">메뉴 및 기능 검색</p>
          </div>
          <Tooltip text="1:1 참조사항 전달">
            <div className="C018">
              <div className="C019 styleSheet isIcon isNote"></div>
              <p className="T006">12</p>
            </div>
          </Tooltip>
          <Tooltip text="시스템 알림">
            <div className="C018">
              <div className="C019 styleSheet isIcon isAlarm"></div>
              <p className="T006">3</p>
            </div>
          </Tooltip>
        </div>
      </header>
      <Popup isOpen={isPopupOpen} onClose={handleClosePopup}>
        <PopupSectionBox x={290} y={60} width={1340}>
          <div className="C180">
            <p className="T076">지점 방문 고객 현황</p>
            <div className="C181 isCloseButton" onClick={handleClosePopup}>
              <div className="C179 isDepth1"></div>
              <div className="C182 styleSheet isIcon isBig isClose isWhite"></div>
            </div>
          </div>
        </PopupSectionBox>
        <PopupSectionBox x={290} y={180} width={320} height={960}>
          <div className="C180">
            <p className="T076">지점 방문 고객 현황</p>
          </div>
        </PopupSectionBox>
        <PopupSectionBox x={630} y={180} width={320} height={470}>
          <div className="C180">
            <p className="T076">지점 방문 고객 현황</p>
          </div>
        </PopupSectionBox>
        <PopupSectionBox x={970} y={180} width={320} height={470}>
          <div className="C180">
            <p className="T076">지점 방문 고객 현황</p>
          </div>
        </PopupSectionBox>
        <PopupSectionBox x={1310} y={180} width={320} height={470}>
          <div className="C180">
            <p className="T076">지점 방문 고객 현황</p>
          </div>
        </PopupSectionBox>
        <PopupSectionBox x={630} y={670} width={320} height={470}>
          <div className="C180">
            <p className="T076">지점 방문 고객 현황</p>
          </div>
        </PopupSectionBox>
        <PopupSectionBox x={970} y={670} width={320} height={470}>
          <div className="C180">
            <p className="T076">지점 방문 고객 현황</p>
          </div>
        </PopupSectionBox>
        <PopupSectionBox x={1310} y={670} width={320} height={470}>
          <div className="C180">
            <p className="T076">지점 방문 고객 현황</p>
          </div>
        </PopupSectionBox>
      </Popup>
    </>
  );
}
