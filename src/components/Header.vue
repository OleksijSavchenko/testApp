<template>
    <v-app-bar
            app
            color="primary"
            dark
    >
        <v-flex d-flex align-center text-uppercase xs6>
            <v-flex xs4 md1>
                <v-img
                        :src="require('../assets/logo.png')"
                        contain
                        :lazy-src="require('../assets/logo.png')"
                        height="40"
                />
            </v-flex>
            <v-flex d-flex xs8 md11>
                {{ title }}
            </v-flex>
        </v-flex>

        <v-flex d-flex align-center justify-end text-uppercase xs6>
            <v-btn
                    class="d-flex justify-center xs4 mr-2"
                    :loading="false"
                    :disabled="false"
                    color="secondary"
                    @click="reloadData()"
            >
                Reload data
            </v-btn>
        </v-flex>
    </v-app-bar>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        name: "Header",
        props: {
            title: {
                type: String,
                default: ''
            }
        },
        methods: {
            ...mapActions([
                'reloadData'
            ])
        }
    }
</script>
