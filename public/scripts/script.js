const premierJour = document.getElementById('start')
const dernierJour = document.getElementById('end')

const today = new Date().toISOString().split('T')[0]

const tout = document.querySelector('.tout')
const rechercher = document.querySelector('.valider')
const tempsDeLocation = document.querySelector('.tempsDeLocation')

const cartes = document.querySelector('.cartes')
const aucune = document.querySelector('.aucune')
const loader = document.querySelector('.loader')
const voitures = [
    document.getElementById('v0'),
    document.getElementById('v1'),
    document.getElementById('v2'),
    document.getElementById('v3')
]

// elements DOM formulaire
const form = document.getElementById('form')

//recuperer les données du back
let dataTime
let id
let nombreVoiture = 4


const fetchBack = async () => {
    dataTime = await fetch('/voiture')
                .then(res => res.json())
}

//initialisation de la premiere valeur des dates
premierJour.value = today
premierJour.min = today


const tomorrowDate = (e) => {
    let day = new Date(e)
    day.setDate(day.getDate() + 1)
    let tomorrow = day.toISOString().split('T')[0]

    dernierJour.value = tomorrow
    dernierJour.min = tomorrow
}
tomorrowDate(today)

//changement des dates dans les input
premierJour.addEventListener('change', e => {
    tomorrowDate(e.target.value)
})

const voitureDispo = async (numVoiture, debut, fin) => {
    
    let indispo = 0

    dataTime[numVoiture].location.map(date => {
        
        if(debut < new Date(date.sortie) && fin < new Date(date.sortie) || debut > new Date(date.retour) && fin > new Date(date.retour)) return  
        else {
            indispo ++
        }
    })

    if(indispo === 0) {
        cartes.style.display = 'flex'
        voitures[numVoiture].style.display = 'flex'
        
        setTimeout(() => {
            voitures[numVoiture].style.opacity = '1'
            voitures[numVoiture].style.height = '110px'
        }, 50)
        selectedVoiture(numVoiture)
    } else {
        setTimeout(() => {
            voitures[numVoiture].style.opacity = '0'
            voitures[numVoiture].style.height = '0'
        }, 50)
    }
}

const selectedVoiture = (numVoiture) => {
    voitures[numVoiture].addEventListener('click', () => {
        id = dataTime[numVoiture]._id
        tout.style.display = 'none'
        form.style.display = 'flex'
        if(id === dataTime[numVoiture]._id) formAdd(id, dataTime[numVoiture].voiture)
        
    })
}

const calculTemps = async () => {
    await fetchBack()
//calcul du nombre de jour de location
    let debut = new Date(premierJour.value)
    let fin = new Date(dernierJour.value)
    
    let time = (fin - debut) / (1000*60*60*24)

    tempsDeLocation.innerText = (time > 1) ? time + " jours" : time + " jour" 

    for (let index = 0; index < nombreVoiture; index++) {
        voitureDispo(index, debut, fin)
    }
}


rechercher.addEventListener('click', () => {
    calculTemps()
    
})

// formulaire
const retour = () => {
    tout.style.display = 'flex'
    form.style.display = 'none'
    window.location.reload()
}

const genre = document.getElementsByName('genre')
const prenom = document.getElementById('input-prenom')
const nom = document.getElementById('input-nom')
const email = document.getElementById('input-email')
const tel = document.getElementById('input-tel')
const code = document.getElementById('input-code')
const ville = document.getElementById('input-ville')
const adresse = document.getElementById('input-adresse')
const naissance = document.getElementById('input-naissance')

const formAdd = async (id, modelVoiture) => {
    form.addEventListener('submit' , e => {
        e.preventDefault()
    
        genre.forEach(radio => {
            if(radio.checked) genre.value = radio.value
        })

        let object = {
                sortie: premierJour.value,
                retour: dernierJour.value,
                genre: genre.value,
                prenom: prenom.value,
                nom: nom.value,
                email: email.value,
                tel: tel.value,
                code: code.value,
                ville: ville.value,
                adresse: adresse.value,
                naissance: naissance.value
        }
        let myInit = {
            method: 'PATCH',
            body: JSON.stringify({
                location: [object],
                voiture: modelVoiture
            }),
            headers: {'Content-Type': 'application/json; charset=UTF-8'}
        }
        
          fetch(`/voiture/${id}`, myInit)
            .then(res => {
                if(res.ok) return res.json()
            })
            .then(data => {
                console.log(data)
            })

            setTimeout(() => {
                window.location.reload()
            }, 1000)


    })


}