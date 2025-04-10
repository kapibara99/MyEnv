import ChartCellSizeController from "./chartCellSizeController";
import ChartColorController from "./chartColorController";
import ChartStyleController from "./chartStyleController";

export default function ChartStyleEditor() {
  return (
    <>
      <ChartStyleController />
      <ChartColorController />
      <ChartCellSizeController />
    </>
  );
}
