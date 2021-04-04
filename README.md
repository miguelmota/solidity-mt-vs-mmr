# Solidity Merkle Tree vs Merkle Mountain Range Tree

> Solidity example comparing Merkle Tree vs [Merkle Mountain Range](https://github.com/opentimestamps/opentimestamps-server/blob/ac67218c3d45a93519bea0ec151b1e3629f87bd5/doc/merkle-mountain-range.md) tree gas usage.

## Build

```bash
npm run build
```

## Test

```bash
npm test
```

Output:

```bash
  Test
append gas used: 0 62737
append gas used: 1 47749
append gas used: 2 47749
[...]
append gas used: 97 47737
append gas used: 98 47749
append gas used: 99 47749
total append gas used: 4789660
commit gas used: 165686
proof verification gas: 51394
    ✓ MerkleTree (2279ms)

append gas used: 0 161462
append gas used: 1 143226
append gas used: 2 120016
[...]
append gas used: 97 153076
append gas used: 98 128382
append gas used: 99 181064
total append gas used: 15233642
commit gas used: 42050
proof verification gas: 93479
    ✓ MerkleMountainRange (3849ms)

  2 passing (6s)
```

## License

[MIT](LICENSE)
