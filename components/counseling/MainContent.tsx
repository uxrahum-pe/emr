/**
 * MainContent Component
 *
 * @description 상담 페이지의 메인 콘텐츠 영역을 렌더링합니다.
 * 고객 및 직원 클릭 이벤트를 처리하고, Aside의 navigateToPage를 사용하여
 * 슬라이드 페이지를 표시합니다.
 *
 * @component
 * @example
 * ```tsx
 * <MainContent onCustomerClick={(name, id) => console.log(name, id)} />
 * ```
 *
 * @remarks
 * - useAside 훅을 사용하여 Aside 컨텍스트에 접근합니다.
 * - 역할 기반 라우팅을 위해 role-utils를 사용합니다.
 * - React.memo로 최적화되어 불필요한 리렌더링을 방지합니다.
 */

"use client";

import { useCallback, memo } from "react";
import { useAside } from "@/components/AsideContext";
import Tooltip from "@/components/Tooltip";
import ExpandableText from "@/components/ExpandableText";
import { getRoleInfo } from "@/lib/utils/role";
import type { MainContentProps } from "@/types/reception";
import CustomerReferenceSlide from "@/components/slides/CustomerReferenceSlide";

function MainContent({ onCustomerClick }: MainContentProps) {
  const { navigateToPage } = useAside();

  /**
   * 직원 클릭 핸들러
   *
   * @description 직원을 클릭하면 역할에 따라 적절한 슬라이드 페이지를 표시합니다.
   * 동일 역할은 같은 pageId를 사용하여 페이지가 누적되지 않도록 합니다.
   */
  const handleEmployeeClick = useCallback(
    (
      employeeName: string,
      employeeId: string,
      role: string,
      e: React.MouseEvent
    ) => {
      e.preventDefault();
      e.stopPropagation();
      console.log("직원 클릭:", employeeName, employeeId, role);

      try {
        const roleInfo = getRoleInfo(role);
        const SlidePageComponent = roleInfo.component;

        // 동일 역할 카테고리는 같은 pageId 사용 (employeeId 무시)
        navigateToPage(
          roleInfo.category,
          <SlidePageComponent
            title={roleInfo.title}
            employeeName={employeeName}
            employeeRole={role}
            employeeId={employeeId}
          />
        );
      } catch (error) {
        console.error("navigateToPage 오류:", error);
      }
    },
    [navigateToPage]
  );

  /**
   * 고객 클릭 핸들러
   *
   * @description 고객을 클릭하면 고객 참조사항 페이지를 표시합니다.
   * 모든 고객은 동일한 "customer" 카테고리를 사용하여 페이지가 누적되지 않도록 합니다.
   */
  const handleCustomerClick = useCallback(
    (customerName: string, customerId: string, e?: React.MouseEvent) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      console.log("고객 클릭:", customerName, customerId);

      // 고객 통합 정보 패널 열기
      onCustomerClick?.(customerName, customerId);

      // 모든 고객은 동일한 customer 카테고리로 묶어서 누적 없이 데이터만 리로드
      navigateToPage(
        "customer",
        <CustomerReferenceSlide
          customerName={customerName}
          customerId={customerId}
        />
      );
    },
    [navigateToPage, onCustomerClick]
  );

  return (
    <div className="C075">
      <div className="C076">
        <div className="C077">
          <p className="T036">
            <span className="isUnit">AM</span> 10:15
          </p>
          <Tooltip text="업무 일지 보기">
            <div
              className="C088"
              onClick={(e) =>
                handleEmployeeClick("김민수", "kms002", "과장", e)
              }
            >
              <p className="T037">
                김민수<span className="isUnit">과장</span>
              </p>
              <p className="T038">(kms002)</p>
            </div>
          </Tooltip>
        </div>
        <div className="C078">
          <div className="C080">
            <div className="C081 styleSheet isIcon isMini isChecked"></div>
          </div>
          <div className="C082 isMale"></div>
        </div>
        <Tooltip text="고객 상세 정보">
          <div
            className="C079"
            onClick={(e) => handleCustomerClick("박지영", "210048921", e)}
          >
            <div className="C087">
              <div className="C084">
                <div className="C033 isIcon styleSheet isPaperPlane"></div>
              </div>
              <div className="C083">
                <p className="T039">
                  <span className="isBold">파트이동</span>{" "}
                </p>
                <div className="C086">
                  <p className="T041">박지영</p>
                  <p className="T042 isRed">여성</p>
                  <p className="T042">
                    32<span className="isUnit">세</span>
                  </p>
                  <p className="T042">
                    1<span className="isUnit">기</span>
                  </p>
                  <p className="T016 isGrey">210048921</p>
                </div>
              </div>
            </div>
            <div className="C085">
              <div className="C036">
                <div className="C033 isIcon styleSheet isReception"></div>
              </div>
              <div className="C080 isFitted">
                <div className="C081 styleSheet isIcon isMini isArrow"></div>
              </div>
              <div className="C036">
                <div className="C033 isIcon styleSheet isSurgery "></div>
              </div>
              <p className="T043">
                <span className="isBold">수술파트</span>
                <span className="isGrey">로 고객 이관</span>
              </p>
            </div>
          </div>
        </Tooltip>
      </div>
      <div className="C076">
        <div className="C077">
          <p className="T036">
            <span className="isUnit">AM</span> 11:32
          </p>
          <Tooltip text="업무 일지 보기">
            <div
              className="C088"
              onClick={(e) =>
                handleEmployeeClick("이수진", "lsj003", "대리", e)
              }
            >
              <p className="T037">
                이수진<span className="isUnit">대리</span>
              </p>
              <p className="T038">(lsj003)</p>
            </div>
          </Tooltip>
        </div>
        <div className="C078">
          <div className="C080">
            <div className="C081 styleSheet isIcon isMini isMegaphone"></div>
          </div>
          <div className="C082 isFemale"></div>
        </div>
        <div className="C079 isMine isComment">
          <div className="C087">
            <div className="C084">
              <div className="C033 isIcon styleSheet isCounseling"></div>
            </div>
            <div className="C083">
              <p className="T039">
                <span className="isBold">상담파트</span>{" "}
                <span className="isGrey">- 전체 전달사항</span>
              </p>
              <ExpandableText
                text="오늘 오후 2시부터 시스템 점검이 예정되어 있습니다. 업무에 참고 부탁드립니다. 점검 시간 동안 일시적으로 접속이 불가능할 수 있으며, 긴급한 업무는 사전에 처리해 주시기 바랍니다. 점검이 완료되면 자동으로 알림이 발송될 예정입니다. 추가 문의사항이 있으시면 상담팀으로 연락 부탁드립니다."
                maxLines={4}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="C076">
        <div className="C077">
          <p className="T036">
            <span className="isUnit">PM</span> 02:18
          </p>
          <Tooltip text="업무 일지 보기">
            <div
              className="C088"
              onClick={(e) =>
                handleEmployeeClick("정태영", "jty004", "주임", e)
              }
            >
              <p className="T037">
                정태영<span className="isUnit">주임</span>
              </p>
              <p className="T038">(jty004)</p>
            </div>
          </Tooltip>
        </div>
        <div className="C078">
          <div className="C080">
            <div className="C081 styleSheet isIcon isMini isChecked"></div>
          </div>
          <div className="C082 isMale"></div>
        </div>
        <Tooltip text="고객 상세 정보">
          <div
            className="C079"
            onClick={(e) => handleCustomerClick("최민호", "210046587", e)}
          >
            <div className="C087">
              <div className="C084">
                <div className="C033 isIcon styleSheet isExit"></div>
              </div>
              <div className="C083">
                <p className="T039">
                  <span className="isBold">귀가 처리 완료</span>
                </p>
                <div className="C086">
                  <p className="T041">최민호</p>
                  <p className="T042 isBlue">남성</p>
                  <p className="T042">
                    45<span className="isUnit">세</span>
                  </p>
                  <p className="T042 isOldbie">
                    3<span className="isUnit">기</span>
                  </p>
                  <p className="T016 isGrey">210046587</p>
                </div>
              </div>
            </div>
            <div className="C085">
              <p className="T016">
                <span className="isUnit">수납액:</span>
              </p>
              <p className="T016 isBold isBlue">
                3,200,000<span className="isUnit">원</span>
              </p>
              <p className="T016">
                <span className="isUnit">/ 미수금:</span>
              </p>
              <p className="T016 isBold isMint">
                800,000<span className="isUnit">원</span>
              </p>
              <p className="T016">
                <span className="isUnit">/ 계약금 총액:</span>
              </p>
              <p className="T016 isBold">
                4,000,000<span className="isUnit">원</span>
              </p>
            </div>
          </div>
        </Tooltip>
      </div>
      <div className="C076">
        <div className="C077">
          <p className="T036">
            <span className="isUnit">PM</span> 01:45
          </p>
          <Tooltip text="업무 일지 보기">
            <div
              className="C088"
              onClick={(e) =>
                handleEmployeeClick("안경희", "akh001", "팀장", e)
              }
            >
              <p className="T037">
                안경희<span className="isUnit">팀장</span>
              </p>
              <p className="T038">(akh001)</p>
            </div>
          </Tooltip>
        </div>
        <div className="C078">
          <div className="C080">
            <div className="C081 styleSheet isIcon isMini isChecked"></div>
          </div>
          <div className="C082 isFemale"></div>
        </div>
        <Tooltip text="고객 상세 정보">
          <div
            className="C079"
            onClick={(e) => handleCustomerClick("한소영", "210048901", e)}
          >
            <div className="C087">
              <div className="C084">
                <div className="C033 isIcon styleSheet isCheckIn"></div>
              </div>
              <div className="C083">
                <p className="T039">
                  <span className="isBold">접수완료</span>{" "}
                  <span className="isGrey">- Vital 입력완료</span>
                </p>
                <div className="C086">
                  <p className="T041">한소영</p>
                  <p className="T042 isRed">여성</p>
                  <p className="T042">
                    28<span className="isUnit">세</span>
                  </p>
                  <p className="T042">
                    1<span className="isUnit">기</span>
                  </p>
                  <p className="T016 isGrey">210048901</p>
                </div>
              </div>
            </div>
          </div>
        </Tooltip>
      </div>
    </div>
  );
}

export default memo(MainContent);
