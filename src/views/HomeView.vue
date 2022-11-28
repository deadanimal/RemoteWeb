<script>

import { useWalletStore } from '../stores/wallet';


export default {
    name: 'home',
    setup() {
        const walletStore = useWalletStore();
        return { walletStore };
    },
    data() {
        return {
            pinCode: null,
            mnemonic: null,
            transferRecipient: null,
            transferAmount: null,
            transferMemo: null,
        }
    },
    mounted() {

        const walletStore = useWalletStore();


        setInterval(() => {
            this.checkPinCode();
        }, 1000)

        setInterval(() => {
            if (walletStore.pinCode == null) {

            } else {
                //walletStore.loadBalances();
                // walletStore.loadWallets();
            }

        }, 10000)

    },
    methods: {

        checkPinCode() {
            const walletStore = useWalletStore();
            var pinCode = walletStore.pinCode;
            if (pinCode == null) {
                //console.log(null);
            } else {
                //console.log(pinCode);
            }

        },

        createWallet() {
            const walletStore = useWalletStore();
            walletStore.createWallet();
            this.loadBalances();
        },

        loadBalances() {
            const walletStore = useWalletStore();
            walletStore.loadBalances();
        },

        loadWallets() {
            const walletStore = useWalletStore();
            walletStore.loadWallets();
        },

        importWallet() {
            const walletStore = useWalletStore();
            walletStore.importWallet(this.mnemonic);
            this.loadBalances();
        },

        defaultWallet(index) {
            const walletStore = useWalletStore();
            walletStore.defaultWallet(index);
            this.loadBalances();
        },

        sendToken() {
            const walletStore = useWalletStore();
            walletStore.sendToken(this.transferRecipient, this.transferAmount, this.transferMemo)
                .then((response) => {
                    var txStatement = 'Hash: ' + response['transactionHash'];
                    this.loadBalances();
                    this.$swal({
                        icon: 'success',
                        title: 'Transfer Successful',
                        text: txStatement,
                        //footer: '<a href="">Why do I have this issue?</a>'
                    })
                })
        },

        setPin() {
            const walletStore = useWalletStore();
            walletStore.setPin(this.pinCode);
            walletStore.loadWallets();
            setTimeout(() => {
                walletStore.loadBalances();
            }, 1000)
        }

    }
};

</script>

<template>

    <div class="row mt-3">
        <div class="col-xl-3">

            <div class="card mt-3" v-if="walletStore.pinCode == null">
                <div class="card-header">PIN</div>
                <div class="card-body">
                    <input class="form-control my-3" v-model="pinCode" placeholder="PIN Code">
                </div>
                <button class="btn btn-primary" @click="setPin()">Set PIN</button>
            </div>

            <!-- <p @click="createWallet()">Create Wallet</p> -->

            <div class="card mt-3" v-if="walletStore.pinCode != null">
                <div class="card-header">
                    Wallet
                    <i @click="createWallet()" class="bi bi-plus-circle mx-3"></i>


                </div>
                <div class="card-body">
                    <textarea class="form-control" v-model="mnemonic" placeholder="Mnemonic"></textarea>
                </div>
                <button class="btn btn-primary" @click="importWallet()">Import Wallet</button>
            </div>

        </div>
        <div class="col-xl-9" v-if="walletStore.pinCode != null">

            <div class="row">
                <div class="col-xl-12">

                </div>
            </div>

            <div class="row">
                <div class="col-xl-12">
                    <!-- <button class="btn btn-primary" @click="loadBalances()">Load Balances</button> -->

                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <!-- <th scope="col">Type</th> -->
                                <th scope="col">Address</th>
                                <th scope="col">Balance</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="table-active" v-for="(wallet, index) in walletStore.wallets">
                                <!-- <th scope="row">Active</th> -->
                                <td>
                                    {{ wallet }}
                                    <span class="badge bg-primary"
                                        v-if="walletStore.walletIndex == index">Primary</span>
                                </td>
                                <td>{{ walletStore.balances[index] }}</td>
                                <td>
                                    <button class="btn btn-sm btn-primary mx-3"
                                        @click="defaultWallet(index)">Default</button>
                                    <button class="btn btn-sm btn-danger" @click="backupWallet(index)">Backup</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>

            <div class="row">
                <div class="col-xl-4">
                    <div class="card">
                        <div class="card-header">Transfer Token</div>
                        <div class="card-body">
                            <div class="form-group">
                                <label class="form-label">Recipient</label>
                                <input class="form-control" v-model="transferRecipient" placeholder="Recipient">
                            </div>
                            <div class="form-group">
                                <label class="form-label mt-3">Amount</label>
                                <input class="form-control" v-model="transferAmount" placeholder="Amount">
                            </div>
                            <div class="form-group">
                                <label class="form-label mt-3">Memo</label>
                                <input class="form-control" v-model="transferMemo" placeholder="Memo">
                            </div>
                        </div>
                        <button class="btn btn-primary" @click="sendToken()">Transfer</button>
                    </div>
                </div>
            </div>

        </div>

    </div>

</template>
