"use client";

import SlidePage from "@/components/SlidePage";
import ScrollableContainer from "@/components/ScrollableContainer";

import type { MyNotesSlideProps } from "@/types/slides";

/**
 * 내 쪽지 보기 Slide 컴포넌트
 *
 * @description PageHeader의 C018.isNote 버튼 클릭 시 표시되는 페이지
 * @component
 */
export default function MyNotesSlide({
  onGoBack,
  showBackButton = false,
  transform,
  zIndex,
}: MyNotesSlideProps = {}) {
  return (
    <SlidePage
      title="내 쪽지 보기"
      showToggleSwitch={false}
      onGoBack={onGoBack}
      showBackButton={showBackButton}
      transform={transform}
      zIndex={zIndex}
    >
      <div className="C070 isNoteWrite">
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
        {/* ============================================
            내 쪽지 보기 Slide 내용 - 여기에 퍼블리싱
            ============================================ */}
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
}

MyNotesSlide.displayName = "MyNotesSlide";
