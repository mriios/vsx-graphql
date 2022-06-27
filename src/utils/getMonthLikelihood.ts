import { PostDataWithAuthor, PostWithAuthor, MonthCount } from '../types/global';

// Will return an array of 2 arrays, 1 for user data and 1 for month data
export const getMonthLikelihood = (_data: PostDataWithAuthor, selectedTopic: string): [MonthCount[], MonthCount[]] => {
  let data = _data || [],
    allPosts = data.allPosts,
    publishedPosts: PostWithAuthor[],
    perMonthTopicData: PostWithAuthor[],
    topPostTopic: string,
    currentUserId: string = allPosts[0].author.id, // mock user id
    totalMonths: number = 12,
    emptyDataArr = Array(totalMonths).fill({}).map((val, idx) => {
      return {
        month: idx + 1,
        count: 0
      }
    }),
    totalPosts: PostWithAuthor[],
    userDataArray: MonthCount[] = emptyDataArr.map(obj => {return {...obj}}), //deep copy
    totalDataArray: MonthCount[] = emptyDataArr.map(obj => {return {...obj}}), //deep copy
    postMonth: number;

  // Since we don't have a logged in user, we're taking the author of the first post, just for testing purposes
  // We can't use the user we got in App.tsx since user IDs are randomly generated when we fetch new posts

  publishedPosts = allPosts.filter(post => post.published);

  perMonthTopicData = publishedPosts.filter((post: PostWithAuthor): boolean => {
    // We're getting likelyTopics already sorted, safe to assume [0] is the most likely
    topPostTopic = post.likelyTopics[0].label;

    return topPostTopic === selectedTopic;
  });

  totalPosts = perMonthTopicData.sort((a: PostWithAuthor, b: PostWithAuthor): number => +a.createdAt - +b.createdAt);

  totalPosts.forEach((post: PostWithAuthor) => {
    postMonth = new Date(+post.createdAt).getMonth();

    totalDataArray[postMonth].count++;

    if (post.author.id === currentUserId) {
      userDataArray[postMonth].count++;
    }
  });

  return [userDataArray, totalDataArray] as [MonthCount[], MonthCount[]];
};
