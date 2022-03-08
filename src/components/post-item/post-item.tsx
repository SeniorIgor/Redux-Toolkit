import cx from "classnames";
import { FC, useCallback } from "react";

import { Post } from "@/models/post";

import styles from "./post-item.module.sass";

interface PostItemProps {
  post: Post;
  className?: string;
  onDelete: (post: Post) => void;
  onUpdate: (post: Post) => void;
}

const PostItem: FC<PostItemProps> = ({
  post,
  className,
  onDelete,
  onUpdate,
}) => {
  const handleDelete = useCallback(() => onDelete(post), [onDelete, post]);

  const handleUpdate = useCallback(
    () => onUpdate({ ...post, title: 'Updated title' }),
    [onUpdate, post]
  );

  return (
    <div className={cx(styles.container, className)}>
      <h3 className={styles.title}>
        {post.id}. {post.title}
      </h3>
      <div className={styles.content}>
        <div>{post.body}</div>
        <div className={styles.buttonsContainer}>
          <button onClick={handleDelete} className={styles.button}>
            Delete
          </button>
          <button onClick={handleUpdate} className={styles.button}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
