import React, { useEffect, useRef, useState } from "react";
import {
  PageContainer,
  DogItem,
  DogList,
  DogForm,
  DogInput,
  DogButton,
  TabButtons,
  TabButton,
  StorageForm,
  StorageInput,
  StorageButton,
} from "./homeStyles";
import { dogs } from "./dogsData.js";

export default function Home() {
  const dogsCount = useRef(dogs.length); // nema but radeji listOfDogs?
  const [listOfDogs, setListOfDogs] = useState(dogs);
  const [activeTab, setActiveTab] = useState("list-of-dogs");

  const dogsRequirements = { food: 5, vaccine: 1, pills: 2 };
  // const food = useRef((dogsRequirements) => {
  //   food;
  // });
  // const { food, vaccine, pills } = dogsRequirements;
  // console.log("destrukturovano ", food);

  // const [totalDogsRequirements, setTotalDogsRequirements] = useState(
  //   (dogsRequirements, dogsCount) => {
  //     // returnfood: dogsCount.current * dogsRequirements.food,
  //     // vaccine: dogsCount.current * dogsRequirements.vaccine,
  //     // pills: dogsCount.current * dogsRequirements.pills,
  //   }
  // );
  const calculateTotal = () => {
    return dogsRequirements.food * dogsCount.current;
  };
  useEffect(() => {
    console.log(dogsRequirements["food"]);
    // console.log("plnych", totalDogsRequirements["food"]);
    // console.table(totalDogsRequirements);
    console.log("vypocet", calculateTotal());

    // console.log("zradlo", food.current);
  }, []);

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
  const switchTab = (event) => {
    setActiveTab(event.target.name);
    console.log(`switched to ${event.target.name}`);
  };
  //////////// SHELTER
  const [storage, setStorage] = useState({ food: 0, vaccine: 0, pills: 0 });
  const [added, setAdded] = useState({
    food: "",
    vaccine: "",
    pills: "",
  });

  const handleStoreInput = (event) => {
    setAdded({ ...added, [event.target.name]: parseInt(event.target.value) });
    // console.log(event.target.name);
    // console.table(added);
  };
  // useEffect(() => console.table(added), []);

  const storeAdd = () => {
    setStorage(() => {
      return {
        food: storage.food + (added.food ? added.food : 0),
        vaccine: storage.vaccine + (added.vaccine ? added.vaccine : 0),
        pills: storage.pills + (added.pills ? added.pills : 0),
      };
    });
    //vynuluj added i inputy
    setAdded({ food: "", vaccine: "", pills: "" });
    let formular = document.getElementById("storageform");
    const inputy = Array.from(formular.getElementsByTagName("input"));
    //prevod na Array, protoze primo HTMLcollection nemuzu projet pomoci forEach
    inputy.forEach((input) => (input.value = ""));
  };
  return (
    <PageContainer>
      <TabButtons>
        <TabButton active={activeTab} name="list-of-dogs" onClick={switchTab}>
          Seznam psu
        </TabButton>
        <TabButton
          active={activeTab}
          name="shelter-storage"
          onClick={switchTab}
        >
          Sklad utulku
        </TabButton>
      </TabButtons>
      {activeTab === "list-of-dogs" && (
        <>
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
          <div>TEST vystup: {calculateTotal()}</div>
          <div>TEST ulozeno: {storage.food}</div>
        </>
      )}
      {activeTab === "shelter-storage" && (
        <>
          <StorageForm id="storageform">
            <StorageInput
              name="food"
              placeholder="granule"
              type="number"
              value={added.food}
              onChange={handleStoreInput}
            />
            <StorageInput
              name="vaccine"
              placeholder="vakcina"
              type="number"
              value={added.vaccine}
              onChange={handleStoreInput}
            />
            <StorageInput
              name="pills"
              placeholder="prasky"
              type="number"
              value={added.pills}
              onChange={handleStoreInput}
            />
            <StorageButton onClick={storeAdd}> + </StorageButton>
          </StorageForm>
          <p>Granule: {storage.food}</p>
          <p>Vakcina: {storage.vaccine}</p>
          <p>Prasky: {storage.pills}</p>
        </>
      )}
    </PageContainer>
  );
}
