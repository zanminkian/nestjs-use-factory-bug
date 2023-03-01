# nestjs-use-factory-bug

## Reproduce
1. node 16 and npm 8
2. run `npm i`
3. run `npx ts-node main.ts`

## Expect
print
```
AModule value
BModule value
```
## Actually
print
```
AModule value
AModule value
```