'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Tooltip from '@/components/Tooltip'

export default function Sidebar() {
  const pathname = usePathname()
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const menuItems = [
    { href: '/dashboard', icon: 'isDashboard', label: '대시보드' },
    { href: '/reception', icon: 'isReception', label: '원무' },
    { href: '/counseling', icon: 'isCounseling', label: '상담' },
    { href: '/pre-care', icon: 'isPreCare', label: '전처치' },
    { href: '/clinic', icon: 'isProcedure', label: '진료' },
    { href: '/surgery', icon: 'isSurgery', label: '수술' },
    { href: '/procedure', icon: 'isClinic', label: '시술' },
    { href: '/post-care', icon: 'isPostCare', label: '후관리' },
    { href: '/statistics', icon: 'isStatistics', label: '통계' },
  ]

  useEffect(() => {
    let resizeTimeoutId: ReturnType<typeof setTimeout> | null = null
    
    const checkOverflow = () => {
      if (scrollContainerRef.current) {
        const element = scrollContainerRef.current
        const hasOverflow = element.scrollHeight > element.clientHeight
        
        if (hasOverflow) {
          element.classList.add('isOverflowed')
        } else {
          element.classList.remove('isOverflowed')
        }
      }
    }

    const debouncedCheckOverflow = () => {
      if (resizeTimeoutId) {
        clearTimeout(resizeTimeoutId)
      }
      resizeTimeoutId = setTimeout(() => {
        checkOverflow()
      }, 150)
    }

    checkOverflow()

    const resizeObserver = new ResizeObserver(debouncedCheckOverflow)
    if (scrollContainerRef.current) {
      resizeObserver.observe(scrollContainerRef.current)
    }

    window.addEventListener('resize', debouncedCheckOverflow)

    return () => {
      if (resizeTimeoutId) clearTimeout(resizeTimeoutId)
      resizeObserver.disconnect()
      window.removeEventListener('resize', debouncedCheckOverflow)
    }
  }, [])

  return (
    <nav className='C000'>
      <div className='C001'>
        <div className='C002'></div>
        <p className='T000'>홍성훈</p>
        <p className='T001'>부산병원</p>
      </div>
      <div ref={scrollContainerRef} className='C003'>
        {menuItems.map((item) => (
          <Tooltip key={item.href} text={item.label}>
            <Link
              href={item.href}
              className={`C004 ${pathname === item.href ? 'isSelected' : ''}`}
            >
              <div className={`C005 styleSheet isIcon ${item.icon} isBig`}></div>
            </Link>
          </Tooltip>
        ))}
      </div>
      <div className='C006'>
        <Tooltip text='설정'>
          <Link href='/settings' className='C004'>
            <div className='C005 styleSheet isIcon isSettings isBig'></div>
          </Link>
        </Tooltip>
      </div>
    </nav>
  )
}

