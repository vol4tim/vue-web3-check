<template>
  <v-container fluid fill-height>
    <v-layout
      justify-center
      align-center
    >
      <v-flex text-xs-center>
        <h1>No access to account</h1>
        <div>Try to refresh browser page or <v-btn flat small color="primary" class="mx-0" @click.native="request">request access</v-btn>.</div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'NoAccess',
  methods: {
    request () {
      this.$emit('requestAccess')
    }
  }
}
</script>
