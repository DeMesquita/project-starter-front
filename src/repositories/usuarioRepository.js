import Repository from "./Repository";

const resource = "/usuarios";

export default {
    getByAutenticacao() {
        return Repository.get(`${resource}/usuario`);
    },

    getAll() {
      return Repository.get(`${resource}`)
    },

    createUser(usuario){
      return Repository.post(`${resource}`, usuario)
    },
   
    updateUser(id, usuario){
      return Repository.put(`${resource}/${id}`, usuario)
    },
    deleteUser(id){
      return Repository.delete(`${resource}/${id}`)
    }
}
