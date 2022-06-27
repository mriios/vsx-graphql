import { useState, useEffect } from "react";
import ParentSize from "@visx/responsive/lib/components/ParentSize";

import usePostsWithAuthor from "../../hooks/posts/usePostsWithAuthor";
import Linear from "../../components/LinearChart/Linear";
import { getMonthLikelihood } from "../../utils/getMonthLikelihood";
import { MonthCount } from "../../types/global";

const LinearChartPage = () => {
  // Aiming to get 60~ posts per month, 2~ per day of the month
  const { loading, error, data, called } = usePostsWithAuthor(5760);

  const [monthLikelihoodData, setMonthLikelihoodData] = useState<
    [MonthCount[], MonthCount[]]
  >([[], []]);

  const [selectedTopic, setSelectedTopic] = useState<string>("birthday");

  useEffect(() => {
    if (!loading && called && !error) {
      let topicMonthData = getMonthLikelihood(data, selectedTopic);
      setMonthLikelihoodData(topicMonthData);
    }
  }, [loading, called, data, error, selectedTopic]);

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
  };

  if (loading)
    return (
      <p className="Linear__Loading">
        Fetching enough data to give you precise results...
      </p>
    );

  return (
    <div>
      <h1>Your topic frequency in the year 2021 vs all users</h1>
      <p>
        <i>
          For the sake of this test, lets assume all posts are from last year
          (2021), <br />
          so we don't need to fetch too many posts and still get enough data
        </i>
      </p>
      <div style={{ height: "40vh", marginBottom: "200px" }}>
        <ParentSize>
          {({ width, height }) => (
            <Linear
              width={width}
              height={height}
              onTopicChange={handleTopicSelect}
              data={monthLikelihoodData}
            />
          )}
        </ParentSize>
      </div>
    </div>
  );
};

export default LinearChartPage;
