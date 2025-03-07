import { useSelector } from "react-redux";
import styles from "./UserProfile.module.css";
import { RootState } from "../../store/store";
import { UserProfileSkeleton } from "./UserProfile.skeleton";

export function UserProfile() {
  const { userData, isLoading } = useSelector((s: RootState) => s.user);

  return (
    <>
      {isLoading ? (
        <UserProfileSkeleton />
      ) : (
        <>
          <img className={styles.avatar} src="/avatar.png" alt="avatar" />
          <div className={styles.name}>{userData?.name}</div>
          <div className={styles.email}>{userData?.email}</div>
        </>
      )}
    </>
  );
}
