"use client";

import { useState } from "react";
import PopupSectionBox from "@/components/PopupSectionBox";
import Popup from "@/components/Popup";
import CustomerInfo from "@/components/CustomerInfo";
import AuthorInfo from "@/components/AuthorInfo";
import PaymentCard from "@/components/PaymentCard";
import TargetPackageCard from "@/components/TargetPackageCard";

/**
 * DailyProcedurePopup Component
 *
 * @description 일일시술&처방 팝업 컴포넌트입니다.
 *
 * @component
 */

import type { DailyProcedurePopupProps } from "@/types/popups";

/**
 * 일일시술&처방 팝업 컴포넌트
 */
export default function DailyProcedurePopup({
  onClose,
}: DailyProcedurePopupProps) {
  const [isCustomerBasicInfoPopupOpen, setIsCustomerBasicInfoPopupOpen] =
    useState(false);

  return (
    <>
      <PopupSectionBox x={40} y={40} width={1240} height={100}>
        <div className="C180">
          <p className="T076">일일 시술 & 처방 등록</p>
          <div className="C2107">
            <AuthorInfo
              imageSrc="/images/male-64.jpg"
              imageAlt="작성자"
              label="작성자"
              name="홍성훈"
              title="원장님"
            />
          </div>
          <div className="C2108">
            <div className="C2109">
              <div className="C2110">
                <div className="styleSheet isIcon isWrite"></div>
              </div>
              <p className="T2105">패키지 추가</p>
            </div>
          </div>
        </div>
      </PopupSectionBox>

      <PopupSectionBox x={1300} y={40} width={460} height={100}>
        <div className="C180">
          <CustomerInfo
            name="신수빈"
            gender="여성"
            age={32}
            packageNumber={1}
            customerNumber="210047938"
            onInfoClick={() => setIsCustomerBasicInfoPopupOpen(true)}
          />
        </div>
      </PopupSectionBox>

      <PopupSectionBox x={1780} y={40} width={100} height={100}>
        <div className="C230">
          <div className="C181 isCloseButton" onClick={onClose}>
            <div className="C179 isDepth1"></div>
            <div className="C182 styleSheet isIcon isBig isClose isWhite"></div>
          </div>
        </div>
      </PopupSectionBox>
      
      <PopupSectionBox x={40} y={160} width={220} height={880} innerClassName="C183 C2117">
        <div className="C233">
          <div className="C231">
            <p className="T098">수납 내역</p>
          </div>
          <div className="C232">
            <div className="C2116">
              <PaymentCard
                date="2025.09.23"
                time="AM 11:01"
                packageNumber={2}
                isSelected={true}
                status="today"
              />
              <PaymentCard
                date="2025.08.04"
                time="AM 11:01"
                packageNumber={2}
                isSelected={false}
              />
              <div
                style={{
                  position: "relative",
                  minHeight: "calc(var(--size-140) - var(--size-15) + var(--size-120) + var(--size-10))",
                }}
              >
                <PaymentCard
                  date="2025.06.23"
                  time="AM 11:01"
                  packageNumber={2}
                  isSelected={false}
                  status="refunded"
                />
                <PaymentCard
                  date="2025.09.23"
                  time="AM 11:23"
                  isSelected={false}
                  status="refund-info"
                  refundDate="2025.09.23"
                  refundTime="AM 11:23"
                />
              </div>
              <PaymentCard
                date="2025.02.23"
                time="AM 11:01"
                packageNumber={2}
                isSelected={false}
              />
            </div>
          </div>
        </div>
      </PopupSectionBox>

      <PopupSectionBox x={190} y={160} width={1090} height={880}>
        <div className="C233">
          <div className="C231">
            <p className="T098">대상 패키지 목록</p>
          </div>
          <div className="C232">
            <div className="C2118">
              <TargetPackageCard
                checked={true}
                isTarget={true}
                partIcon="styleSheet isIcon isAbdomen"
                category="수술 복부"
                detailName="무한 복부 위아래 + 러브 + 옆구리 (앞)"
                spec="B2(62~64.8cm이하)"
                type="병행"
                applicationStatus="진행"
                procedureCount={3}
                code="CODE: FAT242 / GRCODE: D088"
                originalPrice={4180000}
                discountPrice={0}
                practiceIndex={0}
                deposit={418000}
                balance={3762000}
                paidAmount={418000}
                status="수납대상"
              />
              <TargetPackageCard
                checked={true}
                isTarget={true}
                partIcon="styleSheet isIcon isHip"
                category="수술 복부"
                detailName="무한 미니 [흡입과 같이] 힙윗라인"
                spec="B2(62~64.8cm이하)"
                type="병행"
                applicationStatus="진행"
                procedureCount={3}
                code="CODE: FAT242 / GRCODE: D088"
                originalPrice={638000}
                discountPrice={-100000}
                practiceIndex={0}
                deposit={63800}
                balance={474200}
                paidAmount={63800}
                status="수납대상"
              />
              <TargetPackageCard
                checked={false}
                isTarget={false}
                partIcon="styleSheet isIcon isGarment"
                category="수술 복부"
                detailName="무한 가멘트 - 복부 (여자용)"
                spec="B2(62~64.8cm이하)"
                type="병행"
                applicationStatus="진행"
                procedureCount={3}
                code="CODE: FAT242 / GRCODE: D088"
                originalPrice={170000}
                discountPrice={0}
                practiceIndex={-50000}
                deposit={170000}
                balance={0}
                paidAmount={120000}
                status="결제완료"
              />
              <TargetPackageCard
                checked={false}
                isTarget={false}
                partIcon="styleSheet isIcon isGarment"
                category="수술 복부"
                detailName="무한 가멘트 - 복부 (여자용)"
                spec="B2(62~64.8cm이하)"
                type="병행"
                applicationStatus="진행"
                procedureCount={3}
                code="CODE: FAT242 / GRCODE: D088"
                originalPrice={170000}
                discountPrice={0}
                practiceIndex={-50000}
                deposit={170000}
                balance={0}
                paidAmount={120000}
                status="결제완료"
              />
            </div>
          </div>
        </div>
      </PopupSectionBox>
      
      <PopupSectionBox x={1300} y={160} width={580} height={240}>
        <div className="C233">
          <div className="C2105">
            <p className="T2103">상담내용</p>
            <p className="T2104">최종 상담일시: 2024.11.07 16:31</p>
          </div>
          <div className="C2106">

          </div>
        </div>
      </PopupSectionBox>

      <PopupSectionBox x={1520} y={420} width={360} height={620}> 
        <div className="C233">
        </div>
      </PopupSectionBox>

      <PopupSectionBox x={1300} y={420} width={280} height={620}> 
        <div className="C233">  
        </div>
      </PopupSectionBox>

      <PopupSectionBox x={40} y={1060} width={1840} height={100}> 
        <div className="C230">  
        </div>
      </PopupSectionBox>
    </>
  );
}
