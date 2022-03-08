import { FC, useEffect } from "react";

import { useTypedDispatch, useTypedSelector } from "@/hooks";
import { fetchUsers, selectUserReducer } from "@/store/user";

import PostList from "../post-list";
import styles from "./app.module.sass";

const App: FC = () => {
  const { users, isLoading, error } = useTypedSelector(selectUserReducer);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="wrapper">
      <h1>Hi there!</h1>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {Boolean(users.length) &&
        users.map(({ id, name }) => <div key={id}>{name}</div>)}
      <div className={styles.postsContainer}>
        <PostList className={styles.posts} />
        <PostList className={styles.posts} />
      </div>
    </div>
  );
};

export default App;
