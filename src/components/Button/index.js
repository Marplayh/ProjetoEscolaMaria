import styles from "./button-style.module.css"

export function Button({children, onClick}){
    return(
        <div style={{ width: 'fit-content' }}>
        <button
          type="button"
          className={styles.button}
          onClick={onClick}
        >
          {children}
        </button>
      </div>
    );
}