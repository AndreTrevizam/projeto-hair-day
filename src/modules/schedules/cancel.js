import {schedulesDay} from "./load.js"
import {scheduleCancel} from "../../services/schedule-cancel.js"

const periods = document.querySelectorAll(".period")

// Gera evento de clique para cada lista (manhã, tarde e noite)
periods.forEach((period) => {
  // Capturando o evento de clique na lista
  period.addEventListener("click", async (event) => {
    if (event.target.classList.contains("cancel-icon")) {
      // Obtem a li pai do elemento clicado
      const item = event.target.closest("li")

      // Pega o ID do agendamento para remover
      const {id} = item.dataset
      
      // Confirma que o ID foi selecionado
      if (id) {
        // Confirma se o usuario quer cancelar o agendamento
        const isConfirm = confirm("Deseja cancelar esse agendamento?")

        if (isConfirm) {
          // Faz a requisição na API para cancelar
          await scheduleCancel({id})

          // Recarrega os agendamentos
          schedulesDay()
        }
      }
    }
  })
})