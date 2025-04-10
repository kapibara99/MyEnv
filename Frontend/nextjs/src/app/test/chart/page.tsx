"use client";
import { StrictMode } from "react";

import "../../../lib/tailwind.css";

import AdmaxContent from "../../../components/_common/admaxContents";
import BackendCircleAnimation from "../../../components/_common/backgroundAnimation";
import Base from "../../../components/_common/base";
import Footer from "../../../components/_common/footer";
import Header from "../../../components/_common/header";
import ContentBox from "../../../components/_common/contentBox";
import ChartMain from "../../../components/chart/chartMain";
import ChartStyleEditor from "../../../components/chart-style-editor/chartStyleEditor";
import DownloadImage from "../../../components/downloadImage";
import TablePaste from "../../../components/tablePaste";
import { CHART_MAIN_ID } from "../../../service/mandara-chart/chart.variables";
// import MainRouter from "./pages/router";

export default function Chart() {
  return (
    <StrictMode>
      <Base>
        {/* <BrowserRouter> */}
        <Header />
        <AdmaxContent admaxID="5fdaac5f4d9a06e1edd26ec8a5cdc705" />
        <BackendCircleAnimation>
          {/* <MainRouter /> */}
          <ChartMain />
          <ContentBox title="デザインの編集・保存・ダウンロード">
            <div className="mb-5">
              <AdmaxContent admaxID="79e26900fcf19c207ef4b02c4e42b4ff" />
            </div>
            <ChartStyleEditor />
            <div className="flex flex-wrap gap-5">
              <div>
                <DownloadImage targetId={CHART_MAIN_ID} />
              </div>
              <div>
                <TablePaste targetSelector={`#${CHART_MAIN_ID} [data-zahyou] span`} />
                <p className="text-sm text-gray-500 text-center">※枠線や文字の色などは適用されません。</p>
              </div>
            </div>
          </ContentBox>
        </BackendCircleAnimation>
        <Footer />
        {/* </BrowserRouter> */}
      </Base>
    </StrictMode>
  );
}
