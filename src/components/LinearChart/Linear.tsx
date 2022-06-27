import { Grid } from "@visx/grid";
import { Group } from "@visx/group";
import { LinePath } from "@visx/shape";
import { curveLinear } from "@visx/curve";
import { MarkerCircle } from "@visx/marker";
import { LinearGradient } from "@visx/gradient";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { scaleLinear, scaleOrdinal } from "@visx/scale";
import { LegendOrdinal, LegendItem, LegendLabel } from "@visx/legend";

import monthNumberToNameShort from "../../utils/monthNumberToName";
import { MonthCount, MonthData } from "../../types/global";
import "./Linear.css";

interface LinearProps {
  width: number;
  height: number;
  onTopicChange: (topic: string) => void;
  data: MonthData;
}

const topics = [
    "birthday",
    "celebrity",
    "community",
    "fishing",
    "management",
    "potato",
    "security",
    "shopping",
    "sport",
    "wedding"
  ],
  lineColors = ["#000000", "#ff6767"],
  padding = 30,
  white = "#ffffff",
  legendData = scaleOrdinal({
    domain: ["Your Posts", "Total Posts"],
    range: lineColors
  }),
  legendIconSize = 15;

const Linear = ({
  width,
  height,
  onTopicChange,
  data: topicsData
}: LinearProps) => {
  const innerHeight = height - padding * 2,
    innerWidth = width - padding * 2,
    allTopicsData = topicsData.reduce((rec, d) => rec.concat(d), []);

  const getX = (el: MonthCount) => el.month;
  const getY = (el: MonthCount) => el.count;

  const xScale = scaleLinear<number>({
    domain: [1, topicsData[0]?.length], // max width steps
    range: [padding, innerWidth] // width of lines
  });
  const yScale = scaleLinear<number>({
    domain: [0, Math.max(...allTopicsData.map((el) => el.count))], // max height steps
    range: [innerHeight, -padding] // [0] is length from top
  });

  return (
    <div className="Linear">
      <label>
        Choose your topic of interest:
        <select
          className="Linear__Select"
          onChange={(e) => onTopicChange(e.target.value as string)}
        >
          {topics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </label>
      <LegendOrdinal scale={legendData} labelFormat={(label) => label}>
        {(labels) => (
          <div style={{ display: "flex", flexDirection: "row" }}>
            {labels.map((label) => (
              <LegendItem key={label.value} margin="0 0 10px 5px">
                <svg width={legendIconSize} height={legendIconSize}>
                  <g stroke={label.value}>
                    <line
                      x1="1"
                      y1="12"
                      x2={legendIconSize - 2}
                      y2="2"
                      strokeWidth="3"
                    />
                  </g>
                </svg>
                <LegendLabel align="right" margin="0 15px 0 5px">
                  {label.text}
                </LegendLabel>
              </LegendItem>
            ))}
          </div>
        )}
      </LegendOrdinal>
      <svg
        className="Linear__Chart"
        width={width}
        height={height + padding * 2}
      >
        <LinearGradient id="chartBg" from="#7324ff" to="#0000c6" rotate="300" />
        <MarkerCircle id="marker-circle" fill={white} size={2} refX={2} />
        <rect
          width={width}
          height={height + padding * 2}
          fill="url(#chartBg)"
          rx={15}
          ry={15}
        />
        {topicsData.map((lineData, i) => {
          return (
            <Group key={lineData[i]?.count} top={padding} left={padding}>
              <LinePath<MonthCount>
                curve={curveLinear}
                data={lineData}
                x={(d) => xScale(getX(d)) ?? 0}
                y={(d) => yScale(getY(d)) + padding ?? 0}
                stroke={lineColors[i]}
                strokeWidth="2"
                strokeOpacity="1"
                markerMid="url(#marker-circle)"
                markerStart="url(#marker-circle)"
                markerEnd="url(#marker-circle)"
              />
            </Group>
          );
        })}
        {/* still need to get this to align correctly */}
        <Grid
          xScale={xScale}
          yScale={yScale}
          width={innerWidth}
          height={innerHeight + padding}
          numTicksRows={5}
          numTicksColumns={topicsData[0]?.length}
          left={padding}
          top={height - innerHeight}
          stroke="#eaf0f64d"
        />
        <AxisLeft
          scale={yScale}
          label="Amount"
          numTicks={5}
          left={padding * 2}
          top={height - innerHeight}
          stroke={white}
          tickStroke={white}
          axisClassName="Linear__Axis"
        />
        <AxisBottom
          scale={xScale}
          label="Month"
          tickFormat={(v: any) => {
            if (width < 768) {
              return v;
            }
            return monthNumberToNameShort(v - 1);
          }}
          numTicks={topicsData[0]?.length}
          left={padding}
          top={height}
          stroke={white}
          tickStroke={white}
          axisClassName="Linear__Axis"
        />
      </svg>
    </div>
  );
};

export default Linear;
