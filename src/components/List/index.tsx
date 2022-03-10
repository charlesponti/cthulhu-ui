import t, { InferProps } from 'prop-types';
import styles from './List.module.scss';

function List({ children }: InferProps<typeof List.propTypes>) {
  return <ul className={styles.list}>{children}</ul>;
}

List.propTypes = {
  children: t.arrayOf(t.node)
};

export default List;
