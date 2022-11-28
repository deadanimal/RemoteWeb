
import { defineStore } from "pinia";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { assertIsBroadcastTxSuccess, SigningStargateClient, StargateClient } from "@cosmjs/stargate";
import * as bip39 from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';
import { stringToPath } from "@cosmjs/crypto";

import { AES, enc } from "crypto-js";

export const useWalletStore = defineStore({
  id: "wallet",
  state: () => ({

    wallets: [],
    mnemonics: [],
    balances: [],
    walletIndex: null,
    pinCode: null,

  }),

  getters: {

  },
  actions: {

    async loadWallets(pinCode) {

      var encryptedMnemonics = localStorage.getItem('mnemonics');
      var wallets = JSON.parse(localStorage.getItem('wallets'));
      var bytesMnemonics = AES.decrypt(encryptedMnemonics, pinCode);
      var mnemonics = JSON.parse(bytesMnemonics.toString(enc.Utf8));
      this.mnemonics = mnemonics;
      this.wallets = wallets;

      var walletIndex = localStorage.getItem('walletIndex');
      this.walletIndex = walletIndex;

    },

    async createWallet(pinCode) {

      var mnemonic = bip39.generateMnemonic(wordlist);
      const walletStore = useWalletStore();
      walletStore.importWallet(mnemonic, pinCode)

    },

    async importWallet(mnemonic, pinCode) {
      var wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic);
      const [account] = await wallet.getAccounts();

      if (this.mnemonics.length >= 20) {
        return;
      }

      this.mnemonics.push(mnemonic);
      this.wallets.push(account.address);

      var encryptedMnemonics = AES.encrypt(JSON.stringify(this.mnemonics), pinCode).toString();

      localStorage.setItem('mnemonics', encryptedMnemonics);
      localStorage.setItem('wallets', JSON.stringify(this.wallets));
    },

    async defaultWallet(index) {
      this.walletIndex = index;
      localStorage.setItem('walletIndex', index);
    },

    async backupWallet(index, pinCode) { },

    async reloadWallet(walletId, pinCode) { },

    async loadBalances() {
      this.balances = [];
      for (let i = 0; i < this.mnemonics.length; i++) {
        var oneWallet = await DirectSecp256k1HdWallet.fromMnemonic(this.mnemonics[i]);
        const [oneAccount] = await oneWallet.getAccounts();
        const client = await SigningStargateClient.connectWithSigner("rpc.atomicmoney.org", oneWallet);
        const before = await client.getBalance(oneAccount.address, "udollar");
        var balanceValue = parseInt(before['amount']) / Math.pow(10, 6);
        this.balances.push(balanceValue.toFixed(3));
      }
    },

    async sendToken(transferRecipient, transferAmount, transferMemo="") {
      var oneWallet = await DirectSecp256k1HdWallet.fromMnemonic(this.mnemonics[this.walletIndex]);
      transferAmount = (parseFloat(transferAmount) * Math.pow(10,6)).toString()
      const [oneAccount] = await oneWallet.getAccounts();
      const client = await SigningStargateClient.connectWithSigner("rpc.atomicmoney.org", oneWallet);
      const result = await client.sendTokens(
        oneAccount.address,
        transferRecipient,
        [{ denom: "udollar", amount: transferAmount }],
        {
          amount: [{ denom: "udollar", amount: "1" }],
          gas: "100000",
        },
        transferMemo
      )
      console.log(result);
      //this.balances.push(parseInt(before['amount']) / Math.pow(10,6));      
    }



  }
});
