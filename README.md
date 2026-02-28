# Portfolio — Chloe Halloin

Product Designer & Design Engineer. Je concois des produits et je les code.

**[chlohal.com](https://chlohal.com)**

---

## Le concept

Ce portfolio n'est pas juste une vitrine — c'est une demo vivante de mon adaptabilite sectorielle.

Le site propose **11 themes visuels** correspondant chacun a un secteur d'activite pour lequel j'ai travaille. Chaque theme applique sa propre palette de couleurs, ses typographies et son ambiance, tout en conservant la meme structure de contenu. L'idee : montrer que je sais m'approprier les codes graphiques de n'importe quelle industrie.

En mode par defaut, le site reste volontairement brut et minimal — un rendu markdown-like avec Inter et JetBrains Mono. Des qu'un secteur est selectionne, l'interface se transforme : cartes, bordures accent, pills, typographies sectorielles.

### Les secteurs

| Secteur | Typos | Ambiance |
|---------|-------|----------|
| Fleurs | Cormorant / Figtree | Peche chaud, brun elegant |
| Vin | Archivo Narrow / Poppins | Blanc pur, rouge vif |
| Boxe | Fjalla One / Nunito Sans | Noir profond, violet electrique |
| Real Estate | Montserrat / Poppins | Creme dore, tons chauds |
| Agence Media | Electrolize / Kanit | Gris sombre, rouge brique |
| Agence Digitale | Rubik / Zilla Slab | Beige clair, bleu vif |
| Artiste | Host Grotesk | Noir et blanc, monochrome |
| Production | Arial | Blanc, vert fluo |
| Doudou | Cormorant / Raleway | Peche doux, brun chaleureux |
| Bijoux | Playfair Display | Creme vert, noir luxe |
| Leisure | Inter | Bleu gaming |

## Fonctionnalites

- **Theming sectoriel dynamique** — changement de palette, typos et ambiance via le dropdown dans la nav
- **Dark mode** — toggle clair/sombre avec persistence localStorage
- **Tour guide** — introduction en 3 etapes pour les nouveaux visiteurs
- **CMS integre** — page `/admin` pour editer tout le contenu (hero, experiences, formation, competences, qualites)
- **Outils interactifs** — generateur de nom ninja, generateur de mot de passe, egg timer, book picker, jauge a cafe
- **Contenu data-driven** — tout le texte vient d'un fichier de donnees, modifiable via le CMS

## Stack technique

| | |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS + CSS custom properties (`--p-*`) |
| Composants UI | shadcn/ui + Radix |
| Icones | lucide-react |
| Fonts | Google Fonts (15 familles chargees a la demande) |
| Deploy | GitHub Pages |

## Structure

```
src/
  components/
    SectorNavigation.tsx   — dropdown de selection de secteur
    DarkModeToggle.tsx     — toggle clair/sombre
    InteractiveTools.tsx   — outils bonus (ninja, password, timer, book, coffee)
    ReadMeButton.tsx       — bouton flottant GitHub
    TutorialTour.tsx       — tour guide 3 etapes
  data/
    portfolio.ts           — types + donnees par defaut
    usePortfolioData.ts    — hook avec localStorage + JSON export
  pages/
    Index.tsx              — page principale
    Admin.tsx              — CMS protege par mot de passe
  styles/
    adaptive-portfolio.css — tout le CSS (palettes, immersion, layout)
```

## Lancer en local

```bash
npm install
npm run dev
```

## Contact

- **Email** — halloinchloe@gmail.com
- **LinkedIn** — [linkedin.com/in/chloe-halloin](https://www.linkedin.com/in/chlo%C3%A9-halloin/)
- **GitHub** — [github.com/ChloeHal](https://github.com/ChloeHal)
- **X** — [x.com/chlohal](https://x.com/chlohal)
