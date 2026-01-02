"use client";

/**
 * PaymentCard Component
 *
 * @description 수납 내역 카드 컴포넌트
 * @component
 */

export interface PaymentCardProps {
  date: string; // YYYY.MM.DD
  time: string; // AM/PM HH:MM
  packageNumber?: number; // 기수 (n기)
  isSelected?: boolean;
  status?: "today" | "refunded" | "refund-info" | null;
  refundDate?: string; // 환불 일시 (status가 'refund-info'일 때 사용)
  refundTime?: string; // 환불 시간 (status가 'refund-info'일 때 사용)
  onClick?: () => void;
  style?: React.CSSProperties;
}

/**
 * 수납 내역 카드 컴포넌트
 */
export default function PaymentCard({
  date,
  time,
  packageNumber,
  isSelected = false,
  status = null,
  refundDate,
  refundTime,
  onClick,
  style,
}: PaymentCardProps) {
  const isRefundInfo = status === "refund-info";

  const statusClass = status
    ? status === "refund-info"
      ? "isRefundinfo"
      : `is${status.charAt(0).toUpperCase() + status.slice(1)}`
    : "";

  const cardStyle = isRefundInfo
    ? {
        position: "absolute" as const,
        left: "var(--size-20)",
        top: "calc(var(--size-150) - var(--size-15))",
        ...style,
      }
    : style;

  return (
    <div
      className={`C2111 ${isSelected ? "isSelected" : ""} ${statusClass}`}
      onClick={onClick}
      style={cardStyle}
    >
      {/* 상태 배지 */}
      {status === "today" && (
        <div className="C2112 isToday">
          <p className="T2106">오늘</p>
        </div>
      )}
      {status === "refunded" && (
        <div className="C2112 isRefunded">
          <p className="T2106">환불</p>
        </div>
      )}

      {/* 구분선 */}
      <div className="C2113"></div>

      {/* 컨텐츠 영역 */}
      <div className="C2114">
        {isRefundInfo ? (
          <>
            <p className="T2107">환불 일시</p>
            <p className="T2108">
              <span className="T2108Year">{refundDate?.split('.')[0]}.</span>
              <span className="T2108Date">{refundDate?.split('.').slice(1).join('.')}</span>
            </p>
            <p className="T2109">
              <span className="T2109Period">{refundTime?.split(' ')[0]}</span>
              <span className="T2109Time"> {refundTime?.split(' ')[1]}</span>
            </p>
          </>
        ) : (
          <>
            <p className="T2108">
              <span className="T2108Year">{date.split('.')[0]}.</span>
              <span className="T2108Date">{date.split('.').slice(1).join('.')}</span>
            </p>
            <p className="T2109">
              <span className="T2109Period">{time.split(' ')[0]}</span>
              <span className="T2109Time"> {time.split(' ')[1]}</span>
            </p>
            {packageNumber !== undefined && (
              <div className="C2115">
                <p className="T2110">
                  <span className="T2111">{packageNumber}</span>
                  <span className="T2112">기</span>
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

