# Git Heroes

Get stats on git contributors between two git (release) tags or any other [revision range](https://git-scm.com/docs/gitrevisions#_specifying_ranges) in JSON or MarkDown format.

A great insight and way to thank your community.

## Example

Get the contributors between the last 5.0.2 release and the current 5.1.x version of [Appcelerator Titanium](https://github.com/appcelerator/titanium_mobile).

```
$ git-heroes -c 5_1_X -p 5_0_2_GA -o md -n
| name (16)        | email                           | commits (255) | added (176061) | deleted (347769) | sum (523830) | diff (171708) |
| ---------------- | ------------------------------- | ------------- | -------------- | ---------------- | ------------ | ------------- |
| Chris Barber     | chris@cb1inc.com                | 43            | 146762         | 255795           | 402557       | 109033        |
| sgtcoolguy       | chris.a.williams@gmail.com      | 11            | 8588           | 88800            | 97388        | 80212         |
| Pedro Enrique    | pedro.tma@gmail.com             | 13            | 6122           | 207              | 6329         | 5915          |
| Feon Sua         | feonsua@Feons-MacBook-Pro.local | 13            | 5418           | 30               | 5448         | 5388          |
| Hans Knoechel    | hans.knoechel@hs-osnabrueck.de  | 75            | 3026           | 1449             | 4475         | 1577          |
| Hieu Pham        | hpham@appcelerator.com          | 13            | 2285           | 447              | 2732         | 1838          |
| Ben Hatfield     | bhatfield@appcelerator.com      | 11            | 1340           | 441              | 1781         | 899           |
| Ben Bahrenburg   | ben.bahrenburg@gmail.com        | 13            | 994            | 195              | 1189         | 799           |
| Ashraf           | msamah@appcelerator.com         | 13            | 905            | 114              | 1019         | 791           |
| cheekiatng       | cng@appcelerator.com            | 26            | 351            | 193              | 544          | 158           |
| AngelkPetkov     | apetkov@appcelerator.com        | 13            | 226            | 62               | 288          | 164           |
| Manoj Kumar      | mano.mykingdom@gmail.com        | 2             | 22             | 20               | 42           | 2             |
| Fokke Zandbergen | mail@fokkezb.nl                 | 5             | 10             | 8                | 18           | 2             |
| Manuel Lehner    | manuel.lehner@goyya.com         | 2             | 9              | 5                | 14           | 4             |
| Kota Iguchi      | developer@infosia.co.jp         | 1             | 2              | 2                | 4            | 0             |
| Praveen Innamuri | pinnamuri@appcelerator.com      | 1             | 1              | 1                | 2            | 0             |
```

## Install [![npm](http://img.shields.io/npm/v/git-heroes.pg)](https://www.npmjs.org/package/git-heroes)

As global CLI:

```
[sudo] npm install -g git-heroes
```

As a dependency:

```
npm install --save git-heroes
```

## Usage

Run `git-heroes -h` for usage:

```
$ git-heroes -h

  Usage: git-heroes [options] [path]

  Options:

    -h, --help                 output usage information
    -V, --version              output the version number
    -p, --previous <revision>  Include commits after a certain revision
    -c, --current <revision>   Include commits for a certain revision
    -s, --sort <by>            Sort by commits, added, deleted, sum or diff [sum]
    -o, --output <type>        Output type
    -n, --names                Use both email and name to identify contributors
```

The `[path]` will default to the current working directory.

The `--previous` and `--current` options are used as [revision range](https://git-scm.com/docs/gitrevisions#_specifying_ranges) for [git log](https://git-scm.com/docs/git-log) as such:

```
git log --numstat --no-merges --pretty="<COMMIT>%aN<FIELD>%aE<FIELD>%s<FIELD>" <previous>..<current>
```

You can leave out `--current` (which will also remove `..`) and only use `--previous` to set any range you'd like.	

## Module API

The CLI uses the module API which you can also use directly as:

```
var heroes = require('git-heroes');

heroes(opts, callback);
```

## Issues

Please report issues and features requests in the repo's [issue tracker](https://github.com/fokkezb/git-heroes/issues).

## License

Distributed under [MIT License](LICENSE).