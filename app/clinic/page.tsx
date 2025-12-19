/**
 * Clinic Page
 *
 * @description 진료 파트의 메인 페이지입니다. 진료 기록을 관리합니다.
 *
 * @page
 * @route /clinic
 */

import "./page.css";
import SimplePageLayout from "@/components/layouts/SimplePageLayout";

export default function ClinicPage() {
  return (
    <SimplePageLayout
      title="진료"
      subtitle="진료 기록 관리"
      containerClassName="clinic-container"
    >
      <div className="clinic-card">
        <h2>진료 관리</h2>
        <p>진료 기록을 관리합니다.</p>
      </div>
    </SimplePageLayout>
  );
}
