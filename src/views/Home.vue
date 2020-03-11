<template>
  <div>
    <v-card-widget enableActions :title="'Página Inicial'">
      <div slot="widget-header-action"></div>
      <div slot="widget-content">
        <v-row>
          <v-col cols="12">
            <v-data-table
              :headers="headers"
              :items="usuarios"
              :items-per-page="10"
              class="elevation-1"
            >
              <template v-slot:item.habilitado="{item} ">
                <v-icon v-if="item.habilitado" color="#1B5E20">check_circle_outline</v-icon>
                <v-icon v-else color="#B71C1C">highlight_off</v-icon>
              </template>

              <template v-slot:item.action="{item}">
                <v-btn small class="mr-2" tile outlined color="success" @click="editItem(item)">
                  <v-icon small left>mdi-pencil</v-icon>Edit
                </v-btn>
                <v-btn
                  v-if="item.habilitado == false "
                  small
                  class="mr-2"
                  tile
                  outlined
                  color="red"
                  @click="deleteItem(item)"
                >
                  <v-icon left>mdi-delete</v-icon>Delete
                </v-btn>
              </template>
              <template v-slot:top>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                  <v-card>
                    <v-card-title>
                      <span class="headline">Atualizar Dados</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.nome" label="Nome"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.email"
                              prepend-icon="Email"
                              :rules="emailRules"
                              label="E-mail"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              id="password"
                              label="Password"
                              name="password"
                              prepend-icon="lock"
                              type="password"
                              v-model="editedItem.password"
                              required
                              :rules="requiredRule"
                            />
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-checkbox
                              v-model="editedItem.habilitado"
                              label="Selecione para habilitar"
                              required
                            ></v-checkbox>
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
const usuarioRepository = RepositoryFactory.get("usuario");

export default {
  name: "home",
  components: {
    VCardWidget
  },

  data: () => ({
    dialog: false,
    editedIndex: -1,
    editedItem: {
      nome: "",
      email: "",
      password: "",
      habilitado: ""
    },
    headers: [
      {
        text: "Nome",
        align: "left",
        value: "nome"
      },
      { text: "Email", value: "email" },
      { text: "Status", value: "habilitado" },
      { text: "", value: "action" }
    ],
    usuarios: [],
    emailRules: [
      v => !!v || "Campo obrigatório",
      v => /.+@.+/.test(v) || "E-mail não é válido"
    ],
    requiredRule: [v => !!v || "Campo obrigatório"]
  }),

  created() {
    usuarioRepository
      .getAll()
      .then(res => {
        this.usuarios = res.data;
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
      this.editedIndex = this.usuarios.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editedItem.password = "";
      this.editedItem.habilitado = item.habilitado;
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.usuarios.indexOf(item);
      var test = confirm("Tem certeza que deseja deletar o usuario?");
      if (test) {
        usuarioRepository
          .deleteUser(this.usuarios[index].id)
          .then(res => {
            this.usuarios = res.data;
          })
          .catch(console.error);
      }
    },
    close() {
      this.dialog = false;
    },
    save() {
      if (this.editedIndex > -1) {
        usuarioRepository
          .updateUser(this.editedItem.id, this.editedItem)
          .then(res => {
            console.log(res.data);
            this.usuarios = res.data;
          })
          .catch(console.error);
      }
      this.close();
    }
  }
};
</script>
