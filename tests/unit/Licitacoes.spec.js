import Licitacoes from "../../src/components/LicitacoesList.vue";
import { vi } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";

// Mock do serviço
vi.mock("@/services/licitacoesService", () => ({
  buscarLicitacoes: vi.fn().mockResolvedValue([
    {
      id: 1,
      uasg: "123456",
      pregao: "001/2025",
      editalData: "2025-06-03T12:00:00Z",
    },
  ]),
}));

describe("LicitacoesList.vue", () => {
  it("renderiza uma licitação após buscar", async () => {
    const wrapper = mount(Licitacoes);

    await flushPromises();

    expect(wrapper.text()).toContain("UASG: 123456");
    expect(wrapper.text()).toContain("Pregão: 001/2025");
  });
});
