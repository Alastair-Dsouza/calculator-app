import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from './components/ButtonBox'
import Button from './components/Button'
import CalcProvider from "./context/CalcContext";
import Screen2 from "./components/Screen2";

const btnValues = [
  "AC", "<x", "sqr", "root",
  "1/x", "+/-", "%", "/",
  7, 8, 9, "x",
  4, 5, 6, "-",
  1, 2, 3, "+",
  0, ".", "=",
];

function App()
{
  return (
    <CalcProvider>
      <Wrapper>
        <Screen2 />
        <Screen />
        <ButtonBox>
          {btnValues.map((btn, i) => (
            <Button
              value={btn}
              key={i}
            />
          ))}
        </ButtonBox>
      </Wrapper>
    </CalcProvider>
  );
}

export default App;
