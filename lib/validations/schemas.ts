/**
 * Zod Validation Schemas
 *
 * @description 프로젝트 전반에서 사용할 Zod 스키마들을 정의합니다.
 * React Hook Form과 함께 사용하여 타입 안전한 폼 검증을 제공합니다.
 */

import { z } from "zod";

/**
 * 환자 스키마
 */
export const patientSchema = z.object({
  id: z.string().uuid().optional(),
  name: z
    .string()
    .min(1, "이름을 입력해주세요")
    .max(100, "이름은 100자 이하여야 합니다"),
  registerDate: z.date({
    required_error: "등록일을 선택해주세요",
  }),
});

export type PatientFormData = z.infer<typeof patientSchema>;

/**
 * 예약 스키마
 */
export const reservationSchema = z.object({
  patientId: z.string().uuid("올바른 환자 ID를 입력해주세요"),
  employeeId: z.string().min(1, "담당 직원을 선택해주세요"),
  date: z.date({
    required_error: "예약일을 선택해주세요",
  }),
  time: z
    .string()
    .regex(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "올바른 시간 형식이 아닙니다 (HH:MM)"
    ),
  notes: z.string().max(500, "메모는 500자 이하여야 합니다").optional(),
});

export type ReservationFormData = z.infer<typeof reservationSchema>;

/**
 * 직원 스키마
 */
export const employeeSchema = z.object({
  id: z.string().min(1, "직원 ID를 입력해주세요"),
  name: z.string().min(1, "이름을 입력해주세요"),
  role: z.string().min(1, "역할을 선택해주세요"),
  email: z.string().email("올바른 이메일 형식이 아닙니다").optional(),
  phone: z
    .string()
    .regex(/^[0-9-]+$/, "올바른 전화번호 형식이 아닙니다")
    .optional(),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;
