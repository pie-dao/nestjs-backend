import { EpochEntity } from "src/staking/entities/epoch.entity";

const epochs = [
  {
    "_id": "6135d7fa85204887d11967b5",
    "proposals": [
    "QmSPg29Rgqkx95tioYew13q5FYekiNNMMbPhZ8hTPC3ERK",
    "QmSbx636cXdGYYKXLnHHb3TGdgUJMt3Nd6TXVMDpTaXxEW",
    "QmWw21mShD2EPtWd9tzy7ZFrz9pLVwTHsBmnrNbQ1mcJ42",
    "QmYYo1CWXBtasWCNK1Qgb2XWno7acUzJCkdP6vEA7oNwEE"
    ],
    "participants": [
    "0x00ba3ca0b6df1486c912893d9f288311a60ed753",
    "0x00c67d9d6d3d13b42a87424e145826c467cccd84",
    "0x01e6fd0ae73d9194b19f9b376065577927a0d5f5",
    "0x0430605323465e26dc21fbaaa9a1a4be6ae9d496",
    "0x0be93c61df823779e7cc50d1430f6e0c44b14fe3",
    "0x1108f73da69ef5b64b2410ee9beaae2abb2fa10e",
    "0x1146f36cf74fbb2971dcda652d0a3f4289a39d53",
    "0x1222be133aeb970ab159571dad7be5ad1798fe54",
    "0x128e5625e15fdba91d6ccb1abdfdc62b5d152b4f",
    "0x14df40586e0f2ca5ca222db0dac8df2f4c5b1aab",
    "0x16765c8fe6eb838cb8f64e425b6dccab38d4f102",
    "0x1754352eacb753327fec2d4f48f0fb36b672c5e0",
    "0x1ae6912e08bb3e105a4f0a60f666376d3c7af380",
    "0x1c85d6ae1336d0e4e3f165bbfa9641bfa04cedb1",
    "0x1f2f30b6a37d0d0531820fc5a0ad83d5a3515b37",
    "0x1f540e4d3211d393c31fa343cffd080d9b11b29e",
    "0x201d86dd1604c513f0681dca00a459baec7342ec",
    "0x24febab9e9d2af77ef5d6488bd8c2cbf54d3d25e",
    "0x2b285e1b49ba0cb6f71d8b0d9cafdfbf9868fda9",
    "0x2d2e31965cc5d89dfa0684079b4730800c36e993",
    "0x2e6a4c895e3a466f86cc00d9f8b33a1eece3fc5a",
    "0x3006ef6777ccc79c3af305101fe0b3d14bd47b59",
    "0x30fe0d8d2d81ea568ff60b6e28ab74eb7e548cb0",
    "0x316b98c6df382bd218186d0766966459a199dd04",
    "0x32f41b50f8d569f22dffedc0f17210fb49350784",
    "0x34744dd0fb927366228a2eaee0d142620ff26077",
    "0x34f2ac0dd90b768b382e981e50312333a7a1a69d",
    "0x38daea6f17e4308b0da9647db9ca6d84a3a7e195",
    "0x3c7d5bb537abae440e0abe552342f422a4b1e6c1",
    "0x3e8c921be392bf856b1eedc243f41fdbf2cd3739",
    "0x41587094c1ba4463e29e772ae03bf9a132e8809c",
    "0x454a5a7f6377c4ecb73492e25e3c9bccfc1f3aee",
    "0x45feb4865f00e359156a4f873c9eef893b4191e7",
    "0x477c8ece9393713d258169aa50cdaf27e422214d",
    "0x4929f4d38f2955649b5aa34343da04cf790b9d92",
    "0x4e0e75808d68c0a198e504b46f87d6853bbbf0e6",
    "0x4e4842749e799b384601489f1653213d86c31e1b",
    "0x4e7a35e672256f854d4e0a8851cd7965b8b53d67",
    "0x519a0df0bd2b586b6f7126799c30a243e13abcbe",
    "0x52876dafdc67238390477bb2403bdc8021944ddc",
    "0x58e603d9824976f7a3940c6b408f0ffa523a216c",
    "0x599aed04e8bceb618ee7bba2a748fc1f1aed2d57",
    "0x59ab3cb9ca8b7910ba2d137a138b69bbf85bdf28",
    "0x5a27d268e830655e908a0a2c3b24f572695af5e8",
    "0x5b0d3243c78fb9d4ac035fb2384ffdf7a9ef6396",
    "0x603735b838d6bb5221a57f40ee6b11ac59bccdb3",
    "0x62661b101ca48734668669a9f1cb83c4889049f3",
    "0x64b7fcc8c17540139bdd84d00c7261035602cb66",
    "0x655c7eadf9360603cb5077d8dc57fa07bcf61d55",
    "0x66300889afb808626498c28e3811bb9b06a014ad",
    "0x66d0e180af64fb368679f91765affc99174396ac",
    "0x6c7c3806b3cae601b1d99c017e4592753ba8d41e",
    "0x6d366f344adaa242e92ad41efb355cec06a6dcd5",
    "0x72b223de2f773c814465c4a8f2ef9faae702cfb3",
    "0x74c4623d7609f3eb2665ad32ff96b44856b6051b",
    "0x750a31fa07184caf87b6cce251d2f0d7928badde",
    "0x75f03bcf0e56b7de72ed26585caee949f0d5bf1a",
    "0x7689f17560b5ee53799f0b37c975927e1258fbb5",
    "0x7763d4ce482c35b59aa0fc48ae2eabd00f60b82e",
    "0x7880c064c12b8868405be6e6b9c89b757d0969b6",
    "0x7a7a5fad8c4107ed0959191e7ff36ba82d4ea2f9",
    "0x7c2848826de6ba917fdca23ccf5c2c3e1cb031f6",
    "0x7cbe38b967131189cfc4e68bc96c7a4e44bd0783",
    "0x7dd508a1e4da1243789b799a480f8b45e58b1b5b",
    "0x7de12798caabc4a73f7750729ad851b027868a0c",
    "0x8061199a31983a077e691c08b2263a4cf5c24093",
    "0x8255eb729cc7b472ddae4cfcf4b68d700e3e5cde",
    "0x82703281e7ff09cd2492ddb6b8c5fa645efda819",
    "0x83111e1888c1e49e8703e248edeaa34ef868a1de",
    "0x84bcfa8fe160b271dc49b1fb263ad995e0c2c1df",
    "0x887c3599c4826f7b3cde82003b894430f27d5b92",
    "0x8abaf5733742b1506f6a1255de0e37aec76b7940",
    "0x8bca9f3016a33b1e34135d5f536e46ed541f1a28",
    "0x8bfd3c3fc34f068c66796880756cc93ffdc6d080",
    "0x8d07d225a769b7af3a923481e1fdf49180e6a265",
    "0x8da412696b0aa7785a109512a4c7a5d1bc8eb223",
    "0x8e2540edfa7410b6f32f54d4cbf715acfe2f2e5b",
    "0x8f9f865aafd6487c7ac45a22bbb9278f8fc06d47",
    "0x91b26b4b49525fdffff2b099190149a52a36c3ca",
    "0x9562339b4f94b28613ada8ad35e698d96c44fcea",
    "0x964ca78fa3ab137e5ba050dd2c3531b629374a39",
    "0x98026cce01f9a30a7d645f5a9fcdcd7f83dfa995",
    "0x9f4e48f77194c0c4903ba5486e84a28f65f483c2",
    "0x9ffd0a5b5438b95861167422e745d34d151bcc3b",
    "0xa479ff23cbc4e9d1fa2ae4fbb36645de2ba36764",
    "0xa742a54e0b9cd1cac03c8f569ba4c606694261f9",
    "0xa972691ef44eb3bad4a015399ba43a00ead047f8",
    "0xaa1a54bfa93be8ac8d01182827433f227ba59e17",
    "0xabf26352aadaaa1cabffb3a55e378bac6bf15791",
    "0xac3c2f091edea973f666173b3ebd242a80fe411c",
    "0xac9283ebcd0c41faa7a5399ad94acc444954b446",
    "0xb0331b22161ca290a15f825a29c008dcb5e1ff68",
    "0xb6bc98f5d7f6ce3c0946f7675128ab673e6c5d41",
    "0xb6fca91d1c166564cc9888f96b3b553f42c96349",
    "0xbd1f7d88c76a86c60d41bddd4819fae404e7151e",
    "0xbf656e5ed6e5ea776440ab99eb4832ca7e410ba7",
    "0xbf760fd4535fb211e5c6881b28283b60d1a059bf",
    "0xc07ef9fda2d42a7757172f6a7cda2a63599591ed",
    "0xc2478f44503776569334eb05083111d60d39349c",
    "0xc6c6b53c67ad86302d501f3e8623cf98f6291f6d",
    "0xc9153d97b103f6df5fbd8239be4f036a2734a46e",
    "0xc96265c36f6d77747f9c259946a1ef55fce946b7",
    "0xcc8714ef555346c73bc02367923c490a53170e04",
    "0xce3a7d19b8e3b221d8b7b8730a016b9516384e3d",
    "0xd0190738c574436f994e436de438a55c4ac7a454",
    "0xd1b572f9528b70df1ea79456edc8250125f2d6bb",
    "0xd39ce81ce8e7243494d4149d05dddd536ddc2e55",
    "0xdac7a91516112703448b5d1fbc8b679fce838e8a",
    "0xdc6ce98a9020905973c9c026c6f3e34df9998d8a",
    "0xdccc5094404422cd48cd7afa95b618fe0cd3d0fe",
    "0xdfe7ad3e0cc6fb0798e66c67c72927c49fc42478",
    "0xe307e911991ed5df44920e648245c49573e6f779",
    "0xe47ed204b63adfb80c90082c088fc2a430f9a558",
    "0xe7e1482febff6b4e18e6f061804e8b8228b429d8",
    "0xedc8501c9f4173e2a76bff49c0b571f14903a7e7",
    "0xf35db530c0416106b749c301176155c04e3c684d",
    "0xf3dd72ac3c9833574491861793e8ffe1f07c8905",
    "0xf53ad4999769c358f7bec7deefbe3c656d94feea",
    "0xf76604ce7e7f0134a5310bcfc9c34caeddf15873",
    "0xfb0cc36f27a28cc19c86c156091e2bee7b2f6b69",
    "0xfb9e5f5874565a6ef8fcf1debc4975501331a8ca",
    "0xfbf647339760843ecf09f1ee4f914e65bf6d5c84",
    "0xfdd6af85172a18a02651e63929ff2f46e4714156",
    "0xfed44bdb527937faba325aa894b3cdd61956f569",
    "0xff5028af88046c811964a3e8136bf9ad470cc782"
    ],
    "startDate": 1628240233224,
    "endDate": 1630918633224,
    "startBlock": 12970475,
    "endBlock": 13171232,
    "merkleTree": {
    "elements": [
    "0x30fa2548da7765171a31929b719b6eaa41ee82302e721bea779be4a377be3a2a",
    "0x5bb4976c8976653c37f1b60d85707a27390fa243a83148cf7f70fb5b7e3fd48e",
    "0x63aa17553ed27b5535759d550ebe046268ca2579bce2cebd85ad3adf9f01270b",
    "0x8fb5631245b6d0aa2eb8dad8b6ec2c766cc227e22c1691cc5a09b77c9146e028",
    "0x95707c19e80ff95eacfe466b7193c590288d8a7e598cfb20eac4771229046516",
    "0x96cacbfd1c62bbb30092901328c816991f38fdfd46bc6c9543c37e4ac5d662f3",
    "0x9d1165196932daa7779a0a3d5a0aea21400d58ba34ccec30a3a2117140111a25",
    "0xb5170bac6827ca2b82934888d528533829568933fddbc3f02b0345b9378839ab",
    "0xccf4345208a217faccca6d9132effa531cbb9cce16ab196395b8d9d1da4ff7a6",
    "0xf473f2a6acb3cd16b6bf5643eb4277aa174029f95ccfa0b623d084e32b0b3083",
    "0xf6a10d9b9339d775308947c539173b11cf25368931eb8e4139a90f9c0fddf471"
    ],
    "layers": [
    [
    "0x30fa2548da7765171a31929b719b6eaa41ee82302e721bea779be4a377be3a2a",
    "0x5bb4976c8976653c37f1b60d85707a27390fa243a83148cf7f70fb5b7e3fd48e",
    "0x63aa17553ed27b5535759d550ebe046268ca2579bce2cebd85ad3adf9f01270b",
    "0x8fb5631245b6d0aa2eb8dad8b6ec2c766cc227e22c1691cc5a09b77c9146e028",
    "0x95707c19e80ff95eacfe466b7193c590288d8a7e598cfb20eac4771229046516",
    "0x96cacbfd1c62bbb30092901328c816991f38fdfd46bc6c9543c37e4ac5d662f3",
    "0x9d1165196932daa7779a0a3d5a0aea21400d58ba34ccec30a3a2117140111a25",
    "0xb5170bac6827ca2b82934888d528533829568933fddbc3f02b0345b9378839ab",
    "0xccf4345208a217faccca6d9132effa531cbb9cce16ab196395b8d9d1da4ff7a6",
    "0xf473f2a6acb3cd16b6bf5643eb4277aa174029f95ccfa0b623d084e32b0b3083",
    "0xf6a10d9b9339d775308947c539173b11cf25368931eb8e4139a90f9c0fddf471"
    ],
    [
    "0x9d4b2fa24366c412bfc7ddd328c87ad2c8e987c56dd74894ea9fc309a0687659",
    "0x3772d5a32883bb57041bc381ee90a2ddffc624cb9b06f432eea82c763fdedaa1",
    "0x20e6193165592ff8c65cf4fc4130e1444d204df6f27a63745db7b7a73af34981",
    "0x3fd2424b8fb973bf831d842a09cf043e12f92215888e6cb97f4e0a82d57c0622",
    "0x7c5f7458fecc01dee1e46d2acb9d7f63b540b8e2b504c08687dc7bb442232ee9",
    "0xf6a10d9b9339d775308947c539173b11cf25368931eb8e4139a90f9c0fddf471"
    ],
    [
    "0xa4933e7d3ec14b4d84f60ef7b606cc00f6e93b59d8093afe6ce3f5f5218be91c",
    "0xa368395d8447cd911e688c6602037f73a9508b2e872ba93b51d44d9e32d9302f",
    "0x87e74fabe19279391fe3a93e96e3862f86f3d67276b118e182d76687534136fc"
    ],
    [
    "0x6efbfc38cf838bc672d3329ff407d4f487f4b716be45f9f60e894fcdb4b03bcc",
    "0x87e74fabe19279391fe3a93e96e3862f86f3d67276b118e182d76687534136fc"
    ],
    [
    "0x0e5a0ea3a8369f1b976957d699d13b057b6c9fc5077984e4e595da4ea825d967"
    ]
    ],
    "leafs": [
    {
    "address": "0x1a1087bf077f74fb21fd838a8a25cf9fe0818450",
    "participation": 0,
    "staker": {
    "accountLocks": [],
    "accountRewards": [],
    "accountVeTokenBalance": "0",
    "accountWithdrawableRewards": "0",
    "accountWithdrawnRewards": "0",
    "id": "0x1a1087bf077f74fb21fd838a8a25cf9fe0818450"
    },
    "votes": [],
    "leaf": "0xf473f2a6acb3cd16b6bf5643eb4277aa174029f95ccfa0b623d084e32b0b3083"
    },
    {
    "address": "0x1fdca2162eefb7ad400ed3d6627ac9c63dad55a1",
    "participation": 0,
    "staker": {
    "accountLocks": [],
    "accountRewards": [],
    "accountVeTokenBalance": "0",
    "accountWithdrawableRewards": "0",
    "accountWithdrawnRewards": "0",
    "id": "0x1fdca2162eefb7ad400ed3d6627ac9c63dad55a1"
    },
    "votes": [],
    "leaf": "0x5bb4976c8976653c37f1b60d85707a27390fa243a83148cf7f70fb5b7e3fd48e"
    },
    {
    "address": "0x3c341129dac2096b88945a8985f0ada799abf8c9",
    "participation": 0,
    "staker": {
    "accountLocks": [
    {
    "amount": "1000000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0x3c341129dac2096b88945a8985f0ada799abf8c9_0",
    "lockDuration": "360",
    "lockId": "0",
    "lockedAt": "1627391759",
    "withdrawn": false
    },
    {
    "amount": "1000000000000000000000",
    "boosted": true,
    "ejected": false,
    "id": "0x3c341129dac2096b88945a8985f0ada799abf8c9_1",
    "lockDuration": "360",
    "lockId": "1",
    "lockedAt": "1627391879",
    "withdrawn": false
    }
    ],
    "accountRewards": [
    {
    "amount": "100000000000000000000000000000000",
    "id": "0xa529241f69b90dba9e46714ad134cbaf2f57d04e25ebb164aba753fafef941c7",
    "timestamp": "1627392630",
    "type": "distributed"
    }
    ],
    "accountVeTokenBalance": "1000000000000000000000",
    "accountWithdrawableRewards": "21245161841737910945328838654322",
    "accountWithdrawnRewards": "0",
    "id": "0x3c341129dac2096b88945a8985f0ada799abf8c9"
    },
    "votes": [],
    "leaf": "0xb5170bac6827ca2b82934888d528533829568933fddbc3f02b0345b9378839ab"
    },
    {
    "address": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e",
    "participation": 0,
    "staker": {
    "accountLocks": [
    {
    "amount": "100000000000000000000",
    "boosted": false,
    "ejected": true,
    "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e_0",
    "lockDuration": "2160",
    "lockId": "0",
    "lockedAt": "1626863490",
    "withdrawn": false
    },
    {
    "amount": "50000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e_1",
    "lockDuration": "720",
    "lockId": "1",
    "lockedAt": "1626866790",
    "withdrawn": false
    },
    {
    "amount": "10000000000000000000",
    "boosted": true,
    "ejected": false,
    "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e_10",
    "lockDuration": "2160",
    "lockId": "10",
    "lockedAt": "1627392720",
    "withdrawn": true
    },
    {
    "amount": "1234000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e_11",
    "lockDuration": "1440",
    "lockId": "11",
    "lockedAt": "1627574451",
    "withdrawn": true
    },
    {
    "amount": "111000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e_12",
    "lockDuration": "2160",
    "lockId": "12",
    "lockedAt": "1629469230",
    "withdrawn": true
    },
    {
    "amount": "222000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e_13",
    "lockDuration": "2160",
    "lockId": "13",
    "lockedAt": "1629470310",
    "withdrawn": true
    },
    {
    "amount": "4321000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e_14",
    "lockDuration": "2160",
    "lockId": "14",
    "lockedAt": "1629704798",
    "withdrawn": false
    },
    {
    "amount": "333000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e_15",
    "lockDuration": "2160",
    "lockId": "15",
    "lockedAt": "1629712966",
    "withdrawn": true
    },
    {
    "amount": "222000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e_16",
    "lockDuration": "2160",
    "lockId": "16",
    "lockedAt": "1629713162",
    "withdrawn": true
    },
    {
    "amount": "4321000000000000000000",
    "boosted": true,
    "ejected": false,
    "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e_17",
    "lockDuration": "2160",
    "lockId": "17",
    "lockedAt": "1629733429",
    "withdrawn": true
    },
    {
    "amount": "123000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e_18",
    "lockDuration": "720",
    "lockId": "18",
    "lockedAt": "1629798670",
    "withdrawn": false
    },
    {
    "amount": "123000000000000000000",
    "boosted": true,
    "ejected": false,
    "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e_19",
    "lockDuration": "720",
    "lockId": "19",
    "lockedAt": "1629798805",
    "withdrawn": true
    },
    {
    "amount": "10000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e_2",
    "lockDuration": "360",
    "lockId": "2",
    "lockedAt": "1626866835",
    "withdrawn": true
    },
    {
    "amount": "456000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e_20",
    "lockDuration": "1440",
    "lockId": "20",
    "lockedAt": "1629807606",
    "withdrawn": false
    },
    {
    "amount": "456000000000000000000",
    "boosted": true,
    "ejected": false,
    "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e_21",
    "lockDuration": "1440",
    "lockId": "21",
    "lockedAt": "1629807982",
    "withdrawn": false
    },
    {
    "amount": "111000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e_22",
    "lockDuration": "720",
    "lockId": "22",
    "lockedAt": "1629808132",
    "withdrawn": false
    },
    {
    "amount": "111000000000000000000",
    "boosted": true,
    "ejected": false,
    "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e_23",
    "lockDuration": "720",
    "lockId": "23",
    "lockedAt": "1629808252",
    "withdrawn": false
    },
    {
    "amount": "777000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e_24",
    "lockDuration": "720",
    "lockId": "24",
    "lockedAt": "1629808327",
    "withdrawn": false
    },
    {
    "amount": "777000000000000000000",
    "boosted": true,
    "ejected": false,
    "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e_25",
    "lockDuration": "720",
    "lockId": "25",
    "lockedAt": "1629808432",
    "withdrawn": false
    },
    {
    "amount": "666000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e_26",
    "lockDuration": "360",
    "lockId": "26",
    "lockedAt": "1629809737",
    "withdrawn": false
    },
    {
    "amount": "666000000000000000000",
    "boosted": true,
    "ejected": false,
    "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e_27",
    "lockDuration": "360",
    "lockId": "27",
    "lockedAt": "1629809857",
    "withdrawn": false
    },
    {
    "amount": "444000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e_28",
    "lockDuration": "840",
    "lockId": "28",
    "lockedAt": "1629809932",
    "withdrawn": false
    },
    {
    "amount": "444000000000000000000",
    "boosted": true,
    "ejected": false,
    "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e_29",
    "lockDuration": "840",
    "lockId": "29",
    "lockedAt": "1629809977",
    "withdrawn": false
    },
    {
    "amount": "50000000000000000000",
    "boosted": true,
    "ejected": false,
    "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e_3",
    "lockDuration": "720",
    "lockId": "3",
    "lockedAt": "1626873180",
    "withdrawn": true
    },
    {
    "amount": "333000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e_30",
    "lockDuration": "720",
    "lockId": "30",
    "lockedAt": "1629810022",
    "withdrawn": false
    },
    {
    "amount": "333000000000000000000",
    "boosted": true,
    "ejected": false,
    "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e_31",
    "lockDuration": "720",
    "lockId": "31",
    "lockedAt": "1629810082",
    "withdrawn": false
    },
    {
    "amount": "111000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e_32",
    "lockDuration": "720",
    "lockId": "32",
    "lockedAt": "1629810172",
    "withdrawn": false
    },
    {
    "amount": "111000000000000000000",
    "boosted": true,
    "ejected": false,
    "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e_33",
    "lockDuration": "720",
    "lockId": "33",
    "lockedAt": "1629810232",
    "withdrawn": false
    },
    {
    "amount": "88000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e_34",
    "lockDuration": "720",
    "lockId": "34",
    "lockedAt": "1629811253",
    "withdrawn": false
    },
    {
    "amount": "77000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e_35",
    "lockDuration": "720",
    "lockId": "35",
    "lockedAt": "1629811388",
    "withdrawn": false
    },
    {
    "amount": "66000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e_36",
    "lockDuration": "720",
    "lockId": "36",
    "lockedAt": "1629811493",
    "withdrawn": false
    },
    {
    "amount": "55000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e_37",
    "lockDuration": "780",
    "lockId": "37",
    "lockedAt": "1629811658",
    "withdrawn": false
    },
    {
    "amount": "22000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e_38",
    "lockDuration": "1320",
    "lockId": "38",
    "lockedAt": "1629811868",
    "withdrawn": false
    },
    {
    "amount": "11000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e_39",
    "lockDuration": "660",
    "lockId": "39",
    "lockedAt": "1629812063",
    "withdrawn": false
    },
    {
    "amount": "10000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e_4",
    "lockDuration": "2160",
    "lockId": "4",
    "lockedAt": "1627307435",
    "withdrawn": false
    },
    {
    "amount": "55000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e_40",
    "lockDuration": "540",
    "lockId": "40",
    "lockedAt": "1629812288",
    "withdrawn": false
    },
    {
    "amount": "11000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e_41",
    "lockDuration": "660",
    "lockId": "41",
    "lockedAt": "1629887874",
    "withdrawn": false
    },
    {
    "amount": "1234000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e_5",
    "lockDuration": "2160",
    "lockId": "5",
    "lockedAt": "1627307495",
    "withdrawn": true
    },
    {
    "amount": "222000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e_6",
    "lockDuration": "2160",
    "lockId": "6",
    "lockedAt": "1627307585",
    "withdrawn": true
    },
    {
    "amount": "555000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e_7",
    "lockDuration": "2160",
    "lockId": "7",
    "lockedAt": "1627307750",
    "withdrawn": true
    },
    {
    "amount": "555000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e_8",
    "lockDuration": "2160",
    "lockId": "8",
    "lockedAt": "1627307780",
    "withdrawn": true
    },
    {
    "amount": "333000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e_9",
    "lockDuration": "2160",
    "lockId": "9",
    "lockedAt": "1627307826",
    "withdrawn": true
    }
    ],
    "accountRewards": [
    {
    "amount": "62882137889106424730239482838677",
    "id": "0x27fb2f54d294193e1fee5cbe07d74ba049a30325a094defbebcec165e64dd4cc",
    "timestamp": "1629887619",
    "type": "claimed"
    },
    {
    "amount": "64513068469411652",
    "id": "0xaf8593da935990386bb6ee0656b04e0732b0c136c59a0a7d418c6d205ac6c860",
    "timestamp": "1627035830",
    "type": "claimed"
    },
    {
    "amount": "1000000000000000000",
    "id": "0xf7bdb68d7b2ef04263c43b06d3934959caa8ccdf0e47fc39d9ff66a6b7fd6386",
    "timestamp": "1627034105",
    "type": "distributed"
    }
    ],
    "accountVeTokenBalance": "2990135393520816800000",
    "accountWithdrawableRewards": "313290257507778003773062",
    "accountWithdrawnRewards": "62882137889106489243307952250329",
    "id": "0x42556f667dfc74704914f98d1e0c0ac4ea2f492e"
    },
    "votes": [],
    "leaf": "0x30fa2548da7765171a31929b719b6eaa41ee82302e721bea779be4a377be3a2a"
    },
    {
    "address": "0x441658de8ebcb25d8d320bd5c1abb314b0ce195e",
    "participation": 0,
    "staker": {
    "accountLocks": [],
    "accountRewards": [],
    "accountVeTokenBalance": "0",
    "accountWithdrawableRewards": "0",
    "accountWithdrawnRewards": "0",
    "id": "0x441658de8ebcb25d8d320bd5c1abb314b0ce195e"
    },
    "votes": [],
    "leaf": "0xf6a10d9b9339d775308947c539173b11cf25368931eb8e4139a90f9c0fddf471"
    },
    {
    "address": "0x64cb372c22dd76d1de5ee817fa49593617a164fa",
    "participation": 0,
    "staker": {
    "accountLocks": [
    {
    "amount": "500000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0x64cb372c22dd76d1de5ee817fa49593617a164fa_0",
    "lockDuration": "2160",
    "lockId": "0",
    "lockedAt": "1630507299",
    "withdrawn": false
    }
    ],
    "accountRewards": [
    {
    "amount": "100000000000000000000000",
    "id": "0x045dfdc162ebc7af5c5d744edcd4c913081a1d4fb7d589b3f6a8b6c4f7c718e9",
    "timestamp": "1630663518",
    "type": "distributed"
    },
    {
    "amount": "100000000000000000000",
    "id": "0x1f488838af375f469235a2c524b6cc50f7746ca89aecd44c8c9f4f50b94be25f",
    "timestamp": "1630663111",
    "type": "distributed"
    },
    {
    "amount": "100000000000000000000000000",
    "id": "0xa6dd5c9641744f1b41682f4ac3fcfc3c0f12e78ea36afe0644889cbcef54f2fb",
    "timestamp": "1630667199",
    "type": "distributed"
    }
    ],
    "accountVeTokenBalance": "500000000000000000000",
    "accountWithdrawableRewards": "52387302960700687708928",
    "accountWithdrawnRewards": "0",
    "id": "0x64cb372c22dd76d1de5ee817fa49593617a164fa"
    },
    "votes": [],
    "leaf": "0xccf4345208a217faccca6d9132effa531cbb9cce16ab196395b8d9d1da4ff7a6"
    },
    {
    "address": "0x7884c447d5cd98e794c1a5c08e3107fbf29b2877",
    "participation": 0,
    "staker": {
    "accountLocks": [],
    "accountRewards": [],
    "accountVeTokenBalance": "0",
    "accountWithdrawableRewards": "0",
    "accountWithdrawnRewards": "0",
    "id": "0x7884c447d5cd98e794c1a5c08e3107fbf29b2877"
    },
    "votes": [],
    "leaf": "0x96cacbfd1c62bbb30092901328c816991f38fdfd46bc6c9543c37e4ac5d662f3"
    },
    {
    "address": "0xabf26352aadaaa1cabffb3a55e378bac6bf15791",
    "participation": 1,
    "staker": {
    "accountLocks": [
    {
    "amount": "10000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0xabf26352aadaaa1cabffb3a55e378bac6bf15791_0",
    "lockDuration": "2160",
    "lockId": "0",
    "lockedAt": "1626867345",
    "withdrawn": false
    },
    {
    "amount": "50000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0xabf26352aadaaa1cabffb3a55e378bac6bf15791_1",
    "lockDuration": "1920",
    "lockId": "1",
    "lockedAt": "1626867390",
    "withdrawn": false
    },
    {
    "amount": "100000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0xabf26352aadaaa1cabffb3a55e378bac6bf15791_2",
    "lockDuration": "1440",
    "lockId": "2",
    "lockedAt": "1626867390",
    "withdrawn": false
    },
    {
    "amount": "300000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0xabf26352aadaaa1cabffb3a55e378bac6bf15791_3",
    "lockDuration": "2160",
    "lockId": "3",
    "lockedAt": "1626867405",
    "withdrawn": false
    },
    {
    "amount": "150000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0xabf26352aadaaa1cabffb3a55e378bac6bf15791_4",
    "lockDuration": "720",
    "lockId": "4",
    "lockedAt": "1626867420",
    "withdrawn": false
    },
    {
    "amount": "50000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0xabf26352aadaaa1cabffb3a55e378bac6bf15791_5",
    "lockDuration": "360",
    "lockId": "5",
    "lockedAt": "1626867435",
    "withdrawn": false
    },
    {
    "amount": "50000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0xabf26352aadaaa1cabffb3a55e378bac6bf15791_6",
    "lockDuration": "480",
    "lockId": "6",
    "lockedAt": "1626867450",
    "withdrawn": false
    },
    {
    "amount": "290000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0xabf26352aadaaa1cabffb3a55e378bac6bf15791_7",
    "lockDuration": "2100",
    "lockId": "7",
    "lockedAt": "1626867495",
    "withdrawn": false
    }
    ],
    "accountRewards": [],
    "accountVeTokenBalance": "737120712867945000000",
    "accountWithdrawableRewards": "15660248843766128563987192692034",
    "accountWithdrawnRewards": "0",
    "id": "0xabf26352aadaaa1cabffb3a55e378bac6bf15791"
    },
    "votes": [
    {
    "id": "Qmdj3ivq3VWG4AySAEyY4kAQD1zijKttX82ns3rJ1Eeq5F",
    "voter": "0xaBf26352aAdAAa1CabFfB3a55e378bac6BF15791",
    "created": 1630599749,
    "proposal": {
    "id": "QmWw21mShD2EPtWd9tzy7ZFrz9pLVwTHsBmnrNbQ1mcJ42"
    },
    "choice": [
    3,
    2,
    5,
    7,
    11,
    9
    ],
    "space": {
    "id": "piedao"
    }
    },
    {
    "id": "QmaRNJzwc9tZikwaZFzrJ3nFFQuoSUkjVU3KdpKMwKe6p3",
    "voter": "0xaBf26352aAdAAa1CabFfB3a55e378bac6BF15791",
    "created": 1630059577,
    "proposal": {
    "id": "QmYYo1CWXBtasWCNK1Qgb2XWno7acUzJCkdP6vEA7oNwEE"
    },
    "choice": 1,
    "space": {
    "id": "piedao"
    }
    },
    {
    "id": "QmcUSGo39zmFwKhbjsSCDyeBMxNkUbJL4SLfKLZmjLut6Q",
    "voter": "0xaBf26352aAdAAa1CabFfB3a55e378bac6BF15791",
    "created": 1629677451,
    "proposal": {
    "id": "QmSbx636cXdGYYKXLnHHb3TGdgUJMt3Nd6TXVMDpTaXxEW"
    },
    "choice": 1,
    "space": {
    "id": "piedao"
    }
    }
    ],
    "leaf": "0x95707c19e80ff95eacfe466b7193c590288d8a7e598cfb20eac4771229046516"
    },
    {
    "address": "0xc96265c36f6d77747f9c259946a1ef55fce946b7",
    "participation": 1,
    "staker": {
    "accountLocks": [
    {
    "amount": "10000000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0xc96265c36f6d77747f9c259946a1ef55fce946b7_0",
    "lockDuration": "2160",
    "lockId": "0",
    "lockedAt": "1629195356",
    "withdrawn": false
    },
    {
    "amount": "3569000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0xc96265c36f6d77747f9c259946a1ef55fce946b7_1",
    "lockDuration": "1020",
    "lockId": "1",
    "lockedAt": "1629206430",
    "withdrawn": false
    },
    {
    "amount": "772990898273800000000",
    "boosted": false,
    "ejected": false,
    "id": "0xc96265c36f6d77747f9c259946a1ef55fce946b7_2",
    "lockDuration": "360",
    "lockId": "2",
    "lockedAt": "1629207992",
    "withdrawn": false
    },
    {
    "amount": "543000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0xc96265c36f6d77747f9c259946a1ef55fce946b7_3",
    "lockDuration": "2160",
    "lockId": "3",
    "lockedAt": "1629280843",
    "withdrawn": false
    },
    {
    "amount": "4000000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0xc96265c36f6d77747f9c259946a1ef55fce946b7_4",
    "lockDuration": "2160",
    "lockId": "4",
    "lockedAt": "1629280888",
    "withdrawn": false
    },
    {
    "amount": "1000000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0xc96265c36f6d77747f9c259946a1ef55fce946b7_5",
    "lockDuration": "2160",
    "lockId": "5",
    "lockedAt": "1629712276",
    "withdrawn": false
    },
    {
    "amount": "7299000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0xc96265c36f6d77747f9c259946a1ef55fce946b7_6",
    "lockDuration": "360",
    "lockId": "6",
    "lockedAt": "1629883816",
    "withdrawn": false
    },
    {
    "amount": "1240000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0xc96265c36f6d77747f9c259946a1ef55fce946b7_7",
    "lockDuration": "540",
    "lockId": "7",
    "lockedAt": "1629884719",
    "withdrawn": false
    },
    {
    "amount": "333000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0xc96265c36f6d77747f9c259946a1ef55fce946b7_8",
    "lockDuration": "720",
    "lockId": "8",
    "lockedAt": "1629885005",
    "withdrawn": false
    },
    {
    "amount": "556000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0xc96265c36f6d77747f9c259946a1ef55fce946b7_9",
    "lockDuration": "2160",
    "lockId": "9",
    "lockedAt": "1629885381",
    "withdrawn": false
    }
    ],
    "accountRewards": [],
    "accountVeTokenBalance": "18371197526438069166970",
    "accountWithdrawableRewards": "1924834981136772422865138",
    "accountWithdrawnRewards": "0",
    "id": "0xc96265c36f6d77747f9c259946a1ef55fce946b7"
    },
    "votes": [
    {
    "id": "QmYLhEBg81eVTD7h7WnBrn8x3XCVe35nrswNWruesT6MJ4",
    "voter": "0xc96265c36F6D77747f9c259946a1eF55FcE946b7",
    "created": 1629536871,
    "proposal": {
    "id": "QmSbx636cXdGYYKXLnHHb3TGdgUJMt3Nd6TXVMDpTaXxEW"
    },
    "choice": 1,
    "space": {
    "id": "piedao"
    }
    },
    {
    "id": "QmUmMZW44iwPQwKkodfsixX1ftV4NPWzk3zYHhmjcdkWuq",
    "voter": "0xc96265c36F6D77747f9c259946a1eF55FcE946b7",
    "created": 1628690656,
    "proposal": {
    "id": "QmSPg29Rgqkx95tioYew13q5FYekiNNMMbPhZ8hTPC3ERK"
    },
    "choice": 1,
    "space": {
    "id": "piedao"
    }
    }
    ],
    "leaf": "0x8fb5631245b6d0aa2eb8dad8b6ec2c766cc227e22c1691cc5a09b77c9146e028"
    },
    {
    "address": "0xd18a54f89603fe4301b29ef6a8ab11b9ba24f139",
    "participation": 0,
    "staker": {
    "accountLocks": [
    {
    "amount": "5000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0xd18a54f89603fe4301b29ef6a8ab11b9ba24f139_0",
    "lockDuration": "360",
    "lockId": "0",
    "lockedAt": "1627306400",
    "withdrawn": false
    },
    {
    "amount": "1000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0xd18a54f89603fe4301b29ef6a8ab11b9ba24f139_1",
    "lockDuration": "2160",
    "lockId": "1",
    "lockedAt": "1627306580",
    "withdrawn": false
    },
    {
    "amount": "10000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0xd18a54f89603fe4301b29ef6a8ab11b9ba24f139_10",
    "lockDuration": "2160",
    "lockId": "10",
    "lockedAt": "1627635968",
    "withdrawn": false
    },
    {
    "amount": "10000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0xd18a54f89603fe4301b29ef6a8ab11b9ba24f139_11",
    "lockDuration": "2160",
    "lockId": "11",
    "lockedAt": "1627636133",
    "withdrawn": false
    },
    {
    "amount": "10000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0xd18a54f89603fe4301b29ef6a8ab11b9ba24f139_12",
    "lockDuration": "2160",
    "lockId": "12",
    "lockedAt": "1627639871",
    "withdrawn": false
    },
    {
    "amount": "56000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0xd18a54f89603fe4301b29ef6a8ab11b9ba24f139_13",
    "lockDuration": "2160",
    "lockId": "13",
    "lockedAt": "1627639901",
    "withdrawn": false
    },
    {
    "amount": "1000000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0xd18a54f89603fe4301b29ef6a8ab11b9ba24f139_14",
    "lockDuration": "2160",
    "lockId": "14",
    "lockedAt": "1627640096",
    "withdrawn": true
    },
    {
    "amount": "12345000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0xd18a54f89603fe4301b29ef6a8ab11b9ba24f139_15",
    "lockDuration": "2160",
    "lockId": "15",
    "lockedAt": "1627643835",
    "withdrawn": false
    },
    {
    "amount": "987000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0xd18a54f89603fe4301b29ef6a8ab11b9ba24f139_16",
    "lockDuration": "2160",
    "lockId": "16",
    "lockedAt": "1627644001",
    "withdrawn": false
    },
    {
    "amount": "456000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0xd18a54f89603fe4301b29ef6a8ab11b9ba24f139_17",
    "lockDuration": "2160",
    "lockId": "17",
    "lockedAt": "1627644046",
    "withdrawn": false
    },
    {
    "amount": "987654000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0xd18a54f89603fe4301b29ef6a8ab11b9ba24f139_18",
    "lockDuration": "2040",
    "lockId": "18",
    "lockedAt": "1627910464",
    "withdrawn": false
    },
    {
    "amount": "1000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0xd18a54f89603fe4301b29ef6a8ab11b9ba24f139_19",
    "lockDuration": "2160",
    "lockId": "19",
    "lockedAt": "1629963996",
    "withdrawn": false
    },
    {
    "amount": "1000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0xd18a54f89603fe4301b29ef6a8ab11b9ba24f139_2",
    "lockDuration": "420",
    "lockId": "2",
    "lockedAt": "1627307600",
    "withdrawn": false
    },
    {
    "amount": "19000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0xd18a54f89603fe4301b29ef6a8ab11b9ba24f139_20",
    "lockDuration": "360",
    "lockId": "20",
    "lockedAt": "1629964056",
    "withdrawn": false
    },
    {
    "amount": "1000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0xd18a54f89603fe4301b29ef6a8ab11b9ba24f139_3",
    "lockDuration": "480",
    "lockId": "3",
    "lockedAt": "1627307961",
    "withdrawn": false
    },
    {
    "amount": "1000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0xd18a54f89603fe4301b29ef6a8ab11b9ba24f139_4",
    "lockDuration": "540",
    "lockId": "4",
    "lockedAt": "1627308051",
    "withdrawn": false
    },
    {
    "amount": "1000000000000000000",
    "boosted": true,
    "ejected": false,
    "id": "0xd18a54f89603fe4301b29ef6a8ab11b9ba24f139_5",
    "lockDuration": "480",
    "lockId": "5",
    "lockedAt": "1627308231",
    "withdrawn": true
    },
    {
    "amount": "5000000000000000000",
    "boosted": true,
    "ejected": false,
    "id": "0xd18a54f89603fe4301b29ef6a8ab11b9ba24f139_6",
    "lockDuration": "360",
    "lockId": "6",
    "lockedAt": "1627308336",
    "withdrawn": true
    },
    {
    "amount": "1000000000000000000",
    "boosted": true,
    "ejected": false,
    "id": "0xd18a54f89603fe4301b29ef6a8ab11b9ba24f139_7",
    "lockDuration": "540",
    "lockId": "7",
    "lockedAt": "1627308381",
    "withdrawn": false
    },
    {
    "amount": "1000000000000000000",
    "boosted": true,
    "ejected": false,
    "id": "0xd18a54f89603fe4301b29ef6a8ab11b9ba24f139_8",
    "lockDuration": "2160",
    "lockId": "8",
    "lockedAt": "1627308411",
    "withdrawn": false
    },
    {
    "amount": "1000000000000000000",
    "boosted": true,
    "ejected": false,
    "id": "0xd18a54f89603fe4301b29ef6a8ab11b9ba24f139_9",
    "lockDuration": "420",
    "lockId": "9",
    "lockedAt": "1627308651",
    "withdrawn": false
    }
    ],
    "accountRewards": [
    {
    "amount": "24278693201559378942",
    "id": "0x54861b9e9906bb42f68d03315e8d7c8d58a8271cc3e978bbc01ae0db358f5675",
    "timestamp": "1627311945",
    "type": "claimed"
    },
    {
    "amount": "10000",
    "id": "0x89b9526339574188b82a942ecc20d7bab272a88d0f7a34c5c95cb32907a1ed41",
    "timestamp": "1627310693",
    "type": "distributed"
    },
    {
    "amount": "10000000000000000000000",
    "id": "0xb4341eb41e3c70194085525d647048c5a99749e7fc27909c7a63494c343eab16",
    "timestamp": "1627310844",
    "type": "distributed"
    },
    {
    "amount": "191206455632669745215347169128",
    "id": "0xf64432e49e17158084c8e9b6d284db3a0c829fa0c54d3911e2a19d85a1ba97d8",
    "timestamp": "1627392885",
    "type": "claimed"
    }
    ],
    "accountVeTokenBalance": "931785671605362628700000",
    "accountWithdrawableRewards": "97627476545660184715637355",
    "accountWithdrawnRewards": "191206455656948438416906548070",
    "id": "0xd18a54f89603fe4301b29ef6a8ab11b9ba24f139"
    },
    "votes": [],
    "leaf": "0x63aa17553ed27b5535759d550ebe046268ca2579bce2cebd85ad3adf9f01270b"
    },
    {
    "address": "0xe0bdc50a72b46d51c5572fb878f62314667778bb",
    "participation": 0,
    "staker": {
    "accountLocks": [
    {
    "amount": "1000000000000000000",
    "boosted": false,
    "ejected": false,
    "id": "0xe0bdc50a72b46d51c5572fb878f62314667778bb_0",
    "lockDuration": "2160",
    "lockId": "0",
    "lockedAt": "1627309748",
    "withdrawn": false
    }
    ],
    "accountRewards": [],
    "accountVeTokenBalance": "1000000000000000000",
    "accountWithdrawableRewards": "21245161844435543523279880759",
    "accountWithdrawnRewards": "0",
    "id": "0xe0bdc50a72b46d51c5572fb878f62314667778bb"
    },
    "votes": [],
    "leaf": "0x9d1165196932daa7779a0a3d5a0aea21400d58ba34ccec30a3a2117140111a25"
    }
    ],
    "root": "0x0e5a0ea3a8369f1b976957d699d13b057b6c9fc5077984e4e595da4ea825d967"
    },
    "rewards": "rewards has to be implemented",
    "__v": 0
    }
];

export const EpochsStub = (): Array<EpochEntity> => {
  // returning all epochs...
  return epochs;
}