"use client";

/**
 * TargetPackageCard Component
 *
 * @description 대상 패키지 목록의 개별 카드 컴포넌트
 * @component
 */

export interface TargetPackageCardProps {
  /** 체크 상태 */
  checked?: boolean;
  /** 체크 상태 변경 핸들러 */
  onCheckChange?: (checked: boolean) => void;
  /** 수납 대상 여부 */
  isTarget?: boolean;
  /** 수술 부위 이미지 아이콘 클래스 */
  partIcon?: string;
  /** 카테고리 (예: "수술 복부") */
  category: string;
  /** 상세 명칭 (예: "무한 복부 위아래 + 러브 + 옆구리(앞)") */
  detailName: string;
  /** 스펙 정보 (예: "B2(62~64.8cm이하)") */
  spec?: string;
  /** 타입 (예: "병행") */
  type?: string;
  /** 적용상태 (예: "진행") */
  applicationStatus: string;
  /** 시술횟수 (예: 3) */
  procedureCount: number;
  /** 관리 코드 (예: "CODE: FAT242 / GRCODE: D088") */
  code: string;
  /** 원금액 */
  originalPrice: number;
  /** 할인액 */
  discountPrice: number;
  /** 실천지수 */
  practiceIndex: number;
  /** 예약금 */
  deposit: number;
  /** 잔액 */
  balance: number;
  /** 결제완료 금액 */
  paidAmount: number;
  /** 상태 (예: "수납대상", "결제완료") */
  status?: "수납대상" | "결제완료";
  /** 클릭 핸들러 */
  onClick?: () => void;
}

/**
 * 대상 패키지 카드 컴포넌트
 */
export default function TargetPackageCard({
  checked = false,
  onCheckChange,
  isTarget = false,
  partIcon = "isIcon",
  category,
  detailName,
  spec,
  type,
  applicationStatus,
  procedureCount,
  code,
  originalPrice,
  discountPrice,
  practiceIndex,
  deposit,
  balance,
  paidAmount,
  status,
  onClick,
}: TargetPackageCardProps) {
  const handleCheckChange = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCheckChange?.(!checked);
  };

  // 금액 포맷팅
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  // 퍼센트 계산 (원금액 기준)
  const balancePercentage = originalPrice > 0 ? (balance / originalPrice) * 100 : 0;
  const discountPercentage = originalPrice > 0 && discountPrice < 0 ? (Math.abs(discountPrice) / originalPrice) * 100 : 0;
  const practiceIndexPercentage = originalPrice > 0 && practiceIndex < 0 ? (Math.abs(practiceIndex) / originalPrice) * 100 : 0;
  const paidPercentage = originalPrice > 0 ? (paidAmount / originalPrice) * 100 : 0;

  return (
    <div
      className={`C2119 ${isTarget ? "isTarget" : ""} ${checked ? "isChecked" : ""}`}
      onClick={onClick}
      style={onClick ? { cursor: "pointer" } : undefined}
    >
      {status === "수납대상" && (
        <p className="C2130">
          <span className="T2120">수납 대상</span>
        </p>
      )}
      {/* Section 1: 선택 및 식별 (넓이 80px) */}
      <div className="C2120">
        <div className="C2121" onClick={handleCheckChange}>
          <div className="C2122">
            <div
              className={`C2123 ${
                checked
                  ? "isIMaskGreen isIcon isMini isCheckedBold"
                  : "isIcon isMini"
              }`}
            ></div>
          </div>
        </div>
        <div className={`C2124 ${partIcon}`}></div>
      </div>

      {/* Section 2: 패키지 정보 (넓이 340px, 오른쪽에 선으로 구분) */}
      <div className="C2125">
        {/* 첫번째줄: 수술 복부 (17pt, left 0) + 코드 정보 (14pt, right 20) */}
        <div className="C2137">
          <p className="T2123">
            <span className="T2124">{category.split(' ')[0]}</span>
            <span className="T2125"> {category.split(' ')[1]}</span>
          </p>
          <p className="T2126">{code}</p>
        </div>

        {/* 두번째줄: 무한(화이트50% + 백그라운드7%) + 상세명칭(화이트100%) */}
        <p className="T2127">
          {detailName.startsWith('무한') ? (
            <>
              <span className="T2128">무한</span>
              <span className="T2129"> {detailName.replace('무한', '')}</span>
            </>
          ) : (
            <span className="T2129">{detailName}</span>
          )}
        </p>

        {/* 세번째줄: 스펙 & 타입 (화이트50% + 백그라운드7%, 간격 5) */}
        {spec && type && (
          <p className="T2130">
            <span className="T2131">{spec}</span>
            <span className="T2132"> &amp; {type}</span>
          </p>
        )}

        {/* 네번째줄: 적용상태, 시술횟수 (14pt, 한 줄에 나란히) */}
        <div className="C2138">
          <p className="T2133">
            적용상태: <span className="T2134">{applicationStatus}</span>
          </p>
          <p className="T2133">
            시술횟수: <span className="T2134">{procedureCount}</span><span className="T2135">회</span>
          </p>
        </div>
        <div className="C2126"></div>
      </div>

      {/* Section 3: 수납 금액 정보 (넓이 340px) */}
      <div className="C2127">
        <p className="T2136">수납정보</p>
        <div className="C2128">
          <p className="T2118">원금액:</p>
          <p className="T2119">{formatPrice(originalPrice)}<span className="T2137">원</span></p>
        </div>
        <div className="C2128">
          <p className="T2118">할인액:</p>
          <p className="T2138">{formatPrice(discountPrice)}<span className="T2137">원</span></p>
        </div>
        <div className="C2128">
          <p className="T2118">실천지수:</p>
          <p className="T2139">{formatPrice(practiceIndex)}<span className="T2137">원</span></p>
        </div>
        <div className="C2128">
          <p className="T2118">예약금:</p>
          <p className="T2119">{formatPrice(deposit)}<span className="T2137">원</span></p>
        </div>
        <div className="C2128">
          <p className="T2118">잔액:</p>
          <p className="T2140">{formatPrice(balance)}<span className="T2137">원</span></p>
        </div>
        <div className="C2128">
          <p className="T2118">결제완료:</p>
          <p className="T2141">{formatPrice(paidAmount)}<span className="T2137">원</span></p>
        </div>
      </div>

      {/* Section 4: 통계 및 상태 (넓이 290px) */}
      <div className="C2129">
        {/* 통계 정보 */}
        {balancePercentage > 0 && (
          <p className="T2122">잔액: {balancePercentage.toFixed(1)}%</p>
        )}
        {discountPercentage > 0 && (
          <p className="T2122">할인액: {discountPercentage.toFixed(1)}%</p>
        )}
        {practiceIndexPercentage > 0 && (
          <p className="T2122">실천지수: {practiceIndexPercentage.toFixed(1)}%</p>
        )}

        {/* 막대 그래프 */}
        <div className="C2132">
          <div className="C2133" style={{ width: `${paidPercentage}%` }}></div>
          {discountPercentage > 0 && (
            <div className="C2134" style={{ width: `${discountPercentage}%` }}></div>
          )}
          {practiceIndexPercentage > 0 && (
            <div className="C2135" style={{ width: `${practiceIndexPercentage}%` }}></div>
          )}
          <div className="C2136" style={{ width: `${balancePercentage}%` }}></div>
        </div>
      </div>
    </div>
  );
}

