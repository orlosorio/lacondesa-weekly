"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PLACE_TYPES = [
  "Restaurant",
  "Bar",
  "Coffee Shop",
  "Barbershop",
  "Shop",
  "Gallery",
  "Other",
];
const NEIGHBORHOODS = [
  "La Condesa",
  "Hipódromo",
  "Hipódromo Condesa",
  "Roma Norte",
  "Roma Sur",
  "Other",
];

const MAX_DESC = 300;
const MAX_EXTRA = 500;
const MAX_FILES = 3;
const MAX_FILE_MB = 5;

export default function SubmitOpeningPage() {
  const [businessName, setBusinessName] = useState("");
  const [placeType, setPlaceType] = useState("");
  const [address, setAddress] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [openingSoon, setOpeningSoon] = useState(false);
  const [openingDate, setOpeningDate] = useState("");
  const [description, setDescription] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [website, setWebsite] = useState("");
  const [extra, setExtra] = useState("");
  const [consent, setConsent] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const valid = files.filter((f) => {
      if (!["image/jpeg", "image/png", "image/jpg"].includes(f.type))
        return false;
      if (f.size > MAX_FILE_MB * 1024 * 1024) return false;
      return true;
    });
    setPhotos((prev) => [...prev, ...valid].slice(0, MAX_FILES));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setErrorMessage("");
    const errs: string[] = [];
    if (!businessName.trim() || businessName.trim().length < 2) {
      errs.push("Business name");
    }
    if (!PLACE_TYPES.includes(placeType)) errs.push("Type of place");
    if (!address.trim() || address.trim().length < 5) errs.push("Address");
    if (!NEIGHBORHOODS.includes(neighborhood)) errs.push("Neighborhood");
    if (!openingSoon && !openingDate.trim()) {
      errs.push('Opening date or mark "Opening soon"');
    }
    if (!description.trim() || description.trim().length < 20) {
      errs.push("Short description (min. 20 characters)");
    }
    if (description.length > MAX_DESC) {
      errs.push(`Description max ${MAX_DESC} characters`);
    }
    if (!contactName.trim() || contactName.trim().length < 2) {
      errs.push("Contact name");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.push("Valid email");
    }
    if (!consent) {
      errs.push("Accept publication in the directory");
    }
    if (extra.length > MAX_EXTRA) {
      errs.push(`Extras max ${MAX_EXTRA} characters`);
    }
    if (photos.length > MAX_FILES) {
      errs.push("Maximum 3 photos");
    }

    if (errs.length) {
      setSubmitStatus("error");
      setErrorMessage(errs.join(". "));
      return;
    }

    setSubmitStatus("loading");
    const formData = new FormData();
    formData.set("businessName", businessName.trim());
    formData.set("placeType", placeType);
    formData.set("address", address.trim());
    formData.set("neighborhood", neighborhood);
    formData.set("openingSoon", String(openingSoon));
    formData.set("openingDate", openingDate.trim());
    formData.set("description", description.trim());
    formData.set("contactName", contactName.trim());
    formData.set("email", email.trim());
    if (phone.trim()) formData.set("phone", phone.trim());
    const ig = instagram.trim();
    if (ig) formData.set("instagram", ig.startsWith("@") ? ig : `@${ig}`);
    if (website.trim()) formData.set("website", website.trim());
    if (extra.trim()) formData.set("extra", extra.trim());
    formData.set("consent", "true");
    photos.forEach((f, i) => formData.set(`photo${i}`, f));

    const res = await fetch("/api/submit-opening", {
      method: "POST",
      body: formData,
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setSubmitStatus("error");
      setErrorMessage(
        typeof data.error === "string"
          ? data.error
          : "We couldn’t send your submission. Please try again later.",
      );
      return;
    }
    setSubmitStatus("success");
  };

  if (submitStatus === "success") {
    return (
      <main className="pt-20 lg:pt-24 min-h-screen bg-background">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
          <h1 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground mb-4">
            Got it. Thank you.
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Got it. If your place is a fit for the neighborhood, we&apos;ll be in
            touch soon.
          </p>
        </div>
      </main>
    );
  }

  const inputClass =
    "w-full border border-border bg-background px-3 py-2 text-foreground text-sm focus:outline-none focus:border-primary";
  const labelClass = "block text-sm font-medium text-foreground mb-1.5";

  return (
    <main className="pt-20 lg:pt-24 min-h-screen bg-background">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <header className="mb-12">
          <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground tracking-tight mb-4">
            Open something new in La Condesa?
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            We review every submission personally. If it&apos;s a fit for La
            Condesa, we&apos;ll reach out.
          </p>
        </header>

        {errorMessage && (
          <div className="mb-8 p-4 border border-destructive/50 bg-destructive/5 text-destructive text-sm">
            {errorMessage}
          </div>
        )}

        <div className="space-y-10">
          <section>
            <h2 className="font-serif text-lg font-semibold text-foreground mb-6">
              About the place
            </h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Business name *</label>
                <Input
                  className={inputClass}
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder=""
                />
              </div>
              <div>
                <label className={labelClass}>Type of place *</label>
                <select
                  className={inputClass}
                  value={placeType}
                  onChange={(e) => setPlaceType(e.target.value)}
                >
                  <option value="">Select</option>
                  {PLACE_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Address in La Condesa *</label>
                <Input
                  className={inputClass}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder=""
                />
              </div>
              <div>
                <label className={labelClass}>Neighborhood</label>
                <select
                  className={inputClass}
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                >
                  <option value="">Select</option>
                  {NEIGHBORHOODS.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="openingSoon"
                  checked={openingSoon}
                  onChange={(e) => setOpeningSoon(e.target.checked)}
                  className="h-4 w-4 border-border"
                />
                <label htmlFor="openingSoon" className="text-sm text-foreground">
                  Opening soon
                </label>
              </div>
              {!openingSoon && (
                <div>
                  <label className={labelClass}>Opening date</label>
                  <Input
                    type="date"
                    className={inputClass}
                    value={openingDate}
                    onChange={(e) => setOpeningDate(e.target.value)}
                  />
                </div>
              )}
              <div>
                <label className={labelClass}>
                  Describe in your own words what makes your place special * (max{" "}
                  {MAX_DESC})
                </label>
                <textarea
                  className={`${inputClass} min-h-[120px] resize-y`}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={MAX_DESC}
                  rows={4}
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-lg font-semibold text-foreground mb-6">
              Contact
            </h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Contact name *</label>
                <Input
                  className={inputClass}
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Email *</label>
                <Input
                  type="email"
                  className={inputClass}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Phone / WhatsApp</label>
                <Input
                  className={inputClass}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Instagram</label>
                <Input
                  className={inputClass}
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="@your_place"
                />
              </div>
              <div>
                <label className={labelClass}>Website</label>
                <Input
                  type="url"
                  className={inputClass}
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-lg font-semibold text-foreground mb-6">
              Extras
            </h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>
                  Up to 3 photos (JPG or PNG, max {MAX_FILE_MB}MB each)
                </label>
                <p className="text-xs text-muted-foreground mb-2">
                  High quality photos increase your chances of being featured.
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/jpg"
                  onChange={handlePhotoChange}
                  className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-3 file:border file:border-border file:bg-background file:text-foreground"
                />
                {photos.length > 0 && (
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    {photos.map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        {f.name}
                        <button
                          type="button"
                          onClick={() => removePhoto(i)}
                          className="text-primary hover:underline"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <label className={labelClass}>
                  Anything else you want us to know? (max {MAX_EXTRA})
                </label>
                <textarea
                  className={`${inputClass} min-h-[80px] resize-y`}
                  value={extra}
                  onChange={(e) => setExtra(e.target.value)}
                  maxLength={MAX_EXTRA}
                  rows={3}
                />
              </div>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 border-border"
                />
                <label htmlFor="consent" className="text-sm text-foreground">
                  I agree that La Condesa MX may publish this information in its editorial directory *
                </label>
              </div>
            </div>
          </section>

          <Button
            type="button"
            onClick={handleSubmit}
            disabled={submitStatus === "loading"}
            className="w-full py-3 text-base font-medium"
          >
            {submitStatus === "loading" ? "Sending…" : "Submit opening"}
          </Button>
        </div>
      </div>
    </main>
  );
}

