/**
 * useFormWithValidation Hook
 *
 * @description React Hook Form과 Zod를 함께 사용하는 커스텀 훅입니다.
 * 타입 안전한 폼 검증을 제공합니다.
 */

import { useForm, UseFormProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

/**
 * Zod 스키마를 사용하는 폼 훅
 *
 * @template TSchema - Zod 스키마 타입
 * @param schema - Zod 스키마
 * @param options - React Hook Form 옵션
 * @returns 폼 메서드와 상태
 *
 * @example
 * ```tsx
 * const schema = z.object({
 *   name: z.string().min(1),
 *   email: z.string().email(),
 * });
 *
 * const form = useFormWithValidation(schema, {
 *   defaultValues: { name: '', email: '' },
 * });
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useFormWithValidation<TSchema extends z.ZodType<any, any, any>>(
  schema: TSchema,
  options?: Omit<UseFormProps<z.infer<TSchema>>, "resolver">
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useForm<z.infer<TSchema>>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any) as any,
    mode: "onChange", // 기본값: onChange 모드
    ...options,
  });
}
