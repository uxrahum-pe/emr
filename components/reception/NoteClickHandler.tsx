/**
 * NoteClickHandler Component
 *
 * @description PageHeader의 C018.isNote 버튼 클릭 시 "내 쪽지 보기" 페이지를 표시하는 핸들러를 생성합니다.
 *
 * @component
 * @example
 * ```tsx
 * <NoteClickHandler onHandlerReady={handleNoteHandlerReady} />
 * ```
 *
 * @remarks
 * - Aside 내부에 렌더링되어야 useAside 훅을 사용할 수 있습니다.
 * - 핸들러는 한 번만 등록되며, 애니메이션 중에는 클릭을 무시합니다.
 * - 함수형 업데이트를 사용하여 최신 상태를 보장합니다.
 */

"use client";

import { useEffect, useRef } from "react";
import { useAside } from "@/components/AsideContext";
import SlidePage from "@/components/SlidePage";
import ScrollableContainer from "@/components/ScrollableContainer";
import type { NoteClickHandlerProps } from "@/types/reception";

export default function NoteClickHandler({
  onHandlerReady,
}: NoteClickHandlerProps) {
  const { navigateToPage, isAnimating } = useAside();
  const navigateToPageRef = useRef(navigateToPage);
  const onHandlerReadyRef = useRef(onHandlerReady);
  const isAnimatingRef = useRef(isAnimating);

  // ref 업데이트 (항상 최신 값 유지)
  useEffect(() => {
    navigateToPageRef.current = navigateToPage;
    onHandlerReadyRef.current = onHandlerReady;
    isAnimatingRef.current = isAnimating;
  }, [navigateToPage, onHandlerReady, isAnimating]);

  // 핸들러 등록 (페이지 전환 시 재등록 가능하도록)
  useEffect(() => {
    const handler = () => {
      // 애니메이션 중이면 무시
      if (isAnimatingRef.current) {
        return;
      }
      navigateToPageRef.current(
        "my-notes",
        <SlidePage title="내 쪽지 보기" showToggleSwitch={false}>
          <div className="C070">
            <div className="C157">
              <div className="C212"></div>
              <p className="T089">
                <span className="isUnit">To:</span> 이미영
                <span className="isUnit">간호사</span>
              </p>
            </div>
            <p className="T035">
              <span className="isUnit">1:1 쪽지 입력</span>
            </p>
            <div className="C071">
              <div className="C072 styleSheet isIcon isWrite"></div>
            </div>
          </div>
          <ScrollableContainer className="C156">
            <>
              <div className="C215">
                <div className="C213">
                  <p className="T088">
                    선생님, 703호 OOO 환자분(post-op 2일차) 수술 부위 통증 NRS
                    7점으로 심하게 호소하십니다. 기본 처방된 Targin 5mg 투약(am
                    9시)했으나 효과 적다고 합니다. PRN(필요시) IV 진통제 오더
                    부탁드립니다.
                  </p>
                  <div className="C214">
                    <div className="C212"></div>
                    <p className="T089">
                      <span className="isUnit">From:</span> 이미영
                      <span className="isUnit">간호사</span>
                    </p>
                    <p className="T090">
                      <span className="isUnit">2025.</span>12.24
                      <span className="isUnit"> AM</span> 10:00
                    </p>
                  </div>
                  <div className="C217">
                    <div className="C218 styleSheet isIcon isRelay"></div>
                  </div>
                  <div className="C219 styleSheet isLabel">
                    <p className="T091">신규</p>
                  </div>
                </div>
              </div>
              <div className="C215">
                <div className="C213">
                  <p className="T088">
                    선생님, 703호 OOO 환자분(post-op 2일차) 수술 부위 통증 NRS
                    7점으로 심하게 호소하십니다. 기본 처방된 Targin 5mg 투약(am
                    9시)했으나 효과 적다고 합니다. PRN(필요시) IV 진통제 오더
                    부탁드립니다.
                  </p>
                  <div className="C214">
                    <div className="C212"></div>
                    <p className="T089">
                      <span className="isUnit">From:</span> 이미영
                      <span className="isUnit">간호사</span>
                    </p>
                    <p className="T090">
                      <span className="isUnit">2025.</span>12.24
                      <span className="isUnit"> AM</span> 10:00
                    </p>
                  </div>
                  <div className="C217">
                    <div className="C218 styleSheet isIcon isRelay"></div>
                  </div>
                  <div className="C219 styleSheet isLabel">
                    <p className="T091">신규</p>
                  </div>
                </div>
              </div>
              <div className="C215">
                <div className="C213">
                  <p className="T088">
                    선생님, 703호 OOO 환자분(post-op 2일차) 수술 부위 통증 NRS
                    7점으로 심하게 호소하십니다. 기본 처방된 Targin 5mg 투약(am
                    9시)했으나 효과 적다고 합니다. PRN(필요시) IV 진통제 오더
                    부탁드립니다.
                  </p>
                  <div className="C214">
                    <div className="C212"></div>
                    <p className="T089">
                      <span className="isUnit">From:</span> 이미영
                      <span className="isUnit">간호사</span>
                    </p>
                    <p className="T090">
                      <span className="isUnit">2025.</span>12.24
                      <span className="isUnit"> AM</span> 10:00
                    </p>
                  </div>
                </div>
                <div className="C216">
                  <p className="T088">
                    선생님, 703호 OOO 환자분(post-op 2일차) 수술 부위 통증 NRS
                    7점으로 심하게 호소하십니다. 기본 처방된 Targin 5mg 투약(am
                    9시)했으나 효과 적다고 합니다. PRN(필요시) IV 진통제 오더
                    부탁드립니다.
                  </p>
                  <div className="C214">
                    <div className="C212"></div>
                    <p className="T089">
                      <span className="isUnit">To:</span> 이미영
                      <span className="isUnit">간호사</span>
                    </p>
                    <p className="T090">
                      <span className="isUnit">2025.</span>12.24
                      <span className="isUnit"> AM</span> 10:00
                    </p>
                  </div>
                </div>
              </div>
              <div className="C215">
                <div className="C213">
                  <p className="T088">
                    선생님, 703호 OOO 환자분(post-op 2일차) 수술 부위 통증 NRS
                    7점으로 심하게 호소하십니다. 기본 처방된 Targin 5mg 투약(am
                    9시)했으나 효과 적다고 합니다. PRN(필요시) IV 진통제 오더
                    부탁드립니다.
                  </p>
                  <div className="C214">
                    <div className="C212"></div>
                    <p className="T089">
                      <span className="isUnit">From:</span> 이미영
                      <span className="isUnit">간호사</span>
                    </p>
                    <p className="T090">
                      <span className="isUnit">2025.</span>12.24
                      <span className="isUnit"> AM</span> 10:00
                    </p>
                  </div>
                  <div className="C217">
                    <div className="C218 styleSheet isIcon isRelay"></div>
                  </div>
                </div>
              </div>
              <div className="C215 isMine">
                <div className="C213">
                  <p className="T088">
                    선생님, 703호 OOO 환자분(post-op 2일차) 수술 부위 통증 NRS
                    7점으로 심하게 호소하십니다. 기본 처방된 Targin 5mg 투약(am
                    9시)했으나 효과 적다고 합니다. PRN(필요시) IV 진통제 오더
                    부탁드립니다.
                  </p>
                  <div className="C214">
                    <div className="C212"></div>
                    <p className="T089">
                      <span className="isUnit">From:</span> 이미영
                      <span className="isUnit">간호사</span>
                    </p>
                    <p className="T090">
                      <span className="isUnit">2025.</span>12.24
                      <span className="isUnit"> AM</span> 10:00
                    </p>
                  </div>
                </div>
              </div>
              <div className="C215 isMine">
                <div className="C213">
                  <p className="T088">
                    선생님, 703호 OOO 환자분(post-op 2일차) 수술 부위 통증 NRS
                    7점으로 심하게 호소하십니다. 기본 처방된 Targin 5mg 투약(am
                    9시)했으나 효과 적다고 합니다. PRN(필요시) IV 진통제 오더
                    부탁드립니다.
                  </p>
                  <div className="C214">
                    <div className="C212"></div>
                    <p className="T089">
                      <span className="isUnit">From:</span> 이미영
                      <span className="isUnit">간호사</span>
                    </p>
                    <p className="T090">
                      <span className="isUnit">2025.</span>12.24
                      <span className="isUnit"> AM</span> 10:00
                    </p>
                  </div>
                </div>
                <div className="C216">
                  <p className="T088">
                    선생님, 703호 OOO 환자분(post-op 2일차) 수술 부위 통증 NRS
                    7점으로 심하게 호소하십니다. 기본 처방된 Targin 5mg 투약(am
                    9시)했으나 효과 적다고 합니다. PRN(필요시) IV 진통제 오더
                    부탁드립니다.
                  </p>
                  <div className="C214">
                    <div className="C212"></div>
                    <p className="T089">
                      <span className="isUnit">To:</span> 이미영
                      <span className="isUnit">간호사</span>
                    </p>
                    <p className="T090">
                      <span className="isUnit">2025.</span>12.24
                      <span className="isUnit"> AM</span> 10:00
                    </p>
                  </div>
                  <div className="C219 styleSheet isLabel">
                    <p className="T091">신규</p>
                  </div>
                </div>
              </div>
            </>
          </ScrollableContainer>
        </SlidePage>
      );
    };
    // 다음 틱에 등록하여 무한 루프 방지 및 렌더링 완료 후 실행
    // 컴포넌트가 완전히 마운트된 후에만 등록
    const timeoutId = setTimeout(() => {
      if (onHandlerReadyRef.current) {
        onHandlerReadyRef.current(handler);
      }
    }, 100);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [onHandlerReady]); // onHandlerReady가 준비된 후에만 실행

  return null;
}
