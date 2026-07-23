import { useState, useEffect } from "react";
import {
  Trash2,
  X,
  PlusCircle,
} from "lucide-react";

import SettingsPanel from "./SettingsPanel";
import CategoryItems from "./CategoryItems";
import CategoryCard from "./CategoryCard";
import ResetSection from "./ResetSection";

import { COLORS } from "../../data/colors";
import { FONT } from "../../data/fonts";

export default function ManageView({
  menu,
  settings,
  addCategory,
  deleteCategory,
  addItem,
  updateItem,
  deleteItem,
  persistSettings,
  confirmReset,
  setConfirmReset,
  resetEverything,
  storagePersistent,
}) {
  const [newCategory, setNewCategory] = useState("");
  const [drafts, setDrafts] = useState({});
  const [localSettings, setLocalSettings] = useState(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const draftFor = (cat) =>
    drafts[cat] || {
      name: "",
      price: "",
    };

  const setDraft = (cat, field, value) =>
    setDrafts((d) => ({
      ...d,
      [cat]: {
        ...draftFor(cat),
        [field]: value,
      },
    }));

  const submitNewItem = (cat) => {
    addItem(cat, draftFor(cat).name, draftFor(cat).price);

    setDrafts((d) => ({
      ...d,
      [cat]: {
        name: "",
        price: "",
      },
    }));
  };

  const submitNewCategory = () => {
    addCategory(newCategory);
    setNewCategory("");
  };

  return (
   <div className="space-y-6">
         <SettingsPanel
            localSettings={localSettings}
            setLocalSettings={setLocalSettings}
            persistSettings={persistSettings}
            storagePersistent={storagePersistent}
          />
   
         <div>
           <h2 style={{ fontFamily: FONT.display, color: COLORS.espresso }} className="text-2xl mb-3">Menu</h2>
           <div className="space-y-4">
             {Object.entries(menu).map(([cat, items]) => (
               <CategoryCard
                key={cat}
                category={cat}
                deleteCategory={deleteCategory}
              >
                <CategoryItems
                  cat={cat}
                  items={items}
                  updateItem={updateItem}
                  deleteItem={deleteItem}
                  draft={draftFor(cat)}
                  setDraft={setDraft}
                  submitNewItem={submitNewItem}
                />
              </CategoryCard>
             ))}
           </div>
   
           <div className="flex items-center gap-2 mt-3">
             <input
               placeholder="New category name"
               value={newCategory}
               onChange={(e) => setNewCategory(e.target.value)}
               onKeyDown={(e) => { if (e.key === 'Enter') submitNewCategory(); }}
               style={{ border: `1px solid ${COLORS.line}`, color: COLORS.ink }}
               className="flex-1 px-3 py-2 rounded-lg text-sm"
             />
             <button
               onClick={submitNewCategory}
               style={{ background: COLORS.espresso, color: COLORS.paper }}
               className="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 whitespace-nowrap"
             >
               <PlusCircle size={14} /> Add Category
             </button>
           </div>
         </div>
   
         <ResetSection
            confirmReset={confirmReset}
            setConfirmReset={setConfirmReset}
            resetEverything={resetEverything}
          />
       </div>
  );
}