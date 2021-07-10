# Phasmophobia Alexa Skill

Inoffizieller Alexa Skill zum Videospiel [Phasmophobia](https://store.steampowered.com/app/739630/Phasmophobia/). Frag Alexa zu den Geistern aus, frag um welchen Geist es sich anhand der gefundenen Beweise handeln könnte und lass dir alle Merkmale zu einem Geist aufzählen, um sie im Journal zu notieren.

- Prima für Leute, die allein spielen und während der Geisterjagd keine Zeit haben ins Journal zu schauen.
- Oder um in der Lobby auf die Informationen aus dem Journal zuzugreifen, was im Spiel selber nicht möglich ist. 

## Installation

Du findest den Skill im offiziellen [Alexa Skill Store](https://www.amazon.de/dp/B08M3T8W9Z/).

## Sprachbefehle

Der Platzhalter {GEIST} kann durch den Geisternamen (bspw. Phantom, Oni...) ersetzt werden. Der Platzhalter {BEWEIS} durch den Beweis, den du im Spiel gefunden hast (bspw. Fingerabdrücke, Geisterkugeln, EMF-Level 5...).

Zu jedem Sprachbefehl existieren diverse Variationen, die ich im Folgenden nicht alle aufliste.

**Beispiel:** `Alexa frag Geister Journal woran erkennt man {GEIST}`

**Variationen:**

```
...woran erkennt man den {GEIST}
...woran erkennt man die {GEIST}
...woran erkennt man das {GEIST}
...woran erkennt man einen {GEIST}
...woran erkennt man eine {GEIST}
...woran erkennt man ein {GEIST}
```

### 1. Geist identifizieren

Du hast einen Beweis gefunden und möchtest wissen welche Geister noch im Rennen sind? Frag Alexa welche Geister den jeweiligen Beweis hinterlassen.

```
Alexa frag Geister Journal welcher Geist macht {BEWEIS}
Alexa frag Geister Journal welcher Geist hat {BEWEIS}
Alexa frag Geister Journal welcher Geist hinterlässt {BEWEIS}
Alexa frag Geister Journal welcher Geist sorgt für {BEWEIS}
Alexa frag Geister Journal welcher Geist reagiert auf {BEWEIS}

Alexa frag Geister Journal welcher Geist spricht über die Geisterbox
Alexa frag Geister Journal welcher Geist schreibt ins Geisterbuch
Alexa frag Geister Journal welcher Geist schreibt in das Buch
Alexa frag Geister Journal welcher Geist schreibt in das Geisterbuch
Alexa frag Geister Journal welcher Geist schreibt ins Buch
```

**Beispiele:**

```
Alexa frag Geister Journal welcher Geist hinterlässt Fingerabdrücke?
Alexa frag Geister Journal welcher Geist reagiert auf die Geisterbox?
```

### 2. Drei Geister-Beweise

Du weißt welcher Geist sein Unwesen treibt? Alexa zählt dir die drei Beweise auf, die du in deinem Journal notieren musst.
```
Alexa sag Geister Journal es ist {GEIST}
Alexa sag Geister Journal ich habe {GEIST}
Alexa sag Geister Journal wir haben {GEIST}
```

**Beispiele:**

```
Alexa sag Geister Journal es ist das Phantom
Alexa sag Geister Journal wir haben einen Dämon
```

### 3. Geister-Beschreibung

Lass dir Stärken und Schwächen zum Geist erzählen.

```
Alexa frag Geister Journal woran erkennt man {GEIST}
Alexa frag Geister Journal was spricht für {GEIST}
Alexa frag Geister Journal was macht {GEIST} aus
Alexa frag Geister Journal Beschreibung {GEIST}
Alexa frag Geister Journal {GEIST}
```

**Beispiele:**

```
Alexa frag Geister Journal woran erkennt man die Banshee
Alexa frag Geister Journal was für ein Gespenst
Alexa frag Geister Journal Spirit
```
