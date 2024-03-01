import { useContext } from "react";
import { CalcContext } from '../context/CalcContext'

const getStyleName = btn =>
{
  const className = {
    '=': 'equals',
    'x': 'opt',
    '-': 'opt',
    '+': 'opt',
    '/': 'opt',
    'AC': 'reset',
    '<x': 'opt',
    '+/-': 'opt',
    '%': 'opt',
    'sqr': 'opt',
    'root': 'opt',
    '1/x': 'opt',
  }
  return className[btn]
}

const Button = ({ value }) =>
{
  const { calc, setCalc } = useContext(CalcContext);

  const commaClick = () =>
  {
    setCalc({
      ...calc,
      num: calc.num ? (!calc.num.toString().includes('.') ? calc.num + value : calc.num) : "0."
    });
  }

  const resetClick = () =>
  {
    setCalc({ sign: "", num: "", res: "", eql: false })
  }

  const eraseClick = () =>
  {
    // const tempsgn = value;
    const val =
      calc.eql ? calc.res :
        calc.num ? calc.num :
          (calc.res ? calc.res : "0");

    const str = val.toString();
    const lastCharRemoved = str.slice(0, str.length - 1);

    setCalc({
      ...calc,
      res: calc.eql ? "" : calc.res,
      sign: calc.eql ? "" : calc.sign,
      num: lastCharRemoved,
      eql: false,
    })

    console.log(value, calc);
  }

  const handleClickDigit = () =>
  {
    const numberString = value.toString()

    if (calc.eql)
    {
      setCalc({
        num: numberString,
        res: "",
        eql: false,
        sign: ""
      })
    }
    else
    {
      let numberValue;

      if (numberString === '0' && calc.num === "" | "0")
      {
        numberValue = "0"
      }
      else
      {
        numberValue = calc.num === "0" ? numberString : calc.num + numberString
      }

      setCalc({
        ...calc,
        num: numberValue,
      })
    }
  }

  /* math func */
  const math = (a, b, sign) =>
  {
    const result = {
      '+': (a, b) => Number(a) + Number(b),
      '-': (a, b) => Number(a) - Number(b),
      'x': (a, b) => Number(a) * Number(b),
      '/': (a, b) => Number(a) / Number(b),
    }

    const x = Number(result[sign](a, b));

    return x;
  }

  const selfopClick = () =>
  {
    const math2 = (val) =>
    {
      const result = {
        'sqr': (a) => Number(a) * Number(a),
        '1/x': (a) => 1 / Number(a),
        'root': (a) => Math.sqrt(a),
        '+/-': (a) => -Number(a),
        '%': (a) => Number(a) / 100
      }

      const x = Number(result[value](val));

      return x;
    }
    const val =
      calc.eql ? calc.res :
        calc.num ? calc.num :
          (calc.res ? calc.res : "0");

    const doop = math2(val);

    setCalc({
      ...calc,
      res: calc.eql? "" : calc.res,
      sign: calc.eql ? "" : calc.sign,
      num: doop,
      eql: false,
    })

    console.log(value, calc);
  }

  const signClick = () =>
  {
    if (calc.eql)
    {
      calc.sign = ""
      calc.num = "0"
    }

    calc.num = calc.num ? calc.num : "0"

    if (calc.res && calc.num && calc.sign)
    {
      const result = math(calc.res, calc.num, calc.sign)
      setCalc({
        res: parseFloat(result.toFixed(16)),
        sign: value,
        num: "",
        eql: false
      })
    }
    else
    {
      setCalc({
        res: (calc.res) ? calc.res : calc.num,
        sign: value,
        num: "",
        eql: false
      })
    }

    console.log(value, calc);
  }

  const equalsClick = () =>
  {
    if (calc.num === "")
    {
      calc.num = calc.res
    }

    const result = math(calc.res, calc.num, calc.sign)

    if (calc.res && calc.num && calc.sign)
    {
      setCalc({
        res: parseFloat(result.toFixed(14)),
        sign: calc.sign,
        num: calc.num,
        eql: true
      })
      console.log(calc);
    }

    if (calc.eql && calc.sign)
    {
      setCalc({
        res: parseFloat(result.toFixed(14)),
        sign: calc.sign,
        num: calc.num,
        eql: true
      })
      console.log(calc);
    }
  }

  const handleBtnClick = () =>
  {
    const results = {
      '.': commaClick,
      'AC': resetClick,
      '<x': eraseClick,
      '/': signClick,
      'x': signClick,
      '-': signClick,
      '+': signClick,
      '=': equalsClick,
      '%': selfopClick,
      '+/-': selfopClick,
      'sqr': selfopClick,
      'root': selfopClick,
      '1/x': selfopClick
    }

    if (results[value])
    {
      return results[value]()
    }
    else
    {
      return handleClickDigit()
    }
  }

  return (
    <button onClick={handleBtnClick} className={`${getStyleName(value)} button`}>{value}</button>
  )
}

export default Button