## 介绍

YAML(发音 /ˈjæməl/)：专门用来写配置文件的语言

## 语法规则

- 大小写敏感
- 使用缩进表示层级关系
- 缩进时不允许使用Tab键，只允许使用空格
- 缩进的空格数目不重要，只要相同层级的元素左侧对齐即可
- `#`表示注释

## 支持的数据结构

- 对象：键值对的集合，映射(mapping) | 哈希(hashes) | 字典(dictionary)
- 数组：一组按次序排列的值，序列(sequence) | 列表(list)
- 纯量(scalars)：单个的、不可再分的值；字符串 | 布尔值 | 整数 | 浮点数 | Null | 时间 | 日期

### 对象

> 冒号结构

```
animal: pets
```

```
// js
{ animal: 'pets' }
```

### 数组

```
- Cat
- Dog
- Goldfish
```

```
// js
[ 'Cat', 'Dog', 'Goldfish' ]
```

### 复合结构

```
languages:
 - Ruby
 - Perl
 - Python 
websites:
 YAML: yaml.org 
 Ruby: ruby-lang.org 
 Python: python.org 
 Perl: use.perl.org 
```

```
{ languages: [ 'Ruby', 'Perl', 'Python' ],
  websites: 
   { 
   	YAML: 'yaml.org',
     Ruby: 'ruby-lang.org',
     Python: 'python.org',
     Perl: 'use.perl.org' 
   } 
}
```

### 纯量

#### 字符串

```
s1: '内容\n字符串'
s2: "内容\n字符串"
str: 'labor''s day' 
```

```
{ s1: '内容\\n字符串', s2: '内容\n字符串', str: 'labor\'s day' }
```


> 多行字符串可以使用`|`保留换行符，也可以使用`>`折叠换行

> `+`表示保留文字块末尾的换行，`-`表示删除字符串末尾的换行

```
s1: |
  Foo

s2: |+
  Foo


s3: |-
  Foo
```

```
{ s1: 'Foo\n', s2: 'Foo\n\n\n', s3: 'Foo' }
```

> `&`用来建立锚点（defaults），`<<`表示合并到当前数据，`*`用来引用锚点。

```
- &showell Steve 
- Clark 
- Brian 
- Oren 
- *showell
```

```
[ 'Steve', 'Clark', 'Brian', 'Oren', 'Steve' ]
```

#### 其他

```
number: 12.30
isSet: true
parent: ~ 
iso8601: 2001-12-14t21:59:43.10-05:00
date: 1976-07-
e: !!str 123
f: !!str true
```

```
{ 
 number: 12.30,
 isSet: true,
 parent: null,
 iso8601: new Date('2001-12-14t21:59:43.10-05:00'),
 date: new Date('1976-07-31'),
 e: '123', f: 'true'
}
```
























