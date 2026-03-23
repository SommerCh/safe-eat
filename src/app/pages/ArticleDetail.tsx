import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { ChevronLeft, Share, ChevronUp, Heart } from "lucide-react";
import { ImageWithFallback } from "../components/ImageWithFallback";
import { ARTICLES } from "../components/articles/articleData";
import { useProfile } from "../context/ProfileContext";

export function ArticleDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useProfile();

  const article =
    location.state?.article || ARTICLES.find((a) => a.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-slate-500 mb-4">Artiklen blev ikke fundet.</p>
        <button
          onClick={() => navigate("/home")}
          className="text-blue-600 font-semibold"
        >
          Gå tilbage
        </button>
      </div>
    );
  }

  const isFavorite = favorites.includes(article.id);

  const content = article.content || {
    paragraphs: [
      "Dette er en spændende artikel, som vi er ved at skrive færdig.",
    ],
    heading: "Mere på vej",
    tip: "Husk at holde din app opdateret for at få de seneste artikler.",
  };

  const relatedArticles = ARTICLES.filter((a) => a.id !== article.id).slice(
    0,
    5,
  );

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
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${isFavorite ? "bg-red-50" : "bg-slate-100"}`}
          >
            <Heart
              className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-slate-700"}`}
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
          {content.paragraphs.map((para: string, index: number) => (
            <p key={index}>{para}</p>
          ))}

          <h2 className="text-xl font-semibold text-gray-900 pt-4">
            {content.heading}
          </h2>

          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 mt-8">
            <h3 className="font-bold text-blue-900 mb-2">Husk!</h3>
            <p className="text-sm text-blue-800">{content.tip}</p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 mb-6">
            Måske også relevant for dig
          </h2>
          <div className="flex overflow-x-auto gap-4 pb-4 -mx-6 px-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {relatedArticles.map((related) => (
              <div
                key={related.id}
                onClick={() =>
                  navigate(`/article/${related.id}`, {
                    state: { article: related },
                  })
                }
                className="w-64 flex-shrink-0 bg-white rounded-2xl p-3 shadow-sm border border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <div className="h-32 w-full rounded-xl overflow-hidden mb-3">
                  <ImageWithFallback
                    src={related.image}
                    alt={related.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-1 block">
                  {related.category}
                </span>
                <h3 className="text-sm font-semibold text-slate-900 leading-snug mb-2 line-clamp-2">
                  {related.title}
                </h3>
              </div>
            ))}
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
