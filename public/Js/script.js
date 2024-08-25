
let participantes = [  
    {
        nome: 'Osvanio de Castro',
        email:'osnio@gmail.com',
        dataInscricao: new Date(2024, 5, 23, 19, 23),
        dataCheckIn:  null
    },
    {
        nome:"Mike Tchaquarta",
        email: "mike@gmail.com",
        dataInscricao: new Date(2024, 5, 28, 11, 11),
        dataCheckIn: new Date(2024, 2, 20, 10, 30)
    },
    {
        nome: 'Freudy Batugenga',
        email:'batubenga@gmail.com',
        dataInscricao: new Date(2024, 0, 21, 18, 19),
        dataCheckIn:  new Date(2024, 1, 24, 21, 9)
    },
    {
        nome:"Yuya Sebastiao",
        email: "yuya@gmail.com",
        dataInscricao: new Date(2024, 3, 27, 10, 9),
        dataCheckIn: null
    },
    {
        nome: 'Venancio',
        email:'venancio@gmail.com',
        dataInscricao: new Date(2024, 6, 1, 14, 12),
        dataCheckIn:  new Date(2024, 4, 11, 12, 9)
    },
    {
        nome:"Osvania De castro",
        email: "osnia@gmail.com",
        dataInscricao: new Date(2024, 4, 10, 13, 3),
        dataCheckIn: new Date(2024, 3, 14, 15, 17)
    },
    {
        nome: 'Osnio',
        email:'osnio@gmail.com',
        dataInscricao: new Date(2024, 2, 22, 19, 20),
        dataCheckIn:  new Date(2024, 2, 25, 22, 10)
    },
    {
        nome:"Edmar",
        email: "edmar@gmail.com",
        dataInscricao: new Date(2024, 1, 3, 17, 11),
        dataCheckIn: null
    },
    {
        nome: 'Julho',
        email:'julho@gmail.com',
        dataInscricao: new Date(2024, 0, 3, 19, 23),
        dataCheckIn:  new Date(2024, 2, 4, 22, 20)
    },
    {
        nome:" Elder",
        email: "elder@gmail.com",
        dataInscricao: new Date(2024, 3, 2, 19, 11),
        dataCheckIn: new Date(2024, 2, 21, 20, 20)
    },
    
    
    
    
];

const criarNovoParicipante = (participante) =>{

    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
    let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

    if(participante.dataCheckIn == null){
         dataCheckIn = `
         <button data-email="${participante.email}" onclick="fazerCheckIn(event)"> Confirmar CheckIn</button>
         
         `

    }

    return ` 
     <tr>
        <td>
            <strong>${participante.nome}</strong>
            <br>
            <small>${participante.email}</small>
        </td>
        <td>${dataInscricao}</td>
        <td>${dataCheckIn}</td>
    </tr>
    `

}


const atualizarLista  = (participantes) =>{
    let output = ''
    for (let participante of participantes){
        output = output + criarNovoParicipante(participante)

    }


   document.querySelector('tbody').innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) =>{
    event.preventDefault()

    const dadosDoFormulario = new FormData(event.target) 
    
    const participante = {
        nome: dadosDoFormulario.get('nome'),
        email: dadosDoFormulario.get('email'),
        dataInscricao: new Date(),
        dataCheckIn: null
    }
    //verificar se o participante ja existe
    const participanteExiste = participantes.find((p)=>{
        return p.email == participante.email

    })
    if(participanteExiste){
        alert('Email ja cadastrado!')
        return
    }

    participantes = [participante, ...participantes ]
    atualizarLista(participantes)

    //limpar o formulario
    event.target.querySelector('[name="nome"]').value = ""
    event.target.querySelector('[name="email"]' ). value ="  "
}

const fazerCheckIn = (event) => {
    //confirmar o CheckIn
    const mensagemConfirmacao = 'Tem certeza que deseja fazer o Check-In?'
    if (confirm(mensagemConfirmacao) == false){
        return 
    }
    //encontrar o partcipante dentro da lista
    const participante = participantes.find((p) =>{
        return p.email == event.target.dataset.email
    })
    //atualizar o check-in do participante
    participante.dataCheckIn = new Date()
    //atualizar a lista de  particpante
    atualizarLista(participantes)
}