/**
 * Statistics Page
 *
 * @description 통계 파트의 메인 페이지입니다. 통계 데이터를 확인하고 분석합니다.
 *
 * @page
 * @route /statistics
 */

import "./page.css";
import SimplePageLayout from "@/components/layouts/SimplePageLayout";

export default function StatisticsPage() {
  return (
    <SimplePageLayout
      title="통계"
      subtitle="통계 및 분석"
      containerClassName="statistics-container"
    >
      <div className="statistics-card">
        <h2>통계 관리</h2>
        <p>통계 데이터를 확인합니다.</p>
      </div>
    </SimplePageLayout>
  );
}
