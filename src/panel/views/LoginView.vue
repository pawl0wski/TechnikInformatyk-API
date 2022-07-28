<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-6 shadow-sm rounded-3 ">
        <div class="login-dialog p-3">
          <TopText />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TopText from "../components/LoginView/TopText.vue";
export default {
  components: { TopText }
}
</script>
