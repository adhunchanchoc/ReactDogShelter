import styled from "styled-components";

export const PageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  margin: 0 auto;
  background-color: beige;
`;

export const DogList = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 700px;
  min-width: 400px;
  background: transparent;
`;
export const DogItem = styled.div`
  display: block;
  height: 25px;
  text-justify: center;
  /* width: 90%;
  padding: 0 15px;
  justify-content: center;
  padding-top: 5px;
  justify-content: space-between; */
  background-color: #f4f2f3;
  &:nth-child(even) {
    background-color: lightgray;
  }
`;
// element zalozeny na Doglist
export const DogForm = styled(DogList)`
  width: 90%;
  flex-direction: row;
  /* flex-wrap: wrap; */
  justify-content: space-between;
  align-items: center;
  margin-top: 0px;
  /* border: 1px black solid; */
`;
export const DogInput = styled.input`
  /* display: inline-block; */
  min-width: 100px;
  margin: 8px;
  height: 30px;
  padding-left: 10px;
  background-color: whitesmoke;
`;
export const DogButton = styled.button`
  width: auto;
  margin-right: 10px;
  padding: 5px;
`;
export const TabButtons = styled(DogForm)`
  /* border: 1px white solid; */
  height: 30px;
  margin: 30px 0 0 0;
  padding-top: 0;
  /* flex-direction: row; */
  justify-items: space-between;
  text-justify: center;
  /* align-items: center; */
`;
export const TabButton = styled(DogButton)`
  width: 50%;
  justify-content: center;
  /* align-self: stretch; */
  display: flex;
  color: black;
  font-size: 20px;
  border: 1px white solid;
  border-bottom: 0px;
  background-color: lightgrey;
  cursor: pointer;
  ${(props) => {
    if (props.name === props.active) {
      return "background-color: #f4f2f3;";
    }
  }}/*
  &:hover {
    background-color: grey;
  } 
  &:active {
    background-color: grey;
  } */
`;
export const StorageForm = styled(DogForm)`
  font-family: Arial;
`;
export const StorageInput = styled(DogInput)``;
export const StorageButton = styled(DogButton)``;

export const DeleteButton = styled.div`
  display: inline-block;
  position: relative;
  z-index: 50;
  color: red;
  height: 20px;
  width: 20px;
  border-radius: 80%;
  padding: 0;
  margin: 0;
  align-items: center;
  justify-content: center;
  background: white;
  cursor: pointer;
`;
