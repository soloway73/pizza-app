import styles from "./ProductSkeleton.module.css";
import cn from "classnames";

export function ProductSkeleton() {
  return (
    <div className={styles.wrapper}>
      <div className={cn(styles.headSkeleton, styles.skeleton)}></div>
      <div className={styles.productSkeleton}>
        <div className={cn(styles.imageSkeleton, styles.skeleton)}></div>
        <div className={styles.descriptionSkeleton}>
          <div className={cn(styles.line, styles.skeleton)}></div>
          <hr className={cn(styles.hr, styles.skeleton)} />
          <div className={cn(styles.line, styles.skeleton)}></div>
          <div className={cn(styles.square, styles.skeleton)}></div>
        </div>
      </div>
    </div>
  );
}
