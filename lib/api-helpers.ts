/**
 * API 호출 헬퍼 함수
 * 타입 안전한 API 호출을 위한 유틸리티
 */

import {
  ApiResponse,
  GetVisitLogsResponse,
  GetPackagesResponse,
  GetFutureSchedulesResponse,
} from "@/types/api";
import { isSuccessResponse, isErrorResponse } from "@/lib/type-guards";

/**
 * API 호출 기본 함수
 */
async function apiCall<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(endpoint, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      return {
        success: false,
        error: {
          code: `HTTP_${response.status}`,
          message: response.statusText,
        },
      };
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: {
        code: "NETWORK_ERROR",
        message: error instanceof Error ? error.message : "Unknown error",
      },
    };
  }
}

/**
 * 방문일지 목록 조회
 */
export async function getVisitLogs(
  patientId: string,
  page: number = 1,
  pageSize: number = 20
): Promise<GetVisitLogsResponse> {
  const response = await apiCall<GetVisitLogsResponse["data"]>(
    `/api/visit-logs?patientId=${patientId}&page=${page}&pageSize=${pageSize}`
  );

  if (isSuccessResponse(response)) {
    return response as GetVisitLogsResponse;
  }

  return response as GetVisitLogsResponse;
}

/**
 * 패키지 목록 조회
 */
export async function getPackages(
  patientId: string
): Promise<GetPackagesResponse> {
  const response = await apiCall<GetPackagesResponse["data"]>(
    `/api/packages?patientId=${patientId}`
  );

  if (isSuccessResponse(response)) {
    return response as GetPackagesResponse;
  }

  return response as GetPackagesResponse;
}

/**
 * 향후일정 목록 조회
 */
export async function getFutureSchedules(
  patientId: string
): Promise<GetFutureSchedulesResponse> {
  const response = await apiCall<GetFutureSchedulesResponse["data"]>(
    `/api/future-schedules?patientId=${patientId}`
  );

  if (isSuccessResponse(response)) {
    return response as GetFutureSchedulesResponse;
  }

  return response as GetFutureSchedulesResponse;
}

/**
 * API 에러 처리 헬퍼
 */
export function handleApiError<T>(response: ApiResponse<T>): never {
  if (isErrorResponse(response)) {
    throw new Error(
      `API Error [${response.error.code}]: ${response.error.message}`
    );
  }
  throw new Error("Unknown API error");
}
