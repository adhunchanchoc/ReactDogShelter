import React, { useEffect, useRef, useState } from "react";
import {
  PageContainer,
  DogItem,
  DogList,
  DogForm,
  DogInput,
  DogButton,
} from "./homeStyles";
import { dogs } from "./dogsData.js";

export default function Home() {
  const dogsCount = useRef(dogs.length); // nema but radeji listOfDogs?
  const [listOfDogs, setListOfDogs] = useState(dogs);
  const dogsRequirements = useState({ food: 5, vaccine: 1, pills: 2 });
  const [newDog, setNewDog] = useState({
    id: dogsCount.current + 1,
    name: "",
    race: "",
    age: "",
    //zde jsem musel dat empty string, protoze pri null ci 0 vadilo, ze muj input dava jiny typ
  });
  const handleInput = (event) => {
    setNewDog({ ...newDog, [event.target.name]: event.target.value });
  };
  const handleAddToList = () => {
    setListOfDogs((listOfDogs) => {
      return [...listOfDogs, newDog];
    });
    dogsCount.current++;
    // vynulovani newDog
    setNewDog({ id: dogsCount.current + 1, name: "", race: "", age: "" });
  };
  //moje validace
  useEffect(() => console.table(newDog), []);
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    if (
      !newDog.name == "" &&
      parseInt(newDog.age) >= 0 &&
      parseInt(newDog.age) < 25
    ) {
      setIsValid(true);
      console.log(isValid);
    } else {
      setIsValid(false);
      console.log(isValid);
    }
  }, [handleInput]);

  return (
    <PageContainer>
      <DogList>
        {listOfDogs.map((dog) => (
          <DogItem key={dog.id} name={dog.name}>
            {dog.name} / {dog.race} / {parseInt(dog.age)}
          </DogItem>
        ))}
      </DogList>
      <DogForm>
        <DogInput
          onChange={handleInput}
          value={newDog.name}
          name="name"
          type="text"
          placeholder="jmeno"
        />
        <DogInput
          onChange={handleInput}
          value={newDog.race}
          name="race"
          type="text"
          placeholder="rasa"
        />
        <DogInput
          onChange={handleInput}
          value={newDog.age}
          name="age"
          type="number"
          min="0"
          style={{ minWidth: "50px" }}
          placeholder="vek"
        />
        <DogButton disabled={!isValid} onClick={handleAddToList}>
          Pridat
        </DogButton>
      </DogForm>
    </PageContainer>
  );
}
