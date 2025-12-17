"use client";

import { TimelineViewMode } from "@/types/timeline";
import PackageItem from "@/components/PackageItem";
import { PackageItemData } from "@/types/package";
import EmployeeBadge from "@/components/EmployeeBadge";

interface VisitLogContentProps {
  viewMode: TimelineViewMode;
  title: string;
  showFutureSchedule?: boolean;
  selectedPackageId?: string;
}

// 패키지 ID별 C132 카드 데이터 (하드코딩 더미 데이터)
const PACKAGE_ITEMS_BY_ID: Record<string, PackageItemData[]> = {
  "package-3": [
    {
      // 기본값: 접힌 상태 (isFolded)
      defaultFolded: true,
      header: {
        part: "허벅지",
        code: "FAT242",
        grcode: "D088",
        partClass: "isThigh",
      },
      body: {
        title: "러브핸들 지방흡입 + 허리 라인 교정",
        spec: "B2(62~64.8cm이하)",
        type: "병행",
        count: "무한",
      },
      stats: {
        method: "일반",
        specialRate: 0,
        fatLevel: 0,
        procedureCount: 2,
      },
      payment: {
        contractAmount: 5000000,
        reservationAmount: 500000,
        discountRate: 10.13,
        discountAmount: 50000,
      },
    },
    {
      defaultFolded: false,
      header: {
        part: "얼굴",
        code: "FAC101",
        grcode: "A015",
        partClass: "isFace",
      },
      body: {
        title: "이중턱 지방흡입 + V라인 성형",
        spec: "A1(55cm이하)",
        type: "단독",
        count: "3회",
      },
      stats: {
        method: "특수",
        specialRate: 15,
        fatLevel: 2,
        procedureCount: 3,
      },
      payment: {
        contractAmount: 3500000,
        reservationAmount: 300000,
        discountRate: 5.5,
        discountAmount: 192500,
      },
    },
    {
      defaultFolded: true,
      header: {
        part: "윗가슴",
        code: "CHS301",
        grcode: "B042",
        partClass: "isShoulder",
      },
      body: {
        title: "상박 지방흡입 + 가슴 리프팅",
        spec: "C3(70cm이상)",
        type: "병행",
        count: "5회",
      },
      stats: {
        method: "일반",
        specialRate: 8,
        fatLevel: 4,
        procedureCount: 5,
      },
      payment: {
        contractAmount: 7500000,
        reservationAmount: 800000,
        discountRate: 12.8,
        discountAmount: 960000,
      },
    },
  ],
  "package-2": [
    {
      defaultFolded: true,
      header: {
        part: "복부",
        code: "ABD201",
        grcode: "C055",
        partClass: "isBelly",
      },
      body: {
        title: "복부 지방흡입 + 타이트닝",
        spec: "A2(55~60cm)",
        type: "단독",
        count: "2회",
      },
      stats: {
        method: "일반",
        specialRate: 5,
        fatLevel: 1,
        procedureCount: 2,
      },
      payment: {
        contractAmount: 4200000,
        reservationAmount: 400000,
        discountRate: 8.5,
        discountAmount: 357000,
      },
    },
    {
      defaultFolded: true,
      header: {
        part: "팔뚝",
        code: "ARM301",
        grcode: "D120",
        partClass: "isArm",
      },
      body: {
        title: "팔뚝 지방흡입",
        spec: "B1(28cm이하)",
        type: "단독",
        count: "무한",
      },
      stats: {
        method: "일반",
        specialRate: 0,
        fatLevel: 0,
        procedureCount: 1,
      },
      payment: {
        contractAmount: 2800000,
        reservationAmount: 250000,
        discountRate: 7.2,
        discountAmount: 201600,
      },
    },
    {
      defaultFolded: true,
      header: {
        part: "허리",
        code: "WST101",
        grcode: "E010",
        partClass: "isWaist",
      },
      body: {
        title: "허리 라인 지방흡입",
        spec: "B2(62~64.8cm이하)",
        type: "병행",
        count: "4회",
      },
      stats: {
        method: "일반",
        specialRate: 3,
        fatLevel: 2,
        procedureCount: 4,
      },
      payment: {
        contractAmount: 3900000,
        reservationAmount: 350000,
        discountRate: 6.5,
        discountAmount: 253500,
      },
    },
  ],
  "package-1": [
    {
      defaultFolded: false,
      header: {
        part: "허벅지",
        code: "FAT242",
        grcode: "D088",
        partClass: "isThigh",
      },
      body: {
        title: "러브핸들 지방흡입",
        spec: "B2(62~64.8cm이하)",
        type: "단독",
        count: "3회",
      },
      stats: {
        method: "일반",
        specialRate: 0,
        fatLevel: 3,
        procedureCount: 3,
      },
      payment: {
        contractAmount: 4500000,
        reservationAmount: 450000,
        discountRate: 9.0,
        discountAmount: 405000,
      },
    },
    {
      defaultFolded: true,
      header: {
        part: "종아리",
        code: "CLF201",
        grcode: "F021",
        partClass: "isCalf",
      },
      body: {
        title: "종아리 지방흡입 + 실루엣 교정",
        spec: "C1(30cm이상)",
        type: "단독",
        count: "2회",
      },
      stats: {
        method: "일반",
        specialRate: 0,
        fatLevel: 1,
        procedureCount: 2,
      },
      payment: {
        contractAmount: 3200000,
        reservationAmount: 300000,
        discountRate: 5.0,
        discountAmount: 160000,
      },
    },
  ],
};

