import React, { useState } from 'react'
import SingleColor from './SingleColor'

// 一个将 Hex color code 转换为 RGB 的 npm library;
// 转换结果是：10个 tint- 1个 base - 10个 shades
  // Values.all(10) 的功能，就是输出 10个 tint，1个 base 和 10个 shades 
import Values from 'values.js'

function App() {

  // 为 colorArray 设置一个默认值！#f15025
  const [colorArray, setColorArray] = useState(new Values('#f15025').all(10));
  const [color, setColor] = useState('');
  // 另还需设置一个：Error 值，以便在输入的 Hex Code 不符合规范时报错:
  const [isError, setIsError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      // 使用 Values library 的 .all method，
      // 传入参数为 10，这样能列出 10 个 tints 10 个 shades 1 个 base color。(100/10 = 10)
      // 同理传入 .all 参数为 20，则会产生 5 个 shades/tints 和 1 个 base. 
        // 输入 #222 的返回结果：
          // : 
        // N {rgb: Array(3), alpha: 1, type: 'tint', weight: 100}
        // 1
        // : 
        // N {rgb: Array(3), alpha: 1, type: 'tint', weight: 90}
        // 2
        // : 
        // N {rgb: Array(3), alpha: 1, type: 'tint', weight: 80}
        // 3
        // : 
        // N {rgb: Array(3), alpha: 1, type: 'tint', weight: 70}
        // 4
        // : 
        // N {rgb: Array(3), alpha: 1, type: 'tint', weight: 60}
        // 5
        // : 
        // N {rgb: Array(3), alpha: 1, type: 'tint', weight: 50}
        // 6
        // : 
        // N {rgb: Array(3), alpha: 1, type: 'tint', weight: 40}
        // 7
        // : 
        // N {rgb: Array(3), alpha: 1, type: 'tint', weight: 30}
        // 8
        // : 
        // N {rgb: Array(3), alpha: 1, type: 'tint', weight: 20}
        // 9
        // : 
        // N {rgb: Array(3), alpha: 1, type: 'tint', weight: 10}
        // 10
        // : 
        // N {rgb: Array(3), alpha: 1, type: 'base', weight: 0}
        // 11
        // : 
        // N {rgb: Array(3), alpha: 1, type: 'shade', weight: 10}
        // 12
        // : 
        // N {rgb: Array(3), alpha: 1, type: 'shade', weight: 20}
        // 13
        // : 
        // N {rgb: Array(3), alpha: 1, type: 'shade', weight: 30}
        // 14
        // : 
        // N {rgb: Array(3), alpha: 1, type: 'shade', weight: 40}
        // 15
        // : 
        // N {rgb: Array(3), alpha: 1, type: 'shade', weight: 50}
        // 16
        // : 
        // N {rgb: Array(3), alpha: 1, type: 'shade', weight: 60}
        // 17
        // : 
        // N {rgb: Array(3), alpha: 1, type: 'shade', weight: 70}
        // 18
        // : 
        // N {rgb: Array(3), alpha: 1, type: 'shade', weight: 80}
        // 19
        // : 
        // N {rgb: Array(3), alpha: 1, type: 'shade', weight: 90}
        // 20
        // : 
          // N {rgb: Array(3), alpha: 1, type: 'shade', weight: 100}
      let colors = new Values(color).all(10) // 这里的 color 不仅是 state，也是 input 的 value！
      console.log(colors);
      setColorArray(colors);


      // 如有错误则 catch error 并 setError state，方便给 input Error 加红框！
        // 如果不加这个 try-catch pair，则页面会 crash. 加了以后，可以打印出 error.
    } catch (error) {
      setIsError(true);
      console.log(error);
    }

  }

    return (<>
    <section className='container'>
      <h3>color generator</h3>
      <form onSubmit={handleSubmit}>
        <input 
          type='text' 
          placeholder='#f15025'
          // 记得 tab project 中的 className={`job-btn ${loopValue === index && 'active-btn'}`}
          // 如 isError 为 true，则将 error 列为 class，（加上红框！）
          className={`${isError ? 'error' : null}`} 
          value={color}
          onChange={(event) => setColor(event.target.value)}
          ></input>
        <button type='submit' className='btn'>Submit</button>
      </form>
    </section>
    <section className='colors'>
      {colorArray.map((color,index) => {
        console.log(color);
        // 在 singleColor 中记录了 {...color} 的内容！
        return <SingleColor
          key={index}
          {...color} // 传导color object 的快捷方式。
          index={index}
          hexColor={color.hex}
        ></SingleColor>
      })}
    </section>
  </>)
}

export default App
