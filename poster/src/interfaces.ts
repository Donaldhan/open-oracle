//
// --- open oracle interfaces ---
//

// In the view, there is a function that will write message values to the
// the open oracle data contract if the posted values are more valid
// ( e.g. later timestamp ) than what already is in the data contract.
//
// The view will also write to it's own storage cache an aggregated value
// based on the state of data contract.
//
// The provided abi for an instance of the OpenOracleView must contain this
// function.
interface OpenOracleView {
  methods: {
    [key: string]: (OpenOraclePayload) => {send: ContractInteraction}
  }
};

// A payload for an open oracle view comprises 2 fields:
//  1. Abi encoded values to be written to the open oracle data contract
//  2. The attestor's signature on a hash of that message
interface OpenOraclePayload {
  // ABI encoded values to be written to the open oracle data contract.
  message: string,
  // The signature of the attestor to these values. The values in 'message'
  // will be stored in a mapping under this signer's public address.
  signature: string
};

//
// ---- web3 interfaces ----
//

interface ContractMethod {
  send: (TrxInfo) => Promise<TrxResult>;
}

// options for "send"
interface TrxInfo {
  from: string;
  gas: number;
  gasPrice: number;
  [param: string]: any;
}

// The transaction receipt returned by myContract.myMethod.send promise,
// indicating the transaction has been successfully mined.
// https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html?highlight=send#contract-events-return
interface TrxReceipt {
  transactionHash: string,
  events: {
    [event: string]: Event
  }
}

interface IO {
  name: string,
  type: string
}

interface ABI {
  constant: boolean,
  inputs: Array<IO>,
  name: string,
  outputs: Array<IO>,
  payable: boolean,
  stateMutability: string,
  type: string
}
