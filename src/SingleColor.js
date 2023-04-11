import React, { useState, useEffect } from 'react'
import rgbToHex from './utils'

// rgb 与 weight，均是 colorArray 中每个 color 的固有性质。
const SingleColor = ({rgb, weight, index, hexColor}) => {
  // 复制剪贴板功能使用的 alert！
  const [alert, setAlert] = useState(false);
  // 目前colorArray 中每一个 color 返回的 rgb 是一个 3-element array，
    // 因此可将其变成 string.
  const background = rgb.join(',');
  console.log(background);

  // 利用 rgbToHex function，将 rgb 转化为 hexCode
  const hexCode = rgbToHex(...rgb);
  // 或也可使用 App 内传导来的 hexColor = color.hex
  const hexColorValue = `#${hexColor}` 

  // COPY TO CLIPBOARD
  const handleClick = () => {
    setAlert(true); // 开始显示；
    navigator.clipboard.writeText(hexColorValue); // 利用 JS 来访问 clipboard.
  }

  // 参考 Slider，利用 useEffect + 设置一个 clearUp function!

  useEffect(() => {
    const autoTimeOut = setTimeout(() => {
      setAlert(false);
    },1500);
    return () => {
      clearTimeout(autoTimeOut)
    };
    // 注意：要 return clearTimeout，
    // 且 useEffect 的 dependency list 应为 alert，因为随 alert 的变化而变动。 
  },[alert]);

  return <article 
    // 传入 index 的用处：当 index > 10 时，将文字调为亮色以便查看。
    className={`color ${index > 10 && 'color-light'}`} // tint 和 shade 的 class 不同
    
    // 将 article 的背景色设置为 background 的 rgb 颜色。
    style={{backgroundColor:`rgb(${background})`}}

    onClick={handleClick}
    >
      <p className='percent-value'>{weight}%</p>
      {/* 如何显示颜色号码？据 App.js 可知，
      colorArray 中的 color，有一个 property 叫 hex。
      因此尝试传入 hex */}

      {/* 尝试使用 hex 无效，
      转而使用 const hexCodeWay = rgbToHex(...rgb),
      合并 #{hexCodeWay}
      这是第一种方法，调用 rgbToHex 的 function */}

      {/* 第二种方法：colorArray 中 color 的 property hex 并非无效，
      而是可以通过 props 传导！
      亦可在 App 中注入 props: hexColor={color.hex}
      并在 SingleColor 中使用 hexColor */}

      <p className='color-value'>{hexCode}</p>
      {/* 或也可使用：const hexColorValue = `#${hexColor}` */}
      <p className='color-value'>{hexColorValue}</p>

      {alert && <p className='alert'>copied to clipboard!</p>}
    </article>
}

export default SingleColor

// COPY TO CLIPBOARD
  // 首先，根据 alert 的 true or false，
  // 来决定 <p>Copied to Clipboard</p> 的显示与否。

// click <article> 来 copy，这个 onClick 并非必须设置在 App 中，
// 设置在 <article> 上也许更好！