"use client";

import { useState, useMemo } from "react";
import PopupSectionBox from "@/components/PopupSectionBox";
import AuthorInfo from "@/components/AuthorInfo";
import CustomerInfo from "@/components/CustomerInfo";
import RoomAssignment, { type RoomData } from "@/components/consultation/RoomAssignment";
import ReservationStatusCard from "@/components/consultation/ReservationStatusCard";

/**
 * StatusManagementPopup Component
 *
 * @description 상태관리 팝업 컴포넌트입니다.
 *
 * @component
 */

import type { StatusManagementPopupProps } from "@/types/popups";

/**
 * 상태관리 팝업 컴포넌트
 */
export default function StatusManagementPopup({
  onClose,
}: StatusManagementPopupProps) {
  const [isCustomerBasicInfoPopupOpen, setIsCustomerBasicInfoPopupOpen] =
    useState(false);
  const [isShowAvailableOnly, setIsShowAvailableOnly] = useState(true);
  const [isShowAvailableOnly2, setIsShowAvailableOnly2] = useState(true);

  // 진료실 이름 목록
  const treatmentRoomNames = [
    "TR 3층-4",
    "TR 3층-5",
    "TF 3층-7",
    "경상 주사처치 (3618)",
    "경상 3층-3615",
    "경상 3층-3614",
    "경상 2층-3619",
    "경상 2층-3631",
    "경상 4층-3620",
    "외래이동",
  ];

  // 진료실 이름을 랜덤으로 섞기 (컴포넌트 마운트 시 한 번만 실행)
  const shuffledTreatmentRoomNames = useMemo(() => {
    const shuffled = [...treatmentRoomNames];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  // 진료실 배정 데이터 생성 (10개, 현재 상태 제외)
  const treatmentRooms: RoomData[] = useMemo(() => {
    const statuses: Array<"inProgress" | "selectable"> = [
      "inProgress",
      "inProgress",
      "selectable",
      "selectable",
      "selectable",
      "selectable",
      "selectable",
      "selectable",
      "selectable",
      "selectable",
    ];
    
    // 상태도 랜덤으로 섞기
    for (let i = statuses.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [statuses[i], statuses[j]] = [statuses[j], statuses[i]];
    }

    return shuffledTreatmentRoomNames.map((roomName, index) => {
      const status = statuses[index];
      const room: RoomData = {
        roomNumber: roomName,
        mainUser: "주사용자: 나혜영 (qdfsd1)",
        status: status,
        onClick: () => console.log(`${roomName} 선택`),
      };

      // 진행중 상태일 때만 환자 정보 추가
      if (status === "inProgress") {
        room.patientInfo = {
          name: "신수빈",
          gender: "여성",
          age: 32,
          packageNumber: 1,
          customerId: "210047938",
          time: "PM 12:30 ~",
          responsible: "나혜영",
          consultationType: "수술신환상담",
        };
      }

      return room;
    });
  }, [shuffledTreatmentRoomNames]);

  // 상담실 데이터 (예시)
  const rooms: RoomData[] = [
    {
      roomNumber: "제1상담실",
      mainUser: "주사용자: 나혜영 (qdfsd1)",
      status: "inProgress",
      patientInfo: {
        name: "신수빈",
        gender: "여성",
        age: 32,
        packageNumber: 1,
        customerId: "210047938",
        time: "PM 12:30 ~",
        responsible: "나혜영",
        consultationType: "수술신환상담",
      },
    },
    {
      roomNumber: "제2상담실",
      mainUser: "주사용자: 김란주 (qdfsd1)",
      status: "selectable",
      onClick: () => console.log("제2상담실 선택"),
    },
    {
      roomNumber: "제3상담실",
      mainUser: "주사용자: 김란주 (qdfsd1)",
      status: "selectable",
      onClick: () => console.log("제3상담실 선택"),
    },
    {
      roomNumber: "제4상담실",
      mainUser: "주사용자: 나혜영 (qdfsd1)",
      status: "inProgress",
      patientInfo: {
        name: "신수빈",
        gender: "여성",
        age: 32,
        packageNumber: 1,
        customerId: "210047938",
        time: "PM 12:30 ~",
        responsible: "나혜영",
        consultationType: "수술신환상담",
      },
    },
    {
      roomNumber: "제5상담실",
      mainUser: "주사용자: 김란주 (qdfsd1)",
      status: "selectable",
      onClick: () => console.log("제5상담실 선택"),
    },
    {
      roomNumber: "제6상담실",
      mainUser: "주사용자: 김란주 (qdfsd1)",
      status: "selectable",
      onClick: () => console.log("제6상담실 선택"),
    },
    {
      roomNumber: "제7상담실",
      mainUser: "주사용자: 나혜영 (qdfsd1)",
      status: "current",
      patientInfo: {
        name: "신수빈",
        gender: "여성",
        age: 32,
        packageNumber: 1,
        customerId: "210047938",
        time: "PM 12:30 ~",
        responsible: "나혜영",
        consultationType: "수술신환상담",
      },
      onClick: () => console.log("제7상담실 선택"),
    },
    {
      roomNumber: "제8상담실",
      mainUser: "주사용자: 김란주 (qdfsd1)",
      status: "selectable",
      onClick: () => console.log("제8상담실 선택"),
    },
    {
      roomNumber: "제9상담실",
      mainUser: "주사용자: 김란주 (qdfsd1)",
      status: "selectable",
      onClick: () => console.log("제9상담실 선택"),
    },
    {
      roomNumber: "제10상담실",
      mainUser: "주사용자: 김란주 (qdfsd1)",
      status: "selectable",
      onClick: () => console.log("제10상담실 선택"),
    },
  ];

  return (
    <>
      <PopupSectionBox x={1270} y={40} width={580} height={100}>
        <div className="C180">
        <p className="T076">상담 상태 변경</p>
        <AuthorInfo
            imageSrc="/images/male-64.jpg"
            imageAlt="작성자"
            label="작성자"
            name="홍성훈"
            title="원장님"
          />
           <div className="C181 isCloseButton" onClick={onClose}>
            <div className="C179 isDepth1"></div>
            <div className="C182 styleSheet isIcon isBig isClose isWhite"></div>
          </div>
        </div>
      </PopupSectionBox>
      <PopupSectionBox x={1270} y={160} width={580} height={100}>
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
      <PopupSectionBox x={1270} y={280} width={580} height={760}>
        <div className="C2099">
          <ReservationStatusCard
            statusTitle="예약 상담대기 (1층)"
            count={7}
            names={[
              { name: "김", color: "magenta" },
              { name: "이", color: "blue" },
              { name: "박", color: "magenta" },
              { name: "최", color: "blue" },
              { name: "김", color: "magenta" },
              { name: "이", color: "magenta" },
              { name: "박", color: "magenta" },
            ]}
            onClick={() => console.log("예약 상담대기 (1층) 선택")}
          />
          <ReservationStatusCard
            statusTitle="예약 상담준비중 (13층)"
            count={3}
            names={[
              { name: "윤", color: "magenta" },
              { name: "장", color: "magenta" },
              { name: "임", color: "magenta" },
            ]}
           
            onClick={() => console.log("예약 상담준비중 (13층) 선택")}
          />
          <ReservationStatusCard
            statusTitle="예약 상담준비완료 (3층)"
            count={0}
            onClick={() => console.log("예약 상담대기 (2층) 선택")}
          />
          <ReservationStatusCard
            statusTitle="경상 대기"
            count={3}
            names={[
              { name: "김", color: "magenta" },
              { name: "이", color: "blue" },
              { name: "임", color: "magenta" },
            ]}

            onClick={() => console.log("예약 상담준비중 (3층) 선택")}
          />
          <ReservationStatusCard
            statusTitle="시술 상담준비중"
            count={0}
          
            onClick={() => console.log("예약 상담대기 (4층) 선택")}
          />
          <ReservationStatusCard
            statusTitle="시술 상담준비완료"
            count={4}
           
            onClick={() => console.log("예약 상담준비중 (5층) 선택")}
          />
          <ReservationStatusCard
            statusTitle="체비 상담대기"
            count={0}
            
            onClick={() => console.log("예약 상담대기 (6층) 선택")}
          />
          <ReservationStatusCard
            statusTitle="예약 상담준비중 (7층)"
            count={0}
           
            onClick={() => console.log("예약 상담준비중 (7층) 선택")}
          />
        
        </div>
      </PopupSectionBox>

      <PopupSectionBox x={1270} y={1060} width={580} height={100}>
        <div className="C180 isButtonContainer">
          <button className="C2075">
            <div className="C2076">
              <div className="C2077 styleSheet isIcon isBig isTrash isWhite"></div>
            </div>
            <span className="T2073">접수 삭제</span>
          </button>
        </div>
      </PopupSectionBox>

      <PopupSectionBox x={670} y={40} width={580} height={1120} innerClassName="C2097">
      <div className="C2097">
          <div className="C2083">
            <div className="C2081">
              <p className="T098">진료실 배정</p>
            
            <div 
              className={`C2078 ${!isShowAvailableOnly2 ? "isUnChecked" : ""}`}
              onClick={() => setIsShowAvailableOnly2(!isShowAvailableOnly2)}
              style={{ cursor: "pointer" }}
            >
              <div 
                className="C2079" 
                style={{ 
                  boxShadow: "none", 
                  backgroundColor: isShowAvailableOnly2 ? "var(--color-white)" : "var(--color-white-15)"
                }}
              >
                <div className={`C2080 ${isShowAvailableOnly2 ? "isIMaskGreen isIcon isMini isCheckedBold" : "isIcon isMini"}`}>
                </div>
              </div>
              <p className="T2074">사용 가능한 곳만 보기</p>
            </div>
            </div>
            

            <div className="C2082">
              <RoomAssignment rooms={treatmentRooms} showAvailableOnly={isShowAvailableOnly2} excludeCurrent={true} />
            </div>
          </div>
        </div>
      </PopupSectionBox>
      
      <PopupSectionBox x={70} y={40} width={580} height={1120} innerClassName="C2097">
        <div className="C2097">
          <div className="C2083">
            <div className="C2081">
              <p className="T098">상담실 배정</p>
              
              <div 
                className={`C2078 ${!isShowAvailableOnly ? "isUnChecked" : ""}`}
                onClick={() => setIsShowAvailableOnly(!isShowAvailableOnly)}
                style={{ cursor: "pointer" }}
              >
                <div 
                  className="C2079" 
                  style={{ 
                    boxShadow: "none", 
                    backgroundColor: isShowAvailableOnly ? "var(--color-white)" : "var(--color-white-15)"
                  }}
                >
                  <div className={`C2080 ${isShowAvailableOnly ? "isIMaskGreen isIcon isMini isCheckedBold" : "isIcon isMini"}`}>
                  </div>
                </div>
                <p className="T2074">사용 가능한 곳만 보기</p>
              </div>

            </div>
            
            <div className="C2082">
              <RoomAssignment rooms={rooms} showAvailableOnly={isShowAvailableOnly} />
            </div>
          </div>
        </div>
      </PopupSectionBox>
    </>
  );
}
