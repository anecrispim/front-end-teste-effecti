<template>
  <section class="licitacoes">
    <h1>Lista de Licitações</h1>

    <form @submit.prevent="onBuscar" class="filtros-form">
      <div>
        <label for="uasg">Código da UASG:</label>
        <input
          id="uasg"
          v-model.trim="filtros.uasg"
          type="text"
          placeholder="Ex: 123456"
        />
      </div>

      <div>
        <label for="pregao">Número do Pregão:</label>
        <input
          id="pregao"
          v-model.trim="filtros.pregao"
          type="text"
          placeholder="Ex: 001/2025"
        />
      </div>

      <button type="submit" :disabled="loading">Buscar</button>
    </form>

    <div v-if="loading" class="loading">Carregando licitações...</div>

    <div v-else>
      <p v-if="licitacoes.length === 0" class="sem-resultados">
        Nenhuma licitação encontrada para os filtros informados.
      </p>

      <ul v-else class="lista-licitacoes">
        <li v-for="licitacao in licitacoes" :key="licitacao.id" class="item-licitacao">
          <p><strong>UASG:</strong> {{ licitacao.uasg || '-' }}</p>
          <p><strong>Pregão:</strong> {{ licitacao.pregao || '-' }}</p>
          <p><strong>Data Edital:</strong> {{ formatarData(licitacao.editalData) }}</p>
        </li>
      </ul>
    </div>

    <div v-if="erro" class="erro">
      Ocorreu um erro ao carregar as licitações. Tente novamente mais tarde.
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { buscarLicitacoes } from "../services/licitacoesService.js";

const licitacoes = ref([]);
const filtros = ref({
  uasg: "",
  pregao: "",
});
const loading = ref(false);
const erro = ref(false);

async function carregarLicitacoes() {
  loading.value = true;
  erro.value = false;

  try {
    licitacoes.value = await buscarLicitacoes({
      uasg: filtros.value.uasg || undefined,
      pregao: filtros.value.pregao || undefined,
    });
  } catch (e) {
    erro.value = true;
    licitacoes.value = [];
  } finally {
    loading.value = false;
  }
}

function onBuscar() {
  carregarLicitacoes();
}

function formatarData(dataStr) {
  if (!dataStr) return "-";
  const data = new Date(dataStr);
  if (isNaN(data)) return dataStr;
  return data.toLocaleDateString("pt-BR");
}

onMounted(() => {
  carregarLicitacoes();
});
</script>

<style scoped>
.licitacoes {
  max-width: 700px;
  margin: 30px auto;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.filtros-form {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.filtros-form div {
  display: flex;
  flex-direction: column;
  flex: 1 1 200px;
}

.filtros-form label {
  font-weight: 600;
  margin-bottom: 5px;
}

.filtros-form input {
  padding: 6px 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.filtros-form button {
  align-self: flex-end;
  padding: 8px 20px;
  font-weight: 600;
  color: white;
  background-color: #2a9d8f;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.filtros-form button:disabled {
  background-color: #95c1b8;
  cursor: not-allowed;
}

.filtros-form button:hover:not(:disabled) {
  background-color: #21867a;
}

.loading {
  font-style: italic;
  color: #555;
}

.sem-resultados {
  font-style: italic;
  color: #777;
}

.lista-licitacoes {
  list-style: none;
  padding: 0;
}

.item-licitacao {
  border-bottom: 1px solid #ddd;
  padding: 12px 0;
}

.item-licitacao h3 {
  margin: 0 0 6px;
}

.erro {
  margin-top: 20px;
  color: #b00020;
  font-weight: 700;
}
</style>
