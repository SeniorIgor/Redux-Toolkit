import cx from "classnames";
import { FC, useCallback, useState } from "react";

import { Post } from "@/models/post";
import { postAPI } from "@/services/post-service";

import PostItem from "../post-item";
import styles from "./post-list.module.sass";

interface PostListProps {
  className?: string;
}

const limit = 100;

const PostList: FC<PostListProps> = ({ className }) => {
  const [start, setStart] = useState(0);

  const {
    data: posts,
    error,
    isLoading,
  } = postAPI.useFetchAllPostsQuery({ limit, start });
  const [createPost] = postAPI.useCreatePostMutation();
  const [deletePost] = postAPI.useDeletePostMutation();
  const [updatePost] = postAPI.useUpdatePostMutation();

  const showMore = useCallback(() => setStart((prev) => prev + limit), []);

  const addPost = useCallback(
    () => createPost({ title: 'Title', body: 'Post content' } as Post),
    [createPost]
  );

  const handleDelete = useCallback(
    (post: Post) => deletePost(post),
    [deletePost]
  );

  const handleUpdate = useCallback(
    (post: Post) => updatePost(post),
    [updatePost]
  );

  return (
    <div className={cx(styles.container, className)}>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error loading posts</div>}
      {posts &&
        posts.map((post) => (
          <PostItem
            post={post}
            key={post.id}
            className={styles.item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      <div className={styles.buttonsContainer}>
        <button onClick={addPost} className={styles.button}>
          Add post
        </button>
        <button onClick={showMore} className={styles.button}>
          Show more
        </button>
      </div>
    </div>
  );
};

export default PostList;
