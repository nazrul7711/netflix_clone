import React, { ChangeEvent } from "react";
import styles from "@/styles/input.module.scss";

type inputProps = {
  type: string;
  label: string;
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ type, label, id, onChange, value }: inputProps) => {
  return (
    <div className={styles.input}>
      <input id={id} type={type} value={value} required onChange={onChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Input;
