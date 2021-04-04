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

```
  Test
append gas used: 0 62749
append gas used: 1 47749
append gas used: 2 47749
append gas used: 3 47749
[...]
append gas used: 97 47749
append gas used: 98 47749
append gas used: 99 47749
commit gas used: 165686
total append gas used: 4955490
proof verification gas: 165686
    ✓ MerkleTree (2234ms)

append gas used: 0 161462
append gas used: 1 143226
append gas used: 2 120016
append gas used: 3 170149
[...]
append gas used: 97 153076
append gas used: 98 128382
append gas used: 99 181064
commit gas used: 42050
total append gas used: 15275716
proof verification gas: 42050
    ✓ MerkleMountainRange (3814ms)

  2 passing (6s)
```

## License

[MIT](LICENSE)
