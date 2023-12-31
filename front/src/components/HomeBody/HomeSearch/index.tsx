import Image from "next/image";
import search from "@/../public/search.svg";
import styles from "./styles.module.scss";
import { Dispatch, SetStateAction } from "react";

interface IHomeSearchProps {
  setAddDialog: Dispatch<SetStateAction<boolean>>;
  setSearchText: Dispatch<SetStateAction<string>>;
}

export default function HomeSearch({
  setAddDialog,
  setSearchText,
}: IHomeSearchProps) {
  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Procurar contatos"
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button>
          <Image src={search} alt="Procurar" />
        </button>
      </div>
      <div className={styles.add}>
        <button
          onClick={() => {
            setAddDialog(true);
          }}
        >
          Adicionar Contato
        </button>
      </div>
    </div>
  );
}
