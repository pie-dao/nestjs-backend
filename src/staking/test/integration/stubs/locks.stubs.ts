const locks = [
    {
        "amount": "10000000000000000000000",
        "id": "0x3c341129dac2096b88945a8985f0ada799abf8c9_0", // alice
        "lockDuration": "15768000",
        "lockId": "0",
        "lockedAt": "1610668800",
        "staker": {
        "accountVeTokenBalance": "833333333300000000000",
        "accountWithdrawableRewards": "0",
        "accountWithdrawnRewards": "0",
        "id": "0x3c341129dac2096b88945a8985f0ada799abf8c9"
        },
        "withdrawn": false
    },
    {
        "amount": "10000000000000000000000",
        "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e_0", // tom
        "lockDuration": "31536000",
        "lockId": "0",
        "lockedAt": "1610668800",
        "staker": {
        "accountVeTokenBalance": "2311421345000000000000",
        "accountWithdrawableRewards": "0",
        "accountWithdrawnRewards": "0",
        "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e"
        },
        "withdrawn": false
    },
    {
        "amount": "10000000000000000000000",
        "id": "0xabf26352aadaaa1cabffb3a55e378bac6bf15791_0", // ray
        "lockDuration": "94608000",
        "lockId": "0",
        "lockedAt": "1610668800",
        "staker": {
        "accountVeTokenBalance": "10000000000000000000000",
        "accountWithdrawableRewards": "0",
        "accountWithdrawnRewards": "0",
        "id": "0xabf26352aadaaa1cabffb3a55e378bac6bf15791"
        },
        "withdrawn": false
    }
]

export const LocksStub = (): Array<any> => {
    // returning all locks...
    return locks;
}