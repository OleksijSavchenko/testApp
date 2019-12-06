<template>
    <v-container>
        <v-data-table
            :headers="headers"
            :items="products"
            sort-by="calories"
            class="elevation-1"
        >
            <template v-slot:item.action="{ item }">
                <v-btn class="ma-2"
                       tile
                       small
                       color="primary"
                       :to="{ name: 'update', params: { productId: item.id }}"
                >
                    <v-icon left small>edit</v-icon>
                    Update
                </v-btn>
                <v-btn class="ma-2"
                       tile
                       small
                       color="error"
                       @click="saveProductIdForDeleting(item.id)"
                >
                    <v-icon left small>delete</v-icon>
                    Delete
                </v-btn>
            </template>
            <template v-slot:no-data>
                <v-btn color="primary" @click="reloadData()">Need to reload data</v-btn>
            </template>
        </v-data-table>

        <v-layout row wrap justify-center>
            <div class="text-xs-center pt-3">
                <v-btn color="success" :to="{ name: 'create'}">Create</v-btn>
            </div>
        </v-layout>
        <modal-condition
                title="Remove this product?"
                text="If you delete a product, it couldn't be restored."
                @save="confirmDeletingProduct()"
        />
    </v-container>
</template>

<script>
    import ModalCondition from './Modals/ConfirmModal'
    import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'

    export default {
        components: {
            ModalCondition
        },
        created() {
            this.getProducts();
        },
        data: () => ({
            headers: [
                {
                    text: 'ID',
                    align: 'center',
                    sortable: false,
                    value: 'id'
                },
                {
                    text: 'Name',
                    align: 'center',
                    sortable: false,
                    value: 'name'
                },
                {
                    text: 'Description',
                    align: 'center',
                    sortable: false,
                    value: 'description'
                },
                {
                    text: 'Actions',
                    align: 'center',
                    value: 'action',
                    sortable: false
                },
            ],
            productIdForDelete: null
        }),

        methods: {
            ...mapActions([
                'getProducts',
                'deleteProduct',
                'reloadData'
            ]),
            ...mapMutations([
                'SET'
            ]),

            saveProductIdForDeleting(productId) { //method for showing modal window with condition
                this.productIdForDelete = productId;
                this.SET({
                    field: 'confirmModalShow',
                    value: true
                });
            },
            confirmDeletingProduct() {
                const indexProduct = this.findProductIndex(this.productIdForDelete);
                this.productIdForDelete = null;
                this.deleteProduct(indexProduct)
            }
        },
        computed: {
            ...mapState([
                'products'
            ]),
            ...mapGetters(['findProductIndex'])
        }
    }
</script>

<style scoped>

</style>
