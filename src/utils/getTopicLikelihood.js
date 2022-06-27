const getTopicLikelihood = (_data) => {
  let data = _data || [],
    topicLikelihoodData = [];

  // Should we filter for published posts? I think so.
  let publishedLikelyTopics = data.allPosts
    .slice()
    .sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1))
    .filter((post) => post.published)
    .map((post) => {
      return post.likelyTopics;
    })
    .slice(0, 100);

  const topicLikelihoodReducer = publishedLikelyTopics.reduce(
    (acc, currentArray) => {
      acc = acc ? acc : {};

      const arrTopics = currentArray.reduce((_acc, _item) => {
        _acc = _acc ? _acc : {};
        _acc[_item.label] = _acc[_item.label]
          ? _acc[_item.label] + _item.likelihood
          : _item.likelihood;
        return _acc;
      }, null);

      for (const item in arrTopics) {
        acc[item] = acc[item] ? acc[item] + arrTopics[item] : arrTopics[item];
      }
      return acc;
    },
    null
  );

  for (const [key, value] of Object.entries(topicLikelihoodReducer)) {
    topicLikelihoodData.push({
      label: key,
      likelihood: value.toFixed(2),
      color: `#${Math.random().toString(16).slice(2, 8)}`
    });
  }

  return topicLikelihoodData;
};

export default getTopicLikelihood;
