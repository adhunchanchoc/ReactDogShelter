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
  DeleteButton,
} from "./homeStyles";
import { dogs } from "./dogsData.js";

export default function Home() {
  const [listOfDogs, setListOfDogs] = useState(dogs);
  const dogsCount = useRef(dogs.length); // nema but radeji listOfDogs? !NE, protoze slouzi jako unique ID
  const [activeTab, setActiveTab] = useState("list-of-dogs");

  const dogsRequirements = { food: 5, vaccine: 1, pills: 2 };
  // ukazka destrukturace
  // const { food, vaccine, pills } = dogsRequirements; console.log("destrukturovano ", food);

  // const [totalDogsRequirements, setTotalDogsRequirements] = useState(
  //   (dogsRequirements, dogsCount) => {
  //     // returnfood: dogsCount.current * dogsRequirements.food,
  //     // vaccine: dogsCount.current * dogsRequirements.vaccine,
  //     // pills: dogsCount.current * dogsRequirements.pills,
  //   }
  // );
  const calculateTotal = async () => {
    let cnt = (await listOfDogs.length) + 1; //mohu-li pridat dalsiho psa
    return {
      food: dogsRequirements.food * cnt,
      vaccine: dogsRequirements.vaccine * cnt,
      pills: dogsRequirements.pills * cnt,
    };
  };
  const [isEnoughForNewDog, setIsEnoughForNewDog] = useState(false);
  const checkAvailableStorage = async () => {
    let needed = await calculateTotal(); // uplatneni async
    if (
      storage.food >= needed.food &&
      storage.vaccine >= needed.vaccine &&
      storage.pills >= needed.pills
    ) {
      await setIsEnoughForNewDog(true);
      console.log(`dost zasob pro ${listOfDogs.length + 1}. psa`);
    } else {
      await setIsEnoughForNewDog(false);
      console.log(`malo zasob pro ${listOfDogs.length + 1}. psa`);
      console.log(
        `vyzadovano:\t ${needed.food},${needed.vaccine},${needed.pills} \ndostupno:\t ${storage.food},${storage.vaccine},${storage.pills}`
      );
    }
  };
  // useEffect(() => {
  //   console.log(dogsRequirements["food"]);
  //   console.log("vypocet", calculateTotal());
  //   console.log("dostupne", storage);
  //   console.log("je dost:", isEnoughForNewDog);
  // }, [isEnoughForNewDog]);

  const [newDog, setNewDog] = useState({
    id: dogsCount.current + 1, // POZOR pri mazani by poskocilo, tento count nesmis dekrementovat, jinak nastane conflikt of keys
    name: "",
    race: "",
    age: "",
    //zde jsem musel dat empty string, protoze pri null ci 0 vadilo, ze muj input dava jiny typ
  });
  const handleDelete = (event, id) => {
    console.log(event.target.dataset.oldid); // postaru ziskany atribut data-id z dataset
    console.log(id);
    setListOfDogs(listOfDogs.filter((dog) => id !== dog.id));
    // dogsCount.current--; nesmim dekrementovat counter zajistujici unique ID
    checkAvailableStorage(); // pro komparaci zkraceneho listu se zasobami
  };
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
  // useEffect(() => console.table(newDog), []);
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    if (
      !newDog.name == "" &&
      parseInt(newDog.age) >= 0 &&
      parseInt(newDog.age) < 25
    ) {
      setIsValid(true);
      // console.log(isValid);
    } else {
      setIsValid(false);
      // console.log(isValid);
    }
  }, [handleInput]);
  const switchTab = (event) => {
    setActiveTab(event.target.name);
    console.log(`switched to ${event.target.name}`);
  };
  //////////// SHELTER
  const [storage, setStorage] = useState({ food: 30, vaccine: 6, pills: 12 });
  const [added, setAdded] = useState({
    food: "",
    vaccine: "",
    pills: "",
  });

  const handleStoreInput = async (event) => {
    setAdded({ ...added, [event.target.name]: parseInt(event.target.value) });
    await console.table(added);
  };
  // useEffect(() => console.table(added), []);

  const storeAdd = async () => {
    await setStorage(() => {
      return {
        food: storage.food + (added.food ? added.food : 0),
        vaccine: storage.vaccine + (added.vaccine ? added.vaccine : 0),
        pills: storage.pills + (added.pills ? added.pills : 0),
      };
    });
    //vynuluj added i inputy (potom, co je value inputu ziskavana ze state, tak asi neni potreba, protoze se nuluje zaroven se state)
    await setAdded({ food: "", vaccine: "", pills: "" });
    let formular = document.getElementById("storageform");
    const inputy = Array.from(formular.getElementsByTagName("input"));
    //prevod na Array, protoze primo HTMLcollection nemuzu projet pomoci forEach
    await inputy.forEach((input) => (input.value = ""));
  };

  // pri zmene delky seznamu ci mnozstvi zasob over dostatecnost
  useEffect(() => checkAvailableStorage); // tez funguje, ale asi prilis caste
  // useEffect(
  //   () => checkAvailableStorage,
  //   [listOfDogs.length, storage.food, storage.vaccine, storage.pills]
  // );
  // POZOR nefungovala kontrola vnitrku objektu, kdyz jsem dal jen storage, useEffect pak nezaznamenal

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
                {dog.name} / {dog.race} / {parseInt(dog.age)}{" "}
                <DeleteButton
                  data-oldid={dog.id}
                  onClick={(event) => {
                    handleDelete(event, dog.id);
                  }}
                >
                  X
                </DeleteButton>
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
            <DogButton
              disabled={!isValid || !isEnoughForNewDog}
              onClick={handleAddToList}
              //onMouseOver={checkAvailableStorage}
            >
              Pridat
            </DogButton>
          </DogForm>
          {/* <div>TEST vystup: {calculateTotal()}</div> */}
          <div>TEST ulozeno: {storage.food}</div>
          <button onClick={checkAvailableStorage}>OVERIT</button>
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
