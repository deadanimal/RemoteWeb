<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>

import { useWalletStore } from '../stores/wallet';


export default {
    name: 'transfers',
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

