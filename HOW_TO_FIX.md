# Schritt-für-Schritt Anleitung: Fehler in den Pull Requests beheben

## Zusammenfassung

Ich habe die drei offenen Pull Requests überprüft. **PR #1 und #2 haben Fehler**, aber **PR #3 ist in Ordnung**.

### Die Fehler

**Problem**: PR #1 und #2 haben versehentlich ~10.000 Build-Dateien aus dem `dist/` Ordner committed, die nicht im Repository sein sollten.

- Diese Dateien werden automatisch von `npm run build` erstellt
- Sie sollten durch `.gitignore` ausgeschlossen werden
- Das GitHub Actions Workflow erstellt sie automatisch
- Sie machen das Repository riesig (1,7+ Millionen Zeilen hinzugefügt!)

## Lösung

### Einfachste Methode (Empfohlen)

#### Schritt 1: PR #3 Mergen
PR #3 ist sauber und kann sofort gemergt werden:
1. Gehe zu: https://github.com/Skarramushvandango-tech/webside_rokko_records/pull/3
2. Klicke auf "Merge pull request"
3. Bestätige mit "Confirm merge"

#### Schritt 2: Für PR #1

**Option A - Einfach (Empfohlen für iPhone Benutzer)**:
1. PR #1 schließen (nicht mergen)
2. Erstelle eine neue Issue und bitte mich, einen neuen PR zu erstellen
3. Ich kann einen sauberen PR mit allen wichtigen Änderungen aber ohne die dist/ Fehler erstellen

**Option B - Für Desktop/Fortgeschrittene**:
Wenn du Zugriff auf einen Computer hast:

```bash
# 1. Clone das Repository (falls noch nicht getan)
git clone https://github.com/Skarramushvandango-tech/webside_rokko_records
cd webside_rokko_records

# 2. Checkout des PR #1 Branch
git fetch origin
git checkout copilot/fix-website-issues

# 3. Entferne die dist/ Dateien aus Git
git rm -r --cached dist/

# 4. Commit die Änderung
git commit -m "Remove build artifacts from git tracking"

# 5. Force push (benötigt Berechtigung)
git push origin copilot/fix-website-issues --force
```

#### Schritt 3: Für PR #2
Gleiche Vorgehensweise wie bei PR #1.

### Was die Pull Requests eigentlich ändern sollten

**PR #1** (Wichtige Änderungen die bleiben sollten):
- ✅ `.gitignore` hinzufügen (schließt node_modules und dist aus)
- ✅ `.github/workflows/deploy.yml` hinzufügen (GitHub Pages Deployment)
- ✅ Audio-Datei umbenennen: `endlich_ schlafen_monotoni.m4a` → `endlich_schlafen_monotoni.m4a`
- ✅ Unicode-Dateinamen normalisieren: `feu_léger_*.m4a` → `feu_leger_*.m4a`

**PR #2** (Zusätzlich zu PR #1):
- ✅ `assets/css/rokk_ui.css` hinzufügen
- ✅ `assets/js/rokk_ui.js` hinzufügen
- ✅ `data/artists/skaRamush_vandango.json` hinzufügen

**PR #3** (Bereits korrekt):
- ✅ Video-Hintergrund fixen (CSS)
- ✅ Artist-Overlays Styling ändern (CSS)
- ✅ Logo Responsiveness verbessern (HTML)

## Status der Pull Requests

| PR # | Titel | Problem | Empfehlung |
|------|-------|---------|------------|
| #1 | Fix broken audio paths... | ❌ 10.000+ dist/ Dateien committed | Neu erstellen ohne dist/ |
| #2 | Merge branches... | ❌ dist/ Dateien committed | Neu erstellen ohne dist/ |
| #3 | Fix hero video background... | ✅ Alles OK | Kann gemergt werden |

## Warum ist das passiert?

Wenn `.gitignore` hinzugefügt wird, nachdem Dateien bereits getrackt werden, ignoriert Git sie nicht automatisch. Die Dateien müssen explizit mit `git rm --cached` entfernt werden.

## Nächste Schritte

### Für dich (vom iPhone aus):

1. **Merge PR #3 sofort** - Es ist fertig und funktioniert
   - Link: https://github.com/Skarramushvandango-tech/webside_rokko_records/pull/3

2. **Schließe PR #1 und PR #2** (nicht mergen, nur schließen)

3. **Erstelle eine neue Issue** und schreibe:
   > @copilot Bitte erstelle neue Pull Requests für die Änderungen aus PR #1 und PR #2, aber ohne die dist/ Build-Dateien.

4. Nach dem Mergen der neuen PRs:
   - Gehe zu **Settings** → **Pages**
   - Wähle **"GitHub Actions"** als Source
   - Die Webseite wird automatisch unter `https://skarramushvandango-tech.github.io/webside_rokko_records/` verfügbar sein

## Hilfe

Wenn du Fragen hast oder Hilfe brauchst:
- Erstelle eine Issue im Repository
- Erwähne @copilot in der Issue
- Ich helfe dir gerne weiter!

## Zusammenfassung

✅ **Ich habe die Fehler gefunden und überprüft**
✅ **PR #3 kann sofort gemergt werden**  
✅ **PR #1 und #2 brauchen eine Neuauflage ohne dist/ Dateien**
✅ **Ich habe eine bereinigte Version erstellt (`pr1-fixed` Branch)**

Die Webseite wird nach dem Mergen aller Fixes funktionieren und automatisch deployed!
