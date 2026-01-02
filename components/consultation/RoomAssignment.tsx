"use client";

import RoomCard, { type RoomStatus } from "./RoomCard";

/**
 * RoomAssignment Component
 *
 * @description 상담실 배정 페이지의 메인 컴포넌트
 * @component
 */

export interface RoomData {
  roomNumber: string;
  mainUser: string;
  status: RoomStatus;
  patientInfo?: {
    name: string;
    gender: string;
    age: number;
    packageNumber: number;
    customerId: string;
    time?: string;
    responsible?: string;
    consultationType?: string;
  };
  onClick?: () => void;
}

export interface RoomAssignmentProps {
  /** 상담실 데이터 배열 */
  rooms: RoomData[];
  /** 사용 가능한 곳만 보기 (진행중 카드 제외) */
  showAvailableOnly?: boolean;
  /** 현재 상태 카드 제외 */
  excludeCurrent?: boolean;
}

/**
 * 상담실 배정 컴포넌트
 */
export default function RoomAssignment({ rooms, showAvailableOnly = false, excludeCurrent = false }: RoomAssignmentProps) {
  const renderPatientInfo = (patientInfo: RoomData["patientInfo"]) => {
    if (!patientInfo) return null;

    return (
      <div className="C2091">
        <div className="C2093">
          <span className="T2089">{patientInfo.name}</span>
          <span className="C2094">
            <span className="T2090">{patientInfo.gender}</span>
          </span>
          <span className="C2095">
            <span className="T2091">{patientInfo.age}</span>
            <span className="T2092">세</span>
          </span>
          <span className="C2095">
            <span className="T2091">{patientInfo.packageNumber}</span>
            <span className="T2092">기</span>
          </span>
          <span className="T2093">{patientInfo.customerId}</span>
        </div>
        {patientInfo.time && patientInfo.responsible && patientInfo.consultationType && (
          <p className="T2088">
            {(() => {
              // 시간 파싱: "PM 12:30 ~" -> "PM", "12:30", "~"
              const timeMatch = patientInfo.time.match(/^(AM|PM)\s+(\d{1,2}:\d{2})\s*(~)?/);
              if (timeMatch) {
                const [, period, time, tilde] = timeMatch;
                return (
                  <>
                    <span className="T2094">{period}</span>{" "}
                    <span className="T2095">{time}</span>
                    {tilde && <span className="T2094"> {tilde}</span>}
                  </>
                );
              }
              return patientInfo.time;
            })()}
            {" "}
            <span className="T2096">(진행중)</span>{" "}
            <span className="T2094">담당:</span>{" "}
            <span className="T2095">{patientInfo.responsible}</span>{" "}
            <span className="C2096">
              <span className="T2097">{patientInfo.consultationType}</span>
            </span>
          </p>
        )}
      </div>
    );
  };

  // 필터링 로직
  let filteredRooms = rooms;
  
  // showAvailableOnly가 true일 때 진행중 카드 제외
  if (showAvailableOnly) {
    filteredRooms = filteredRooms.filter((room) => room.status !== "inProgress");
  }
  
  // excludeCurrent가 true일 때 현재 상태 카드 제외
  if (excludeCurrent) {
    filteredRooms = filteredRooms.filter((room) => room.status !== "current");
  }

  return (
    <div className="C2092">
      {filteredRooms.map((room, index) => (
        <RoomCard
          key={index}
          roomNumber={room.roomNumber}
          mainUser={room.mainUser}
          status={room.status}
          patientInfo={room.patientInfo ? renderPatientInfo(room.patientInfo) : undefined}
          onClick={room.onClick}
        />
      ))}
    </div>
  );
}

