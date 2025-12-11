'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import PageHeader from '@/components/PageHeader'
import ToggleSwitch from '@/components/ToggleSwitch'

export default function ReceptionPage() {
  const [isSmallScreen, setIsSmallScreen] = useState(false)

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

            </div>
          </section>
        </article>
      </main>
      <Sidebar />
    </>
  )
}

