import { useState, useRef, useEffect, type ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { X, Tag, MapPin, AlignLeft, Plus } from "lucide-react";
import { Button } from "../ui/button";

interface SaveProductProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    productName: string,
    storeName: string,
    notes: string,
    imageFile: File | null,
    currentPreview: string | null,
  ) => Promise<void>;
  initialData?: any;
}

export function SaveProduct({
  isOpen,
  onClose,
  onSave,
  initialData,
}: SaveProductProps) {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [productName, setProductName] = useState("");
  const [storeName, setStoreName] = useState("");
  const [notes, setNotes] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData && isOpen) {
      setProductName(initialData.productName || "");
      setStoreName(initialData.store || "");
      setNotes(initialData.notes || "");
      setImagePreview(initialData.image || null);
    } else if (isOpen) {
      setProductName("");
      setStoreName("");
      setNotes("");
      setImagePreview(null);
      setImageFile(null);
    }
  }, [initialData, isOpen]);

  const handleCapturePhoto = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmSave = async () => {
    if (!productName.trim()) return;
    setLoading(true);
    try {
      await onSave(productName, storeName, notes, imageFile, imagePreview);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-end justify-center sm:items-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-md rounded-t-[32px] sm:rounded-[32px] p-8 pb-32 shadow-2xl animate-in slide-in-from-bottom duration-300 z-10 max-h-[90vh] overflow-y-auto text-slate-950">
        <div className="flex justify-between items-start mb-6 text-slate-950">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {initialData
                ? "Rediger produkt"
                : t("save_product_title", "Gem produkt")}
            </h1>
          </div>
          <button
            onClick={onClose}
            className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100 shrink-0"
          >
            <X className="w-6 h-6 text-slate-700" />
          </button>
        </div>

        <div className="space-y-6">
          <input
            type="file"
            accept="image/*"
            capture="environment"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="flex items-center gap-4 mb-2">
            <button
              onClick={handleCapturePhoto}
              className="w-20 h-20 bg-slate-50 border-2 border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 relative overflow-hidden active:scale-[0.95] shrink-0"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <Plus size={28} />
              )}
            </button>
            <div className="flex flex-col">
              {imagePreview ? (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="text-sm font-bold text-slate-950 text-left hover:opacity-70 transition-opacity"
                >
                  Fjern billede
                </button>
              ) : (
                <>
                  <span className="text-sm font-bold text-slate-950">
                    Tilføj billede
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              {t("label_product_name", "Varens navn")}
            </label>
            <div className="relative">
              <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full h-14 pl-12 pr-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:bg-white focus:border-slate-400 outline-none font-medium text-slate-950"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              Butik / Lokation
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full h-14 pl-12 pr-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:bg-white focus:border-slate-400 outline-none font-medium text-slate-950"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              Egne noter
            </label>
            <div className="relative">
              <AlignLeft className="absolute left-4 top-5 w-5 h-5 text-slate-400" />
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full h-32 pl-12 pr-4 pt-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:bg-white focus:border-slate-400 outline-none font-medium text-slate-950 resize-none"
              />
            </div>
          </div>

          <Button
            onClick={handleConfirmSave}
            disabled={!productName.trim() || loading}
            className="w-full h-14 bg-black text-white rounded-2xl text-base font-bold shadow-md active:scale-[0.98] mt-4 disabled:opacity-50"
          >
            {loading
              ? "Gemmer..."
              : initialData
              ? "Opdater favorit"
              : t("btn_save_confirm", "Gem i favoritter")}
          </Button>
        </div>
      </div>
    </div>
  );
}
