import time

def print_aeglaselt(tekst):
    """Prindib teksti trükimasina efektiga."""
    for taht in tekst:
        print(taht, end='', flush=True)
        time.sleep(0.03)
    print()

def tee_valik(kysimus, valikud):
    """
    Esitab mängijale küsimuse ja valikud.
    Tagastab valitud vastuse indeksi (nt 1, 2, 3).
    """
    print_aeglaselt("\n" + kysimus)
    for i, valik in enumerate(valikud, 1):
        print(f"  {i}. {valik}")
    
    while True:
        try:
            vastus = int(input("Vali number (1, 2, 3...): "))
            if 1 <= vastus <= len(valikud):
                return vastus
            else:
                print("Palun vali number antud valikute hulgast.")
        except ValueError:
            print("Vigane sisend. Palun sisesta ainult number.")

def alusta_mangu():
    """Mängu põhiosa."""
    skoor = 0

    # --- Sissejuhatus (Plokk 1: Teema valik) ---
    print_aeglaselt("="*30)
    print_aeglaselt("   OLUKORRA LAHENDAMISE MÄNG   ")
    print_aeglaselt("="*30)
    print_aeglaselt("Sinu ülesanne on aidata sõpra, kes on sattunud raskesse olukorda.")
    print_aeglaselt("\nTeema: Küberkiusamine (Punkt 1a)")
    print_aeglaselt("...")
    time.sleep(1)

    # --- Stsenaarium ja Analüüs (Plokk 2) ---
    print_aeglaselt("Sa märkad, et su hea sõber Martin on viimasel ajal väga vait.")
    print_aeglaselt("Ta vaatab pidevalt oma telefoni ja näeb kurb välja.")
    print_aeglaselt("Lõpuks sa küsid temalt, mis lahti on.")
    print_aeglaselt("Martin näitab sulle vastumeelselt Instagrami profiili.")
    print_aeglaselt("Keegi on teinud libakonto, kasutades Martini nime ja pilte, ning postitab tema kohta alandavaid ja valesid lugusid.")

    # Plokk 2: Kuidas ohver tunneb ennast?
    vastus1 = tee_valik(
        "Mis sa arvad, kuidas Martin ennast praegu tunneb? (Plokk 2: Ohvri enesetunne)",
        [
            "Tõenäoliselt on ta lihtsalt natuke pahane. See on ju kõigest internet.",
            "Ta tunneb ennast reedetuna, vihasena ja tal on piinlik.",
            "Talle teeb see nalja, sest see on nii absurdne."
        ]
    )
    if vastus1 == 2:
        print_aeglaselt("-> Õige. Ta tunneb end emotsionaalselt rünnatuna ja tema enesehinnang kannatab.")
        skoor += 1
    else:
        print_aeglaselt("-> See on võimalik, aga tõenäoliselt on olukord tõsisem. Libakonto ründab tema identiteeti.")

    # Plokk 2: Kuidas reageerida?
    vastus2 = tee_valik(
        "Martin küsib: 'Mida ma tegema peaksin?' Mis on sinu esimene reaktsioon? (Plokk 2: Kuidas reageerida?)",
        [
            "Saame kohe teada, kes see on ja kirjutame talle vihase sõnumi vastu!",
            "Ära tee midagi. Lihtsalt ignoreeri, küll nad tüdinevad ära.",
            "Rahulikult. Ära vasta neile. Esmane asi on koguda tõendeid (teha ekraanipilte) ja olukord fikseerida."
        ]
    )
    if vastus2 == 3:
        print_aeglaselt("-> Väga hea! Emotsioonide ajel tegutsemine või ignoreerimine teeb asja tihti hullemaks. Tõendite kogumine on kriitiline.")
        skoor += 1
    elif vastus2 == 1:
        print_aeglaselt("-> See võib olukorda eskaleerida ja kiusajaid just julgustada.")
    else:
        print_aeglaselt("-> Ignoreerimine annab kiusajatele signaali, et nad võivad jätkata. See pole hea lahendus.")

    # --- Lahendusplaan (Plokk 3) ---
    print_aeglaselt("\nNüüd tuleb koostada lahendusplaan (Plokk 3)...")
    
    # Plokk 3: Kellega võtta ühendust?
    vastus3 = tee_valik(
        "Keda te peaksite olukorrast teavitama? (Plokk 3: Abisaamise sammud)",
        [
            "Teatame kohe Instagramile (platvormile) sellest kontost.",
            "Räägime Martini vanematega ja/või kooli sotsiaalpedagoogi või psühholoogiga.",
            "Mõlemad eelnevad (A ja B) on vajalikud sammud."
        ]
    )
    if vastus3 == 3:
        print_aeglaselt("-> Suurepärane! Platvormi teavitamine aitab konto eemaldada ja täiskasvanute kaasamine pakub Martinile tuge.")
        skoor += 2 # See on parim vastus
    elif vastus3 == 1:
        print_aeglaselt("-> See on hea samm, aga Martin vajab ka emotsionaalset tuge, mida täiskasvanud saavad pakkuda.")
        skoor += 1
    else:
        print_aeglaselt("-> See on oluline, aga konto eemaldamine on samuti tähtis. Mõlemat on vaja teha.")
        skoor += 1

    # Plokk 3: Tuleviku ennetamine
    vastus4 = tee_valik(
        "Kuidas saaks Martin end tulevikus paremini kaitsta? (Plokk 3: Tuleviku ennetamine)",
        [
            "Kustutab kõik oma sotsiaalmeedia kontod ära.",
            "Muudab oma kontod privaatseks ja vaatab üle, keda ta sõbralisti lisab.",
            "Postitab endast veel rohkem pilte, et näidata, et teda ei huvita."
        ]
    )
    if vastus4 == 2:
        print_aeglaselt("-> See on tark tegu. Privaatsusseaded on oluline osa ennetustööst.")
        skoor += 1
    else:
        print_aeglaselt("-> Enese isoleerimine või provotseerimine pole jätkusuutlikud lahendused.")

    # --- Uus areng (Plokk 3.5) ---
    print_aeglaselt("\n" + "~-"*15)
    print_aeglaselt("   UUS ARENG   ")
    print_aeglaselt("~-"*15)
    time.sleep(1)
    print_aeglaselt("\nTänu kooli sekkumisele ja Instagrami abile eemaldatakse libakonto kiiresti.")
    print_aeglaselt("Selgub, et konto taga oli teie klassivend Karl, kes oli Martini peale kade tema heade hinnete pärast.")
    print_aeglaselt("Karl kutsutakse koos vanematega vestlusele ja ta kahetseb oma tegu sügavalt.")
    
    vastus5 = tee_valik(
        "Karl tuleb sinu ja Martini juurde ja palub vabandust. Mida te teete? (Plokk 3.5: Leppimine)",
        [
            "Nõuame, et ta vabandaks terve klassi ees. Alles siis mõtleme andestamise peale.",
            "Räägime temaga rahulikult. Proovime mõista, miks ta nii tegi, ja selgitame, kui palju haiget see tegi. Soovitame tal rääkida koolipsühholoogiga, et oma kadedusega toime tulla.",
            "Ütleme, et me ei taha temaga enam kunagi rääkida. Sellist asja ei saa andeks anda."
        ]
    )
    if vastus5 == 2:
        print_aeglaselt("-> See on väga küps ja empaatiline lähenemine. Te aitate lõhkuda kiusamise tsüklit ja pakute lahenduse, mis aitab kõigil edasi liikuda.")
        skoor += 2
    elif vastus5 == 1:
        print_aeglaselt("-> Avalik vabandus võib olla osa lahendusest, aga see võib Karli jaoks olla alandav ja ei pruugi aidata tal oma tegude algpõhjustega tegeleda. Oluline on ka mõistmine.")
        skoor += 1
    else:
        print_aeglaselt("-> Viha ja vältimine on mõistetav reaktsioon, aga siin on oluline leida viis, kuidas olukord klassis lahendada ja edasi liikuda.")

    # --- Tulemuste esitlus (Plokk 4) ---
    print_aeglaselt("\n" + "="*30)
    print_aeglaselt("   TULEMUSTE ANALÜÜS (Plokk 4)   ")
    print_aeglaselt("="*30)
    print_aeglaselt(f"Sinu lahendusplaani skoor: {skoor} / 7")

    if skoor >= 6:
        print_aeglaselt("Suurepärane! Sinu plaan oli läbimõeldud, empaatiline ja tasakaalukas.")
        print_aeglaselt("Sa aitasid Martinil olukorda analüüsida, leidsid praktilised lahendused,")
        print_aeglaselt("kaasasid tugivõrgustiku ja näitasid üles mõistmist ka kiusaja suhtes.")
        print_aeglaselt("Martin tunneb end tänu sinule turvalisemalt ja olukord lahenes konstruktiivselt.")
    elif skoor >= 4:
        print_aeglaselt("Hästi tehtud! Sa tegid palju õigeid valikuid, näiteks kogusid tõendeid ja teavitasid täiskasvanuid.")
        print_aeglaselt("Mõtle veel sellele, kuidas tulla toime konflikti lahendamisega pärast kiusamise lõppemist.")
        print_aeglaselt("Empaatia ja mõistmine on võtmetähtsusega, et vältida viha ja kibestumise tekkimist.")
    else:
        print_aeglaselt("Algus oli konarlik. Sinu esmased reaktsioonid võisid olla liiga emotsionaalsed või ignoreerivad.")
        print_aeglaselt("Kiusamise puhul on oluline reageerida rahulikult, koguda tõendeid ja alati kaasata")
        print_aeglaselt("usaldusväärne täiskasvanu. Ka pärast probleemi lahenemist on oluline leida konstruktiivne tee edasi.")
        print_aeglaselt("Ära karda abi küsida!")

    print_aeglaselt("\nMäng lõppes.")

# Käivitame mängu
if __name__ == "__main__":
    alusta_mangu()