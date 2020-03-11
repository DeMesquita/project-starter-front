<template>
  <div>
    <v-card-widget enableActions :title="'Cursos'">
      <div slot="widget-header-action"> </div>
      <div slot="widget-content">
       
        <v-row>
          <v-col cols="12">
            <v-data-table
              :headers="headers"
              :items="cursos"
              :items-per-page="10"
              class="elevation-1"
            >
              <template v-slot:item.action="{item}">
                <v-btn small class="mr-2" tile outlined color="success" @click="editItem(item)">
                  <v-icon small left>mdi-pencil</v-icon>Edit
                </v-btn>
                <v-btn small class="mr-2" tile outlined color="red" @click="deleteItem(item)">
                  <v-icon left>mdi-delete</v-icon>Delete
                </v-btn>
              </template>
              <template v-slot:top>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-wnometh="500px">
                  <v-card>
                    <v-card-title>
                      <span class="headline">Atualizar Dados</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.nome"
                              label="Nome"
                              required
                              :rules="requiredRule"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.sigla"
                              label="Sigla"
                              required
                              :rules="requiredRule"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.turno"
                              label="Turno"
                              required:rules="requiredRule"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                      <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
        
      </div>
    </v-card-widget>
  </div>
</template>

<script>
// @ is an alias to /src
import VCardWidget from "@/components/VWidget";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
const cursoRepository = RepositoryFactory.get("curso");

export default {
  name: "homecursos",
  components: {
    VCardWidget
  },

  data: () => ({
    dialog: false,
    editedIndex: -1,
    editedItem: {
      nome: "",
      sigla: "",
      turno: ""
    },
    headers: [
      {
        text: "Nome",
        align: "left",
        value: "nome"
      },
      { text: "Sigla", value: "sigla" },
      { text: "Turno", value: "turno" },
      { text: "", value: "action" }
    ],
    cursos: [],
    requiredRule: [v => !!v || "Campo obrigatório"]
  }),

  created() {
    cursoRepository
      .getAll()
      .then(res => {
        this.cursos = res.data;
      })
      .catch(console.error);
  },

  computed: {},
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.cursos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.cursos.indexOf(item);
      var test = confirm("Tem certeza que deseja deletar o curso?");
      if (test) {
        cursoRepository
          .deleteCurso(this.cursos[index].id)
          .then(res => {
            this.cursos = res.data;
          })
          .catch(console.error);
      }
    },
    close() {
      this.dialog = false;
    },
    save() {
      if (this.editedIndex > -1) {
        cursoRepository
          .updateCurso(this.editedItem.id, this.editedItem)
          .then(res => {
            console.log(res.data);
            this.cursos = res.data;
          })
          .catch(console.error);
      }
      this.close();
    }
  }
};
</script>
