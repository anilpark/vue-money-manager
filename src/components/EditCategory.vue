<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
                <h4>Редактировать</h4>
            </div>

            <form @submit.prevent="submitHandler">
                <div class="input-field" >
                    <select ref="select" v-model="current">
                        <option
                            v-for="c in categories"
                            :key="c.id"
                            :value="c.id"
                        >{{c.title}}</option>
                    </select>
                    <label>Выберите категорию</label>
                </div>

                <div class="input-field">
                    <input
                            id="name"
                            type="text"
                            v-model="title"
                            :class="{invalid: $v.title.$dirty && !$v.title.required}"
                    >
                    <label for="name">Название</label>
                    <span class="helper-text invalid"
                          v-if="$v.title.$dirty && !$v.title.required"
                    >Введите название</span>
                </div>

                <div class="input-field">
                    <input
                            id="limit"
                            type="number"
                            v-model.number="limit"
                            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
                    >
                    <label for="limit">Лимит</label>
                    <span class="helper-text invalid"
                          v-if="$v.limit.$dirty && !$v.limit.minValue"
                    >Минимальная величина {{$v.limit.$params.minValue.min}}</span>
                </div>

                <button class="btn waves-effect waves-light" type="submit">
                    Обновить
                    <i class="material-icons right">send</i>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
    import {required, minValue} from 'vuelidate/lib/validators'

    export default {
        name: "EditCategory",
        props: {
            categories: {
                type: Array,
                required: true
            }
        },
        data: () => ({
            title: '',
            limit: 100,
            select: null,
            current: null
        }),
        methods:{
            async submitHandler(){
                if(this.$v.$invalid){
                    this.$v.$touch()
                    return
                }
                
                try {
                    const categoryData = {
                        id: this.current,
                        title: this.title,
                        limit: this.limit
                    }
                    await this.$store.dispatch('updateCategory', categoryData)

                    this.$message('category updated')
                    this.$emit('updated', {
                        id: this.current,
                        title: this.title,
                        limit: this.limit
                    })
                }catch (e) {
                    
                }
            }
        },
        created() {
            const {id, title, limit} = this.categories[0]
            this.current = id
            this.title = title
            this.limit = limit

        },
        mounted() {
            this.select = M.FormSelect.init(this.$refs.select)
            M.updateTextFields()
        },
        validations:{
            title: {required},
            limit: {minValue: minValue(100)}
        },
        destroyed() {
            if(this.select && this.select.destroy){
                this.select.destroy()
            }
        },
        watch: {
            current(catId){
                const {title, limit} = this.categories.find(c => c.id === catId)

                this.title = title
                this.limit = limit
            }
        }
    }
</script>

<style scoped>

</style>