/**
 * 把顶部 n 张牌移动到末尾
 * @param {*} n 把顶部 n 张牌移动到末尾
 * @param {*} arr 移动的数组
 * @returns 
 */
function moveCardBack(n, arr) {
  for (let i = 0; i < n; i++) {
      let moveCard = arr.shift();
      arr.push(moveCard);
  }
  return arr;
}

/**
 * 把顶部 n 张牌移动到中间的任意位置
 * @param {*} n 顶部 n 张牌移动到中间的任意位置
 * @param {*} arr 移动的数组
 * @returns 
 */
function moveCardMiddleRandom(n, arr) {
  let idx = Math.floor(Math.random() * (arr.length - n - 2)) + 1;
  const nArr = arr.splice(0, n)
  arr.splice(idx, 0, ...nArr);
  return arr;
}

/**
 * 随机抽取的4张牌
 * @returns Array
 */
function selectRandomCards() {
  // 定义一副扑克牌的数组
  let arr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
  // 定义一个数组用于存放随机抽取的4张牌
  let selectedCards = [];

  // 从一副扑克牌中随机抽取4张牌
  for (let i = 0; i < 4; i++) {
    // 生成一个随机索引
    let randomIndex = Math.floor(Math.random() * arr.length);
    // 从扑克牌数组中移除选定的牌，并将其添加到已选牌的数组中
    selectedCards.push(arr.splice(randomIndex, 1)[0]);
  }
  return selectedCards;
}


/**
 * 开始变魔术
 * @param {*} log Boolean 是否打印日志
 * @returns Boolean
 */
function startMagic(log = false) {
  // 步骤1：初始化 8 张牌 例如： "1234"
  const selectedCards = selectRandomCards()
  let arr = [...selectedCards, ...selectedCards]; // 中间对折撕成8张
  log && console.log(`【步骤1：随机拿4张牌，中间对折撕成8张，按顺序叠放。】\n--------------\n当前牌：${arr.join("，")}\n--------------`);

  // 步骤2（无关步骤）：名字长度随机选取，这里取 2 到 4（其实任意整数都行）
  let nameLength = Math.floor(Math.random() * 3) + 2;
  // 把 名字长度 张牌移动到序列末尾
  arr = moveCardBack(nameLength, arr);
  log && console.log(`【步骤2：随机名字长度：${nameLength}，把这${nameLength}张牌放到末尾。】\n--------------\n当前牌：${arr.join("，")}\n--------------`);

  // 步骤3（关键步骤）：把牌堆顶三张放到中间任意位置
  arr = moveCardMiddleRandom(3, arr);
  log && console.log(`【步骤3：把牌堆顶3张放到中间的随机位置。】\n--------------\n当前牌：${arr.join("，")}\n--------------`);

  // 步骤4（关键步骤）：把最顶上的牌拿走
  let restCard = arr.shift();       // 移除数组的第一个元素
  log && console.log(`【步骤4：把最顶上的牌拿走，放在一边。拿走的牌为：${restCard}】\n--------------\n当前牌：${arr.join("，")}\n--------------`);

  // 步骤5（无关步骤）：根据南方人/北方人/不确定，把顶上的1/2/3张牌插入到中间任意位置
  // 随机选择1、2、3中的任意一个数字
  let moveNum = Math.floor(Math.random() * 3) + 1;
  arr = moveCardMiddleRandom(moveNum, arr);
  const origin = moveNum == 1 ? '是南方人' : moveNum == 2 ? '是北方人' : '不确定自己是哪里人'
  log && console.log(`【步骤5：我${origin}，把${moveNum}张牌插入到中间的随机位置。】\n--------------\n当前牌：${arr.join("，")}\n--------------`);

  // 步骤6（关键步骤）：根据性别男或女，移除牌堆顶的1或2张牌
  let maleNum = Math.floor(Math.random() * 2) + 1;
  arr.splice(0, maleNum); // 移除数组的前 maleNum 个元素
  log && console.log(`【步骤6：我是${maleNum == 1 ? '男' : '女'}生，移除牌堆顶的${maleNum}张牌。】\n--------------\n当前牌：${arr.join("，")}\n--------------`);

  // 步骤7（关键步骤）：把顶部的牌移动到末尾，执行7次
  arr = moveCardBack(7, arr);
  log && console.log(`【步骤7：把顶部的牌移动到末尾，执行7次。】\n--------------\n当前牌：${arr.join("，")}\n--------------`);

  // 步骤8（关键步骤）：执行约瑟夫环过程。把牌堆顶一张牌放到末尾，再移除一张牌，直到只剩下一张牌。
  log && console.log("【步骤8：把牌堆顶一张牌放到末尾，再移除一张牌，直到只剩下一张牌。");
  while (arr.length > 1) {
    let luck = arr.shift();        // 好运留下来
    arr.push(luck);
    log && console.log(`好运留下来：${luck}\t\t当前牌：${arr.join("，")}`);
    let sadness = arr.shift();     // 烦恼都丢掉
    log && console.log(`烦恼丢出去：${sadness}\t\t当前牌：${arr.join("，")}`);
  }
  console.log(`魔术最终结果：选中的牌：${selectedCards.join("，")}，姓名长度：${nameLength}，哪里人：${origin}，剩下的牌：${arr[0]}，藏起的牌：${restCard}`);
  return arr[0] === restCard;
}


/** 开始魔术测试 */
performMagicTrials(100)
function performMagicTrials(totalCount) {
  let successCount = 0; // 成功次数
  for (let i = 0; i < totalCount; i++) {
    if (startMagic()) {
      successCount++;
    }
  }
  console.log(`成功次数：${successCount}, 失败次数：${totalCount - successCount}, 成功率：${(successCount / totalCount * 100).toFixed(2)}%`);
}
