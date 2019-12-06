<template>
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field :value="id" label="ID" disabled />
      <v-text-field v-model="name" :rules="nameRules" label="Name" required />
      <v-text-field
        v-model="description"
        :rules="descriptionRules"
        label="Description"
        required
      />
      <v-btn :disabled="!valid" @click="save()">
        Save
      </v-btn>
      <v-btn @click="cancel()">Cancel</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import router from "../router";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    valid: true,
    id: null,
    name: "",
    nameRules: [v => !!v || "Name is required"],
    description: "",
    descriptionRules: [
      v => !!v || "Description is required",
      v => (v && v.length >= 5) || "Description must be more than 5 characters"
    ]
  }),
  created() {
    this.getProducts();
  },
  methods: {
    ...mapActions(["getProducts", "addProduct", "updateProduct"]),
    checkProductIdInQueryParams() {
      if (this.$route) {
        return this.$route.params.productId;
      }
      return false; //get product id from query
    },
    save() {
      if (this.$refs.form.validate()) {
        const product = {
          id: this.id,
          name: this.name,
          description: this.description
        };
        if (this.checkProductIdInQueryParams()) {
          const productId = this.checkProductIdInQueryParams();
          const indexProduct = this.findProductIndex(productId);
          this.updateProduct({ product, indexProduct }).then(() =>
            router.push("/")
          );
        } else {
          this.addProduct(product).then(() => router.push("/"));
        }
      }
    },
    cancel() {
      this.$refs.form.reset(); // reset old data form
      router.push("/"); // redirect to products table
    },
    createProduct() {
      this.id = this.newProductId;
    },
    loadProduct() {
      const productId = this.checkProductIdInQueryParams();
      const product = { ...this.findProductById(productId) };
      this.id = product.id;
      this.name = product.name;
      this.description = product.description;
    }
  },
  mounted() {
    if (this.checkProductIdInQueryParams()) {
      this.loadProduct();
    } else {
      this.createProduct();
    }
  },
  computed: {
    ...mapState(["products"]),
    ...mapGetters([
      "getIdForNewProduct",
      "findProductById",
      "findProductIndex"
    ]),
    newProductId() {
      return this.getIdForNewProduct;
    }
  }
};
</script>

<style scoped>
</style>
