<script>
import 'bootstrap/dist/css/bootstrap.min.css'

import { RouterLink, RouterView } from 'vue-router'
import { useWalletStore } from './stores/wallet';

export default {
  name: 'app',
  components: {
    //ToDoItem
  },
};

</script>

<template>

  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" to="/">Remote</RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01"
        aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav me-auto">
          <!-- <li class="nav-item">
            <RouterLink class="nav-link" to="/">Home</RouterLink>
          </li> -->
          <li class="nav-item">
            <a class="nav-link" href="/transfers">Transfer</a>
          </li> 
          <li class="nav-item">
            <RouterLink class="nav-link" to="/wallets">Wallet</RouterLink>
          </li> 

        </ul>

      </div>
    </div>
  </nav>

  <div class="container">
    <RouterView />
  </div>

  <footer class="mt-3 py-3">
    <div class="container">
      <span>2022 &copy; Pipeline Network Sdn. Bhd.
      </span>
    </div>
  </footer>




</template>

