import { useState } from "react";
import { Pie } from "@visx/shape";
import { Text } from "@visx/text";
import { Group } from "@visx/group";

import { LikelyTopics } from "../../types/global";

import "./PieChart.css";

interface Props {
  data: LikelyTopics[];
  width: number;
  height: number;
}

const PieChart = (_props: Props) => {
  const [active, setActive] = useState<null | LikelyTopics>(null);
  let props = _props || {},
    data = props.data,
    width = props.width,
    height = props.height,
    half = width / 2;

  return (
    <>
      <p>
        <i>Hover slices for topic percentages</i>
      </p>
      <svg width={width} height={height}>
        <Group top={half} left={half}>
          <Pie<LikelyTopics>
            data={data}
            pieValue={(data: LikelyTopics) => data?.likelihood}
            outerRadius={half}
          >
            {(pie: { arcs: any; path: any }) => {
              return pie.arcs.map((arc: { data: LikelyTopics }) => {
                return (
                  <g
                    key={arc.data.label}
                    onMouseEnter={() => setActive(arc.data)}
                    onMouseLeave={() => setActive(null)}
                  >
                    <path d={pie.path(arc)} fill={arc.data.color}></path>
                  </g>
                );
              });
            }}
          </Pie>
          <Text
            textAnchor="middle"
            fill="#000"
            fontSize={30}
            dy={230}
            className="Pie__label"
          >
            {active
              ? `${active.label}: ${Number(active.likelihood)}%`
              : `Data from ${data.length} Post Topics`}
          </Text>
        </Group>
      </svg>
    </>
  );
};

export default PieChart;
