'use client';

import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import TextInput from './text-input';
import PriceInput from './priceInput';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import SubmitButton from './submit-button';
import TagInput, { Tag } from './tagInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { mealSchema, MealTypes } from '@/schema/schema';
import MealTextArea from './mealTextArea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useRouter } from 'next/navigation';
import { MealProduct } from '@prisma/client';
import { useMeals } from '@/hooks/use-reactquery-meal';
import MultipleImageInput from './multipleImageUpload';
import { useCategories } from '@/hooks/use-reactquery-category';

const defaultKokonutTag: Tag = {
  id: 'water',
  label: 'Water',
  color:
    'bg-indigo-100 text-indigo-700 border border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-700/30',
};

export default function MealForm({singleMeal}:{singleMeal:MealProduct | null}) {
  const { allCategories } = useCategories();
  const { createMeal } = useMeals();
  const { updateMeal } = useMeals();
  const [mealTags, setMealTags] = useState<Tag[]>([]);
  // console.log(mealTags, 'my Tags');
  // Have Access To A Tag And Only Get Access To One Key Of Each Tag
  const tagsToBeSubmittedOutOfTheForm = mealTags.map(
    (mealTag) => mealTag.label,
  );
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MealTypes>({
    resolver: zodResolver(mealSchema),
    defaultValues: {
      name: singleMeal?.name,
      price: singleMeal?.price,
      images: singleMeal?.images,
      ingredients: singleMeal?.ingredients,
      description: singleMeal?.description,
    },
  });
  const [loading, setLoading] = useState(false);

  const initialImages = [
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg',
  ];
  const [mealImages, setMealImages] = useState(initialImages);
  // Check if we have valid images (not placeholders and not empty)
  const validImages = mealImages.filter(
    (image) => image && image !== '/placeholder.svg',
  );

  const [mealCategory, setMealCategory] = useState('');
 // Don't render form until data is loaded (for edit mode)
 
  async function submitFormData(mealData: MealTypes) {
    if (singleMeal) {
      try {
        updateMeal(
          {
            slug: singleMeal.slug,
            data: mealData,
          },
          {
            onSuccess: (mealData) => {
              setLoading(false);
              console.log(mealData);
              toast.success('Meal Has Been Updated Successfully');
              reset();
              router.push('/dashboard/view-all-meals');
            },
            onError() {
              console.log(mealData);
              setLoading(false);
              toast.error('Failed To Update The Meal');
            },
          },
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      if (validImages.length < 3) {
        toast.error('Please upload at least 3 images for the category');
        return;
      }
      setLoading(true);
      mealData.slug = mealData.name.split(' ').join('-').toLowerCase();
      mealData.images = validImages;
      mealData.ingredients = tagsToBeSubmittedOutOfTheForm;
      // mealData.ingredients = mealTags.map((mealTag) => mealTag.label) -> This is another Method You Can Do Other Than This Above
      mealData.categoryId = mealCategory;
      createMeal(mealData, {
        onSuccess: (mealData) => {
          console.log(mealData);
          setLoading(false);
          toast.success('Meal Has Been Created Successfully');
          reset();
          router.push('/dashboard/view-all-meals');
        },
        onError() {
          console.log(mealData);
          setLoading(false);
          toast.error('Failed To Create The Meal');
        },
      });
    }
  }

  return (
    <>
      <div
        className={cn(
          'w-full',
          'bg-white dark:bg-zinc-900/70',
          'border border-zinc-100 dark:border-zinc-800',
          'rounded-xl shadow-sm backdrop-blur-xl',
        )}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-3 border-b border-green-300 dark:border-zinc-800">
            <h2 className="text-2xl font-semibold text-green-900 dark:text-zinc-100">
              Here You Create The Meals. Forexample BreakFasts, Lunch & Drinks
            </h2>
          </div>

          <form
            onSubmit={handleSubmit(submitFormData)}
            className="space-y-1 flex flex-col-reverse gap-4 md:flex md:flex-row md:items-center md:justify-between md:gap-4"
          >
            <div className="w-full md:w-[75%]">
              <div
                className={cn(
                  'p-2 rounded-lg',
                  'bg-zinc-100 dark:bg-zinc-800',
                  'border border-zinc-200 dark:border-zinc-700',
                )}
              >
                <div className="">
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Meal Name"
                    name="name"
                  />
                </div>
                <div className="">
                  <PriceInput
                    register={register}
                    errors={errors}
                    label="Meal Price"
                    name="price"
                    placeholder="00.00UGX"
                  />
                </div>
                <div className="">
                  <MealTextArea
                    register={register}
                    errors={errors}
                    label="Meal Description"
                    name="description"
                  />
                </div>
                <div className="py-2">
                  <Select
                    onValueChange={(mealCategory) =>
                      setMealCategory(mealCategory)
                    }
                  >
                    <SelectTrigger className="w-full border border-green-300 focus:outline-none focus:ring-0">
                      <SelectValue
                        className=" placeholder-green-300"
                        placeholder="Select Meal Category"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Meal Categories Available</SelectLabel>
                        {allCategories.map((category) => {
                          return (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="">
                  <TagInput
                    onChange={(tags: Tag[]) => {
                      setMealTags(tags);
                    }}
                  />
                </div>
                <div className="py-2">
                  <SubmitButton
                    className="w-full"
                    size={'sm'}
                    title={singleMeal ? `Update ${singleMeal.name}` : `Save Meal`}
                    // title="Save Meal"
                    loading={loading}
                  />
                </div>
              </div>
            </div>
            <div className="w-full md:w-[35%]">
              <div className="space-y-0.5">
                <MultipleImageInput
                  title="Meal Images"
                  imageUrls={mealImages}
                  setImageUrls={setMealImages}
                  endpoint="imageUploader"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
