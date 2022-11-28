<script>

import { useWalletStore } from '../stores/wallet';


export default {
    name: 'wallets',
    setup() {
        const walletStore = useWalletStore();
        return { walletStore };
    },
    data() {
        return {
            mnemonic: null,
            transferRecipient: null,
            transferAmount: null,
            transferMemo: null,           
        }
    },
    mounted() {
        this.loadWallets();
        const walletStore = useWalletStore();
        walletStore.loadBalances();
    },
    methods: {

        createWallet() {
            const walletStore = useWalletStore();
            walletStore.createWallet("123");
        },

        loadWallets() {
            const walletStore = useWalletStore();
            walletStore.loadWallets("123");
        },

        importWallet() {
            const walletStore = useWalletStore();
            walletStore.importWallet(this.mnemonic, "123");
        },

        defaultWallet(index) {
            const walletStore = useWalletStore();
            walletStore.defaultWallet(index);
        },

        sendToken() {
            const walletStore = useWalletStore();
            walletStore.sendToken(this.transferRecipient, this.transferAmount, this.transferMemo);
        }        

    }
};

</script>

<template>

    <div class="row mt-3">
        <div class="col-xl-4">
            <div class="card">
                <div class="card-header">Wallet</div>
                <div class="card-body">
                    {{ walletStore.wallets.length }}
                </div>
            </div>
        </div>
        <div class="col-xl-8">

            <div class="row">
                <div class="col">
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <!-- <th scope="col">Type</th> -->
                                <th scope="col">Address</th>
                                <th scope="col">Balance</th>
                                <th scope="col">Action</th>
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
                                    <button class="btn btn-sm btn-primary mx-3" @click="defaultWallet(index)">Default</button>
                                    <button class="btn btn-sm btn-danger" @click="backupWallet(index)">Backup</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <input v-model="mnemonic">

                    <button class="btn btn-primary" @click="createWallet()">Create Wallet</button>
                    <button class="btn btn-primary" @click="loadWallets()">Load Wallet</button>
                    <button class="btn btn-primary" @click="importWallet()">Import Wallet</button>
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <input v-model="transferRecipient" placeholder="transferRecipient">
                    <input v-model="transferAmount" placeholder="transferAmount">
                    <input v-model="transferMemo" placeholder="transferMemo">
                    <button class="btn btn-primary" @click="sendToken()">Transfer</button>
                </div>
            </div>

        </div>

    </div>

</template>
