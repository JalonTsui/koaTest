# nodejs中path的使用

## path.resolve

path.resolve拼接路径，不需要加上'/'

```
console.log(path.resolve(__dirname,'test/test.txt'))
// 得到正确结果
console.log(path.resolve(__dirname,'/test/test.txt'))
// 无法得到正确结果
```

