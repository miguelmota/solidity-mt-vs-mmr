const crypto = require('crypto')
const { expect } = require('chai')
const { MerkleTree } = require('merkletreejs')
const { keccak256 } = require('ethereumjs-util')

describe('Test', function () {
  const maxItems = 100

  it('MerkleTree', async function () {
    const Example = await ethers.getContractFactory('MTExample')
    const example = await Example.deploy()
    await example.deployed()

    const hashes = []
    let total = 0

    for (let i = 0; i < maxItems; i++) {
      const hash = randomBytes32()
      const tx = await example.append(hash)
      const receipt = await tx.wait()
      console.log('append gas used:', i, receipt.gasUsed.toString())
      total += Number(receipt.gasUsed.toString())
      hashes.push(hash)
    }

    const tx = await example.commit()
    const receipt = await tx.wait()
    total += Number(receipt.gasUsed.toString())
    console.log('commit gas used:', receipt.gasUsed.toString())
    console.log('total append gas used:', total)

    const tree = new MerkleTree(hashes, keccak256, { fillDefaultHash: keccak256(Buffer.alloc(32)) })
    const index = 2
    const leaf = hashes[index]
    const proof = tree.getHexProof(leaf)
    const root = await example.rootHash()
    const totalLeaves = hashes.length
    const verified = await example.verify(root, leaf, index, proof, totalLeaves)
    expect(verified).to.be.equal(true)
    console.log('proof verification gas:', receipt.gasUsed.toString())
  }, 300 * 1000)

  it('MerkleMountainRange', async function () {
    const MMR = await ethers.getContractFactory('MMR')
    const mmr = await MMR.deploy()
    const Example = await ethers.getContractFactory('MMRExample', {
      libraries: {
        MMR: mmr.address
      }
    })
    const example = await Example.deploy()
    await example.deployed()
    const hashes = []
    let total = 0

    for (let i = 0; i < maxItems; i++) {
      const hash = randomBytes32()
      const tx = await example.append(hash)
      const receipt = await tx.wait()
      console.log('append gas used:', i, receipt.gasUsed.toString())
      total += Number(receipt.gasUsed.toString())
      hashes.push(hash)
    }

    const tx = await example.commit()
    const receipt = await tx.wait()
    total += Number(receipt.gasUsed.toString())
    console.log('commit gas used:', receipt.gasUsed.toString())
    console.log('total append gas used:', total)

    const index = 2
    const leaf = hashes[index - 1]
    const proof = await example.getMerkleProof(index)
    const verified = await example.verify(proof.root, proof.width, index, leaf, proof.peakBagging, proof.siblings)
    expect(verified).to.be.equal(true)
    console.log('proof verification gas:', receipt.gasUsed.toString())
  }, 300 * 1000)
})

function randomBytes (byteLength) {
  return crypto.randomBytes(byteLength)
}

function randomBytes32 () {
  return '0x' + randomBytes(32).toString('hex')
}
