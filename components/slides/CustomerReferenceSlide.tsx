"use client";

import SlidePage from "@/components/SlidePage";
import ReferenceMessage from "@/components/ReferenceMessage";

import type { CustomerReferenceSlideProps } from "@/types/slides";

/**
 * 고객 참조사항 Slide 컴포넌트
 *
 * @description 고객 클릭 시 표시되는 참조사항 페이지
 * @component
 */
export default function CustomerReferenceSlide({
  customerName,
  customerId,
  onGoBack,
  showBackButton = false,
  transform,
  zIndex,
}: CustomerReferenceSlideProps) {
  return (
    <SlidePage
      title="고객 참조사항"
      customerName={customerName}
      customerId={customerId}
      showToggleSwitch={true}
      onGoBack={onGoBack}
      showBackButton={showBackButton}
      transform={transform}
      zIndex={zIndex}
    >
      <div className="C070 isCustomerReference">
        <div className="C157">
          <div className="C158 styleSheet isIcon isReception"></div>
          <p className="T069">
            <span className="isUnit">From:</span> 원무
          </p>
        </div>
        <p className="T035">
          <span className="isUnit">참조사항 입력</span>
        </p>
        <div className="C071">
          <div className="C072 styleSheet isIcon isWrite"></div>
        </div>
      </div>
      <div className="C156">
        {/* ============================================
            고객 참조사항 Slide 내용 - 여기에 퍼블리싱
            ============================================ */}
        <ReferenceMessage
          from={{
            department: "원무",
            type: "일반",
            iconClass: "isReception",
          }}
          author={{
            name: "김민수",
            role: "원무팀장",
            avatarClass: "isMale",
            tooltipText: "김민수 원무팀장",
            employeeId: "kms001",
          }}
          content="오늘 오후 2시부터 시스템 점검이 예정되어 있습니다. 점검 시간 동안 일시적으로 접속이 불가능할 수 있으니, 긴급한 업무는 사전에 처리해 주시기 바랍니다. 점검이 완료되면 자동으로 알림이 발송될 예정입니다."
          time="AM 09:15"
        />
        <div className="C135">
          <p className="T061">2025.12.15 (월)</p>
        </div>
        <ReferenceMessage
          from={{
            department: "원무",
            type: "긴급",
            iconClass: "isReception",
          }}
          to={{ department: "상담", type: "긴급", iconClass: "isCounseling" }}
          author={{
            name: "박지영",
            role: "상담사",
            avatarClass: "isFemale",
            tooltipText: "박지영 상담사",
            employeeId: "pjy002",
          }}
          content="홍길동 고객님께서 내일 오전 예약 변경을 요청하셨습니다. 원래 예약 시간은 오전 10시였는데, 오후 2시로 변경 희망하신다고 하셨습니다. 가능 여부 확인 후 연락 부탁드립니다."
          time="AM 10:32"
        />
        <ReferenceMessage
          from={{
            department: "상담",
            type: "일반",
            iconClass: "isCounseling",
          }}
          author={{
            name: "이수진",
            role: "상담사",
            avatarClass: "isMale",
            tooltipText: "이수진 상담사",
            employeeId: "lsj003",
          }}
          content="네, 확인했습니다. 오후 2시 시간대가 비어있어서 변경 가능합니다. 고객님께 확인 연락 드리겠습니다."
          isMine={true}
          time="AM 10:45"
        />
        <ReferenceMessage
          from={{
            department: "원무",
            type: "일반",
            iconClass: "isReception",
          }}
          to={{ department: "진료", type: "일반", iconClass: "isClinic" }}
          author={{
            name: "최영희",
            role: "원무과장",
            avatarClass: "isFemale",
            tooltipText: "최영희 원무과장",
            employeeId: "cyh004",
          }}
          content="이번 주 금요일부터 새로운 보험 정책이 적용됩니다. 주요 변경사항은 진료실로 공지문을 보내드렸으니 확인 부탁드립니다. 환자 상담 시 참고해 주시기 바랍니다."
          isMine={true}
          time="PM 02:15"
        />
      </div>
      <div className="C167">
        <div className="C168">
          <div className="C169 styleSheet isIcon isMegaphone"></div>
        </div>
        <div className="C170">
          <div className="C171">
            <p className="T072 isRed">전체공지</p>
            <p className="T019">
              From: <span className="isBold isBlack">원무</span>
            </p>
          </div>
          <p className="T073 isEllipsis">
            네트웍스 서포터
            asdfasdfasdfasdfasdㅁㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄹfasdf
          </p>
        </div>
        <div className="C112">
          <div className="C113 styleSheet isIcon isMini isChevron"></div>
        </div>
      </div>
    </SlidePage>
  );
}

CustomerReferenceSlide.displayName = "CustomerReferenceSlide";
