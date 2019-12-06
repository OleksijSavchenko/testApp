<template>
    <v-container>
        <v-layout row>
            <v-dialog v-model="dialog" persistent max-width="290">
                <v-card>
                    <v-card-title class="headline">{{ title }}</v-card-title>
                    <v-card-text>{{ text }}</v-card-text>
                    <v-card-actions>
                        <v-spacer />
                        <v-btn color="green darken-1" text @click="cancel()">Cancel</v-btn>
                        <v-btn color="green darken-1" text @click="save()">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </v-container>
</template>

<script>
    import { mapState, mapMutations } from 'vuex';

    export default {
        name: "ConfirmModal",
        props: {
            title: {
                type: String,
                default: ''
            },
            text: {
                type: String,
                default: ''
            }
        },
        methods: {
            ...mapMutations([
                'SET'
            ]),
            cancel() {
                this.hideModal();
                this.$emit('cancel'); // need in general for reusing
            },
            save() {
                this.hideModal();
                this.$emit('save');
            },
            hideModal() {
                this.dialog = false;
            }
        },
        computed: {
            ...mapState([
                'confirmModalShow'
            ]),
            dialog: {
                get() {
                    return this.confirmModalShow;
                },
                set(condition) {
                    this.SET({
                        field: 'confirmModalShow',
                        value: condition
                    });
                }
            }
        }
    }
</script>

<style scoped>

</style>
