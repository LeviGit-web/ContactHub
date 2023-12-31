"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchApi } from "@/services/api";
import styles from "./styles.module.scss";
import HomeHeader from "@/components/HomeHeader";
import HomeSearch from "@/components/HomeBody/HomeSearch";
import HomeAddModal from "@/components/HomeBody/HomeAddModal";
import HomeCard from "@/components/HomeBody/HomeCard";

export interface IContent {
  id: number;
  fullName: string;
  email: string;
  telephone: string;
  profileImage: string;
  registerDate: Date;
}

interface IHandleSubmit {
  clientId: number;
  contacts: IContent[];
}

export default function Home() {
  const router = useRouter();
  const [content, setContent] = useState<IContent[]>();
  const [signout, setSignOut] = useState<boolean>(false);
  const [addDialog, setAddDialog] = useState<boolean>(false);
  const [profileName, setProfileName] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [handleBool, setHandleBool] = useState<boolean>(false);

  useEffect(() => {
    setHandleBool(false);

    const handleSubmit = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/login");
          return;
        } else {
          const data = await fetchApi<IHandleSubmit>("clients/contact/", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setContent(data.contacts);

          const profile = await fetchApi<IContent[]>("clients", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          profile.forEach((element) => {
            if (element.id === data.clientId) {
              setProfileName(element.fullName);
            }
          });
        }
      } catch (error) {}
    };
    handleSubmit();
  }, [handleBool]);

  useEffect(() => {
    if (searchText !== "") {
      let newData = content?.filter((e) => {
        return (
          e.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
          e.email.toLowerCase().includes(searchText.toLowerCase())
        );
      });
      setContent(newData);
    } else {
      setHandleBool(true);
    }
  }, [searchText]);

  return (
    <main>
      {addDialog ? <HomeAddModal setAddDialog={setAddDialog} /> : null}
      <div className={styles.box}>
        <HomeHeader
          setSignOut={setSignOut}
          signout={signout}
          name={profileName}
        />
        <div className={styles.box_body}>
          <HomeSearch
            setAddDialog={setAddDialog}
            setSearchText={setSearchText}
          />
          <div className={styles.box_card}>
            <div className={styles.box_info}>
              <h1>Informações básicas</h1>
              <span>Telefone</span>
            </div>
            {content
              ? content.map((e) => {
                  return <HomeCard contacts={e} key={e.id} />;
                })
              : null}
          </div>
        </div>
      </div>
    </main>
  );
}
