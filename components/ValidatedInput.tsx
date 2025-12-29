"use client";

import { useState } from "react";

export interface ValidatedInputProps {
  /** input의 className */
  className?: string;
  /** input의 type */
  type?: string;
  /** placeholder */
  placeholder?: string;
  /** 최소 글자수 */
  minLength?: number;
  /** 최대 글자수 */
  maxLength?: number;
  /** required 여부 */
  required?: boolean;
  /** 이메일 형식 검증 여부 */
  validateEmail?: boolean;
  /** 커스텀 에러 메시지 (minLength 미만일 때) */
  minLengthErrorMessage?: string;
  /** 커스텀 에러 메시지 (maxLength 초과일 때) */
  maxLengthErrorMessage?: string;
  /** 커스텀 에러 메시지 (required일 때) */
  requiredErrorMessage?: string;
  /** 커스텀 에러 메시지 (이메일 형식이 올바르지 않을 때) */
  emailErrorMessage?: string;
  /** 추가 속성 */
  [key: string]: unknown;
}

/**
 * 유효성 검사가 있는 Input 컴포넌트
 * 글자수 검증 및 에러 메시지 표시 기능 제공
 */
export default function ValidatedInput({
  className = "",
  type = "text",
  placeholder = "",
  minLength,
  maxLength,
  required = false,
  validateEmail = false,
  minLengthErrorMessage,
  maxLengthErrorMessage,
  requiredErrorMessage,
  emailErrorMessage,
  ...props
}: ValidatedInputProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  // 이메일 형식 검증 함수
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    // 글자수 검증
    const length = inputValue.length;

    if (length === 0) {
      setError("");
      return;
    }

    if (minLength && length < minLength) {
      setError(
        minLengthErrorMessage || 
        `${minLength}자리 이상 입력해주세요`
      );
      return;
    }

    if (maxLength && length > maxLength) {
      setError(
        maxLengthErrorMessage || 
        `${maxLength}자리까지 입력 가능합니다`
      );
      return;
    }

    // 이메일 형식 검증
    if (validateEmail && !isValidEmail(inputValue)) {
      setError(
        emailErrorMessage || 
        "올바른 이메일 형식이 아닙니다"
      );
      return;
    }

    // 조건에 맞으면 에러 제거
    setError("");
  };

  const handleBlur = () => {
    const length = value.length;

    if (required && length === 0) {
      setError(requiredErrorMessage || "필수 입력 항목입니다");
      return;
    }

    if (minLength && length > 0 && length < minLength) {
      setError(
        minLengthErrorMessage || 
        `${minLength}자리 이상 입력해주세요`
      );
      return;
    }

    if (maxLength && length > maxLength) {
      setError(
        maxLengthErrorMessage || 
        `${maxLength}자리까지 입력 가능합니다`
      );
      return;
    }

    // 이메일 형식 검증 (포커스가 벗어날 때)
    if (validateEmail && length > 0 && !isValidEmail(value)) {
      setError(
        emailErrorMessage || 
        "올바른 이메일 형식이 아닙니다"
      );
      return;
    }
  };

  return (
    <>
      <input
        className={className}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        required={required}
        {...props}
      />
      {error && (
        <p
          style={{
            position: "absolute",
            top: "100%",
            left: "var(--size-12)",
            marginTop: "var(--size-2)",
            color: "var(--color-magenta)",
            fontSize: "var(--font-14)",
          }}
        >
          {error}
        </p>
      )}
    </>
  );
}

