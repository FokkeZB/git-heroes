# Git Heroes

List git contributors between two revisions.

## Example

```
$ git-heroes -c 5_0_2_GA -p 5_0_1_GA -o md -s sum
| name         | email                           | commits (7) | added (139) | deleted (61) | sum (200) | diff (78) |
| ------------ | ------------------------------- | ----------- | ----------- | ------------ | --------- | --------- |
| Chris Barber | chris@cb1inc.com                | 2           | 127         | 49           | 176       | 78        |
| prop         | r.belyakov@netris.ru            | 1           | 5           | 5            | 10        | 0         |
| Feon Sua     | feonsua@Feons-MacBook-Pro.local | 1           | 4           | 4            | 8         | 0         |
| Ng Chee Kiat | cng@appcelerator.com            | 3           | 3           | 3            | 6         | 0         |
```

## Usage

Run `git-heroes` for usage.

## Module API

```
var heroes = require('git-heroes');

heroes.run(opts, callback);
```