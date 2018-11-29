;(() => {
  'use strict';
  const getDimension = () => {
    const width = 8 * Math.random() + 2;
    const height = width;
    return {
      width,
      height
    };
  };
  const createBox = (width, height) => {
    const el = document.createElement('div');
    el.style.width = `${width}px`;
    el.style.height = `${height}px`;
    el.classList.add('logo__display');
    return el;
  };
  const generateAngle = (angleSlice) => {
    return () => {
      const slice = 360 / angleSlice;
      return Array.apply(null, Array(slice)).map((item, idx) => {
        return idx * angleSlice;
      })
    };
  };
  const createDisplayBox = (sliceAngle) => {
    const { width, height } = getDimension();
    const box = createBox(width, height);
    const generateAngle45 = generateAngle(sliceAngle);
    const rotationList = generateAngle45();
    const rotationListLen = rotationList.length;
    const rotationIndex = Math.floor(Math.random() * rotationListLen);
    const rotation = rotationList[rotationIndex];
    box.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
    return {
      el: box,
      rotation,
      sliceAngle,
    };
  };
  const logo = document.getElementById('logo');
  const logoBoxNodeList = logo.querySelectorAll('.logo__box');
  const logoBoxArr = Array.prototype.slice.call(logoBoxNodeList);
  const middleDisplayBox = createDisplayBox(45);
  const sideDisplayBox = createDisplayBox(45);
  const sideBoxes = [
    logoBoxArr[0],
    logoBoxArr[1],
    logoBoxArr[2],
    logoBoxArr[5],
    logoBoxArr[8],
    logoBoxArr[7],
    logoBoxArr[6],
    logoBoxArr[3],
  ];
  sideBoxes.forEach((box, idx) => {
    const { el, rotation, sliceAngle } = sideDisplayBox;
    const node = el.cloneNode(true);
    const offset = idx + 1;
    const rot = rotation + (offset * sliceAngle);
    node.style.transform = ` translate(-50%, -50%) rotate(${rot}deg)`;
    box.appendChild(node);
  });
  logoBoxArr[4].appendChild(middleDisplayBox.el);
})();
