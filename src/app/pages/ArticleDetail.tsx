import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { ChevronLeft, Share, ChevronUp, Heart } from "lucide-react";
import { ImageWithFallback } from "../components/ImageWithFallback";
import { ARTICLES } from "../components/articles/articleData";
import { useProfile } from "../context/ProfileContext";

export function ArticleDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { favorites, toggleFavorite } = useProfile();

  const currentLang = i18n.language?.startsWith("en") ? "en" : "da";
  const currentArticles = ARTICLES[currentLang];

  const article = currentArticles.find((a) => a.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-slate-500 mb-4">{t("article_not_found")}</p>
        <button
          onClick={() => navigate("/")}
          className="text-blue-600 font-semibold"
        >
          {t("go_back")}
        </button>
      </div>
    );
  }

  const isFavorite = favorites.includes(article.id);

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md px-4 py-4 flex items-center justify-between border-b border-slate-100">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-slate-700 pr-1" />
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleFavorite(article.id)}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
              isFavorite ? "bg-red-50" : "bg-slate-100"
            }`}
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? "fill-red-500 text-red-500" : "text-slate-700"
              }`}
            />
          </button>

          <button className="w-10 h-10 flex items-center justify-center bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
            <Share className="w-5 h-5 text-slate-700" />
          </button>
        </div>
      </div>

      <div className="w-full h-72 relative">
        <ImageWithFallback
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="px-6 py-8 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 leading-tight mb-6 tracking-tight">
          {article.title}
        </h1>

        <p className="text-lg text-slate-600 font-medium leading-relaxed mb-10">
          {article.excerpt}
        </p>

        <div className="space-y-8 text-slate-700 leading-relaxed text-lg">
          {article.content.paragraphs.map((para: string, index: number) => (
            <p key={index}>{para}</p>
          ))}

          <h2 className="text-xl font-semibold text-gray-900 pt-4">
            {article.content.heading}
          </h2>

          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 mt-8">
            <h3 className="font-bold text-blue-900 mb-2">
              {t("article_tip_heading", "Husk!")}
            </h3>
            <p className="text-sm text-blue-800">{article.content.tip}</p>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <button
            onClick={scrollToTop}
            className="w-12 h-12 flex items-center justify-center bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
          >
            <ChevronUp className="w-6 h-6 text-slate-700" />
          </button>
        </div>
      </div>
    </div>
  );
}
