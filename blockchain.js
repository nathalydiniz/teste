function registroDoAnimal() {
    event.preventDefault();
    if ($("#_tutor","#_criador").val().length != 42) {
      $("#_tutor","#_criador").focus();
      alert("Endereço inválido");
      return;
    }
  
    if (!$("#_tutor","#_criador").val().startsWith("0x")) {
      alert("Endereço inválido");
      $("#_tutor","#_criador").focus();
      return;
    }
    
    if (typeof contratoComSignatario === "undefined") {
      alert("Você não está conectado ao Ethereum. Verifique seu Metamask");
      return;
    }
  
    contratoComSignatario
      .registroDoAnimal($("#_nome").val(), $("#_especie").val(), $("#_sexo").val(), $("#_criador").val(), $("#_tutor").val(), $("#_LocalDeNascimento").val(), $("#_dataDeNascimento").val(), $("#_registro").val() * 1)
      .then((transacao) => {
        $("#descricaoStatusTransacoes").html("Transação enviada. Aguarde pela mineração...");
        $("#statusTransacoes").toggle();
        transacao
          .wait()
          .then((resultado) => {
            console.log("registro - o resultado foi ", resultado);
            if (resultado.status === 1) {
              $("#descricaoStatusTransacoes").html("Transação executada.");
            } else {
              $("#descricaoStatusTransacoes").html("Houve um erro na execução da transação no Ethereum.");
            }
          })
          .catch((err) => {
            console.error("registro - a transação foi minerada e houve um erro. Veja abaixo");
            console.error(err);
            $("#descricaoStatusTransacoes").html("Algo saiu errado: " + err.message);
          });
      })
      .catch((err) => {
        console.error("registro - tx só foi enviada");
        console.error(err);
        $("#descricaoStatusTransacoes").html("Algo saiu errado antes de enviar ao Ethereum: " + err.message);
      });
  }