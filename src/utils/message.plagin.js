export default {
    install(Vue, opt){
        Vue.prototype.$message = function (html) {
            M.toast({html})
        }

        Vue.prototype.$error = function (html) {
            M.toast({html: `[errro] ${html}`})
        }
    }
}