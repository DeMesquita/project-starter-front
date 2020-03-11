<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Dados Cadastrais</v-toolbar-title>
          </v-toolbar>
          <v-form @submit.prevent="onSubmit" ref="form" lazy-validation v-model="valid">
            <v-card-text>
              <p class="error--text text-center">{{error}}</p>
              <v-text-field
                label="Nome"
                name="nome"
                type="text"
                v-model="nome"
                required
                :rules="requiredRule"
              />
              <v-text-field
                label="Sigla"
                name="sigla"
                type="text"
                v-model="sigla"
                required
                :rules="requiredRule"
              />

              <v-text-field
                label="Turno"
                name="turno"
                type="text"
                v-model="turno"
                required
                :rules="requiredRule"
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="secondary" @click="homecursos">Voltar</v-btn>
              <v-btn color="primary" type="submit" :loading="loading" large>Cadastrar</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
const cursoRepository = RepositoryFactory.get("curso");

export default {
  props: ["to", "invalidToken"],
  data: () => ({
    valid: true,
    loading: false,
    nome: "",
    sigla: "",
    turno: "",
    error: "",
    requiredRule: [v => !!v || "Campo obrigatório"]
  }),

  methods: {
    onSubmit() {
      this.loading = true;
      if (this.$refs.form.validate()) {
        cursoRepository.createCurso({
          nome: this.nome,
          sigla: this.sigla,
          turno: this.turno
        });

        this.$refs.form.reset();
        alert("Curso cadastrado com sucesso!");
        
      } else {
        this.loading = false;
        alert("Cadastro não realizado");
      }
    },
    homecursos() {
      this.$router.push("/cursos");
    }
  },
  computed: {
    ...mapState({
      token: state => state.auth.token
    })
  }
};
</script>

<style scoped lang="css">
</style>
