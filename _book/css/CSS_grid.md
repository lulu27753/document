# 关于布局

+ float
+ flexbox(一维)
+ css grid(二维)

# 准备工作

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CSS Grids</title>
  <style>
    .wrapper > div {
      background: #eee;
      padding: 1em;
    }

    .wrapper > div:nth-child(odd) {
      background: #ddd;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div>
      Lorem ipsum dolor sit amet, consectetur magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
      ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur.  Excepteur sint occaecat cupidatat non proident, sunt in
      culpa qui officia deserunt mollit anim id est laborum
    </div>
    <div>
      Lorem ipsum dolor sit amet, consectetur magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
      ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur.  Excepteur sint occaecat cupidatat non proident, sunt in
      culpa qui officia deserunt mollit anim id est laborum
    </div>
    <div>
      Lorem ipsum dolor sit amet, consectetur magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
      ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur.  Excepteur sint occaecat cupidatat non proident, sunt in
      culpa qui officia deserunt mollit anim id est laborum
    </div>
    <div>
      Lorem ipsum dolor sit amet, consectetur magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
      ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur.  Excepteur sint occaecat cupidatat non proident, sunt in
      culpa qui officia deserunt mollit anim id est laborum
    </div>
  </div>
</body>
</html>
```

![页面展示](./assets/css_grid_1.png)

# css grid 特性

## grid-template-columns

按百分比显示，左边 70%，右边 30%。

```css
.wrapper {
  display: grid;
  grid-template-columns: 70% 30%;
}
```

不仅是可以左右按比例，可以任意，比如

```css
.wrapper {
  display: grid;
  grid-template-columns: 40% 30% 30%;
}
```

除了按百分比，也可以按固定的大小（px）。

```css
.wrapper {
  display: grid;
  grid-template-columns: 300px 200px 200px;
}
```

## fr 单位

```css
.wrapper {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
}
```

## repeat()

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
```

repeat，顾名思义，重复的意思，1fr 重复四次，那就是 1fr 1fr 1fr 1fr。

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr 2fr);
}
```

左边 1 个格子，右边 2 个格子，这样重复 4 次，相当于 1fr 2fr 1fr 2fr 1fr 2fr 1fr 2fr。如果你的标签元素不够，那自然就留为空白了。

## 网格间距

grid-column-gap：列间距

```css
.wrapper {
  display: grid;
  grid-template-columns: 1fr 2fr 2fr;
  grid-column-gap: 1em;
}
```

grid-row-gap: 行间距

```css
.wrapper {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-column-gap: 1em;
  grid-row-gap: 1em;
}
```

简写

```css
grid-column-gap: 1em;
grid-row-gap: 1em;

// 等同于
grid-gap: 1em

// 等同于
grid-gap: 1em 2em; //第一个参数是行间距，第二个参数是列间距。
```

## grid-auto-rows(网格高度)

```css
.wrapper {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-gap: 1em;
  grid-auto-rows: 100px;
}
```

要解决上面的问题，可以使用 minmax() 设置最小的高度。

```css
.wrapper {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-gap: 1em;
  grid-auto-rows: minmax(100px, auto);
}
```

## 网格排列

### justify-items(水平排列)

```css
.wrapper {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-gap: 1em;
  grid-auto-rows: minmax(100px, auto);
  justify-items: start;
}
```

start：最左边排列。
center：中间排列。
end：最右边排列。
stretch：默认情况。

### align-items(垂直排列)

```css
.wrapper {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-gap: 1em;
  grid-auto-rows: minmax(100px, auto);
  justify-items: stretch;
  align-items: start;
}
```

### 针对某个特定的网格进行排列

使用 justify-self 和 align-self

```css
.wrapper {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-gap: 1em;
  grid-auto-rows: minmax(100px, auto);
  justify-items: stretch;
  align-items: stretch;
}

.box1 {
  align-self: start;
}

.box2 {
  justify-self: start;
}
```

## 网格空间大小和位置

grid-template-columns 是控制了所有的网格盒子的分布比率，如果要控制单个网格盒子的网格水平水向和垂直方向的大小，分别要使用 grid-column 和 grid-row。

这两个指令要用起来，主要是靠自己的理解和对它慢慢地调节，不断地总结经验。

```css
.box1 {
  grid-column: 1/3;
}

.box2 {
}
```

这个 1/3 表示的是 1 到 3，第一到第三个网格，我们还是来看下效果。
