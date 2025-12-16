'use client'

import { useRef } from 'react'
import ScrollableContainer, { ScrollableContainerRef } from '@/components/ScrollableContainer'

interface CustomerInfoPanelProps {
  sectionStates: Record<string, boolean>
  onSectionToggle: (sectionKey: string) => void
  onClose: () => void
}

/**
 * 고객 정보 패널 컴포넌트 (C098)
 * 고객의 기본정보, 외국인 정보, 패키지, 내원, 진료, 처방, 추가 정보를 표시
 */
export default function CustomerInfoPanel({ 
  sectionStates, 
  onSectionToggle, 
  onClose 
}: CustomerInfoPanelProps) {
  const c109ScrollRef = useRef<ScrollableContainerRef>(null)
  
  // Section toggle handler with scroll logic
  const handleSectionToggle = (sectionKey: string, event: React.MouseEvent) => {
    const wasOpened = sectionStates[sectionKey]
    const clickedElement = event.currentTarget.closest('.C110') as HTMLElement
    
    onSectionToggle(sectionKey)
    
    if (!wasOpened && clickedElement && c109ScrollRef.current) {
      setTimeout(() => {
        const scrollContainer = c109ScrollRef.current?.getElement()
        if (scrollContainer && clickedElement) {
          const containerRect = scrollContainer.getBoundingClientRect()
          const elementRect = clickedElement.getBoundingClientRect()
          const size5 = parseFloat(window.getComputedStyle(document.documentElement).getPropertyValue('--size-5')) || 5
          const scrollTop = scrollContainer.scrollTop + (elementRect.top - containerRect.top) - size5
          scrollContainer.scrollTo({ top: Math.max(0, scrollTop), behavior: 'smooth' })
        }
        c109ScrollRef.current?.checkOverflow()
      }, 100)
    } else {
      setTimeout(() => {
        c109ScrollRef.current?.checkOverflow()
      }, 100)
    }
  }

  return (
    <div className='C098'>
      <div className='C101'>
        <p className='T047'>고객 정보</p>
        <div className='C102'><div className='C103 styleSheet isIcon isBarcode'></div></div>
        <div className='C102'><div className='C103 styleSheet isIcon isSetting'></div></div>
        <div className='C108' onClick={onClose}><div className='C012 styleSheet isIcon isArrow isLeft'></div></div>
      </div>
      <ScrollableContainer ref={c109ScrollRef} className='C109'>
        <div className={`C110 ${sectionStates.basic ? 'isOpened' : 'isFolded'}`}>
          <div className='C111' onClick={(e) => handleSectionToggle('basic', e)}><p className='T048'>기본정보</p><p className='T051'><span className='isUnit'>최초등록: 2024.</span>08.16</p><div className='C112'><div className='C113 styleSheet isIcon isMini isChevron'></div></div></div>
          <div className='C116'>
            <p className="T013">신수빈</p><p className="T014 isRed">여성</p><p className="T014">28<span className="isUnit">세</span></p><p className="T014 isOldbie">2<span className="isUnit">기</span></p>
          </div>
          <div className='C111'><p className='T050'>차트번호:</p><p className='T049'>070007777</p></div>
          <div className='C111'><p className='T050'>고객명:</p><p className='T049 isBold isLarge'>신수빈</p></div>
          <div className='C111'><p className='T050'>영문명:</p><p className='T049'>Shin SooBin</p></div>
          <div className='C111'><p className='T050'>휴대전화:</p><p className='T049'>010-7444-4118</p></div>
          <div className='C111'><p className='T050'>주민번호:</p><p className='T049'>800423-1*</p><p className="T042 isRed">여성</p><p className="T042">33<span className="isUnit">세</span></p></div>
          <div className='C114'>
            <p className='T050'>특수사항</p>
            <div className='C115'><p className="T042">찐서포터</p><p className="T042">EC</p><p className="T042">CC</p><p className="T042">마케팅거부</p><p className="T042">MATE</p><p className="T042">기증자</p><p className="T042">실천반갑</p><p className="T042">성공기 작성</p><p className="T042 isRed">혈액검사 대상자</p></div>
          </div>
        </div>
        <div className={`C110 ${sectionStates.foreign ? 'isOpened' : 'isFolded'}`}>
          <div className='C111' onClick={(e) => handleSectionToggle('foreign', e)}><p className='T048'>외국인 정보</p><p className='T051'><span className='isUnit'>국적:</span> 필리핀</p><div className='C112'><div className='C113 styleSheet isIcon isMini isChevron'></div></div></div>
        </div>
        <div className={`C110 isPackage ${sectionStates.package ? 'isOpened' : 'isFolded'}`}>
          <div className='C111' onClick={(e) => handleSectionToggle('package', e)}><p className='T048'>패키지</p><p className="T042 isGreen">2<span className='isUnit'>기</span></p><p className='T051'><span className='isUnit'>등록: 2024.</span>08.16</p><div className='C112'><div className='C113 styleSheet isIcon isMini isChevron'></div></div></div>
          <div className='C116'>
            <p className="T019">계약금:<span className="isBold isBlue">3,500,000</span>원</p>
            <p className="T019">예약금:<span className="isBold isBlack">500,000</span>원</p>
            <p className="T019">할인:<span className="isBold isRed">1,200,000</span>원</p>
            <p className="T019">미수:<span className="isBold isMint">6,800,000</span>원</p>
          </div>
          <div className='C111'><p className='T049 isGreen'>부산365mc병원</p><p className='T051'><span className='isUnit'>패키지 수:</span> <span className='isBold'>6</span><span className='isUnit'>개</span></p></div>
          <div className='C117'>
            <div className='C118'>
              <div className='C119'><div className='C121 styleSheet isIcon isPart isFace'></div></div>
              <div className='C120'>
                <div className='C122'>
                  <p className='T049 isRed'>수술</p>
                  <p className='T049 isBold'>얼굴</p>
                  <p className='T042'>진행</p>
                  <p className='T051'><span className='isUnit'>횟수:</span> 3<span className='isUnit'>회</span></p>
                </div>
                <p className='T049 isGrey isEllipsis'>이중턱 지방흡입 + V라인 성형 + 얼굴 리프팅</p>
              </div>
            </div>
            <div className='C118'>
              <div className='C119'><div className='C121 styleSheet isIcon isPart isShoulder'></div></div>
              <div className='C120'>
                <div className='C122'>
                  <p className='T049 isRed'>수술</p>
                  <p className='T049 isBold'>가슴</p>
                  <p className='T042'>진행</p>
                  <p className='T051'><span className='isUnit'>횟수:</span> 1<span className='isUnit'>회</span></p>
                </div>
                <p className='T049 isGrey isEllipsis'>가슴 지방이식 + 리프팅 + 상승술</p>
              </div>
            </div>
            <div className='C118'>
              <div className='C119'><div className='C121 styleSheet isIcon isPart isArm'></div></div>
              <div className='C120'>
                <div className='C122'>
                  <p className='T049 isRed'>수술</p>
                  <p className='T049 isBold'>팔</p>
                  <p className='T042'>진행</p>
                  <p className='T051'><span className='isUnit'>횟수:</span> 2<span className='isUnit'>회</span></p>
                </div>
                <p className='T049 isGrey isEllipsis'>상완부 지방흡입 + 팔뚝 리프팅</p>
              </div>
            </div>
            <div className='C118'>
              <div className='C119'><div className='C121 styleSheet isIcon isPart isBelly'></div></div>
              <div className='C120'>
                <div className='C122'>
                  <p className='T049 isRed'>수술</p>
                  <p className='T049 isBold'>복부</p>
                  <p className='T042'>진행</p>
                  <p className='T051'><span className='isUnit'>횟수:</span> 2<span className='isUnit'>회</span></p>
                </div>
                <p className='T049 isGrey isEllipsis'>복부 지방흡입 + 복부성형술 + 옆구리 라인</p>
              </div>
            </div>
            <div className='C118'>
              <div className='C119'><div className='C121 styleSheet isIcon isPart isWaist'></div></div>
              <div className='C120'>
                <div className='C122'>
                  <p className='T049 isRed'>수술</p>
                  <p className='T049 isBold'>허리</p>
                  <p className='T042'>완료</p>
                  <p className='T051'><span className='isUnit'>횟수:</span> 1<span className='isUnit'>회</span></p>
                </div>
                <p className='T049 isGrey isEllipsis'>러브핸들 지방흡입 + 허리 라인 교정</p>
              </div>
            </div>
            <div className='C118'>
              <div className='C119'><div className='C121 styleSheet isIcon isPart isThigh'></div></div>
              <div className='C120'>
                <div className='C122'>
                  <p className='T049 isRed'>수술</p>
                  <p className='T049 isBold'>허벅지</p>
                  <p className='T042'>진행</p>
                  <p className='T051'><span className='isUnit'>횟수:</span> 3<span className='isUnit'>회</span></p>
                </div>
                <p className='T049 isGrey isEllipsis'>대퇴부 지방흡입 + 허벅지 안쪽 리프팅</p>
              </div>
            </div>
            <div className='C118'>
              <div className='C119'><div className='C121 styleSheet isIcon isPart isCalf'></div></div>
              <div className='C120'>
                <div className='C122'>
                  <p className='T049 isRed'>수술</p>
                  <p className='T049 isBold'>종아리</p>
                  <p className='T042'>예정</p>
                  <p className='T051'><span className='isUnit'>횟수:</span> 2<span className='isUnit'>회</span></p>
                </div>
                <p className='T049 isGrey isEllipsis'>종아리 지방흡입 + 종아리 라인 교정</p>
              </div>
            </div>
          </div>
          <div className='C111'><p className='T050'>총 계약금:</p><p className='T049 isBold isBlue isRight'>12,000,000<span className='isUnit'>원</span></p></div>
          <div className='C111'><p className='T050'>예약금:</p><p className='T049 isRight'>4,000,000<span className='isUnit'>원</span></p></div>
          <div className='C111'><p className='T050'>할인액:</p><p className='T049 isRed isRight'>1,200,000<span className='isUnit'>원 (</span>10.0<span className='isUnit'>%)</span></p></div>
          <div className='C111'><p className='T050'>잔액:</p><p className='T049 isMint isRight'>6,800,000<span className='isUnit'>원</span></p></div>
        </div>
        <div className={`C110 ${sectionStates.visit ? 'isOpened' : 'isFolded'}`}>
          <div className='C111' onClick={(e) => handleSectionToggle('visit', e)}><p className='T048'>내원</p><p className='T051'><span className='isUnit'>실천지수: </span><span className='isYellow'>74,000</span><span className='isUnit'>점</span></p><div className='C112'><div className='C113 styleSheet isIcon isMini isChevron'></div></div></div>
          <div className='C111'><p className='T050'>시술 시작일:</p><p className='T049 isRight'>2024.10.20</p></div>
          <div className='C111'><p className='T050'>주기적 내원일:</p><p className='T049 isRight'>2024.11.23</p></div>
          <div className='C111'><p className='T050'>다음 내원일:</p><p className='T049 isRight'>--</p></div>
          <div className='C111'><p className='T050'>시술 예정일:</p><p className='T049 isRight'>2024.09.23</p></div>
          <div className='C111'><p className='T050'>목표 체중:</p><p className='T049 isRight'>78.2<span className='isUnit'>kg</span></p></div>
          <div className='C111'><p className='T050'>달성 체중:</p><p className='T049 isRight'>76.2<span className='isUnit'>kg</span></p></div>
          <div className='C111'><p className='T050'>S/O:</p><p className='T049 isRight'>2024<span className='isUnit'>년</span> 12<span className='isUnit'>월경</span></p></div>
        </div>
        <div className={`C110 ${sectionStates.treatment ? 'isOpened' : 'isFolded'}`}>
          <div className='C111' onClick={(e) => handleSectionToggle('treatment', e)}><p className='T048'>진료</p><p className='T051 isMini'><span className='isUnit'>총일수: </span>37<span className='isUnit'>일 / 조정: </span>-22<span className='isUnit'>일</span></p><div className='C112'><div className='C113 styleSheet isIcon isMini isChevron'></div></div></div>
          <div className='C124'></div>
          <ScrollableContainer className='C123'>
            <div className='C125'>
              <div className="C046"><div className="C047 styleSheet isIcon isMini isClock"></div></div>
              <p className='T052'><span className='isGrey'>2025.</span>12.07 <span className='isUnit'> - </span><span className='isBold'>3</span><span className='isUnit'>차 진료</span><span className="isLabel isRed">예정</span></p>
              <div className='C126'>
                <p className='T053'><span className='isUnit'>일수:</span> 10 <span className='isUnit'> / 조정: </span>-2<span className='isUnit'>일</span></p>
                <div className="C039"><div className="C040 isMale"></div><p className="T018">홍성훈<span className="isUnit">원장</span></p></div>
              </div>
            </div>
            <div className='C125'>
              <div className="C046"><div className="C047 styleSheet isIcon isMini isClock"></div></div>
              <p className='T052'><span className='isGrey'>2025.</span>12.07 <span className='isUnit'> - </span><span className='isBold'>3</span><span className='isUnit'>차 진료</span><span className="isLabel isRed">예정</span></p>
              <div className='C126'>
                <p className='T053'><span className='isUnit'>일수:</span> 10 <span className='isUnit'> / 조정: </span>-2<span className='isUnit'>일</span></p>
                <div className="C039"><div className="C040 isMale"></div><p className="T018">홍성훈<span className="isUnit">원장</span></p></div>
              </div>
            </div>
            <div className='C125'>
              <div className="C046"><div className="C047 styleSheet isIcon isMini isClock"></div></div>
              <p className='T052'><span className='isGrey'>2025.</span>12.07 <span className='isUnit'> - </span><span className='isBold'>3</span><span className='isUnit'>차 진료</span><span className="isLabel isRed">예정</span></p>
              <div className='C126'>
                <p className='T053'><span className='isUnit'>일수:</span> 10 <span className='isUnit'> / 조정: </span>-2<span className='isUnit'>일</span></p>
                <div className="C039"><div className="C040 isMale"></div><p className="T018">홍성훈<span className="isUnit">원장</span></p></div>
              </div>
            </div>
            <div className='C125'>
              <div className="C046"><div className="C047 styleSheet isIcon isMini isClock"></div></div>
              <p className='T052'><span className='isGrey'>2025.</span>12.07 <span className='isUnit'> - </span><span className='isBold'>3</span><span className='isUnit'>차 진료</span><span className="isLabel isRed">예정</span></p>
              <div className='C126'>
                <p className='T053'><span className='isUnit'>일수:</span> 10 <span className='isUnit'> / 조정: </span>-2<span className='isUnit'>일</span></p>
                <div className="C039"><div className="C040 isMale"></div><p className="T018">홍성훈<span className="isUnit">원장</span></p></div>
              </div>
            </div>
            <div className='C125'>
              <div className="C046"><div className="C047 styleSheet isIcon isMini isClock"></div></div>
              <p className='T052'><span className='isGrey'>2025.</span>12.07 <span className='isUnit'> - </span><span className='isBold'>3</span><span className='isUnit'>차 진료</span><span className="isLabel isRed">예정</span></p>
              <div className='C126'>
                <p className='T053'><span className='isUnit'>일수:</span> 10 <span className='isUnit'> / 조정: </span>-2<span className='isUnit'>일</span></p>
                <div className="C039"><div className="C040 isMale"></div><p className="T018">홍성훈<span className="isUnit">원장</span></p></div>
              </div>
            </div>
            <div className='C125'>
              <div className="C046"><div className="C047 styleSheet isIcon isMini isClock"></div></div>
              <p className='T052'><span className='isGrey'>2025.</span>12.07 <span className='isUnit'> - </span><span className='isBold'>3</span><span className='isUnit'>차 진료</span><span className="isLabel isRed">예정</span></p>
              <div className='C126'>
                <p className='T053'><span className='isUnit'>일수:</span> 10 <span className='isUnit'> / 조정: </span>-2<span className='isUnit'>일</span></p>
                <div className="C039"><div className="C040 isMale"></div><p className="T018">홍성훈<span className="isUnit">원장</span></p></div>
              </div>
            </div>
            <div className='C125'>
              <div className="C046"><div className="C047 styleSheet isIcon isMini isClock"></div></div>
              <p className='T052'><span className='isGrey'>2025.</span>12.07 <span className='isUnit'> - </span><span className='isBold'>3</span><span className='isUnit'>차 진료</span><span className="isLabel isRed">예정</span></p>
              <div className='C126'>
                <p className='T053'><span className='isUnit'>일수:</span> 10 <span className='isUnit'> / 조정: </span>-2<span className='isUnit'>일</span></p>
                <div className="C039"><div className="C040 isMale"></div><p className="T018">홍성훈<span className="isUnit">원장</span></p></div>
              </div>
            </div>
          </ScrollableContainer>
        </div>
        <div className={`C110 ${sectionStates.prescription ? 'isOpened' : 'isFolded'}`}>
          <div className='C111' onClick={(e) => handleSectionToggle('prescription', e)}><p className='T048'>처방</p><p className='T051 isMini'><span className='isUnit'>무료처방: </span>37<span className='isUnit'>일 / 총처방: </span>22<span className='isUnit'>일</span></p><div className='C112'><div className='C113 styleSheet isIcon isMini isChevron'></div></div></div>
          <div className='C111'><p className='T050'>무료 처방일:</p><p className='T049 isRight'>2024.10.20</p></div>
          <div className='C111'><p className='T050'>전 기수:</p><p className='T049 isRight'>--</p></div>
          <div className='C111'><p className='T050'>최종 처방일:</p><p className='T049 isRight'>--</p></div>
          <div className='C111'><p className='T050'>처방일수 합:</p><p className='T049 isRight'>--</p></div>
          <div className='C111'><p className='T050'>일수 조정:</p><p className='T049 isRight'>15<span className='isUnit'>일</span></p></div>
        </div>
        <div className={`C110 ${sectionStates.additional ? 'isOpened' : 'isFolded'}`}>
          <div className='C111' onClick={(e) => handleSectionToggle('additional', e)}><p className='T048'>추가 정보</p><div className='C112'><div className='C113 styleSheet isIcon isMini isChevron'></div></div></div>
          <div className='C111'><p className='T050'>긴급 연락처::</p><p className='T049 isRight'>010-1234-5678</p></div>
          <div className='C111'><p className='T050'>보호자 성명:</p><p className='T049 isRight'>박철수</p></div>
          <div className='C111'><p className='T050'>고객과 관계:</p><p className='T049 isRight'>아버지</p></div>
          <div className='C111'><p className='T050'>직업:</p><p className='T049 isRight'>무직</p></div>
          <div className='C111'><p className='T050'>결혼 여부:</p><p className='T049 isRight'>기혼</p></div>
          <div className='C111'><p className='T050'>흡연:</p><p className='T049 isRight'>하루 1갑갑</p></div>
          <div className='C111'><p className='T050'>음주:</p><p className='T049 isRight'>하루 반병</p></div>
          <div className='C111'><p className='T050'>종교:</p><p className='T049 isRight'>무교</p></div>
        </div>
      </ScrollableContainer>
    </div>
  )
}

