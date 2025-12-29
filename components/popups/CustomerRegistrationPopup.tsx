/**
 * CustomerRegistrationPopup Component
 *
 * @description 고객 직접 등록 팝업 컴포넌트입니다.
 */

"use client";

import { useState, memo } from "react";
import Popup from "@/components/Popup";
import PopupSectionBox from "@/components/PopupSectionBox";
import LabeledCheckbox from "@/components/LabeledCheckbox";
import ValidatedInput from "@/components/ValidatedInput";

interface CustomerRegistrationPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomerRegistrationPopup = memo(function CustomerRegistrationPopup({
  isOpen,
  onClose,
}: CustomerRegistrationPopupProps) {
  // 체크박스 상태
  const [useAliasChecked, setUseAliasChecked] = useState(false);
  const [customerRejectedChecked, setCustomerRejectedChecked] = useState(false);
  const [smsRejectedChecked, setSmsRejectedChecked] = useState(false);
  const [smsReceivedChecked, setSmsReceivedChecked] = useState(false);
  const [verifiedCustomerAuthChecked, setVerifiedCustomerAuthChecked] = useState(false);
  const [unverifiedCustomerAuthChecked, setUnverifiedCustomerAuthChecked] = useState(false);
  const [hospitalCallRejectedChecked, setHospitalCallRejectedChecked] = useState(false);
  const [supporterChecked, setSupporterChecked] = useState(false);
  const [foreignerChecked, setForeignerChecked] = useState(false);
  const [koreanChecked, setKoreanChecked] = useState(false);
  const [hasResidencePermitChecked, setHasResidencePermitChecked] = useState(false);
  const [noResidencePermitChecked, setNoResidencePermitChecked] = useState(false);

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <PopupSectionBox x={290} y={70} width={660} height={1060}>
        <div className="C1003">
          <div className="C1007">
            <div className="C1000">
              <p className="T1000">주민번호:</p>
              <div className="C1017">
                <ValidatedInput
                  className="T1002"
                  type="text"
                  placeholder="000000-0******"
                  minLength={14}
                  required
                  minLengthErrorMessage="입력값이 모자랍니다"
                />
              </div>
              <button className="C1005">중복검사</button>
              <div className="C1011">
                <LabeledCheckbox
                  checked={useAliasChecked}
                  onChange={setUseAliasChecked}
                  text="가명 사용"
                />
              </div>
            </div>
          </div>

          <div className="C1007">
            <div className="C1000">
              <p className="T1000">성명:</p>
              <div className="C1017">
                <ValidatedInput
                  className="T1002"
                  type="text"
                  placeholder="최대 16자까지"
                  minLength={1}
                  maxLength={16}
                  required
                  minLengthErrorMessage="입력값이 모자랍니다"
                />
              </div>
              <p className="T1000">가명:</p>
              <div className="C1017">
                <ValidatedInput
                  className="T1002"
                  type="text"
                  placeholder="최대 16자까지"
                  minLength={1}
                  maxLength={16}
                  required
                  minLengthErrorMessage="입력값이 모자랍니다"
                />
              </div>
            </div>
          </div>

          <div className="C1007">
            <div className="C1000">
              <p className="T1000">전화번호:</p>
              <div className="C1017">
                <ValidatedInput
                  className="T1002"
                  type="text"
                  placeholder="000-0000-0000"
                  minLength={13}
                  maxLength={13}
                  required
                  minLengthErrorMessage="입력값이 모자랍니다"
                />
              </div>
              <button className="C1005">인증요청</button>
              <input className="T1002" type="text" placeholder="6자리" />
              <button className="C1010">확인</button>
            </div>
          </div>

          <div className="C1007">
            <div className="C1000">
              <p className="T1000">자택번호:</p>
              <div className="C1017">
                <ValidatedInput
                  className="T1002"
                  type="text"
                  placeholder="000-0000-0000"
                  minLength={13}
                  maxLength={13}
                  required
                  minLengthErrorMessage="입력값이 모자랍니다"
                />
              </div>
              <p className="T1000">이메일:</p>
              <div className="C1017">
                <ValidatedInput
                  className="T1002"
                  type="text"
                  placeholder="최대32자까지"
                  minLength={1}
                  maxLength={32}
                  required
                  validateEmail={true}
                  minLengthErrorMessage="입력값이 모자랍니다"
                  emailErrorMessage="입력 양식이 잘못되었습니다."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="C1007">
          <div className="C1000">
            <p className="T1000">주소:</p>
            <div className="C1004">
              <ValidatedInput className="T1001" type="text" placeholder="" required />
              <button className="C1005">주소검색</button>
            </div>
          </div>
        </div>

        <div className="C1009"></div>

        <div className="C1007">
          <div className="C1000">
            <p className="T1000">SMS수신:</p>
            <div className="C1018">
              <LabeledCheckbox
                checked={customerRejectedChecked}
                onChange={setCustomerRejectedChecked}
                text="고객 거부"
              />
              <LabeledCheckbox
                checked={smsRejectedChecked}
                onChange={setSmsRejectedChecked}
                text="수신 금지"
              />
              <LabeledCheckbox
                checked={smsReceivedChecked}
                onChange={setSmsReceivedChecked}
                text="수신 받음"
              />
            </div>
          </div>
        </div>

        <div className="C1007">
          <div className="C1000">
            <p className="T1000">거부사유:</p>
            <div className="C1008">
              종류 선택
              <div className="C1019 isIcon styleSheet isMini isChevron isWhite"></div>
            </div>
            <div className="C1017">
              <ValidatedInput
                className="T1002 isLong"
                type="text"
                placeholder="최대64자까지"
                maxLength={64}
              />
            </div>
          </div>
        </div>

        <div className="C1007">
          <div className="C1000">
            <p className="T1000">할인구분:</p>
            <div className="C1008">
              종류 선택
              <div className="C1019 isIcon styleSheet isMini isChevron isWhite"></div>
            </div>
            <p className="T1000">직업:</p>
            <div className="C1008">
              종류 선택
              <div className="C1019 isIcon styleSheet isMini isChevron isWhite"></div>
            </div>
          </div>
        </div>

        <div className="C1007">
          <div className="C1000">
            <p className="T1000">본인인증:</p>
            <div className="C1018">
              <LabeledCheckbox
                checked={verifiedCustomerAuthChecked}
                onChange={setVerifiedCustomerAuthChecked}
                text="인증 고객"
              />
              <LabeledCheckbox
                checked={unverifiedCustomerAuthChecked}
                onChange={setUnverifiedCustomerAuthChecked}
                text="미인증 고객"
              />
            </div>
          </div>
        </div>

        <div className="C1007">
          <div className="C1000">
            <p className="T1000">특기사항:</p>
            <div className="C1018">
              <LabeledCheckbox
                checked={hospitalCallRejectedChecked}
                onChange={setHospitalCallRejectedChecked}
                text="병원 전화 금지"
              />
              <LabeledCheckbox
                checked={supporterChecked}
                onChange={setSupporterChecked}
                text="서포터즈"
              />
            </div>
          </div>
        </div>

        <div className="C1009"></div>

        <div className="C1007">
          <div className="C1000">
            <p className="T1000">분류:</p>
            <div className="C1018">
              <LabeledCheckbox
                checked={foreignerChecked}
                onChange={setForeignerChecked}
                text="외국인"
              />
              <LabeledCheckbox
                checked={koreanChecked}
                onChange={setKoreanChecked}
                text="내국인"
              />
            </div>
          </div>
        </div>

        <div className="C1007">
          <div className="C1000">
            <p className="T1000">거소증:</p>
            <div className="C1018">
              <LabeledCheckbox
                checked={hasResidencePermitChecked}
                onChange={setHasResidencePermitChecked}
                text="있음"
              />
              <LabeledCheckbox
                checked={noResidencePermitChecked}
                onChange={setNoResidencePermitChecked}
                text="없음"
              />
            </div>
          </div>
        </div>

        <div className="C1007">
          <div className="C1000">
            <p className="T1000">국적:</p>
            <div className="C1008">
              종류 선택
              <div className="C1019 isIcon styleSheet isMini isChevron isWhite"></div>
            </div>
            <p className="T1000">사용언어:</p>
            <div className="C1008">
              종류 선택
              <div className="C1019 isIcon styleSheet isMini isChevron isWhite"></div>
            </div>
          </div>
        </div>

        <div className="C1007">
          <div className="C1000">
            <p className="T1000">여권번호:</p>
            <div className="C1017">
              <ValidatedInput
                className="T1002"
                type="text"
                placeholder="최대 20자까지"
                maxLength={20}
              />
            </div>
          </div>
        </div>

        <div className="C1009"></div>

        <div className="C1007">
          <div className="C1000">
            <p className="T1000">소개자:</p>
            <div className="C1017">
              <ValidatedInput
                className="T1002"
                type="text"
                placeholder="검색"
              />
            </div>
            <button className="C1005">검색</button>
          </div>
        </div>

        <div className="C1007">
          <div className="C1000">
            <p className="T1000">메모:</p>
            <div className="C1004">
              <textarea className="T1003" placeholder="최대 500자까지" maxLength={500} />
            </div>
          </div>
        </div>

        <div className="C1012">
          <button className="C1013" onClick={onClose}>
            취소
          </button>
          <button className="C1014">등록</button>
        </div>
      </PopupSectionBox>
    </Popup>
  );
});

CustomerRegistrationPopup.displayName = "CustomerRegistrationPopup";

export default CustomerRegistrationPopup;
