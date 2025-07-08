"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getUserPreferences, updateUserPreferences, getGenres } from "@/lib/api2";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { DashboardHeader } from "../Header";
import { Award, ChevronRight } from "lucide-react";
import { useWeightManagement } from "@/hooks/useWeightManagement";
import type { PreferencesFormData } from "./types/preferences";
import { GenreSelection } from "./GenreSelection";
import { PreferencesLoadingSkeleton } from "./LoadingSkeleton";
import { PreferencesHeader } from "./PreferenceHeader";
import { PreferencesTabs } from "./PreferenceTabs";
import { WeightAdjustment } from "./WeightAdjustment";
import { WeightPresets } from "./WeightPresets";
import { useRouter } from "next/navigation";

const schema = z
  .object({
    favorite_genre_ids: z.array(z.number()),
    disliked_genre_ids: z.array(z.number()),
    genre_weight: z.number().min(0).max(1),
    rating_weight: z.number().min(0).max(1),
    popularity_weight: z.number().min(0).max(1),
    recency_weight: z.number().min(0).max(1),
  })
  .refine(
    (data) => {
      const total = data.genre_weight + data.rating_weight + data.popularity_weight + data.recency_weight;
      return Math.abs(total - 1.0) < 0.01;
    },
    {
      message: "All weights must sum to 1.0",
      path: ["genre_weight"],
    }
  );

export default function PreferencesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"genres" | "weights">("genres");
  const [hasChanges, setHasChanges] = useState(false);

  const form = useForm<PreferencesFormData, any, PreferencesFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      favorite_genre_ids: [],
      disliked_genre_ids: [],
      genre_weight: 0.25,
      rating_weight: 0.25,
      popularity_weight: 0.25,
      recency_weight: 0.25,
    },
  });

  const { data: genres = [] } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });

  const { data: preferences, isLoading } = useQuery({
    queryKey: ["preferences"],
    queryFn: getUserPreferences,
  });

  const mutation = useMutation({
    mutationFn: updateUserPreferences,
    onSuccess: () => {
      toast.success("Preferences updated successfully! 🎉");
      setHasChanges(false);
    },
    onError: () => toast.error("Failed to update preferences. Please try again."),
  });

  const weightManagement = useWeightManagement(form);

  useEffect(() => {
    if (preferences) {
      const newValues = {
        favorite_genre_ids: preferences.favorite_genres?.map((g: any) => g.id) || [],
        disliked_genre_ids: preferences.disliked_genres?.map((g: any) => g.id) || [],
        genre_weight: preferences.genre_weight ?? 0.25,
        rating_weight: preferences.rating_weight ?? 0.25,
        popularity_weight: preferences.popularity_weight ?? 0.25,
        recency_weight: preferences.recency_weight ?? 0.25,
      };
      form.reset(newValues);
    }
  }, [preferences, form]);

  // Watch for changes
  useEffect(() => {
    const subscription = form.watch(() => setHasChanges(true));
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = form.handleSubmit((values) => {
    mutation.mutate(values);
  });

  const selectedFavorites = form.watch("favorite_genre_ids") || [];
  const selectedDislikes = form.watch("disliked_genre_ids") || [];
  const weights = form.watch(["genre_weight", "rating_weight", "popularity_weight", "recency_weight"]);
  const totalWeight = weights.reduce((sum, weight) => sum + (weight || 0), 0);
  const isWeightValid = Math.abs(totalWeight - 1.0) < 0.01;
  const hasGenreSelections = selectedFavorites.length > 0 || selectedDislikes.length > 0;

  if (isLoading) {
    return (
      <>
        <DashboardHeader />
        <PreferencesLoadingSkeleton />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="flex flex-col items-center justify-center min-h-screen py-8 px-4">
        <div className="w-full max-w-4xl space-y-8">
          <PreferencesHeader />

          <PreferencesTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            hasGenreSelections={hasGenreSelections}
            isWeightValid={isWeightValid}
          />

          <div className="space-y-8">
            {activeTab === "genres" && <GenreSelection form={form} genres={genres} />}

            {activeTab === "weights" && (
              <div className="space-y-6 animate-in slide-in-from-left-5 duration-300">
                <WeightPresets onApplyPreset={weightManagement.applyPreset} />
                <WeightAdjustment
                  form={form}
                  lockedWeights={weightManagement.lockedWeights}
                  onUpdateWeight={weightManagement.updateWeight}
                  onToggleWeightLock={weightManagement.toggleWeightLock}
                  onResetWeights={weightManagement.resetWeights}
                />
              </div>
            )}

            {/* Save Button */}
            {/* <div className="flex justify-center pt-6">
              <div className="relative">
                {hasChanges && <div className="absolute -top-1 -right-1 w-2 h-2 bg-foreground rounded-full" />}
                <Button
                  onClick={onSubmit}
                  disabled={mutation.isPending || isLoading}
                  size="lg"
                  className="min-w-[200px] h-11 font-medium shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50"
                >
                  {mutation.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-background mr-2"></div>
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <Award className="w-4 h-4 mr-2" />
                      Save Preferences
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </Button>
              </div>
              <Button type="button" variant="outline" className="w-full" onClick={() => router.back()}>
                Back
              </Button>
            </div> */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6">
  <div className="relative w-full sm:w-auto flex-1">
    {hasChanges && (
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-foreground rounded-full" />
    )}
    <Button
      onClick={onSubmit}
      disabled={mutation.isPending || isLoading}
      size="lg"
      className="w-full sm:min-w-[200px] h-11 font-medium shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50"
    >
      {mutation.isPending ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-background mr-2" />
          Saving Changes...
        </>
      ) : (
        <>
          <Award className="w-4 h-4 mr-2" />
          Save Preferences
          <ChevronRight className="w-4 h-4 ml-1" />
        </>
      )}
    </Button>
  </div>

  <Button
    type="button"
    variant="outline"
    className="w-full sm:w-auto flex-1"
    onClick={() => router.back()}
  >
    Back
  </Button>
</div>

          </div>
        </div>
      </main>
    </div>
  );
}
