import { useContext } from "react"
import { CalcContext } from "../context/CalcContext"
import { Textfit } from 'react-textfit';

const Screen = () =>
{
  const { calc } = useContext(CalcContext);
  const result = calc.eql ? calc.res :
    calc.sign ? calc.num :
      calc.num ?
        calc.num :
        (calc.res ? calc.res : "0")
  return (
    <Textfit className="screen" max={70} mode="single">
      {/* <span className="sgn">{calc.sign}</span> */}
      {/* {calc.num? calc.num : calc.res} */}
      <span className="val">
        {
          result === Infinity ? "Error" : result
        }
      </span>
    </Textfit>
  )
}

export default Screen