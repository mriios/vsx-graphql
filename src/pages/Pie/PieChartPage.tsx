import { useEffect, useState } from "react";
import ParentSize from "@visx/responsive/lib/components/ParentSize";

import { LikelyTopics } from "../../types/global";
import PieChart from "../../components/PieChart/PieChart";
import usePosts from "../../hooks/posts/usePosts";
import getTopicLikelihood from "../../utils/getTopicLikelihood";

function PieChartPage() {
  // lots of posts to make sure we get at least 100 published posts
  const { loading, error, data, called } = usePosts(300);
  const [topicLikelihoodData, setTopicLikelihoodData] = useState<
    Array<LikelyTopics>
  >([]);

  useEffect(() => {
    if (!loading && called && !error) {
      let likelihoodData = getTopicLikelihood(data);
      setTopicLikelihoodData(likelihoodData);
    }
  }, [loading, called, data, error]);

  return (
    <>
      <h1>Top topics for latest 100 published posts</h1>
      {loading ? (
        <p>Loading chart...</p>
      ) : (
        <div style={{ height: "440px", width: "400px", margin: "0 auto" }}>
          <ParentSize>
            {({ width, height }) => (
              <PieChart
                data={topicLikelihoodData}
                width={width}
                height={height}
              />
            )}
          </ParentSize>
        </div>
      )}
    </>
  );
}

export default PieChartPage;
