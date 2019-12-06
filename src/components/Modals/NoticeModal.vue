<template>
    <v-container>
        <v-layout row>
            <v-dialog v-model="noticeModal.show" persistent max-width="290">
                <v-card>
                    <v-card-title class="headline">{{ noticeModal.title }}</v-card-title>
                    <v-card-text>{{ noticeModal.text }}</v-card-text>
                    <v-card-actions>
                        <v-spacer />
                        <v-btn color="green darken-1" text @click="close()">Ok</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </v-container>
</template>

<script>
    import { mapState, mapMutations } from 'vuex';

    export default {
        name: "NoticeModal",
        methods: {
            ...mapMutations([
                'SET_NOTICE_MODAL'
            ]),
            close() {
                this.SET_NOTICE_MODAL({
                    show: false,
                    title: '',
                    text: '',
                });
            }
        },
        computed: {
            ...mapState([
                'noticeModal'
            ])
        }
    }
</script>

<style scoped>

</style>
