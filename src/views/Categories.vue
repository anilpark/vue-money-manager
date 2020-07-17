<template>
    <div>
        <div class="page-title">
            <h3>Категории</h3>
        </div>
        <section>
            <Loader v-if="loading"/>
            <div class="row" v-else>
                <CreateCategory @created="addNewCategory"/>

                <EditCategory
                        v-if="categories.length"
                        :categories="categories" @updated="updateCategories"
                    :key="categories.length + updCounter"
                />
                <p v-else>no categories yet</p>
            </div>
        </section>
    </div>
</template>

<script>
    import CreateCategory from "../components/CreateCategory";
    import EditCategory from "../components/EditCategory";
    export default {
        name: "Categories",
        data: () => ({
            categories: [],
            loading: true,
            updCounter: 0
        }),
        async mounted() {
            this.categories = await this.$store.dispatch('fetchCategories')
            this.loading = false
        },
        methods: {
            addNewCategory(newCat){
                this.categories.push(newCat)
            },
            updateCategories(category){
                const idx = this.categories.findIndex(c => c.id === category.id)
                this.categories[idx].title = category.title
                this.categories[idx].limit = category.limit
                this.updCounter++
            }
        },
        components:{
            CreateCategory,
            EditCategory
        }
    }
</script>

<style scoped>

</style>