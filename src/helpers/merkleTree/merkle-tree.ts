import { ethers } from 'ethers';
import { Delegate } from 'src/staking/types/staking.types.Delegate';
import { Participation } from 'src/staking/types/staking.types.Participation';

export class MerkleTree {
  private elements = [];
  private layers;

  constructor() {}

  private generateTree(elements) {
    this.elements = elements;
    this.elements.sort();

    this.layers = MerkleTree.getLayers(this.elements);
  }

  createParticipationTree(inputEntries: string | Participation[], delegates: Delegate[]) {
    let entries = (typeof inputEntries == "string") ? JSON.parse(inputEntries) : inputEntries;

    let mappedDelegates = {};
    delegates.forEach(entry => {
      mappedDelegates[entry.delegate] = entry.delegator;
    });

    let mappedEntries = {};
    entries.forEach(entry => {
      mappedEntries[entry.address] = entry;
    });

    Object.keys(mappedDelegates).forEach(delegate_address => {
      if(mappedEntries[delegate_address].participation == 1) {
        mappedEntries[mappedDelegates[delegate_address]].participation = 1;
        mappedEntries[mappedDelegates[delegate_address]].delegatedTo = delegate_address;
        mappedEntries[mappedDelegates[delegate_address]].votes = mappedEntries[delegate_address].votes;
      }
    });

    entries = Object.keys(mappedEntries).map(key => mappedEntries[key]);

    let entriesWithLeafs = entries.map((entry) => {
      const entryWithLeaf = {
        ...entry,
        leaf: hashEntry(entry),
      };
  
      return entryWithLeaf;
    });

    this.generateTree(entriesWithLeafs.map((entry) => entry.leaf));

    entriesWithLeafs = entriesWithLeafs.map((entry) => {
      const entryWithLeaf = {
        ...entry,
        proof: this.getProof(entry.leaf),
      };
  
      return entryWithLeaf;
    });

    return {
      elements: this.elements, 
      layers: this.layers,
      leafs: entriesWithLeafs,
      root: this.getRoot()
    };
  };  

  static getLayers(elements) {
    if (elements.length === 0) {
      return [['']];
    }

    const layers = [];
    layers.push(elements);

    // Get next layer until we reach the root
    while (layers[layers.length - 1].length > 1) {
      layers.push(MerkleTree.getNextLayer(layers[layers.length - 1]));
    }

    return layers;
  }

  static getNextLayer(elements) {
    return elements.reduce((layer, el, idx, arr) => {
      if (idx % 2 === 0) {
        // Hash the current element with its pair element
        layer.push(MerkleTree.combinedHash(el, arr[idx + 1]));
      }

      return layer;
    }, []);
  }

  static combinedHash(first, second) {
    if (!first) {
      return second;
    }
    if (!second) {
      return first;
    }

    return ethers.utils.solidityKeccak256(['bytes32', 'bytes32'], [first, second].sort());
  }

  getRoot() {
    return this.layers[this.layers.length - 1][0];
  }

  getProof(el) {
    let idx = MerkleTree.bufIndexOf(el, this.elements);

    if (idx === -1) {
      throw new Error('Element does not exist in Merkle tree');
    }

    return this.layers.reduce((proof, layer) => {
      const pairElement = MerkleTree.getPairElement(idx, layer);

      if (pairElement) {
        proof.push(pairElement);
      }

      idx = Math.floor(idx / 2);

      return proof;
    }, []);
  }

  static getPairElement(idx, layer) {
    const pairIdx = idx % 2 === 0 ? idx + 1 : idx - 1;

    if (pairIdx < layer.length) {
      return layer[pairIdx];
    }

    return null;
  }

  static bufIndexOf(el, arr) {
    const hash = el;

    for (let i = 0; i < arr.length; i += 1) {
      if (hash === arr[i]) {
        return i;
      }
    }

    return -1;
  }
}

const hashEntry = (entry) => ethers.utils.solidityKeccak256(['address', 'uint256'], [entry.address, entry.participation]);