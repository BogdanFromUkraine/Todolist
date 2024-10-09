import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Button,
  transition,
} from "@chakra-ui/react";
import styles from "./styles/card.module.css";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import animationData from "./animation/Animation - 1721404943767.json";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../store/root-store-context";

export const Cards = observer(({ notes }) => {
  const [deletingItem, setDeletingItem] = useState(null);

  const { remove_Note, update_Note } = useStores();

  function handleDelete(id) {
    notes.map((e) => {
      if (e.id === id) {
        setDeletingItem(e.id);
        //показ анімації протягом якогось часу
        setTimeout(() => {
          setDeletingItem(null);
        }, 6000);

        //видалення елемента
        setTimeout(() => {
          remove_Note(e.id);
        }, 5000);
      }
    });
  }

  async function handleClick(id) {
    await update_Note(id);
  }
  const listVariable = {
    visible: (i) => ({
      opacity: 1,
      transition: {
        delay: i * 0.5,
      },
    }),
    hidden: { opacity: 0 },
  };

  return (
    <>
      {notes !== null ? (
        <>
          {notes.map((e, i) => {
            return (
              <motion.li
                key={e.id}
                className={styles.card}
                variants={listVariable}
                initial="hidden"
                animate="visible"
                custom={i}
                whileHover={{ scale: 1.2 }}
                whileTap={{
                  opacity: 0,
                  transition: {
                    duration: 1,
                  },
                }}
              >
                {e.id === deletingItem ? (
                  <Lottie
                    className={styles.lottie_container}
                    animationData={animationData}
                  />
                ) : (
                  <Card
                    key={e.id}
                    className={e.isCompleted ? styles.cardCompleted : ""}
                  >
                    <CardHeader>
                      <Heading size="md">
                        <span
                          onClick={() => {
                            handleClick(e.id);
                          }}
                        >
                          {e.title}
                        </span>
                      </Heading>
                    </CardHeader>
                    <CardBody>
                      <Text pt="2" fontSize="sm">
                        {e.description}
                      </Text>
                      <Button
                        onClick={() => {
                          handleDelete(e.id);
                        }}
                      >
                        X
                      </Button>
                      <img src={e.photoCode} width="300" height="100" />
                    </CardBody>
                  </Card>
                )}
              </motion.li>
            );
          })}
        </>
      ) : (
        <div>Помилка</div>
      )}
    </>
  );
});
