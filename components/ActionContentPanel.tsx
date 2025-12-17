'use client'

interface ActionContentPanelProps {
  actionId: string
  actionLabel: string
}

export default function ActionContentPanel({ actionId, actionLabel }: ActionContentPanelProps) {
  return (
    <div className='C099'>
      <div className='C104'>
        <p className='T047'>{actionLabel}</p>
      </div>
      <div className='C105'>
        <div className='C106'>
          <div className="C129 isSelected"><p className="T056 isLabel isGreen">3<span className="isMini">기</span></p><p className="T057"><span className="isGrey">2025.</span>09.23<span className="isGrey"> ~ </span><span className="isRed isBold">진행중</span></p><p className="T057"><span className="isUnit"> (경과: </span>365<span className="isUnit">일)</span></p><p className="T058">부산병원</p></div>
          <div className="C129"><p className="T056 isLabel isGreen">2<span className="isMini">기</span></p><p className="T057"><span className="isGrey">2024.</span>09.23<span className="isGrey"> ~ 2025.</span>09.23</p><p className="T057"><span className="isUnit"> (경과: </span>365<span className="isUnit">일)</span></p><p className="T058">부산병원</p></div>
          <div className="C129"><p className="T056 isLabel">1<span className="isMini">기</span></p><p className="T057"><span className="isGrey">2023.</span>09.23<span className="isGrey"> ~ 2024.</span>09.23</p><p className="T057"><span className="isUnit"> (기간: </span>365<span className="isUnit">일)</span></p><p className="T058">부산병원</p></div>
        </div>
        <div className='C107'></div>
      </div>
    </div>
  )
}

