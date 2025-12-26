"use client";

import { useState } from "react";
import Tooltip from "@/components/Tooltip";
import Popup from "@/components/Popup";
import PopupSectionBox from "@/components/PopupSectionBox";
import ScrollableContainer from "@/components/ScrollableContainer";
import { PageHeaderProps } from "@/types/ui";
import TabSelector from "./TabSelector";
import CalendarMiniPopup from "./CalendarMiniPopup";
import { startOfDay } from "date-fns";
import ReservationServicePopup from "@/components/popups/ReservationServicePopup";
import MenuSearchPopup from "@/components/popups/MenuSearchPopup";
export default function PageHeader({
  title,
  onNoteClick,
  isNoteSelected = false,
  onAlarmClick,
  isAlarmSelected = false,
  onReservationClick,
}: PageHeaderProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMenuSearchPopupOpen, setIsMenuSearchPopupOpen] = useState(false);
  const [isReservationPopupOpen, setIsReservationPopupOpen] = useState(false);
  const [selectedSortTab, setSelectedSortTab] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(() => {
    return startOfDay(new Date());
  });

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
          <div
            className="C014"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsReservationPopupOpen(true);
            }}
            style={{ cursor: "pointer" }}
          >
            <div className="C012 styleSheet isIcon isReservation"></div>
          </div>
        </Tooltip>
        <div className="C015">
          <div
            className="C016"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsMenuSearchPopupOpen(true);
            }}
            style={{ cursor: "pointer" }}
          >
            <div className="C017 styleSheet isIcon isMagnifier"></div>
            <p className="T005">메뉴 및 기능 검색</p>
          </div>
          <Tooltip text="1:1 참조사항 전달">
            <div
              className={`C018 isNote${isNoteSelected ? " isSelected" : ""}`}
              onClick={
                onNoteClick && typeof onNoteClick === "function"
                  ? (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onNoteClick();
                    }
                  : undefined
              }
            >
              <div className="C019 styleSheet isIcon isNote"></div>
              <p className="T006">12</p>
            </div>
          </Tooltip>
          <Tooltip text="시스템 알림">
            <div
              className={`C018 isAlarm${isAlarmSelected ? " isSelected" : ""}`}
              onClick={
                onAlarmClick && typeof onAlarmClick === "function"
                  ? (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onAlarmClick();
                    }
                  : undefined
              }
            >
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
            <div className="C189">
              <p className="isGrey">정렬:</p>
              <TabSelector
                items={[{ title: "시간순" }, { title: "상태순" }]}
                width="var(--size-140)"
                multiple={false}
                value={selectedSortTab}
                onChange={(selected) => setSelectedSortTab(selected as number)}
              />
            </div>
            <p className="T082">
              오늘 일시: <span className="isWhite">2025.09.23</span> AM{" "}
              <span className="isWhite">10:23:45</span> / 방문 예정:{" "}
              <span className="isWhite isBig">8</span>명 / 지점내 고객:{" "}
              <span className="isGreen isBig">13</span>명 / 귀가 고객:{" "}
              <span className="isBig isBlue">5</span>명
            </p>
            <div className="C181 isCloseButton" onClick={handleClosePopup}>
              <div className="C179 isDepth1"></div>
              <div className="C182 styleSheet isIcon isBig isClose isWhite"></div>
            </div>
          </div>
        </PopupSectionBox>
        <PopupSectionBox x={290} y={180} width={320} height={960}>
          <div className="C186">
            <div className="C184">
              <div className="C185 styleSheet isIcon isCounseling"></div>
            </div>
            <p className="T077">상담</p>
            <p className="T078">
              진행중:<span className="isBig isGreen">2</span>명 / 대기:
              <span className="isBig isWhite">2</span>명
            </p>
          </div>
          <ScrollableContainer>
            <div className="C187">
              <div className="C086">
                <p className="T041">박지영</p>
                <p className="T042 isMagenta">여성</p>
                <p className="T042 isWhite">
                  32<span className="isUnit">세</span>
                </p>
                <p className="T042 isWhite">
                  1<span className="isUnit">기</span>
                </p>
                <p className="T016 isGrey">210048921</p>
              </div>
              <div className="C188">
                <p className="T016">
                  <span className="isUnit">AM</span> 10:30 이동.
                </p>
                <p className="T079">시술 신환 상담</p>
                <p className="T079">상담대기</p>
                <p className="T080 isYellow">11분 지연.</p>
                <p className="T080">
                  (총 대기: <span className="isYellow">11분</span>)
                </p>
              </div>
            </div>
            <div className="C187">
              <div className="C086">
                <p className="T041">박지영</p>
                <p className="T042 isMagenta">여성</p>
                <p className="T042 isWhite">
                  32<span className="isUnit">세</span>
                </p>
                <p className="T042 isWhite">
                  1<span className="isUnit">기</span>
                </p>
                <p className="T016 isGrey">210048921</p>
              </div>
              <div className="C188">
                <p className="T016">
                  <span className="isUnit">AM</span> 10:30 배정.
                </p>
                <p className="T079">시술 신환 상담</p>
                <p className="T079">상담 준비중</p>
                <div className="C039">
                  <div className="C040"></div>
                  <p className="T081">
                    김유정<span className="isUnit">상담사</span>
                  </p>
                </div>
                <p className="T080 isMagenta">31분 대기.</p>
                <p className="T080">
                  (총 대기: <span className="isMagenta">41분</span>)
                </p>
              </div>
            </div>
            <div className="C187">
              <div className="C086">
                <p className="T041">박지영</p>
                <p className="T042 isMagenta">여성</p>
                <p className="T042 isWhite">
                  32<span className="isUnit">세</span>
                </p>
                <p className="T042 isWhite">
                  1<span className="isUnit">기</span>
                </p>
                <p className="T016 isGrey">210048921</p>
              </div>
              <div className="C188">
                <p className="T016">
                  <span className="isUnit">AM</span> 10:30 시작.
                </p>
                <p className="T079">시술 재환 상담</p>
                <p className="T079 isGreen">진행중</p>
                <p className="T016">
                  00:11:59.12 <span className="isUnit">경과.</span>
                </p>
                <div className="C039">
                  <div className="C040"></div>
                  <p className="T081">
                    김유정<span className="isUnit">상담사</span>
                  </p>
                </div>
                <p className="T080">- 예상: 1시간 30분</p>
              </div>
            </div>
            <div className="C187">
              <div className="C086">
                <p className="T041">박지영</p>
                <p className="T042 isMagenta">여성</p>
                <p className="T042 isWhite">
                  32<span className="isUnit">세</span>
                </p>
                <p className="T042 isWhite">
                  1<span className="isUnit">기</span>
                </p>
                <p className="T016 isGrey">210048921</p>
              </div>
              <div className="C188">
                <p className="T016">
                  <span className="isUnit">AM</span> 11:30 종료.
                </p>
                <p className="T079">수술 신환 상담</p>
                <p className="T079 isBlue">상담완료</p>
                <p className="T016">
                  1시간 30분 <span className="isUnit">소요.</span>
                </p>
                <div className="C039">
                  <div className="C040"></div>
                  <p className="T081">
                    김유정<span className="isUnit">상담사</span>
                  </p>
                </div>
              </div>
            </div>
          </ScrollableContainer>
        </PopupSectionBox>
        <PopupSectionBox x={630} y={180} width={320} height={470}>
          <div className="C186">
            <div className="C184">
              <div className="C185 styleSheet isIcon isSyringe"></div>
            </div>
            <p className="T077">시술</p>
            <p className="T078">
              진행중:<span className="isBig isGreen">5</span>명 / 대기:
              <span className="isBig isWhite">1</span>명
            </p>
          </div>
          <ScrollableContainer>
            <div className="C187">
              <div className="C086">
                <p className="T041">박지영</p>
                <p className="T042 isMagenta">여성</p>
                <p className="T042 isWhite">
                  32<span className="isUnit">세</span>
                </p>
                <p className="T042 isWhite">
                  1<span className="isUnit">기</span>
                </p>
                <p className="T016 isGrey">210048921</p>
              </div>
              <div className="C188">
                <p className="T016">
                  <span className="isUnit">AM</span> 10:30 이동.
                </p>
                <p className="T079">시술 신환 상담</p>
                <p className="T079">상담대기</p>
                <p className="T080 isYellow">11분 지연.</p>
                <p className="T080">
                  (총 대기: <span className="isYellow">11분</span>)
                </p>
              </div>
            </div>
            <div className="C187">
              <div className="C086">
                <p className="T041">박지영</p>
                <p className="T042 isMagenta">여성</p>
                <p className="T042 isWhite">
                  32<span className="isUnit">세</span>
                </p>
                <p className="T042 isWhite">
                  1<span className="isUnit">기</span>
                </p>
                <p className="T016 isGrey">210048921</p>
              </div>
              <div className="C188">
                <p className="T016">
                  <span className="isUnit">AM</span> 10:30 배정.
                </p>
                <p className="T079">시술 신환 상담</p>
                <p className="T079">상담 준비중</p>
                <div className="C039">
                  <div className="C040"></div>
                  <p className="T081">
                    김유정<span className="isUnit">상담사</span>
                  </p>
                </div>
                <p className="T080 isMagenta">31분 대기.</p>
                <p className="T080">
                  (총 대기: <span className="isMagenta">41분</span>)
                </p>
              </div>
            </div>
            <div className="C187">
              <div className="C086">
                <p className="T041">박지영</p>
                <p className="T042 isMagenta">여성</p>
                <p className="T042 isWhite">
                  32<span className="isUnit">세</span>
                </p>
                <p className="T042 isWhite">
                  1<span className="isUnit">기</span>
                </p>
                <p className="T016 isGrey">210048921</p>
              </div>
              <div className="C188">
                <p className="T016">
                  <span className="isUnit">AM</span> 10:30 시작.
                </p>
                <p className="T079">시술 재환 상담</p>
                <p className="T079 isGreen">진행중</p>
                <p className="T016">
                  00:11:59.12 <span className="isUnit">경과.</span>
                </p>
                <div className="C039">
                  <div className="C040"></div>
                  <p className="T081">
                    김유정<span className="isUnit">상담사</span>
                  </p>
                </div>
                <p className="T080">- 예상: 1시간 30분</p>
              </div>
            </div>
            <div className="C187">
              <div className="C086">
                <p className="T041">박지영</p>
                <p className="T042 isMagenta">여성</p>
                <p className="T042 isWhite">
                  32<span className="isUnit">세</span>
                </p>
                <p className="T042 isWhite">
                  1<span className="isUnit">기</span>
                </p>
                <p className="T016 isGrey">210048921</p>
              </div>
              <div className="C188">
                <p className="T016">
                  <span className="isUnit">AM</span> 11:30 종료.
                </p>
                <p className="T079">수술 신환 상담</p>
                <p className="T079 isBlue">상담완료</p>
                <p className="T016">
                  1시간 30분 <span className="isUnit">소요.</span>
                </p>
                <div className="C039">
                  <div className="C040"></div>
                  <p className="T081">
                    김유정<span className="isUnit">상담사</span>
                  </p>
                </div>
              </div>
            </div>
          </ScrollableContainer>
        </PopupSectionBox>
        <PopupSectionBox x={970} y={180} width={320} height={470}>
          <div className="C186">
            <div className="C184">
              <div className="C185 styleSheet isIcon isSurgery"></div>
            </div>
            <p className="T077">수술</p>
            <p className="T078">
              진행중:<span className="isBig isGreen">5</span>명
            </p>
          </div>
          <ScrollableContainer>
            <div className="C187">
              <div className="C086">
                <p className="T041">박지영</p>
                <p className="T042 isMagenta">여성</p>
                <p className="T042 isWhite">
                  32<span className="isUnit">세</span>
                </p>
                <p className="T042 isWhite">
                  1<span className="isUnit">기</span>
                </p>
                <p className="T016 isGrey">210048921</p>
              </div>
              <div className="C188">
                <p className="T016">
                  <span className="isUnit">AM</span> 10:30 이동.
                </p>
                <p className="T079">시술 신환 상담</p>
                <p className="T079">상담대기</p>
                <p className="T080 isYellow">11분 지연.</p>
                <p className="T080">
                  (총 대기: <span className="isYellow">11분</span>)
                </p>
              </div>
            </div>
            <div className="C187">
              <div className="C086">
                <p className="T041">박지영</p>
                <p className="T042 isMagenta">여성</p>
                <p className="T042 isWhite">
                  32<span className="isUnit">세</span>
                </p>
                <p className="T042 isWhite">
                  1<span className="isUnit">기</span>
                </p>
                <p className="T016 isGrey">210048921</p>
              </div>
              <div className="C188">
                <p className="T016">
                  <span className="isUnit">AM</span> 10:30 배정.
                </p>
                <p className="T079">시술 신환 상담</p>
                <p className="T079">상담 준비중</p>
                <div className="C039">
                  <div className="C040"></div>
                  <p className="T081">
                    김유정<span className="isUnit">상담사</span>
                  </p>
                </div>
                <p className="T080 isMagenta">31분 대기.</p>
                <p className="T080">
                  (총 대기: <span className="isMagenta">41분</span>)
                </p>
              </div>
            </div>
          </ScrollableContainer>
        </PopupSectionBox>
        <PopupSectionBox
          x={1310}
          y={180}
          width={320}
          height={470}
          borderBackgroundColor="yellow-7"
        >
          <div className="C186">
            <div className="C184">
              <div className="C185 styleSheet isIcon isHourglass"></div>
            </div>
            <p className="T077">대기</p>
            <p className="T078">
              접수:<span className="isBig isWhite">5</span>명 / 보류:
              <span className="isBig isMagenta">1</span>명
            </p>
          </div>
          <ScrollableContainer>
            <div className="C187">
              <div className="C086">
                <p className="T041">박지영</p>
                <p className="T042 isMagenta">여성</p>
                <p className="T042 isWhite">
                  32<span className="isUnit">세</span>
                </p>
                <p className="T042 isWhite">
                  1<span className="isUnit">기</span>
                </p>
                <p className="T016 isGrey">210048921</p>
              </div>
              <div className="C188">
                <p className="T016">
                  <span className="isUnit">AM</span> 10:30 이동.
                </p>
                <p className="T079">시술 신환 상담</p>
                <p className="T079">상담대기</p>
                <p className="T080 isYellow">11분 지연.</p>
                <p className="T080">
                  (총 대기: <span className="isYellow">11분</span>)
                </p>
              </div>
            </div>
            <div className="C187">
              <div className="C086">
                <p className="T041">박지영</p>
                <p className="T042 isMagenta">여성</p>
                <p className="T042 isWhite">
                  32<span className="isUnit">세</span>
                </p>
                <p className="T042 isWhite">
                  1<span className="isUnit">기</span>
                </p>
                <p className="T016 isGrey">210048921</p>
              </div>
              <div className="C188">
                <p className="T016">
                  <span className="isUnit">AM</span> 10:30 배정.
                </p>
                <p className="T079">시술 신환 상담</p>
                <p className="T079">상담 준비중</p>
                <div className="C039">
                  <div className="C040"></div>
                  <p className="T081">
                    김유정<span className="isUnit">상담사</span>
                  </p>
                </div>
                <p className="T080 isMagenta">31분 대기.</p>
                <p className="T080">
                  (총 대기: <span className="isMagenta">41분</span>)
                </p>
              </div>
            </div>
            <div className="C187">
              <div className="C086">
                <p className="T041">박지영</p>
                <p className="T042 isMagenta">여성</p>
                <p className="T042 isWhite">
                  32<span className="isUnit">세</span>
                </p>
                <p className="T042 isWhite">
                  1<span className="isUnit">기</span>
                </p>
                <p className="T016 isGrey">210048921</p>
              </div>
              <div className="C188">
                <p className="T016">
                  <span className="isUnit">AM</span> 10:30 시작.
                </p>
                <p className="T079">시술 재환 상담</p>
                <p className="T079 isGreen">진행중</p>
                <p className="T016">
                  00:11:59.12 <span className="isUnit">경과.</span>
                </p>
                <div className="C039">
                  <div className="C040"></div>
                  <p className="T081">
                    김유정<span className="isUnit">상담사</span>
                  </p>
                </div>
                <p className="T080">- 예상: 1시간 30분</p>
              </div>
            </div>
            <div className="C187">
              <div className="C086">
                <p className="T041">박지영</p>
                <p className="T042 isMagenta">여성</p>
                <p className="T042 isWhite">
                  32<span className="isUnit">세</span>
                </p>
                <p className="T042 isWhite">
                  1<span className="isUnit">기</span>
                </p>
                <p className="T016 isGrey">210048921</p>
              </div>
              <div className="C188">
                <p className="T016">
                  <span className="isUnit">AM</span> 11:30 종료.
                </p>
                <p className="T079">수술 신환 상담</p>
                <p className="T079 isBlue">상담완료</p>
                <p className="T016">
                  1시간 30분 <span className="isUnit">소요.</span>
                </p>
                <div className="C039">
                  <div className="C040"></div>
                  <p className="T081">
                    김유정<span className="isUnit">상담사</span>
                  </p>
                </div>
              </div>
            </div>
          </ScrollableContainer>
        </PopupSectionBox>
        <PopupSectionBox x={630} y={670} width={320} height={470}>
          <div className="C186">
            <div className="C184">
              <div className="C185 styleSheet isIcon isClinic"></div>
            </div>
            <p className="T077">진료</p>
            <p className="T078">
              대기:
              <span className="isBig isWhite">1</span>명
            </p>
          </div>
          <ScrollableContainer>
            <div className="C187">
              <div className="C086">
                <p className="T041">박지영</p>
                <p className="T042 isMagenta">여성</p>
                <p className="T042 isWhite">
                  32<span className="isUnit">세</span>
                </p>
                <p className="T042 isWhite">
                  1<span className="isUnit">기</span>
                </p>
                <p className="T016 isGrey">210048921</p>
              </div>
              <div className="C188">
                <p className="T016">
                  <span className="isUnit">AM</span> 10:30 이동.
                </p>
                <p className="T079">시술 신환 상담</p>
                <p className="T079">상담대기</p>
                <p className="T080 isYellow">11분 지연.</p>
                <p className="T080">
                  (총 대기: <span className="isYellow">11분</span>)
                </p>
              </div>
            </div>
            <div className="C187">
              <div className="C086">
                <p className="T041">박지영</p>
                <p className="T042 isMagenta">여성</p>
                <p className="T042 isWhite">
                  32<span className="isUnit">세</span>
                </p>
                <p className="T042 isWhite">
                  1<span className="isUnit">기</span>
                </p>
                <p className="T016 isGrey">210048921</p>
              </div>
              <div className="C188">
                <p className="T016">
                  <span className="isUnit">AM</span> 10:30 배정.
                </p>
                <p className="T079">시술 신환 상담</p>
                <p className="T079">상담 준비중</p>
                <div className="C039">
                  <div className="C040"></div>
                  <p className="T081">
                    김유정<span className="isUnit">상담사</span>
                  </p>
                </div>
                <p className="T080 isMagenta">31분 대기.</p>
                <p className="T080">
                  (총 대기: <span className="isMagenta">41분</span>)
                </p>
              </div>
            </div>
          </ScrollableContainer>
        </PopupSectionBox>
        <PopupSectionBox x={970} y={670} width={320} height={470}>
          <div className="C186">
            <div className="C184">
              <div className="C185 styleSheet isIcon isCoin"></div>
            </div>
            <p className="T077">수납</p>
            <p className="T078">
              완료:<span className="isBig isBlue">5</span>명 / 대기:
              <span className="isBig isWhite">1</span>명
            </p>
          </div>
          <ScrollableContainer>
            <div className="C187">
              <div className="C086">
                <p className="T041">박지영</p>
                <p className="T042 isMagenta">여성</p>
                <p className="T042 isWhite">
                  32<span className="isUnit">세</span>
                </p>
                <p className="T042 isWhite">
                  1<span className="isUnit">기</span>
                </p>
                <p className="T016 isGrey">210048921</p>
              </div>
              <div className="C188">
                <p className="T016">
                  <span className="isUnit">AM</span> 10:30 이동.
                </p>
                <p className="T079">시술 신환 상담</p>
                <p className="T079">상담대기</p>
                <p className="T080 isYellow">11분 지연.</p>
                <p className="T080">
                  (총 대기: <span className="isYellow">11분</span>)
                </p>
              </div>
            </div>
            <div className="C187">
              <div className="C086">
                <p className="T041">박지영</p>
                <p className="T042 isMagenta">여성</p>
                <p className="T042 isWhite">
                  32<span className="isUnit">세</span>
                </p>
                <p className="T042 isWhite">
                  1<span className="isUnit">기</span>
                </p>
                <p className="T016 isGrey">210048921</p>
              </div>
              <div className="C188">
                <p className="T016">
                  <span className="isUnit">AM</span> 10:30 배정.
                </p>
                <p className="T079">시술 신환 상담</p>
                <p className="T079">상담 준비중</p>
                <div className="C039">
                  <div className="C040"></div>
                  <p className="T081">
                    김유정<span className="isUnit">상담사</span>
                  </p>
                </div>
                <p className="T080 isMagenta">31분 대기.</p>
                <p className="T080">
                  (총 대기: <span className="isMagenta">41분</span>)
                </p>
              </div>
            </div>
            <div className="C187">
              <div className="C086">
                <p className="T041">박지영</p>
                <p className="T042 isMagenta">여성</p>
                <p className="T042 isWhite">
                  32<span className="isUnit">세</span>
                </p>
                <p className="T042 isWhite">
                  1<span className="isUnit">기</span>
                </p>
                <p className="T016 isGrey">210048921</p>
              </div>
              <div className="C188">
                <p className="T016">
                  <span className="isUnit">AM</span> 10:30 시작.
                </p>
                <p className="T079">시술 재환 상담</p>
                <p className="T079 isGreen">진행중</p>
                <p className="T016">
                  00:11:59.12 <span className="isUnit">경과.</span>
                </p>
                <div className="C039">
                  <div className="C040"></div>
                  <p className="T081">
                    김유정<span className="isUnit">상담사</span>
                  </p>
                </div>
                <p className="T080">- 예상: 1시간 30분</p>
              </div>
            </div>
          </ScrollableContainer>
        </PopupSectionBox>
        <PopupSectionBox
          x={1310}
          y={670}
          width={320}
          height={470}
          borderBackgroundColor="magenta-7"
        >
          <div className="C186">
            <div className="C184 isMagenta">
              <div className="C185 isIMaskMagenta isAlert"></div>
            </div>
            <p className="T077">장시간 대기 고객</p>
            <p className="T078">
              <span className="isBig isMagenta">2</span>명
            </p>
          </div>
          <ScrollableContainer>
            <div className="C187">
              <div className="C086">
                <p className="T041">박지영</p>
                <p className="T042 isMagenta">여성</p>
                <p className="T042 isWhite">
                  32<span className="isUnit">세</span>
                </p>
                <p className="T042 isWhite">
                  1<span className="isUnit">기</span>
                </p>
                <p className="T016 isGrey">210048921</p>
              </div>
              <div className="C188">
                <p className="T016">
                  <span className="isUnit">AM</span> 10:30 이동.
                </p>
                <p className="T079">시술 신환 상담</p>
                <p className="T079">상담대기</p>
                <p className="T080 isYellow">11분 지연.</p>
                <p className="T080">
                  (총 대기: <span className="isYellow">11분</span>)
                </p>
              </div>
            </div>
            <div className="C187">
              <div className="C086">
                <p className="T041">박지영</p>
                <p className="T042 isMagenta">여성</p>
                <p className="T042 isWhite">
                  32<span className="isUnit">세</span>
                </p>
                <p className="T042 isWhite">
                  1<span className="isUnit">기</span>
                </p>
                <p className="T016 isGrey">210048921</p>
              </div>
              <div className="C188">
                <p className="T016">
                  <span className="isUnit">AM</span> 10:30 배정.
                </p>
                <p className="T079">시술 신환 상담</p>
                <p className="T079">상담 준비중</p>
                <div className="C039">
                  <div className="C040"></div>
                  <p className="T081">
                    김유정<span className="isUnit">상담사</span>
                  </p>
                </div>
                <p className="T080 isMagenta">31분 대기.</p>
                <p className="T080">
                  (총 대기: <span className="isMagenta">41분</span>)
                </p>
              </div>
            </div>
            <div className="C187">
              <div className="C086">
                <p className="T041">박지영</p>
                <p className="T042 isMagenta">여성</p>
                <p className="T042 isWhite">
                  32<span className="isUnit">세</span>
                </p>
                <p className="T042 isWhite">
                  1<span className="isUnit">기</span>
                </p>
                <p className="T016 isGrey">210048921</p>
              </div>
              <div className="C188">
                <p className="T016">
                  <span className="isUnit">AM</span> 10:30 시작.
                </p>
                <p className="T079">시술 재환 상담</p>
                <p className="T079 isGreen">진행중</p>
                <p className="T016">
                  00:11:59.12 <span className="isUnit">경과.</span>
                </p>
                <div className="C039">
                  <div className="C040"></div>
                  <p className="T081">
                    김유정<span className="isUnit">상담사</span>
                  </p>
                </div>
                <p className="T080">- 예상: 1시간 30분</p>
              </div>
            </div>
            <div className="C187">
              <div className="C086">
                <p className="T041">박지영</p>
                <p className="T042 isMagenta">여성</p>
                <p className="T042 isWhite">
                  32<span className="isUnit">세</span>
                </p>
                <p className="T042 isWhite">
                  1<span className="isUnit">기</span>
                </p>
                <p className="T016 isGrey">210048921</p>
              </div>
              <div className="C188">
                <p className="T016">
                  <span className="isUnit">AM</span> 11:30 종료.
                </p>
                <p className="T079">수술 신환 상담</p>
                <p className="T079 isBlue">상담완료</p>
                <p className="T016">
                  1시간 30분 <span className="isUnit">소요.</span>
                </p>
                <div className="C039">
                  <div className="C040"></div>
                  <p className="T081">
                    김유정<span className="isUnit">상담사</span>
                  </p>
                </div>
              </div>
            </div>
          </ScrollableContainer>
        </PopupSectionBox>
      </Popup>

      <MenuSearchPopup
        isOpen={isMenuSearchPopupOpen}
        onClose={() => setIsMenuSearchPopupOpen(false)}
      />
      <ReservationServicePopup
        isOpen={isReservationPopupOpen}
        onClose={() => setIsReservationPopupOpen(false)}
      />
    </>
  );
}
