import type { SyntheticEvent } from "react";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import type { ResizeCallbackData } from "react-resizable";
import { ResizableBox } from "react-resizable";
import { chartCellSizeAtom } from "../../service/chart-style-edit/chartStyle.atoms";
import MandalaCell from "../chart/chartCell";

import "../../lib/reactResize.css";

export default function ChartCellSizeController() {
  const [width, setWidth] = useState(0);
  const [defaultWidth, setDefaultWidth] = useState(width);
  const [height, setHeight] = useState(0);
  const [, setCellSize] = useAtom(chartCellSizeAtom);

  useEffect(() => {
    // 一番右上の要素のwidth:heightを参考にする
    const timer = setTimeout(() => {
      const cell = document.querySelector("[data-zahyou='0,0']") as HTMLDivElement;
      if (!cell) return;
      setWidth(cell.offsetWidth);
      setDefaultWidth(cell.offsetWidth);
      setHeight(cell.offsetHeight);
      clearTimeout(timer);
    }, 1000);
  }, []);

  const onResize = (e: SyntheticEvent<Element>, data: ResizeCallbackData) => {
    e.preventDefault();
    setWidth(data.size.width);
  };

  return (
    <div className="mb-10">
      <p className="text-lg mb-0.5">マスの幅を調整</p>
      <div className="flex flex-wrap gap-3">
        <ResizableBox onResize={onResize} width={width} height={height} minConstraints={[100, height]} maxConstraints={[500, height]}>
          <div style={{ width }}>
            <MandalaCell cellType="item" value="aaa" isFocused={false} zahyou={[-1, -1]} />
          </div>
        </ResizableBox>
        <button
          className="cursor-pointer p-4 rounded-lg border-2 bg-white border-main shadow-md hover:hover:opacity-60 transition"
          style={{ height }}
          onClick={() => setCellSize(width)}
          type="button"
        >
          更新
        </button>
        <button
          className="cursor-pointer p-4 rounded-lg border-2 bg-white border-main shadow-md hover:hover:opacity-60 transition"
          style={{ height }}
          onClick={() => setCellSize(defaultWidth)}
          type="button"
        >
          リセット
        </button>
      </div>
    </div>
  );
}
