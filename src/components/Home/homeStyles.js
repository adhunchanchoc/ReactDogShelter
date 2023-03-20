import styled from "styled-components";

export const PageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  background-color: beige;
`;

export const DogList = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 400px;
  background: transparent;
`;
export const DogItem = styled.div`
  display: block;
  height: 30px;
  /* width: 90%;
  padding: 0 15px;
  align-items: center;
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
