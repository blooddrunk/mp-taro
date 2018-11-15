import { ComponentClass } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { bindActionCreators, Dispatch } from 'redux';
import { AtCard } from 'taro-ui';

import './index.scss';
import { RootState, RootAction } from '../../store';
import { postsActions, postsModels } from '../../store/posts';
import ListLoader from '../../components/UI/ListLoader';

export interface PostsProps {
  posts: postsModels.Post[];
  loading: boolean;
  total: number;
  error: Error | null;
  fetchPosts: typeof postsActions.request;
}

@connect(
  ({ posts }: RootState) => {
    return {
      posts: posts.items,
      loading: posts.loading,
      total: posts.total,
      error: posts.error,
    };
  },
  (dispatch: Dispatch<RootAction>) =>
    bindActionCreators(
      {
        fetchPosts: postsActions.request,
      },
      dispatch
    )
)
class Posts extends Component<PostsProps, {}> {
  config = {
    addGlobalClass: true,
    navigationBarTitleText: 'Posts',
    enablePullDownRefresh: true,
  };

  componentWillReceiveProps = ({ loading, error }: PostsProps) => {
    if (loading && !this.props.loading) {
      Taro.stopPullDownRefresh();
    }
  };

  componentDidMount = () => {
    this.props.fetchPosts({
      shouldClearItems: true,
    });
  };

  onPullDownRefresh = () => {
    this.props.fetchPosts({
      shouldClearItems: true,
    });
  };

  onReachBottom = () => {
    this.props.fetchPosts({
      shouldClearItems: false,
    });
  };

  render() {
    const { posts, loading, total } = this.props;
    const length = posts.length;

    return (
      <View className="Posts">
        {posts.map(post => (
          <AtCard
            className="Post"
            key={post.id}
            extra={post.author}
            isFull
            note={post.updatedAt.toString()}
            thumb={post.thumbnail}
            title={post.title}
          >
            {post.description}
          </AtCard>
        ))}
        <ListLoader
          loading={loading}
          hasReachedEnd={length === total}
          empty={length === 0}
        />
      </View>
    );
  }
}

export default Posts as ComponentClass;
