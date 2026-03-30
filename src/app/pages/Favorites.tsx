import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import {
  ChevronLeft,
  Heart,
  BookOpen,
  Search,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  Share,
  Package,
} from "lucide-react";
import { useProfile } from "../context/ProfileContext";
import { SaveProduct } from "../components/others/SaveProduct";
import { toast } from "sonner";
import { ARTICLES } from "../components/articles/articleData";
import foodData from "../lib/dicData";

export function Favorites() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { favorites, toggleFavorite, updateFavorite } = useProfile();

  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [selectedStore, setSelectedStore] = useState<string | null>(null);

  const currentLang = i18n.language?.startsWith("en") ? "en" : "da";
  const currentArticles = ARTICLES[currentLang];

  const favoritedArticles = currentArticles.filter((article) =>
    favorites.some((fav) =>
      typeof fav === "object" ? fav.id === article.id : fav === article.id,
    ),
  );

  const favoritedFoods = foodData.filter((food) =>
    favorites.some((fav) =>
      typeof fav === "object" ? fav.id === food.id : fav === food.id,
    ),
  );

  const savedProducts = favorites.filter(
    (fav: any) => typeof fav === "object" && fav.type === "product",
  );

  const uniqueStores = useMemo(() => {
    const stores = savedProducts
      .map((p: any) => p.store)
      .filter(
        (store): store is string => Boolean(store) && store.trim() !== "",
      );
    return Array.from(new Set(stores));
  }, [savedProducts]);

  const filteredProducts = useMemo(() => {
    if (!selectedStore) return savedProducts;
    return savedProducts.filter((p: any) => p.store === selectedStore);
  }, [savedProducts, selectedStore]);

  const handleHeartClick = (e: React.MouseEvent, item: any) => {
    e.stopPropagation();
    toggleFavorite(item);
  };

  const handleEditSave = async (
    productName: string,
    storeName: string,
    notes: string,
    currentPreview: string | null,
  ) => {
    if (editingProduct) {
      const updated = {
        ...editingProduct,
        productName,
        store: storeName,
        notes,
        image: currentPreview,
      };
      await updateFavorite(updated);
    }
    setEditingProduct(null);
  };

  const handleShare = async () => {
    const listText = savedProducts
      .map(
        (p: any) =>
          `- ${p.productName}${p.store ? ` (${p.store})` : ""}${
            p.notes ? `: ${p.notes}` : ""
          }`,
      )
      .join("\n");

    const introText = t("favorites.share_intro");
    const fullText = introText + "\n\n" + listText;

    if (navigator.share) {
      try {
        await navigator.share({
          title: t("favorites.share_title"),
          text: fullText,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      navigator.clipboard.writeText(fullText);
      toast.success(t("favorites.list_copied"));
    }
  };

  const hasFavorites =
    favoritedArticles.length > 0 ||
    favoritedFoods.length > 0 ||
    savedProducts.length > 0;

  return (
    <div className="bg-white">
      <div className="bg-white px-6 pt-[calc(env(safe-area-inset-top))] pb-6 sticky top-0 z-20 border-b border-slate-100">
        {" "}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              {t("favorites.title")}
            </h1>
            <p className="text-slate-500 mt-2 font-medium">
              {t("favorites.subtitle")}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-slate-700 pr-1" />
            </button>

            {savedProducts.length > 0 && (
              <button
                onClick={handleShare}
                className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center transition-colors"
              >
                <Share className="w-5 h-5 text-slate-700" />
              </button>
            )}
          </div>
        </div>
        {uniqueStores.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedStore(null)}
              className={`px-4 py-2 rounded-full border-2 transition-all text-sm font-medium flex items-center gap-1 ${
                !selectedStore
                  ? "bg-slate-900 border-slate-900 text-white"
                  : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
              }`}
            >
              {t("favorites.filter_all")}
            </button>
            {uniqueStores.map((store) => {
              const isSelected = selectedStore === store;
              return (
                <button
                  key={store}
                  type="button"
                  onClick={() => setSelectedStore(store)}
                  className={`px-4 py-2 rounded-full border-2 transition-all text-sm font-medium flex items-center gap-1 ${
                    isSelected
                      ? "bg-slate-900 border-slate-900 text-white"
                      : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  {store}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="px-6 py-8 space-y-10">
        {!hasFavorites ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-[32px] flex items-center justify-center mb-6 border border-slate-100">
              <Heart className="w-8 h-8 text-slate-200" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              {t("favorites.no_favorites")}
            </h2>
          </div>
        ) : (
          <>
            {filteredProducts.length > 0 && (
              <section>
                <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-5 ml-1">
                  {t("favorites.section_products")} ({filteredProducts.length})
                </h2>
                <div className="space-y-4">
                  {filteredProducts.map((product: any) => (
                    <div
                      key={product.id}
                      onClick={() => setEditingProduct(product)}
                      className="bg-white border-2 border-slate-100 rounded-[24px] p-4 flex items-center gap-4"
                    >
                      {product.image && (
                        <div className="w-16 h-16 bg-slate-50 rounded-2xl overflow-hidden flex-shrink-0 border border-slate-100">
                          <img
                            src={product.image}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-slate-950 font-bold text-base truncate">
                            {product.productName}
                          </h3>
                          {product.productType === "OTHER" ? (
                            <Package className="w-4 h-4 text-slate-500 shrink-0" />
                          ) : product.isSafe ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 text-slate-500">
                          <MapPin size={12} className="shrink-0" />
                          <p className="text-xs font-semibold truncate uppercase tracking-wider">
                            {product.store || t("favorites.unknown_store")}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={(e) => handleHeartClick(e, product)}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-red-50"
                      >
                        <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {!selectedStore && favoritedFoods.length > 0 && (
              <section>
                <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-5 ml-1">
                  {t("favorites.section_ingredients")} ({favoritedFoods.length})
                </h2>
                <div className="space-y-3">
                  {favoritedFoods.map((food) => (
                    <div
                      key={food.id}
                      onClick={() => navigate("/guide")}
                      className="bg-slate-50/50 border-2 border-slate-100 rounded-[24px] p-4 flex items-center gap-4 active:scale-[0.98] transition-all"
                    >
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 border border-slate-100">
                        <Search className="w-5 h-5 text-slate-900" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-slate-950 font-bold text-base truncate capitalize">
                          {t(
                            `ingredients.${food.kategori.toLowerCase()}`,
                            food.kategori,
                          )}
                        </h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-tight">
                          {t("favorites.type_dictionary")}
                        </p>
                      </div>
                      <button
                        onClick={(e) => handleHeartClick(e, food.id)}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-red-50"
                      >
                        <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {!selectedStore && favoritedArticles.length > 0 && (
              <section>
                <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-5 ml-1">
                  {t("favorites.section_articles")} ({favoritedArticles.length})
                </h2>
                <div className="space-y-4">
                  {favoritedArticles.map((article) => (
                    <div
                      key={article.id}
                      onClick={() => navigate(`/article/${article.id}`)}
                      className="bg-white border-2 border-slate-100 rounded-[24px] p-5 flex items-center gap-4 active:scale-[0.98] transition-all"
                    >
                      <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-6 h-6 text-slate-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-slate-950 font-bold text-base truncate">
                          {article.title}
                        </h3>
                        <p className="text-slate-500 text-sm font-medium mt-0.5 line-clamp-1">
                          {article.excerpt}
                        </p>
                      </div>
                      <button
                        onClick={(e) => handleHeartClick(e, article.id)}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-red-50"
                      >
                        <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>

      <SaveProduct
        isOpen={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        onSave={handleEditSave}
        initialData={editingProduct}
      />
    </div>
  );
}
