import { curveLinear } from "@visx/curve";
import { Group } from "@visx/group";
import { LinePath } from "@visx/shape";
import { scaleLinear } from "@visx/scale";
import { MarkerCircle } from "@visx/marker";
import { LinearGradient } from "@visx/gradient";
import { AxisLeft, AxisBottom } from "@visx/axis";

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
  white = "#ffffff";

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
              <LinePath
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
        <AxisLeft
          hideAxisLine
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
          hideAxisLine
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
