document.addEventListener('DOMContentLoaded', () => {
    const storyTextElement = document.getElementById('story-text');
    const choicesContainerElement = document.getElementById('choices-container');
    const startButton = document.getElementById('start-button');

    let score = 0;
    let currentStep = 0;

    const gameData = [
        {
            type: 'story',
            text: [
                "Sa märkad, et su hea sõber Martin on viimasel ajal väga vait.",
                "Ta vaatab pidevalt oma telefoni ja näeb kurb välja.",
                "Lõpuks sa küsid temalt, mis lahti on.",
                "Martin näitab sulle vastumeelselt Instagrami profiili.",
                "Keegi on teinud libakonto, kasutades Martini nime ja pilte, ning postitab tema kohta alandavaid ja valesid lugusid."
            ]
        },
        {
            type: 'question',
            question: "Mis sa arvad, kuidas Martin ennast praegu tunneb?",
            choices: [
                { text: "Tõenäoliselt on ta lihtsalt natuke pahane. See on ju kõigest internet.", score: 0, feedback: "See on võimalik, aga tõenäoliselt on olukord tõsisem. Libakonto ründab tema identiteeti." },
                { text: "Ta tunneb ennast reedetuna, vihasena ja tal on piinlik.", score: 1, feedback: "Õige. Ta tunneb end emotsionaalselt rünnatuna ja tema enesehinnang kannatab." },
                { text: "Talle teeb see nalja, sest see on nii absurdne.", score: 0, feedback: "See on võimalik, aga tõenäoliselt on olukord tõsisem. Libakonto ründab tema identiteeti." }
            ]
        },
        {
            type: 'question',
            question: "Martin küsib: 'Mida ma tegema peaksin?' Mis on sinu esimene reaktsioon?",
            choices: [
                { text: "Saame kohe teada, kes see on ja kirjutame talle vihase sõnumi vastu!", score: 0, feedback: "See võib olukorda eskaleerida ja kiusajaid just julgustada." },
                { text: "Ära tee midagi. Lihtsalt ignoreeri, küll nad tüdinevad ära.", score: 0, feedback: "Ignoreerimine annab kiusajatele signaali, et nad võivad jätkata. See pole hea lahendus." },
                { text: "Rahulikult. Ära vasta neile. Esmane asi on koguda tõendeid (teha ekraanipilte) ja olukord fikseerida.", score: 1, feedback: "Väga hea! Emotsioonide ajel tegutsemine või ignoreerimine teeb asja tihti hullemaks. Tõendite kogumine on kriitiline." }
            ]
        },
        {
            type: 'story',
            text: ["<hr>Nüüd tuleb koostada lahendusplaan..."]
        },
        {
            type: 'question',
            question: "Keda te peaksite olukorrast teavitama?",
            choices: [
                { text: "Teatame kohe Instagramile (platvormile) sellest kontost.", score: 1, feedback: "See on hea samm, aga Martin vajab ka emotsionaalset tuge, mida täiskasvanud saavad pakkuda." },
                { text: "Räägime Martini vanematega ja/või kooli sotsiaalpedagoogi või psühholoogiga.", score: 1, feedback: "See on oluline, aga konto eemaldamine on samuti tähtis. Mõlemat on vaja teha." },
                { text: "Mõlemad eelnevad on vajalikud sammud.", score: 2, feedback: "Suurepärane! Platvormi teavitamine aitab konto eemaldada ja täiskasvanute kaasamine pakub Martinile tuge." }
            ]
        },
        {
            type: 'question',
            question: "Kuidas saaks Martin end tulevikus paremini kaitsta?",
            choices: [
                { text: "Kustutab kõik oma sotsiaalmeedia kontod ära.", score: 0, feedback: "Enese isoleerimine või provotseerimine pole jätkusuutlikud lahendused." },
                { text: "Muudab oma kontod privaatseks ja vaatab üle, keda ta sõbralisti lisab.", score: 1, feedback: "See on tark tegu. Privaatsusseaded on oluline osa ennetustööst." },
                { text: "Postitab endast veel rohkem pilte, et näidata, et teda ei huvita.", score: 0, feedback: "Enese isoleerimine või provotseerimine pole jätkusuutlikud lahendused." }
            ]
        },
        {
            type: 'story',
            text: [
                "<hr><h2>Uus areng</h2>",
                "Tänu kooli sekkumisele ja Instagrami abile eemaldatakse libakonto kiiresti.",
                "Selgub, et konto taga oli teie klassivend Karl, kes oli Martini peale kade tema heade hinnete pärast.",
                "Karl kutsutakse koos vanematega vestlusele ja ta kahetseb oma tegu sügavalt."
            ]
        },
        {
            type: 'question',
            question: "Karl tuleb sinu ja Martini juurde ja palub vabandust. Mida te teete?",
            choices: [
                { text: "Nõuame, et ta vabandaks terve klassi ees. Alles siis mõtleme andestamise peale.", score: 1, feedback: "Avalik vabandus võib olla osa lahendusest, aga see võib Karli jaoks olla alandav ja ei pruugi aidata tal oma tegude algpõhjustega tegeleda." },
                { text: "Räägime temaga rahulikult. Proovime mõista, miks ta nii tegi, ja selgitame, kui palju haiget see tegi.", score: 2, feedback: "See on väga küps ja empaatiline lähenemine. Te aitate lõhkuda kiusamise tsüklit." },
                { text: "Ütleme, et me ei taha temaga enam kunagi rääkida. Sellist asja ei saa andeks anda.", score: 0, feedback: "Viha ja vältimine on mõistetav reaktsioon, aga siin on oluline leida viis, kuidas olukord klassis lahendada." }
            ]
        },
        {
            type: 'result',
        }
    ];

    function typeWriter(text, i = 0) {
        if (i < text.length) {
            storyTextElement.innerHTML += text.charAt(i);
            setTimeout(() => typeWriter(text, i + 1), 25);
        }
    }
    
    async function showTexts(lines) {
        choicesContainerElement.innerHTML = '';
        storyTextElement.innerHTML = '';
        for (const line of lines) {
            storyTextElement.innerHTML += line + "<br><br>";
            await new Promise(resolve => setTimeout(resolve, 800));
        }
        // Loo "Jätka" nupp pärast tekstide kuvamist
        const continueButton = document.createElement('button');
        continueButton.innerHTML = 'Jätka';
        continueButton.id = 'continue-button';
        continueButton.addEventListener('click', () => {
            currentStep++;
            renderStep();
        });
        choicesContainerElement.appendChild(continueButton);
    }

    function renderStep() {
        if (currentStep >= gameData.length) return;

        const step = gameData[currentStep];
        storyTextElement.innerHTML = '';

        if (step.type === 'intro' || step.type === 'story') {
            showTexts(step.text);
        } else if (step.type === 'question') {
            storyTextElement.innerHTML = `<h2>${step.question}</h2>`;
            choicesContainerElement.innerHTML = '';
            step.choices.forEach(choice => {
                const button = document.createElement('button');
                button.innerHTML = choice.text;
                button.addEventListener('click', () => handleChoice(choice, step.choices));
                choicesContainerElement.appendChild(button);
            });
        } else if (step.type === 'result') {
            showResult();
        }
    }
    
    function handleChoice(selectedChoice, allChoices) {
        score += selectedChoice.score;
        
        storyTextElement.innerHTML += `<br><p class="feedback-text"><em>${selectedChoice.feedback}</em></p>`;
        
        const buttons = choicesContainerElement.querySelectorAll('button');
        buttons.forEach((button, index) => {
            button.disabled = true;
            if (allChoices[index].score > 0 && (allChoices[index].score === Math.max(...allChoices.map(c => c.score)))) {
                 button.classList.add('feedback-correct');
            } else if (button.innerHTML === selectedChoice.text) {
                 button.classList.add('feedback-incorrect');
            }
        });

        // Oota natuke, et kasutaja näeks tagasisidet, siis näita "Jätka" nuppu
        setTimeout(() => {
            const continueButton = document.createElement('button');
            continueButton.innerHTML = 'Jätka';
            continueButton.id = 'continue-button';
            continueButton.addEventListener('click', () => {
                currentStep++;
                renderStep();
            });
            choicesContainerElement.appendChild(continueButton);
        }, 1500);
    }

    function showResult() {
        let resultText;
        if (score >= 6) {
            resultText = `
                <h2>Suurepärane!</h2>
                <p>Sinu plaan oli läbimõeldud, empaatiline ja tasakaalukas. Sa aitasid Martinil olukorda analüüsida, leidsid praktilised lahendused, kaasasid tugivõrgustiku ja näitasid üles mõistmist ka kiusaja suhtes. Martin tunneb end tänu sinule turvalisemalt ja olukord lahenes konstruktiivselt.</p>
            `;
        } else if (score >= 4) {
            resultText = `
                <h2>Hästi tehtud!</h2>
                <p>Sa tegid palju õigeid valikuid, näiteks kogusid tõendeid ja teavitasid täiskasvanuid. Mõtle veel sellele, kuidas tulla toime konflikti lahendamisega pärast kiusamise lõppemist. Empaatia ja mõistmine on võtmetähtsusega, et vältida viha ja kibestumise tekkimist.</p>
            `;
        } else {
            resultText = `
                <h2>Algus oli konarlik.</h2>
                <p>Sinu esmased reaktsioonid võisid olla liiga emotsionaalsed või ignoreerivad. Kiusamise puhul on oluline reageerida rahulikult, koguda tõendeid ja alati kaasata usaldusväärne täiskasvanu. Ka pärast probleemi lahenemist on oluline leida konstruktiivne tee edasi. Ära karda abi küsida!</p>
            `;
        }
        
        storyTextElement.innerHTML = `
            <h1>TULEMUSTE ANALÜÜS</h1>
            <p><strong>Sinu lahendusplaani skoor: ${score} / 7</strong></p>
            ${resultText}
            <br>
            <button onclick="location.reload()">Mängi uuesti</button>
        `;
        choicesContainerElement.innerHTML = '';
    }

    startButton.addEventListener('click', () => {
        startButton.style.display = 'none';
        renderStep();
    });
});
