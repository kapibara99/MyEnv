import { useAtom } from "jotai";
const defaultWidthSize = "max-w-[1200px] w-4/5 mx-auto";
import { chartCellSizeAtom } from "../../service/chart-style-edit/chartStyle.atoms";
import type { MandalaCellProps } from "../../service/mandara-chart/chart";
import { DEFAULT_CHART_DATA, CHART_MAIN_ID, STORAGE_KEY } from "../../service/mandara-chart/chart.variables";
import useLocalStorage from "../../service/mandara-chart/useStorage";
import MandalaCell from "./chartCell";
import ChartStyleDefault from "./chartStyleDefault";

export default function ChartMain() {
  const [cellSize] = useAtom(chartCellSizeAtom);
  const { storedValue } = useLocalStorage(STORAGE_KEY, DEFAULT_CHART_DATA());
  if (storedValue == undefined) return <></>;
  return (
    <ChartStyleDefault>
      <div className={`${defaultWidthSize} p-4 bg-white overflow-x-auto shadow-md`}>
        <div
          id={CHART_MAIN_ID}
          className="grid grid-cols-9 min-w-[1000px]"
          style={{ width: Number.isNaN(cellSize) ? cellSize : Number(cellSize) * 9 + "px" }}
        >
          {(storedValue as MandalaCellProps[]).map((props) => (
            <MandalaCell key={`${props.cellType}-${props.zahyou[0]}-${props.zahyou[1]}`} {...props} />
          ))}
        </div>
      </div>
    </ChartStyleDefault>
  );
}
