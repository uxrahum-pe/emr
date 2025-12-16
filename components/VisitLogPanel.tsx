'use client'

import { useState, useRef, useEffect } from 'react'
import ScrollableContainer, { ScrollableContainerRef } from '@/components/ScrollableContainer'

export default function VisitLogPanel() {
  // Date selection state
  const [selectedDate, setSelectedDate] = useState<string>('2025-12-15')
  
  // Refs
  const c106ScrollRef = useRef<ScrollableContainerRef>(null)
  const c107ScrollRef = useRef<ScrollableContainerRef>(null)
  
  // C129 click handler
  const handleC129Click = (date: string, event: React.MouseEvent) => {
    setSelectedDate(date)
    const clickedElement = event.currentTarget as HTMLElement
    
    // 향후 일정 클릭 시 C107 scrollTop을 0으로
    if (date === '') {
      setTimeout(() => {
        const scrollContainer = c107ScrollRef.current?.getElement()
        if (scrollContainer) {
          scrollContainer.scrollTo({ 
            top: 0, 
            behavior: 'smooth' 
          })
        }
      }, 100)
      return
    }
    
    // C106 스크롤
    setTimeout(() => {
      const scrollContainer = c106ScrollRef.current?.getElement()
      if (scrollContainer && clickedElement) {
        const size5 = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--size-5')) || 5
        const scrollTop = clickedElement.offsetTop - size5
        scrollContainer.scrollTo({ 
          top: Math.max(0, scrollTop), 
          behavior: 'smooth' 
        })
      }
    }, 100)

    // C107에서 해당 날짜의 T061로 스크롤
    setTimeout(() => {
      const scrollContainer = c107ScrollRef.current?.getElement()
      if (scrollContainer) {
        const t061Elements = scrollContainer.querySelectorAll('.T061')
        t061Elements.forEach((element) => {
          const dateText = element.textContent || ''
          const dateMatch = dateText.match(/(\d{4})\.(\d{2})\.(\d{2})/)
          if (dateMatch) {
            const elementDate = `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}`
            if (elementDate === date) {
              const containerRect = scrollContainer.getBoundingClientRect()
              const elementRect = element.getBoundingClientRect()
              const size5 = parseFloat(window.getComputedStyle(document.documentElement).getPropertyValue('--size-5')) || 5
              const scrollTop = scrollContainer.scrollTop + (elementRect.top - containerRect.top) - size5
              scrollContainer.scrollTo({ 
                top: Math.max(0, scrollTop), 
                behavior: 'smooth' 
              })
            }
          }
        })
      }
    }, 150)
  }
  
  // C107 스크롤에 따라 현재 보이는 날짜 감지
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null
    const rafIdRef = { current: null as number | null }
    let scrollContainer: HTMLDivElement | null = null
    let handleScroll: (() => void) | null = null

    const checkVisibleDate = () => {
      const currentScrollContainer = c107ScrollRef.current?.getElement()
      if (!currentScrollContainer) return
      
      const containerRect = currentScrollContainer.getBoundingClientRect()
      
      // C138이 상단에 보이면 향후 일정 선택
      const c138Element = currentScrollContainer.querySelector('.C138')
      if (c138Element) {
        const c138Rect = c138Element.getBoundingClientRect()
        if (c138Rect.top <= containerRect.top + 100 && c138Rect.bottom > containerRect.top) {
          setSelectedDate('')
          return
        }
      }
      
      const t061Elements = currentScrollContainer.querySelectorAll('.T061')
      
      let visibleDate = ''
      let minDistance = Infinity

      t061Elements.forEach((element) => {
        const rect = element.getBoundingClientRect()
        const distance = Math.abs(rect.top - containerRect.top)
        
        // 상단에 가장 가까운 T061 찾기
        if (rect.top <= containerRect.top + 100 && distance < minDistance) {
          minDistance = distance
          const dateText = element.textContent || ''
          // "2025.12.15 (월)" 형식에서 날짜 추출
          const dateMatch = dateText.match(/(\d{4})\.(\d{2})\.(\d{2})/)
          if (dateMatch) {
            visibleDate = `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}`
          }
        }
      })

      if (visibleDate) {
        setSelectedDate(visibleDate)
      }
    }

    // ref가 설정될 때까지 기다림
    const setupScrollListener = () => {
      scrollContainer = c107ScrollRef.current?.getElement() || null
      if (!scrollContainer) {
        // ref가 아직 설정되지 않았으면 다시 시도
        timeoutId = setTimeout(setupScrollListener, 100)
        return
      }

      handleScroll = () => {
        // requestAnimationFrame으로 throttling
        if (rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current)
        }
        
        rafIdRef.current = requestAnimationFrame(() => {
          checkVisibleDate()
        })
      }

      scrollContainer.addEventListener('scroll', handleScroll, { passive: true })
      
      // 초기 실행
      setTimeout(() => {
        checkVisibleDate()
      }, 100)
    }

    setupScrollListener()

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }
      if (scrollContainer && handleScroll) {
        scrollContainer.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return (
    <div className='C099'>
      <div className='C104'>
        <p className='T047'>내원일지</p>
      </div>
      <div className='C105'>
        <ScrollableContainer ref={c106ScrollRef} className='C106'>
          <div className={`C129 ${selectedDate === '' ? 'isSelected' : ''}`} onClick={(e) => handleC129Click('', e)}>
            <p className='T057'><span className='isGreen isLabel'>2<span className='isUnit'>기</span></span> 향후 일정</p>
            <p className='T055'><span className='isUnit'>~ 2026.</span>09.23</p>
          </div>
          <div className={`C129 ${selectedDate === '2025-12-15' ? 'isSelected' : ''}`} onClick={(e) => handleC129Click('2025-12-15', e)}>
            <p className='T057'><span className='isGreen isLabel'>2<span className='isUnit'>기</span></span> <span className='isGrey'>2025<span className='isUnit'>년</span></span></p>
            <p className='T056'>12.15 <span className='isMini'>(월)</span></p>
            <p className='T058'>부산병원</p>
          </div>
          <div className={`C129 ${selectedDate === '2025-12-08' ? 'isSelected' : ''}`} onClick={(e) => handleC129Click('2025-12-08', e)}>
            <p className='T057'><span className='isGreen isLabel'>2<span className='isUnit'>기</span></span> <span className='isGrey'>2025<span className='isUnit'>년</span></span></p>
            <p className='T056'>12.08 <span className='isMini'>(월)</span></p>
            <p className='T058'>부산병원</p>
          </div>
          <div className={`C129 ${selectedDate === '2025-12-01' ? 'isSelected' : ''}`} onClick={(e) => handleC129Click('2025-12-01', e)}>
            <p className='T057'><span className='isGreen isLabel'>2<span className='isUnit'>기</span></span> <span className='isGrey'>2025<span className='isUnit'>년</span></span></p>
            <p className='T056'>12.01 <span className='isMini'>(월)</span></p>
            <p className='T058'>부산병원</p>
          </div>
          <div className={`C129 ${selectedDate === '2025-11-24' ? 'isSelected' : ''}`} onClick={(e) => handleC129Click('2025-11-24', e)}>
            <p className='T057'><span className='isGreen isLabel'>2<span className='isUnit'>기</span></span> <span className='isGrey'>2025<span className='isUnit'>년</span></span></p>
            <p className='T056'>11.24 <span className='isMini'>(월)</span></p>
            <p className='T058'>부산병원</p>
          </div>
          <div className={`C129 ${selectedDate === '2025-11-17' ? 'isSelected' : ''}`} onClick={(e) => handleC129Click('2025-11-17', e)}>
            <p className='T057'><span className='isGreen isLabel'>2<span className='isUnit'>기</span></span> <span className='isGrey'>2025<span className='isUnit'>년</span></span></p>
            <p className='T056'>11.17 <span className='isMini'>(월)</span></p>
            <p className='T058'>부산병원</p>
          </div>
          <div className={`C129 ${selectedDate === '2025-11-10' ? 'isSelected' : ''}`} onClick={(e) => handleC129Click('2025-11-10', e)}>
            <p className='T057'><span className='isLabel'>1<span className='isUnit'>기</span></span> <span className='isGrey'>2025<span className='isUnit'>년</span></span></p>
            <p className='T056'>11.10 <span className='isMini'>(월)</span></p>
          </div>
          <div className={`C129 ${selectedDate === '2025-11-03' ? 'isSelected' : ''}`} onClick={(e) => handleC129Click('2025-11-03', e)}>
            <p className='T057'><span className='isLabel'>1<span className='isUnit'>기</span></span> <span className='isGrey'>2025<span className='isUnit'>년</span></span></p>
            <p className='T056'>11.03 <span className='isMini'>(월)</span></p>
            <p className='T058'>부산병원</p>
          </div>
          <div className={`C129 ${selectedDate === '2025-10-27' ? 'isSelected' : ''}`} onClick={(e) => handleC129Click('2025-10-27', e)}>
            <p className='T057'><span className='isLabel'>1<span className='isUnit'>기</span></span> <span className='isGrey'>2025<span className='isUnit'>년</span></span></p>
            <p className='T056'>10.27 <span className='isMini'>(월)</span></p>
            <p className='T058'>부산병원</p>
          </div>
          <div className={`C129 ${selectedDate === '2025-10-20' ? 'isSelected' : ''}`} onClick={(e) => handleC129Click('2025-10-20', e)}>
            <p className='T057'><span className='isLabel'>1<span className='isUnit'>기</span></span> <span className='isGrey'>2025<span className='isUnit'>년</span></span></p>
            <p className='T056'>10.20 <span className='isMini'>(월)</span></p>
            <p className='T058'>부산병원</p>
          </div>
          <div className={`C129 ${selectedDate === '2025-10-13' ? 'isSelected' : ''}`} onClick={(e) => handleC129Click('2025-10-13', e)}>
            <p className='T057'><span className='isLabel'>1<span className='isUnit'>기</span></span> <span className='isGrey'>2025<span className='isUnit'>년</span></span></p>
            <p className='T056'>10.13 <span className='isMini'>(월)</span></p>
            <p className='T058'>부산병원</p>
          </div>
          <div className={`C129 ${selectedDate === '2025-10-06' ? 'isSelected' : ''}`} onClick={(e) => handleC129Click('2025-10-06', e)}>
            <p className='T057'><span className='isLabel'>1<span className='isUnit'>기</span></span> <span className='isGrey'>2025<span className='isUnit'>년</span></span></p>
            <p className='T056'>10.06 <span className='isMini'>(월)</span></p>
            <p className='T058'>부산병원</p>
          </div>
        </ScrollableContainer>
        <ScrollableContainer ref={c107ScrollRef} className='C107'>
          <div className='C138'>
          <div className='C130'>
            <div className="C131">
              <div className="C080"><div className="C081 styleSheet isIcon isMini isClock"></div></div>
              <p className='T059'><span className='isGrey'>2025.</span>12.15 <span className='isUnit'>(예상) - 수술 후  </span> 7<span className='isUnit'>주차</span></p>
            </div>
          </div>
          <div className='C137'>
            <div className="C131">
              <div className="C080 isEmpty"></div>
            </div>
            <div className="C136">
              <div className="C133">
                <div className="C134 styleSheet isIcon isDrug"></div>
                <p className="T060">약처방 <span className='isUnit'>- 예정</span></p>
              </div>
            </div>
          </div>
          <div className='C137'>
            <div className="C131">
              <div className="C080 isEmpty"></div>
            </div>
            <div className="C136">
              <div className="C133">
                <div className="C134 styleSheet isIcon isCamera"></div>
                <p className="T060">사진촬영 <span className='isUnit'>- 예정</span></p>
              </div>
            </div>
          </div>
          <div className='C137'>
            <div className="C131">
              <div className="C080 isEmpty"></div>
            </div>
            <div className="C136">
              <div className="C133">
                <div className="C134 styleSheet isIcon isPackage"></div>
                <p className="T060">패키지 상담 <span className='isUnit'>- 예정</span></p>
              </div>
            </div>
          </div>
          <div className='C137'>
            <div className="C131">
              <div className="C080 isEmpty"></div>
            </div>
            <div className="C136">
              <div className="C133">
                <div className="C134 styleSheet isIcon isLeaf"></div>
                <p className="T060">경과 상담 <span className='isUnit'>- 예정</span></p>
              </div>
            </div>
          </div>
          <div className='C137'>
            <div className="C131">
              <div className="C080 isEmpty"></div>
            </div>
            <div className="C136">
              <div className="C133">
                <div className="C134 styleSheet isIcon isSyringe"></div>
                <p className="T060">엔더 <span className='isGrey'>(잔여 <span className='isRed isBold'>2</span>회)</span><span className='isUnit'>- 수술 예약 필요</span></p>
              </div>
            </div>
          </div>
          </div>
          <div className='C135'>
            <p className='T061'>2025.12.15 (월)</p>
          </div>
          <div className='C130'>
            <div className="C131">
              <div className="C080"><div className="C081 styleSheet isIcon isMini isChecked"></div></div>
              <p className='T059'><span className='isUnit'>AM</span> 11:15</p>
              <div className="C039"><div className="C040"></div><p className="T018">김유정 <span className="isUnit">상담사</span></p></div>
            </div>
            <div className="C132">
              <div className="C133">
                <div className="C134 isIMaskBlueMint isCheck"></div>
                <p className="T060">신환 수술 설문지 - <span className="isBlue">작성 완료</span></p>
              </div>
            </div>
          </div>
          <div className='C130'>
            <div className="C131">
              <div className="C080"><div className="C081 styleSheet isIcon isMini isChecked"></div></div>
              <p className='T059'><span className='isUnit'>AM</span> 11:15</p>
              <div className="C039"><div className="C040"></div><p className="T018">김유정 <span className="isUnit">상담사</span></p></div>
            </div>
            <div className="C132">
              <div className="C133">
                <div className="C134 isIMaskBlueMint isCheck"></div>
                <p className="T060">신환 수술 설문지 - <span className="isBlue">작성 완료</span></p>
              </div>
            </div>
          </div>
          <div className='C135'>
            <p className='T061'>2025.12.08 (월)</p>
          </div>
          <div className='C130'>
            <div className="C131">
              <div className="C080"><div className="C081 styleSheet isIcon isMini isChecked"></div></div>
              <p className='T059'><span className='isUnit'>AM</span> 11:15</p>
              <div className="C039"><div className="C040"></div><p className="T018">김유정 <span className="isUnit">상담사</span></p></div>
            </div>
            <div className="C132">
              <div className="C133">
                <div className="C134 isIMaskBlueMint isCheck"></div>
                <p className="T060">신환 수술 설문지 - <span className="isBlue">작성 완료</span></p>
              </div>
            </div>
          </div>
          <div className='C130'>
            <div className="C131">
              <div className="C080"><div className="C081 styleSheet isIcon isMini isChecked"></div></div>
              <p className='T059'><span className='isUnit'>AM</span> 11:15</p>
              <div className="C039"><div className="C040"></div><p className="T018">김유정 <span className="isUnit">상담사</span></p></div>
            </div>
            <div className="C132">
              <div className="C133">
                <div className="C134 isIMaskBlueMint isCheck"></div>
                <p className="T060">신환 수술 설문지 - <span className="isBlue">작성 완료</span></p>
              </div>
            </div>
          </div>
          <div className='C135'>
            <p className='T061'>2025.12.01 (월)</p>
          </div>
          <div className='C130'>
            <div className="C131">
              <div className="C080"><div className="C081 styleSheet isIcon isMini isChecked"></div></div>
              <p className='T059'><span className='isUnit'>AM</span> 11:15</p>
              <div className="C039"><div className="C040"></div><p className="T018">김유정 <span className="isUnit">상담사</span></p></div>
            </div>
            <div className="C132">
              <div className="C133">
                <div className="C134 isIMaskBlueMint isCheck"></div>
                <p className="T060">신환 수술 설문지 - <span className="isBlue">작성 완료</span></p>
              </div>
            </div>
          </div>
          <div className='C130'>
            <div className="C131">
              <div className="C080"><div className="C081 styleSheet isIcon isMini isChecked"></div></div>
              <p className='T059'><span className='isUnit'>AM</span> 11:15</p>
              <div className="C039"><div className="C040"></div><p className="T018">김유정 <span className="isUnit">상담사</span></p></div>
            </div>
            <div className="C132">
              <div className="C133">
                <div className="C134 isIMaskBlueMint isCheck"></div>
                <p className="T060">신환 수술 설문지 - <span className="isBlue">작성 완료</span></p>
              </div>
            </div>
          </div>
        </ScrollableContainer>
      </div>
    </div>
  )
}

