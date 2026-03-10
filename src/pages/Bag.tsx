import {
  Laptop,
  Smartphone,
  NotebookPen,
  BookOpen,
  BookMarked,
  TabletSmartphone,
  Headphones,
  Bluetooth,
  PocketKnife,
  Flame,
  GlassWater,
  Wallet,
  Wrench,
  Cross,
  Clover,
  Scissors,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface BagItem {
  name: string;
  detail: string;
  icon: LucideIcon;
}

interface BagCategory {
  name: string;
  items: BagItem[];
}

const CATEGORIES: BagCategory[] = [
  {
    name: "Toujours sur moi",
    items: [
      { name: "MacBook Air M1", detail: "Ami fidèle qu'il faudra changer un jour — mais pas tant qu'il est en vie", icon: Laptop },
      { name: "iPhone 13 Mini", detail: "Le dernier à avoir eu droit à une version mini. RIP", icon: Smartphone },
      { name: "Leuchtturm1917", detail: "Mon cerveau externalisé — mélange de briefs, d'éclairs de génie et de choses que j'aurais pu juste mettre dans Notion", icon: NotebookPen },
      { name: "Carnet de lectures", detail: "Né d'une bonne résolution et d'une envie de romancer ma vie devant un café le dimanche matin", icon: BookOpen },
      { name: "Un livre", detail: "J'adore être \"la fille qui a toujours un livre sur elle\" — en ce moment : Les Contemplées (màj mars 2025)", icon: BookMarked },
      { name: "Kobo Clara B&W", detail: "Pour 2 minutes on ne sort pas une brique, mais la liseuse est toujours accessible", icon: TabletSmartphone },
      { name: "Écouteurs filaires", detail: "Mon quota de nostalgie", icon: Headphones },
      { name: "AirPods", detail: "Le son est objectivement meilleur, j'ai capitulé", icon: Bluetooth },
    ],
  },
  {
    name: "Le fond du sac",
    items: [
      { name: "Canif", detail: "J'adore être la personne qui dit \"bien sûr j'ai ça dans mon sac\"", icon: PocketKnife },
      { name: "Briquet", detail: "Même sans être fumeuse, ça sert toujours — et au pire ça aide les potes", icon: Flame },
      { name: "Gourde", detail: "Ma résolution qui tient le plus longtemps", icon: GlassWater },
      { name: "Portefeuille", detail: "Collectionne les tickets inutiles mais perd bizarrement les garanties", icon: Wallet },
      { name: "Clef de vélo", detail: "À vélo, Bruxelles tient dans une poche", icon: Wrench },
      { name: "Sparadrap", detail: "Ça peut toujours aider", icon: Cross },
      { name: "Porte-bonheur", detail: "Un objet dont je n'ai pas trouvé d'utilité, donc je lui ai attribué ce rôle", icon: Clover },
      { name: "Échantillons de tissus", detail: "Pour acheter le fil de la bonne couleur, parce que la couleur sur écran ment toujours", icon: Scissors },
    ],
  },
];

const Bag = () => {
  return (
    <>
      <section className="bag-section" aria-label="What's in my bag">
        <h2 className="section-title">What's in my bag</h2>
        <p className="section-intro">
          Le contenu réel de mon sac, à tout moment.
        </p>

        <div className="bag-grid">
          {CATEGORIES.map((category) => (
            <div key={category.name} className="bag-category">
              <h3 className="bag-category-title">{category.name}</h3>
              <ul className="bag-list">
                {category.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.name} className="bag-item">
                      <Icon size={15} aria-hidden="true" className="bag-icon" />
                      <div className="bag-info">
                        <span className="bag-name">{item.name}</span>
                        <span className="bag-detail">{item.detail}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Bag;
