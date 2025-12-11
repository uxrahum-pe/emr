'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import PageHeader from '@/components/PageHeader'
import ToggleSwitch from '@/components/ToggleSwitch'
import Tooltip from '@/components/Tooltip'
import ScrollableContainer from '@/components/ScrollableContainer'
import ListItem from '@/components/ListItem'
import DraggableScrollContainer from '@/components/DraggableScrollContainer'

export default function ReceptionPage() {
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const handleC032Click = (index: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <>
      <main className='C007'>
        <PageHeader title='원무' />
        <aside className='C013'></aside>
        <article className='C020'>
          <section className='C021'>
            <div className='C028'>
              <p className='T007'>고객 현황</p>
              <div className='C022'>
                <div className='C017 styleSheet isIcon isMagnifier'></div>
                <p className='T005'>고객 통합 검색</p>
              </div>
              <div className='C023'>
                <div className='C019 styleSheet isIcon isCheck'></div>
                <p className='T008'>설문지 & 바코드 고객 검색</p>
              </div>
              <div className='C023'>
                <div className='C019 styleSheet isIcon isSignUp'></div>
                <p className='T008'>고객 직접 등록</p>
              </div>
              <div className='C024'>
                <p className='T009'>화면 크기:</p>
                <ToggleSwitch
                  onLabel='큰 화면'
                  offLabel='작은 화면'
                  value={!isSmallScreen}
                  onChange={(isOn) => {
                    setIsSmallScreen(!isOn)
                  }}
                />
              </div>
            </div>
            <div className={`C029 ${isSmallScreen ? 'isSmall' : 'isBig'}`}>
              <div className='C030 isQuartet'>
                <div className={`C031 ${activeIndex === 0 ? 'isActived' : activeIndex !== null ? 'isFolded' : ''}`}>
                  <div className='C032' onClick={(e) => handleC032Click(0, e)}>
                    <div className='C036'>
                      <div className='C033 isIcon styleSheet isAlarmClock'></div>
                    </div>
                    <p className='T011'>예약</p>
                    <p className='T012'>대기: <span className='isValue isBlack'>5</span>명 / 지연: <span className='isValue isRed'>2</span>명</p>
                    <p className='T020'><span className='isBlack'>5</span> / <span className='isRed'>2</span></p>
                  </div>
                  <ScrollableContainer>
                    <ListItem>
                      <Tooltip text='고객 상세 정보'>
                        <div className='C035'>
                          <p className='T013'>신수빈</p>
                          <p className='T014 isRed'>여성</p>
                          <p className='T014'>32<span className='isUnit'>세</span></p>
                          <p className='T014'>1<span className='isUnit'>기</span></p>
                          <p className='T015'>210047938</p>
                        </div>
                      </Tooltip>
                      <div className='C037'>
                        <p className='T016'><span className='isUnit'>AM</span> 10:30 예정</p>
                        <p className='T017'>시술 신환 상담</p>
                        <Tooltip text='업무 일정 보기'><div className='C039'><div className='C040'></div><p className='T018'>김유정<span className='isUnit'>상담사</span></p></div></Tooltip>
                        <p className='T019 isRed'>31분 지연.</p>
                      </div>
                    </ListItem>
                    <ListItem>
                      <Tooltip text='고객 상세 정보'>
                        <div className='C035'>
                          <p className='T013'>신수빈</p>
                          <p className='T014 isRed'>여성</p>
                          <p className='T014'>32<span className='isUnit'>세</span></p>
                          <p className='T014'>1<span className='isUnit'>기</span></p>
                          <p className='T015'>210047938</p>
                        </div>
                      </Tooltip>
                      <div className='C037'>
                        <p className='T016'><span className='isUnit'>AM</span> 10:30 예정</p>
                        <p className='T017'>시술 신환 상담</p>
                        <Tooltip text='업무 일정 보기'><div className='C039'><div className='C040'></div><p className='T018'>김유정<span className='isUnit'>상담사</span></p></div></Tooltip>
                        <p className='T019 isYellow'>11분 지연.</p>
                      </div>
                    </ListItem>
                    <ListItem>
                      <Tooltip text='고객 상세 정보'>
                        <div className='C035'>
                          <p className='T013'>신수빈</p>
                          <p className='T014 isRed'>여성</p>
                          <p className='T014'>32<span className='isUnit'>세</span></p>
                          <p className='T014'>1<span className='isUnit'>기</span></p>
                          <p className='T015'>210047938</p>
                        </div>
                      </Tooltip>
                      <div className='C037'>
                        <p className='T016'><span className='isUnit'>AM</span> 10:30 예정</p>
                        <p className='T017'>시술 신환 상담</p>
                        <Tooltip text='업무 일정 보기'><div className='C039'><div className='C040'></div><p className='T018'>김유정<span className='isUnit'>상담사</span></p></div></Tooltip>
                        <p className='T019 isGreen'>5분 후 도착예정</p>
                      </div>
                    </ListItem>
                    <ListItem>
                      <Tooltip text='고객 상세 정보'>
                        <div className='C035'>
                          <p className='T013'>신수빈</p>
                          <p className='T014 isRed'>여성</p>
                          <p className='T014'>32<span className='isUnit'>세</span></p>
                          <p className='T014'>1<span className='isUnit'>기</span></p>
                          <p className='T015'>210047938</p>
                        </div>
                      </Tooltip>
                      <div className='C037'>
                        <p className='T016'><span className='isUnit'>AM</span> 10:30 예정</p>
                        <p className='T017'>시술 신환 상담</p>
                        <Tooltip text='업무 일정 보기'><div className='C039'><div className='C040'></div><p className='T018'>김유정<span className='isUnit'>상담사</span></p></div></Tooltip>
                        <p className='T019 isGreen'>10분 후 도착예정</p>
                      </div>
                    </ListItem>
                    <ListItem>
                      <Tooltip text='고객 상세 정보'>
                        <div className='C035'>
                          <p className='T013'>신수빈</p>
                          <p className='T014 isRed'>여성</p>
                          <p className='T014'>32<span className='isUnit'>세</span></p>
                          <p className='T014'>1<span className='isUnit'>기</span></p>
                          <p className='T015'>210047938</p>
                        </div>
                      </Tooltip>
                      <div className='C037'>
                        <p className='T016'><span className='isUnit'>AM</span> 10:30 예정</p>
                        <p className='T017'>시술 신환 상담</p>
                        <Tooltip text='업무 일정 보기'><div className='C039'><div className='C040'></div><p className='T018'>김유정<span className='isUnit'>상담사</span></p></div></Tooltip>
                        <p className='T019'>30분 후 도착예정</p>
                      </div>
                    </ListItem>
                    <ListItem>
                      <Tooltip text='고객 상세 정보'>
                        <div className='C035'>
                          <p className='T013'>황보제갈수빈</p>
                          <p className='T014 isRed'>여성</p>
                          <p className='T014'>32<span className='isUnit'>세</span></p>
                          <p className='T014'>1<span className='isUnit'>기</span></p>
                          <p className='T015'>210047938</p>
                        </div>
                      </Tooltip>
                      <div className='C037'>
                        <p className='T016'><span className='isUnit'>AM</span> 10:30 예정</p>
                        <p className='T017'>시술 신환 상담</p>
                        <Tooltip text='업무 일정 보기'><div className='C039'><div className='C040'></div><p className='T018'>김유정<span className='isUnit'>상담사</span></p></div></Tooltip>
                        <p className='T019'>50분 후 도착예정</p>
                      </div>
                    </ListItem>
                    <ListItem>
                      <Tooltip text='고객 상세 정보'>
                        <div className='C035'>
                          <p className='T013'>신수빈</p>
                          <p className='T014 isRed'>여성</p>
                          <p className='T014'>32<span className='isUnit'>세</span></p>
                          <p className='T014'>1<span className='isUnit'>기</span></p>
                          <p className='T015'>210047938</p>
                        </div>
                      </Tooltip>
                      <div className='C037'>
                        <p className='T016'><span className='isUnit'>AM</span> 10:30 예정</p>
                        <p className='T017'>시술 신환 상담</p>
                        <Tooltip text='업무 일정 보기'><div className='C039'><div className='C040'></div><p className='T018'>김유정<span className='isUnit'>상담사</span></p></div></Tooltip>
                        <p className='T019'>1시간 30분 후 도착예정</p>
                      </div>
                    </ListItem>
                  </ScrollableContainer>
                </div>
                <div className={`C031 isPending ${activeIndex === 1 ? 'isActived' : activeIndex !== null ? 'isFolded' : ''}`}>
                  <div className='C032' onClick={(e) => handleC032Click(1, e)}>
                    <div className='C036'>
                      <div className='C033 isIcon styleSheet isHourglass'></div>
                    </div>
                    <p className='T011'>대기</p>
                    <p className='T012'>접수: <span className='isValue isBlack'>2</span>명 / 보류: <span className='isValue isYellow'>1</span>명</p>
                  <p className='T020'><span className='isBlack'>2</span> / <span className='isYellow'>1</span></p>
                  </div>
                  <ScrollableContainer>
                    <ListItem>
                      <Tooltip text='고객 상세 정보'>
                        <div className='C035'>
                          <p className='T013'>신수빈</p>
                          <p className='T014 isRed'>여성</p>
                          <p className='T014'>32<span className='isUnit'>세</span></p>
                          <p className='T014'>1<span className='isUnit'>기</span></p>
                          <p className='T015'>210047938</p>
                        </div>
                      </Tooltip>
                      <div className='C037'>
                        <p className='T016'><span className='isUnit'>AM</span> 10:30 이관</p>
                        <p className='T016'><span className='isUnit'>from:</span> 진료파트</p>
                        <p className='T016 isYellow'><span className='isBold'>21분</span> 대기</p>
                        <p className='T019'>-합계:<span className='isBold isRed'>31분</span></p>
                      </div>
                      <DraggableScrollContainer className='C041' scrollToEnd={activeIndex === 1}>
                        <div className='C045'>
                          <div className='C042'><div className='C043 styleSheet isIcon isRibbon'></div><div className='C044'><p className='T021'><span className='isUnit'>AM</span> 10:22</p><p className='T022'><span className='isUnit'>상태변경:</span> 시술시작</p></div></div>
                          <div className='C042'><div className='C043 styleSheet isIcon isSyringe'></div><div className='C044'><p className='T021'><span className='isUnit'>AM</span> 10:22</p><p className='T022'><span className='isUnit'>시술완료:</span> O2 고압산소</p></div></div>
                          <div className='C042'><div className='C043 styleSheet isIcon isPaperPlane'></div><div className='C044'><p className='T021'><span className='isUnit'>AM</span> 10:22</p><p className='T022'><span className='isUnit'>파트이동:</span> 임시대기</p></div></div>
                        </div>
                      </DraggableScrollContainer>
                    </ListItem>
                    <ListItem>
                      <Tooltip text='고객 상세 정보'>
                        <div className='C035'>
                          <p className='T013'>신수빈</p>
                          <p className='T014 isRed'>여성</p>
                          <p className='T014'>32<span className='isUnit'>세</span></p>
                          <p className='T014'>1<span className='isUnit'>기</span></p>
                          <p className='T015'>210047938</p>
                        </div>
                      </Tooltip>
                      <div className='C037'>
                        <p className='T016'><span className='isUnit'>AM</span> 10:30 접수</p>
                        <p className='T016 isGreen'><span className='isBold'>11분</span> 대기</p>
                        <p className='T019'>-합계:<span className='isBold isGreen'>11분</span></p>
                      </div>
                      <DraggableScrollContainer className='C041'></DraggableScrollContainer>
                    </ListItem>
                    <ListItem>
                      <Tooltip text='고객 상세 정보'>
                        <div className='C035'>
                          <p className='T013'>신수빈</p>
                          <p className='T014 isRed'>여성</p>
                          <p className='T014'>32<span className='isUnit'>세</span></p>
                          <p className='T014'>1<span className='isUnit'>기</span></p>
                          <p className='T015'>210047938</p>
                        </div>
                      </Tooltip>
                      <div className='C037'>
                        <p className='T016'><span className='isUnit'>AM</span> 10:30 접수</p>
                        <p className='T017 isBlue'>Vital 검사완료</p>
                        <p className='T016 isGreen'><span className='isBold'>11분</span> 대기</p>
                        <p className='T019'>-합계:<span className='isBold isGreen'>11분</span></p>
                      </div>
                      <DraggableScrollContainer className='C041'></DraggableScrollContainer>
                    </ListItem>
                  </ScrollableContainer>
                </div>
                <div className={`C031 ${activeIndex === 2 ? 'isActived' : activeIndex !== null ? 'isFolded' : ''}`}>
                  <div className='C032' onClick={(e) => handleC032Click(2, e)}>
                    <div className='C036'>
                      <div className='C033 isIcon styleSheet isClinic'></div>
                    </div>
                    <p className='T011'>진료</p>
                    <p className='T012'>대기: <span className='isValue isBlack'>4</span>명 / 진행중: <span className='isValue isGreen'>2</span>명</p>
                  <p className='T020'><span className='isBlack'>4</span> / <span className='isGreen'>2</span></p>
                  </div>
                  <ScrollableContainer>
                    <ListItem>
                      <Tooltip text='고객 상세 정보'>
                        <div className='C035'>
                          <p className='T013'>신수빈</p>
                          <p className='T014 isRed'>여성</p>
                          <p className='T014'>32<span className='isUnit'>세</span></p>
                          <p className='T014'>1<span className='isUnit'>기</span></p>
                          <p className='T015'>210047938</p>
                        </div>
                      </Tooltip>
                      <div className='C037'>
                        <p className='T016'><span className='isUnit'>AM</span> 10:30 이관</p>
                        <p className='T017'>진료 대기</p>
                        <p className='T016 isRed'><span className='isBold'>31분</span> 대기</p>
                        <p className='T019'>-합계:<span className='isBold isRed'>41분</span></p>
                      </div>
                    </ListItem>
                    <ListItem>
                      <Tooltip text='고객 상세 정보'>
                        <div className='C035'>
                          <p className='T013'>신수빈</p>
                          <p className='T014 isRed'>여성</p>
                          <p className='T014'>32<span className='isUnit'>세</span></p>
                          <p className='T014'>1<span className='isUnit'>기</span></p>
                          <p className='T015'>210047938</p>
                        </div>
                      </Tooltip>
                      <div className='C037'>
                        <p className='T016'><span className='isUnit'>AM</span> 10:30 시작</p>
                        <p className='T017'>시술 대기</p>
                        <p className='T019'>-<span className='isBold isGreen'>대기없음</span></p><p className='T017'>O2 고압산소</p>
                        <p className='T016 isYellow'><span className='isBold'>21분</span> 대기</p>
                        <p className='T019'>-합계:<span className='isBold isRed'>31분</span></p>
                      </div>
                    </ListItem>
                    <ListItem>
                      <Tooltip text='고객 상세 정보'>
                        <div className='C035'>
                          <p className='T013'>신수빈</p>
                          <p className='T014 isRed'>여성</p>
                          <p className='T014'>32<span className='isUnit'>세</span></p>
                          <p className='T014'>1<span className='isUnit'>기</span></p>
                          <p className='T015'>210047938</p>
                        </div>
                      </Tooltip>
                      <div className='C037'>
                        <p className='T016'><span className='isUnit'>AM</span> 10:30 시작</p>
                        <p className='T017 isGreen'>진행중</p><p className='T017'>O2 고압산소</p>
                        <p className='T016'>01:12:34.56 <span className='isUnit'>경과</span> </p>
                        <p className='T019'>-예상:<span className='isBold'>1시간 30분</span></p>
                        <Tooltip text='업무 일정 보기'><div className='C039'><div className='C040 isMale'></div><p className='T018'>홍성훈<span className='isUnit'>원장</span></p></div></Tooltip>
                      </div>
                    </ListItem>
                    <ListItem>
                      <Tooltip text='고객 상세 정보'>
                        <div className='C035'>
                          <p className='T013'>신수빈</p>
                          <p className='T014 isRed'>여성</p>
                          <p className='T014'>32<span className='isUnit'>세</span></p>
                          <p className='T014'>1<span className='isUnit'>기</span></p>
                          <p className='T015'>210047938</p>
                        </div>
                      </Tooltip>
                      <div className='C037'>
                        <p className='T016'><span className='isUnit'>AM</span> 10:30 시작</p>
                        <p className='T017 isBlue'>시술 완료</p><p className='T017'>O2 고압산소</p>
                        <p className='T016'>01:12:34 <span className='isUnit'>경과</span> </p>
                        <Tooltip text='업무 일정 보기'><div className='C039'><div className='C040 isMale'></div><p className='T018'>홍성훈<span className='isUnit'>원장</span></p></div></Tooltip>
                      </div>
                    </ListItem>
                    <ListItem>
                      <Tooltip text='고객 상세 정보'>
                        <div className='C035'>
                          <p className='T013'>신수빈</p>
                          <p className='T014 isRed'>여성</p>
                          <p className='T014'>32<span className='isUnit'>세</span></p>
                          <p className='T014'>1<span className='isUnit'>기</span></p>
                          <p className='T015'>210047938</p>
                        </div>
                      </Tooltip>
                      <div className='C037'>
                        <p className='T016'><span className='isUnit'>AM</span> 10:30 시작</p>
                        <p className='T017'>시술 대기</p>
                        <p className='T019'>-순번:<span className='isBold isRed'>3</span></p><p className='T017'>O2 고압산소</p>
                        <p className='T016 isGreen'><span className='isBold'>11분</span> 대기</p>
                        <p className='T019'>-합계:<span className='isBold isYellow'>21분</span></p>
                      </div>
                    </ListItem>
                    <ListItem>
                      <Tooltip text='고객 상세 정보'>
                        <div className='C035'>
                          <p className='T013'>신수빈</p>
                          <p className='T014 isRed'>여성</p>
                          <p className='T014'>32<span className='isUnit'>세</span></p>
                          <p className='T014'>1<span className='isUnit'>기</span></p>
                          <p className='T015'>210047938</p>
                        </div>
                      </Tooltip>
                      <div className='C037'>
                        <p className='T016'><span className='isUnit'>AM</span> 10:30 시작</p>
                        <p className='T017 isGreen'>진행중</p><p className='T017'>O2 고압산소</p>
                        <p className='T016'>01:12:34.56 <span className='isUnit'>경과</span> </p>
                        <p className='T019'>-예상:<span className='isBold'>1시간 30분</span></p>
                        <Tooltip text='업무 일정 보기'><div className='C039'><div className='C040 isMale'></div><p className='T018'>홍성훈<span className='isUnit'>원장</span></p></div></Tooltip>
                      </div>
                    </ListItem>
                  </ScrollableContainer>
                </div>
                <div className={`C031 ${activeIndex === 3 ? 'isActived' : activeIndex !== null ? 'isFolded' : ''}`}>
                  <div className='C032' onClick={(e) => handleC032Click(3, e)}>
                    <div className='C036'>
                      <div className='C033 isIcon styleSheet isCoin'></div>
                    </div>
                    <p className='T011'>수납</p>
                    <p className='T012'>대기: <span className='isValue isBlack'>1</span>명 / 완료: <span className='isValue isBlue'>5</span>명</p>
                  <p className='T020'><span className='isBlack'>1</span> / <span className='isBlue'>5</span></p>
                  </div>
                  <ScrollableContainer>
                    <ListItem>
                      <Tooltip text='고객 상세 정보'>
                        <div className='C035'>
                          <p className='T013'>신수빈</p>
                          <p className='T014 isRed'>여성</p>
                          <p className='T014'>32<span className='isUnit'>세</span></p>
                          <p className='T014'>1<span className='isUnit'>기</span></p>
                          <p className='T015'>210047938</p>
                        </div>
                      </Tooltip>
                      <div className='C037'>
                        <p className='T016'><span className='isUnit'>AM</span> 10:30 이관</p>
                        <p className='T017'>수납 대기</p>
                        <p className='T016 isGreen'><span className='isBold'>11분</span> 대기</p>
                        <p className='T019'>-합계:<span className='isBold isRed'>41분</span></p>
                      </div>
                    </ListItem>
                    <ListItem>
                      <Tooltip text='고객 상세 정보'>
                        <div className='C035'>
                          <p className='T013'>신수빈</p>
                          <p className='T014 isRed'>여성</p>
                          <p className='T014'>32<span className='isUnit'>세</span></p>
                          <p className='T014'>1<span className='isUnit'>기</span></p>
                          <p className='T015'>210047938</p>
                        </div>
                      </Tooltip>
                      <div className='C037'>
                        <p className='T016'><span className='isUnit'>AM</span> 10:30 수납</p>
                        <p className='T016 isBlue'>252,000<span className='isUnit'>원</span></p>
                        <p className='T019'>미수:<span className='isBold isMint'>750,000</span>원</p>
                      </div>
                    </ListItem>
                    <ListItem>
                      <Tooltip text='고객 상세 정보'>
                        <div className='C035'>
                          <p className='T013'>신수빈</p>
                          <p className='T014 isRed'>여성</p>
                          <p className='T014'>32<span className='isUnit'>세</span></p>
                          <p className='T014'>1<span className='isUnit'>기</span></p>
                          <p className='T015'>210047938</p>
                        </div>
                      </Tooltip>
                      <div className='C037'>
                        <p className='T016'><span className='isUnit'>AM</span> 10:30 수납</p>
                        <p className='T016 isBlue'>252,000<span className='isUnit'>원</span></p>
                        <p className='T019'>미수:<span className='isBold isMint'>750,000</span>원</p>
                      </div>
                    </ListItem>
                    <ListItem>
                      <Tooltip text='고객 상세 정보'>
                        <div className='C035'>
                          <p className='T013'>신수빈</p>
                          <p className='T014 isRed'>여성</p>
                          <p className='T014'>32<span className='isUnit'>세</span></p>
                          <p className='T014'>1<span className='isUnit'>기</span></p>
                          <p className='T015'>210047938</p>
                        </div>
                      </Tooltip>
                      <div className='C037'>
                        <p className='T016'><span className='isUnit'>AM</span> 10:30 귀가</p>
                        <p className='T016 isBlue'>252,000<span className='isUnit'>원</span></p>
                        <p className='T019'>미수:<span className='isBold isMint'>750,000</span>원</p>
                      </div>
                    </ListItem>
                    <ListItem>
                      <Tooltip text='고객 상세 정보'>
                        <div className='C035'>
                          <p className='T013'>신수빈</p>
                          <p className='T014 isRed'>여성</p>
                          <p className='T014'>32<span className='isUnit'>세</span></p>
                          <p className='T014'>1<span className='isUnit'>기</span></p>
                          <p className='T015'>210047938</p>
                        </div>
                      </Tooltip>
                      <div className='C037'>
                        <p className='T016'><span className='isUnit'>AM</span> 10:30 귀가</p>
                        <p className='T016 isBlue'>252,000<span className='isUnit'>원</span></p>
                        <p className='T019'>미수:<span className='isBold isMint'>750,000</span>원</p>
                      </div>
                    </ListItem>
                    <ListItem>
                      <Tooltip text='고객 상세 정보'>
                        <div className='C035'>
                          <p className='T013'>신수빈</p>
                          <p className='T014 isRed'>여성</p>
                          <p className='T014'>32<span className='isUnit'>세</span></p>
                          <p className='T014'>1<span className='isUnit'>기</span></p>
                          <p className='T015'>210047938</p>
                        </div>
                      </Tooltip>
                      <div className='C037'>
                        <p className='T016'><span className='isUnit'>AM</span> 10:30 귀가</p>
                        <p className='T016 isBlue'>252,000<span className='isUnit'>원</span></p>
                        <p className='T019'>미수:<span className='isBold isMint'>750,000</span>원</p>
                      </div>
                    </ListItem>
                  </ScrollableContainer>
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>
      <Sidebar />
    </>
  )
}

