// 패키지(수술 패키지) 관련 공용 타입 정의

export interface PackageBody {
  title: string;
  spec: string;
  type: string;
  count: string;
}

export interface PackageHeader {
  part: string;
  code: string;
  grcode: string;
  partClass: string;
}

export interface PackageItemStats {
  /** 수술방법 */
  method?: string;
  /** 특진비율 */
  specialRate?: number;
  /** 지방경도 레벨 (1-5) */
  fatLevel?: number;
  /** 시술횟수 */
  procedureCount?: number;
}

export interface PackageItemPayment {
  /** 계약금 */
  contractAmount?: number;
  /** 예약금 */
  reservationAmount?: number;
  /** 할인율 */
  discountRate?: number;
  /** 할인액 */
  discountAmount?: number;
}

export interface PackageItemData {
  defaultFolded: boolean;
  header: PackageHeader;
  body: PackageBody;
  stats: Required<PackageItemStats>;
  payment: Required<PackageItemPayment>;
}

/** 패키지 메모/이력 항목 */
export interface PackageItemNote {
  /** 날짜 (예: "25.08.23") */
  date: string;
  /** 내용 (예: "스킨 대체 후 차액 60,200원") */
  content: string;
  /** 입력자 이름 */
  authorName: string;
  /** 입력자 직책 (예: "간호사") */
  authorTitle: string;
  /** 입력자 프로필 이미지 URL (선택사항) */
  authorImageUrl?: string;
}
