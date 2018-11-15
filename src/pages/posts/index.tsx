import { ComponentClass } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { bindActionCreators, Dispatch } from 'redux';
import { AtCard } from 'taro-ui';

import './index.scss';
import { RootState, RootAction } from '../../store';
import { postsActions, postsModels } from '../../store/posts';
import TabbarProvider from '../../components/UI/TabbarProvider';

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
      <TabbarProvider>
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
        </View>
      </TabbarProvider>
    );
  }
}

export default Posts as ComponentClass;
