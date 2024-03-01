import { useContext } from "react"
import { CalcContext } from "../context/CalcContext"
import { Textfit } from 'react-textfit';

const Screen2 = () =>
{
    const { calc } = useContext(CalcContext);
    const eqlDisplay = (calc.sign + " " + calc.num)
    const unEqlDisplay = calc.res + " " + calc.sign;
    const result = calc.eql? eqlDisplay : unEqlDisplay;

    return (
        <Textfit className="screen2" max={40} mode="single">
            <span className="val">
                {
                    result === Infinity ? "Error" : result
                }
            </span>
        </Textfit>
    )
}

export default Screen2