const getPackageData = (packageId: string): PackageItemData[] =>
  PACKAGE_ITEMS_BY_ID[packageId] ?? [];

/**
 * 내원일지/상세로그용 C107 내용 컴포넌트
 */
function VisitLogDateContent({
  showFutureSchedule = true,
}: {
  showFutureSchedule?: boolean;
}) {
  return (
    <>
      {showFutureSchedule && (
        <div className="C138">
          <div className="C130">
            <div className="C131">
              <div className="C080">
                <div className="C081 styleSheet isIcon isMini isClock"></div>
              </div>
              <p className="T059">
                <span className="isGrey">2025.</span>12.15{" "}
                <span className="isUnit">(예상) - 수술 후 </span> 7
                <span className="isUnit">주차</span>
              </p>
            </div>
          </div>
          <div className="C137">
            <div className="C131">
              <div className="C080 isEmpty"></div>
            </div>
            <div className="C136">
              <div className="C133">
                <div className="C134 styleSheet isIcon isDrug"></div>
                <p className="T060">
                  약처방 <span className="isUnit">- 예정</span>
                </p>
              </div>
            </div>
          </div>
          <div className="C137">
            <div className="C131">
              <div className="C080 isEmpty"></div>
            </div>
            <div className="C136">
              <div className="C133">
                <div className="C134 styleSheet isIcon isCamera"></div>
                <p className="T060">
                  사진촬영 <span className="isUnit">- 예정</span>
                </p>
              </div>
            </div>
          </div>
          <div className="C137">
            <div className="C131">
              <div className="C080 isEmpty"></div>
            </div>
            <div className="C136">
              <div className="C133">
                <div className="C134 styleSheet isIcon isPackage"></div>
                <p className="T060">
                  패키지 상담 <span className="isUnit">- 예정</span>
                </p>
              </div>
            </div>
          </div>
          <div className="C137">
            <div className="C131">
              <div className="C080 isEmpty"></div>
            </div>
            <div className="C136">
              <div className="C133">
                <div className="C134 styleSheet isIcon isLeaf"></div>
                <p className="T060">
                  경과 상담 <span className="isUnit">- 예정</span>
                </p>
              </div>
            </div>
          </div>
          <div className="C137">
            <div className="C131">
              <div className="C080 isEmpty"></div>
            </div>
            <div className="C136">
              <div className="C133">
                <div className="C134 styleSheet isIcon isSyringe"></div>
                <p className="T060">
                  엔더{" "}
                  <span className="isGrey">
                    (잔여 <span className="isRed isBold">2</span>회)
                  </span>
                  <span className="isUnit">- 수술 예약 필요</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="C135">
        <p className="T061">2025.12.15 (월)</p>
      </div>
      <div className="C130">
        <div className="C131">
          <div className="C080">
            <div className="C081 styleSheet isIcon isMini isChecked"></div>
          </div>
          <p className="T059">
            <span className="isUnit">AM</span> 11:15
          </p>
          <EmployeeBadge
            name="김유정"
            role="상담사"
            employeeId="kyj006"
            tooltipText="김유정 상담사"
          />
        </div>
        <div className="C132">
          <div className="C133">
            <div className="C134 isIMaskBlueMint isCheck"></div>
            <p className="T060">
              신환 수술 설문지 - <span className="isBlue">작성 완료</span>
            </p>
          </div>
        </div>
      </div>
      <div className="C130">
        <div className="C131">
          <div className="C080">
            <div className="C081 styleSheet isIcon isMini isChecked"></div>
          </div>
          <p className="T059">
            <span className="isUnit">AM</span> 11:15
          </p>
          <EmployeeBadge
            name="김유정"
            role="상담사"
            employeeId="kyj006"
            tooltipText="김유정 상담사"
          />
        </div>
        <div className="C132">
          <div className="C133">
            <div className="C134 isIMaskBlueMint isCheck"></div>
            <p className="T060">
              신환 수술 설문지 - <span className="isBlue">작성 완료</span>
            </p>
          </div>
        </div>
      </div>
      <div className="C135">
        <p className="T061">2025.12.08 (월)</p>
      </div>
      <div className="C130">
        <div className="C131">
          <div className="C080">
            <div className="C081 styleSheet isIcon isMini isChecked"></div>
          </div>
          <p className="T059">
            <span className="isUnit">AM</span> 11:15
          </p>
          <EmployeeBadge
            name="김유정"
            role="상담사"
            employeeId="kyj006"
            tooltipText="김유정 상담사"
          />
        </div>
        <div className="C132">
          <div className="C133">
            <div className="C134 isIMaskBlueMint isCheck"></div>
            <p className="T060">
              신환 수술 설문지 - <span className="isBlue">작성 완료</span>
            </p>
          </div>
        </div>
      </div>
      <div className="C130">
        <div className="C131">
          <div className="C080">
            <div className="C081 styleSheet isIcon isMini isChecked"></div>
          </div>
          <p className="T059">
            <span className="isUnit">AM</span> 11:15
          </p>
          <EmployeeBadge
            name="김유정"
            role="상담사"
            employeeId="kyj006"
            tooltipText="김유정 상담사"
          />
        </div>
        <div className="C132">
          <div className="C133">
            <div className="C134 isIMaskBlueMint isCheck"></div>
            <p className="T060">
              신환 수술 설문지 - <span className="isBlue">작성 완료</span>
            </p>
          </div>
        </div>
      </div>
      <div className="C135">
        <p className="T061">2025.12.01 (월)</p>
      </div>
      <div className="C130">
        <div className="C131">
          <div className="C080">
            <div className="C081 styleSheet isIcon isMini isChecked"></div>
          </div>
          <p className="T059">
            <span className="isUnit">AM</span> 11:15
          </p>
          <EmployeeBadge
            name="김유정"
            role="상담사"
            employeeId="kyj006"
            tooltipText="김유정 상담사"
          />
        </div>
        <div className="C132">
          <div className="C133">
            <div className="C134 isIMaskBlueMint isCheck"></div>
            <p className="T060">
              신환 수술 설문지 - <span className="isBlue">작성 완료</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * 패키지용 C107 내용 컴포넌트
 * 패키지(기수) 및 수술 부위별로 다양한 C132 카드 렌더링
 */
function PackageContent({
  selectedPackageId = "package-3",
}: {
  selectedPackageId?: string;
}) {
  const packageItems = getPackageData(selectedPackageId);

  return (
    <>
      <div className="C130">
        {packageItems.map((item, index) => (
          <PackageItem
            key={index}
            defaultFolded={item.defaultFolded}
            icon={<div className="C134 isIMaskMagenta isSyringe"></div>}
            partIcon={
              <div className="C119">
                <div
                  className={`C121 styleSheet isIcon isPart ${item.header.partClass}`}
                ></div>
              </div>
            }
            headerContent={
              <>
                <p className="T063">
                  <span className="isBold isMagenta">수술</span>{" "}
                  {item.header.part}
                </p>
                <p className="T064">
                  <span className="isUnit">CODE:</span> {item.header.code}
                </p>
                <p className="T064">
                  <span className="isUnit">/ GRCODE:</span> {item.header.grcode}
                </p>
                <div className="C112">
                  <div className="C113 styleSheet isIcon isMini isChevron"></div>
                </div>
              </>
            }
            bodyContent={
              <>
                <p className="T065 isBold isEllipsis is2lines">
                  {item.body.title}
                </p>
                <p className="T042">{item.body.spec}</p>
                <p className="T042">{item.body.type}</p>
                <p className="T042">{item.body.count}</p>
              </>
            }
            stats={item.stats}
            payment={item.payment}
          />
        ))}
      </div>
    </>
  );
}

/**
 * 예약용 C107 내용 컴포넌트
 */
function ReservationContent() {
  return (
    <>
      <div className="C138">
        <div className="C130">
          <div className="C131">
            <div className="C080">
              <div className="C081 styleSheet isIcon isMini isClock"></div>
            </div>
            <p className="T059">
              <span className="isGrey">2025.</span>12.15{" "}
              <span className="isUnit">(예상) - 수술 후 </span> 7
              <span className="isUnit">주차</span>
            </p>
          </div>
        </div>
        <div className="C137">
          <div className="C131">
            <div className="C080 isEmpty"></div>
          </div>
          <div className="C136">
            <div className="C133">
              <div className="C134 styleSheet isIcon isDrug"></div>
              <p className="T060">
                약처방 <span className="isUnit">- 예정</span>
              </p>
            </div>
          </div>
        </div>
        <div className="C137">
          <div className="C131">
            <div className="C080 isEmpty"></div>
          </div>
          <div className="C136">
            <div className="C133">
              <div className="C134 styleSheet isIcon isCamera"></div>
              <p className="T060">
                사진촬영 <span className="isUnit">- 예정</span>
              </p>
            </div>
          </div>
        </div>
        <div className="C137">
          <div className="C131">
            <div className="C080 isEmpty"></div>
          </div>
          <div className="C136">
            <div className="C133">
              <div className="C134 styleSheet isIcon isPackage"></div>
              <p className="T060">
                패키지 상담 <span className="isUnit">- 예정</span>
              </p>
            </div>
          </div>
        </div>
        <div className="C137">
          <div className="C131">
            <div className="C080 isEmpty"></div>
          </div>
          <div className="C136">
            <div className="C133">
              <div className="C134 styleSheet isIcon isLeaf"></div>
              <p className="T060">
                경과 상담 <span className="isUnit">- 예정</span>
              </p>
            </div>
          </div>
        </div>
        <div className="C137">
          <div className="C131">
            <div className="C080 isEmpty"></div>
          </div>
          <div className="C136">
            <div className="C133">
              <div className="C134 styleSheet isIcon isSyringe"></div>
              <p className="T060">
                엔더{" "}
                <span className="isGrey">
                  (잔여 <span className="isRed isBold">2</span>회)
                </span>
                <span className="isUnit">- 수술 예약 필요</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="C135">
        <p className="T061">
          <span className="isBox isGreen">3기</span>2024.12.15 ~ 2025.12.15
        </p>
      </div>
      <div className="C130">
        <div className="C131">
          <div className="C080">
            <div className="C081 styleSheet isIcon isMini isChecked"></div>
          </div>
          <p className="T059">
            <span className="isUnit">2025.</span>09.23{" "}
            <span className="isUnit">AM</span> 11:15
          </p>
          <EmployeeBadge
            name="김유정"
            role="상담사"
            employeeId="kyj006"
            tooltipText="김유정 상담사"
          />
        </div>
        <div className="C132">
          <div className="C133">
            <div className="C134 isIMaskBlueMint isCheck"></div>
            <p className="T060">
              신환 수술 설문지 - <span className="isBlue">작성 완료</span>
            </p>
          </div>
        </div>
      </div>
      <div className="C130">
        <div className="C131">
          <div className="C080">
            <div className="C081 styleSheet isIcon isMini isChecked"></div>
          </div>
          <p className="T059">
            <span className="isUnit">2025.</span>09.23{" "}
            <span className="isUnit">AM</span> 11:15
          </p>
          <EmployeeBadge
            name="김유정"
            role="상담사"
            employeeId="kyj006"
            tooltipText="김유정 상담사"
          />
        </div>
        <div className="C132">
          <div className="C133">
            <div className="C134 isIMaskBlueMint isCheck"></div>
            <p className="T060">
              신환 수술 설문지 - <span className="isBlue">작성 완료</span>
            </p>
          </div>
        </div>
      </div>
      <div className="C130">
        <div className="C131">
          <div className="C080">
            <div className="C081 styleSheet isIcon isMini isChecked"></div>
          </div>
          <p className="T059">
            <span className="isUnit">2025.</span>09.23{" "}
            <span className="isUnit">AM</span> 11:15
          </p>
          <EmployeeBadge
            name="김유정"
            role="상담사"
            employeeId="kyj006"
            tooltipText="김유정 상담사"
          />
        </div>
        <div className="C132">
          <div className="C133">
            <div className="C134 isIMaskBlueMint isCheck"></div>
            <p className="T060">
              신환 수술 설문지 - <span className="isBlue">작성 완료</span>
            </p>
          </div>
        </div>
      </div>
      <div className="C135">
        <p className="T061">
          <span className="isBox isGreen">2기</span>2024.12.15 ~ 2025.12.15
        </p>
      </div>
      <div className="C130">
        <div className="C131">
          <div className="C080">
            <div className="C081 styleSheet isIcon isMini isChecked"></div>
          </div>
          <p className="T059">
            <span className="isUnit">2025.</span>09.23{" "}
            <span className="isUnit">AM</span> 11:15
          </p>
          <EmployeeBadge
            name="김유정"
            role="상담사"
            employeeId="kyj006"
            tooltipText="김유정 상담사"
          />
        </div>
        <div className="C132">
          <div className="C133">
            <div className="C134 isIMaskBlueMint isCheck"></div>
            <p className="T060">
              신환 수술 설문지 - <span className="isBlue">작성 완료</span>
            </p>
          </div>
        </div>
      </div>
      <div className="C130">
        <div className="C131">
          <div className="C080">
            <div className="C081 styleSheet isIcon isMini isChecked"></div>
          </div>
          <p className="T059">
            <span className="isUnit">2025.</span>09.23{" "}
            <span className="isUnit">AM</span> 11:15
          </p>
          <EmployeeBadge
            name="김유정"
            role="상담사"
            employeeId="kyj006"
            tooltipText="김유정 상담사"
          />
        </div>
        <div className="C132">
          <div className="C133">
            <div className="C134 isIMaskBlueMint isCheck"></div>
            <p className="T060">
              신환 수술 설문지 - <span className="isBlue">작성 완료</span>
            </p>
          </div>
        </div>
      </div>
      <div className="C130">
        <div className="C131">
          <div className="C080">
            <div className="C081 styleSheet isIcon isMini isChecked"></div>
          </div>
          <p className="T059">
            <span className="isUnit">2025.</span>09.23{" "}
            <span className="isUnit">AM</span> 11:15
          </p>
          <EmployeeBadge
            name="김유정"
            role="상담사"
            employeeId="kyj006"
            tooltipText="김유정 상담사"
          />
        </div>
        <div className="C132">
          <div className="C133">
            <div className="C134 isIMaskBlueMint isCheck"></div>
            <p className="T060">
              신환 수술 설문지 - <span className="isBlue">작성 완료</span>
            </p>
          </div>
        </div>
      </div>
      <div className="C135">
        <p className="T061">
          <span className="isBox">1기</span>2024.12.15 ~ 2025.12.15
        </p>
      </div>
      <div className="C130">
        <div className="C131">
          <div className="C080">
            <div className="C081 styleSheet isIcon isMini isChecked"></div>
          </div>
          <p className="T059">
            <span className="isUnit">2025.</span>09.23{" "}
            <span className="isUnit">AM</span> 11:15
          </p>
          <EmployeeBadge
            name="김유정"
            role="상담사"
            employeeId="kyj006"
            tooltipText="김유정 상담사"
          />
        </div>
        <div className="C132">
          <div className="C133">
            <div className="C134 isIMaskBlueMint isCheck"></div>
            <p className="T060">
              신환 수술 설문지 - <span className="isBlue">작성 완료</span>
            </p>
          </div>
        </div>
      </div>
      <div className="C130">
        <div className="C131">
          <div className="C080">
            <div className="C081 styleSheet isIcon isMini isChecked"></div>
          </div>
          <p className="T059">
            <span className="isUnit">2025.</span>09.23{" "}
            <span className="isUnit">AM</span> 11:15
          </p>
          <EmployeeBadge
            name="김유정"
            role="상담사"
            employeeId="kyj006"
            tooltipText="김유정 상담사"
          />
        </div>
        <div className="C132">
          <div className="C133">
            <div className="C134 isIMaskBlueMint isCheck"></div>
            <p className="T060">
              신환 수술 설문지 - <span className="isBlue">작성 완료</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * 타임라인 컨텐츠 컴포넌트 (C107)
 * 뷰 모드와 타이틀에 따라 적절한 내용을 렌더링
 */
export default function VisitLogContent({
  viewMode,
  title,
  showFutureSchedule = true,
  selectedPackageId,
}: VisitLogContentProps) {
  if (viewMode === "date") {
    return <VisitLogDateContent showFutureSchedule={showFutureSchedule} />;
  }

  // 패키지 뷰 모드
  if (title === "패키지") {
    return <PackageContent selectedPackageId={selectedPackageId} />;
  }

  if (title === "예약") {
    return <ReservationContent />;
  }

  // 그 외 (빈 C107)
  return null;
}
