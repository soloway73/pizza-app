import styles from "./UserProfile.skeleton.module.css";
import cn from "classnames";

export function UserProfileSkeleton() {
  return (
    <>
      <div className={cn(styles.skeleton, styles.circle)} />
      <div className={styles.skeleton}></div>
      <div className={styles.skeleton}></div>
    </>
  );
}
