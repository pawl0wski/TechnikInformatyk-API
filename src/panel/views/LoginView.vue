<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 col-md-6 shadow-sm rounded-3">
                <div class="login-dialog p-3">
                    <TopText />
                    <CredentialsForm />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import TopText from "../components/LoginView/TopText.vue";
import CredentialsForm from "../components/LoginView/CredentialsForm.vue";

export default {
    components: { CredentialsForm, TopText },
};
</script>
