import { ComponentClass } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { bindActionCreators, Dispatch } from 'redux';
import { AtCard } from 'taro-ui';

import './index.scss';
import { RootState, RootAction } from '../../store';
import { postsActions, postsModels } from '../../store/posts';
import Skeleton from '../../components/Posts/Skeleton';

export interface PostsProps {
  posts: postsModels.Post[];
  loading: boolean;
  error: Error | null;
  fetchPosts: typeof postsActions.request;
}

@connect(
  ({ posts }: RootState) => {
    return {
      posts: posts.items,
      loading: posts.loading,
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
  };

  componentDidMount = () => {
    this.props.fetchPosts();
  };

  render() {
    const { posts, loading } = this.props;
    return (
      <View className="Post">
        {posts.map(post =>
          loading ? (
            <Skeleton key={post.id} />
          ) : (
            <AtCard
              className="Post__Card"
              key={post.id}
              extra={post.author}
              isFull
              note={post.updatedAt.toString()}
              thumb={post.thumbnail}
              title={post.title}
            >
              {post.description}
            </AtCard>
          )
        )}
      </View>
    );
  }
}

export default Posts as ComponentClass;
